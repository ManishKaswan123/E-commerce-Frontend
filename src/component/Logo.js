import React from 'react';

const Logo = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="logo m-0" // Remove margin with 'm-0'
  >
    {/* Dark circle with shadow */}
    <circle 
      cx="50" 
      cy="50" 
      r="48" 
      stroke="black" 
      strokeWidth="2" 
      fill="#333" // Dark color fill
      className="shadow-lg" // Adding shadow using Tailwind
    />
    {/* Text with some styling */}
    <text 
      x="50%" 
      y="50%" 
      textAnchor="middle" 
      stroke="#fff" 
      strokeWidth="1px" 
      dy=".3em" 
      fontSize="30" 
      className="font-bold"
    >
      EC
    </text>
  </svg>
);

export default Logo;
