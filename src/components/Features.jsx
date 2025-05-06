import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Feature items data
const FEATURES = [
  {
    title: "Modern Design",
    description:
      "Clean and modern user interfaces that captivate your audience and enhance user experience.",
    icon: "🎨",
    longDescription:
      "Our modern design philosophy combines minimalist aesthetics with functional elegance. We focus on creating interfaces that not only look beautiful but also provide intuitive navigation and engagement. Using the latest design trends and principles, we ensure your digital presence stands out while maintaining a professional and polished appearance.",
  },
  {
    title: "Responsive Layout",
    description:
      "Fully responsive websites that look amazing on all devices, from mobile to desktop.",
    icon: "📱",
    longDescription:
      "In today's multi-device world, responsiveness isn't optional—it's essential. Our responsive layouts dynamically adapt to any screen size, ensuring your content looks perfect whether viewed on smartphones, tablets, laptops, or desktop computers. We employ fluid grids, flexible images, and intelligent breakpoints to create seamless experiences across all platforms.",
  },
  {
    title: "Performance Optimized",
    description:
      "Lightning-fast loading times and optimized performance for the best user experience.",
    icon: "⚡",
    longDescription:
      "Speed is crucial for user retention and SEO rankings. Our performance optimization techniques include code minification, image compression, lazy loading, and caching strategies to ensure your website loads quickly and runs smoothly. We continuously monitor performance metrics to identify and eliminate bottlenecks, delivering a fast and fluid experience to your users.",
  },
  {
    title: "SEO Friendly",
    description:
      "Built with search engine optimization in mind to help your website rank higher.",
    icon: "🔍",
    longDescription:
      "Visibility is key in the digital landscape. Our SEO-friendly approach incorporates semantic HTML, optimized metadata, proper heading structures, and schema markup to improve your search engine rankings. We implement best practices for site structure, internal linking, and content organization, making it easier for search engines to crawl and index your content effectively.",
  },
];

