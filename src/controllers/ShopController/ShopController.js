import express from "express";
import shopService from "../../services/ShopService";
const router = express.Router();

router.get('/products', async (req, res, next) => {
    try {
        const data = await shopService.getProducts(req.query);
        return res.status(200).json(data);
    } catch (error) {
        return next({ error: error.message || error });
    }
});

router.get('/products/categories', async (req, res, next) => {
    try {
        const data = await shopService.getCategories(req.query);
        return res.status(200).json(data);
    } catch (error) {
        return next({ error: error.message || error });
    }
});

router.get('/products/brands', async (req, res, next) => {
    try {
        const data = await shopService.getBrands();
        return res.status(200).json(data);
    } catch (error) {
        return next({ error: error.message || error });
    }
});

router.get('/products/category/:category', async (req, res, next) => {
    try {
        const data = await shopService.getCategoryProducts(req.params.category, req.query);
        return res.status(200).json(data);
    } catch (error) {
        return next({ error: error.message || error });
    }
});

export default router;