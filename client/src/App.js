import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import FacultyLogin from "./pages/FacultyLogin";
import CreateClassroom from "./pages/CreateClassroom";
import NewPrescriptionPatient from "./pages/NewPrescriptionPatient";
import FacultySignup from "./pages/FacultySignup";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Logout from "./components/Logout";
import GetAppointment from "./pages/GetAppointment";
import Features from "./pages/features/features";
import AiTools from "./pages/AiTools/AiTools.js";
import Prescription from "./pages/features/prescription/Prescription";
import Pcos from "./pages/AiTools/Pcos";
import Cervical from "./pages/AiTools/Cervical";
import BreastCancer from "./pages/AiTools/BreastCancer";
import DoctorList from "./pages/features/DoctorList/DoctorList";
import { AuthProvider } from "./components/context/Auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import doctorHistoryList from './pages/features/DoctorList/DoctorHistoryList';

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/facultylogin" component={FacultyLogin} />
            <Route path="/facultysignup" component={FacultySignup} />
            <Route path="/studentsignup" component={StudentSignup} />
            <Route path="/studentlogin" component={StudentLogin} />
            <Route path="/facultydashboard" component={FacultyDashboard} />
            <Route path="/studentdashboard" component={StudentDashboard} />
            <Route path="/Logout" component={Logout} />
            <ProtectedRoutes path="/getAppointment">
              <GetAppointment />
            </ProtectedRoutes>
            {/* <Route path="/features" component={Features} />
            <Route path="/aitools" component={AiTools} />
            <ProtectedRoutes path="/prescription">
              <Prescription />
            </ProtectedRoutes>
            <Route path="/pcos" component={Pcos} />
            <Route path="/cervical" component={Cervical} />
            <Route path="/breastcancer" component={BreastCancer} />
            <Route path="/doctorlist" component={DoctorList} /> */}
            
            <Route
              path="/createclassroom"
              component={CreateClassroom}
            />
            {/* <Route
              path="/uploadPrescriptionPatient"
              component={NewPrescriptionPatient}
            />
            <Route path="/doctorHistory" component={doctorHistoryList} /> */}
          </Switch>

          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
