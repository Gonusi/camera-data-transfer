import React, { useState } from "react";
import DataDisplay from "../DataDisplay/DataDisplay";
import Button from "../Button/Button";
import {
  getChunksFromString,
  fillChunksWithPlaceholder,
  getSizeInKilobytes,
} from "../../helpers";
import kafkaDemoText from "../../kafkaDemoText";
import styles from "./Provider.module.scss";

const STORABLE_CHARACTERS = 2200; // Byte mode at 8 bits per char, M error correction level https://www.npmjs.com/package/qrcode#qr-code-capacity would be 2233, but additional info need to be transmitted

const getDataPackets = (data: string, packetDataLength: number) => {
  const usedPacketDataLength =
    packetDataLength && packetDataLength >= 1 ? packetDataLength : 10;
  return getChunksFromString(data, usedPacketDataLength).map((chunk) =>
    fillChunksWithPlaceholder(chunk, usedPacketDataLength)
  );
};

function Provider() {
  const [packetDataLength, setPacketDataLength] = useState<number>(10);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [data, setData] = useState(kafkaDemoText);
  const sizeInKilobytes = getSizeInKilobytes(data);
  const dataPackets = getDataPackets(data, packetDataLength);
  const [packetDisplayTimeMs, setPacketDisplayTimeMs] = useState(100);

  // console.log(
  //   "Data packets:",
  //   dataPackets,
  //   " Max length: ",
  //   Math.max(...dataPackets.map((packet) => packet.length))
  // );

  return (
    <>
      <textarea
        className={styles.textarea}
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <div>
        {sizeInKilobytes} Kb | {data.length} characters
      </div>
      <div>
        <input
          className={styles.rangeInput}
          type="range"
          min="10"
          max={STORABLE_CHARACTERS}
          value={packetDataLength}
          onChange={(e) => setPacketDataLength(Number(e.target.value))}
        />
      </div>
      <div>Packet size: {packetDataLength}</div>
      <div>
        <input
          className={styles.rangeInput}
          type="range"
          min="50"
          max="4000"
          value={packetDisplayTimeMs}
          onChange={(e) => setPacketDisplayTimeMs(Number(e.target.value))}
        />
      </div>
      <div>Packet display time ms: {packetDisplayTimeMs}</div>
      <DataDisplay
        dataChunks={dataPackets}
        isTransmitting={isTransmitting}
        packetDisplayTimeMs={packetDisplayTimeMs}
      />
      <Button
        onClick={() =>
          isTransmitting ? setIsTransmitting(false) : setIsTransmitting(true)
        }
      >
        {isTransmitting ? "Stop" : "Transmit"}
      </Button>
    </>
  );
}

export default Provider;
