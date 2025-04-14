import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth, validateRequest } from '@anju102/common';
import { Ticket } from '../models/ticket';

const { body } = require('express-validator');


const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };

