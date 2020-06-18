import React, { useRef, useState, useEffect } from "react";
import QrScanner from "qr-scanner";

QrScanner.WORKER_PATH = `${process.env.PUBLIC_URL}/qr-scanner-worker.min.js`;
console.log(QrScanner.WORKER_PATH);
let qrScanner: QrScanner;

const handleClick = (setResult: any, videoRef: any) => {
  console.log("Reading code...");
  const video = document.getElementById("videoElem");
  qrScanner = new QrScanner(video as HTMLVideoElement, (result: string) => {
    setResult(result);
  });
  qrScanner.start();

  const currVideoRef = videoRef.current;
  if (currVideoRef !== null) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
          //currVideoRef.src = window.URL.createObjectURL(stream);
          currVideoRef!.srcObject = stream;
          currVideoRef!.play();
        });
    }
  }
};

const obj: { [key: number]: string } = { 1: "vienas" };

function Client() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState("");
  const [total, setTotal] = useState(null);
  const [finalResult, setFinalResult] = useState<string>();
  const [obj, setObj] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (!result) return;
    const parsedResult = JSON.parse(result || "{}");
    if (parsedResult.n === undefined) return;
    console.log(parsedResult);
    setObj((currObj) => ({
      ...currObj,
      [parsedResult.n]: parsedResult.d,
    }));
  }, [result]);

  useEffect(() => {
    if (total !== null && Object.keys(obj).length >= total!) {
      qrScanner.stop();
    }
    setFinalResult(Object.values(obj).join("").split(">").join(""));
  }, [obj, total]);

  return (
    <div>
      <video style={{ width: "300px" }} id="videoElem" ref={videoRef}></video>
      <button onClick={() => handleClick(setResult, videoRef)}>
        READ code
      </button>
      result: {result}
      FINAL RESULT:
      {finalResult}
    </div>
  );
}

export default Client;
