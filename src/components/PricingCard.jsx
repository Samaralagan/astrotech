import React, { useRef, useEffect } from "react";
import { CheckmarkIcon, CartIcon } from "./PricingIcons";

const PricingCard = ({
  title,
  price,
  icon,
  features,
  buttonColor,
  highlightBadge,
  isFeatured = false,
  gradientFrom,
  gradientTo,
  headerBgFrom,
  rotateClass,
  depth = 20,
}) => {
  const cardRef = useRef(null);

  // Create CSS class strings based on prop values
  const headerBgClass = `from-${headerBgFrom}-50`;
  const gradientClasses = `from-${gradientFrom}-500 to-${gradientTo}-400`;
  const buttonGradientClass = `from-${buttonColor}-500 to-${buttonColor}-400`;
  const featureActiveClass = isFeatured
    ? `bg-gradient-to-r from-${gradientFrom}-500 to-${gradientTo}-500`
    : `bg-${gradientFrom}-500`;

  // Card tilt effect
  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate the tilt angle (max 10 degrees)
        const tiltX = ((y - centerY) / centerY) * 5;
        const tiltY = ((centerX - x) / centerX) * 5;

        // Apply transform with existing transforms preserved
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${depth}px)`;
      };

      const handleMouseLeave = () => {
        // Reset transform on mouse leave with animation
        card.style.transition = "transform 0.5s ease-out";
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateZ(0)`;
        setTimeout(() => {
          card.style.transition = "";
        }, 500);
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [depth]);

  return (
    <div
      ref={cardRef}
      className={`pricing-card relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl w-72 flex flex-col pb-8 transform transition-all duration-500 hover:${rotateClass} hover:shadow-2xl border border-white/30
        ${isFeatured ? "scale-110 z-20 border-2 border-purple-100" : ""}
      `}
      style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
    >
      {/* Highlight Badge */}
      {highlightBadge && (
        <div
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-teal-500 text-white py-2 px-6 rounded-full shadow-lg z-30"
          style={{ transform: "translateX(-50%) translateZ(40px)" }}
        >
          <span className="text-sm font-bold uppercase tracking-wider">
            {highlightBadge}
          </span>
        </div>
      )}

      {/* Glass Reflection Effect */}
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-transparent opacity-50 pointer-events-none"
        style={{ transform: "translateZ(5px)" }}
      ></div>

      {/* Card Header */}
      <div
        className="w-full flex flex-col items-center pt-12 pb-8 relative"
        style={{ transform: "translateZ(10px)" }}
      >
        <div
          className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${headerBgClass} to-transparent rounded-t-3xl -z-10`}
        ></div>
        <p className="text-gray-500 font-medium mb-2">{title}</p>
        <div className="transform transition-transform hover:scale-110 duration-300">
          {icon}
        </div>
      </div>

      {/* Price Tag Ribbon */}
      <div
        className="absolute right-0 top-36 transform hover:scale-110 transition-transform duration-300"
        style={{ transform: "translateZ(15px)" }}
      >
        <div
          className={`bg-gradient-to-r ${gradientClasses} text-white py-3 px-8 rounded-l-full shadow-lg relative`}
        >
          <span className="text-2xl font-medium">{price}</span>
          <div className="absolute inset-0 bg-white opacity-20 rounded-l-full pulse-animation"></div>
        </div>
      </div>

      {/* Features */}
      <div
        className="mt-20 px-10 w-full space-y-6"
        style={{ transform: "translateZ(20px)" }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-item flex items-center justify-between group"
          >
            <span
              className={`text-gray-600 text-lg group-hover:text-${gradientFrom}-600 transition-colors duration-300`}
            >
              {feature.name}
            </span>
            <div
              className={`w-7 h-7 rounded-full ${
                feature.included
                  ? featureActiveClass + " flex items-center justify-center"
                  : `border-2 border-${gradientFrom}-100`
              } 
                transform group-hover:${
                  feature.included ? "scale-110" : `border-${gradientFrom}-300`
                } transition-all duration-300`}
            >
              {feature.included && <CheckmarkIcon />}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Button */}
      <div
        className="w-full flex justify-center mt-10"
        style={{ transform: "translateZ(25px)" }}
      >
        <button
          className={`bg-gradient-to-r ${buttonGradientClass} text-white py-3 px-12 rounded-full flex items-center justify-center shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <CartIcon />
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
