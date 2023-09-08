import { renderHook } from '@testing-library/react';
import usePage from './usePage';

describe('usePage', () => {
  test('should return onNextClick', () => {
    const { result } = renderHook(() => usePage());
    const { onNextClick } = result.current;

    window.alert = jest.fn();
    jest.spyOn(window, 'alert');
    onNextClick();
    expect(window.alert).toBeCalledWith('Next.js');
  });
});
