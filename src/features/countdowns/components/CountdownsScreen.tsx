import { FlatList, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radii, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CountdownRow } from '@/src/features/countdowns/components/CountdownRow';
import { useCountdownStore } from '@/src/store/countdownStore';

export const CountdownsScreen = () => {
	const entries = useCountdownStore((s) => s.entries);
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme ?? 'light'];

	return (
		<ThemedView style={styles.container} variant="background">
			<Animated.View
				entering={FadeInDown.duration(320)}
				style={styles.header}
			>
				<ThemedText type="eyebrow" tone="muted">
					Live timers
				</ThemedText>
				<ThemedText type="title">Countdowns</ThemedText>
			</Animated.View>

			{entries.length === 0 ? (
				<Animated.View
					entering={FadeInDown.delay(120).duration(360)}
					style={[
						styles.empty,
						{
							borderColor: theme.border,
							backgroundColor: theme.surface,
						},
					]}
				>
					<ThemedText type="subtitle">
						No active countdowns
					</ThemedText>
					<ThemedText style={styles.emptyText} tone="muted">
						Start a timer in Create and it will appear here.
					</ThemedText>
				</Animated.View>
			) : (
				<FlatList
					data={entries}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.listContent}
					renderItem={({ item, index }) => (
						<CountdownRow entry={item} index={index} />
					)}
				/>
			)}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: Spacing.md,
		paddingTop: Spacing.sm,
	},
	header: {
		paddingBottom: Spacing.sm,
		gap: Spacing.xs,
	},
	empty: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderRadius: Radii.lg,
		paddingHorizontal: Spacing.lg,
		marginBottom: 90,
		gap: Spacing.xs,
	},
	emptyText: {
		textAlign: 'center',
		maxWidth: 260,
	},
	listContent: {
		paddingBottom: 90,
		gap: Spacing.sm,
	},
});
