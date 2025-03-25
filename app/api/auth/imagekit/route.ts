import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

//this file is the basically the route specified in the fetch request in ImageUpload.tsx

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config; // destructuring the contents from config.ts 

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET(){
  return NextResponse.json(imagekit.getAuthenticationParameters());
}

