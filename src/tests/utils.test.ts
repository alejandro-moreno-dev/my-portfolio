import { describe, it, expect } from 'vitest';
import { formatDate } from '../utils/formatDate';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const result = formatDate(new Date('2020-01-01'));
    expect(result).toBe('2020-01-01');
  });
});
