import express from 'express';
import path from 'path';

const router = express.Router();

import spotsRoutes from './spots.routes';
import usersRoutes from './users.routes'


router.use('/uploads/images', express.static(path.join('uploads', 'images')));
router.use('/api/spots/', spotsRoutes);
router.use('/api/users/', usersRoutes);

export default router;

