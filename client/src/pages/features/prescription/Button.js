import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import BackgroundHeader from "./public/Bg1.png";

const useStyles = makeStyles((theme) => ({
  BackgroundHead: {
    // backgroundImage: 'url('+ BackgroundHeader+')',
    height: 400,

    // position: 'absolute',
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
    // backgroundImage: 'url('+ BackgroundHeader+')',
    height: 300,

    // position: 'absolute',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(0, 128, 128, 0.05)",

    margin: "10px",
    width: 250,
    [theme.breakpoints.up("md")]: {},
  },
  Head: {
    backgroundColor: "rgba(0, 128, 128, 0.05)",
    flexGrow: 1,
   
  },
  important: {
    // position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexWrap: "wrap",
    backgroundColor: "#eeb7ba",
  },
  extra: {
    textAlign: "center",
    backgroundColor: "#eeb7ba",
  },
  extra1: {
    textAlign: "center",
     color: "rgba(0, 128, 128, 1)",
    margin: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19)",
    backgroundColor: "rgba(0, 128, 128, 0.05)",
    cursor: "pointer",
    minWidth: "200px",
    "&:hover": {
      backgroundColor: "rgba(0, 128, 128, 1)",
      color:"white"
    },

  },
  heading: {
    fontFamily: "Lobster, cursive",
    color: "#d3454c",
    fontSize: "20px",
    letterSpacing: ".05em",
    textShadow: "2px 2px 8px #404040",
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
    // color: "#d3454c",
    letterSpacing: ".1em",
    fontSize: "25px",
    marginTop: "10px",
    // backgroundColor: "#eeb7ba",
    "&:hover": {
      backgroundColor: "rgba(0, 128, 128, 1)",
     
    },
  },

  subHeading: {
    fontFamily: "Akaya Telivigala, cursive",
    color: "white",
    fontSize: "15px",
    letterSpacing: ".05em",
    marginTop: "10px",
    // backgroundColor: "#eeb7ba",
    [theme.breakpoints.up("md")]: {
      fontSize: "20px",
      marginTop: "20px",
      
    },
    "&:hover": {
      backgroundColor: "rgba(0, 128, 128, 1)",
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
}));

const Features = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.extra1} onClick={props.clicked}>
        <div className={classes.heading1}>
        {props.name} 
        </div>
        <div className={classes.subHeading}>
          Click Me!
        </div>
      </div>
    </>
  );
};

export default Features;
