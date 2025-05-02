import React, { useState, useEffect, useRef } from "react";
import button from "../assets/button.png";
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef(null);
  const dotsArray = useRef([]);
  const animationFrameId = useRef(null);
  // New refs for button text measurement
  const buttonTextRef = useRef(null);
  const buttonRef = useRef(null);
  // Ref for 3D heading effect
  const headingRef = useRef(null);

  // Generate dots data for the canvas
  const generateDots = (width, height) => {
    const dotSpacing = 40;
    const dots = [];

    for (let x = 0; x < width; x += dotSpacing) {
      for (let y = 0; y < height; y += dotSpacing) {
        dots.push({
          x,
          y,
          radius: 2,
          originalX: x,
          originalY: y,
          vx: 0,
          vy: 0,
          // Each line will have its own animation cycle
          connections: [],
          connectionTimer: Math.random() * 100, // Random starting point in the animation cycle
        });
      }
    }

    return dots;
  };

  // Initialize canvas and dots
  useEffect(() => {
    if (isMounted && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions
      canvas.width = windowSize.width;
      canvas.height = windowSize.height;

      // Generate dots with less movement
      dotsArray.current = generateDots(
        windowSize.width + 100,
        windowSize.height + 100
      );

      let mouseRadius = 0;
      let targetMouseRadius = 0;

      // Animation function
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Smooth mouse radius for gentle effect
        targetMouseRadius = 100;
        mouseRadius += (targetMouseRadius - mouseRadius) * 0.1;

        // First pass - build connections
        dotsArray.current.forEach((dot, index) => {
          // Update connection timer for animation cycle
          dot.connectionTimer = (dot.connectionTimer + 0.5) % 200;

          // Reset connections
          dot.connections = [];

          // Find nearby dots to potentially connect with
          dotsArray.current.forEach((otherDot, otherIndex) => {
            if (index !== otherIndex) {
              const dx = dot.x - otherDot.x;
              const dy = dot.y - otherDot.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const maxDistance = 70;

              if (distance < maxDistance) {
                // Store connection info with animation value
                dot.connections.push({
                  dot2: otherDot,
                  distance: distance,
                  maxDistance: maxDistance,
                  // Different animation phase for each connection
                  progress:
                    Math.sin((dot.connectionTimer + otherIndex) * 0.05) * 0.5 +
                    0.5,
                });
              }
            }
          });
        });

        // Second pass - draw connections with animation
        dotsArray.current.forEach((dot, index) => {
          // Draw connections first (behind dots)
          dot.connections.forEach((conn) => {
            if (conn.progress > 0.05) {
              // Only draw if visible in animation cycle
              const opacity = conn.progress * 0.5; // Animate opacity
              const lineWidth = conn.progress * 1; // Animate line width

              ctx.strokeStyle = `rgba(0, 173, 181, ${opacity})`;
              ctx.lineWidth = lineWidth;

              ctx.beginPath();
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(conn.dot2.x, conn.dot2.y);
              ctx.stroke();
            }
          });
        });

        // Third pass - draw dots
        dotsArray.current.forEach((dot) => {
          // Calculate distance from mouse with smoothing
          const dx = mousePosition.x - dot.x;
          const dy = mousePosition.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Move dots away from mouse with gentler force
          if (distance < mouseRadius) {
            // Much gentler force that decreases with distance
            const force = ((mouseRadius - distance) / mouseRadius) * 0.015;
            const directionX = dx / distance || 0;
            const directionY = dy / distance || 0;

            // Apply very gentle push
            dot.vx -= directionX * force;
            dot.vy -= directionY * force;
          }

          // Apply much lower velocity
          dot.x += dot.vx;
          dot.y += dot.vy;

          // Higher friction for more stability
          dot.vx *= 0.85;
          dot.vy *= 0.85;

          // Very gentle return to original position
          const returnForce = 0.02;
          dot.vx += (dot.originalX - dot.x) * returnForce;
          dot.vy += (dot.originalY - dot.y) * returnForce;

          // Draw dot with solid color
          ctx.fillStyle = "#393E46";
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        animationFrameId.current = requestAnimationFrame(animate);
      };

      // Start animation
      animate();

      // Cleanup
      return () => {
        cancelAnimationFrame(animationFrameId.current);
      };
    }
  }, [isMounted, windowSize]);

  // Adjust button size based on content
  useEffect(() => {
    if (isMounted && buttonTextRef.current && buttonRef.current) {
      // Function to resize the button based on text
      const resizeButton = () => {
        // Force a recalculation of the text width by getting its client width
        const textWidth = buttonTextRef.current.offsetWidth;
        const textHeight = buttonTextRef.current.offsetHeight;

        // Add padding to the button background
        const horizontalPadding = 40; // px on each side
        const verticalPadding = 20; // px on top and bottom

        // Set the button background size with a slight extra to ensure fit
        buttonRef.current.style.width = `${textWidth + horizontalPadding}px`;
        buttonRef.current.style.height = `${textHeight + verticalPadding}px`;

        // Ensure button dimensions are center-aligned with text
        buttonRef.current.style.left = "50%";
        buttonRef.current.style.top = "50%";
        buttonRef.current.style.transform = "translate(-50%, -50%)";
      };

      // Initial resize
      resizeButton();

      // Create a MutationObserver to watch for text content changes
      const observer = new MutationObserver(resizeButton);

      // Start observing the text element for content changes
      observer.observe(buttonTextRef.current, {
        childList: true,
        characterData: true,
        subtree: true,
      });

      // Handle window resize as well
      window.addEventListener("resize", resizeButton);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", resizeButton);
      };
    }
  }, [isMounted]);

  // Add 3D effect to heading on mouse movement
  useEffect(() => {
    if (isMounted && headingRef.current) {
      const updateHeading3DEffect = () => {
        if (!headingRef.current) return;

        // Calculate how far the mouse is from the center of the screen
        const centerX = windowSize.width / 2;
        const centerY = windowSize.height / 2;

        // Calculate the angle based on mouse position relative to center
        const deltaX = (mousePosition.x - centerX) / centerX;
        const deltaY = (mousePosition.y - centerY) / centerY;

        // Apply rotation transform (limited range for subtle effect)
        const rotateX = deltaY * -5; // Invert Y axis for natural tilt
        const rotateY = deltaX * 5;

        // Apply the transform
        headingRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };

      updateHeading3DEffect();

      return () => {
        if (headingRef.current) {
          headingRef.current.style.transform = "none";
        }
      };
    }
  }, [isMounted, mousePosition, windowSize]);

  // Throttle mouse move updates for smoother animation
  useEffect(() => {
    if (isMounted) {
      const throttledMouseMove = (e) => {
        // Use requestAnimationFrame for smoother updates
        window.requestAnimationFrame(() => {
          setMousePosition({
            x: e.clientX,
            y: e.clientY,
          });
        });
      };

      window.addEventListener("mousemove", throttledMouseMove);
      return () => {
        window.removeEventListener("mousemove", throttledMouseMove);
      };
    }
  }, [isMounted]);

  useEffect(() => {
    // Only run on client-side
    setIsMounted(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Compute relative mouse position for parallax without accessing window during SSR
  const getParallaxTransform = () => {
    if (!isMounted) return { transform: "translate(0px, 0px)" };

    const offsetX = (mousePosition.x - windowSize.width / 2) / 50;
    const offsetY = (mousePosition.y - windowSize.height / 2) / 50;

    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
      transition: "transform 0.2s ease-out",
    };
  };

  // Only show glow on client-side
  const getGlowStyles = () => {
    if (!isMounted) return {};

    return {
      backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 173, 181, 0.4) 0%, transparent 8%)`,
      backgroundSize: "24px 24px",
      backgroundPosition: "0 0",
      animation: "pulse 4s ease-in-out infinite alternate",
    };
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#222831]">
      {/* Interactive animated dots canvas */}
      {isMounted && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        />
      )}

      {/* Static fallback for SSR */}
      {!isMounted && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <defs>
              <pattern
                id="grid-dots"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="2" fill="#393E46" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-dots)" />
          </svg>
        </div>
      )}

      {/* Glow effect layer */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={getGlowStyles()}
      ></div>

      {/* Hero content with animation */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <div
          className="animate-fadeIn opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          {/* 3D Heading with layers for depth effect */}
          <div
            ref={headingRef}
            className="transition-transform duration-200 ease-out"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#EEEEEE] mb-6 animate-slideUp relative"
              style={{
                textShadow: "0 0 20px rgba(0, 173, 181, 0.3)",
                transform: "translateZ(0px)",
              }}
            >
              {/* Background shadow layers for depth */}
              <span
                className="absolute inset-0 text-[#00ADB5]/10"
                style={{
                  transform:
                    "translateZ(-100px) translateX(-10px) translateY(-10px)",
                  filter: "blur(2px)",
                }}
              >
                Crafting Digital Experiences
              </span>
              <span
                className="absolute inset-0 text-[#00ADB5]/20"
                style={{
                  transform:
                    "translateZ(-75px) translateX(-8px) translateY(-8px)",
                  filter: "blur(1px)",
                }}
              >
                Crafting Digital Experiences
              </span>
              <span
                className="absolute inset-0 text-[#EEEEEE]/40"
                style={{
                  transform:
                    "translateZ(-50px) translateX(-5px) translateY(-5px)",
                }}
              >
                Crafting Digital Experiences
              </span>
              <span
                className="absolute inset-0 text-[#EEEEEE]/70"
                style={{
                  transform:
                    "translateZ(-25px) translateX(-2px) translateY(-2px)",
                }}
              >
                Crafting Digital Experiences
              </span>
              {/* Main visible text */}
              <span style={{ position: "relative", zIndex: 5 }}>
                Crafting Digital Experiences
              </span>
              {/* Highlight layer */}
              <span
                className="absolute inset-0 text-[#00ADB5]/30"
                style={{
                  transform: "translateZ(10px) translateX(2px) translateY(2px)",
                  filter: "blur(1px)",
                }}
              >
                Crafting Digital Experiences
              </span>
            </h1>
          </div>
        </div>
        <div
          className="animate-fadeIn opacity-0"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          <p className="text-xl md:text-2xl text-[#EEEEEE]/80 max-w-2xl mx-auto mb-8">
            We blend innovation and expertise to create solutions that transform
            businesses and delight users.
          </p>
        </div>
        <div
          className="flex flex-wrap justify-center gap-4 animate-fadeIn opacity-0"
          style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
        >
          {/* Modified custom button with responsive background */}
          <a
            href="/contact"
            className="relative inline-block transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Button image background that scales with content */}
            <div
              ref={buttonRef}
              className="absolute bg-no-repeat bg-center bg-contain transition-all duration-300"
              style={{
                backgroundImage: `url(${button.src})`,
                // Initial size that will be overridden by the useEffect
                width: "auto",
                height: "auto",
              }}
            ></div>

            {/* Button text that determines the size - perfectly centered */}
            <span
              ref={buttonTextRef}
              className="relative z-10 inline-block px-8 py-4 text-lg font-medium text-[#EEEEEE] whitespace-nowrap"
            >
              Contact Us
            </span>
          </a>
        </div>
      </div>

      {/* Accent color circles with animation */}
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#00ADB5]/20 blur-3xl"
        style={{
          animation: "float 8s ease-in-out infinite alternate",
          transformOrigin: "center center",
        }}
      ></div>
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#00ADB5]/10 blur-3xl"
        style={{
          animation: "float 6s ease-in-out infinite alternate-reverse",
          transformOrigin: "center center",
        }}
      ></div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        .animate-slideUp {
          animation: slideUp 1s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
