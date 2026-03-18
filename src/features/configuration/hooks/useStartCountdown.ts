import { useCallback, useState } from 'react';

import { requestCountdown } from '@/src/services/countdownService';
import { useCountdownStore } from '@/src/store/countdownStore';

export const useStartCountdown = () => {
	const addEntry = useCountdownStore((state) => state.addEntry);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const start = useCallback(
		async (date: Date) => {
			setLoading(true);
			setError(null);
			try {
				const entry = await requestCountdown(date);
				addEntry(entry);
			} catch {
				setError('Could not start the countdown. Please try again.');
			} finally {
				setLoading(false);
			}
		},
		[addEntry],
	);

	return {
		start,
		loading,
		error,
	};
};
