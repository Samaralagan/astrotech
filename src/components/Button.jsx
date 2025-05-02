import React from "react";

const Button = ({ text = "", href = "#", className = "" }) => {
  return (
    <div className="perspective-1000 mx-auto">
      <a
        href={href}
        className={`relative block w-40 h-12 transform-style-3d transition-all duration-1000 hover:rotate-x-360 cursor-pointer ${className}`}
      >
        {/* Face 1 - Front */}
        <span className="absolute inset-0 flex items-center justify-center uppercase text-lg tracking-wider font-medium border-2 border-black bg-white/90 text-black transform-style-3d rotate-x-0 translate-z-25 transition-all duration-500 cube-face hover:bg-[#00ADB5]/80 hover:text-white">
          {text}
        </span>

        {/* Face 2 - Bottom */}
        <span className="absolute inset-0 flex items-center justify-center uppercase text-lg tracking-wider font-medium border-2 border-black bg-white/90 text-black transform-style-3d rotate-x-270 translate-z-25 transition-all duration-500 cube-face hover:bg-[#00ADB5]/80 hover:text-white">
          {text}
        </span>

        {/* Face 3 - Back */}
        <span className="absolute inset-0 flex items-center justify-center uppercase text-lg tracking-wider font-medium border-2 border-black bg-white/90 text-black transform-style-3d rotate-x-180 translate-z-25 transition-all duration-500 cube-face hover:bg-[#00ADB5]/80 hover:text-white">
          {text}
        </span>

        {/* Face 4 - Top */}
        <span className="absolute inset-0 flex items-center justify-center uppercase text-lg tracking-wider font-medium border-2 border-black bg-white/90 text-black transform-style-3d rotate-x-90 translate-z-25 transition-all duration-500 cube-face hover:bg-[#00ADB5]/80 hover:text-white">
          {text}
        </span>
      </a>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .rotate-x-0 {
          transform: rotateX(0deg) translateZ(25px);
        }

        .rotate-x-90 {
          transform: rotateX(90deg) translateZ(25px);
        }

        .rotate-x-180 {
          transform: rotateX(180deg) translateZ(25px);
        }

        .rotate-x-270 {
          transform: rotateX(270deg) translateZ(25px);
        }

        .rotate-x-360 {
          transform: rotateX(360deg);
        }

        .translate-z-25 {
          transform: translateZ(25px);
        }

        .hover\\:rotate-x-360:hover {
          transform: perspective(1000px) rotateX(360deg);
        }

        .cube-face {
          backface-visibility: visible;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Button;
