import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { DateTimeField } from '@/src/features/configuration/components/DateTimeField';
import { useStartCountdown } from '@/src/features/configuration/hooks/useStartCountdown';

export const ConfigScreen = () => {
	const [selectedDate, setSelectedDate] = useState(
		() => new Date(Date.now() + 5 * 60 * 1000),
	);
	const [spinning, setSpinning] = useState(false);
	const { start, loading, error } = useStartCountdown();

	const handleDateChange = (date: Date) => {
		const minimumDate = new Date();
		setSelectedDate(date < minimumDate ? minimumDate : date);
	};

	const formattedDuration = useMemo(() => {
		const diff = Math.max(
			0,
			Math.floor((selectedDate.getTime() - Date.now()) / 1000),
		);
		const days = Math.floor(diff / 86400);
		const hours = Math.floor((diff % 86400) / 3600);
		const minutes = Math.floor((diff % 3600) / 60);
		const pad = (n: number) => String(n).padStart(2, '0');

		if (days > 0) return `${days}d ${pad(hours)}h ${pad(minutes)}m`;
		if (hours > 0) return `${hours}h ${pad(minutes)}m`;
		return `${minutes}m`;
	}, [selectedDate]);

	const buttonDisabled = loading || spinning;

	const handleStart = async () => {
		await start(selectedDate);
	};

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText type="title">Configure</ThemedText>
				<ThemedText>Pick date and time, then start.</ThemedText>
			</View>

			<DateTimeField
				value={selectedDate}
				onChange={handleDateChange}
				onSpinningChange={setSpinning}
			/>

			<View style={styles.footer}>
				{error ? (
					<ThemedText style={styles.errorText}>{error}</ThemedText>
				) : null}
				<Pressable
					onPress={handleStart}
					disabled={buttonDisabled}
					style={[
						styles.button,
						buttonDisabled && styles.buttonDisabled,
					]}
				>
					{loading ? (
						<ActivityIndicator color="#ffffff" />
					) : (
						<ThemedText style={styles.buttonText}>
							Start {formattedDuration} timer
						</ThemedText>
					)}
				</Pressable>
			</View>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingBottom: 20,
		gap: 16,
	},
	header: {
		gap: 8,
	},
	footer: {
		gap: 12,
	},
	errorText: {
		color: '#b42318',
	},
	button: {
		height: 48,
		borderRadius: 10,
		backgroundColor: '#0a7ea4',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		color: '#ffffff',
		fontWeight: '700',
	},
});
