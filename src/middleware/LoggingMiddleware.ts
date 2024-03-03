import express, { Request, Response, NextFunction } from 'express';

/**
 * A middleware class for logging requests and responses.
 */
export default class LoggingMiddleware {
    static logRequest(req: Request, res: Response, next: NextFunction) {
        console.log(`--- Logging Request ---`)
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        console.log(`[${new Date().toISOString()}] Request Body: ${JSON.stringify(req.body)}`);
        res.on('finish', () => {
            console.log(`[${new Date().toISOString()}] Response Status Code: ${res.statusCode}`);
            console.log(`--- End Logging Request ---`)
        });
        next();
    }
}