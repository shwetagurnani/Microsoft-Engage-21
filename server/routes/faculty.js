const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("validator");
const isEmpty = require("is-empty");
const keys = require("../config/keys");
const { verifyToken } = require("../middlewares/verifyToken");
const Faculty = require("../models/Faculty");
const Classroom = require("../models/Classroom");
let path = require("path");

router.post("/register", (req, res) => {
  Faculty.findOne({ email: req.body.email }).then((faculty) => {
    if (faculty) {
      return res.status(200).json({ email: "Email already exists" });
    } else {
      const newFaculty = new Faculty({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newFaculty.password, salt, (err, hash) => {
          if (err) throw err;
          newFaculty.password = hash;
          newFaculty
            .save()
            .then((faculty) => res.json(faculty))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Faculty.findOne({ email }).then((faculty) => {
    if (!faculty) {
      return res.status(404).json({ emailnotfound: "Email not found " });
    }
    bcrypt.compare(password, faculty.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: faculty.id,
          name: faculty.name,
          student: false,
          faculty: true,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              id: faculty.id,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/createClassroom", verifyToken, (req, res) => {
  let facultyId = req.userId;
  console.log("createclassroom route");
  console.log(facultyId);
  const newClassroom = new Classroom({
    faculty_id: facultyId,
    subject: req.body.subject,
    branch: req.body.branch,
    semester: req.body.semester,
    date: req.body.date,
    room_no: req.body.room_no,
    slot_no: req.body.slot_no,
  });
  newClassroom
    .save()
    .then((classroom) => res.json(classroom))
    .catch((err) => console.log(err));
});

router.get("/availableSlots/:room", (req, res) => {
  const room_no = req.params.room;
  Classroom.find({ room_no: room_no })
    .then((response) => {
      var total_slots = [1, 2, 3, 4];
      var booked_slots = [];
      for (var i = 0; i < response.length; i++) {
        booked_slots.push(response[i].slot_no);
      }
      total_slots = total_slots.filter((item) => !booked_slots.includes(item));
      res.json({ success: true, total_slots });
    })
    .catch((err) => {
      res.json({ success: false });
    });
});

router.get("/myclasses", verifyToken, (req,res) => {
  let facultyId = req.userId;
  Classroom.find({ faculty_id: facultyId })
    .then((classes) => {
      res.json({ success: true, classes });
    })
    .catch((err) => {
      res.json({ success: false });
    });
})

module.exports = router;