// Spring animation settings
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Features() {
  // Mobile detection state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ref for the shine effect
  const containerRef = useRef(null);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const x = useMotionValue(0);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Constants for carousel dimensions - increased sizes
  const containerPadding = 16;
  const baseWidth = 400; // Increased from 320
  const baseHeight = 450; // Further increased height
  const itemWidth = baseWidth - containerPadding * 2;
  const itemHeight = baseHeight - containerPadding * 2;
  const trackItemOffset = itemWidth;

  // For infinite loop effect
  const carouselItems = [...FEATURES, FEATURES[0]];

  // Autoplay effect
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === FEATURES.length - 1) {
            return prev + 1; // Animate to clone
          }
          if (prev === carouselItems.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isHovered, carouselItems.length]);

  // Add keyframe animation for shine effect with useEffect
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

  // Handle animation loop reset
  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  // Handle carousel drag
  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const dragThreshold = 50;
    const velocityThreshold = 500;

    if (offset < -dragThreshold || velocity < -velocityThreshold) {
      if (currentIndex === FEATURES.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(Math.min(currentIndex + 1, carouselItems.length - 1));
      }
    } else if (offset > dragThreshold || velocity > velocityThreshold) {
      if (currentIndex === 0) {
        return;
      } else {
        setCurrentIndex(Math.max(currentIndex - 1, 0));
      }
    }
  };

  // Handle feature selection
  const openFeatureModal = (feature) => {
    setSelectedFeature(feature);
    setModalOpen(true);
  };

  return (
    <section
      className="relative overflow-hidden md:px-8"
      style={{
        borderColor: "#00ADB5/20",
        padding: "25px 0px 25px 0px",
        margin: isMobile ? "0" : "0px 40px 0px 40px",
      }}
    >
      <div className="absolute"></div>

      {/* Mobile container without border */}
      <div className="container mx-auto relative z-10 lg:hidden">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Mobile heading - only visible on small screens */}
          <h1 className="text-3xl md:text-4xl lg:hidden font-bold mb-12 text-center w-full bg-gradient-to-r from-[#00ADB5] to-[#EEEEEE] bg-clip-text text-transparent">
            Explore Our Features
          </h1>

          {/* Left side - Carousel */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div
              ref={containerRef}
              className="relative overflow-hidden border border-[#00ADB5]/20 bg-gradient-to-br from-[#393E46]/30 to-[#222831]/80 backdrop-blur-lg shadow-xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: baseWidth,
                height: baseHeight,
                borderRadius: "0rem 10rem 0rem 10rem",
                backgroundImage:
                  "linear-gradient(135deg, rgba(57,62,70,0.3) 0%, rgba(34,40,49,0.8) 100%)",
                boxShadow: "0 8px 32px 0 rgba(0, 173, 181, 0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <motion.div
                className="flex h-full"
                style={{
                  width: itemWidth,
                  perspective: 1000,
                  perspectiveOrigin: `${
                    currentIndex * trackItemOffset + itemWidth / 2
                  }px 50%`,
                  x,
                }}
                animate={{ x: -(currentIndex * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationComplete={handleAnimationComplete}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
              >
                {carouselItems.map((feature, index) => {
                  const range = [
                    -(index + 1) * trackItemOffset,
                    -index * trackItemOffset,
                    -(index - 1) * trackItemOffset,
                  ];
                  const outputRange = [90, 0, -90];
                  const rotateY = useTransform(x, range, outputRange, {
                    clamp: false,
                  });

                  return (
                    <motion.div
                      key={index}
                      className="relative shrink-0 flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer transition-colors duration-300"
                      style={{
                        width: itemWidth,
                        height: itemHeight,
                        rotateY: rotateY,
                      }}
                      transition={effectiveTransition}
                      onClick={() => openFeatureModal(feature)}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-[#393E46]/30 to-[#222831]/20 pointer-events-none"
                        style={{
                          borderRadius: "0rem 8rem 0rem 8rem",
                          background:
                            "linear-gradient(135deg, rgba(57,62,70,0.3) 0%, rgba(34,40,49,0.2) 100%)",
                          boxShadow: "0 4px 16px 0 rgba(0, 173, 181, 0.15)",
                        }}
                      >
                        {/* Glass shine effect */}
                        <div
                          className="absolute inset-0 opacity-50"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(238,238,238,0.2), transparent)",
                            transform: "skewX(-20deg)",
                            animation: "shine 6s infinite",
                          }}
                        />
                      </div>

                      <div className="relative z-10 flex flex-col items-center justify-center p-8">
                        <span className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#00ADB5] to-[#393E46] text-6xl mb-8 shadow-lg">
                          {feature.icon}
                        </span>

                        <h3 className="mb-4 font-bold text-2xl text-[#EEEEEE]">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-[#EEEEEE]/90 px-4">
                          {feature.description}
                        </p>
                      </div>

                      {/* Hover effect overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#00ADB5]/20 to-[#393E46]/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Carousel indicators */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
                <div className="flex justify-center gap-4">
                  {FEATURES.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`h-3 w-12 rounded-full cursor-pointer transition-colors duration-150 ${
                        currentIndex % FEATURES.length === index
                          ? "bg-gradient-to-r from-[#00ADB5] to-[#393E46]"
                          : "bg-[#EEEEEE]/30"
                      }`}
                      animate={{
                        scale:
                          currentIndex % FEATURES.length === index ? 1.2 : 1,
                      }}
                      onClick={() => setCurrentIndex(index)}
                      transition={{ duration: 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Text content - on mobile this will stack below the carousel */}
        </div>
      </div>

      {/* Desktop container with border */}
      <div className="container mx-auto relative z-10 hidden lg:block">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left side - Carousel */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div
              ref={containerRef}
              className="relative overflow-hidden border border-[#00ADB5]/20 bg-gradient-to-br from-[#393E46]/30 to-[#222831]/80 backdrop-blur-lg shadow-xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: baseWidth,
                height: baseHeight,
                borderRadius: "0rem 10rem 0rem 10rem",
                backgroundImage:
                  "linear-gradient(135deg, rgba(57,62,70,0.3) 0%, rgba(34,40,49,0.8) 100%)",
                boxShadow: "0 8px 32px 0 rgba(0, 173, 181, 0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <motion.div
                className="flex h-full"
                style={{
                  width: itemWidth,
                  perspective: 1000,
                  perspectiveOrigin: `${
                    currentIndex * trackItemOffset + itemWidth / 2
                  }px 50%`,
                  x,
                }}
                animate={{ x: -(currentIndex * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationComplete={handleAnimationComplete}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
              >
                {carouselItems.map((feature, index) => {
                  const range = [
                    -(index + 1) * trackItemOffset,
                    -index * trackItemOffset,
                    -(index - 1) * trackItemOffset,
                  ];
                  const outputRange = [90, 0, -90];
                  const rotateY = useTransform(x, range, outputRange, {
                    clamp: false,
                  });

                  return (
                    <motion.div
                      key={index}
                      className="relative shrink-0 flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer transition-colors duration-300"
                      style={{
                        width: itemWidth,
                        height: itemHeight,
                        rotateY: rotateY,
                      }}
                      transition={effectiveTransition}
                      onClick={() => openFeatureModal(feature)}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-[#393E46]/30 to-[#222831]/20 pointer-events-none"
                        style={{
                          borderRadius: "0rem 8rem 0rem 8rem",
                          background:
                            "linear-gradient(135deg, rgba(57,62,70,0.3) 0%, rgba(34,40,49,0.2) 100%)",
                          boxShadow: "0 4px 16px 0 rgba(0, 173, 181, 0.15)",
                        }}
                      >
                        {/* Glass shine effect */}
                        <div
                          className="absolute inset-0 opacity-50"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(238,238,238,0.2), transparent)",
                            transform: "skewX(-20deg)",
                            animation: "shine 6s infinite",
                          }}
                        />
                      </div>

                      <div className="relative z-10 flex flex-col items-center justify-center p-8">
                        <span className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#00ADB5] to-[#393E46] text-6xl mb-8 shadow-lg">
                          {feature.icon}
                        </span>

                        <h3 className="mb-4 font-bold text-2xl text-[#EEEEEE]">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-[#EEEEEE]/90 px-4">
                          {feature.description}
                        </p>
                      </div>

                      {/* Hover effect overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#00ADB5]/20 to-[#393E46]/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Carousel indicators */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
                <div className="flex justify-center gap-4">
                  {FEATURES.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`h-3 w-12 rounded-full cursor-pointer transition-colors duration-150 ${
                        currentIndex % FEATURES.length === index
                          ? "bg-gradient-to-r from-[#00ADB5] to-[#393E46]"
                          : "bg-[#EEEEEE]/30"
                      }`}
                      animate={{
                        scale:
                          currentIndex % FEATURES.length === index ? 1.2 : 1,
                      }}
                      onClick={() => setCurrentIndex(index)}
                      transition={{ duration: 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Text content - on desktop this will be side by side with carousel */}
          <div className="w-full lg:w-1/2 text-[#EEEEEE] mt-8 lg:mt-0">
            {/* Desktop heading - only visible on large screens */}
            <h1 className="hidden lg:block text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-[#00ADB5] to-[#EEEEEE] bg-clip-text text-transparent">
              Explore Our Features
            </h1>
          </div>
        </div>
      </div>

      {/* Feature Modal */}
      {modalOpen && selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222831]/80">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-4 border border-[#00ADB5]/20 bg-[#222831]/70"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#EEEEEE]/80 hover:text-[#EEEEEE] text-xl"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#00ADB5] to-[#393E46] text-3xl">
                {selectedFeature.icon}
              </span>
              <h3 className="text-2xl font-bold text-[#EEEEEE]">
                {selectedFeature.title}
              </h3>
            </div>

            <div className="mb-6">
              <p className="text-lg text-[#EEEEEE]/90 mb-4">
                {selectedFeature.description}
              </p>
              <p className="text-[#EEEEEE]/80">
                {selectedFeature.longDescription}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 bg-gradient-to-r from-[#00ADB5] to-[#393E46] rounded-lg font-medium hover:opacity-90 transition-opacity text-[#EEEEEE]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
