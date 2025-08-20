import React, { useState } from "react";
import axios from "axios";
import "./Creates.css";
import { useNavigate } from "react-router-dom";

function Create() {
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Location, setLocation] = useState("");
  const [Message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post("http://185.194.216.14:7000/api/men/post", {
        Name,
        Date,
        Location,
        Message,
      });
      console.log(response.status);
      const statuscode = response.status;
      if (statuscode === 200) {
        setLoading(false);
        navigate("/read");
      }
    } catch (err) {
      console.error(
        "Error creating event:",
        err.response ? err.response.data : err.message
      );
      alert("Failed to create event. Check console for details.");
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  return (
    <div className="pagevent">
      <div className="main">
        <div className="mon">
          <h3>Add Event</h3>
          <form className="event-form" onSubmit={submit}>
            <label>Event Name</label>
            <input
              type="text"
              placeholder="Enter Event Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Event Date</label>
            <input
              type="datetime-local"
              value={Date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label>Location</label>
            <input
              type="text"
              placeholder="Enter your Location"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <label>Event Detail</label>
            <textarea
              placeholder="About Event detail..."
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            <button className="btn1" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
