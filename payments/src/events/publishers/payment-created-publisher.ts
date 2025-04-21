import { Subjects, Publisher, PaymentCreatedEvent } from '@anju102/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
