import express from 'express';
import controller from '../controllers/googleControllers';

const router = express.Router();

router.get('/', controller.login);

export default router;