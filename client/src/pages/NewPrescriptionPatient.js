import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  extra: {
    textAlign: "center",
  },
  extra1: {
    textAlign: "center",
    margin: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19)",
  },
  heading: {
    fontFamily: "Lobster, cursive",
    color: "rgba(0, 128, 128, 1)",
    fontSize: "20px",
    letterSpacing: ".05em",
    // textShadow: "2px 2px 8px #404040",
    textAlign: "center",
    margin: "10px",
    padding: "10px",

    [theme.breakpoints.up("md")]: {
      fontSize: "80px",
    },
  },
  heading1: {
    fontFamily: "Open Sans Condensed, sans-serif",
    fontWeight: "bolder",
    textTransform: "uppercase",
    color: "rgba(0, 128, 128, 1)",
    letterSpacing: ".25em",
    fontSize: "25px",
    marginTop: "10px",
  },

  subHeading: {
    fontFamily: "Akaya Telivigala, cursive",
    color: "black",
    fontSize: "15px",
    letterSpacing: ".05em",
    marginTop: "10px",

    [theme.breakpoints.up("md")]: {
      fontSize: "20px",
      marginTop: "20px",
    },
  },
  button: {
    backgroundColor: "rgba(0, 128, 128, 1)",
    padding: theme.spacing(1, 2),
    textTransform: "none",
    color: "white",
    margin: "20px",
    float: "center",
    fontWeight: "normal",
    boxShadow: "20px",
    marginTop: "10px",
    fontSize: "15px",
    fontFamily: "Jost, sans-serif",
    width: "300px",
    height: "50px",
    [theme.breakpoints.up("md")]: {
      marginTop: "15px",
      width: "400px",
      height: "50px",
    },
  },

  feature: {},

  form: {
    fontFamily: "Jost, sans-serif",

    alignItems: "center",

    backgroundColor: "rgba(0, 128, 128, 0.05)",
    borderLeft: "8px solid rgba(0, 128, 128, 1)",
    width: "auto",
    margin: "20px",
    padding: "15px",
    [theme.breakpoints.up("md")]: {
      width: "800px",
    },
    // justifyIt
  },
  extra2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "rgba(0, 128, 128, 1)",
    margin: "4px 0px",
  },
  textField: {
    width: "200px",
    height: "22px",
  },
  newHeading: {
    fontFamily: "Jost, sans-serif",
    textAlign: "center",
    // maxWidth: "950px",
    [theme.breakpoints.up("md")]: {
      maxWidth: "950px",
    },
  },
}));

const NewPrescription = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [newPres, setNewPres] = useState({
    img: "",
    name: "",
    spec: "",
    show: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", newPres.img);
    formData.append("name", newPres.name);
    formData.append("spec", newPres.spec);
    formData.append("show", newPres.show);
    console.log(localStorage.getItem("token"));
    axios({
      method: "POST",
      url: "http://localhost:3000/patient/add/",
      headers: { "x-access-token": localStorage.getItem("token") },
      data: formData,
    })
      .then((res) => {
        history.push("/prescription");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePhoto = (e) => {
    setNewPres({ ...newPres, img: e.target.files[0] });
  };

  const handleChange = (e) => {
    setNewPres({ ...newPres, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className={classes.heading}>Upload a prescription</div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={classes.extra2}
      >
        <div>
          <div className={classes.form}>
            <h3 className={classes.text}>Upload a Prescription</h3>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={handlePhoto}
              className={classes.textField}
            />
          </div>

          <div className={classes.form}>
            <h3 className={classes.text}>UserName:</h3>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={newPres.name}
              onChange={handleChange}
              className={classes.textField}
            />
          </div>
          <div className={classes.form}>
            <h3 className={classes.text}>specialization:</h3>
            <input
              type="text"
              placeholder="specialization"
              name="spec"
              value={newPres.spec}
              onChange={handleChange}
              className={classes.textField}
            />
          </div>
          <div className={classes.form}>
            <h3 className={classes.text}>Upload Medical History?:</h3>
            <input
              required
              type="radio"
              id="yes"
              name="show"
              value="yes"
              onChange={handleChange}
            />
            <label for="yes">Yes</label>
            <input
              required
              type="radio"
              id="no"
              name="show"
              value="no"
              onChange={handleChange}
            />
            <label for="no">No</label>
          </div>
          <div className={classes.extra2}>
            <input
              type="submit"
              value="Upload a prescription"
              className={classes.button}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPrescription;
