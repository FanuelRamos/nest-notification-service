import { Content } from "./content";

describe('Notification content', () => {
  it('Should be able to create a notification content', () => {
    const content = new Content('You have a new friend request');

    expect(content).toBeTruthy()
  });

  it('Should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow()
  });

  it('Should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow()
  });
});