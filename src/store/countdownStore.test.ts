import type { CountdownEntry } from '@/src/store/countdownStore';
import { useCountdownStore } from '@/src/store/countdownStore';

const initialState = useCountdownStore.getState();

const createEntry = (id: string, expiresAt: string): CountdownEntry => ({
	id,
	expiresAt: new Date(expiresAt),
	createdAt: new Date('2026-03-18T10:00:00.000Z'),
});

describe('countdownStore', () => {
	beforeEach(() => {
		useCountdownStore.setState(
			{
				...initialState,
				entries: [],
				now: new Date('2026-03-18T10:00:00.000Z'),
			},
			true,
		);
	});

	it('adds an entry', () => {
		const entry = createEntry('first', '2026-03-18T10:10:00.000Z');

		useCountdownStore.getState().addEntry(entry);

		expect(useCountdownStore.getState().entries).toEqual([entry]);
	});

	it('removes an entry', () => {
		const first = createEntry('first', '2026-03-18T10:10:00.000Z');
		const second = createEntry('second', '2026-03-18T10:12:00.000Z');
		useCountdownStore.setState((state) => ({
			...state,
			entries: [first, second],
		}));

		useCountdownStore.getState().removeEntry('first');

		expect(useCountdownStore.getState().entries).toEqual([second]);
	});

	it('removeExpired removes only expired entries', () => {
		const expired = createEntry('expired', '2026-03-18T09:59:59.000Z');
		const active = createEntry('active', '2026-03-18T10:05:00.000Z');
		useCountdownStore.setState((state) => ({
			...state,
			entries: [expired, active],
		}));

		useCountdownStore
			.getState()
			.removeExpired(new Date('2026-03-18T10:00:00.000Z'));

		expect(useCountdownStore.getState().entries).toEqual([active]);
	});

	it('getClosestExpiring returns the earliest future entry', () => {
		const expired = createEntry('expired', '2026-03-18T09:59:59.000Z');
		const later = createEntry('later', '2026-03-18T10:09:00.000Z');
		const earliest = createEntry('earliest', '2026-03-18T10:04:00.000Z');
		useCountdownStore.setState((state) => ({
			...state,
			entries: [later, expired, earliest],
			now: new Date('2026-03-18T10:00:00.000Z'),
		}));

		expect(useCountdownStore.getState().getClosestExpiring()).toEqual(
			earliest,
		);
	});
});
