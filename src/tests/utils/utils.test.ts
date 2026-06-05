import { describe, expect, test } from 'vitest';

import {
  capitalizeWords,
  generatePathUrl,
  isSpanish,
  parseDate,
  sortArrayByLabel,
} from '@utils/utils';

describe('parseDate', () => {
  test('formats a date in long format by default (Spanish month names)', () => {
    const result = parseDate(new Date(2026, 0, 15));
    expect(result).toMatch(/15 de enero de 2026/i);
  });

  test('formats a date in short format with comma before year', () => {
    const result = parseDate(new Date(2026, 0, 15), 'short');
    expect(result).toMatch(/15 ene\.?, 2026/i);
  });

  test('returns null for invalid input', () => {
    expect(parseDate('not-a-date')).toBeNull();
  });

  test('accepts a Date instance', () => {
    const result = parseDate(new Date(2026, 11, 25));
    expect(result).toMatch(/25 de diciembre de 2026/i);
  });
});

describe('generatePathUrl', () => {
  test('lowercases, removes diacritics and joins words with dashes', () => {
    const result = generatePathUrl('Crónicas de Nárnia');
    expect(result).toMatch(/^cronicas-de-narnia-[A-Za-z0-9_-]{4}$/);
  });

  test('strips parentheses, dots, slashes and question marks', () => {
    const result = generatePathUrl('¿Quién soy? (Vol. 1/2)');
    expect(result).toMatch(/^quien-soy-vol-12-[A-Za-z0-9_-]{4}$/);
  });

  test('appends a 4-char random id', () => {
    const a = generatePathUrl('mismo titulo');
    const b = generatePathUrl('mismo titulo');
    expect(a).not.toBe(b);
    expect(a.slice(-5, -4)).toBe('-');
  });
});

describe('isSpanish', () => {
  test('returns true for "Español" or "español"', () => {
    expect(isSpanish('Español')).toBe(true);
    expect(isSpanish('español')).toBe(true);
  });

  test('returns false for other languages', () => {
    expect(isSpanish('Inglés')).toBe(false);
    expect(isSpanish('English')).toBe(false);
    expect(isSpanish('Francés')).toBe(false);
  });
});

describe('capitalizeWords', () => {
  test('capitalizes each word', () => {
    expect(capitalizeWords('hola mundo bonito')).toBe('Hola Mundo Bonito');
  });

  test('capitalizes each part after a dot inside a word', () => {
    expect(capitalizeWords('j.r.r. tolkien')).toBe('J.R.R. Tolkien');
  });

  test('preserves single empty string for empty input', () => {
    expect(capitalizeWords('')).toBe('');
  });
});

describe('sortArrayByLabel', () => {
  test('sorts alphabetically by label using locale compare', () => {
    const sorted = sortArrayByLabel([
      { label: 'Banana' },
      { label: 'ánimo' },
      { label: 'Cebra' },
    ]);
    expect(sorted.map((i) => i.label)).toEqual(['ánimo', 'Banana', 'Cebra']);
  });

  test('does not mutate the original array', () => {
    const input = [{ label: 'B' }, { label: 'A' }];
    const result = sortArrayByLabel(input);
    expect(input.map((i) => i.label)).toEqual(['B', 'A']);
    expect(result.map((i) => i.label)).toEqual(['A', 'B']);
  });
});
