import express, { Request, Response, NextFunction } from 'express';

/**
 * A middleware class for logging requests and responses.
 */
export default class LoggingMiddleware {
    static logRequest(req: Request, res: Response, next: NextFunction) {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        if (req.body) {
            console.log('Request Body:', req.body);
        }
        res.on('finish', () => {
            console.log(`[${new Date().toISOString()}] Response Status Code: ${res.statusCode}`);
        });
        next();
    }
}