import { PricingEngine } from '../../api/services/pricing-engine';
import { GeoService } from '../../api/services/geo-service';

describe('PricingEngine', () => {
  describe('determineRouteType', () => {
    it('should return within_lga for same LGA', () => {
      const result = PricingEngine.determineRouteType('Ikeja', 'Ikeja');
      expect(result).toBe('within_lga');
    });

    it('should return to_island for island destinations', () => {
      const result = PricingEngine.determineRouteType('Ikeja', 'Lagos Island');
      expect(result).toBe('to_island');
    });

    it('should return outskirts for outskirt destinations', () => {
      const result = PricingEngine.determineRouteType('Ikeja', 'Badagry');
      expect(result).toBe('outskirts');
    });
  });
});

describe('GeoService', () => {
  describe('haversineDistance', () => {
    it('should calculate distance between two coordinates', () => {
      const coord1 = { lat: 6.5955, lng: 3.3364 };
      const coord2 = { lat: 6.4541, lng: 3.3947 };
      const distance = GeoService.haversineDistance(coord1, coord2);
      expect(distance).toBeGreaterThan(15);
      expect(distance).toBeLessThan(20);
    });

    it('should return 0 for same coordinates', () => {
      const coord = { lat: 6.5955, lng: 3.3364 };
      const distance = GeoService.haversineDistance(coord, coord);
      expect(distance).toBe(0);
    });
  });
});
