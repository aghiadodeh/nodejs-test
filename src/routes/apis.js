'use strict';
import express from 'express';
import shopController from '../controllers/ShopController/ShopController';
import userController from '../controllers/UserController/UserController';

const router = express.Router();

router.use('/users', userController);
router.use('/shop', shopController);

export default router;