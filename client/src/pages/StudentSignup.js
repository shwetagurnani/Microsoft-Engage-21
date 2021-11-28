import React, { useState } from "react";
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
import { useHistory } from "react-router-dom";
import {
  fade,
  ThemeProvider,
  withStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  BackgroundHead: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "70%",
    padding: theme.spacing(4, 4),
    [theme.breakpoints.up("md")]: {
      width: "35%",
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
      margin: theme.spacing(4, 2),
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
    [theme.breakpoints.up("md")]: {
      fontSize: "30px",
    },
  },
  field: {
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
const StudentSignup = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Branch, setBranch] = useState("");
  const [Sem, setSem] = useState("");

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const submitHandler = (e) => {
    console.log("sucess");
    e.preventDefault();

    axios
      .post("http://localhost:3000/student/register", {
        "name": name,
        "email": email,
        "password": password,
        "branch": Branch,
        "semester": Sem
      })
      .then((res) => {
        console.log(res.data)
        if (res.data._id) {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          console.log("better entered")
          props.history.push("/studentdashboard");
        }
         else if (res.data.email) {
          alert("User already exist, please sign in to continue");
          props.history.push("/studentlogin");
        } 
      });
  };

  const btnstyle = { margin: "8px 0" };
  const handleChange = (event) => {
    setBranch(event.target.value);
  };
  return (
    <div className={classes.extra}>
      <img src="./scheduler3.jpg" alt="lady" className={classes.BackgroundHead} />
      <div>
        <Grid>
          <div className={classes.paperStyle}>
            <Grid align="center">
              <h4 className={classes.heading}>Sign Up</h4>
            </Grid>
            <div className={classes.extra1}>
              <TextField
                id="outlined-basic"
                label="Usename"
                variant="outlined"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={classes.field}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={classes.field}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={classes.field}
              />
              <FormControl  variant="outlined" className={classes.field}>
                <InputLabel id="demo-simple-select-outlined-label"  >Branch</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={Branch}
                onChange={handleChange}
                label = "Branch"
                >
                <MenuItem value={10}>CSE</MenuItem>
                <MenuItem value={20}>IT</MenuItem>
                <MenuItem value={30}>ECE</MenuItem>
                </Select>
              </FormControl>

                  <TextField
                  id="outlined-basic"
                  label="Semester"
                  type= "number"
                  InputProps={{ inputProps: { min: 1, max: 8 } }}
                  variant="outlined"
                  className={classes.field}
                  onChange = {(e) => {setSem(e.target.value)}}
                  />

              <Button
                type="submit"
                variant="contained"
                className={classes.btnstyle}
                fullWidth
                onClick={submitHandler}
                href="/"
              >
                Sign Up As Student
              </Button>
            </div>

            <Typography>
              Already a member ?<Link href="/studentlogin">Sign In</Link>
            </Typography>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default StudentSignup;
