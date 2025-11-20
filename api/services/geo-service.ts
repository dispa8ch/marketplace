import { LGAZone } from '../models/LGAZone';
import { Coordinates } from '../../lib/types';

export class GeoService {
  static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  static haversineDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371;
    const dLat = this.toRadians(coord2.lat - coord1.lat);
    const dLng = this.toRadians(coord2.lng - coord1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(coord1.lat)) *
        Math.cos(this.toRadians(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  static async resolveLGA(coordinates: Coordinates): Promise<string> {
    try {
      const zones = await LGAZone.find({});
      
      if (zones.length === 0) {
        console.warn('[v0] No LGA zones found in database');
        return 'Unknown';
      }

      let nearestLGA = zones[0]._id;
      let minDistance = this.haversineDistance(coordinates, zones[0].centroid);

      for (const zone of zones) {
        const distance = this.haversineDistance(coordinates, zone.centroid);
        if (distance < minDistance) {
          minDistance = distance;
          nearestLGA = zone._id;
        }
      }

      return nearestLGA;
    } catch (error) {
      console.error('[v0] Error resolving LGA:', error);
      return 'Unknown';
    }
  }

  static async resolveLGAPair(
    pickup: Coordinates,
    dropoff: Coordinates
  ): Promise<{ pickupLGA: string; dropoffLGA: string; distance: number }> {
    const [pickupLGA, dropoffLGA] = await Promise.all([
      this.resolveLGA(pickup),
      this.resolveLGA(dropoff),
    ]);

    const distance = this.haversineDistance(pickup, dropoff);

    return { pickupLGA, dropoffLGA, distance };
  }
}
