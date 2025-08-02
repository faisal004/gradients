import { create } from 'zustand';

interface GridDotsState {
 
  addGrid: boolean;
  setAddGrid: (addGrid: boolean) => void;
  addDots: boolean;
  setAddDots: (addDots: boolean) => void;

}

export const useGridDotsStore = create<GridDotsState>((set) => ({
  

  addGrid: false,
  setAddGrid: (addGrid) => set({ addGrid }),
  addDots: false,
  setAddDots: (addDots) => set({ addDots }),
}));