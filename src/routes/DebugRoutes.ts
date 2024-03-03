import express, { Request, Response } from 'express';
import { hashPassword, verifyPassword } from '../auth/password';

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



export default router;