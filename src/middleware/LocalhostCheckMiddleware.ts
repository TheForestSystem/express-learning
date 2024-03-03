import { Request, Response, NextFunction } from 'express';

/**
 * A middleware class for checking if the request is coming from localhost or an internal network.
 */
export default class LocalhostCheckMiddleware {
    static allowedIps: string[] = [
        '192.168.100.',
        '::1'
    ];

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
