// Core type definitions for Dispa8ch Marketplace

export type UserRole = 'customer' | 'vendor' | 'admin';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  street: string;
  lga: string;
  state: string;
  coordinates: Coordinates;
}

export interface Vendor {
  _id: string;
  ownerId: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  address: Address;
  logo?: string;
  subscriptionPlan: 'free' | 'basic' | 'premium';
  subscriptionExpiry: Date;
  products: string[];
  ratings: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  customerId: string;
  vendorId: string;
  products: OrderItem[];
  total: number;
  deliveryFee: number;
  deliveryPartnerId?: string;
  status: 'pending' | 'paid' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  address: Address;
  paystackReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RateTable {
  within_lga: number;
  to_island: number;
  outskirts: number;
}

export interface LogisticsPartner {
  _id: string;
  name: string;
  code: string;
  contact: {
    phone: string;
    email: string;
  };
  coverage: string[];
  rate_table: RateTable;
  base_fee: number;
  per_km: number;
  last_sync: Date;
  status: 'active' | 'inactive';
  metadata?: {
    source: string;
  };
}

export interface LGAZone {
  _id: string;
  type: 'LGA';
  centroid: Coordinates;
  polygon?: any;
}

export interface RideHailQuote {
  _id: string;
  provider: 'uber' | 'bolt';
  from: string;
  to: string;
  distance_km: number;
  eta: number;
  price_estimate: number;
  fetched_at: Date;
}

export interface DeliveryEstimate {
  provider_id: string;
  provider_type: 'partner' | 'ride_hail';
  provider_name: string;
  price: number;
  eta_minutes: number;
  reliability_score: number;
  breakdown: {
    base_fee: number;
    distance_fee: number;
    zone_fee: number;
  };
}

export interface OrderDelivery {
  _id: string;
  order_id: string;
  chosen_provider: string;
  provider_type: 'partner' | 'ride_hail';
  price: number;
  estimated_time: number;
  status: 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
  tracking_url?: string;
  provider_reference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PricingEstimateRequest {
  pickup: Coordinates;
  dropoff: Coordinates;
  package: {
    weight: number;
    volume: number;
  };
  prefer?: 'cheapest' | 'fastest';
}
