import { differenceInSeconds, format } from 'date-fns';

export const getSecondsRemaining = (
	expiresAt: Date,
	currentTime: Date = new Date(),
): number => {
	const seconds = differenceInSeconds(expiresAt, currentTime);
	return Math.max(0, seconds);
};

const pad = (n: number) => String(n).padStart(2, '0');

export const formatCountdown = (totalSeconds: number): string => {
	if (totalSeconds <= 0) return '00:00';

	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (days > 0) {
		return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	}
	if (hours > 0) {
		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	}
	return `${pad(minutes)}:${pad(seconds)}`;
};

export const formatCountdownDate = (date: Date): string => format(date, 'PPp');
