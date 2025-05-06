import { useState, useEffect, useRef } from "react";
import { Code } from "lucide-react";

export default function Partners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [codeEffect, setCodeEffect] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayTimerRef = useRef(null);
  const containerRef = useRef(null);

  const partners = [
    {
      name: "TechForge AI",
      logo: "/api/placeholder/150/100",
      link: "https://example.com/techforge",
    },
    {
      name: "DevMatrix",
      logo: "/api/placeholder/150/100",
      link: "https://example.com/devmatrix",
    },
    {
      name: "CodeSphere",
      logo: "/api/placeholder/150/100",
      link: "https://example.com/codesphere",
    },
    {
      name: "Neural Labs",
      logo: "/api/placeholder/150/100",
      link: "https://example.com/neurallabs",
    },
    {
      name: "SyntaxGenius",
      logo: "/api/placeholder/150/100",
      link: "https://example.com/syntaxgenius",
    },
  ];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add shine effect
  useEffect(() => {
    if (containerRef.current) {
      const styleSheet = document.styleSheets[0];
      const keyframes = `
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!isHovering) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isHovering]);

  // AI code effect animation
  useEffect(() => {
    const codeLines = [
      "import ai from 'partner-ai';",
      "const solution = await ai.generateCode();",
      "export function optimize(code) {",
      "  return ai.enhance(code);",
      "}",
    ];

    let currentLine = 0;
    let currentChar = 0;
    let text = "";
    let isDeleting = false;

    const typeWriter = () => {
      const line = codeLines[currentLine];

      if (!isDeleting) {
        text = line.substring(0, currentChar + 1);
        currentChar++;

        if (currentChar === line.length) {
          isDeleting = true;
          setTimeout(typeWriter, 1500);
          return;
        }
      } else {
        text = line.substring(0, currentChar - 1);
        currentChar--;

        if (currentChar === 0) {
          isDeleting = false;
          currentLine = (currentLine + 1) % codeLines.length;
        }
      }

      setCodeEffect(text);
      setTimeout(typeWriter, isDeleting ? 50 : 100);
    };

    typeWriter();

    return () => clearTimeout(typeWriter);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === partners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? partners.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      className="py-16 px-4 relative overflow-hidden md:px-8"
      style={{
        borderColor: "#00ADB5/20",
        margin: isMobile ? "0" : "0px 40px 0px 40px",
      }}
    >
      {/* Mobile container */}
      <div className="container mx-auto relative z-10 lg:hidden">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Mobile heading */}
          <h1 className="text-3xl md:text-4xl lg:hidden font-bold mb-12 text-center w-full bg-gradient-to-r from-[#00ADB5] to-[#EEEEEE] bg-clip-text text-transparent">
            Our Trusted Partners
          </h1>

          {/* Partners display (centered on mobile) */}
          <div
            className="w-full flex justify-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="flex flex-col">
              <div
                ref={containerRef}
                className="p-6 rounded-lg transition-all mb-6 transform perspective-1000 hover:rotate-y-5 relative overflow-hidden border border-[#00ADB5]/20 bg-gradient-to-br from-[#393E46]/30 to-[#222831]/80 backdrop-blur-lg shadow-xl"
                style={{
                  backgroundColor: "#393E46",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s ease, box-shadow 0.5s ease",
                  borderRadius: "0rem 5rem 0rem 5rem",
                  boxShadow: "0 8px 32px 0 rgba(0, 173, 181, 0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Glass shine effect */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(238,238,238,0.2), transparent)",
                    transform: "skewX(-20deg)",
                    animation: "shine 6s infinite",
                  }}
                />

                <a
                  href={partners[currentIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div
                    className="p-4 rounded-md mb-4 flex items-center justify-center w-full h-32 relative overflow-hidden group"
                    style={{
                      backgroundColor: "#222831",
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      transform: "translateZ(20px)",
                      borderRadius: "0rem 3rem 0rem 3rem",
                    }}
                  >
                    {/* Coding effect overlay */}
                    <div
                      className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      <Code className="mr-2" size={20} color="#00ADB5" />
                      <span
                        className="text-sm font-mono"
                        style={{ color: "#00ADB5" }}
                      >
                        Visit Partner
                      </span>
                    </div>

                    <img
                      src={partners[currentIndex].logo}
                      alt={`${partners[currentIndex].name} logo`}
                      className="w-40 h-auto max-h-24 object-contain transform group-hover:scale-105 transition-transform"
                      width="150"
                      height="100"
                      style={{ transform: "translateZ(30px)" }}
                    />
                  </div>
                </a>

                <h3
                  className="text-xl font-medium text-center"
                  style={{ color: "#EEEEEE", transform: "translateZ(15px)" }}
                >
                  {partners[currentIndex].name}
                </h3>

                <div
                  className="flex items-center mt-4 space-x-4"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <div className="flex-1 flex items-center justify-center">
                    {partners.map((_, idx) => (
                      <span
                        key={idx}
                        className={`block w-2 h-2 rounded-full mx-1 cursor-pointer transform hover:scale-125 transition-transform ${
                          idx === currentIndex ? "opacity-100" : "opacity-30"
                        }`}
                        style={{
                          backgroundColor:
                            idx === currentIndex ? "#00ADB5" : "#EEEEEE",
                        }}
                        onClick={() => setCurrentIndex(idx)}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Code Animation Box - Reduced width */}
              <div
                className="p-4 rounded-lg font-mono text-sm relative transform overflow-hidden border border-[#00ADB5]/20 w-3/4 mx-auto"
                style={{
                  backgroundColor: "#393E46",
                  color: "#EEEEEE",
                  transition: "transform 0.5s ease, box-shadow 0.5s ease",
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderRadius: "0rem 2rem 0rem 2rem",
                }}
              >
                {/* Glass shine effect for code box */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(238,238,238,0.2), transparent)",
                    transform: "skewX(-20deg)",
                    animation: "shine 8s infinite",
                  }}
                />

                <div
                  className="flex items-center space-x-2 mb-2"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs ml-2 opacity-50">
                    partner_integration.js
                  </span>
                </div>
                <div
                  className="h-16 overflow-hidden"
                  style={{ transform: "translateZ(15px)" }}
                >
                  <pre>
                    <code style={{ color: "#00ADB5" }}>
                      {codeEffect}
                      <span className="animate-pulse">|</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop container */}
      <div className="container mx-auto relative z-10 hidden lg:block">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Partners display (left side) */}
          <div
            className="w-full md:w-1/2 mb-10 md:mb-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="flex flex-col">
              <div
                ref={containerRef}
                className="p-6 rounded-lg transition-all mb-6 transform perspective-1000 hover:rotate-y-5 relative overflow-hidden border border-[#00ADB5]/20 bg-gradient-to-br from-[#393E46]/30 to-[#222831]/80 backdrop-blur-lg shadow-xl"
                style={{
                  backgroundColor: "#393E46",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s ease, box-shadow 0.5s ease",
                  borderRadius: "0rem 10rem 0rem 10rem",
                  boxShadow: "0 8px 32px 0 rgba(0, 173, 181, 0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Glass shine effect */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(238,238,238,0.2), transparent)",
                    transform: "skewX(-20deg)",
                    animation: "shine 6s infinite",
                  }}
                />

                <a
                  href={partners[currentIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div
                    className="p-4 rounded-md mb-4 flex items-center justify-center w-full h-32 relative overflow-hidden group"
                    style={{
                      backgroundColor: "#222831",
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      transform: "translateZ(20px)",
                      borderRadius: "0rem 8rem 0rem 8rem",
                    }}
                  >
                    {/* Coding effect overlay */}
                    <div
                      className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      <Code className="mr-2" size={20} color="#00ADB5" />
                      <span
                        className="text-sm font-mono"
                        style={{ color: "#00ADB5" }}
                      >
                        Visit Partner
                      </span>
                    </div>

                    <img
                      src={partners[currentIndex].logo}
                      alt={`${partners[currentIndex].name} logo`}
                      className="w-40 h-auto max-h-24 object-contain transform group-hover:scale-105 transition-transform"
                      width="150"
                      height="100"
                      style={{ transform: "translateZ(30px)" }}
                    />
                  </div>
                </a>

                <h3
                  className="text-xl font-medium text-center"
                  style={{ color: "#EEEEEE", transform: "translateZ(15px)" }}
                >
                  {partners[currentIndex].name}
                </h3>

                <div
                  className="flex items-center mt-4 space-x-4"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <div className="flex-1 flex items-center justify-center">
                    {partners.map((_, idx) => (
                      <span
                        key={idx}
                        className={`block w-3 h-3 rounded-full mx-1 cursor-pointer transform hover:scale-125 transition-transform ${
                          idx === currentIndex ? "opacity-100" : "opacity-30"
                        }`}
                        style={{
                          backgroundColor:
                            idx === currentIndex ? "#00ADB5" : "#EEEEEE",
                        }}
                        onClick={() => setCurrentIndex(idx)}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Code Animation Box - Reduced width */}
              <div
                className="p-4 rounded-lg font-mono text-sm relative overflow-hidden border border-[#00ADB5]/20 w-[88%] mx-auto"
                style={{
                  backgroundColor: "#393E46",
                  color: "#EEEEEE",
                  transition: "transform 0.5s ease, box-shadow 0.5s ease",
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderRadius: "0rem 4rem 0rem 4rem",
                }}
              >
                {/* Glass shine effect for code box */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(238,238,238,0.2), transparent)",
                    transform: "skewX(-20deg)",
                    animation: "shine 8s infinite",
                  }}
                />

                <div
                  className="flex items-center space-x-2 mb-2"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs ml-2 opacity-50">
                    partner_integration.js
                  </span>
                </div>
                <div
                  className="h-16 overflow-hidden"
                  style={{ transform: "translateZ(15px)" }}
                >
                  <pre>
                    <code style={{ color: "#00ADB5" }}>
                      {codeEffect}
                      <span className="animate-pulse">|</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Heading and text (right side) */}
          <div className="w-full md:w-1/2 md:pl-12">
            <h1
              className="hidden lg:block text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-[#00ADB5] to-[#EEEEEE] bg-clip-text text-transparent transform perspective-1000"
              style={{
                textShadow: "0 20px 25px rgba(0, 0, 0, 0.1)",
                transform: "translateZ(5px) rotateX(5deg)",
              }}
            >
              Our Trusted Partners
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
