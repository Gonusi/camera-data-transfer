import React, { useEffect, useRef, useState } from "react";
import Qr from "qrcode";
import styles from "./DataDisplay.module.scss";

interface DataDisplayProps {
  dataChunks: string[];
  isTransmitting: boolean;
  packetDisplayTimeMs: number;
}

function DataDisplay({
  dataChunks,
  isTransmitting,
  packetDisplayTimeMs,
}: DataDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [currChunkIndex, setCurrChunkIndex] = useState(0);
  const canvasContainerWidth = canvasContainerRef.current?.offsetWidth || 0;

  useEffect(() => {
    function generateQrCode() {
      const packet = {
        t: dataChunks.length - 1,
        n: currChunkIndex,
        d: dataChunks[currChunkIndex],
      };
      console.log("Packet length:", JSON.stringify(packet).length);
      console.log("Packet:", JSON.stringify(packet));
      Qr.toCanvas(
        canvasRef.current,
        [{ data: JSON.stringify(packet), mode: "byte" }],
        {
          width: canvasContainerWidth,
        }
      );
      if (dataChunks.length - 1 <= currChunkIndex) {
        setCurrChunkIndex(0);
      } else {
        setCurrChunkIndex((i) => i + 1);
      }
    }

    if (isTransmitting) {
      if (currChunkIndex === 0) {
        generateQrCode();
      }

      const timeout = setTimeout(() => {
        generateQrCode();
      }, packetDisplayTimeMs);
      return () => {
        window.clearTimeout(timeout);
      };
    } else {
      setCurrChunkIndex(0);
    }
  }, [
    canvasContainerWidth,
    currChunkIndex,
    dataChunks,
    isTransmitting,
    packetDisplayTimeMs,
  ]);

  return (
    <div className={styles.canvasContainer} ref={canvasContainerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default DataDisplay;
