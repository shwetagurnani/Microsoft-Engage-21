const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("validator");
const isEmpty = require("is-empty");
const keys = require("../config/keys");
const doctors = require("../models/Doctor");
var spawn = require("child_process").spawn;
const Appointment = require("../models/Appointment");
const { verifyToken } = require("../middlewares/verifyToken");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
let prescription = require("../models/Prescription");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.route("/add").post(upload.single("img"), verifyToken, (req, res) => {
  const name = req.body.name;
  const photo = req.file.filename;
  let doctorId = req.userId;
  Doctor.findById(doctorId)
    .then((doctor) => {
      Patient.find({ name: name }).then((patient) => {
       prescription.create({
        doctor_specialization: doctor.specialization,
        doctor_name: doctor.name,
        doctor_id: doctorId,
        img: photo,
        patient_id: patient[0]._id,
       })
       .then(pres => {
         console.log(pres);
        res.json({ success: true })
      })
      .catch(err => {
        res.json({ success: false })
      })
      });
    });
});

router.get("/display", (req, res) => {
  prescription.find({}, function (err, img) {
    if (err) res.send(err);
    console.log(img);
    res.contentType("json");
    res.send(img);
  });
});

router.post("/register", (req, res) => {
  Doctor.findOne({ email: req.body.email }).then((doctor) => {
    if (doctor) {
      return res.status(200).json({ email: "Email already exists"});
    } else {
      console.log(req.body.achievements);
      const newDoctor = new Doctor({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
        otp: 123,
        isVerified: true,
        reg_num: req.body.reg_num,
        phone: req.body.phone,
        specialization: req.body.specialization,
        hospital_name: req.body.hospital_name,
        achievements: req.body.achievements,
        mon: req.body.mon,
        tues: req.body.tues,
        wed: req.body.wed,
        thrus: req.body.thrus,
        fri: req.body.fri,
        sat: req.body.sat,
        sun: req.body.sun,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newDoctor.password, salt, (err, hash) => {
          if (err) throw err;
          newDoctor.password = hash;
          newDoctor
            .save()
            .then((doctor) => res.json(doctor))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Doctor.findOne({ email }).then((doctor) => {
    if (!doctor) {
      return res.status(404).json({ emailnotfound: "Email not found " });
    } else if (!doctor.isVerified) {
      return res.status(404).json({ emailnotverified: "email not verified" });
    }
    bcrypt.compare(password, doctor.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: doctor.id,
          name: doctor.name,
          reg_num: doctor.reg_num,
          doctor: true,
          patient: false,
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
              id: doctor.id,
              token: "Bearer " + token,
            });
          }
        );
        console.log("Shwetaaa");
        console.log(doctor.email);
        console.log("doctorlogin ");
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/getPrescription", verifyToken, (req, res) => {
  prescription.find({doctor_id: req.userId})
  .then((pres) => {
    console.log(pres);
    res.json({ success: true, pres });
  })
  .catch((err) => {
    res.json({success: false});
  })
})

router.get("/getSpecialization", (req, res) => {
  doctors
    .find({})
    .then((doctor) => {
      var response = {};
      for (var i = 0; i < doctor.length; i++) {
        var specialization = doctor[i].specialization;
        if (specialization in response) {
          response[specialization].push(doctor[i].name);
        } else {
          response[specialization] = [];
          response[specialization].push(doctor[i].name);
        }
      }
      console.log(response);
      res.json({ success: true, response });
    })
    .catch((err) => {
      res.json({ success: false });
    });
});

router.get("/getDoctors/:category", (req, res) => {
  const category = req.params.category;

  doctors
    .find({ specialization: category })
    .then((response) => {
      res.json({ success: true, response });
    })
    .catch((err) => {
      res.json({ success: false });
    });
});

router.get("/getDays", (req, res) => {
  doctors.find({}).then((doctor) => {
    var response = {};
    for (var i = 0; i < doctor.length; i++) {
      var name = doctor[i].name;
      response[name] = [];
      if (doctor[i].mon) response[name].push("mon");
      if (doctor[i].tues) response[name].push("tues");
      if (doctor[i].wed) response[name].push("wed");
      if (doctor[i].thurs) response[name].push("thurs");
      if (doctor[i].fri) response[name].push("fri");
      if (doctor[i].sat) response[name].push("sat");
      if (doctor[i].sun) response[name].push("sun");
    }
    console.log(response);
    res.json({ success: true, response });
  });
});

router.get("/getAllAppointment", (req, res) => {
  const token = req.headers["x-access-token"].split(" ")[1];
  try {
    if (!token)
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, keys.secretOrKey, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      console.log(decoded);
      Appointment.find({ doctor_id: decoded.id }).then((data) => {
        return res.json({ appointment: data });
      });
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/changeStatus", (req, res) => {
  Appointment.findByIdAndUpdate(req.body.app_id, { status: req.body.status })
    .then((app) => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: true });
    });
});

router.get("/myPatients", verifyToken, (req, res) => {
  let doctorId = req.userId;
  Appointment.find({ doctor_id: doctorId })
    .then((patients) => {
      console.log(patients);
      var response = [];
      for (var i = 0; i < patients.length; i++) {
        response.push(patients[i].patient_name);
      }
      console.log(response);
      res.json({ success: true, response });
    })
    .catch((err) => {
      res.json({ success: false });
    });
});

// router.get("/displayPrescription", verifyToken, (req, res) => {
//   let doctorId = req.userId;
//   Image.find({ doctor_id: doctorId })
//     .then((images) => {
//       console.log(images);
//       res.json({ images, success: true });
//     })
//     .catch((err) => {
//       res.json({ success: false });
//     });
// });

router.get("/getSpecializationAndName", (req, res) => {
  doctors
    .find({})
    .then((doctor) => {
      res.send(doctor);
    })
    .catch((err) => {
      res.json({ success: false });
    });
});

module.exports = router;
