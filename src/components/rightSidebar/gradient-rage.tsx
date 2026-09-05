"use client"
import { useGradientStore } from "../../store/gradient-store"

import AnimatedSlider from "../percentage-slider"

const GradientRange = () => {

    const {addVia,fromPercentage,toPercentage,viaPercentage,setFromPercentage,setToPercentage,setViaPercentage} = useGradientStore();

    return (

        <section className="control-card">
            <div className="flex items-center justify-between w-full text-sm px-1">
                <div className=" font-bold tracking-widest">
                    Gradient Range
                </div>

            </div>
            <div className="flex h-full   w-full p-3">
                <AnimatedSlider label="From" value={fromPercentage} onChange={(value) => setFromPercentage(value)} />
            
                <AnimatedSlider label="Via" value={viaPercentage || 50} onChange={(value) => setViaPercentage(value)} disabled={!addVia} />

                <AnimatedSlider label="To" value={toPercentage} onChange={(value) => setToPercentage(value)} />

            </div>
        </section>
    )
}


export default GradientRange
