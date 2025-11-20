import lgaZones from '@/data/lga-zones.json'
import logisticsRates from '@/data/logistics-rates.json'

export interface Location {
  lat: number
  lng: number
  lga?: string
}

export interface PricingEstimate {
  provider: string
  providerType: 'partner' | 'ride-hail'
  price: number
  estimatedTime: number
  reliability: number
  breakdown: {
    baseRate: number
    distanceFee: number
    platformFee: number
  }
}

// Haversine formula to calculate distance between two coordinates
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Find nearest LGA zone based on coordinates
function findNearestLGA(lat: number, lng: number): string {
  let nearest = 'Ikeja' // default
  let minDistance = Infinity

  Object.entries(lgaZones.zones).forEach(([name, zone]) => {
    const distance = haversineDistance(lat, lng, zone.centroid.lat, zone.centroid.lng)
    if (distance < minDistance) {
      minDistance = distance
      nearest = name
    }
  })

  return nearest
}

// Get rate between two LGAs
function getRate(origin: string, destination: string): number {
  const originZone = lgaZones.zones[origin as keyof typeof lgaZones.zones]
  const destZone = lgaZones.zones[destination as keyof typeof lgaZones.zones]

  // Same LGA
  if (origin === destination) {
    const rate = logisticsRates.rates.find(
      (r) => r.origin === origin && r.destination === destination
    )
    return rate?.within_lga || 1000
  }

  // Check if crossing to/from island
  const isOriginIsland = originZone?.type === 'island'
  const isDestIsland = destZone?.type === 'island'

  if (isOriginIsland && !isDestIsland) {
    const rate = logisticsRates.rates.find(
      (r) => r.origin === origin && r.destination === destination
    )
    return rate?.from_island || 3000
  }

  if (!isOriginIsland && isDestIsland) {
    const rate = logisticsRates.rates.find(
      (r) => r.origin === origin && r.destination === destination
    )
    return rate?.to_island || 3000
  }

  // Outskirts
  if (originZone?.type === 'outskirts' || destZone?.type === 'outskirts') {
    const rate = logisticsRates.rates.find(
      (r) => r.origin === 'Outskirts' && r.destination === destination
    )
    return rate?.outskirts || 5000
  }

  // Default inter-LGA
  const rate = logisticsRates.rates.find(
    (r) => r.origin === origin && r.destination === destination
  )
  return rate?.within_lga || 1500
}

// Mock ride-hail pricing (Uber/Bolt simulator)
function getRideHailEstimate(distance: number): PricingEstimate {
  const baseRate = 500
  const perKm = 200
  const price = baseRate + distance * perKm
  const platformFee = price * 0.15

  return {
    provider: 'RideHail (Uber/Bolt)',
    providerType: 'ride-hail',
    price: Math.round(price + platformFee),
    estimatedTime: Math.round(distance * 3 + 15), // 3 min per km + 15 min base
    reliability: 85,
    breakdown: {
      baseRate,
      distanceFee: Math.round(distance * perKm),
      platformFee: Math.round(platformFee),
    },
  }
}

export function estimateDeliveryPrice(
  pickup: Location,
  dropoff: Location
): PricingEstimate[] {
  // Determine LGAs
  const pickupLGA = pickup.lga || findNearestLGA(pickup.lat, pickup.lng)
  const dropoffLGA = dropoff.lga || findNearestLGA(dropoff.lat, dropoff.lng)

  // Calculate distance
  const distance = haversineDistance(pickup.lat, pickup.lng, dropoff.lat, dropoff.lng)

  // Get partner rate
  const partnerRate = getRate(pickupLGA, dropoffLGA)
  const platformFee = partnerRate * 0.12

  const partnerEstimate: PricingEstimate = {
    provider: logisticsRates.provider,
    providerType: 'partner',
    price: Math.round(partnerRate + platformFee),
    estimatedTime: Math.round(distance * 4 + 20), // 4 min per km + 20 min base
    reliability: 92,
    breakdown: {
      baseRate: partnerRate,
      distanceFee: 0,
      platformFee: Math.round(platformFee),
    },
  }

  const rideHailEstimate = getRideHailEstimate(distance)

  // Return sorted by price (cheapest first)
  return [partnerEstimate, rideHailEstimate].sort((a, b) => a.price - b.price).slice(0, 3)
}
