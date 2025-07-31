"use client"

import { useState } from "react";

interface PercentageSliderProps {
    label: string;
defaultValue: number;
    onChange?: (value: number) => void;
}

const PercentageSlider = ({ label, defaultValue, onChange }: PercentageSliderProps) => {
    const [value, setValue] = useState(defaultValue);
    return (
        <div className="flex flex-col items-center justify-between w-full h-full  ">
            <div className="flex flex-col items-center justify-between w-full h-[150px]">
                <div className="font-bold text-sm">{value}%</div>
                <label className="slider  flex flex-col items-center justify-center  h-full">
                    <input type="range" className="level  " onChange={(e) => {
                        setValue(Number(e.target.value))
                        onChange?.(Number(e.target.value))
                    }} value={value} />

                </label>
            </div>

            <div>
                <div className="font-bold text-sm">{label}</div>
            </div>
        </div>
    );
};

export default PercentageSlider;
