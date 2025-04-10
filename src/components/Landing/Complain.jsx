// src/components/FloatingPenButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react'; // or your own SVG

const FloatingPenButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Compreg');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-200 z-50"
    >
      <Pencil className="w-5 h-5" />
    </button>
  );
};

export default FloatingPenButton;
