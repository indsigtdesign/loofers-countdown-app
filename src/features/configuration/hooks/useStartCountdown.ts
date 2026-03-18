import { useCallback, useState } from 'react';

import { startCountdownFlow } from '@/src/features/configuration/startCountdown';
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
				await startCountdownFlow(date, {
					requestCountdown,
					addEntry,
				});
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
