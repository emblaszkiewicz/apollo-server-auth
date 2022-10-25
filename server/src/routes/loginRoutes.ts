import express from 'express';
import controller from '../controllers/loginControllers';

const router = express.Router();

router.get('/', controller.home);

export default router;