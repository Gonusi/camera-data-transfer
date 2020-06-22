import React, { useEffect, useRef, useState } from "react";
import Qr from "qrcode";
import styles from "./DataDisplay.module.scss";

interface DataDisplayProps {
  dataChunks: string[];
  isTransmitting: boolean;
}

function DataDisplay({ dataChunks, isTransmitting }: DataDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [currChunkIndex, setCurrChunkIndex] = useState(0);
  const canvasContainerWidth = canvasContainerRef.current?.offsetWidth || 0;

  useEffect(() => {
    if (isTransmitting) {
      const timeout = setTimeout(() => {
        const packet = {
          t: dataChunks.length - 1,
          n: currChunkIndex,
          d: dataChunks[currChunkIndex],
        };
        Qr.toCanvas(canvasRef.current, JSON.stringify(packet), {
          width: canvasContainerWidth,
        });
        if (dataChunks.length - 1 <= currChunkIndex) {
          setCurrChunkIndex(0);
        } else {
          setCurrChunkIndex((i) => i + 1);
        }
      }, 100);
      return () => {
        window.clearTimeout(timeout);
      };
    } else {
      setCurrChunkIndex(0);
    }
  }, [canvasContainerWidth, currChunkIndex, dataChunks, isTransmitting]);

  return (
    <div className={styles.canvasContainer} ref={canvasContainerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default DataDisplay;
