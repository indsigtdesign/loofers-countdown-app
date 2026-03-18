import type { CountdownEntry } from '@/src/store/countdownStore';
import { addMinutes } from 'date-fns';
import { randomUUID } from 'expo-crypto';

const simulateNetworkDelay = (ms: number) =>
	new Promise<void>((resolve) => setTimeout(resolve, ms));

export const requestCountdown = async (date: Date): Promise<CountdownEntry> => {
	await simulateNetworkDelay(800);
	return {
		id: randomUUID(),
		expiresAt: addMinutes(date, 2),
		createdAt: new Date(),
	};
};
