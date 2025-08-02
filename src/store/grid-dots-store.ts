import { create } from 'zustand';

interface GridDotsState {

    addGrid: boolean;
    setAddGrid: (addGrid: boolean) => void;
    addDots: boolean;
    setAddDots: (addDots: boolean) => void;

    // grid 
    gridSize: number;
    setGridSize: (gridSize: number) => void;
    gridColor: string;
    setGridColor: (gridColor: string) => void;

    // dots 
    dotsSize: number;
    setDotsSize: (dotsSize: number) => void;
    dotsColor: string;
    setDotsColor: (dotsColor: string) => void;

}

export const useGridDotsStore = create<GridDotsState>((set) => ({


    addGrid: false,
    setAddGrid: (addGrid) => set({ addGrid }),
    addDots: true,
    setAddDots: (addDots) => set({ addDots }),

    // grid 
    gridSize: 20,
    setGridSize: (gridSize) => set({ gridSize }),
    gridColor: "#e5e7eb",
    setGridColor: (gridColor) => set({ gridColor }),

    // dots 
    dotsSize: 20,
    setDotsSize: (dotsSize) => set({ dotsSize }),
    dotsColor: "#e5e7eb",
    setDotsColor: (dotsColor) => set({ dotsColor }),
}));