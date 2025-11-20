import express from 'express';
import { Vendor } from '../models/Vendor';
import { AppError } from '../middleware/error-handler';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { lga, limit = 20, skip = 0 } = req.query;

    const query: any = { verified: true };
    if (lga) query['address.lga'] = lga;

    const vendors = await Vendor.find(query)
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ ratings: -1 });

    const total = await Vendor.countDocuments(query);

    res.json({ vendors, total });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      throw new AppError('Vendor not found', 404);
    }
    res.json(vendor);
  } catch (error) {
    next(error);
  }
});

router.get('/nearby', async (req, res, next) => {
  try {
    const { lat, lng, maxDistance = 5000 } = req.query;

    if (!lat || !lng) {
      throw new AppError('Latitude and longitude required', 400);
    }

    const vendors = await Vendor.find({
      verified: true,
      'address.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(lng), Number(lat)],
          },
          $maxDistance: Number(maxDistance),
        },
      },
    });

    res.json({ vendors });
  } catch (error) {
    next(error);
  }
});

export default router;
