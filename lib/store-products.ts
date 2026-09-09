export interface SoundPack {
  id: string;
  title: string;
  subtitle: string;
  priceUsd: number;
  priceInr: number;
  coverImage: string;
  tags: string[];
  specs: {
    format: string;
    sampleCount: string;
    size: string;
    daw: string;
  };
  features: string[];
  audioPreview: string;
  downloadUrl: string;
}

export const SOUND_PACKS: SoundPack[] = [
  {
    id: "808-vault-vol1",
    title: "808 DISTORTION VAULT VOL. 1",
    subtitle: "Heavy Saturated Bass Slides & Sub Transients",
    priceUsd: 19,
    priceInr: 1599,
    coverImage: "/images/nepamorphosis.jpg",
    tags: ["808 Slides", "Brazilian Phonk", "Sub-Bass"],
    specs: {
      format: "24-Bit / 44.1kHz WAV",
      sampleCount: "120+ 808 Bass One-Shots & Tuned Loops",
      size: "450 MB",
      daw: "All DAWs (FL Studio, Ableton, Logic)",
    },
    features: [
      "Custom analog distortion curve tuned by DJ Caat",
      "Key-labeled from C1 to B1 for instant drag-and-drop",
      "Raw analog tape warmth for maximum club pressure",
      "Bonus 20 tuned drift glide patterns (MIDI)"
    ],
    audioPreview: "/audio/yoi-yoi.wav",
    downloadUrl: "/audio/yoi-yoi.wav" // Replace with signed cloud storage / Supabase storage bucket url in production
  },
  {
    id: "nepali-phonk-essentials",
    title: "HIMALAYAN DRIFT // NEPALI PHONK SUITE",
    subtitle: "Authentic Darjeeling Strings, Chants & 808s",
    priceUsd: 22,
    priceInr: 1799,
    coverImage: "/images/timro-yaad-ma.png",
    tags: ["Nepali Phonk", "Himalayan Strings", "Vocal Chops"],
    specs: {
      format: "24-Bit Lossless WAV + MIDI",
      sampleCount: "160+ Melody Chops, Sarangi Textures & Stems",
      size: "680 MB",
      daw: "Universal Audio & MIDI Compatible",
    },
    features: [
      "Signature melodies straight from NEPAMORPHOSIS & TIMRO YAAD MA",
      "Himalayan folk instruments resampled through vintage Roland SP-404",
      "Aggressive drift percussion loops & stutter fills",
      "Pre-cleared 100% royalty-free for commercial release"
    ],
    audioPreview: "/audio/timro-yaad-ma.wav",
    downloadUrl: "/audio/timro-yaad-ma.wav"
  },
  {
    id: "memphis-cowbell-kit",
    title: "MEMPHIS ACAPELLA & COWBELL KIT",
    subtitle: "Tuned Phonk Cowbells & Vintage Chops",
    priceUsd: 15,
    priceInr: 1249,
    coverImage: "/images/gen-z-funk.jpg",
    tags: ["Cowbells", "Acapellas", "Memphis Chops"],
    specs: {
      format: "24-Bit WAV + Soundfont (.sf2)",
      sampleCount: "95+ Multi-velocity Tuned Cowbells & Cuts",
      size: "320 MB",
      daw: "Compatible with any Sampler",
    },
    features: [
      "12 custom cowbell soundfonts tuned for fast arpeggios",
      "Rare underground Memphis rap vocal cuts (chopped & pitched)",
      "Dirty cassette tape saturation textures",
      "Attack & decay envelopes pre-tailored for Phonk mixes"
    ],
    audioPreview: "/audio/yoi-yoi.wav",
    downloadUrl: "/audio/yoi-yoi.wav"
  },
  {
    id: "fl-studio-mixer-presets",
    title: "FL STUDIO MASTER PHONK PRESETS",
    subtitle: "Caat's Secret Mixer Racks & Mastering Chains",
    priceUsd: 25,
    priceInr: 2099,
    coverImage: "/images/nepamorphosis.jpg",
    tags: ["FL Studio", "Mixer Presets", "Mastering"],
    specs: {
      format: ".fst Mixer Presets + Template .flp",
      sampleCount: "18 Master Racks & Sub-Bass Chains",
      size: "85 MB",
      daw: "FL Studio 20 / 21 / 24+",
    },
    features: [
      "DJ Caat's main bus clipping & distortion routing",
      "Parallel sidechain punch for kicks cutting through dense 808s",
      "Vocal spatial widening chain (reverb & slap delay)",
      "Complete master bus mastering rack ready for streaming"
    ],
    audioPreview: "/audio/timro-yaad-ma.wav",
    downloadUrl: "/audio/timro-yaad-ma.wav"
  }
];

export function getProductById(id: string): SoundPack | undefined {
  return SOUND_PACKS.find((pack) => pack.id === id);
}
