
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Minimize2, Maximize2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your marine research assistant. How can I help you with your ocean exploration today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Marine data responses
  const marineData = {
    "coral reef": "Coral reefs are among the most diverse ecosystems on Earth, supporting approximately 25% of all marine species despite covering less than 1% of the ocean floor. They're threatened by climate change, with rising sea temperatures causing coral bleaching.",
    "whale": "Whales are the largest animals on Earth. The blue whale can reach lengths of up to 100 feet and weigh as much as 200 tons. They use echolocation to navigate and find food in the deep ocean.",
    "shark": "There are over 500 species of sharks in the world's oceans. They have existed for more than 450 million years, predating dinosaurs. Some species, like the whale shark, are filter feeders and pose no threat to humans.",
    "ocean acidification": "Ocean acidification occurs when the ocean absorbs CO2 from the atmosphere, changing the water chemistry. This makes it harder for organisms like corals, clams, and some plankton to build their shells and skeletons.",
    "marine conservation": "Marine conservation focuses on protecting ocean ecosystems and species through protected areas, sustainable fishing practices, and reducing pollution. Marine Protected Areas (MPAs) are crucial tools in these efforts.",
    "deep sea": "The deep sea is one of Earth's least explored environments. The Mariana Trench reaches depths of nearly 11,000 meters. Deep-sea organisms have adapted to extreme pressure, cold temperatures, and complete darkness.",
    "bioluminescence": "Bioluminescence is the production of light by living organisms. In the deep sea, approximately 90% of organisms produce their own light, using it for communication, attracting prey, and defense.",
    "mangroves": "Mangrove forests protect coastlines, prevent erosion, and serve as nurseries for many marine species. They also sequester carbon at rates up to four times higher than tropical rainforests.",
    "sea level rise": "Sea level rise is primarily caused by melting ice sheets and glaciers, along with thermal expansion of seawater as it warms. Current projections suggest global sea levels could rise by 0.3 to 2.5 meters by 2100.",
    "plastic pollution": "Approximately 8 million tons of plastic enter the oceans each year. Microplastics have been found in marine organisms from the surface to the deepest ocean trenches.",
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Search for relevant marine information
    setTimeout(() => {
      let responseText = "I don't have specific information about that marine topic. Would you like me to tell you about coral reefs, whales, sharks, ocean acidification, or marine conservation instead?";
      
      // Check if the user's message contains any of our keywords
      const userQuestion = input.toLowerCase();
      for (const [keyword, info] of Object.entries(marineData)) {
        if (userQuestion.includes(keyword)) {
          responseText = info;
          break;
        }
      }

      const botMessage: Message = {
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={toggleChat}
          className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-ocean-light text-ocean-deep shadow-lg hover:bg-ocean-light/90"
          size="icon"
        >
          <MessageSquare size={isMobile ? 20 : 24} />
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : isMobile ? "calc(100svh - 120px)" : "500px",
              width: isMobile ? "calc(100vw - 24px)" : "360px",
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`fixed z-50 overflow-hidden ${
              isMobile ? "bottom-16 right-4 left-4" : "bottom-24 right-6"
            }`}
          >
            <Card className="bg-ocean-deep/80 backdrop-blur-md border-white/10 shadow-xl rounded-2xl overflow-hidden flex flex-col h-full">
              {/* Header */}
              <div className="bg-ocean-light/20 p-3 flex justify-between items-center border-b border-white/10">
                <h3 className="font-semibold text-white">Marine Research Assistant</h3>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-white hover:bg-white/10"
                    onClick={toggleMinimize}
                  >
                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-white hover:bg-white/10"
                    onClick={toggleChat}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              {!isMinimized && (
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-2xl max-w-[85%] ${
                          message.role === "user"
                            ? "bg-ocean-light text-ocean-deep"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="p-3 rounded-2xl bg-white/10 text-white">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Input */}
              {!isMinimized && (
                <div className="p-3 border-t border-white/10">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about marine research..."
                      className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading || !input.trim()}
                      className="bg-ocean-light text-ocean-deep hover:bg-ocean-light/90"
                    >
                      <Send size={18} />
                    </Button>
                  </form>
                  {!isMobile && (
                    <div className="mt-2 text-xs flex items-center gap-1 text-white/50">
                      <Info size={12} />
                      <span>Try asking about: coral reefs, whales, sharks, deep sea</span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
