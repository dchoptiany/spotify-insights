import React from 'react';

const Button = ({ onClick, text }) => {
  return (
    <button className="Button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
