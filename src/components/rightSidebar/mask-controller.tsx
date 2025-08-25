"use client";

import { useMaskStore } from "@/store/masking-store";


const MaskControls = () => {
  const {
    addMask,
    setAddMask,
    maskType,
    setMaskType,
    direction,
    setDirection,
    radialShape,
    setRadialShape,
    radialPosition,
    setRadialPosition,
    from,
    setFrom,
    via,
    setVia,
    to,
    setTo,
    fromPercentage,
    setFromPercentage,
    viaPercentage,
    setViaPercentage,
    toPercentage,
    setToPercentage,
    maskSize,
    setMaskSize,
    maskRepeat,
    setMaskRepeat
  } = useMaskStore();

  return (
    <div className="p-4 space-y-4 bg-gray-900 rounded-lg">
      <h3 className="text-lg font-semibold">Mask Controls</h3>
      
      {/* Enable/Disable Mask */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="addMask"
          checked={addMask}
          onChange={(e) => setAddMask(e.target.checked)}
        />
        <label htmlFor="addMask">Add Mask</label>
      </div>

      {addMask && (
        <>
          {/* Mask Type */}
          <div className="space-y-2">
            <label>Mask Type</label>
            <select
              value={maskType}
              onChange={(e) => setMaskType(e.target.value as 'linear' | 'radial')}
              className="w-full p-2 border rounded"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>

          {/* Linear Direction */}
          {maskType === 'linear' && (
            <div className="space-y-2">
              <label>Direction</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as any)}
                className="w-full p-2 border rounded"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>
          )}

          {/* Radial Properties */}
          {maskType === 'radial' && (
            <>
              <div className="space-y-2">
                <label>Shape</label>
                <select
                  value={radialShape}
                  onChange={(e) => setRadialShape(e.target.value as 'circle' | 'ellipse')}
                  className="w-full p-2 border rounded"
                >
                  <option value="circle">Circle</option>
                  <option value="ellipse">Ellipse</option>
                </select>
              </div>

              <div className="space-y-2">
                <label>Position X: {radialPosition.x}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={radialPosition.x}
                  onChange={(e) => setRadialPosition({ ...radialPosition, x: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label>Position Y: {radialPosition.y}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={radialPosition.y}
                  onChange={(e) => setRadialPosition({ ...radialPosition, y: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </>
          )}

          {/* Color Stops */}
          <div className="space-y-2">
            <label>From Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={from === 'transparent' ? '#000000' : from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-12 h-8"
              />
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="black, #000000, rgba(0,0,0,1)"
                className="flex-1 p-2 border rounded"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label>From Percentage: {fromPercentage}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={fromPercentage}
              onChange={(e) => setFromPercentage(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Via Color */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="useVia"
                checked={via !== null}
                onChange={(e) => setVia(e.target.checked ? 'rgba(0,0,0,0.5)' : null)}
              />
              <label htmlFor="useVia">Use Via Color</label>
            </div>
            
            {via && (
              <>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={via === 'transparent' ? '#000000' : via}
                    onChange={(e) => setVia(e.target.value)}
                    className="w-12 h-8"
                  />
                  <input
                    type="text"
                    value={via}
                    onChange={(e) => setVia(e.target.value)}
                    placeholder="rgba(0,0,0,0.5)"
                    className="flex-1 p-2 border rounded"
                  />
                </div>
                
                <div className="space-y-2">
                  <label>Via Percentage: {viaPercentage}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={viaPercentage}
                    onChange={(e) => setViaPercentage(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <label>To Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={to === 'transparent' ? '#000000' : to}
                onChange={(e) => setTo(e.target.value)}
                className="w-12 h-8"
              />
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="transparent, #ffffff, rgba(255,255,255,0)"
                className="flex-1 p-2 border rounded"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label>To Percentage: {toPercentage}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={toPercentage}
              onChange={(e) => setToPercentage(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Mask Size */}
          <div className="space-y-2">
            <label>Mask Size</label>
            <select
              value={maskSize}
              onChange={(e) => setMaskSize(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="100% 100%">100% 100% (Cover)</option>
              <option value="contain">Contain</option>
              <option value="50% 50%">50% 50%</option>
              <option value="200px 200px">200px 200px</option>
            </select>
          </div>

          {/* Mask Repeat */}
          <div className="space-y-2">
            <label>Mask Repeat</label>
            <select
              value={maskRepeat}
              onChange={(e) => setMaskRepeat(e.target.value as any)}
              className="w-full p-2 border rounded"
            >
              <option value="no-repeat">No Repeat</option>
              <option value="repeat">Repeat</option>
              <option value="repeat-x">Repeat X</option>
              <option value="repeat-y">Repeat Y</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default MaskControls;