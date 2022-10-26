import express from 'express';
import controller from '../controllers/userControllers';
import { isLoggedIn } from '../utils/isLoggedIn';

const router = express.Router();

router.get('/logged', controller.logged);
router.get('/no-permission', isLoggedIn, controller.permission);

export default router;