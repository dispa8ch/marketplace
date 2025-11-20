import mongoose from 'mongoose';
import { LGAZone } from '../api/models/LGAZone';

const LAGOS_LGA_CENTROIDS = [
  { name: 'Agege', lat: 6.6176, lng: 3.3198 },
  { name: 'Ajeromi-Ifelodun', lat: 6.4622, lng: 3.3301 },
  { name: 'Alimosho', lat: 6.5889, lng: 3.2646 },
  { name: 'Amuwo-Odofin', lat: 6.4623, lng: 3.2967 },
  { name: 'Apapa', lat: 6.4489, lng: 3.3592 },
  { name: 'Badagry', lat: 6.4211, lng: 2.8777 },
  { name: 'Epe', lat: 6.5833, lng: 3.9833 },
  { name: 'Eti-Osa', lat: 6.4550, lng: 3.6010 },
  { name: 'Ibeju-Lekki', lat: 6.4333, lng: 3.8667 },
  { name: 'Ifako-Ijaiye', lat: 6.6761, lng: 3.2643 },
  { name: 'Ikeja', lat: 6.5955, lng: 3.3364 },
  { name: 'Ikorodu', lat: 6.6193, lng: 3.5112 },
  { name: 'Kosofe', lat: 6.5833, lng: 3.4000 },
  { name: 'Lagos Island', lat: 6.4541, lng: 3.3947 },
  { name: 'Lagos Mainland', lat: 6.5104, lng: 3.3711 },
  { name: 'Mushin', lat: 6.5294, lng: 3.3446 },
  { name: 'Ojo', lat: 6.4583, lng: 3.1583 },
  { name: 'Oshodi-Isolo', lat: 6.5244, lng: 3.3194 },
  { name: 'Shomolu', lat: 6.5389, lng: 3.3844 },
  { name: 'Surulere', lat: 6.4969, lng: 3.3611 },
];

async function seedLGAZones() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI not set');
    }

    await mongoose.connect(uri);
    console.log('[v0] Connected to MongoDB');

    await LGAZone.deleteMany({});
    console.log('[v0] Cleared existing LGA zones');

    for (const lga of LAGOS_LGA_CENTROIDS) {
      await LGAZone.create({
        _id: lga.name,
        type: 'LGA',
        centroid: {
          lat: lga.lat,
          lng: lga.lng,
        },
      });
      console.log(`[v0] Seeded ${lga.name}`);
    }

    console.log(`[v0] Successfully seeded ${LAGOS_LGA_CENTROIDS.length} LGA zones`);
    process.exit(0);
  } catch (error) {
    console.error('[v0] Error seeding LGA zones:', error);
    process.exit(1);
  }
}

seedLGAZones();
