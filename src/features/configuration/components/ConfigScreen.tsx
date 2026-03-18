import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radii, Shadows, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DateTimeField } from '@/src/features/configuration/components/DateTimeField';
import { useStartCountdown } from '@/src/features/configuration/hooks/useStartCountdown';

export const ConfigScreen = () => {
	const [selectedDate, setSelectedDate] = useState(
		() => new Date(Date.now() + 5 * 60 * 1000),
	);
	const [spinning, setSpinning] = useState(false);
	const { start, loading, error } = useStartCountdown();
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme ?? 'light'];

	const handleDateChange = (date: Date) => {
		const minimumDate = new Date();
		setSelectedDate(date < minimumDate ? minimumDate : date);
	};

	const buttonDisabled = loading || spinning;

	const handleStart = async () => {
		await start(selectedDate);
	};

	return (
		<ThemedView style={styles.container} variant="background">
			<Animated.View
				entering={FadeInDown.duration(320)}
				style={styles.header}
			>
				<ThemedText type="eyebrow" tone="muted">
					Countdown setup
				</ThemedText>
				<ThemedText type="title">Create</ThemedText>
				<ThemedText tone="muted">
					Choose a target date and launch a timer.
				</ThemedText>
			</Animated.View>

			<Animated.View entering={FadeInDown.delay(120).duration(360)}>
				<DateTimeField
					value={selectedDate}
					onChange={handleDateChange}
					onSpinningChange={setSpinning}
				/>
			</Animated.View>

			<Animated.View
				entering={FadeInDown.delay(180).duration(360)}
				style={styles.footer}
			>
				{error ? (
					<ThemedText
						tone="danger"
						type="bodySm"
						style={styles.errorText}
					>
						{error}
					</ThemedText>
				) : null}
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Start countdown"
					accessibilityHint="Creates a countdown using the selected date and time"
					onPress={handleStart}
					disabled={buttonDisabled}
					style={({ pressed }) => [
						styles.button,
						{
							backgroundColor: theme.accent,
							borderColor: theme.accentStrong,
							transform: [{ scale: pressed ? 0.98 : 1 }],
						},
						buttonDisabled && styles.buttonDisabled,
					]}
				>
					{loading ? (
						<ActivityIndicator color={theme.textInverted} />
					) : (
						<ThemedText
							type="button"
							tone="inverted"
							style={styles.buttonText}
						>
							Start Countdown
						</ThemedText>
					)}
				</Pressable>
			</Animated.View>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: Spacing.md,
		paddingBottom: Spacing.lg,
		paddingTop: Spacing.sm,
		gap: Spacing.md,
	},
	header: {
		paddingBottom: Spacing.sm,
		gap: Spacing.xs,
	},
	footer: {
		gap: Spacing.sm,
	},
	errorText: {
		paddingHorizontal: Spacing.xs,
	},
	button: {
		height: 54,
		borderRadius: Radii.md,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		...Shadows.soft,
	},
	buttonDisabled: {
		opacity: 0.55,
	},
	buttonText: {
		textAlign: 'center',
	},
});
