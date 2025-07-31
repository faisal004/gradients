import { create } from 'zustand';

interface GradientState {
  addVia: boolean;
  setAddVia: (addVia: boolean) => void;
  from: string;
  to: string;
  via?: string;
  setFrom: (color: string) => void;
  setTo: (color: string) => void;
  setVia: (color?: string) => void;
  direction: string;
  setDirection: (direction: string) => void;

  // percentage
  fromPercentage: number;
  toPercentage: number;
  viaPercentage?: number;
  setFromPercentage: (percentage: number) => void;
  setToPercentage: (percentage: number) => void;
  setViaPercentage: (percentage?: number) => void;

}

export const useGradientStore = create<GradientState>((set) => ({
  addVia: false,
  setAddVia: (addVia) => set({ addVia }),
  from: '#06b6d4',
  to: '#ef4444',
  direction: "right",
  via: "",
  setFrom: (color) => set({ from: color }),
  setTo: (color) => set({ to: color }),
  setVia: (color) => set({ via: color }),
  setDirection: (direction) => set({ direction }),

  //percentage
  fromPercentage: 0,
  toPercentage: 100,
  viaPercentage: undefined,
  setFromPercentage: (percentage) => set({ fromPercentage: percentage }),
  setToPercentage: (percentage) => set({ toPercentage: percentage }),
  setViaPercentage: (percentage) => set({ viaPercentage: percentage }),
}));