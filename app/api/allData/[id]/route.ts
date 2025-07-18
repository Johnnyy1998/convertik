import { NextRequest, NextResponse } from "next/server";
import url from "url";
import path from "path";
import fs from "fs/promises";
import { jsonData } from "@/utils/types";

export async function DELETE(req: NextRequest) {
  const id = req.url.split("/").pop() as number | undefined;

  const __fileName = url.fileURLToPath(import.meta.url);
  const __dirName = path.dirname(__fileName);
  const pathUrl = path.join(__dirName, "..", "..", "..", "..", "converts.json");

  try {
    const readFile = await fs.readFile(pathUrl, { encoding: "utf8" });
    const readFileJson: jsonData[] = await JSON.parse(readFile);

    const filterData = readFileJson.filter((item) => item.id != id);
    await fs.writeFile(pathUrl, JSON.stringify(filterData), {
      encoding: "utf-8",
    });

    return Response.json(filterData, { status: 201 });
  } catch (error) {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}
