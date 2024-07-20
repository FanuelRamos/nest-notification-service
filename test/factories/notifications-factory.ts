import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from "@application/entities/notification";

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'socila',
    content: new Content('New friends request!'),
    recipientId: 'recipient-1',
    ...override,
  });
}