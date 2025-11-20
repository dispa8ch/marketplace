import { Coordinates } from '../../lib/types';
import { RideHailQuote } from '../models/RideHailQuote';
import { GeoService } from './geo-service';

interface RideHailQuoteResult {
  provider: 'uber' | 'bolt';
  distance_km: number;
  eta: number;
  price_estimate: number;
}

export class RideHailAdapter {
  private static BASE_RATE = 500;
  private static PER_KM_RATE = 250;
  private static MIN_FARE = 1200;

  static async getQuote(
    pickup: Coordinates,
    dropoff: Coordinates
  ): Promise<RideHailQuoteResult> {
    const cacheKey = `${pickup.lat},${pickup.lng}-${dropoff.lat},${dropoff.lng}`;
    
    const cached = await RideHailQuote.findOne({
      from: cacheKey.split('-')[0],
      to: cacheKey.split('-')[1],
      fetched_at: { $gte: new Date(Date.now() - 120000) },
    }).sort({ fetched_at: -1 });

    if (cached) {
      console.log('[v0] Using cached ride-hail quote');
      return {
        provider: cached.provider,
        distance_km: cached.distance_km,
        eta: cached.eta,
        price_estimate: cached.price_estimate,
      };
    }

    const distance_km = GeoService.haversineDistance(pickup, dropoff);
    
    const price_estimate = Math.max(
      this.MIN_FARE,
      this.BASE_RATE + distance_km * this.PER_KM_RATE
    );

    const eta = Math.ceil(distance_km / 0.5) + 10;

    const quote = new RideHailQuote({
      provider: 'uber',
      from: `${pickup.lat},${pickup.lng}`,
      to: `${dropoff.lat},${dropoff.lng}`,
      distance_km: Number(distance_km.toFixed(2)),
      eta,
      price_estimate: Math.round(price_estimate),
      fetched_at: new Date(),
    });

    await quote.save();

    return {
      provider: 'uber',
      distance_km: Number(distance_km.toFixed(2)),
      eta,
      price_estimate: Math.round(price_estimate),
    };
  }
}
