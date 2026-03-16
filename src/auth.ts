import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";

export interface PinterestAdsCredentials {
  access_token: string;
}

const DEFAULT_PATH = join(
  homedir(),
  ".config",
  "pinterest-ads-cli",
  "credentials.json"
);

export function loadCredentials(
  credentialsPath?: string
): PinterestAdsCredentials {
  // 1. --credentials flag
  if (credentialsPath) {
    return readJSON(credentialsPath);
  }

  // 2. Environment variable
  if (process.env.PINTEREST_ADS_ACCESS_TOKEN) {
    return {
      access_token: process.env.PINTEREST_ADS_ACCESS_TOKEN,
    };
  }

  // 3. Default credentials file
  if (existsSync(DEFAULT_PATH)) {
    return readJSON(DEFAULT_PATH);
  }

  throw new Error(
    `No credentials found. Provide one of:\n` +
      `  1. --credentials <path> flag\n` +
      `  2. PINTEREST_ADS_ACCESS_TOKEN env var\n` +
      `  3. ${DEFAULT_PATH}`
  );
}

function readJSON(path: string): PinterestAdsCredentials {
  const raw = readFileSync(path, "utf-8");
  const data = JSON.parse(raw);
  if (!data.access_token) {
    throw new Error(`credentials file missing "access_token": ${path}`);
  }
  return data;
}
