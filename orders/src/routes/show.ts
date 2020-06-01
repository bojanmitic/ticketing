import express, { Response, Request } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@bmtickets/common';
import { Order } from '../models/order';
import { body } from 'express-validator';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  body('orderId')
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('Invalid Order'),
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.status(200).send(order);
  }
);

export { router as showOrderRouter };
