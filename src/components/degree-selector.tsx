import { useState, useRef, useCallback } from 'react';

const SNAP_POINTS = [0, 90, 180, 270, 360];
const SNAP_THRESHOLD = 8; 

export default function DegreeSelector() {
  const [angle, setAngle] = useState(45); 
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [initialMouseAngle, setInitialMouseAngle] = useState(0);
  const needleRef = useRef<HTMLDivElement>(null);

  const getPointerAngle = useCallback((clientX: number, clientY: number) => {
    const dial = document.getElementById('degree-dial');
    if (!dial) return 0;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    let pointerAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    if (pointerAngle < 0) pointerAngle += 360;
    return pointerAngle;
  }, []);

  const handleNeedleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    const mouseAngle = getPointerAngle(e.clientX, e.clientY);
    setInitialMouseAngle(mouseAngle);
    setDragStartAngle(angle);
  };

  const handleNeedleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    const touchAngle = getPointerAngle(touch.clientX, touch.clientY);
    setInitialMouseAngle(touchAngle);
    setDragStartAngle(angle);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateAngle(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      updateAngle(touch.clientX, touch.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateAngle = (clientX: number, clientY: number) => {
    const currentPointerAngle = getPointerAngle(clientX, clientY);
    let angleDelta = currentPointerAngle - initialMouseAngle;
    if (angleDelta > 180) angleDelta -= 360;
    if (angleDelta < -180) angleDelta += 360;
    let newAngle = dragStartAngle + angleDelta;
    if (newAngle < 0) newAngle += 360;
    if (newAngle >= 360) newAngle -= 360;
    for (const snap of SNAP_POINTS) {
      if (Math.abs(newAngle - snap) < SNAP_THRESHOLD || 
          Math.abs(newAngle - (snap + 360)) < SNAP_THRESHOLD) {
        newAngle = snap;
        break;
      }
    }
    setAngle(Math.round(newAngle));
  };


  const rotation = angle - 90;

  return (
    <div 
      className="flex items-center justify-center select-none "
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
    >
      <div className="flex flex-col items-center gap-6 shadow-[0_1px_20px_rgb(0,0,0,1)] rounded-full">
        <div className="relative size-40">
          <div 
            id="degree-dial"
            className="absolute inset-0 rounded-full border-2 border-zinc-600 bg-zinc-800 "
          >
            
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5  h-4 bg-slate-300"
                style={{
                  top: '3px',
                  left: '50%',
                  zIndex: 1,
                  transformOrigin: '50% 75px',
                  transform: `translateX(-50%) rotate(${i * 30}deg)`
                }}
              />
            ))}
            
            {[...Array(36)].map((_, i) => {
              if (i % 3 !== 0) { 
                return (
                  <div
                    key={`minor-${i}`}
                    className="absolute w-px h-4 bg-slate-500"
                    style={{
                      top: '3px',
                      left: '50%',
                      transformOrigin: '50% 75px',
                      transform: `translateX(-50%) rotate(${i * 10}deg)`
                    }}
                  />
                );
              }
              return null;
            })}

          

            <div className="absolute w-full h-px bg-zinc-600 top-1/2 transform -translate-y-1/2" />
            <div className="absolute h-full w-px bg-zinc-600 left-1/2 transform -translate-x-1/2" />
            

            <div
              ref={needleRef}
              className={`absolute w-1 bg-zinc-400 rounded-full origin-bottom z-20 cursor-grab ${isDragging ? 'cursor-grabbing bg-zinc-400' : ''}`}
              style={{
                height: '50px',
                left: '50%',
                bottom: '50%',
                transformOrigin: '50% 100%',
                transform: `translateX(-50%) rotate(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
              onMouseDown={handleNeedleMouseDown}
              onTouchStart={handleNeedleTouchStart}
            />

            <div className="absolute w-6 h-6 bg-zinc-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30" />
            <div className="absolute w-3 h-3 bg-zinc-400 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40" />
          </div>
        </div>
        
     
      </div>
    </div>
  );
}