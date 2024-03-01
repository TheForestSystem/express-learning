import express, { Request, Response } from 'express';
import homeRoutes from './routes/HomeRoutes';
import legalRoutes from './routes/LegalRoutes';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use('/', homeRoutes);
app.use('/legal', legalRoutes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
