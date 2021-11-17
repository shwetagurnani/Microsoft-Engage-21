import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "auto",
    [theme.breakpoints.up("md")]: {
     
      minWidth: 120,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  Form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  FormContent: {
    height: 500,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "space-evenly",
  },
  TextInput: {
    margin: 10,
    borderBottom: "none",
    boxShadow: "none",
    textTransform: "none",
  },
  Button: {
    backgroundColor: "rgba(0, 128, 128, 1)",
    color: "#fff",
    margin: theme.spacing(3, 2),
    width: "300px",
    height: 50,
    alignSelf: "center",

    [theme.breakpoints.up("md")]: {
      width: "350px",
    },
  },
  Border: {
    border: "1px solid rgba(0, 128, 128, 0.5)",
    padding: "15px",
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
}));

const NewPrescription = () => {
  const classes = useStyles();
  const history = useHistory();
  const [branch, setBranch] = React.useState("");
  const [name, setName] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [days, setDays] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [semester, setSemester] = React.useState("");

  const [doctorSpecialities, setDoctorSpecialities] = useState([]);
  const [doctorName, setDoctorName] = useState([]);
  const [doctorDays, setDoctorDays] = useState([]);

  useEffect(() => {
    const sendingRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/doctor/getSpecialization`
        );
        const responseData = await response.json();
        setDoctorSpecialities(Object.keys(responseData.response));
      } catch (err) {
        console.log(err);
      }
    };
    sendingRequest();

    const sendingRequest2 = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/doctor/getSpecialization`
        );
        const responseData = await response.json();
        Object.entries(responseData.response).map((mainitem) => {
          setDoctorName((item) => {
            return [
              ...item,
              {
                id: mainitem[0],
                value: mainitem[1],
              },
            ];
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    sendingRequest2();

    const sendingRequest3 = async () => {
      try {
        const response = await fetch(`http://localhost:3000/doctor/getDays`);
        const responseData = await response.json();

        Object.entries(responseData.response).map((mainitem) => {
          setDoctorDays((item) => {
            return [
              ...item,
              {
                id: mainitem[0],
                value: mainitem[1],
              },
            ];
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    sendingRequest3();
  }, []);

  const handleChange = (event) => {
    setBranch(event.target.value);
  };
  const handleChange2 = (event) => {
    setName(event.target.value);
  };
  const handleChange3 = (event) => {
    setDays(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/patient/postAppointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: name,
            status: 0,
            specialization: branch,
            day: days,
            subject: subject ,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.success === false) throw Error;
      history.push("/patientdashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Toolbar />
      <div className={classes.heading}>Create a New Classroom</div>
      <Grid container>
        <Grid item xs={12} className={classes.Form}>
          <div className={classes.Border}>
            <form onSubmit={handleSubmit}>
              <div className={classes.FormContent}>
              <TextField
                  id="standard-basic"
                  label="Subject"
                  className={classes.TextInput}
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                />
                 <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Branch
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={branch}
                    onChange={handleChange}
                  >
                    <MenuItem value="CSE">CSE</MenuItem>
                    <MenuItem value="IT"> IT</MenuItem>
                    <MenuItem value="ECE">ECE</MenuItem>
                  
                  </Select>
                </FormControl>
                <TextField
                  id="standard-basic"
                  label="Semester"
                  className={classes.TextInput}
                  type= "number"
                  InputProps={{ inputProps: { min: 1, max: 8 } }}
                  onChange={(e) => {
                    setSemester(e.target.value);
                  }}
                />
                 <TextField
                  id="standard-basic"
                  label="Room Number"
                  className={classes.TextInput}
                  type= "number"
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                />

                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Slot Number
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={days}
                    onChange={handleChange3}
                  >
                    {name &&
                      doctorDays
                        .filter((item) => item.id === name)
                        .map((filteredvalue) => {
                          return filteredvalue.value.map((item) => {
                            return <MenuItem value={item}>{item}</MenuItem>;
                          });
                        })}
                  </Select>
                </FormControl>
           
                <Button
                  variant="contained"
                  className={classes.Button}
                  type="submit"
                >
                  Get Appointment
                </Button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default NewPrescription;
