import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import './Reads.css';

function View() {
  const [read, setRead] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const reading = async () => {
    try {
      const response = await axios.get("https://nardio.online/api/user/data");
      setRead(response.data);
      console.log("Data fetched:", response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  const deletes = async (id) => {
    setRead(prevRead => prevRead.filter(item => item.id !== id));
    try {
      const response = await axios.delete(`http://185.194.216.146:81/api/user/delete/${id}`);
      console.log("Delete response:", response.status, response.data);
    } catch (err) {
      console.error("Delete failed:", err.response ? err.response.data : err.message);
     
    } 
  };
useEffect(() => {
  const intervalId = setInterval(() =>  {
reading();
  }, 1000)
   return () => clearInterval(intervalId);
}, []);


  return (
    <div className="wrapper">
      <div className="table-container">
        {/* <button className="btnm" onClick={reading}>See Events</button> */}
        <NavLink to="/dash" className="btn2">Back</NavLink>
        <NavLink to="/create" className="btn2">Add New Event</NavLink>
        <div className="kulwa">
          <h2>⌚ Events List</h2>
          <table className="upcoming-table">  
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {read.map((kulwa, index) => (
                <tr key={kulwa.id}>
                  <td>{index + 1}</td>
                  <td>{kulwa.Name}</td>        
                  <td>{kulwa.Date}</td>
                  <td>{kulwa.Location}</td>
                  <td>{kulwa.Message}</td>
                  <td>
                    <button 
                      className="btn2" 
                      onClick={() => deletes(kulwa.id)}
                      disabled={deletingId === kulwa.id}
                    >
                      {deletingId === kulwa.id ? "Deleting..." : "Delete"}
                    </button>
                    <NavLink to={`/edit/${kulwa.id}`} className="btnm">Edit</NavLink>
                    <NavLink to="/create" className="btn2">Add New Event</NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default View;
