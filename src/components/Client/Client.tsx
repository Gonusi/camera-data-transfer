import React, { useRef, useState, useEffect } from "react";
import QrScanner from "qr-scanner";
import Button from "../Button/Button";
import styles from "./Client.module.scss";

QrScanner.WORKER_PATH = `${process.env.PUBLIC_URL}/qr-scanner-worker.min.js`;

function Client() {
  const [isRunning, setIsRunning] = useState(false);
  const [lastPacket, setLastPacket] = useState("");
  const [obj, setObj] = useState<{ [key: number]: string }>();
  const [result, setResult] = useState("");
  const [total, setTotal] = useState(null);
  const qrScannerRef = useRef<QrScanner>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (isRunning && video) {
      qrScannerRef.current = new QrScanner(
        video as HTMLVideoElement,
        (lastPacket: string) => {
          setLastPacket(lastPacket);
        }
      );
      qrScannerRef.current!.start();
    } else if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
  }, [isRunning]);

  useEffect(() => {
    const parsedLastPacket = JSON.parse(lastPacket || "{}");
    if (parsedLastPacket.n >= 0) {
      setTotal(parsedLastPacket.t);
      setObj((currObj) => ({
        ...currObj,
        [parsedLastPacket.n]: parsedLastPacket.d,
      }));
    }
  }, [lastPacket]);

  useEffect(() => {
    if (
      total !== null &&
      obj &&
      Object.keys(obj).length >= total! &&
      qrScannerRef.current
    ) {
      qrScannerRef.current.stop();
    }
    setResult(
      Object.values(obj || {})
        .join("")
        .split(">")
        .join("")
    );
  }, [obj, total]);

  return (
    <div>
      <video ref={videoRef} className={styles.video} />
      <div className={styles.buttonContainer}>
        <Button className={styles.button} onClick={() => setIsRunning(true)}>
          Start receiving
        </Button>
        <Button
          className={styles.button}
          disabled={!obj}
          onClick={() => setIsRunning(false)}
        >
          {obj ? "Clear" : <s>Clear</s>}
        </Button>
      </div>
      <div className={styles.resultContainer}>
        <div className={styles.lastPacket}>
          <span className={styles.label}>Last packet:</span> {lastPacket}
        </div>
        <div className={styles.result}>
          <span className={styles.label}>Result:</span>
          {result}
        </div>
      </div>
    </div>
  );
}

export default Client;
