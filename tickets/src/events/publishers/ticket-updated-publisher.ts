import { Publisher, Subjects, TicketUpdatedEvent } from '@anju102/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
