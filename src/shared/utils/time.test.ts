import { formatCountdown, getSecondsRemaining } from '@/src/shared/utils/time';

describe('time utilities', () => {
	it('clamps remaining seconds at zero', () => {
		const now = new Date('2026-03-18T12:00:00.000Z');
		const expiresAt = new Date('2026-03-18T11:59:40.000Z');

		expect(getSecondsRemaining(expiresAt, now)).toBe(0);
	});

	it('formats durations under one hour', () => {
		expect(formatCountdown(125)).toBe('02:05');
	});

	it('formats durations with hours', () => {
		expect(formatCountdown(3723)).toBe('01:02:03');
	});

	it('formats durations with days', () => {
		expect(formatCountdown(93784)).toBe('01:02:03:04');
	});
});
