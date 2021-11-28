import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root1: {
    minWidth: 275,
    minHeight: 150,
    marginBottom: 20,
    border: "1px solid rgba(0, 128, 128, 0.5)",
    transition: "1s",

    "&:hover": {
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19)",
      transform: "scale(0.8)",
    },
  },
  root: {
    minWidth: 275,
    minHeight: 150,
    transition: "1s",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  CardContent: {
    marginTop: 20,
    marginLeft: 20,
  },
  typo: {
    fontFamily: "Open Sans Condensed, sans-serif",
    fontWeight: "bolder",
    textTransform: "uppercase",
    color: "rgba(0, 128, 128, 1)",
    letterSpacing: ".1em",
    marginTop: "10px",
  },
  headd: {
    fontFamily: "Kumbh Sans, sans-serif",
    fontWeight: "900",
    color: "#004d4d",
    letterSpacing: ".04em",
    fontSize: "35px",
    marginBottom: "10px",
  },
  teacher:{
    fontFamily: "Kumbh Sans, sans-serif",
    fontWeight: "600",
    color: "#004d4d",
    letterSpacing: ".04em",
    fontSize: "25px",
    textAlign: "center",
    marginBottom: "40px",
  },
  bold: {
    fontFamily: "Kumbh Sans, sans-serif",
    fontWeight: "600",
    color: "#1a0000",
    letterSpacing: ".04em",
    fontSize: "20px",
    display: "flex",
    
    marginTop: "15px"
    
  },
  modal: {
    padding: "40px",
  },
  normal: {
    fontFamily: "Kumbh Sans, sans-serif",
    fontWeight: "300",
    color: "#1a0000",
    letterSpacing: ".04em",
    fontSize: "20px",
    display: "flex",
    marginLeft: "25px"
    
    
  },
  Button: {
    backgroundColor: "rgba(0, 128, 128, 1)",
    color: "#fff",
    height: 35,
    marginLeft: "30%",
    margin: "40px 0 0 0",
    width: "40%",
  },
}));

export default function OutlinedCard(props) {
  console.log(props.underApplication)
  const classes = useStyles();
  const history = useHistory();
  const bull = <span className={classes.bullet}>•</span>;
  const [open, setOpen] = React.useState(false);
  const [appId, setAppId] = React.useState("");
  const [status, setStatus] = React.useState(1)
  const [buttontext, setButtontext] = React.useState("Book a seat")
  const [seats, setSeats] = React.useState(props.underApplication.total_seats)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
      if(seats === 0)
        setStatus(0);
      else
        setStatus(1)
  }, [seats])

  const handleBooking = () => {
      if(buttontext === "Book a seat") {
        setButtontext("Cancel my seat");
        setSeats(prev => {
          return prev-1;
        })
      }
      else {
        setButtontext("Book a seat")
      setSeats(prev => {
        return prev+1;
      })
    }
  };

  return (
    <React.Fragment>
      <Card
        className={classes.root1}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <CardContent className={classes.CardContent}>
          <Typography variant="h5" component="h2" className={classes.typo}>
            {props.underApplication && props.underApplication.doctor_name}
          </Typography>
          <Typography variant="body2" component="p">
            {props.underApplication && props.underApplication.ailment}
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Zoom}
        transitionDelay={open ? "3000ms" : "0ms"}
      >
        <div className={classes.modal}>

        <div className={classes.headd}>
        {props.underApplication && props.underApplication.subject}
        </div>
        <div className={classes.teacher}>
        Dr. Avantika Singh
        </div>
        <div className={classes.bold}>
        <div>Branch :</div> <div className={classes.normal}>{props.underApplication && props.underApplication.branch}</div>
        </div>
        <div className={classes.bold}>
        <div>Semester :</div> <div className={classes.normal}>{props.underApplication && props.underApplication.semester}</div>
        </div>
        <div className={classes.bold}>
        <div>Room Number :</div> <div className={classes.normal}>{props.underApplication && props.underApplication.room_no}</div>
        </div>
        <div className={classes.bold}>
        <div>Schedule :</div> <div className={classes.normal}>{props.underApplication && props.underApplication.date}</div>
        </div>
        <div className={classes.bold}>
        Available Seats : <div className={classes.normal}>{seats}</div>
        </div>
        <div className={classes.bold}>
        Total Seats :  <div className={classes.normal}>{props.underApplication && props.underApplication.total_seats}</div>
        </div>
        {status && <Button className={classes.Button} onClick={handleBooking} >
            {buttontext}
        </Button>}
        {!status && <h1>All Seats Booked</h1>}
        </div>
      </Dialog>
    </React.Fragment>
  );
}
