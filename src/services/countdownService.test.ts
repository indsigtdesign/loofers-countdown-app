import { requestCountdown } from '@/src/services/countdownService';

jest.mock('expo-crypto', () => ({
	randomUUID: jest.fn(() => 'mock-countdown-id'),
}));

describe('requestCountdown', () => {
	it('returns expiresAt equal to the selected date plus two minutes', async () => {
		jest.useFakeTimers();
		const selectedDate = new Date('2026-03-18T12:00:00.000Z');

		const promise = requestCountdown(selectedDate);
		await jest.advanceTimersByTimeAsync(800);
		const result = await promise;

		expect(result.expiresAt).toEqual(new Date('2026-03-18T12:02:00.000Z'));
	});

	it('returns an id', async () => {
		jest.useFakeTimers();
		const promise = requestCountdown(new Date('2026-03-18T12:00:00.000Z'));
		await jest.advanceTimersByTimeAsync(800);

		await expect(promise).resolves.toMatchObject({
			id: 'mock-countdown-id',
		});
	});

	it('respects the simulated async delay', async () => {
		jest.useFakeTimers();
		const promise = requestCountdown(new Date('2026-03-18T12:00:00.000Z'));
		let settled = false;

		void promise.then(() => {
			settled = true;
		});

		await jest.advanceTimersByTimeAsync(799);
		await Promise.resolve();
		expect(settled).toBe(false);

		await jest.advanceTimersByTimeAsync(1);
		await promise;
		expect(settled).toBe(true);
	});
});
