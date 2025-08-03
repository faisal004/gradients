import { GradientType } from '@/lib/functions/convert-to-tailwind';
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


  //gradientType
  gradientType: GradientType;
  setGradientType: (gradientType: GradientType) => void;
  radialShape: "circle" | "ellipse";
  setRadialShape: (radialShape: string) => void;

  // shape position
  shapePosition: { x: number; y: number };
  setShapePosition: (position: { x: number; y: number }) => void;


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
  viaPercentage: 50,
  setFromPercentage: (percentage) => set({ fromPercentage: percentage }),
  setToPercentage: (percentage) => set({ toPercentage: percentage }),
  setViaPercentage: (percentage) => set({ viaPercentage: percentage }),

  //gradientType
  gradientType: "linear",
  setGradientType: (gradientType) => set({ gradientType }),

  //radialShape
  radialShape: "circle",
  setRadialShape: (radialShape) => set({ radialShape : radialShape as "circle" | "ellipse" }),

  // shape position
  shapePosition: { x: 50, y: 50 },
  setShapePosition: (position) => set({ shapePosition: position }),

}));