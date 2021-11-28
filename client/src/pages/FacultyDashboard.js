import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DashboardCard from "../components/FacultyDashboardCard";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  main: {
    alignItems: "center",
  },
  AppBar: {
    position: "sticky",
    backgroundColor: "rgba(0, 128, 128, 0.5)",
    color: "white",
    height: 62,
    
  },
  AppBarContent: {
    alignItems: "center",
    height: 55,
    minHeight: 55,
    marginLeft: "auto",
    marginRight: "auto",
  },
  typo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Open Sans Condensed, sans-serif",
    fontWeight: "bolder",
    textTransform: "uppercase",
    color: "white",
    letterSpacing: ".1em",
    fontSize: "25px",
    marginTop: "10px",
    textAlign: "center",  
  },
  typoTotal: {
    marginLeft: 5,
    height: 20,
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "white",
  },
  Button: {
    backgroundColor: "rgba(0, 128, 128, 1)",
    color: "#fff",
    margin: theme.spacing(3, 2),
    width: "300px",
    height: 50,

    [theme.breakpoints.up("md")]: {
      width: "350px",
    },
  },

  extra2: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

  margins :{
    [theme.breakpoints.up("md")]: {
      margin: "0px 200px 0px 200px",
    },
    margin: "2px",
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const FacultyDashboard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const SendingRequest = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/faculty/myclasses",
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
            method: "GET",
          }
        );
        const responseData = await response.json();
        console.log(responseData.classes);
        setClassrooms(responseData.classes)
      } catch (err) {
        console.log(err);
      }
    };
    SendingRequest();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.extra2}>
        <Button className={classes.Button} href="/createclassroom">
          Create New Classroom
        </Button>
        </div>
        <div className = {classes.margins}>
          <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.main}>
            <Grid item xs={12} lg={12}>
              <React.Fragment>
                <CssBaseline />
                <ElevationScroll {...props}>
                  <AppBar className={classes.AppBar}>
                    <Toolbar className={classes.AppBarContent}>
                      <Typography variant="h6" className={classes.typo}>
                        Classrooms
                      </Typography>
                    </Toolbar>
                  </AppBar>
                </ElevationScroll>
                <Container>
                <div style={{ padding: 20 }}>
                <Grid container row   spacing= {2} lg={12} overflow="auto">
                    {classrooms && classrooms.map((item) => {
                      return (
                        <Grid item xs = {12} lg = {6}>
                          <DashboardCard underApplication={item} option={false} />
                        </Grid>
                      );
                    })}
                  </Grid>
                  </div>
                </Container>
              </React.Fragment>
            </Grid>
          </Grid>
        </div>
      
    </div>
  );
};

export default FacultyDashboard;
