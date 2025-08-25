import { create } from 'zustand';

interface MaskState {
  // Basic mask control
  addMask: boolean;
  setAddMask: (addMask: boolean) => void;

  // Mask type
  maskType: 'linear' | 'radial';
  setMaskType: (maskType: 'linear' | 'radial') => void;

  // Linear mask direction
  direction: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  setDirection: (direction: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => void;

  // Radial mask properties
  radialShape: 'circle' | 'ellipse';
  setRadialShape: (shape: 'circle' | 'ellipse') => void;
  
  radialPosition: { x: number; y: number };
  setRadialPosition: (position: { x: number; y: number }) => void;

  // Color stops
  from: string;
  setFrom: (color: string) => void;
  
  via: string | null;
  setVia: (color: string | null) => void;
  
  to: string;
  setTo: (color: string) => void;

  // Percentages
  fromPercentage: number;
  setFromPercentage: (percentage: number) => void;
  
  viaPercentage: number;
  setViaPercentage: (percentage: number) => void;
  
  toPercentage: number;
  setToPercentage: (percentage: number) => void;

  // Mask size and repeat
  maskSize: string;
  setMaskSize: (size: string) => void;
  
  maskRepeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
  setMaskRepeat: (repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y') => void;

  // Helper method to build mask
  buildMask: () => string;
}

export const useMaskStore = create<MaskState>((set, get) => ({
  // Default values
  addMask: false,
  setAddMask: (addMask) => set({ addMask }),

  maskType: 'radial',
  setMaskType: (maskType) => set({ maskType }),

  direction: 'top',
  setDirection: (direction) => set({ direction }),

  radialShape: 'circle',
  setRadialShape: (radialShape) => set({ radialShape }),

  radialPosition: { x: 50, y: 50 },
  setRadialPosition: (radialPosition) => set({ radialPosition }),

  from: 'black',
  setFrom: (from) => set({ from }),

  via: null,
  setVia: (via) => set({ via }),

  to: 'transparent',
  setTo: (to) => set({ to }),

  fromPercentage: 0,
  setFromPercentage: (fromPercentage) => set({ fromPercentage }),

  viaPercentage: 50,
  setViaPercentage: (viaPercentage) => set({ viaPercentage }),

  toPercentage: 100,
  setToPercentage: (toPercentage) => set({ toPercentage }),

  maskSize: '100% 100%',
  setMaskSize: (maskSize) => set({ maskSize }),

  maskRepeat: 'no-repeat',
  setMaskRepeat: (maskRepeat) => set({ maskRepeat }),

  buildMask: () => {
    const state = get();
    
    if (!state.addMask) return '';

    const colorStops = [
      `${state.from} ${state.fromPercentage}%`,
      ...(state.via ? [`${state.via} ${state.viaPercentage}%`] : []),
      `${state.to} ${state.toPercentage}%`
    ];

    switch (state.maskType) {
      case 'linear':
        return `linear-gradient(to ${state.direction}, ${colorStops.join(', ')})`;
      case 'radial':
        return `radial-gradient(${state.radialShape} at ${state.radialPosition.x}% ${state.radialPosition.y}%, ${colorStops.join(', ')})`;
      default:
        return '';
    }
  }
}));