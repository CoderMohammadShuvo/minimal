import React from "react";

const ArrowIcon = ({ width = 31, height = 16, className }: { width?: number; height?: number; className?: string }) => (
<svg width="40" height="40" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.666687" width="24" height="24" rx="12" fill="#111111"/>
<path d="M8.41669 11.75L16.9167 11.75M16.9167 11.75L12.9167 7.75M16.9167 11.75L12.9167 15.75" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

export default ArrowIcon;
