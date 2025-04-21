import { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CompReg from './components/ComplaintRegistration/CompReg'
import Login from './components/SignUpPage/Login';
import Signup from './components/SignUpPage/Signup';
import ManageComplaints from './components/ComplaintRegistration/ManageComplaints';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Compreg" element={<CompReg />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manage-comp" element={<ManageComplaints />} />
      </Routes>
    </Router>
  )
}

export default App
