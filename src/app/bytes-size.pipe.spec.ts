import { BytesSizePipe } from './bytes-size.pipe';

describe('BytesSizePipe', () => {
  const pipe = new BytesSizePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('formats byte counts with the right unit', () => {
    expect(pipe.transform(512)).toBe('512 bytes');
    expect(pipe.transform(1024)).toBe('1.00 KB');
    expect(pipe.transform(1024 * 1024)).toBe('1.00 MB');
  });

  it('appends the suffix when given', () => {
    expect(pipe.transform(1024, 2, '/s')).toBe('1.00 KB/s');
  });

  it('returns ? for garbage input', () => {
    expect(pipe.transform(NaN)).toBe('?');
  });
});
