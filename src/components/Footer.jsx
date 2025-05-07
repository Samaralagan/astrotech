import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-black text-[#EEEEEE] py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0a0a0a, #141414)",
        boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)",
      }}
    >
      {/* Curved gradient light effect at the bottom - 75% width with circular appearance */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4">
        <div
          className="h-64 bg-gradient-to-t from-[#00ADB5]/40 to-transparent rounded-t-full"
          style={{
            filter: "blur(70px)",
            transform: "translateY(30px)",
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(0,173,181,0.5) 0%, transparent 70%)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="mb-8 flex justify-center">
          <button className="bg-[#EEEEEE] text-[#222831] font-bold py-3 px-6 rounded-full flex items-center transition-all hover:bg-[#00ADB5]">
            Level Up Your AI
            <span className="ml-2">→</span>
          </button>
        </div>

        <div className="text-center text-sm mb-12">
          <p>No monthly fees. Pay once, use forever. Refund within 7 days.</p>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="text-[#EEEEEE] hover:text-[#00ADB5]">
            Terms
          </a>
          <a href="#" className="text-[#EEEEEE] hover:text-[#00ADB5]">
            Privacy
          </a>
        </div>

        {/* Company Info */}
        <div className="flex flex-col md:flex-row justify-center items-center text-xs text-[#EEEEEE]/70">
          <div className="flex items-center mb-2 md:mb-0">
            <span className="font-bold">RabbitHoles</span>
            <span className="mx-1 px-1 bg-[#393E46] rounded text-xs">AI</span>
            <span className="mx-2">
              C/o Lokus, LLC 295, 447 Broadway, 2nd Floor New York, NY 10013
            </span>
          </div>
          <div>© 2025 Lokus, LLC</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
