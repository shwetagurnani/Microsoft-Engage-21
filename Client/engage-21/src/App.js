import './App.css';
import { BrowserRouter, Routes, Switch, Route } from "react-router-dom";
import FacultySignup from './components/FacultySignup';
import FacultyLogin from './components/FacultyLogin';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/facultylogin" element={<FacultyLogin/>} />
          <Route path="/facultysignup" element={<FacultySignup/>} />
          <Route path="/studentlogin" element={<StudentLogin/>} />
          <Route path="/studentsignup" element={<StudentSignup/>} />

      </Routes>
    </div>
  );
}

export default App;
