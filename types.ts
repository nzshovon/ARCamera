
export interface Outfit {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  prompt: string;
}

export interface TryOnResult {
  imageUrl: string;
  outfitId: string;
  timestamp: number;
}
