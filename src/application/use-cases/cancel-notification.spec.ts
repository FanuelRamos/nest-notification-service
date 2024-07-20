import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Cancel notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'socila',
      content: new Content('New friends request!'),
      recipientId: 'example-recipient-id'
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    await expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id'
      });
    }).rejects.toThrow(NotificationNotFound)
  });
});