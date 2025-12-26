import { useState } from "react";
import { LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SpotifyLogo from "@/components/SpotifyLogo";
import CuratingModal from "@/components/CuratingModal";
import PlaylistDisplay from "@/components/PlaylistDisplay";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock user data
const mockUser = {
  name: "Alex Johnson",
  profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
};

// Mock playlist data
const mockPlaylist = {
  title: "Your Vibe Check",
  description: "A personalized mix based on your recent listening habits. Perfect for focused work or relaxed vibes.",
  tracks: [
    { id: "1", name: "Blinding Lights", artist: "The Weeknd", album: "After Hours", albumArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop", duration: "3:20", spotifyUrl: "#" },
    { id: "2", name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", albumArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop", duration: "3:23", spotifyUrl: "#" },
    { id: "3", name: "Save Your Tears", artist: "The Weeknd", album: "After Hours", albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop", duration: "3:35", spotifyUrl: "#" },
    { id: "4", name: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", albumArt: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop", duration: "2:54", spotifyUrl: "#" },
    { id: "5", name: "Don't Start Now", artist: "Dua Lipa", album: "Future Nostalgia", albumArt: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=100&h=100&fit=crop", duration: "3:03", spotifyUrl: "#" },
    { id: "6", name: "Circles", artist: "Post Malone", album: "Hollywood's Bleeding", albumArt: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=100&h=100&fit=crop", duration: "3:35", spotifyUrl: "#" },
    { id: "7", name: "Mood", artist: "24kGoldn ft. iann dior", album: "El Dorado", albumArt: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&h=100&fit=crop", duration: "2:20", spotifyUrl: "#" },
    { id: "8", name: "drivers license", artist: "Olivia Rodrigo", album: "SOUR", albumArt: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=100&h=100&fit=crop", duration: "4:02", spotifyUrl: "#" },
  ],
};

const Home = () => {
  const navigate = useNavigate();
  const [isCurating, setIsCurating] = useState(false);
  const [playlist, setPlaylist] = useState<typeof mockPlaylist | null>(null);

  const handleLogout = () => {
    navigate("/");
  };

  const handleCurate = () => {
    setIsCurating(true);
    setPlaylist(null);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsCurating(false);
      setPlaylist(mockPlaylist);
    }, 5000);
  };

  const handleRegenerate = () => {
    handleCurate();
  };

  const handleSave = () => {
    toast({
      title: "Playlist Saved!",
      description: "Your playlist has been saved to your Spotify library.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full p-4 md:p-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SpotifyLogo size={28} className="text-primary" />
            <span className="text-lg font-bold text-foreground">Curate</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={mockUser.profileImage} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">{mockUser.name}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {!playlist ? (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to discover your next favorite playlist?
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our AI will analyze your listening history and create a personalized playlist just for you.
              </p>
            </div>

            <Button
              onClick={handleCurate}
              size="lg"
              className="gradient-spotify text-primary-foreground font-bold text-lg px-10 py-6 rounded-full hover:scale-105 transition-all duration-300 glow-spotify"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Curate Playlist
            </Button>
          </div>
        ) : (
          <PlaylistDisplay
            playlist={playlist}
            onRegenerate={handleRegenerate}
            onSave={handleSave}
            isRegenerating={isCurating}
          />
        )}
      </main>

      {/* Curating Modal */}
      <CuratingModal isOpen={isCurating} />

      {/* Footer */}
      <footer className="w-full p-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-sm text-muted-foreground">
          <p>Powered by AI • Made with ♥ for music lovers</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
