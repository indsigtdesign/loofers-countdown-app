import { startCountdownTicker } from '@/src/shared/hooks/countdownTicker';

describe('startCountdownTicker', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	it('calls the tick callback on start', () => {
		const onTick = jest.fn();

		const stop = startCountdownTicker({ onTick });

		expect(onTick).toHaveBeenCalledTimes(1);
		stop();
	});

	it('calls the tick callback every second', () => {
		const onTick = jest.fn();

		const stop = startCountdownTicker({ onTick });
		jest.advanceTimersByTime(3000);

		expect(onTick).toHaveBeenCalledTimes(4);
		stop();
	});

	it('clears the interval on cleanup', () => {
		const onTick = jest.fn();

		const stop = startCountdownTicker({ onTick });
		stop();
		jest.advanceTimersByTime(3000);

		expect(onTick).toHaveBeenCalledTimes(1);
	});
});
