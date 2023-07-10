import { ValidationError } from 'express-validation';
import logger from '../../middlewares/winston';

export function errorHandler(err, req, res, next) {
    
    // UNAUTHORIZED
    if (err && err.statusCode == 403) {
        return res.status(403).json({ message: 'UNAUTHORIZED' });
    }

    // validation error
    if (err instanceof ValidationError) {
        const body = err.details.body;
        if (body && body.length > 0) {
            return res.status(err.statusCode).json({ message: err.details.body?.at(0).message })
        }
        return res.status(err.statusCode).json({ message: err?.error || err })
    }
    // log error
    logger.error(err);

    // unknown exception
    return res.status(err.statusCode || 500).json({ message: err?.error || err?.message || err })
}