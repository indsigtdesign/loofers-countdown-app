import DateTimePicker, {
	type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useCallback, useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Radii, Shadows, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { formatCountdownDate } from '@/src/shared/utils/time';

type Props = {
	value: Date;
	onChange: (date: Date) => void;
	onSpinningChange?: (spinning: boolean) => void;
};

type PickerMode = 'date' | 'time' | null;

const mergeDatePart = (baseDate: Date, nextDate: Date) => {
	const merged = new Date(baseDate);
	merged.setFullYear(
		nextDate.getFullYear(),
		nextDate.getMonth(),
		nextDate.getDate(),
	);
	return merged;
};

const mergeTimePart = (baseDate: Date, nextTime: Date) => {
	const merged = new Date(baseDate);
	merged.setHours(
		nextTime.getHours(),
		nextTime.getMinutes(),
		nextTime.getSeconds(),
		nextTime.getMilliseconds(),
	);
	return merged;
};

export const DateTimeField = ({ value, onChange, onSpinningChange }: Props) => {
	const [pickerMode, setPickerMode] = useState<PickerMode>(null);
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme ?? 'light'];

	const closePicker = useCallback(() => {
		setPickerMode(null);
	}, []);

	const openPicker = useCallback((mode: Exclude<PickerMode, null>) => {
		setPickerMode(mode);
	}, []);

	const handleChange = (event: DateTimePickerEvent, nextValue?: Date) => {
		if (event.type === 'dismissed' || !nextValue) {
			closePicker();
			onSpinningChange?.(false);
			return;
		}

		if (pickerMode === 'date') {
			onChange(mergeDatePart(value, nextValue));
		} else if (pickerMode === 'time') {
			onChange(mergeTimePart(value, nextValue));
		} else {
			onChange(nextValue);
			onSpinningChange?.(false);
		}

		if (Platform.OS === 'android') {
			closePicker();
		}
	};

	if (Platform.OS === 'ios') {
		return (
			<ThemedView
				variant="raised"
				elevated
				style={[styles.card, { borderColor: theme.border }]}
			>
				<ThemedText type="label" tone="muted">
					Date and time
				</ThemedText>
				<DateTimePicker
					value={value}
					mode="datetime"
					display="spinner"
					minimumDate={new Date()}
					onChange={handleChange}
					onTouchStart={() => onSpinningChange?.(true)}
				/>
			</ThemedView>
		);
	}

	return (
		<ThemedView
			variant="raised"
			elevated
			style={[styles.card, { borderColor: theme.border }]}
		>
			<View style={styles.summaryBlock}>
				<ThemedText type="label" tone="muted">
					Selected deadline
				</ThemedText>
				<ThemedText type="subtitle">
					{formatCountdownDate(value)}
				</ThemedText>
			</View>
			<View style={styles.actionRow}>
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Edit date"
					accessibilityHint="Opens the native date picker"
					onPress={() => openPicker('date')}
					style={({ pressed }) => [
						styles.fieldButton,
						{
							backgroundColor: theme.surface,
							borderColor: theme.border,
							opacity: pressed ? 0.85 : 1,
						},
					]}
				>
					<ThemedText type="label">Edit date</ThemedText>
				</Pressable>
				<Pressable
					accessibilityRole="button"
					accessibilityLabel="Edit time"
					accessibilityHint="Opens the native time picker"
					onPress={() => openPicker('time')}
					style={({ pressed }) => [
						styles.fieldButton,
						{
							backgroundColor: theme.surface,
							borderColor: theme.border,
							opacity: pressed ? 0.85 : 1,
						},
					]}
				>
					<ThemedText type="label">Edit time</ThemedText>
				</Pressable>
			</View>
			{pickerMode ? (
				<DateTimePicker
					value={value}
					mode={pickerMode}
					display="default"
					minimumDate={pickerMode === 'date' ? new Date() : undefined}
					onChange={handleChange}
				/>
			) : null}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	card: {
		padding: Spacing.md,
		borderRadius: Radii.lg,
		borderWidth: 1,
		gap: Spacing.sm,
		...Shadows.soft,
	},
	summaryBlock: {
		gap: 4,
	},
	actionRow: {
		flexDirection: 'row',
		gap: Spacing.sm,
	},
	fieldButton: {
		flex: 1,
		paddingHorizontal: 14,
		paddingVertical: 12,
		borderRadius: 12,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
