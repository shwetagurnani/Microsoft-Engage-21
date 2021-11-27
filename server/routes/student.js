const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("validator");
const isEmpty = require("is-empty");
const keys = require("../config/keys");
const { verifyToken } = require("../middlewares/verifyToken");
const student = require("../models/Student");
let path = require("path");

router.post("/register", (req, res) => {
    Student.findOne({ email: req.body.email }).then((student) => {
      if (student) {
        return res.status(200).json({ email: "Email already exists"});
      } else {
        const newStudent = new Student({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          branch: req.body.branch,
          semester: req.body.semester,
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newStudent.password, salt, (err, hash) => {
            if (err) throw err;
            newStudent.password = hash;
            newStudent
              .save()
              .then((student) => res.json(student))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  });
  
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Student.findOne({ email }).then((student) => {
      if (!student) {
        return res.status(404).json({ emailnotfound: "Email not found " });
      }
      bcrypt.compare(password, student.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: student.id,
            name: student.name,
            student: true,
            faculty: false,
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
                id: student.id,
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

  module.exports = router;