import { useEffect } from 'react';

import { startCountdownTicker } from '@/src/shared/hooks/countdownTicker';
import { useCountdownStore } from '@/src/store/countdownStore';

export const useCountdownTick = () => {
	useEffect(() => {
		return startCountdownTicker({
			onTick: () => {
				useCountdownStore.getState().tick();
			},
		});
	}, []);
};
