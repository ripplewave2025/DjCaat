export interface TrackVersion {
  versionTitle: string; // e.g., "Original", "Slowed", "Over Slowed", "Ultra Slowed", "Sped Up", "Trend Version", "Instrumental"
  isrc: string;
  duration: string;
}

export interface DistroRelease {
  slNo: number;
  id: string;
  title: string;
  releaseDate: string;
  creationDate?: string;
  upc?: string;
  artist: string;
  author: string; // "DJ Caat"
  primaryGenre: string;
  subgenre: "Nepali Phonk" | "Brazilian Phonk" | "Himalayan Drift" | "Trap / Future Bass" | "Drift Phonk";
  bpm: number;
  key: string;
  coverImage: string;
  audioSrc: string;
  description: string;
  versions: TrackVersion[];
  spotifyUrl: string;
  youtubeUrl: string;
  soundcloudUrl: string;
}

export interface Track extends DistroRelease {
  duration: string;
  genre: string;
  origin: string;
  releaseYear: string;
}

// Full 20 official releases ingested directly from DJ Caat Distro CSV
export const DISTRO_RELEASES: DistroRelease[] = [
  {
    slNo: 1,
    id: "noite-quite",
    title: "NOITE QUITE",
    releaseDate: "2026-05-29",
    creationDate: "2026-05-13",
    upc: "3618111515572",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Brazilian Phonk",
    bpm: 130,
    key: "E Minor",
    coverImage: "/images/gen-z-funk.jpg",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "Atmospheric Brazilian Phonk fusion with syncopated favela percussion and heavy low-end distortion slides.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR-X20-26-09309", duration: "01:22" },
      { versionTitle: "Slowed", isrc: "FR-X20-26-09310", duration: "01:31" },
      { versionTitle: "Over Slowed", isrc: "FR-X20-26-09311", duration: "01:43" }
    ]
  },
  {
    slNo: 2,
    id: "montagem-cjp",
    title: "MONTAGEM CJP",
    releaseDate: "2026-05-22",
    creationDate: "2026-05-21",
    upc: "3618111791655",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic",
    subgenre: "Brazilian Phonk",
    bpm: 134,
    key: "G Minor",
    coverImage: "/images/nepamorphosis.jpg",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "Club-wrecking Montagem rhythm backed by aggressive cowbells and resonant Himalayan bass.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR-X20-26-33006", duration: "01:38" },
      { versionTitle: "Slowed", isrc: "FR-X20-26-33007", duration: "02:03" },
      { versionTitle: "Over Slowed", isrc: "FR-X20-26-33008", duration: "02:20" },
      { versionTitle: "Instrumental", isrc: "FR-X20-26-33009", duration: "01:38" }
    ]
  },
  {
    slNo: 3,
    id: "ayy-kancha",
    title: "AYY KANCHA",
    releaseDate: "2026-05-15",
    creationDate: "2026-05-13",
    upc: "3618111444797",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic",
    subgenre: "Nepali Phonk",
    bpm: 140,
    key: "A Minor",
    coverImage: "/images/timro-yaad-ma.png",
    audioSrc: "/audio/timro-yaad-ma.wav",
    description: "Haunting Nepali folk chants flipped into an aggressive Himalayan drift anthem.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR-X20-26-03683", duration: "01:29" },
      { versionTitle: "Slowed", isrc: "FR-X20-26-03684", duration: "01:38" },
      { versionTitle: "Over Slowed", isrc: "FR-X20-26-03685", duration: "01:51" },
      { versionTitle: "Super Slowed", isrc: "FR-X20-26-03686", duration: "02:16" }
    ]
  },
  {
    slNo: 4,
    id: "gangayy-funk",
    title: "GANGAYY FUNK",
    releaseDate: "2026-04-21",
    creationDate: "2026-04-19",
    upc: "3618110631952",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Brazilian Phonk",
    bpm: 132,
    key: "F Minor",
    coverImage: "/images/gen-z-funk.jpg",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "Seismic drift kicks and gritty analog saturation engineered for nighttime car meets.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR-96X-26-41948", duration: "01:35" },
      { versionTitle: "Slowed", isrc: "FR-96X-26-41949", duration: "01:58" },
      { versionTitle: "Over Slowed", isrc: "FR-96X-26-41950", duration: "02:15" },
      { versionTitle: "Ultra Slowed", isrc: "FR-96X-26-41951", duration: "02:38" }
    ]
  },
  {
    slNo: 5,
    id: "die-again",
    title: "DIE AGAIN",
    releaseDate: "2026-02-17",
    creationDate: "2026-02-16",
    upc: "3618028135252",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Drift Phonk",
    bpm: 144,
    key: "C# Minor",
    coverImage: "/images/nepamorphosis.jpg",
    audioSrc: "/audio/timro-yaad-ma.wav",
    description: "Hard-hitting Memphis vocal samples slicing through relentless bass glides.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR-2X4-26-56654", duration: "01:26" },
      { versionTitle: "Slowed", isrc: "FR-2X4-26-56655", duration: "01:48" },
      { versionTitle: "Over Slowed", isrc: "FR-2X4-26-56656", duration: "02:03" },
      { versionTitle: "Perfect", isrc: "FR-2X4-26-56657", duration: "01:36" },
      { versionTitle: "Speed Up", isrc: "FR-2X4-26-56658", duration: "01:15" }
    ]
  },
  {
    slNo: 6,
    id: "hold-me-in-the-dark",
    title: "HOLD ME IN THE DARK",
    releaseDate: "2026-01-30",
    creationDate: "2026-01-27",
    upc: "3618027183254",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Trap / Future Bass",
    subgenre: "Trap / Future Bass",
    bpm: 128,
    key: "Bb Minor",
    coverImage: "/images/timro-yaad-ma.png",
    audioSrc: "/audio/timro-yaad-ma.wav",
    description: "Emotional melodic trap with ethereal Himalayan synth pads and rolling hi-hat flurries.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR-10S-26-82598", duration: "02:11" }
    ]
  },
  {
    slNo: 7,
    id: "baby-do-that-drill",
    title: "BABY DO THAT DRILL",
    releaseDate: "2026-01-30",
    creationDate: "2026-01-27",
    upc: "3618027183261",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Trap / Future Bass",
    subgenre: "Trap / Future Bass",
    bpm: 140,
    key: "D Minor",
    coverImage: "/images/gen-z-funk.jpg",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "UK-style drill bass slides fused with Nepali urban accents and sharp 808 snaps.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR-10S-26-82600", duration: "02:00" },
      { versionTitle: "Slowed", isrc: "FR-10S-26-82601", duration: "02:30" },
      { versionTitle: "Ultra Slowed", isrc: "FR-10S-26-82602", duration: "03:20" },
      { versionTitle: "Over Slowed", isrc: "FR-10S-26-82603", duration: "02:52" }
    ]
  },
  {
    slNo: 8,
    id: "physics-wallah-funk",
    title: "PHYSICS WALLAH FUNK !",
    releaseDate: "2026-01-29",
    creationDate: "2026-01-27",
    upc: "3618027183087",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Brazilian Phonk",
    bpm: 133,
    key: "G Minor",
    coverImage: "/images/nepamorphosis.jpg",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "Viral campus phonk edit featuring frantic cowbells and earth-shaking sub drops.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR-10S-26-82582", duration: "01:20" },
      { versionTitle: "Slowed", isrc: "FR-10S-26-82583", duration: "01:29" },
      { versionTitle: "Over Slowed", isrc: "FR-10S-26-82585", duration: "01:40" }
    ]
  },
  {
    slNo: 9,
    id: "nepamorphosis",
    title: "NEPAMORPHOSIS",
    releaseDate: "2026-01-16",
    creationDate: "2026-01-14",
    upc: "3618026550057",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Nepali Phonk",
    bpm: 138,
    key: "F# Minor",
    coverImage: "/images/nepamorphosis.jpg",
    audioSrc: "/audio/timro-yaad-ma.wav",
    description: "The definitive masterpiece that established the Nepali Phonk movement globally. Haunting modal melodies colliding with 808 pressure.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR-10S-26-35266", duration: "01:47" },
      { versionTitle: "Slowed", isrc: "FR-10S-26-35267", duration: "02:13" },
      { versionTitle: "Over Slowed", isrc: "FR-10S-26-35268", duration: "02:58" },
      { versionTitle: "Sped Up", isrc: "FR-10S-26-35269", duration: "01:22" },
      { versionTitle: "Perfect", isrc: "FR-10S-26-35270", duration: "01:59" }
    ]
  },
  {
    slNo: 10,
    id: "nepali-phonk-3",
    title: "NEPALI PHONK 3",
    releaseDate: "2026-01-12",
    creationDate: "2026-01-08",
    upc: "8447352930500",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Nepali Phonk",
    bpm: 136,
    key: "A Minor",
    coverImage: "/images/timro-yaad-ma.png",
    audioSrc: "/audio/timro-yaad-ma.wav",
    description: "Part 3 of the legendary trilogy. Traditional sarangi resonances warped with heavy drift distortion.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "ES-A01-25-72950", duration: "01:41" },
      { versionTitle: "Slowed", isrc: "FR-10S-26-26392", duration: "02:06" },
      { versionTitle: "Over Slowed", isrc: "FR-10S-26-26393", duration: "02:24" },
      { versionTitle: "Trend Version", isrc: "FR-10S-26-26394", duration: "03:04" }
    ]
  },
  {
    slNo: 11,
    id: "nepali-phonk-1",
    title: "NEPALI PHONK",
    releaseDate: "2026-01-12",
    creationDate: "2026-01-08",
    upc: "8447352695317",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Nepali Phonk",
    bpm: 130,
    key: "E Minor",
    coverImage: "/images/nepamorphosis.jpg",
    audioSrc: "/audio/timro-yaad-ma.wav",
    description: "The raw roots origin track that launched DJ Caat into underground electronic stardom.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "ES-A01-25-39879", duration: "01:16" }
    ]
  },
  {
    slNo: 12,
    id: "timi-kina-yesto-funk",
    title: "TIMI KINA YESTO FUNK",
    releaseDate: "2026-01-10",
    creationDate: "2026-01-08",
    upc: "8447536425570",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Brazilian Phonk",
    bpm: 132,
    key: "F Minor",
    coverImage: "/images/gen-z-funk.jpg",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "Brazilian favela rhythm intersecting with traditional Nepali vocal chops.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "ES-A12-25-31067", duration: "01:34" },
      { versionTitle: "Slowed", isrc: "FR-10S-26-17303", duration: "01:57" },
      { versionTitle: "Over Slowed", isrc: "FR-10S-26-17304", duration: "02:14" }
    ]
  },
  {
    slNo: 13,
    id: "pagal-ho-funk",
    title: "PAGAL HO FUNK",
    releaseDate: "2026-01-10",
    creationDate: "2026-01-08",
    upc: "8447536152612",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Brazilian Phonk",
    bpm: 135,
    key: "C Minor",
    coverImage: "/images/nepamorphosis.jpg",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "Frenetic tempo, explosive sidechain kicks, and hypnotic chopped phrases.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "ES-A01-25-99020", duration: "01:36" },
      { versionTitle: "Slowed", isrc: "FR-10S-26-21588", duration: "02:01" },
      { versionTitle: "Trend Version", isrc: "FR-10S-26-21589", duration: "03:13" },
      { versionTitle: "Over Slowed", isrc: "FR-10S-26-21590", duration: "02:28" }
    ]
  },
  {
    slNo: 14,
    id: "montagem-gen-z-funk",
    title: "MONTAGEM GEN Z FUNK",
    releaseDate: "2026-01-09",
    creationDate: "2026-01-08",
    upc: "3618026342645",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Brazilian Phonk",
    bpm: 132,
    key: "D Minor",
    coverImage: "/images/gen-z-funk.jpg",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "Over 100K streams on TikTok & Reels. Raw São Paulo baile funk cadence fused with high-gain distortion.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR-10S-26-17305", duration: "01:44" },
      { versionTitle: "Slowed", isrc: "FR-10S-26-17306", duration: "02:19" },
      { versionTitle: "Ultra Slowed", isrc: "FR-10S-26-17307", duration: "03:28" },
      { versionTitle: "Over Slowed", isrc: "FR-10S-26-17308", duration: "02:46" }
    ]
  },
  {
    slNo: 15,
    id: "stress-funk",
    title: "STRESS FUNK!",
    releaseDate: "2026-04-10",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Drift Phonk",
    bpm: 142,
    key: "F# Minor",
    coverImage: "/images/nepamorphosis.jpg",
    audioSrc: "/audio/timro-yaad-ma.wav",
    description: "Adrenaline-fueled drift phonk with distorted 808 kicks and aggressive vocal stabs.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR96X2607184", duration: "01:30" },
      { versionTitle: "Slowed", isrc: "FR96X2607185", duration: "01:52" },
      { versionTitle: "Ultra Slowed", isrc: "FR96X2607186", duration: "02:15" },
      { versionTitle: "Over Slowed", isrc: "FR96X2607187", duration: "02:35" }
    ]
  },
  {
    slNo: 16,
    id: "by-your-side-funk",
    title: "BY YOUR SIDE FUNK !",
    releaseDate: "2026-04-22",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Brazilian Phonk",
    bpm: 130,
    key: "A Minor",
    coverImage: "/images/timro-yaad-ma.png",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "Deep melodic bassline layered beneath syncopated Brazilian cowbell arpeggios.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR96X2643814", duration: "01:28" },
      { versionTitle: "Slowed", isrc: "FR96X2643815", duration: "01:50" },
      { versionTitle: "Over Slowed", isrc: "FR96X2643816", duration: "02:10" },
      { versionTitle: "Speed Up", isrc: "FR96X2643817", duration: "01:14" }
    ]
  },
  {
    slNo: 17,
    id: "sokka-zada",
    title: "SOKKA ZADA",
    releaseDate: "2026-04-23",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Brazilian Phonk",
    bpm: 136,
    key: "D Minor",
    coverImage: "/images/gen-z-funk.jpg",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "Heavy club drift banger with dynamic brass stabs and rolling bass drops.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR96X2643855", duration: "01:32" },
      { versionTitle: "Slowed", isrc: "FR96X2643856", duration: "01:55" },
      { versionTitle: "Over Slowed", isrc: "FR96X2643857", duration: "02:18" },
      { versionTitle: "Ultra Slowed", isrc: "FR96X2643858", duration: "02:45" }
    ]
  },
  {
    slNo: 18,
    id: "montagem-yaad-ma",
    title: "MONTAGEM YAAD MA",
    releaseDate: "2026-04-15",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Himalayan Drift",
    bpm: 140,
    key: "A Minor",
    coverImage: "/images/timro-yaad-ma.png",
    audioSrc: "/audio/timro-yaad-ma.wav",
    description: "The Brazilian montagem flip of TIMRO YAAD MA. High-speed drift energy colliding with nostalgic Darjeeling memories.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR96X2621893", duration: "01:34" },
      { versionTitle: "Slowed", isrc: "FR96X2621894", duration: "01:58" },
      { versionTitle: "Over Slowed", isrc: "FR96X2621895", duration: "02:22" },
      { versionTitle: "Speed Up", isrc: "FR96X2621896", duration: "01:18" }
    ]
  },
  {
    slNo: 19,
    id: "montagem-yaad-ma-funk",
    title: "MONTAGEM YAAD MA FUNK",
    releaseDate: "2026-04-24",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Brazilian Phonk",
    bpm: 135,
    key: "G# Minor",
    coverImage: "/images/nepamorphosis.jpg",
    audioSrc: "/audio/yoi-yoi.wav",
    description: "Distorted funk edition of the Yaad Ma melody line tuned for high-volume sound systems.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR96X2643859", duration: "01:36" },
      { versionTitle: "Slowed", isrc: "FR96X2643860", duration: "02:02" },
      { versionTitle: "Over Slowed", isrc: "FR96X2643861", duration: "02:26" }
    ]
  },
  {
    slNo: 20,
    id: "timro-yaad-ma",
    title: "TIMRO YAAD MA",
    releaseDate: "2026-04-13",
    artist: "Dj Caat",
    author: "DJ Caat",
    primaryGenre: "Electronic - Phonk",
    subgenre: "Himalayan Drift",
    bpm: 142,
    key: "A Minor",
    coverImage: "/images/timro-yaad-ma.png",
    audioSrc: "/audio/timro-yaad-ma.wav",
    description: "Deep emotional nostalgia colliding with heavy drift cowbells. A Darjeeling masterpiece engineered for late night drives.",
    spotifyUrl: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
    youtubeUrl: "https://www.youtube.com/@d.g_dj_caat",
    soundcloudUrl: "https://soundcloud.com/dgdjcaat",
    versions: [
      { versionTitle: "Original", isrc: "FR96X2619345", duration: "02:08" },
      { versionTitle: "Slowed", isrc: "FR96X2619346", duration: "02:35" },
      { versionTitle: "Over Slowed", isrc: "FR96X2619347", duration: "02:58" },
      { versionTitle: "Speed Up", isrc: "FR96X2619348", duration: "01:45" }
    ]
  }
];

