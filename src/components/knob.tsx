import React, { useState, useRef, useEffect } from 'react';

const KnobWidget = () => {
  const [value, setValue] = useState(60);
  const [min] = useState(0);
  const [max] = useState(100);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const normalizedValue = (value - min) / (max - min);
  const rotationAngle = 55 + (normalizedValue * 250); // Start at 55deg, span 250deg

  const generateTicks = () => {
    const ticks = [];
    const totalTicks = 50;
    for (let i = 0; i <= totalTicks; i++) {
      const angle = 55 + (i / totalTicks) * 250;
      const isStep = i % 5 === 0;
      ticks.push(
        <div
          key={i}
          className={`absolute w-1 ${isStep ? 'h-4 bg-gray-600' : 'h-2 bg-gray-400'} rounded-full`}
          style={{
            transform: `rotate(${angle}deg) translateY(-140px)`,
            transformOrigin: 'center 140px',
            left: '50%',
            top: '50%',
            marginLeft: '-2px',
            marginTop: '-2px',
            opacity: isStep ? 0.8 : 0.6
          }}
        />
      );
    }
    return ticks;
  };

  // Generate step numbers
  const generateStepNumbers = () => {
    const steps = [];
    for (let i = 0; i <= 10; i++) {
      const angle = 55 + (i / 10) * 250;
      const value = (i * 10);
      steps.push(
        <div
          key={i}
          className="absolute text-xs font-bold text-gray-700 select-none"
          style={{
            transform: `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`,
            transformOrigin: 'center 120px',
            left: '50%',
            top: '50%',
            marginLeft: '-8px',
            marginTop: '-8px'
          }}
        >
          {value}
        </div>
      );
    }
    return steps;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">CSS Knob Widget</h1>
        
        <div className="relative">
          {/* Main knob container */}
          <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-gray-200 via-white to-gray-300 shadow-2xl border-4 border-gray-100">
            
            {/* Inner shadow ring */}
            <div className="absolute inset-4 rounded-full shadow-inner bg-gradient-to-br from-gray-50 to-gray-200">
              
         
              
              <div className="absolute inset-0 ">
                {generateStepNumbers()}
              </div>
              
              <div className="absolute bottom-12 left-16 text-sm font-bold text-gray-600 uppercase">
                Min
              </div>
              <div className="absolute bottom-12 right-16 text-sm font-bold text-gray-600 uppercase">
                Max
              </div>
              
              <div 
                className={`absolute top-1/2 left-1/2 w-24 h-24 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  isDragging ? 'shadow-lg scale-105' : 'shadow-md'
                } bg-gradient-to-br from-white via-gray-100 to-gray-200 border-2 border-gray-300 cursor-grab active:cursor-grabbing`}
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                
                {/* Knob pointer */}
                <div className="absolute top-2 left-1/2 w-1 h-6 bg-gray-800 rounded-full transform -translate-x-1/2"></div>
                
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Knob grip lines */}
                <div className="absolute inset-2 rounded-full">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-4 bg-gray-400 rounded-full"
                      style={{
                        transform: `rotate(${i * 45}deg) translateY(-28px)`,
                        transformOrigin: 'center 32px',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-1px',
                        marginTop: '-1px'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <input
            type="range"
            min={min}
            max={max}
            step="10"
            value={value}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing rounded-full"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          />
        </div>
        
      
        
      
      </div>
    </div>
  );
};

export default KnobWidget;