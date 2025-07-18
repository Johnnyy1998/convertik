import path from "path";
import url from "url";
import fs from "fs/promises";
import { jsonData } from "@/utils/types";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("using allData");
  const fileName = url.fileURLToPath(import.meta.url);
  const dirname = path.dirname(fileName);
  const pathUrl = path.join(dirname, "..", "..", "..", "converts.json");
  console.log(pathUrl);

  try {
    const data = await fs.readFile(pathUrl, { encoding: "utf-8" });
    const clearData: jsonData[] = await JSON.parse(data);
    return NextResponse.json(clearData, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
