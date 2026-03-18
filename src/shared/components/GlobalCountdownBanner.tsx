import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { formatCountdown, getSecondsRemaining } from '@/src/shared/utils/time';
import { useCountdownStore } from '@/src/store/countdownStore';

export const GlobalCountdownBanner = () => {
	const closest = useCountdownStore((s) => s.getClosestExpiring());
	const now = useCountdownStore((s) => s.now);

	if (!closest) return null;

	const seconds = getSecondsRemaining(closest.expiresAt, now);

	return (
		<View style={styles.banner}>
			<ThemedText style={styles.label}>Next expiry</ThemedText>
			<ThemedText style={styles.time}>
				{formatCountdown(seconds)}
			</ThemedText>
		</View>
	);
};

const styles = StyleSheet.create({
	banner: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 10,
		marginBottom: 8,
		backgroundColor: '#0a7ea4',
	},
	label: {
		color: '#ffffff',
		fontSize: 14,
	},
	time: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: '700',
		fontVariant: ['tabular-nums'],
	},
});
