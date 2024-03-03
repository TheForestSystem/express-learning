import express, { Request, Response } from 'express';

import homeRoutes from './routes/HomeRoutes';
import legalRoutes from './routes/LegalRoutes';
import authRoutes from './routes/AuthRoutes';
import debugRoutes from './routes/DebugRoutes';

import LoggingMiddleware from './middleware/LoggingMiddleware';
import LocalhostCheckMiddleware from './middleware/LocalhostCheckMiddleware';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.set('view engine', 'ejs');

app.use(LoggingMiddleware.logRequest);

app.use('/', homeRoutes);
app.use('/legal', legalRoutes);
app.use('/auth', authRoutes);

// Apply LocalhostCheckMiddleware only to the /debug route
app.use('/debug', LocalhostCheckMiddleware.checkLocalhost, debugRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
