import { useEffect, useState } from "react";
import { AlertCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppURL } from "@/data/pricing";
import { calculateFare } from "@/services/fareService";
import { getRoute } from "@/services/osrmService";
import type { FareResult as FareResultType, Location, RouteResult, VehicleType } from "@/types/booking";
import { LocationSearch } from "@/components/booking/LocationSearch";
import { VehicleSelector } from "@/components/booking/VehicleSelector";
import { FareResult } from "@/components/booking/FareResult";
import { TaxiMap } from "@/components/map/TaxiMap";

interface BookingErrors {
  pickup?: string;
  drop?: string;
  vehicle?: string;
  general?: string;
}

const defaultFareResult: FareResultType | null = null;

export function BookingForm() {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [drop, setDrop] = useState<Location | null>(null);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [fareResult, setFareResult] = useState<FareResultType | null>(defaultFareResult);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<BookingErrors>({});

  useEffect(() => {
    setFareResult(null);
    setRoute(null);
    setErrors((current) => ({ ...current, general: undefined }));
  }, [pickup, drop, vehicle]);

  const validate = () => {
    const nextErrors: BookingErrors = {};

    if (!pickup) {
      nextErrors.pickup = "Select a pickup location.";
    }

    if (!drop) {
      nextErrors.drop = "Select a drop location.";
    }

    if (!vehicle) {
      nextErrors.vehicle = "Choose a vehicle type.";
    }

    if (pickup && drop && pickup.latitude === drop.latitude && pickup.longitude === drop.longitude) {
      nextErrors.drop = "Pickup and drop locations must be different.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleCalculate = async () => {
    if (!validate() || !pickup || !drop || !vehicle) {
      return;
    }

    setIsCalculating(true);
    setErrors({});

    try {
      const routeResult = await getRoute(pickup.latitude, pickup.longitude, drop.latitude, drop.longitude);
      const price = calculateFare(routeResult.distanceKm, vehicle);

      setRoute(routeResult);
      setFareResult({
        pickup,
        drop,
        vehicle,
        distanceKm: routeResult.distanceKm,
        durationMinutes: routeResult.durationMinutes,
        price,
        routeGeometry: routeResult.geometry,
      });
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "Something went wrong while calculating the fare.",
      });
      setFareResult(null);
      setRoute(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleWhatsAppBooking = () => {
    if (!fareResult) {
      return;
    }

    const message = `🚕 *Taxi Fare Estimate*\n\n📍 Pickup: ${fareResult.pickup.name}\n📍 Drop: ${fareResult.drop.name}\n🚗 Vehicle: ${fareResult.vehicle}\n📏 Distance: ${fareResult.distanceKm.toFixed(1)} km\n⏱️ Duration: ${Math.round(fareResult.durationMinutes)} min\n💰 Price: LKR ${fareResult.price.toLocaleString()}`;
    window.open(generateWhatsAppURL(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <LocationSearch
          label="Pickup Location"
          placeholder="Search location"
          value={pickup}
          onChange={(location) => {
            setPickup(location);
            setErrors((current) => ({ ...current, pickup: undefined, general: undefined }));
          }}
          error={errors.pickup}
        />
        <LocationSearch
          label="Drop Location"
          placeholder="Search location"
          value={drop}
          onChange={(location) => {
            setDrop(location);
            setErrors((current) => ({ ...current, drop: undefined, general: undefined }));
          }}
          error={errors.drop}
        />
      </div>

      <VehicleSelector
        value={vehicle}
        onChange={(nextVehicle) => {
          setVehicle(nextVehicle);
          setErrors((current) => ({ ...current, vehicle: undefined, general: undefined }));
        }}
        error={errors.vehicle}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="h-12 flex-1 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Calculate Fare
        </Button>
        {fareResult ? (
          <Button
            onClick={handleWhatsAppBooking}
            variant="outline"
            className="h-12 flex-1 border-primary/30 text-primary hover:bg-primary/10"
          >
            <Send className="mr-2 h-4 w-4" />
            Book via WhatsApp
          </Button>
        ) : null}
      </div>

      {errors.general ? (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{errors.general}</p>
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
        <FareResult result={fareResult} />
        <TaxiMap pickup={fareResult?.pickup ?? pickup} drop={fareResult?.drop ?? drop} route={route} />
      </div>
    </div>
  );
}

export default BookingForm;