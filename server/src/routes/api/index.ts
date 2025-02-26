import { Router } from 'express';
import weatherRoutes from './weatherRoutes.js'; // Correct path for weather routes

const router = Router();

// Register API routes
router.use('/weather', weatherRoutes);

export default router;
