import { create } from "zustand";
import { DEFAULT_TEXTURE, ditherCell, noiseScale, type TextureType } from "@/lib/texture";

interface TextureState {
  type: TextureType;
  intensity: number;
  scale: number;
  setType: (type: TextureType) => void;
  setIntensity: (intensity: number) => void;
  setScale: (scale: number) => void;
}

export const useTextureStore = create<TextureState>(set => ({
  type: DEFAULT_TEXTURE.type,
  intensity: DEFAULT_TEXTURE.intensity,
  scale: DEFAULT_TEXTURE.scale,
  setType: type => set(state => {
    if (type === "none") return { type };
    if (type === "dither") return { type, scale: state.scale >= 2 && state.scale <= 12 ? ditherCell(state.scale) : 4 };
    return { type, scale: state.scale >= 80 && state.scale <= 260 ? noiseScale(state.scale) : 160 };
  }),
  setIntensity: intensity => set({ intensity }),
  setScale: scale => set({ scale }),
}));
