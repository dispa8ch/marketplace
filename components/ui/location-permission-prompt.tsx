"use client";

import { Button } from "@/components/ui/button";
import useLocation from "@/hooks/use-location";
import { MapPin } from "lucide-react";
import Iconex from "@/components/icons/iconex";

export function LocationPermissionPrompt() {
  const { status, coords, error, requestPermission } = useLocation();

  if (status === "granted" && coords) {
    return (
      <div className="p-4 bg-[#032703] rounded-md border border-green-900">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
            <Iconex icon={MapPin} className="h-6 w-6 text-green-100 fill-green-950" />
          </span>

          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">Location enabled</div>
            <div className="text-xs text-muted-foreground">
              Lat: {coords.lat.toFixed(4)}, Lng: {coords.lng.toFixed(4)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-yellow-50 rounded-md border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Iconex icon={MapPin} className="mr-2 h-5 w-5 text-amber-600" />
          <div>
            <div className="text-sm font-medium">Enable location</div>
            <div className="text-xs text-muted-foreground">
              Allow location for accurate delivery estimates.
            </div>
            {error && <div className="text-xs text-destructive">{error}</div>}
          </div>
        </div>
        <div>
          <Button onClick={requestPermission}>Allow</Button>
        </div>
      </div>
    </div>
  );
}

export default LocationPermissionPrompt;
