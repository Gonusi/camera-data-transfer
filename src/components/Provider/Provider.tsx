import React from "react";
import DataDisplay from "../DataDisplay/DataDisplay";
import { getChunksFromString, fillChunksWithPlaceholder } from "../../helpers";

const PACKET_SIZE = 10;

const data = `Lietuva, Tėvyne mūsų, Tu didvyrių žeme, Iš praeities Tavo sūnūs Te stiprybę semia.
Tegul Tavo vaikai eina Vien takais dorybės, Tegul dirba Tavo naudai Ir žmonių gėrybei.
Tegul saulė Lietuvoj Tamsumas prašalina, Ir šviesa, ir tiesa Mūs žingsnius telydi.
Tegul meilė Lietuvos Dega mūsų širdyse, Vardan tos, Lietuvos Vienybė težydi!`;

const dataChunks = getChunksFromString(data, PACKET_SIZE)?.map((chunk) =>
  fillChunksWithPlaceholder(chunk, PACKET_SIZE)
);

function Provider() {
  return <DataDisplay dataChunks={dataChunks as any} />;
}

export default Provider;
