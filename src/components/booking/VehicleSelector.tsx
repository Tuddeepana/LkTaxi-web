import { CarFront, CarTaxiFront, TramFront } from "lucide-react";
import { cn } from "@/lib/utils";
import { vehicleRates } from "@/services/fareService";
import type { VehicleType } from "@/types/booking";

interface VehicleSelectorProps {
  value: VehicleType | null;
  onChange: (vehicle: VehicleType) => void;
  error?: string;
}

const vehicleOptions: Array<{
  type: VehicleType;
  label: string;
  icon: typeof CarFront;
  description: string;
}> = [
  {
    type: "Sedan",
    label: "Sedan",
    icon: CarTaxiFront,
    description: "Comfortable for couples and small groups.",
  },
  {
    type: "Van",
    label: "Van",
    icon: CarFront,
    description: "Ideal for families and medium-sized groups.",
  },
  {
    type: "SUV",
    label: "SUV",
    icon: TramFront,
    description: "More space and a premium long-distance ride.",
  },
];

export function VehicleSelector({ value, onChange, error }: VehicleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-muted-foreground">Vehicle Type</label>
      <div className="grid gap-3 sm:grid-cols-3">
        {vehicleOptions.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.type}
              type="button"
              onClick={() => onChange(option.type)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-4",
                value === option.type
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                  : "border-border bg-background",
              )}
            >
              <div className="flex items-start gap-3">
                <span className="rounded-lg bg-muted p-2 text-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">{option.label}</p>
                  <p className="text-xs text-muted-foreground">LKR {vehicleRates[option.type]}/km</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-3">{option.description}</p>
            </button>
          );
        })}
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

export default VehicleSelector;