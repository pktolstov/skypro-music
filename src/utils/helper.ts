import { TrackType } from '@/sharedTypes/sharedTypes';
import { current } from '@reduxjs/toolkit';

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;
  return `${minutes}:${outputSeconds}`;
}

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined,
) => {
  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }
};

export function getUniqueValueByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  // Use Set for storing unique values
  const uniqueValues = new Set<string>();
  arr.forEach((item) => {
    const value = item[key];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(v);
        }
      });
    } else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  return Array.from(uniqueValues);
}
