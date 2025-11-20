import mongoose from 'mongoose';
import { LogisticsPartner } from '../api/models/LogisticsPartner';

const SAMPLE_PARTNERS = [
  {
    name: 'FastRider Logistics',
    code: 'FSTR',
    contact: {
      phone: '+234-800-FAST-RIDE',
      email: 'dispatch@fastrider.ng',
    },
    coverage: [
      'Ikeja',
      'Surulere',
      'Lagos Island',
      'Yaba',
      'Apapa',
      'Mushin',
      'Oshodi-Isolo',
      'Lagos Mainland',
    ],
    rate_table: {
      within_lga: 1500,
      to_island: 2500,
      outskirts: 3500,
    },
    base_fee: 0,
    per_km: 150,
    status: 'active' as const,
    last_sync: new Date(),
    metadata: {
      source: 'partner_upload',
    },
  },
  {
    name: 'QuickMove Express',
    code: 'QMEX',
    contact: {
      phone: '+234-800-QUICK-GO',
      email: 'ops@quickmove.ng',
    },
    coverage: [
      'Ikeja',
      'Alimosho',
      'Agege',
      'Ifako-Ijaiye',
      'Kosofe',
      'Shomolu',
    ],
    rate_table: {
      within_lga: 1200,
      to_island: 2800,
      outskirts: 3800,
    },
    base_fee: 200,
    per_km: 100,
    status: 'active' as const,
    last_sync: new Date(),
    metadata: {
      source: 'partner_upload',
    },
  },
  {
    name: 'Island Express Delivery',
    code: 'IEXP',
    contact: {
      phone: '+234-800-ISLAND-X',
      email: 'support@islandexpress.ng',
    },
    coverage: [
      'Lagos Island',
      'Eti-Osa',
      'Ikoyi',
      'Victoria Island',
      'Lekki',
    ],
    rate_table: {
      within_lga: 1800,
      to_island: 2000,
      outskirts: 4500,
    },
    base_fee: 300,
    per_km: 200,
    status: 'active' as const,
    last_sync: new Date(),
    metadata: {
      source: 'partner_upload',
    },
  },
];

async function seedLogisticsPartners() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI not set');
    }

    await mongoose.connect(uri);
    console.log('[v0] Connected to MongoDB');

    await LogisticsPartner.deleteMany({});
    console.log('[v0] Cleared existing logistics partners');

    for (const partner of SAMPLE_PARTNERS) {
      await LogisticsPartner.create(partner);
      console.log(`[v0] Seeded ${partner.name}`);
    }

    console.log(`[v0] Successfully seeded ${SAMPLE_PARTNERS.length} logistics partners`);
    process.exit(0);
  } catch (error) {
    console.error('[v0] Error seeding logistics partners:', error);
    process.exit(1);
  }
}

seedLogisticsPartners();
