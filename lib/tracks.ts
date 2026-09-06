export interface Track {
  id: string;
  title: string;
  genre: string;
  subgenre: "Nepali Phonk" | "Brazilian Phonk" | "Himalayan Drift" | "Drift Phonk";
  releaseYear: string;
  origin: string;
  bpm: number;
  key: string;
  duration: string;
  audioSrc: string;
  coverImage: string;
  spotifyUrl: string;
  youtubeUrl: string;
  soundcloudUrl: string;
  description: string;
}

export const TRACKS: Track[] = [
  {
    id: "nepamorphosis",
    title: "NEPAMORPHOSIS",
    genre: "Nepali Phonk",
    subgenre: "Nepali Phonk",
    releaseYear: "2026",
    origin: "Darjeeling, India",
    bpm: 138,
    key: "F# Minor",
    duration: "2:14",
    audioSrc: "/audio/timro-yaad-ma.wav", // Fallback preview
    coverImage: "/images/nepamorphosis.jpg",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    description: "The pioneering anthem that bridged Himalayan melodies with relentless 808 sub-bass pressure, redefining South Asian Phonk on the global stage."
  },
  {
    id: "timro-yaad-ma",
    title: "TIMRO YAAD MA",
    genre: "Nepali Phonk",
    subgenre: "Himalayan Drift",
    releaseYear: "2026",
    origin: "Darjeeling, India",
    bpm: 142,
    key: "A Minor",
    duration: "2:08",
    audioSrc: "/audio/timro-yaad-ma.wav",
    coverImage: "/images/timro-yaad-ma.png",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    description: "Deep emotional nostalgia colliding with heavy drift cowbells. A Darjeeling masterpiece engineered for night drives."
  },
  {
    id: "yoi-yoi",
    title: "YOi YOi",
    genre: "Brazilian Phonk",
    subgenre: "Brazilian Phonk",
    releaseYear: "2026",
    origin: "Darjeeling ➔ São Paulo",
    bpm: 130,
    key: "C Minor",
    duration: "2:04",
    audioSrc: "/audio/yoi-yoi.wav",
    coverImage: "/images/gen-z-funk.jpg",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    description: "Raw Brazilian vocal chops spliced over distorted 808 slides. Relentless underground energy."
  },
  {
    id: "gen-z-funk",
    title: "MONTAGEM GEN Z FUNK",
    genre: "Brazilian Phonk",
    subgenre: "Brazilian Phonk",
    releaseYear: "2026",
    origin: "Darjeeling ➔ Global",
    bpm: 132,
    key: "D Minor",
    duration: "2:10",
    audioSrc: "/audio/yoi-yoi.wav",
    coverImage: "/images/gen-z-funk.jpg",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    description: "Viral TikTok and Reels heavy-hitter featuring aggressive brass stabs, stuttered rhythms, and seismic bass drops."
  },
  {
    id: "funk-revival",
    title: "Dj Caat's Funk Revival",
    genre: "Phonk Revival",
    subgenre: "Drift Phonk",
    releaseYear: "2026",
    origin: "Darjeeling, India",
    bpm: 135,
    key: "G Minor",
    duration: "2:22",
    audioSrc: "/audio/timro-yaad-ma.wav",
    coverImage: "/images/nepamorphosis.jpg",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    description: "A signature blend of 90s Memphis vocal cuts, classic Roland TR-808 percussion, and futuristic synth waves."
  }
];

export const ARTIST_INFO = {
  name: "DJ Caat",
  origin: "Darjeeling, West Bengal, India",
  tagline: "Nepali & Brazilian Phonk // Himalayan Sound Architect",
  followers: "33.3K+",
  streams: "100K+",
  instagram: "https://www.instagram.com/d.g_dj_caat_/",
  instagramHandle: "@d.g_dj_caat_",
  spotify: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
  youtube: "https://www.youtube.com/@d.g_dj_caat",
  soundcloud: "https://soundcloud.com/dgdjcaat",
  email: "collab@djcaat.com",
  mgmtEmail: "management@djcaat.com"
};