// Featured tracks for quick player and visualizer
export const TRACKS: Track[] = DISTRO_RELEASES.map((r) => ({
  ...r,
  duration: r.versions[0]?.duration || "02:00",
  genre: r.primaryGenre,
  releaseYear: r.releaseDate.split("-")[0] || "2026",
  origin: r.subgenre === "Nepali Phonk" || r.subgenre === "Himalayan Drift" 
    ? "Darjeeling, India" 
    : "Darjeeling ➔ São Paulo",
}));

export const ARTIST_INFO = {
  name: "DJ Caat",
  legalAuthor: "DJ Caat",
  origin: "Darjeeling, West Bengal, India",
  tagline: "Nepali & Brazilian Phonk // Himalayan Sound Architect",
  followers: "33.3K+",
  streams: "100K+",
  instagram: "https://www.instagram.com/d.g_dj_caat_/",
  instagramHandle: "@d.g_dj_caat_",
  spotify: "https://open.spotify.com/artist/5gDEc2CoSUgct5C1Q3CHoD",
  youtube: "https://www.youtube.com/@d.g_dj_caat",
  soundcloud: "https://soundcloud.com/dgdjcaat",
  twitter: "https://x.com/dgdjcaat",
  twitterHandle: "@dgdjcaat",
  email: "ceo@gorkhayai.com",
  mgmtEmail: "ceo@gorkhayai.com",
  portfolioUrl: "https://portfolio-next-fawn-five.vercel.app/",
  managedBy: "Upesh Bishwakarma"
};
