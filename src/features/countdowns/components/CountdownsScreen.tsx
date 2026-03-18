import { FlatList, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CountdownRow } from '@/src/features/countdowns/components/CountdownRow';
import { useCountdownStore } from '@/src/store/countdownStore';

export const CountdownsScreen = () => {
	const entries = useCountdownStore((s) => s.entries);

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText type="title">Countdowns</ThemedText>
			</View>

			{entries.length === 0 ? (
				<View style={styles.empty}>
					<ThemedText type="subtitle">
						No active countdowns
					</ThemedText>
					<ThemedText style={styles.emptyText}>
						Start a timer in Configure and it will appear here.
					</ThemedText>
				</View>
			) : (
				<FlatList
					data={entries}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <CountdownRow entry={item} />}
				/>
			)}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingHorizontal: 16,
		paddingBottom: 8,
	},
	empty: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyText: {
		textAlign: 'center',
		opacity: 0.5,
		maxWidth: 260,
	},
});
