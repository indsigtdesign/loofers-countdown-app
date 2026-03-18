type CountdownTickerOptions = {
	onTick: () => void;
	intervalMs?: number;
};

export const startCountdownTicker = ({
	onTick,
	intervalMs = 1000,
}: CountdownTickerOptions) => {
	onTick();
	const intervalId = setInterval(onTick, intervalMs);

	return () => {
		clearInterval(intervalId);
	};
};
