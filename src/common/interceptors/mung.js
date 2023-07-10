'use strict';
import mung from 'express-mung';

/**
 * mapping every response body to base response model
 * 
 * @param {Object} body response body
 * @param {Request} req request object
 * @param {Response} res response
 * @returns {Object} base response
 */
function transform(body, req, res) {
    const isSuccess = res.statusCode >= 200 && res.statusCode < 400;
    const response = {
        message: body?.message || (isSuccess ? 'Success' : 'an Error throwed'),
        statusCode: res.statusCode,
        success: isSuccess,
        data: isSuccess ? body : null,
        error: body?.error,
    };
    
    return response;
}

export default mung.json(transform, { mungError: true });