import { LogisticsPartner } from '../models/LogisticsPartner';
import { DeliveryEstimate, PricingEstimateRequest } from '../../lib/types';
import { GeoService } from './geo-service';
import { RideHailAdapter } from './ride-hail-adapter';

export class PricingEngine {
  private static ISLAND_LGAS = ['Lagos Island', 'Eti-Osa', 'Ikoyi', 'Victoria Island'];
  private static OUTSKIRT_LGAS = ['Badagry', 'Epe', 'Ibeju-Lekki', 'Ikorodu'];
  private static PLATFORM_COMMISSION = 0.05;

  static determineRouteType(pickupLGA: string, dropoffLGA: string): 'within_lga' | 'to_island' | 'outskirts' {
    if (pickupLGA === dropoffLGA) {
      return 'within_lga';
    }

    if (
      this.ISLAND_LGAS.includes(pickupLGA) ||
      this.ISLAND_LGAS.includes(dropoffLGA)
    ) {
      return 'to_island';
    }

    if (
      this.OUTSKIRT_LGAS.includes(pickupLGA) ||
      this.OUTSKIRT_LGAS.includes(dropoffLGA)
    ) {
      return 'outskirts';
    }

    return 'within_lga';
  }

  static async getPartnerEstimates(
    pickupLGA: string,
    dropoffLGA: string,
    distance: number
  ): Promise<DeliveryEstimate[]> {
    const partners = await LogisticsPartner.find({
      status: 'active',
      $or: [
        { coverage: pickupLGA },
        { coverage: dropoffLGA },
        { coverage: { $size: 0 } },
      ],
    });

    const estimates: DeliveryEstimate[] = [];

    for (const partner of partners) {
      if (
        partner.coverage.length > 0 &&
        !partner.coverage.includes(pickupLGA) &&
        !partner.coverage.includes(dropoffLGA)
      ) {
        continue;
      }

      const routeType = this.determineRouteType(pickupLGA, dropoffLGA);
      let basePrice = partner.rate_table[routeType];

      if (partner.per_km > 0) {
        basePrice += distance * partner.per_km;
      }

      const finalPrice = Math.round(
        basePrice + partner.base_fee + basePrice * this.PLATFORM_COMMISSION
      );

      const eta = Math.ceil(distance / 0.4) + 15;

      const reliabilityScore = 0.85 + Math.random() * 0.1;

      estimates.push({
        provider_id: partner._id.toString(),
        provider_type: 'partner',
        provider_name: partner.name,
        price: finalPrice,
        eta_minutes: eta,
        reliability_score: Number(reliabilityScore.toFixed(2)),
        breakdown: {
          base_fee: partner.base_fee,
          distance_fee: Math.round(distance * partner.per_km),
          zone_fee: partner.rate_table[routeType],
        },
      });
    }

    return estimates;
  }

  static async getRideHailEstimate(
    pickup: any,
    dropoff: any,
    distance: number
  ): Promise<DeliveryEstimate> {
    const quote = await RideHailAdapter.getQuote(pickup, dropoff);

    const finalPrice = Math.round(
      quote.price_estimate + quote.price_estimate * this.PLATFORM_COMMISSION
    );

    return {
      provider_id: 'uber',
      provider_type: 'ride_hail',
      provider_name: 'Uber',
      price: finalPrice,
      eta_minutes: quote.eta,
      reliability_score: 0.90,
      breakdown: {
        base_fee: 500,
        distance_fee: Math.round(distance * 250),
        zone_fee: 0,
      },
    };
  }

  static async estimate(request: PricingEstimateRequest): Promise<DeliveryEstimate[]> {
    const { pickup, dropoff, prefer = 'cheapest' } = request;

    const { pickupLGA, dropoffLGA, distance } = await GeoService.resolveLGAPair(
      pickup,
      dropoff
    );

    console.log(`[v0] Pricing estimate: ${pickupLGA} -> ${dropoffLGA} (${distance.toFixed(2)}km)`);

    const [partnerEstimates, rideHailEstimate] = await Promise.all([
      this.getPartnerEstimates(pickupLGA, dropoffLGA, distance),
      this.getRideHailEstimate(pickup, dropoff, distance),
    ]);

    const allEstimates = [...partnerEstimates, rideHailEstimate];

    if (prefer === 'cheapest') {
      allEstimates.sort((a, b) => {
        if (a.price !== b.price) return a.price - b.price;
        if (a.reliability_score !== b.reliability_score) {
          return b.reliability_score - a.reliability_score;
        }
        return a.eta_minutes - b.eta_minutes;
      });
    } else {
      allEstimates.sort((a, b) => {
        if (a.eta_minutes !== b.eta_minutes) return a.eta_minutes - b.eta_minutes;
        if (a.reliability_score !== b.reliability_score) {
          return b.reliability_score - a.reliability_score;
        }
        return a.price - b.price;
      });
    }

    return allEstimates.slice(0, 3);
  }
}
