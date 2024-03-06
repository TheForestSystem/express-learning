import express, { Request, Response } from 'express';
import { hashPassword, verifyPassword } from '../auth/password';
import MascotManager from '../storage/managers/MascotManager';
import Mascot from '../storage/models/mascots';

import { globalDatabase } from '../storage/connect';

/**
 * Make a random email address for testing
 * @method makeEmail
 * @returns {string} - A random email address
 * @author ForestSystem
 */
function makeEmail(): string {
  const domains: String[] = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "aol.com"
  ];

  const randomString = Math.random().toString(36).substring(2, 15);
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${randomString}@${randomDomain}`;
}

/**
 * Update the birth year of a mascot
 * @async
 * @method updateMascotYear
 * @param {Mascot} mascot - The mascot to update
 * @param {number} year - The new birth year
 * @returns {Promise<Mascot>} - The updated mascot
 * @throws {Error} - Throws an error if the database is not available
 */
async function updateMascotYear(mascot: Mascot, year: number): Promise<Mascot> {
  if (!globalDatabase) {
    throw new Error('Database not available');
  } 
  const mascotManager = new MascotManager(globalDatabase);

  try {
    mascot.birth_year = year;
    return await mascotManager.update(mascot);
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
}

const router = express.Router();

// Define a route for the debug page
router.get('/password', async (req: Request, res: Response) => {
  const password = req.query.password as string || "password";

  const hashedPassword = await hashPassword(password);
  const isMatch = await verifyPassword(password, hashedPassword);
  res.json({
    "password": password,
    "hashedPassword": hashedPassword,
    "isMatch": isMatch
  })
});

router.get('/make-email/', (req: Request, res: Response) => {
  res.json({
    "email": makeEmail()
  });
});

router.get('/make-email/:count', (req: Request, res: Response) => {
  const count = parseInt(req.params.count, 10);
  const emails = Array(count).fill(0).map(makeEmail);
  res.json({
    "emails": emails
  });
});


router.get('/update-mascot-year/:id/:year', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const year = parseInt(req.params.year, 10);
  if (isNaN(id) || isNaN(year)) {
    res.status(400).json({ "error": "Invalid ID or year" });
    return;
  }
  if (!globalDatabase) {
    throw new Error('Database not available');
  } 
  const mascotManager = new MascotManager(globalDatabase);

  try {
    const mascot = await mascotManager.getById(id);
    if (!mascot) {
      res.status(404).json({ "error": "Mascot not found" });
      return;
    }
    const updatedMascot = await updateMascotYear(mascot, year);
    res.json(updatedMascot);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});



export default router;