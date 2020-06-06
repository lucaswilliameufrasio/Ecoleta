import * as dotenv from 'dotenv';
import * as paths from 'path';

dotenv.config({ path: paths.resolve(__dirname, '..', '.env') });

import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const pathToUploadFolder = path.resolve(__dirname, '..', 'uploads');

app.use('/uploads', express.static(pathToUploadFolder));

app.use(errors());

export default app;
