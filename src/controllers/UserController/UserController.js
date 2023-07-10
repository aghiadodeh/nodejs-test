import express from "express";
import UserService from "../../services/UserService";

const router = express.Router();

router.get('', async (req, res, next) => {
    try {
        const data = await UserService.getUsers(req.query);
        return res.status(200).json(data);
    } catch (error) {
        return next({ error: error.message || error });
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const data = await UserService.getUser(req.params.id);
        return res.status(200).json(data);
    } catch (error) {
        return next({ error: error.message || error });
    }
});

router.delete('/:id', async (req, res, next) => {
    return res.status(200).json(null);
});
export default router;