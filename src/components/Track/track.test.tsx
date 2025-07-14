import '@testing-library/jest-dom';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { render, screen } from '@testing-library/react';
import Track from './Track';
import ReduxProvider from '../../store/ReduxProvider';
import { formatTime } from '@/utils/helper';
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

describe('track component', () => {
  it('Отрисовка данных трека', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>,
    );
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.album).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(formatTime(mockTrack.duration_in_seconds)).length,
    ).toBeGreaterThan(0);
  });
});
