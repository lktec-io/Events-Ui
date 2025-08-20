import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Updates.css';
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Location, setLocation] = useState("");
  const [Message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();


  const fetchData = () => {
    axios.get(`http://185.194.216.14:7000/api/men/${id}`)
      .then(res => {
        setName(res.data.Name);
        setDate(res.data.Date);
        setLocation(res.data.Location);
        setMessage(res.data.Message);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    // safisha interval wakati component inafungwa
    return () => clearInterval(interval);
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    console.log(Name, Date, Location, Message);

    try {
      await axios.put(`http://185.194.216.14:7000/api/users/${id}`, {
        Name, Date, Location, Message
      });
      navigate("/read");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pagevent"> 
      <div className="main">
        <div className="mon">
          <h3>Edit Details</h3>
          <form className="event-form" onSubmit={submit}>
            <label htmlFor="name">Event Name</label>
            <input type="text" placeholder="Enter Event Name" value={Name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="date">Event Date</label>
            <input type="date" placeholder="Enter Event Date" value={Date} onChange={(e) => setDate(e.target.value)} />

            <label htmlFor="location">Location</label>
            <input type="text" placeholder="Enter your Location" value={Location} onChange={(e) => setLocation(e.target.value)} required />

            <label htmlFor="message">Event Detail</label>
            <textarea name="message" placeholder="About Event detail..." value={Message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            
            <button className="btn1" type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
