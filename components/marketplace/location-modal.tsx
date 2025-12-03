"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Iconex from "../icons/iconex";
import { Info } from "lucide-react";

type Location = {
  label: string;
  lat?: number;
  lng?: number;
};

const STORAGE_KEY = "dispa8ch_location";

export default function LocationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [useCurrent, setUseCurrent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState("");
  const [savedLocation, setSavedLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      try {
        setSavedLocation(JSON.parse(raw));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    // reset state when opening
    setError(null);
    setLoading(false);
    setUseCurrent(false);
    setCoords(null);
    setAddress("");
  }, [open]);

  async function requestGeolocation() {
    setError(null);
    setLoading(true);
    try {
      if (!navigator.geolocation) {
        setError("Geolocation not supported by this browser.");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoords({ lat, lng });
          // Mock reverse-geocode: in production replace this with a real API call to a geocoding service
          setAddress(
            `Current location (lat: ${lat.toFixed(4)}, lng: ${lng.toFixed(4)})`
          );
          setLoading(false);
          setUseCurrent(true);
        },
        (err) => {
          setError(err.message || "Unable to retrieve your location.");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } catch (e: any) {
      setError(e?.message ?? String(e));
      setLoading(false);
    }
  }

  function handleSave() {
    const payload: Location = {
      label: address || (coords ? `Lat ${coords.lat}, Lng ${coords.lng}` : ""),
      lat: coords?.lat,
      lng: coords?.lng,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setSavedLocation(payload);
      onOpenChange(false);
    } catch (e) {
      setError("Failed to save location.");
    }
  }

  function handleClear() {
    localStorage.removeItem(STORAGE_KEY);
    setSavedLocation(null);
    setCoords(null);
    setAddress("");
    setUseCurrent(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set your location</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {savedLocation ? (
            <div className="flex flex-col gap-1">
              <div className="text-sm text-muted-foreground">
                Saved location
              </div>
              <div className="font-medium p-2 border rounded">
                {savedLocation.label}
              </div>
            </div>
          ) : null}

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={requestGeolocation}
              disabled={loading}
            >
              {loading ? "Locating…" : "Use current location"}
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Clear
            </Button>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-sm text-muted-foreground">
              Or enter an address
            </div>
            <Input
              placeholder="Street, city, state, postcode"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {error ? <div className="flex items-center gap-1 text-sm text-red-600"><Iconex icon={Info} className="fill-red-600 text-background"/>{error}</div> : null}
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!address && !coords}>
              Save location
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/*
Notes:
- This component uses a mocked reverse-geocode string. To integrate a real reverse-geocoding API (e.g., Google Maps Geocoding API, OpenCage, or LocationIQ), replace the mock in requestGeolocation with a fetch request to your server-side endpoint which holds the API key.
- Do NOT store API keys in client-side code. Instead, create a server endpoint under /api/reverse-geocode that accepts lat/lng and calls the geocoding provider, returning a human-readable address.
*/
