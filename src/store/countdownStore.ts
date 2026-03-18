import { create } from 'zustand';

export type CountdownEntry = {
	id: string;
	expiresAt: Date;
	createdAt: Date;
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

const filterFutureEntries = (entries: CountdownEntry[], now: Date) =>
	entries.filter((entry) => entry.expiresAt > now);

export const useCountdownStore = create<CountdownStore>((set, get) => ({
	entries: [],
	now: new Date(),

	addEntry: (entry) =>
		set((state) => ({ entries: [...state.entries, entry] })),

	removeEntry: (id) =>
		set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),

	removeExpired: (at = new Date()) => {
		set((state) => ({
			now: at,
			entries: filterFutureEntries(state.entries, at),
		}));
	},

	tick: (at = new Date()) => {
		get().removeExpired(at);
	},

	getClosestExpiring: () => {
		const { entries, now } = get();
		const upcomingEntries = filterFutureEntries(entries, now);
		if (upcomingEntries.length === 0) return undefined;
		return upcomingEntries.reduce((closest, entry) =>
			entry.expiresAt < closest.expiresAt ? entry : closest,
		);
	},
}));
