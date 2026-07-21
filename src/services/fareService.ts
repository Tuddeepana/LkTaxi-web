import type { VehicleType } from "@/types/booking";

export const vehicleRates: Record<VehicleType, number> = {
  Sedan: 150,
  Van: 200,
  SUV: 250,
};

export function calculateFare(distanceKm: number, vehicleType: VehicleType): number {
  return Math.round(distanceKm * vehicleRates[vehicleType]);
}

export function formatDistance(distanceKm: number): string {
  return `${Math.round(distanceKm)} km`;
}

export function formatDuration(durationMinutes: number): string {
  const roundedMinutes = Math.max(0, Math.round(durationMinutes));
  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}min`;
}