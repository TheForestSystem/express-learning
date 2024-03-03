import express, { Request, Response } from 'express';

const router = express.Router();

// Define a route for the login page
router.get('/login', (req: Request, res: Response) => {
  res.render('pages/auth/login');
});

export default router;