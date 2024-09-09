import { NextResponse } from "next/server";
import { Buffer } from "buffer";
import axios from "axios";
export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const imageBuffer = await getImage(query);
    const imageUrl = `${imageBuffer}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    return NextResponse.error();
  }
}

async function getImage(query: string) {
  const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
  const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
  };
  const data = {
    inputs: query,
  };
  const result = await axios.post(
    `https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell`,
    data,
    {
      headers: headers,
      responseType: "arraybuffer",
    },
  );
  const base64Image = `data:image/png;base64,${Buffer.from(result.data, "binary").toString("base64")}`;
  return base64Image;
}
