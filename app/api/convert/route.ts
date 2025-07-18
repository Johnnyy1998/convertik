import url from "url";
import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const data = await request.json();
  const { amount, from, to } = data;
  if (!amount || !from || !to) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }
  try {
    const key = process.env.api_key;

    const response = await axios.get(
      `https://api.currencylayer.com/convert?access_key=${key}&from=${from}&to=${to}&amount=${amount}`
    );
    let exchangeAmount = response.data.result;

    const __fileName = url.fileURLToPath(import.meta.url);
    const __dirName = path.dirname(__fileName);
    const filePath = path.join(__dirName, "..", "..", "..", "converts.json");

    const actualDataFile = await fs.readFile(filePath, "utf-8");
    const jsonDataFile = await JSON.parse(actualDataFile);

    let id = jsonDataFile.length + 1;

    jsonDataFile.push({
      id: id,
      amount: exchangeAmount,
      from: from,
      to: to,
    });

    await fs.writeFile(filePath, JSON.stringify(jsonDataFile));

    return NextResponse.json(
      { result: exchangeAmount, to: to },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
