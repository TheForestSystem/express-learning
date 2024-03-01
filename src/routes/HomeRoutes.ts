// routes/homeRoutes.ts
import { Request, Response, Router } from 'express';
const router = Router();

// Define a route for the homepage
router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Define a route for the about page
router.get('/about', (req: Request, res: Response) => {
  res.send('About page');
});

// Export the router
export default router;
