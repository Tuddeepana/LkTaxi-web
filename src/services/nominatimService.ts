import type { Location } from "@/types/booking";

const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";
const searchCache = new Map<string, Location[]>();

function toLocation(result: Record<string, unknown>): Location | null {
  const latitude = Number(result.lat);
  const longitude = Number(result.lon);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  const displayName = typeof result.display_name === "string" ? result.display_name : "";
  const name =
    (typeof result.name === "string" && result.name.trim()) ||
    displayName.split(",")[0]?.trim() ||
    displayName ||
    "Unknown location";

  return {
    name,
    displayName,
    latitude,
    longitude,
    placeId: result.place_id !== undefined ? String(result.place_id) : undefined,
  };
}

export async function searchLocation(query: string): Promise<Location[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const cacheKey = trimmedQuery.toLowerCase();
  const cached = searchCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const url = new URL(NOMINATIM_ENDPOINT);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", trimmedQuery);
  url.searchParams.set("limit", "6");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", "en");
  url.searchParams.set("countrycodes", "lk");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Location search is unavailable right now.");
  }

  const data = (await response.json()) as Array<Record<string, unknown>>;
  const results = Array.isArray(data)
    ? data.map(toLocation).filter((item): item is Location => item !== null)
    : [];

  searchCache.set(cacheKey, results);

  return results;
}