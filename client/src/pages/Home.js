import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import BackgroundHeader from "./public/Bg1.png";

const useStyles = makeStyles((theme) => ({
  BackgroundHead: {
    // backgroundImage: 'url('+ BackgroundHeader+')',
    height: 'auto',

    // position: 'absolute',
    backgroundSize: "cover",
    backgroundPosition: "right",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      height: 950,
     
      width: "100%",
   
    },

    //  margin: 24,
    //  padding: 24,
  },
  Head: {
    backgroundColor: "#eeb7ba",
    flexGrow: 1,
  },
  important: {
    // position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  extra: {
    textAlign: "center",
  },
  heading: {
    fontFamily: "Lobster, cursive",
    color: "#d3454c",
    fontSize: "20px",
    letterSpacing: ".05em",
    textShadow: "2px 2px 8px #404040",
    [theme.breakpoints.up("md")]: {
      fontSize: "80px",
    },
  },

  subHeading: {
    fontFamily: "Akaya Telivigala, cursive",
    color: "white",
    fontSize: "10px",
    letterSpacing: ".05em",
    marginTop: "10px",
    [theme.breakpoints.up("md")]: {
      fontSize: "30px",
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
    fontSize: "10px",
    [theme.breakpoints.up("md")]: {
      marginTop: "15px",
    },
  },

  features: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexWrap: "wrap",
    // margin: theme.spacing(8, 8),
  },

  image: {
    // margin: theme.spacing(8, 8),
    height: 350,
    width: 300,
    [theme.breakpoints.up("md")]: {
      height: "auto",
      width: "auto",
    },
  },
  para: {
    margin: theme.spacing(.1, .1),
    textAlign: "center",
    maxWidth: "600px",
    fontFamily: 'Antic, sans-serif',
    fontSize: "20px",
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(8, 8),
    },
  },
text: {
      
    fontFamily: "Lobster, cursive",
    color: "#006666",
    fontSize: "20px",
    letterSpacing: ".05em",
    textAlign: "center",
    // textShadow: "2px 2px 8px #404040",
    [theme.breakpoints.up("md")]: {
      fontSize: "80px",
  
  },
}
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      {/* <div style={BackgroundHead}>

    </div> */}
      {/* <div className={classes.Head}> */}
        {/* <div className={classes.important}>
          <div className={classes.extra}>
            <div className={classes.heading} variant="h3">
              Elegance
            </div>
            <div className={classes.subHeading}>
              A woman's health is her capital
            </div>
            <Button className={classes.button} variant="contained">
              Check My Health
            </Button>
          </div> */}
          <img src="./home.png" alt="lady" className={classes.BackgroundHead} />
        {/* </div> */}
      {/* </div> */}

      <div className={classes.features}>
        <img src="./doctor.png" alt="lady" className={classes.image} />
        <div>
          <div className={classes.text}>
            About Us
          </div>
        <div className={classes.para}>
          Our goal is to spread quality health services across women in this
          world, such that they may attain the best possible level of health.
          This is accomplished by our all-in-one women health platform, which
          leverages AI to detect and diagnose women specific health issues and
          thereby help raise awareness for its treatment and management. We are
          fighting for those who are disadvantaged by discrimination rooted in
          sociocultural factors, building a sense of trust and breaking the
          stigma around femininity
        </div>
        </div>
       
      </div>
    </>
  );
};

export default Home;
