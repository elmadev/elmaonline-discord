import { expect } from 'vitest';

export const firstResult = mockFn => mockFn.mock.results[0].value;

export const expectAsyncResult = async (mockFn, expected) => {
  const actual = firstResult(mockFn);
  await expect(actual).toEqual(expected);
};

export const expectAsyncResultProperty = async (mockFn, property, expected) => {
  const actual = firstResult(mockFn);
  await expect(actual).toHaveProperty(property, expected);
};
