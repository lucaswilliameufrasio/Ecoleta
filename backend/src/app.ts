import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const pathToUploadFolder = path.resolve(__dirname, '..', 'uploads');

app.use('/uploads', express.static(pathToUploadFolder));

export default app;
