import React,{useState} from "react";
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

// import BackgroundHeader from "./public/Bg1.png";

const useStyles = makeStyles((theme) => ({
  BackgroundHead: {
    // height: 250,

    // position: 'absolute',
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "70%",
    
    [theme.breakpoints.up("md")]: {
      // height: 700,
      width: "40%",
      padding: theme.spacing(0, 16, 0, 0),
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
      margin: theme.spacing(4,2),
      marginBottom: "140px",
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
    // width:500,
    // margin:"20px auto"
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
const DoctorSignup = () => {
  const classes = useStyles();
  const history = useHistory();

  // register state
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [req,setReqNo] = useState("");
  const [hos,setHos] = useState("");
  const [speci,setSpeci] = useState("");
  const [contact,setContact] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [achievement,setAchievement] = useState("");

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
      .post("http://localhost:3000/doctor/register", {
                  "name":username,
                  "email":email,
                  "password":password,
                  "password2":confirmPassword,
                  "phone":contact,
                  "reg_num":req,
                  "address":address,
                  "specialization":speci,
                  "hospital_name":hos,
                  "achievements":achievement
              })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          // dispatch({ type: "SET_ROLE", payload: "DOCTOR" });
          // dispatch({ type: "SET_USERID", payload: res.data.id });
          // dispatch({ type: "LOG_IN" });
          // props.history.push("/doctorlogin");
        } 
        else if(res.data.email) {
          alert("User already exist, please sign in to continue");
          history.push("/doctorlogin");
        }else {
          console.log(res.data);
          // props.history.push("/doctologin");
        }
      });
  }

  const btnstyle = { margin: "8px 0" };
  return (
    <div className={classes.extra}>
    <img src="./home5.jpg" alt="lady" className={classes.BackgroundHead} />
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
              onChange = {(e) => {setUsername(e.target.value)}}
              className={classes.field}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className={classes.field}
              onChange = {(e) => {setEmail(e.target.value)}}
            />
             <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              className={classes.field}
              onChange = {(e) => {setAddress(e.target.value)}}
            />
              <TextField
              id="outlined-basic"
              label="Registration Number"
              variant="outlined"
              className={classes.field}
              onChange = {(e) => {setReqNo(e.target.value)}}
            />
              <TextField
              id="outlined-basic"
              label="Hospital name"
              variant="outlined"
              className={classes.field}
              onChange = {(e) => {setHos(e.target.value)}}
            />
              <TextField
              id="outlined-basic"
              label="specialization"
              variant="outlined"
              className={classes.field}
              onChange = {(e) => {setSpeci(e.target.value)}}
            />
            
            <TextField
              id="outlined-basic"
              label="contact Number"
              variant="outlined"
              className={classes.field}
              onChange = {(e) => {setContact(e.target.value)}}
            />
            
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              className={classes.field}
              onChange = {(e) => {setPassword(e.target.value)}}
            />
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              type="password"
              className={classes.field}
              onChange = {(e) => {setConfirmPassword(e.target.value)}}
            />
            <TextField
              id="outlined-basic"
              label="Achievement"
              variant="outlined"
              type="text"
              className={classes.field}
              onChange = {(e) => {setAchievement(e.target.value)}}
            />

           
              <Button
                type="submit"
                variant="contained"
                className={classes.btnstyle}
                fullWidth
                onClick= {submitHandler}
                href="/"
              >
                Sign Up As Doctor
              </Button>
          </div>

          <Typography>
            Already a member ?<Link href="/doctorlogin">Sign In</Link>
          </Typography>
        </div>
      </Grid>
    </div>
  </div>
  );
};

export default DoctorSignup;
