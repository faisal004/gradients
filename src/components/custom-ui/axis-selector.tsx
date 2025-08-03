import React, { useState, useRef, useCallback } from 'react';
import { Switch } from '../ui/switch';

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
            className={`absolute z-50 w-6 h-6 bg-red-500 border-2 border-white rounded-full shadow-lg transform -translate-x-3 -translate-y-3  ${isDragging ? 'scale-125 bg-red-600' : 'hover:scale-110'
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



const PointSelector = ({ position, setPosition }: any) => {
    const [isDragging, setIsDragging] = useState(false);
    const [mode, setMode] = useState<'snappy' | 'free'>('free');
    const containerRef = useRef<HTMLDivElement>(null);

    const clamp = (val: number) => Math.max(0, Math.min(val, 200));

    // Snap to nearest 10 for snappy mode
    const snap = (val: number) => Math.round(val / 10) * 10;

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        updatePosition(e.nativeEvent);
    };

    // Touch support
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsDragging(true);
        updatePosition(e);
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            updatePosition(e);
        }
    }, [isDragging, mode]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (isDragging) {
            updatePosition(e);
        }
    }, [isDragging, mode]);

    const handleMouseUp = () => {
        setIsDragging(false);
    };
    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Accepts MouseEvent | TouchEvent | React.TouchEvent
    const updatePosition = (e: any) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            let clientX: number, clientY: number;
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else if (e.changedTouches && e.changedTouches.length > 0) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            let x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            let y = Math.max(0, Math.min(clientY - rect.top, rect.height));
            let xPercent = (x / rect.width) * 200;
            let yPercent = ((rect.height - y) / rect.height) * 200;
            if (mode === 'snappy') {
                xPercent = snap(xPercent);
                yPercent = snap(yPercent);
            }
            setPosition({ x: clamp(xPercent), y: clamp(yPercent) });
        }
    };

    const getPxFromPercent = (percent: number, size: number) => (percent / 200) * size;

    React.useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isDragging, handleMouseMove, handleTouchMove]);

    return (
        <div className="max-w-4xl mx-auto my-2">
            <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-sm w-full text-left">
                    Shape Position
                </div>
                <div className="flex items-center justify-end gap-4">
                    <span className="text-xs font-mono">FREE</span>
                    <Switch
                        checked={mode === 'snappy'}
                        onCheckedChange={(checked) => setMode(checked ? 'snappy' : 'free')}
                    />
                    <span className="text-xs font-mono">SNAPPY</span>

                </div>
            </div>

            <div className="dark:bg-black bg-white rounded-lg">
                <div
                    ref={containerRef}
                    className="relative w-full h-60 border-2 dark:border-zinc-800 border-zinc-200 rounded-lg cursor-crosshair overflow-hidden"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    style={{ userSelect: 'none', touchAction: 'none' }}
                >
                    <div className="absolute inset-0 
       dark:bg-[radial-gradient(circle,#e5e7eb_1px,transparent_1px)] 
       bg-[radial-gradient(circle,#000000_1px,transparent_1px)]
       bg-[size:20px_20px]"></div>
                    <Point position={position} isDragging={isDragging} containerRef={containerRef} />
                    <Crosshairs position={position} isDragging={isDragging} containerRef={containerRef} />
                </div>
            </div>
            <div className=" flex mt-3 items-center justify-center">
                {Math.round(position.x)}% {Math.round(position.y)}%
            </div>
        </div>
    );
}
export default PointSelector