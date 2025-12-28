import { RefreshCw, Share2, Save, Music, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrackCard from "./TrackCard";
import SpotifyLogo from "./SpotifyLogo";

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  duration: string;
  spotifyUrl: string;
}

interface PlaylistDisplayProps {
  playlist: {
    title: string;
    description: string;
    tracks: Track[];
  };
  onRegenerate: () => void;
  onSave: () => void;
  onBack:() => void;
  isRegenerating?: boolean;
}

const PlaylistDisplay = ({ playlist, onRegenerate, onSave, onBack, isRegenerating }: PlaylistDisplayProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: playlist.title,
        text: playlist.description,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {/* Playlist Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
        <div className="w-48 h-48 rounded-lg bg-gradient-to-br from-primary/80 to-primary/20 flex items-center justify-center shadow-2xl glow-spotify">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
          <Music className="w-24 h-24 text-primary-foreground" />
        </div>
        
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">AI Curated Playlist</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{playlist.title}</h2>
          <p className="text-muted-foreground mb-4">{playlist.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SpotifyLogo size={20} className="text-primary" />
            <span>{playlist.tracks.length} songs</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={onSave}
          className="gradient-spotify text-primary-foreground font-semibold px-6 hover:scale-105 transition-transform"
        >
          <Save className="w-4 h-4 mr-2" />
          Save to Spotify
        </Button>
        
        <Button
          variant="outline"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="border-border text-foreground hover:bg-secondary"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </Button>
        
        <Button
          variant="ghost"
          onClick={handleShare}
          className="text-muted-foreground hover:text-foreground"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Track List */}
      <div className="bg-card/50 rounded-xl p-4">
        <div className="flex items-center gap-4 px-3 py-2 text-sm text-muted-foreground border-b border-border mb-2">
          <span className="w-6 text-center">#</span>
          <span className="w-12" />
          <span className="flex-1">Title</span>
          <span className="hidden md:block w-[200px]">Album</span>
          <span className="w-12 text-right">Time</span>
          <span className="w-10" />
        </div>
        
        <div className="space-y-1">
          {playlist.tracks.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDisplay;
