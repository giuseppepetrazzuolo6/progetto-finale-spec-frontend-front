export type Game = {
  title: string;
  category: string;
  description: string,
  image: string,
  platform: "PC" | "PlayStation" | "Xbox" | "Nintendo Switch";
  developer: string;
  price: number; 
  rating: number; 
  playtime: number; 
  readonly releaseYear: number;
};