'use strict'
import express from "express";
import AuthService from "../../services/AuthService";
import logger from "../../middlewares/winston";
const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const body = req.body;
        // validate request
        if (!body.email) {
            return res.status(400).json({ message: "email is required" });
        }
        if (!body.password) {
            return res.status(400).json({ message: "password is required" });
        }

        // check fake password
        const user = await AuthService.checkUser(body);
        const token = AuthService.generateToken(user);

        return res.status(200).json({token,user});
    } catch (error) {
        console.log(error);
        logger.error(error);
        return next({ error: error.message || error });
    }
});

export default router;