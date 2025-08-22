
import React from 'react';

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2H7c.57 0 1.13.2 1.57.57l2.82 2.82c.4.4.59.93.57 1.45a10.9 10.9 0 0 1-1.89 4.46l.75.75a10.9 10.9 0 0 1 4.46-1.89c.52-.02 1.05.17 1.45.57l2.82 2.82c.37.44.57 1 .57 1.57z" />
  </svg>
);

export default PhoneIcon;
