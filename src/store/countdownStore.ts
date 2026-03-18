import { create } from 'zustand';

export type CountdownEntry = {
	id: string;
	expiresAt: Date;
	createdAt: Date;
};

const compareByExpiresAt = (left: CountdownEntry, right: CountdownEntry) =>
	left.expiresAt.getTime() - right.expiresAt.getTime();

const insertEntry = (entries: CountdownEntry[], entry: CountdownEntry) =>
	[...entries, entry].sort(compareByExpiresAt);

const pruneExpiredEntries = (entries: CountdownEntry[], now: Date) => {
	const hasExpiredEntries = entries.some((entry) => entry.expiresAt <= now);
	if (!hasExpiredEntries) {
		return entries;
	}

	return entries
		.filter((entry) => entry.expiresAt > now)
		.sort(compareByExpiresAt);
};

type CountdownStore = {
	entries: CountdownEntry[];
	now: Date;
	addEntry: (entry: CountdownEntry) => void;
	removeEntry: (id: string) => void;
	removeExpired: (at?: Date) => void;
	tick: (at?: Date) => void;
	getClosestExpiring: () => CountdownEntry | undefined;
};

export const useCountdownStore = create<CountdownStore>((set, get) => ({
	entries: [],
	now: new Date(),

	addEntry: (entry) =>
		set((state) => ({ entries: insertEntry(state.entries, entry) })),

	removeEntry: (id) =>
		set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),

	removeExpired: (at = new Date()) => {
		set((state) => ({
			now: at,
			entries: pruneExpiredEntries(state.entries, at),
		}));
	},

	tick: (at = new Date()) =>
		set((state) => ({
			now: at,
			entries: pruneExpiredEntries(state.entries, at),
		})),

	getClosestExpiring: () => {
		const { entries, now } = get();
		const upcomingEntries = entries.filter(
			(entry) => entry.expiresAt > now,
		);
		if (upcomingEntries.length === 0) return undefined;
		return upcomingEntries.reduce((closest, entry) =>
			entry.expiresAt < closest.expiresAt ? entry : closest,
		);
	},
}));
