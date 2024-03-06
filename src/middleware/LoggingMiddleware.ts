import express, { Request, Response, NextFunction } from 'express';

/**
 * A middleware class for logging requests and responses.
 */
export default class LoggingMiddleware {
    /**
     * Log the request and response
     * @method logRequest
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - The next function
     * @returns {void}
     * @author ForestSystem
     */
    static logRequest(req: Request, res: Response, next: NextFunction) {
        console.log(`--- Logging Request ---`)
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        console.log(`[${new Date().toISOString()}] Request IP: ${req.ip}`);
        (req.body) ? console.log(`[${new Date().toISOString()}] Request Body: ${JSON.stringify(req.body)}`) : null;
        res.on('finish', () => {
            console.log(`[${new Date().toISOString()}] Response Status Code: ${res.statusCode}`);
            console.log(`--- End Logging Request ---`)
        });
        next();
    }
}