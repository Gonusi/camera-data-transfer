import React, { useEffect, useRef, useState, useCallback } from "react";
import Qr from "qrcode";

interface DataDisplayProps {
  dataChunks: string[];
}

function useDisplay(canvas: HTMLCanvasElement | null, dataChunks: string[]) {
  const interval = useRef<number>();
  const currChunkIndex = useRef(0);

  useEffect(() => {
    function startDataDisplay() {
      console.log("Starting display");
      interval.current = window.setInterval(() => {
        const packet = {
          t: dataChunks.length - 1,
          n: currChunkIndex.current,
          d: dataChunks[currChunkIndex.current],
        };

        Qr.toCanvas(canvas, JSON.stringify(packet));
        if (dataChunks.length - 1 <= currChunkIndex.current) {
          currChunkIndex.current = 0;
        } else {
          currChunkIndex.current++;
        }
      }, 100);
    }

    function stopDataDisplay() {
      currChunkIndex.current = 0;
      if (interval.current !== null) {
        window.clearInterval(interval.current);
      }
    }

    console.log("Canvas", canvas);
    if (canvas) {
      startDataDisplay();
    }
    return () => {
      stopDataDisplay();
    };
  }, [canvas, dataChunks, interval]);

  return currChunkIndex.current;
}

function DataDisplay({ dataChunks }: DataDisplayProps) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const currentChunkIndex = useDisplay(canvas, dataChunks);

  const getRef = useCallback((node) => {
    if (node !== null) {
      setCanvas(node);
    }
  }, []);

  return (
    <div>
      <canvas ref={getRef} />
      <div>Current chunk: {currentChunkIndex}</div>
    </div>
  );
}

export default DataDisplay;
