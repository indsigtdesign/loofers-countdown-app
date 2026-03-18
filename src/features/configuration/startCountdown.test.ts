import { startCountdownFlow } from '@/src/features/configuration/startCountdown';
import type { CountdownEntry } from '@/src/store/countdownStore';

const createEntry = (): CountdownEntry => ({
	id: 'countdown-1',
	expiresAt: new Date('2026-03-18T12:02:00.000Z'),
	createdAt: new Date('2026-03-18T12:00:00.000Z'),
});

describe('startCountdownFlow', () => {
	it('requests a countdown and adds the returned entry to the store', async () => {
		const entry = createEntry();
		const requestCountdown = jest.fn(async () => entry);
		const addEntry = jest.fn();
		const selectedDate = new Date('2026-03-18T12:00:00.000Z');

		const result = await startCountdownFlow(selectedDate, {
			requestCountdown,
			addEntry,
		});

		expect(requestCountdown).toHaveBeenCalledWith(selectedDate);
		expect(addEntry).toHaveBeenCalledWith(entry);
		expect(result).toBe(entry);
	});

	it('propagates request failures without mutating the store', async () => {
		const requestCountdown = jest.fn(async () => {
			throw new Error('network down');
		});
		const addEntry = jest.fn();

		await expect(
			startCountdownFlow(new Date('2026-03-18T12:00:00.000Z'), {
				requestCountdown,
				addEntry,
			}),
		).rejects.toThrow('network down');

		expect(addEntry).not.toHaveBeenCalled();
	});
});
