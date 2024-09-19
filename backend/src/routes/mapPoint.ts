// routes/mapPoint.ts

import { Router } from 'express';
import { deleteMapPoint, getMapPoint, getMapPoints, postMapPoint, updateMapPoint } from '../controllers/mapPoint';

const router = Router();

router.get('/', getMapPoints);
router.get('/:id', getMapPoint);
router.post('/', postMapPoint);
router.put('/:id', updateMapPoint);
router.delete('/:id', deleteMapPoint);

export default router;
