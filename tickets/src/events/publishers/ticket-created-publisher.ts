import { Publisher, Subjects, TicketCreatedEvent } from '@anju102/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
