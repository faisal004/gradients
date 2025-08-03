import React, { useState, useRef, useCallback } from 'react';


const  PointSelector=()=> {
  const [position, setPosition] = useState({ x: 150, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    updatePosition(e.nativeEvent);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updatePosition(e);
    }
  }, [isDragging]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updatePosition = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      setPosition({ x: Math.round(x), y: Math.round(y) });
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  return (
      <div className="max-w-4xl mx-auto my-2">
      
        <div className="bg-white rounded-lg">
          <div
            ref={containerRef}
            className="relative w-full h-60 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-gray-300 rounded-lg cursor-crosshair overflow-hidden"
            onMouseDown={handleMouseDown}
            style={{ userSelect: 'none' }}
          >
            {/* Grid lines for reference */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              {/* Vertical grid lines */}
              {Array.from({ length: 10 }, (_, i) => (
                <line
                  key={`v-${i}`}
                  x1={`${(i + 1) * 10}%`}
                  y1="0"
                  x2={`${(i + 1) * 10}%`}
                  y2="100%"
                  stroke="#6b7280"
                  strokeWidth="1"
                />
              ))}
              {/* Horizontal grid lines */}
              {Array.from({ length: 10 }, (_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={`${(i + 1) * 10}%`}
                  x2="100%"
                  y2={`${(i + 1) * 10}%`}
                  stroke="#6b7280"
                  strokeWidth="1"
                />
              ))}
            </svg>

            {/* Coordinate labels */}
            <div className="absolute top-2 left-2 text-xs text-gray-500 font-mono">
              (0, 0)
            </div>
            <div className="absolute top-2 right-2 text-xs text-gray-500 font-mono">
              (width, 0)
            </div>
            <div className="absolute bottom-2 left-2 text-xs text-gray-500 font-mono">
              (0, height)
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono">
              (width, height)
            </div>

            {/* Draggable Point */}
            <div
              className={`absolute w-6 h-6 bg-red-500 border-2 border-white rounded-full shadow-lg transform -translate-x-3 -translate-y-3 transition-all duration-75 ${
                isDragging ? 'scale-125 bg-red-600' : 'hover:scale-110'
              }`}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            >
              {/* Point coordinates tooltip */}
              <div className="absolute -top-10 left-1/2 transform  -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {position.x}, {position.y}
              </div>
            </div>

            {/* Cross-hair lines when dragging */}
            {isDragging && (
              <>
                {/* Vertical line */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-red-300 opacity-60 pointer-events-none"
                  style={{ left: `${position.x}px` }}
                />
                {/* Horizontal line */}
                <div
                  className="absolute left-0 right-0 h-px bg-red-300 opacity-60 pointer-events-none"
                  style={{ top: `${position.y}px` }}
                />
              </>
            )}
          </div>
        </div>

       
      </div>
  );
}

export default PointSelector
