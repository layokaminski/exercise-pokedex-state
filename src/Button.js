import React from "react";
import './index.css';

const Button = ({ onClick, children, className }) => (
  <button className={`button-text ${className}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;