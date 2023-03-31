// import { act, renderHook } from '@testing-library/react-hooks';
import { test, describe, it } from 'vitest';

import { useAllBooks, useMutatePost } from './querys';

describe('useAllBooks, useMutatePost', () => {
  it('AllBooks', () => {
    // const { result } = renderHook(() => useAllBooks());
    // act(() => {
    //   console.log(result.error);
    // });
    // expect(result.current.data).toBe(27);
    // console.log(result);
  });

  it('mutation', () => {
    // const { result } = renderHook(() => useMutatePost());
    // act(() => {
    //   console.log(result.current);
    // });
    // expect(result.current.data).toBe(27);
    // console.log(result);
  });
});
