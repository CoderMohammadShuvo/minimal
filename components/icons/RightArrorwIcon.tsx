import React from "react";

const RightArrorwIcon = ({ width = 31, height = 16, className }: { width?: number; height?: number; className?: string }) => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.5" width="24" height="24" rx="12" fill="#111111" />
    <path d="M7.75 12.25L16.25 12.25M16.25 12.25L12.25 8.25M16.25 12.25L12.25 16.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
  </svg>


);

export default RightArrorwIcon;
