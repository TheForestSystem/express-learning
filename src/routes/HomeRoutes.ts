import express, { Request, Response } from 'express';

// Define an interface for mascots
interface Mascot {
  name: string;
  organization: string;
  birthYear: number;
}

// Define data for mascots
const mascots: Mascot[] = [
  { name: 'Sammy', organization: 'DigitalOcean', birthYear: 2012 },
  { name: 'Tux', organization: 'Linux', birthYear: 1996 },
  { name: 'Moby Dock', organization: 'Docker', birthYear: 2013 }
];

// Define tagline
const tagline: string = 'No programming concept is complete without a cute animal mascot.';

// Create a router
const router = express.Router();

// Define a route for the homepage
router.get('/', (req: Request, res: Response) => {
  res.render('pages/index', { mascots, tagline });
});

// Define a route for the about page
router.get('/about', (req: Request, res: Response) => {
  res.render('pages/about');
});

// Export the router
export default router;
