import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  // State management
  const [activePath, setActivePath] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Navigation links
  const links = [
    { name: "Home", href: "/", icon: "home" },
    { name: "Contact Us", href: "/contactus", icon: "mail" },
    { name: "Blog", href: "/blog", icon: "document" },
    { name: "Pricing", href: "/pricing", icon: "dollar" },
  ];

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }

      // Reset sidebar state when resizing below threshold
      if (window.innerWidth < 640 && isSidebar) {
        setIsSidebar(false);
        setIsExpanded(false);
      }
    };

    // Set initial active path based on current location
    setActivePath(window.location.pathname);

    // Add window resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen, isSidebar]);

  // Handle scroll events for navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      // Only enable sidebar transformation on larger screens
      const shouldEnableSidebar = windowWidth >= 640;

      if (window.scrollY > 50 && !isSidebar && shouldEnableSidebar) {
        setIsScrolled(true);
        setIsAnimating(true);
        setIsSidebar(true);

        // Reset animation flag after animation completes
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      } else if (window.scrollY <= 50 && isSidebar) {
        setIsSidebar(false);
        setIsExpanded(false);
        setIsScrolled(false);
      } else if (window.scrollY > 50 && !shouldEnableSidebar) {
        // For mobile, just add the scrolled class without sidebar transformation
        setIsScrolled(true);
      } else if (window.scrollY <= 50 && !shouldEnableSidebar) {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSidebar, windowWidth]);

  // Function to determine if a link is active
  const isActive = (path) => {
    if (path === "/" && activePath === "/") {
      return true;
    }
    return path !== "/" && activePath.startsWith(path);
  };

  // Icon components for sidebar
  const getIcon = (iconName) => {
    switch (iconName) {
      case "home":
        return (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "mail":
        return (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "document":
        return (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case "dollar":
        return (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "thunder":
        return (
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Animation element that shows transition from top to side
  const AnimationIndicator = () => {
    if (!isAnimating) return null;

    return (
      <div className="fixed z-60 pointer-events-none">
        <div className="bg-teal-500 w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-navbar-transition"></div>
      </div>
    );
  };

  // Handle clicking outside mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Render the top navbar when not in sidebar mode
  if (!isSidebar) {
    return (
      <>
        <nav
          ref={navbarRef}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "h-12 sm:h-14 shadow-md bg-[#222831] bg-opacity-95"
              : "h-14 sm:h-16 overflow-hidden"
          }`}
        >
          {/* Background gradients for non-scrolled state */}
          {!isScrolled && (
            <>
              {/* Center gradient background that fades out at both ends */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#222831] to-transparent"></div>

              {/* Additional gradient for accent in the center */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#393E46] to-transparent opacity-50"></div>

              {/* Subtle teal accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ADB5] to-transparent opacity-10"></div>
            </>
          )}

          {/* Main content container */}
          <div className="max-w-7xl mx-auto px-3 sm:px-4 h-full">
            <div className="flex items-center justify-center h-full relative z-20">
              {/* Center-aligned container with logo and desktop nav */}
              <div className="flex items-center justify-center">
                {/* Logo now centered with nav items */}
                <a href="/" className="flex items-center mr-3 md:mr-6">
                  <img
                    src={logo.src}
                    alt="Logo"
                    className="h-8 sm:h-10 w-auto object-contain"
                  />
                </a>

                {/* Desktop navigation links - hidden on mobile */}
                <div className="hidden md:flex items-center justify-center gap-4 lg:gap-8">
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`font-medium uppercase text-sm lg:text-base transition-all duration-300 relative menu-item ${
                        isActive(link.href)
                          ? "text-teal-400"
                          : "text-gray-100 hover:text-teal-300"
                      }`}
                      onMouseEnter={() => setActiveHover(link.name)}
                      onMouseLeave={() => setActiveHover(null)}
                    >
                      {link.name}

                      {/* Active indicator line */}
                      {isActive(link.href) && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-400 rounded-full"></span>
                      )}

                      {/* Fill effect on hover */}
                      <span className="menu-fill-effect"></span>
                    </a>
                  ))}

                  {/* Login/Signup button */}
                  <a
                    href="/signin"
                    className="ml-2 lg:ml-4 px-3 lg:px-4 py-1.5 lg:py-2 bg-teal-500 text-white text-xs lg:text-sm rounded-md hover:bg-teal-600 transition-colors whitespace-nowrap flex items-center relative overflow-hidden font-medium"
                  >
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Login
                    <span className="menu-fill-effect-cta"></span>
                  </a>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden absolute right-0">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-teal-400 focus:outline-none"
                  aria-expanded={isMobileMenuOpen}
                >
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile menu dropdown - fixed position with height limitation and scrolling */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className={`fixed top-0 left-0 right-0 mt-12 sm:mt-14 md:hidden bg-[#222831] shadow-lg max-h-[80vh] overflow-y-auto z-40 ${
              isScrolled ? "block" : "block"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm sm:text-base font-medium relative overflow-hidden ${
                    isActive(link.href)
                      ? "text-teal-400 bg-[#393E46]"
                      : "text-gray-100 hover:text-teal-300 hover:bg-[#393E46]/50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{getIcon(link.icon)}</span>
                  {link.name}
                  <span className="mobile-menu-fill-effect"></span>
                </a>
              ))}
              <a
                href="/signin"
                className="flex items-center px-3 py-2 rounded-md text-sm sm:text-base font-medium bg-teal-500 text-white hover:bg-teal-600 relative overflow-hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-3">{getIcon("thunder")}</span>
                Login
                <span className="mobile-menu-fill-effect-cta"></span>
              </a>
            </div>
          </div>
        )}

        {/* CSS for animations and effects */}
        <style jsx>{`
          .menu-item {
            position: relative;
            overflow: hidden;
          }

          .menu-fill-effect {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 0;
            background-color: rgba(45, 212, 191, 0.1);
            transition: height 0.4s ease-out;
            pointer-events: none;
            z-index: -1;
          }

          .menu-fill-effect-cta {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 0;
            background-color: rgba(13, 148, 136, 0.3);
            transition: height 0.4s ease-out;
            pointer-events: none;
            z-index: -1;
          }

          .menu-item:hover .menu-fill-effect,
          a:hover .menu-fill-effect-cta {
            height: 100%;
          }

          .mobile-menu-fill-effect {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 0;
            background-color: rgba(45, 212, 191, 0.1);
            transition: height 0.4s ease-out;
            pointer-events: none;
            z-index: -1;
          }

          .mobile-menu-fill-effect-cta {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 0;
            background-color: rgba(13, 148, 136, 0.3);
            transition: height 0.4s ease-out;
            pointer-events: none;
            z-index: -1;
          }

          a:hover .mobile-menu-fill-effect,
          a:hover .mobile-menu-fill-effect-cta {
            height: 100%;
          }
        `}</style>
      </>
    );
  }

  // Render sidebar mode when scrolled and screen is large enough
  return (
    <>
      {/* Animation indicator */}
      <AnimationIndicator />

      {/* Fixed expand button that shows all the time */}
      <div
        className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-50 ${
          isExpanded ? "hidden" : "block"
        } transition-all duration-500 ${
          isAnimating ? "animate-appear-from-top" : ""
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onClick={() => setIsExpanded(true)} /* Added for touch devices */
      >
        <button
          className="bg-teal-500 text-white rounded-r-md shadow-md hover:bg-teal-600 transition-all duration-300 flex items-center justify-center"
          style={{ padding: "0.8rem 0.4rem" }}
          aria-label="Expand menu"
        >
          <span className="text-2xl sm:text-3xl font-bold">»</span>
        </button>
      </div>

      {/* Expanded sidebar that appears on hover/click - Icons only */}
      <nav
        className={`fixed left-0 top-1/2 transform -translate-y-1/2 bg-[#222831] shadow-md rounded-r-lg z-50 transition-all duration-500 ${
          isExpanded
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible -translate-x-full"
        }`}
        onMouseLeave={() => {
          setIsExpanded(false);
          setActiveIcon(null);
        }}
      >
        <div className="py-2 sm:py-3 px-1">
          {/* Logo at top of sidebar */}

          <ul className="space-y-3 sm:space-y-5">
            {links.map((link) => (
              <li key={link.name} className="relative">
                <a
                  href={link.href}
                  className={`flex items-center justify-center p-1.5 sm:p-2 transition-colors rounded-md font-medium ${
                    isActive(link.href)
                      ? "text-teal-400"
                      : "text-gray-100 hover:text-teal-300 hover:bg-[#393E46]/50"
                  }`}
                  title={link.name}
                  onMouseEnter={() => setActiveIcon(link.name)}
                  onMouseLeave={() => setActiveIcon(null)}
                  onClick={() => {
                    // Close sidebar on touch devices after clicking a link
                    if (windowWidth < 1024) {
                      setIsExpanded(false);
                      setActiveIcon(null);
                    }
                  }}
                >
                  <span className="inline-flex items-center justify-center">
                    {getIcon(link.icon)}
                  </span>

                  {/* Tooltip that shows name on hover - positioned differently based on screen size */}
                  {activeIcon === link.name && (
                    <div className="absolute left-full ml-2 bg-gray-800 text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 rounded whitespace-nowrap font-medium">
                      {link.name}
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 sm:mt-5 pt-1 sm:pt-2 flex justify-center">
            <a
              href="/signin"
              className="p-1.5 sm:p-2 text-teal-400 hover:text-teal-300 hover:bg-[#393E46]/50 rounded-md transition-colors font-medium"
              title="Login"
              onMouseEnter={() => setActiveIcon("login")}
              onMouseLeave={() => setActiveIcon(null)}
              onClick={() => {
                // Close sidebar on touch devices after clicking
                if (windowWidth < 1024) {
                  setIsExpanded(false);
                  setActiveIcon(null);
                }
              }}
            >
              {getIcon("thunder")}

              {/* Tooltip for Login */}
              {activeIcon === "login" && (
                <div className="absolute left-full ml-2 bg-gray-800 text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 rounded whitespace-nowrap font-medium">
                  Login
                </div>
              )}
            </a>
          </div>
        </div>
      </nav>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes navbarTransition {
          0% {
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
          }
          100% {
            top: 50%;
            left: 0;
            transform: translate(0, -50%);
          }
        }

        @media (min-width: 640px) {
          @keyframes navbarTransition {
            0% {
              top: 14px;
              left: 50%;
              transform: translateX(-50%);
            }
            100% {
              top: 50%;
              left: 0;
              transform: translate(0, -50%);
            }
          }
        }

        @keyframes appearFromTop {
          0% {
            opacity: 0;
            top: 0;
            transform: translateY(-100%);
          }
          20% {
            opacity: 1;
            top: 7px;
            transform: translateY(0);
          }
          100% {
            opacity: 1;
            top: 50%;
            transform: translateY(-50%);
          }
        }

        .animate-navbar-transition {
          animation: navbarTransition 1s ease-in-out forwards;
        }

        .animate-appear-from-top {
          animation: appearFromTop 0.8s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}
