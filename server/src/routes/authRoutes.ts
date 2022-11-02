import express from 'express';
import controller from '../controllers/authControllers';

const router = express.Router();

router.get('/google', controller.handleLogin);
router.get('/google/callback', controller.handleCallback);
router.get('/logout', controller.handleLogout);
router.get('/failure', controller.handleFailure);
router.get('/user', controller.handleUser);

export default router;