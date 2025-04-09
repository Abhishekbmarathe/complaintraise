import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './components/Landing/Landing';
import CompReg from './components/ComplaintRegistration/CompReg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Compreg" element={<CompReg />} />
        
      </Routes>
    </Router>
  )
}

export default App
