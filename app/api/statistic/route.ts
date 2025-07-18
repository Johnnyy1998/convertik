import { NextResponse } from "next/server";
import url from "url";
import path from "path";
import fs from "fs/promises";
import { jsonData } from "@/utils/types";

function getMostUsed(data: jsonData[], type: "from" | "to") {
  const keyData = data.reduce<Record<string, number>>((acc, item) => {
    if (item[type]) {
      acc[item[type]] = (acc[item[type]] || 0) + 1;
    }
    return acc;
  }, {});
  console.log(keyData);
  const mostused = Object.keys(keyData).reduce((acc, item) => {
    if (keyData[item] > keyData[acc]) {
      acc = item;
    }
    return acc;
  }, Object.keys(keyData)[0]);
  //console.log(mostused);
  return mostused;
}

export async function GET() {
  try {
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "..", "..", "..", "converts.json");

    const data = await fs.readFile(filePath, "utf-8");
    const dataJson: jsonData[] = await JSON.parse(data);

    const mostFrom = getMostUsed(dataJson, "from");
    const mostTo = getMostUsed(dataJson, "to");

    return NextResponse.json(
      { mostFrom: mostFrom, mostTo: mostTo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
}
