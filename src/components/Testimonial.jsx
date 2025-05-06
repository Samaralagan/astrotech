import { useState, useEffect } from "react";

export default function Testimonial() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials = [
    {
      id: 1,
      quote:
        "I feel like I've learned as much from X as I did completing my masters. It's the first thing I read every morning.",
      name: "Jenn F.",
      title: "Marketing Director @ Square",
      image: "/api/placeholder/100/100",
    },
    {
      id: 2,
      quote: "The insights in what I'm reading helps me lead this team better.",
      name: "Alex M.",
      title: "Product Lead @ Meta",
      image: "/api/placeholder/100/100",
    },
    {
      id: 3,
      quote: "X is free. If X would be paid, I would plan to order X after X.",
      name: "Sam K.",
      title: "Design Lead @ Company",
      image: "/api/placeholder/100/100",
    },
    {
      id: 4,
      quote:
        "This platform has revolutionized how I approach my daily workflow. Couldn't imagine working without it now.",
      name: "Taylor R.",
      title: "Engineering Lead @ Spotify",
      image: "/api/placeholder/100/100",
    },
    {
      id: 5,
      quote:
        "The quality of insights I get from X has helped our team make better decisions faster than ever before.",
      name: "Jordan P.",
      title: "COO @ Startup",
      image: "/api/placeholder/100/100",
    },
  ];

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 700);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isTransitioning, testimonials.length]);

  return (
    <section
      className="py-12 md:py-24 px-4 md:px-6 text-white overflow-hidden"
      style={{
        borderColor: "#00ADB5/20",
        padding: "25px 0px 25px 0px",
        margin: isMobile ? "0" : "0px 40px 0px 40px",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-[#00ADB5] to-[#EEEEEE] bg-clip-text text-transparent">
              Testimonial
            </h1>
            <div className="flex space-x-3 mt-8 justify-center lg:justify-start">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ease-in-out transform ${
                    activeIndex === index
                      ? "bg-blue-500 scale-150"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  disabled={isTransitioning}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative h-80 md:h-96 perspective-1000 mx-auto w-full max-w-sm md:max-w-none">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              {testimonials.map((testimonial, index) => {
                const position =
                  (index - activeIndex + testimonials.length) %
                  testimonials.length;

                let xOffset = 0;
                let yOffset = 0;
                let zOffset = 0;
                let rotateY = 0;
                let rotateX = 0;
                let rotateZ = 0;
                let opacity = 0;
                let scale = 1;
                let zIndex = 0;

                if (position === 0) {
                  xOffset = 0;
                  yOffset = 0;
                  zOffset = 0;
                  rotateY = 0;
                  rotateX = 0;
                  rotateZ = 0;
                  opacity = 1;
                  scale = 1;
                  zIndex = 30;
                } else if (position === 1) {
                  xOffset = 60;
                  yOffset = 15;
                  zOffset = -80;
                  rotateY = -8;
                  rotateX = 5;
                  rotateZ = 2;
                  opacity = 0.8;
                  scale = 0.95;
                  zIndex = 20;
                } else if (position === 2) {
                  xOffset = 120;
                  yOffset = 30;
                  zOffset = -160;
                  rotateY = -16;
                  rotateX = 10;
                  rotateZ = 4;
                  opacity = 0.6;
                  scale = 0.9;
                  zIndex = 10;
                } else {
                  xOffset = 180;
                  yOffset = 45;
                  zOffset = -240;
                  rotateY = -24;
                  rotateX = 15;
                  rotateZ = 6;
                  opacity = 0;
                  scale = 0.85;
                  zIndex = 0;
                }

                return (
                  <div
                    key={testimonial.id}
                    className="absolute transition-all duration-700 ease-out preserve-3d"
                    style={{
                      transform: `translateX(${xOffset}px) translateY(${yOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      transformOrigin: "bottom left",
                    }}
                  >
                    <div
                      className={`w-64 sm:w-72 h-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-500 backface-hidden`}
                      style={{
                        backgroundColor: "rgba(15, 23, 42, 0.65)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow:
                          position === 0
                            ? "0 20px 50px rgba(0, 173, 181, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2)"
                            : "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
                      }}
                      onMouseEnter={
                        position === 0
                          ? () => {
                              const card = document.getElementById(
                                `card-${testimonial.id}`
                              );
                              if (card) {
                                card.style.transform =
                                  "rotateY(5deg) rotateX(-5deg)";
                              }
                            }
                          : undefined
                      }
                      onMouseLeave={
                        position === 0
                          ? () => {
                              const card = document.getElementById(
                                `card-${testimonial.id}`
                              );
                              if (card) {
                                card.style.transform =
                                  "rotateY(0deg) rotateX(0deg)";
                              }
                            }
                          : undefined
                      }
                      id={`card-${testimonial.id}`}
                    >
                      <div className="p-6 flex flex-col h-full justify-between relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30 opacity-50 pointer-events-none"></div>
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"></div>

                        {position === 0 && (
                          <div className="flex justify-center mb-4 relative z-10">
                            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-blue-400 shadow-lg transform transition-transform duration-500 hover:scale-105">
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex-grow flex items-center justify-center relative z-10">
                          <p className="text-lg text-center text-gray-300 font-medium">
                            "{testimonial.quote}"
                          </p>
                        </div>

                        <div className="text-center text-blue-400 mt-4 relative z-10">
                          <p>
                            {testimonial.name} - {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
