import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  duration: string;
  spotifyUrl: string;
}

interface TrackCardProps {
  track: Track;
  index: number;
}

const TrackCard = ({ track, index }: TrackCardProps) => {
  return (
    <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-all duration-300">
      <span className="w-6 text-center text-muted-foreground text-sm font-medium group-hover:hidden">
        {index + 1}
      </span>
      <Button
        size="icon"
        variant="ghost"
        className="hidden group-hover:flex w-6 h-6 text-foreground hover:text-primary hover:bg-transparent"
        onClick={() => window.open(track.spotifyUrl, "_blank")}
      >
        <Play className="w-4 h-4 fill-current" />
      </Button>
      
      <img
        src={track.albumArt}
        alt={track.album}
        className="w-12 h-12 rounded object-cover"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{track.name}</h4>
        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
      </div>
      
      <span className="hidden md:block text-sm text-muted-foreground truncate max-w-[200px]">
        {track.album}
      </span>
      
      <span className="text-sm text-muted-foreground">{track.duration}</span>
      
      <Button
        size="icon"
        variant="ghost"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
        onClick={() => window.open(track.spotifyUrl, "_blank")}
      >
        <ExternalLink className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TrackCard;
