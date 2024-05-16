import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Timetableshow.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Timetableshow = () => {
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

  const downloadTimetableAsPdf = () => {
    const table = document.querySelector('.timetable-container');
    html2canvas(table).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // 210mm - 20mm margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('timetable.pdf');
    });
  };

  return (
    <div className="time1">
      <div className="timetable-container">
        <h1>Timetable View</h1>
        <br />
        <br />
        <br />
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
        <button onClick={downloadTimetableAsPdf}>Download Timetable as PDF</button>
      </div>
    </div>
  );
};

export default Timetableshow;
