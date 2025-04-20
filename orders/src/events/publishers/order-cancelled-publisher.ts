import { Subjects, Publisher, OrderCancelledEvent } from '@anju102/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
