/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Button1 from "./Button";
// import Button from "./Button";
import DoctorHistory from "./DoctorHistory";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  BackgroundHead: {
    height: 400,
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: "10px",
    width: "auto",
    [theme.breakpoints.up("md")]: {
      height: 550,
      width: 600,
    },
  },

  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },

  BackgroundHead1: {
    height: 300,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#eeb7ba",
    margin: "10px",
    width: 250,
    [theme.breakpoints.up("md")]: {},
  },
  Head: {
    backgroundColor: "#eeb7ba",
    flexGrow: 1,
    margin: "20px",
    padding: "20px",
  },
  important: {
    // position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexWrap: "wrap",
    // backgroundColor: "#eeb7ba",
  },
  Head1: {
    // backgroundColor: "#eeb7ba",
    flexGrow: 1,
    margin: "20px",
    padding: "20px",
  },
  important1: {
    // position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexWrap: "wrap",
    // backgroundColor: "#eeb7ba",
  },
  extra: {
    textAlign: "center",
    backgroundColor: "#eeb7ba",
  },
  extra1: {
    textAlign: "center",
    margin: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19)",
    backgroundColor: "#eeb7ba",
  },
  heading: {
    fontFamily: "Lobster, cursive",
    color: "#d3454c",
    fontSize: "20px",
    letterSpacing: ".05em",
    // textShadow: "2px 2px 8px #404040",
    textAlign: "center",
    margin: "10px",
    padding: "10px",
    // backgroundColor: "#eeb7ba",
    [theme.breakpoints.up("md")]: {
      fontSize: "80px",
    },
  },
  heading1: {
    fontFamily: "Open Sans Condensed, sans-serif",
    fontWeight: "bolder",
    textTransform: "uppercase",
    color: "rgba(0, 128, 128, 1)",
    letterSpacing: ".1em",
    fontSize: "50px",
    marginTop: "50px",
    textAlign: "center",
  },

  subHeading: {
    fontFamily: "Akaya Telivigala, cursive",
    color: "black",
    fontSize: "15px",
    letterSpacing: ".05em",
    marginTop: "10px",
    backgroundColor: "#eeb7ba",
    [theme.breakpoints.up("md")]: {
      fontSize: "20px",
      marginTop: "20px",
    },
  },
  button: {
    backgroundColor: "#d3454c",
    padding: theme.spacing(1, 2),
    textTransform: "none",
    color: "white",
    fontWeight: "normal",
    boxShadow: "20px",
    marginTop: "10px",
    fontSize: "15px",
    [theme.breakpoints.up("md")]: {
      marginTop: "15px",
    },
  },

  feature: {
    padding: "10px",
    margin: "10px",
    // backgroundColor: "white",
    boxShadow: "20px",
    height: 800,
    width: "400px",
    backgroundColor: "#eeb7ba",
  },
  text: {
    color: "black",
  },
}));

const DoctorHistoryList = () => {
  const classes = useStyles();
    const temp=[
      {
          id: '1',
          patientName: 'Shreya',
      },
      {
        id: '2',
        patientName: 'Shreya',
      },
      {
        id: '3',
        patientName: 'Shreya',
      },
      {
        id: '4',
        patientName: 'Shreya',
      },

    ]
  const [prescriptions, setPrescriptions] = useState([
    {
      id: '1',
      patientName: 'Shreya',
  },
  {
    id: '2',
    patientName: 'Shreya',
  },
  {
    id: '3',
    patientName: 'Shreya',
  },
  {
    id: '4',
    patientName: 'Shreya',
  },
  ]);
    // setPrescriptions(temp);
  // const setPrescriptionsHandler = (category) => {
  //   axios({
  //     method: "GET",
  //     url: `http://localhost:3000/patient/getPatientPrescription/${category}`,
  //     headers: { "x-access-token": localStorage.getItem("token") },
  //   })
  //     .then((res) => {
  //       console.log(res.data.response);
  //       setPrescriptions(res.data.response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setCurrentCategory(category);
  // };

  const displayPrescriptionsHandler = (prescription) => {
    return (
      <>
        <DoctorHistory
          doctorName={prescription.patientName}
          // image={prescription.img}
        />
      </>
    );
  };
 

  return (
    <>
      <div className={classes.heading}>Categories</div>
     
      <div className={classes.Head1}>
        <div className={classes.important1}>
          {prescriptions.map((prescription) =>
            displayPrescriptionsHandler(prescription)
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorHistoryList;
