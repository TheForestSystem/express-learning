// ./src/routes/HomeRoutes.ts

import express, { Request, Response } from 'express';
import Mascot from '../storage/models/mascots';
import MascotManager from '../storage/managers/MascotManager';

import { globalDatabase } from '../middleware/DBConfigMiddleware';

// Define tagline
const tagline: string = 'No programming concept is complete without a cute animal mascot.';

if (!globalDatabase) {
  throw new Error('Database not available');
} 
const mascotManager = new MascotManager(globalDatabase);


// Create a new instance of MascotManager with the database instance c

// Define an asynchronous function to retrieve mascots
async function getMascots(): Promise<Mascot[]> {
  try {
    return await mascotManager.getAllMascots(); // Await the result of getAllMascots
  } catch (error) {
    console.error('Error occurred:', error);
    return []; // Return empty array in case of error
  }
}

async function addMascot(mascot: Mascot): Promise<Mascot> {
  try {
    // Ensure that the property name matches the database column name ("birthYear")
    return await mascotManager.addMascot({
      name: mascot.name,
      organization: mascot.organization,
      birth_year: mascot.birth_year
    });
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
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

router.get('/add', (req: Request, res: Response) => {
  res.render('pages/add');
});

router.post('/add', async (req: Request, res: Response) => {

  const mascot: Mascot = {
    name: req.body.name,
    organization: req.body.organization,
    birth_year: parseInt(req.body.birthYear, 10),
  }
  try {
    await addMascot(mascot);
    res.redirect('/');
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route for the about page
router.get('/about', (req: Request, res: Response) => {
  res.render('pages/about');
});

// Export the router
export default router;
