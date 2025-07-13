import { TrackType } from "@/sharedTypes/sharedTypes";

export function applySearch(
    tracks: TrackType[],
    searchQuery: string
  ): TrackType[] {
    if (!searchQuery.trim()) return tracks;
  
    const normalizedQuery = searchQuery.toLowerCase();
  
    return tracks.filter((track) =>
      track.name.toLowerCase().startsWith(normalizedQuery)
    );
  }