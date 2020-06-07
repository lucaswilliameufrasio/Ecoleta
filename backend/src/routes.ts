import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import * as pointsValidation from './middlewares/validations/Points';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/points', pointsValidation.index, pointsController.index);
routes.get('/points/:id', pointsValidation.show, pointsController.show);

routes.post('/points', upload.single('image'), pointsValidation.create, pointsController.create);

export default routes;
