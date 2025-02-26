import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js'; // ✅ Correct path
import htmlRoutes from './htmlRoutes.js'; // ✅ Correct path

router.use('/api', apiRoutes); // ✅ API must be first
router.use('/', htmlRoutes);   // ✅ Serve frontend HTML

export default router;
