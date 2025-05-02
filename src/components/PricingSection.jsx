import React, { useEffect, useRef } from "react";
import PricingCard from "./PricingCard";
import { BasicIcon, StandardIcon, PremiumIcon } from "./PricingIcons";

const PricingSection = () => {
  // Define plans data
  const plans = [
    {
      id: "basic",
      title: "BASIC",
      price: "$ 10.99",
      icon: <BasicIcon />,
      features: [
        { name: "Cloud Storage", included: true },
        { name: "Analytics", included: false },
        { name: "Priority Support", included: false },
      ],
      buttonColor: "orange",
      gradientFrom: "teal",
      gradientTo: "teal",
      headerBgFrom: "teal",
      isFeatured: false,
      depth: 20,
      rotateClass: "rotate-y-5",
    },
    {
      id: "standard",
      title: "STANDARD",
      price: "$ 20.99",
      icon: <StandardIcon />,
      features: [
        { name: "Cloud Storage", included: true },
        { name: "Analytics", included: true },
        { name: "Priority Support", included: false },
      ],
      buttonColor: "purple",
      gradientFrom: "purple",
      gradientTo: "teal",
      headerBgFrom: "purple",
      isFeatured: true,
      highlightBadge: "Most Popular",
      depth: 30,
      rotateClass: "scale-115",
    },
    {
      id: "premium",
      title: "PREMIUM",
      price: "$ 30.99",
      icon: <PremiumIcon />,
      features: [
        { name: "Cloud Storage", included: true },
        { name: "Analytics", included: true },
        { name: "Priority Support", included: true },
      ],
      buttonColor: "blue",
      gradientFrom: "blue",
      gradientTo: "blue",
      headerBgFrom: "blue",
      isFeatured: false,
      depth: 20,
      rotateClass: "translate-z-12",
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    // Add staggered animation delay for cards
    const cards = document.querySelectorAll(".pricing-card");
    cards.forEach((card, index) => {
      card.style.setProperty("--index", index);
    });

    // Add parallax effect on mouse movement
    const container = sectionRef.current;

    if (container) {
      const handleMouseMove = (e) => {
        const cards = document.querySelectorAll(".pricing-card");
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position
        const rotateY = (mouseX - centerX) / 50;
        const rotateX = (centerY - mouseY) / 50;

        cards.forEach((card, index) => {
          // Apply different rotation intensity based on card position
          const modifier = plans[index].isFeatured ? 0.5 : 1; // Less rotation for featured card
          card.style.transform = `rotateY(${rotateY * modifier}deg) rotateX(${
            rotateX * modifier
          }deg) translateZ(${plans[index].depth * modifier}px)`;
        });
      };

      // Reset on mouse leave
      const handleMouseLeave = () => {
        const cards = document.querySelectorAll(".pricing-card");
        cards.forEach((card) => {
          card.style.transform = "rotateY(0) rotateX(0) translateZ(0)";
        });
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [plans]);

  return (
    <section className="p-8 flex flex-col items-center justify-center min-h-screen bg-transparent backdrop-blur-sm">
      <div
        ref={sectionRef}
        className="flex flex-col md:flex-row gap-8 justify-center items-center perspective-1000"
      >
        {plans.map((plan) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
