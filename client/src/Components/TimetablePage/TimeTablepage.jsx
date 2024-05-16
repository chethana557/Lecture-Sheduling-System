import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './TimetableView.css';
import { Link } from "react-router-dom";


const TimetableView = () => {
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = async () => {
    try {
      const response = await Axios.get('http://localhost:3000/api/timetables');
      setTimetableData(response.data);
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };

  return (
    <div className="time1">
      <div className="timetable-container">
      <h1>Timetable View</h1>
      <br></br>
      <br></br>
      <br></br>
      <table className="timetable">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Lecturer Name</th>
          </tr>
        </thead>
        <tbody>
          {timetableData.map((item) => (
            <tr key={item.id}>
              <td>{item.coursename}</td>
              <td>{item.courseId}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.lecturerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/request" >
        <button className="buttn23">Request</button>
        </Link>
    
      
      </div>
    </div>
    
  );
};

export default TimetableView;
