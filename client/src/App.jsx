// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EntryReg from "./Components/entryreg/EntryReg";
import Lecreg from "./Components/Lregister/Lecreg";
import Home from "./Components/home/Home";
import Login from "./Components/Log/Login";
import Users from "./Components/users/Users";
import Courses from "./Components/Courses/Courses";
import Courseform from "./Components/Courses/Courseform";
import Timetables from "./Components/Timetables/Timetables";
import Timetableform from "./Components/Timetables/Timetableform";
import CustomNavbar from "./Components/navbar/navbar";
import Footer from "./Components/footer/footer";
import Lognavigate from "./Components/lognavigate/lognavigate";
import Sform from "./Components/Sform/Sform";
import Contact from "./Components/Request/Request";
import Entry from "./Components/entry/entry";
import TimetablePage from "./Components/TimetablePage/TimeTablepage";
import TimetableView from "./Components/TimetableView/Timetableshow";
import Students from "./Components/Students/Students";
import StudEntryReg from "./Components/studentryreg/StudentryReg";
import StudEntry from "./Components/studentry/studentry";
import ForgotPassword from "./Components/Log/ForgotPassword";
import AboutUs from "./Components/aboutUs/aboutus";






function App() {
  return (
   

    <div>
      
       <CustomNavbar />
       <Footer/>

       
      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lognavigate" element={<Lognavigate />} />
          <Route path="/sform" element={<Sform />} />
          <Route path="/entryreg" element={<EntryReg />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/users" element={<Users />} />
          <Route path="/lregister" element={<Lecreg />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/addCourses" element={<Courseform />} />
          <Route path="/timetables" element={<Timetables />} /> 
          <Route path="/timetablee" element={<TimetableView/>} />
          <Route path="/addcourse" element={<Timetableform />} />
          <Route path="/request" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/students" element={<Students />} />
          <Route path="/studentryreg" element={<StudEntryReg />} />
          <Route path="/studentry" element={<StudEntry />} />
          <Route path="/aboutus" element={<AboutUs />} />

          


        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
