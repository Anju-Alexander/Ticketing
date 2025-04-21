import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@anju102/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
