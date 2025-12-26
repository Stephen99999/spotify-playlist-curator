import { Music, Sparkles, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpotifyLogo from "@/components/SpotifyLogo";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleSpotifyLogin = () => {
    // Simulate login - in production, this would trigger Spotify OAuth
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full p-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <SpotifyLogo size={32} className="text-primary" />
          <span className="text-xl font-bold text-foreground">Curate</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Floating icons */}
          <div className="relative inline-block mb-8">
            <div className="absolute -top-12 -left-16 animate-float" style={{ animationDelay: "0s" }}>
              <Music className="w-8 h-8 text-primary/60" />
            </div>
            <div className="absolute -top-8 -right-20 animate-float" style={{ animationDelay: "0.5s" }}>
              <Sparkles className="w-6 h-6 text-primary/60" />
            </div>
            <div className="absolute -bottom-4 -right-12 animate-float" style={{ animationDelay: "1s" }}>
              <Headphones className="w-7 h-7 text-primary/60" />
            </div>
            
            {/* Main logo animation */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
              <div className="relative bg-card rounded-full p-8 border border-border glow-spotify">
                <SpotifyLogo size={80} className="text-primary" />
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-foreground">Discover Your Sound,</span>
            <br />
            <span className="text-gradient">Curated by AI</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Let our AI analyze your listening history and create the perfect personalized playlist just for you.
          </p>

          {/* CTA Button */}
          <Button
            onClick={handleSpotifyLogin}
            size="lg"
            className="gradient-spotify text-primary-foreground font-bold text-lg px-8 py-6 rounded-full hover:scale-105 transition-all duration-300 glow-spotify"
          >
            <SpotifyLogo size={24} className="mr-3" />
            Sign in with Spotify
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Curate. Powered by AI.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
