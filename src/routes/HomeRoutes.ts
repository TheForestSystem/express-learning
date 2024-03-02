import express, { Request, Response } from 'express';
import Mascot from '../storage/models/mascots';
import Database from '../storage/DBAL';
import MascotManager from '../storage/managers/MascotManager';
import DatabaseConfig from '../storage/DatabaseConfig';

// Define tagline
const tagline: string = 'No programming concept is complete without a cute animal mascot.';

const config: DatabaseConfig = {
  user: 'express',
  host: 'localhost',
  database: 'express',
  password: 'express',
  port: 5432,
};

const db = new Database(config);
const mascotManager = new MascotManager(db);

// Define an asynchronous function to retrieve mascots
async function getMascots(): Promise<Mascot[]> {
  try {
    return await mascotManager.getAllMascots(); // Await the result of getAllMascots
  } catch (error) {
    console.error('Error occurred:', error);
    return []; // Return empty array in case of error
  }
}

// Create a router
const router = express.Router();

// Define a route for the homepage
router.get('/', async (req: Request, res: Response) => {
  try {
    const mascots = await getMascots(); // Await the result of getMascots
    res.render('pages/index', { mascots, tagline }); // Pass mascots to the template
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error'); // Handle errors
  }
});

// Define a route for the about page
router.get('/about', (req: Request, res: Response) => {
  res.render('pages/about');
});

// Export the router
export default router;
