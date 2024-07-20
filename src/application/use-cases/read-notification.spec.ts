import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";

describe('Read notification', () => {
  it('Should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = new Notification({
      category: 'socila',
      content: new Content('New friends request!'),
      recipientId: 'example-recipient-id'
    });

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    await expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id'
      });
    }).rejects.toThrow(NotificationNotFound)
  });
});