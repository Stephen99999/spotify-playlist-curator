import { useState, useEffect } from "react";
import { LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SpotifyLogo from "@/components/SpotifyLogo";
import CuratingModal from "@/components/CuratingModal";
import PlaylistDisplay from "@/components/PlaylistDisplay";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isCurating, setIsCurating] = useState(false);
  const [playlist, setPlaylist] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  // --- LOGIC 1: TOKEN EXTRACTION ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      setToken(urlToken);
      localStorage.setItem("spotify_token", urlToken);
      fetchUserProfile(urlToken);
      // Clean the URL so the token isn't visible
      window.history.replaceState({}, document.title, "/home");
    } else {
      const storedToken = localStorage.getItem("spotify_token");
      if (!storedToken) {
        navigate("/"); // No token found, kick back to landing
      } else {
        setToken(storedToken);
        fetchUserProfile(storedToken);
      }
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser({
        name: data.display_name,
        profileImage: data.images?.[0]?.url || "",
      });
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  // --- LOGIC 2: CALLING YOUR DISCOVERY MODEL ---
  const handleCurate = async () => {
    if (!token) return;
    
    setIsCurating(true);
    setPlaylist(null);

    try {
      // Calling your FastAPI Endpoint
      const response = await fetch(`http://localhost:8000/recommend?token=${token}&size=40`);
      const data = await response.json();

      // Transform FastAPI data to match your PlaylistDisplay component
      const formattedPlaylist = {
        title: "Your Discovery Mix",
        description: "AI-ranked tracks based on your listening patterns and the current time of day.",
        tracks: data.recommendations.map((track: any) => ({
          id: track.id,
          name: track.name,
          artist: track.artist,
          album: "Discovery", // Or fetch album if added to backend
          albumArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop", 
          spotifyUrl: track.url,
          score: track.score
        }))
      };

      setPlaylist(formattedPlaylist);
      
      // TRIGGER THE SYNC (The Feedback Loop)
      // This tells the backend to check if the user eventually plays these songs
      fetch(`http://localhost:8000/sync?token=${token}`);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Curating Failed",
        description: "Make sure your FastAPI server is running on localhost:8000",
      });
    } finally {
      setIsCurating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("spotify_token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full p-4 md:p-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SpotifyLogo size={28} className="text-primary" />
            <span className="text-lg font-bold text-foreground">Curate</span>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{user.name}</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {!playlist ? (
          <div className="text-center space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to discover your next favorite playlist?
            </h1>
            <Button onClick={handleCurate} size="lg" className="gradient-spotify rounded-full px-10 py-6">
              <Sparkles className="w-5 h-5 mr-2" />
              Curate Playlist
            </Button>
          </div>
        ) : (
          <PlaylistDisplay 
            playlist={playlist} 
            onRegenerate={handleCurate} 
            onSave={() => toast({ title: "Saved to Spotify!" })} 
            isRegenerating={isCurating} 
          />
        )}
      </main>
      <CuratingModal isOpen={isCurating} />
    </div>
  );
};

export default Home;