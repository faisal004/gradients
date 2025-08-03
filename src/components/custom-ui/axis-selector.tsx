import React, { useState, useRef, useCallback } from 'react';

// Hook to track container size with ResizeObserver
function useContainerSize(ref: React.RefObject<HTMLElement>) {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  React.useEffect(() => {
    if (!ref.current) return;
    const handleResize = () => {
      const rect = ref.current!.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };
    handleResize(); // Initial
    const ro = new window.ResizeObserver(handleResize);
    ro.observe(ref.current!);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

const Point = ({ position, isDragging, containerRef }: any) => {
  const size = useContainerSize(containerRef);
  const left = (position.x / 200) * size.width;
  const top = ((200 - position.y) / 200) * size.height;
  return (
    <div
      className={`absolute z-50 w-6 h-6 bg-red-500 border-2 border-white rounded-full shadow-lg transform -translate-x-3 -translate-y-3  ${
        isDragging ? 'scale-125 bg-red-600' : 'hover:scale-110'
      }`}
      style={{
        left,
        top,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      
    </div>
  );
};
  
const Crosshairs = ({ position, isDragging, containerRef }: any) => {
  const size = useContainerSize(containerRef);
  const left = (position.x / 200) * size.width;
  const top = ((200 - position.y) / 200) * size.height;
  if (!isDragging) return null;
  return (
    <>
      <div
        className="absolute top-0 bottom-0 w-px bg-red-300 opacity-60 pointer-events-none"
        style={{ left }}
      />
      <div
        className="absolute left-0 right-0 h-px bg-red-300 opacity-60 pointer-events-none"
        style={{ top }}
      />
    </>
  );
};
  


const PointSelector = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 }); // percent, 0-200
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const clamp = (val: number) => Math.max(0, Math.min(val, 200));

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
      let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      let y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      const xPercent = clamp(Math.round((x / rect.width) * 200));
      const yPercent = clamp(Math.round(((rect.height - y) / rect.height) * 200));
      setPosition({ x: xPercent, y: yPercent });
    }
  };

  const getPxFromPercent = (percent: number, size: number) => (percent / 200) * size;

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
      <div className="dark:bg-black bg-white rounded-lg">
        <div
          ref={containerRef}
          className="relative w-full h-60 border-2 dark:border-zinc-800 border-zinc-200 rounded-lg cursor-crosshair overflow-hidden"
          onMouseDown={handleMouseDown}
          style={{ userSelect: 'none' }}
        >
       <div className="absolute inset-0 
       dark:bg-[radial-gradient(circle,#e5e7eb_1px,transparent_1px)] 
       bg-[radial-gradient(circle,#000000_1px,transparent_1px)]
       bg-[size:20px_20px]"></div>
          {/* <div className="absolute bottom-2 left-2 text-xs text-zinc-800 font-mono">
            (0%, 0%)
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-zinc-800 font-mono">
            (200%, 0%)
          </div>
          <div className="absolute top-2 left-2 text-xs text-zinc-800 font-mono">
            (0%, 200%)
          </div>
          <div className="absolute top-2 right-2 text-xs text-zinc-800 font-mono">
            (200%, 200%)
          </div> */}

          <Point position={position} isDragging={isDragging} containerRef={containerRef} />

          <Crosshairs position={position} isDragging={isDragging} containerRef={containerRef} />
        </div>
      </div>
      <div className=" flex mt-3 items-center justify-center">  
            {position.x}% {position.y}%
      </div>
    </div>
  );
}
export default PointSelector