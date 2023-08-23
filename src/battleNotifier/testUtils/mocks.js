import { vi } from 'vitest';

export const mockStore = userConfigs => {
  return {
    get: vi.fn(userId => Promise.resolve(userConfigs[userId])),
    set: vi.fn(() => Promise.resolve()),
    getAllActive: vi.fn(() =>
      Promise.resolve(
        Object.entries(userConfigs).map(([userId, config]) => ({
          ...config,
          userId: userId + '',
        })),
      ),
    ),
    toggleIsOn: vi.fn(() => Promise.resolve()),
    isUserLinked: vi.fn(() => Promise.resolve()),
  };
};

export const mockServerApi = () => {
  return {
    get: vi.fn(() => Promise.resolve()),
    post: vi.fn(() => Promise.resolve()),
  };
};

export const mockMessage = ({ author, channel, content }) => {
  return {
    content,
    author,
    send: vi.fn(() => Promise.resolve({ channel })),
    react: vi.fn(() => Promise.resolve()),
  };
};

export const mockSendMessage = () =>
  vi.fn(message => Promise.resolve(mockMessage({ content: message })));

export const mockUser = (id, username = 'RandomUser') => {
  return { id, username, send: mockSendMessage() };
};

export const mockChannel = ({ userReply }) => {
  return {
    readUserMessage: vi.fn(() => Promise.resolve(userReply)),
    send: mockSendMessage(),
  };
};

export const mockBattle = ({
  battleType = '',
  designer = '',
  level = '',
  durationMinutes = 0,
  ...attrs
}) => {
  return { battleType, designer, level, durationMinutes, ...attrs };
};
