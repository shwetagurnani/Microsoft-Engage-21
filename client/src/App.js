import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import FacultyLogin from "./pages/FacultyLogin";
import CreateClassroom from "./pages/CreateClassroom";
import FacultySignup from "./pages/FacultySignup";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Logout from "./components/Logout";
import { AuthProvider } from "./components/context/Auth";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
            {/* <ProtectedRoutes path="/getAppointment">
              <GetAppointment />
            </ProtectedRoutes> */}
            <Route
              path="/createclassroom"
              component={CreateClassroom}
            />
          </Switch>

          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
