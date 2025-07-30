import { create } from 'zustand';

interface GradientState {
  from: string;
  to: string;
  via?: string;
  setFrom: (color: string) => void;
  setTo: (color: string) => void;
  setVia: (color?: string) => void;
  direction: string;
  setDirection: (direction: string) => void;
}

export const useGradientStore = create<GradientState>((set) => ({
  from: '#06b6d4',
  to: '#ef4444',
  direction: "t",
  via: "",
  setFrom: (color) => set({ from: color }),
  setTo: (color) => set({ to: color }),
  setVia: (color) => set({ via: color }),
  setDirection: (direction) => set({ direction }),
}));