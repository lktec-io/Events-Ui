import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import './Deletes.css';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <p>No user logged in</p>;

  return (
    <div className="dashboard">
      <div className="dashboard-inner">
        <div className="hero">
          <span>Welcome to Event Management System</span>
        </div>
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Account Overview</div>
             <NavLink to='/read'> <span className="badge">See Events</span></NavLink>
            <NavLink to='/'> <span className="badge">Log out</span></NavLink>
          </div>
          <div className="panel-body">
            <table className="info-table">
              <tbody>
                <tr>
                  <td className="label">Username</td>
                  <td className="value">{user.username}</td>
                </tr>
                 <tr>
                  <td className="label">Phone</td>
                  <td className="value">{user.phone}</td>
                </tr>
                <tr>
                  <td className="label">Email</td>
           <td className="value">{user.email}</td>
                </tr>
                <tr>
                  <td className="label">Registered On</td>
                  <td className="value">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="panel-footer">
           All right reserved &copy; {new Date().getFullYear()} lktec.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;