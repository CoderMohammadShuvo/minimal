import React from "react";

const MenuIcon = ({ width = 31, height = 16, className }: { width?: number; height?: number; className?: string }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 31 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line y1="1" x2="31" y2="1" stroke="black" strokeWidth="2" />
    <line y1="8" x2="24" y2="8" stroke="black" strokeWidth="2" />
    <line y1="15" x2="31" y2="15" stroke="black" strokeWidth="2" />
  </svg>
);

export default MenuIcon;
