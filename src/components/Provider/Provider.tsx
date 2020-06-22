import React, { useState } from "react";
import DataDisplay from "../DataDisplay/DataDisplay";
import Button from "../Button/Button";
import { getChunksFromString, fillChunksWithPlaceholder } from "../../helpers";
import styles from "./Provider.module.scss";

const PACKET_SIZE = 10;
const DEMO_DATA = `Lietuva, Tėvyne mūsų, Tu didvyrių žeme, Iš praeities Tavo sūnūs Te stiprybę semia.
Tegul Tavo vaikai eina Vien takais dorybės, Tegul dirba Tavo naudai Ir žmonių gėrybei.
Tegul saulė Lietuvoj Tamsumas prašalina, Ir šviesa, ir tiesa Mūs žingsnius telydi.
Tegul meilė Lietuvos Dega mūsų širdyse, Vardan tos, Lietuvos Vienybė težydi!`;

const getDataPackets = (data: string) =>
  getChunksFromString(data, PACKET_SIZE).map((chunk) =>
    fillChunksWithPlaceholder(chunk, PACKET_SIZE)
  );

function Provider() {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [data, setData] = useState(DEMO_DATA);

  return (
    <>
      <textarea
        className={styles.textarea}
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <DataDisplay
        dataChunks={getDataPackets(data)}
        isTransmitting={isTransmitting}
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
