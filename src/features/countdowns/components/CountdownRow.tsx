import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radii, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
	formatCountdown,
	formatCountdownDate,
	getSecondsRemaining,
} from '@/src/shared/utils/time';
import type { CountdownEntry } from '@/src/store/countdownStore';
import { useCountdownStore } from '@/src/store/countdownStore';

type Props = {
	entry: CountdownEntry;
	index?: number;
};

export const CountdownRow = ({ entry, index = 0 }: Props) => {
	const removeEntry = useCountdownStore((s) => s.removeEntry);
	const now = useCountdownStore((s) => s.now);
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme ?? 'light'];
	const seconds = getSecondsRemaining(entry.expiresAt, now);

	return (
		<Animated.View entering={FadeInRight.delay(index * 70).duration(320)}>
			<ThemedView
				variant="glass"
				elevated
				style={[styles.row, { borderColor: theme.border }]}
			>
				<View style={styles.info}>
					<ThemedText type="mono" style={styles.time}>
						{formatCountdown(seconds)}
					</ThemedText>
					<ThemedText style={styles.label} tone="muted">
						Expires {formatCountdownDate(entry.expiresAt)}
					</ThemedText>
				</View>
				<Pressable
					accessibilityRole="button"
					accessibilityLabel={`Remove countdown expiring ${formatCountdownDate(entry.expiresAt)}`}
					accessibilityHint="Removes this active countdown from the list"
					onPress={() => removeEntry(entry.id)}
					style={({ pressed }) => [
						styles.removeButton,
						{
							backgroundColor: theme.surface,
							borderColor: theme.border,
							transform: [{ scale: pressed ? 0.96 : 1 }],
						},
					]}
				>
					<ThemedText type="label" tone="accent">
						Remove
					</ThemedText>
				</Pressable>
			</ThemedView>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: Spacing.sm,
		paddingHorizontal: Spacing.md,
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
	},
	label: {
		fontSize: 13,
	},
	removeButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: Radii.pill,
		borderWidth: 1,
	},
	removeText: {
		fontSize: 18,
		opacity: 0.5,
	},
});
