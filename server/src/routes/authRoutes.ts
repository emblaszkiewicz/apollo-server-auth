import express from 'express';
import controller from '../controllers/authControllers';

const router = express.Router();

router.get('/google', controller.login);
router.get('/google/callback', controller.callback);
router.get('/logout', controller.logout);

export default router;