import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { myOrders } from '../controllers/order.controller.js';
const r = Router();
r.use(auth());
r.get('/', myOrders);
export default r;
