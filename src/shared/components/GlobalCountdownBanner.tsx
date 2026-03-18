import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radii, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { formatCountdown, getSecondsRemaining } from '@/src/shared/utils/time';
import { useCountdownStore } from '@/src/store/countdownStore';

export const GlobalCountdownBanner = () => {
	const closest = useCountdownStore((s) => s.getClosestExpiring());
	const now = useCountdownStore((s) => s.now);
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme ?? 'light'];

	if (!closest) return null;

	const seconds = getSecondsRemaining(closest.expiresAt, now);

	return (
		<Animated.View entering={FadeInDown.duration(320)}>
			<ThemedView
				accessible
				accessibilityLabel={`Closest countdown expires in ${formatCountdown(seconds)}`}
				variant="glass"
				elevated
				style={[styles.wrap, { borderColor: theme.border }]}
			>
				<View style={styles.info}>
					<ThemedText style={styles.label} tone="muted">
						Upcoming countdown
					</ThemedText>
					<ThemedText type="mono" style={styles.time}>
						{formatCountdown(seconds)}
					</ThemedText>
				</View>
			</ThemedView>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	wrap: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: Spacing.sm,
		paddingHorizontal: Spacing.md,
		marginHorizontal: Spacing.sm,
		marginBottom: Spacing.sm,
		borderRadius: Radii.md,
		borderWidth: 1,
	},
	info: {
		flex: 1,
		gap: 4,
	},
	time: {
		fontSize: 30,
		lineHeight: 36,
		fontVariant: ['tabular-nums'],
		letterSpacing: -0.8,
		textAlign: 'right',
	},
	label: {
		fontSize: 13,
	},
});
