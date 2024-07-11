import { Router } from 'express';
import errorHandler from '../middlewares/errorHandler.js';

const router = Router();

router.use((req, res, next) => {
  const err = new Error(`Request Not Found. ( ${req.originalUrl} )`);
  err.status = 404;
  err.name = 'ReqNotFound';
  next(err);
});

router.use(errorHandler);
export default router;
