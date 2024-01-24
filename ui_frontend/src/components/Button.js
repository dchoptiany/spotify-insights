import React from 'react';


//Button is customed button
const Button = ({ onClick, text }) => {
  return (
    <button className="Button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
