import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Component/Create/Create';
import Read from './Component/Read/Read';
import Update from './Component/Update/Update';
import Dashboard from './Component/Dashboard/Dashboard'
import Login from './Component/Forms/Login';
import Register from './Component/Forms/Register';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
           <Route path='dash/' element={<Dashboard/>}></Route>
          <Route path='/read' element={<Read/>}></Route>
          <Route path='/edit/:id' element={<Update/>}></Route>
          <Route path='/delete' element={<Dashboard/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
