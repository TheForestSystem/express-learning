import { Request, Response, Router } from "express";
const router = Router();

// Define a route for the terms and conditions page
router.get("/terms", (req: Request, res: Response) => {
  res.send("Terms and conditions");
});

// Define a route for the privacy policy page
router.get("/privacy", (req: Request, res: Response) => {
  res.send("Privacy policy");
});

// Export the router
export default router;