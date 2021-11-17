import React from "react";
import {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../prescription/Button";
import DoctorCard from "./DoctorCard";


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
    backgroundColor: "rgba(0, 128, 128, 0.5)",
    flexGrow: 1,
    margin:"20px",
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
    margin:"20px",
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
    color: "rgba(0, 128, 128, 1)",
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
  text:{
    color:'black',
    
  }
}));

const DoctorList = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory]=useState([]);
  const [doctorlist,setDoctorlist] = useState([]);

  useEffect(() => {
    const sendingRequest = async () => {
        try{
          const response = await fetch(`http://localhost:3000/doctor/getSpecialization`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token 6cfe472c768bd06aa98e52a9bc41e41248eb4b92"
            }
          });
          const res = await response.json();
          setCategories(Object.keys(res.response));
        } catch(err){
            console.log(err);
        }
      };
      sendingRequest();
  }, [])

  const [Doctors, setDoctors] = useState([]);

  // const categories = ['A','B','C','D','E','F','G','H','I','J','K','L'];

  const setDoctorsHandler =(category)=>{
    console.log(category)
    const sendingRequest2 = async () => {
        try{
          const response = await fetch(`http://localhost:3000/doctor/getDoctors/${category}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token 6cfe472c768bd06aa98e52a9bc41e41248eb4b92"
            }
          });
        const res = await response.json();
        console.log(res.response);
        setDoctors(res.response)
        } catch(err){
            console.log(err);
        }
      };
    sendingRequest2();

    setCurrentCategory(category);
  }


  const displayDoctorsHandler = Doctor=>{
    return (
      <>
      <DoctorCard
      doctorName={Doctor.name}
      achivements={Doctor.achievements}
      registration={Doctor.reg_num}
     />
      </>
    );
  }
  const getcategory = category => {
    return (
      <>
      <Button
      name={category}
      clicked={()=>setDoctorsHandler(category)}/>
      </>
    );
  };

  return (
    <>
      
      <div className={classes.heading}>Health Experts</div>
      <div className={classes.Head}>
        <div className={classes.important}>
        {categories.map(category => getcategory(category))}

        </div>
      </div>
      <div className={classes.heading1}>
        {currentCategory}
      </div>
      <div className={classes.Head1}>
        <div className={classes.important1}>
        {Doctors.map(Doctor => displayDoctorsHandler(Doctor))}

        </div>
      </div>
    </>
  );
};

export default DoctorList;