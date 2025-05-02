import React from "react";

// Basic Plan Icon
export const BasicIcon = ({
  className = "w-16 h-16 text-teal-500 transform transition-transform hover:rotate-12",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ filter: "drop-shadow(0 0 5px rgba(20, 184, 166, 0.3))" }}
  >
    <path d="M12 6V4M12 6a2 2 0 100 4m0-4a2 2 0 110 4M7 14a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m10 10a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
  </svg>
);

// Standard Plan Icon
export const StandardIcon = ({
  className = "w-16 h-16 text-purple-500 transform transition-transform hover:rotate-12",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
    style={{ filter: "drop-shadow(0 0 5px rgba(168, 85, 247, 0.3))" }}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M64 96H0c0 50.7 41.3 92 92 92 40.6 0 74.8-26.5 86.9-63.2-12-3.7-25.2-5-38.9-3.6-16.5 1.5-29.9 7.4-38.7 16.3-7.2 7.2-11.5 16.2-13.7 27.5"
    ></path>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M96 272H32c0 50.7 41.3 92 92 92 40.6 0 74.8-26.5 86.9-63.2-12-3.7-25.2-5-38.9-3.6-16.5 1.5-29.9 7.4-38.7 16.3-7.2 7.2-11.5 16.2-13.7 27.5M400 96h64c0 50.7-41.3 92-92 92-40.6 0-74.8-26.5-86.9-63.2 12-3.7 25.2-5 38.9-3.6 16.5 1.5 29.9 7.4 38.7 16.3 7.2 7.2 11.5 16.2 13.7 27.5"
    ></path>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M368 272h64c0 50.7-41.3 92-92 92-40.6 0-74.8-26.5-86.9-63.2 12-3.7 25.2-5 38.9-3.6 16.5 1.5 29.9 7.4 38.7 16.3 7.2 7.2 11.5 16.2 13.7 27.5M256 112v128M256 368v32"
    ></path>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M256 400a32 32 0 1064 0 32 32 0 10-64 0zM256 144a32 32 0 1064 0 32 32 0 10-64 0z"
    ></path>
  </svg>
);

// Premium Plan Icon
export const PremiumIcon = ({
  className = "w-16 h-16 text-blue-500 transform transition-transform hover:rotate-12",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ filter: "drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))" }}
  >
    <path d="M12 2L8 6 12 10 16 6z"></path>
    <path d="M12 10L8 14 12 18 16 14z"></path>
    <rect x="8" y="18" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);

// Cart Icon for buttons
export const CartIcon = ({
  className = "w-6 h-6 group-hover:animate-bounce",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
    style={{ filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    ></path>
  </svg>
);

// Checkmark Icon for features
export const CheckmarkIcon = ({ className = "h-4 w-4 text-white" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{ filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.5))" }}
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    ></path>
  </svg>
);
