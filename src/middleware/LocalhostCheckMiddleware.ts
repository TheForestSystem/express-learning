import { Request, Response, NextFunction } from 'express';

/**
 * A middleware class for checking if the request is coming from localhost or an internal network.
 */
export default class LocalhostCheckMiddleware {
    static allowedIps: string[] = [
        '192.168.100.',
        '::1'
    ];

    /**
     * Check if the request is coming from localhost or an internal network
     * @method checkLocalhost
     * @param {Request} req - The request object
     * @param {Response} res - The response object
     * @param {NextFunction} next - The next function
     * @returns {void}
     * @author ForestSystem
     */
    static checkLocalhost(req: Request, res: Response, next: NextFunction) {
        const ip = req.ip ?? ''; // Provide a default value if req.ip is undefined
        // Check if the request is coming from a value in the allowedIps array (checking for wildcard *)
        const isLocalhost = LocalhostCheckMiddleware.allowedIps.some((allowedIp) => {
            const regex = new RegExp(allowedIp.replace(/\./g, '\\.').replace(/\*/g, '.*'));
            return regex.test(ip);
        });
        if (!isLocalhost) {
            return res.status(403).send('Forbidden');
        }
        next();
    }
}
