import type { requestCountdown as requestCountdownFn } from '@/src/services/countdownService';
import type { CountdownEntry } from '@/src/store/countdownStore';

type StartCountdownDependencies = {
	requestCountdown: typeof requestCountdownFn;
	addEntry: (entry: CountdownEntry) => void;
};

export const startCountdownFlow = async (
	date: Date,
	{ requestCountdown, addEntry }: StartCountdownDependencies,
) => {
	const entry = await requestCountdown(date);
	addEntry(entry);
	return entry;
};
