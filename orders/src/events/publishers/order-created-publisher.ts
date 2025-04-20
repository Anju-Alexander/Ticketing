import { Publisher, OrderCreatedEvent, Subjects } from '@anju102/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
