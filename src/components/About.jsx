import { useState, useEffect, useRef } from "react";
import { Code, Terminal, Send } from "lucide-react";

export default function About() {
  // Mobile detection state
  const [isMobile, setIsMobile] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [typing, setTyping] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const timeoutRef = useRef(null);

  // Predefined Q&A pairs
  const qaPairs = [
    {
      question: "What's the mission of your company?",
      answer:
        "Our mission is to leverage cutting-edge AI technology to revolutionize the coding experience, making it more accessible, efficient, and intuitive for developers of all skill levels. We aim to bridge the gap between human creativity and machine precision, empowering developers to focus on innovation rather than implementation details.",
    },
    {
      question: "What's your vision?",
      answer:
        "Our vision is to create a world where AI and human developers work in perfect harmony, where complex programming challenges are solved in minutes rather than days. We envision a future where our AI code assistant becomes an indispensable tool that understands context, anticipates needs, and adapts to individual coding styles, ultimately transforming how software is built across the globe.",
    },
  ];

  // Type out a string character by character
  const typeText = (text, callback, speed = 50) => {
    let index = 0;
    setCurrentQuestion("");

    const typeChar = () => {
      if (index < text.length) {
        // Ensure apostrophe is correctly typed
        const nextChar = text.charAt(index);
        setCurrentQuestion((prev) => prev + nextChar);
        index++;
        timeoutRef.current = setTimeout(typeChar, speed);
      } else {
        if (callback) callback();
      }
    };

    timeoutRef.current = setTimeout(typeChar, 300);
  };

  // Animation sequence - handles the conversation loop
  useEffect(() => {
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Step 0: Initial greeting
    if (animationStep === 0) {
      timeoutRef.current = setTimeout(() => {
        setConversation([
          {
            type: "ai",
            text: "Hello! I'm your AI code assistant. Would you like to know about our company?",
          },
        ]);
        setAnimationStep(1);
      }, 1000);
    }
    // Step 1: Type first question
    else if (animationStep === 1) {
      const currentQA = qaPairs[0];
      // Ensure we're typing "What's" correctly
      const question = "What's the mission of your company?";
      typeText(question, () => {
        timeoutRef.current = setTimeout(() => setAnimationStep(2), 500);
      });
    }
    // Step 2: Submit first question
    else if (animationStep === 2) {
      setConversation([
        { type: "user", text: "What's the mission of your company?" },
      ]);
      setCurrentQuestion("");
      setTyping(true);
      timeoutRef.current = setTimeout(() => setAnimationStep(3), 1000);
    }
    // Step 3: Show first answer
    else if (animationStep === 3) {
      const currentQA = qaPairs[0];
      setTyping(false);
      setConversation([
        { type: "user", text: "What's the mission of your company?" },
        { type: "ai", text: currentQA.answer },
      ]);
      timeoutRef.current = setTimeout(() => setAnimationStep(4), 2000);
    }
    // Step 4: Type second question
    else if (animationStep === 4) {
      const currentQA = qaPairs[1];
      // Ensure we're typing "What's" correctly
      const question = "What's your vision?";
      typeText(question, () => {
        timeoutRef.current = setTimeout(() => setAnimationStep(5), 500);
      });
    }
    // Step 5: Submit second question
    else if (animationStep === 5) {
      setConversation([{ type: "user", text: "What's your vision?" }]);
      setCurrentQuestion("");
      setTyping(true);
      timeoutRef.current = setTimeout(() => setAnimationStep(6), 1000);
    }
    // Step 6: Show second answer
    else if (animationStep === 6) {
      const currentQA = qaPairs[1];
      setTyping(false);
      setConversation([
        { type: "user", text: "What's your vision?" },
        { type: "ai", text: currentQA.answer },
      ]);
      timeoutRef.current = setTimeout(() => setAnimationStep(1), 3000); // Loop back to first question
    }

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [animationStep]);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      className="py-8 sm:py-12 md:py-16 lg:py-24 px-3 sm:px-4 md:px-6 overflow-hidden"
      style={{
        padding: isMobile ? "15px 0px" : "25px 0px 25px 0px",
        margin: isMobile ? "0" : "0px 40px 0px 40px",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Left column - Just the heading */}
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-[#00ADB5] to-[#EEEEEE] bg-clip-text text-transparent">
              About Us
            </h1>
          </div>

          {/* Right column - Code visual with 3D effect */}
          <div className="relative mx-auto w-full max-w-sm md:max-w-none transform transition-all duration-500 hover:scale-105">
            <div className="relative p-4">
              <div
                className="rounded-xl p-6 shadow-xl transform transition-all duration-300"
                style={{
                  backgroundColor: "rgba(57, 62, 70, 0.05)",
                  transform: "perspective(1000px) rotateX(2deg) rotateY(-2deg)",
                  boxShadow:
                    "0 20px 30px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 173, 181, 0.1)",
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div
                    className="ml-4 flex items-center"
                    style={{ color: "#393E46" }}
                  >
                    <Terminal className="w-4 h-4 mr-2" />
                    <span className="text-sm">ai-code-assistant.js</span>
                  </div>
                </div>
                <div
                  className="font-mono text-sm rounded p-4 flex flex-col h-64 sm:h-56 md:h-64 lg:h-72 conversation-container transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(34, 40, 49, 0.95)",
                    color: "#EEEEEE",
                    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)",
                    transform: "translateZ(20px)",
                  }}
                >
                  {/* Conversation history - only show current Q&A */}
                  <div className="flex-1 mb-4">
                    {conversation.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-2 ${
                          message.type === "user"
                            ? "text-green-400"
                            : "text-blue-300"
                        }`}
                      >
                        <span className="font-bold">
                          {message.type === "user" ? "User: " : "AI: "}
                        </span>
                        <span>{message.text}</span>
                      </div>
                    ))}
                    {typing && (
                      <div className="text-blue-300">
                        <span className="font-bold">AI: </span>
                        <span className="typing-animation">...</span>
                      </div>
                    )}
                  </div>

                  {/* Input area */}
                  <div className="flex mt-auto">
                    <input
                      type="text"
                      value={currentQuestion}
                      readOnly
                      className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(57, 62, 70, 0.8)",
                        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                    <button
                      className="bg-blue-500 px-3 py-2 rounded-r-md flex items-center justify-center transition-all duration-300 hover:brightness-110"
                      style={{ backgroundColor: "#00ADB5" }}
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "#00ADB5",
                  boxShadow:
                    "0 10px 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 173, 181, 0.3)",
                }}
              >
                <Code className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
