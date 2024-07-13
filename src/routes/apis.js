'use strict';
import express from 'express';
import shopController from '../controllers/ShopController/ShopController';
import userController from '../controllers/UserController/UserController';
import authController from '../controllers/AuthController/AuthController';

const router = express.Router();

router.use('/authentication', authController);
router.use('/users', userController);
router.use('/shop', shopController);

export default router;