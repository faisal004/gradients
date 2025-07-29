import { create } from 'zustand';

interface GradientState {
  from: string;
  to: string;
  setFrom: (color: string) => void;
  setTo: (color: string) => void;
}

export const useGradientStore = create<GradientState>((set) => ({
  from: '#06b6d4', 
  to: '#ef4444',   
  setFrom: (color) => set({ from: color }),
  setTo: (color) => set({ to: color }),
}));