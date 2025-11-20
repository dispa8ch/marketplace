// Brand colors and constants for Dispa8ch

export const BRAND_COLORS = {
  primary: '#E41F47',
  text: '#171717',
  secondaryText: '#757575',
  accentLight: '#FFEDF0',
  backgroundLight: '#FDFDFD',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const LAGOS_LGAS = [
  'Agege',
  'Ajeromi-Ifelodun',
  'Alimosho',
  'Amuwo-Odofin',
  'Apapa',
  'Badagry',
  'Epe',
  'Eti-Osa',
  'Ibeju-Lekki',
  'Ifako-Ijaiye',
  'Ikeja',
  'Ikorodu',
  'Kosofe',
  'Lagos Island',
  'Lagos Mainland',
  'Mushin',
  'Ojo',
  'Oshodi-Isolo',
  'Shomolu',
  'Surulere',
] as const;

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic listing', 'Up to 10 products'],
  },
  basic: {
    name: 'Basic',
    price: 5000,
    features: ['Standard listing', 'Up to 50 products', 'Analytics'],
  },
  premium: {
    name: 'Premium',
    price: 15000,
    features: ['Premium listing', 'Unlimited products', 'Advanced analytics', 'Priority support'],
  },
} as const;

export const API_ROUTES = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
  },
  products: '/api/products',
  vendors: '/api/vendors',
  orders: '/api/orders',
  pricing: '/api/pricing/estimate',
  payments: {
    initiate: '/api/payments/initiate',
    verify: '/api/payments/verify',
  },
  webhooks: {
    paystack: '/api/webhooks/paystack',
  },
} as const;
