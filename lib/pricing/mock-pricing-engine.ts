import logisticsSeed from '@/data/seed/logistics-seed.json'

interface PricingResult {
  provider: string
  price: number
  estimated_time: string
  reliability_score: number
}

// Haversine formula to calculate distance between two coordinates
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Earth's radius in kilometers
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

export function calculateDeliveryPricing(
  originLGA: string,
  destinationLGA: string
): PricingResult[] {
  const { lga_zones, rates, providers } = logisticsSeed

  // Find origin and destination zone info
  const originZone = lga_zones[originLGA as keyof typeof lga_zones]
  const destinationZone = lga_zones[destinationLGA as keyof typeof lga_zones]

  if (!originZone || !destinationZone) {
    return []
  }

  // Calculate distance between LGAs
  const distance = haversineDistance(
    originZone.coordinates.lat,
    originZone.coordinates.lng,
    destinationZone.coordinates.lat,
    destinationZone.coordinates.lng
  )

  // Find matching rate
  const matchingRate = rates.find(
    (rate) =>
      rate.origin_lga === originLGA && rate.destination_lga === destinationLGA
  )

  if (!matchingRate) {
    // If no exact match, use zone-based pricing
    const provider = providers[0]
    let basePrice = 2000

    if (originZone.type === 'outskirts' || destinationZone.type === 'outskirts') {
      basePrice = 4500
    } else if (originZone.type === 'island' && destinationZone.type === 'island') {
      basePrice = 1500
    } else if (originZone.type !== destinationZone.type) {
      basePrice = 2500
    }

    // Add distance factor (₦100 per km)
    const distanceFee = Math.floor(distance * 100)
    const totalPrice = basePrice + distanceFee

    return [
      {
        provider: provider.name,
        price: totalPrice,
        estimated_time: distance < 10 ? '30-45 mins' : '1-2 hours',
        reliability_score: provider.reliability_score,
      },
    ]
  }

  // Determine which rate to use based on zone types
  let price = matchingRate.within_lga_rate

  if (originZone.type === 'outskirts' || destinationZone.type === 'outskirts') {
    price = matchingRate.outskirts_rate
  } else if (originZone.type === 'mainland' && destinationZone.type === 'island') {
    price = matchingRate.to_island_rate
  } else if (originZone.type === 'island' && destinationZone.type === 'mainland') {
    price = matchingRate.from_island_rate
  }

  const estimatedTime = distance < 5 ? '20-30 mins' : distance < 15 ? '45 mins - 1 hour' : '1-2 hours'

  return [
    {
      provider: matchingRate.provider_name,
      price: price,
      estimated_time: estimatedTime,
      reliability_score: providers[0].reliability_score,
    },
  ]
}

export function getLGAList(): string[] {
  return Object.keys(logisticsSeed.lga_zones)
}
