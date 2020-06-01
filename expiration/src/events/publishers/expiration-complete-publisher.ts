import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@bmtickets/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
