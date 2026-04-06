//create a rounded button component that takes in a text prop and an onClick prop
import React from 'react';
const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} style={{ borderRadius: '50px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
      {text}
    </button>
  );
};

export default Button;