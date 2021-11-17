/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

import {
  fade,
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { authContext } from "../components/context/Auth";

const useStyles = makeStyles((theme) => ({
  BackgroundHead: {
    // height: 250,

    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "70%",
    padding: theme.spacing(4, 16),
    [theme.breakpoints.up("md")]: {
      // height: 700,
      width:  "40%"
    },
  },

  extra: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexGrow: 1,
    margin: theme.spacing(0, 0),
    flexWrap: "wrap",
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(4, 0),
    },
  },
  footer: {
    backgroundColor: "#001a66",
    color: "white",
    textAlign: "center",
    height: "50px",
  },
  paperStyle: {
    padding: 20,
    // height: "70vh",
    [theme.breakpoints.up("md")]: {
      fontSize: "30px",
      width: 500,
    },
  },
  heading: {
    fontFamily: "Lobster, cursive",
    color: "#008080",
    fontSize: "20px",
    letterSpacing: ".05em",
    textAlign: "center",
    // textShadow: "2px 2px 6px #404040",
    [theme.breakpoints.up("md")]: {
      fontSize: "30px",
    },
  },
  field: {
    // backgroundColor: "#eeb7ba",
    color: "#eeb7ba",
    margin: theme.spacing(1, 2),
    width: "300px",
    [theme.breakpoints.up("md")]: {
      width: "350px",
    },
  },

  btnstyle: {
    backgroundColor: "#008080",
    color: "#fff",
    margin: theme.spacing(1, 2),
    width: "300px",
    height: 50,

    [theme.breakpoints.up("md")]: {
      width: "350px",
    },
  },
}));
const DoctorLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  let { dispatch } = useContext(authContext);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/doctor/login", { email, password })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          dispatch({ type: "SET_ROLE", payload: "DOCTOR" });
          dispatch({ type: "SET_USERID", payload: res.data.id });
          dispatch({ type: "LOG_IN" });
          props.history.push("/doctordashboard");
        } else {
          console.log(res.data);
          props.history.push("/doctologin");
        }
      });
  };

  const classes = useStyles();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const btnstyle = { margin: "8px 0" };
  return (
    <div className={classes.extra}>
      <img src="./home5.jpg" alt="lady" className={classes.BackgroundHead} />
      <div>
        <Grid>
          <div className={classes.paperStyle}>
            <Grid align="center">
              <h4 className={classes.heading}>Sign In</h4>
            </Grid>
            <div className={classes.extra1}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                className={classes.field}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                className={classes.field}
                onChange={(event) => {
                  setPass(event.target.value);
                }}
              />

            
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.btnstyle}
                  fullWidth
                  onClick={handleLogin}
                >
                  Sign In As Doctor
                </Button>
            
            </div>

            <Typography>
              New Member ?<Link href="/doctorsignup">Sign Up</Link>
            </Typography>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default DoctorLogin;
