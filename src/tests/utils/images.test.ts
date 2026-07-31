import { describe, expect, test } from 'vitest';

import { cldAvatar, cldImg } from '@utils/images';

const COVER =
  'https://res.cloudinary.com/xbu/image/upload/v1690907589/books/poilvk16wtiat8v22z6h.webp';

describe('cldImg', () => {
  test('inserts the transformations after /image/upload/', () => {
    expect(cldImg(COVER, { w: 90, h: 135 })).toBe(
      'https://res.cloudinary.com/xbu/image/upload/f_auto,q_auto,c_limit,w_90,h_135,dpr_2/v1690907589/books/poilvk16wtiat8v22z6h.webp',
    );
  });

  test('keeps the version and public id intact', () => {
    expect(cldImg(COVER, { w: 90 })).toContain('/v1690907589/books/');
  });

  test('does not chain transformations if the url already has them', () => {
    const already = cldImg(COVER, { w: 90 }) as string;
    expect(cldImg(already, { w: 300 })).toBe(already);
  });

  test('leaves svg assets untouched', () => {
    const svg =
      'https://res.cloudinary.com/xbu/image/upload/v1690907883/xbu_assets/imgBook_l5iy6b.svg';
    expect(cldImg(svg, { w: 500 })).toBe(svg);
  });

  test('leaves non-cloudinary urls untouched', () => {
    const other = 'https://example.com/cover.webp';
    expect(cldImg(other, { w: 90 })).toBe(other);
  });

  test('handles empty values', () => {
    expect(cldImg(undefined, { w: 90 })).toBeUndefined();
    expect(cldImg(null, { w: 90 })).toBeUndefined();
    expect(cldImg('', { w: 90 })).toBeUndefined();
  });
});

describe('cldAvatar', () => {
  test('crops cloudinary avatars to a square', () => {
    const avatar =
      'https://res.cloudinary.com/xbu/image/upload/v1700000000/avatars/ilzrtv9clxizuimday81.webp';
    expect(cldAvatar(avatar, 32)).toContain('c_fill,w_32,h_32,dpr_2');
  });

  test('rewrites the size of google profile pictures', () => {
    expect(
      cldAvatar('https://lh3.googleusercontent.com/a/ACg8ocL9T=s96-c', 32),
    ).toBe('https://lh3.googleusercontent.com/a/ACg8ocL9T=s64-c');
  });

  test('appends the size when the google url has none', () => {
    expect(cldAvatar('https://lh3.googleusercontent.com/a/ACg8ocL9T', 40)).toBe(
      'https://lh3.googleusercontent.com/a/ACg8ocL9T=s80-c',
    );
  });
});
