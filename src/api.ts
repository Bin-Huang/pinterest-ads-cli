import type { PinterestAdsCredentials } from "./auth.js";

const BASE_URL = "https://api.pinterest.com/v5";

export interface ApiOptions {
  creds: PinterestAdsCredentials;
  params?: Record<string, string>;
}

export async function callApi(
  endpoint: string,
  opts: ApiOptions
): Promise<unknown> {
  let url = `${BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${opts.creds.access_token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (opts.params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(opts.params)) {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, value);
      }
    }
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, { method: "GET", headers });
  const json = (await res.json()) as Record<string, unknown>;

  if (!res.ok) {
    const msg =
      (json.message as string) ??
      (json.error as string) ??
      `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return json;
}
