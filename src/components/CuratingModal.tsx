import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import SpotifyLogo from "./SpotifyLogo";

const loadingMessages = [
  "Analyzing your music taste...",
  "Finding hidden gems...",
  "Matching vibes and energy...",
  "Curating the perfect mix...",
  "Adding finishing touches...",
];

interface CuratingModalProps {
  isOpen: boolean;
}

const CuratingModal = ({ isOpen }: CuratingModalProps) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="relative bg-primary rounded-full p-6 glow-spotify">
            <SpotifyLogo size={48} className="text-primary-foreground animate-pulse-glow" />
          </div>
        </div>

        <div className="space-y-4">
          <LoadingSpinner size="lg" className="mx-auto" />
          
          <p className="text-xl font-medium text-foreground animate-in fade-in-0 duration-500" key={messageIndex}>
            {loadingMessages[messageIndex]}
          </p>
          
          <p className="text-sm text-muted-foreground">
            Our AI is working its magic
          </p>
        </div>

        {/* Music wave animation */}
        <div className="flex items-end justify-center gap-1 h-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "0.5s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuratingModal;
