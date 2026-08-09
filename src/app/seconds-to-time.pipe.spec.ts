import { SecondsToTimePipe } from './seconds-to-time.pipe';

describe('SecondsToTimePipe', () => {
  const pipe = new SecondsToTimePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('formats a plain number of seconds', () => {
    expect(pipe.transform(1)).toBe('1 second ');
    expect(pipe.transform(90)).toBe('1 minute 30 seconds ');
    expect(pipe.transform(3661)).toBe('1 hour 1 minute 1 second ');
  });

  it('returns an empty string for zero and for garbage input', () => {
    expect(pipe.transform(0)).toBe('');
    expect(pipe.transform(NaN)).toBe('');
  });
});
