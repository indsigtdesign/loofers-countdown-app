import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import {
	formatCountdown,
	formatCountdownDate,
	getSecondsRemaining,
} from '@/src/shared/utils/time';
import type { CountdownEntry } from '@/src/store/countdownStore';
import { useCountdownStore } from '@/src/store/countdownStore';

type Props = {
	entry: CountdownEntry;
};

export const CountdownRow = ({ entry }: Props) => {
	const removeEntry = useCountdownStore((s) => s.removeEntry);
	const now = useCountdownStore((s) => s.now);
	const seconds = getSecondsRemaining(entry.expiresAt, now);

	return (
		<View style={styles.row}>
			<View style={styles.info}>
				<ThemedText type="defaultSemiBold" style={styles.time}>
					{formatCountdown(seconds)}
				</ThemedText>
				<ThemedText style={styles.label}>
					Expires {formatCountdownDate(entry.expiresAt)}
				</ThemedText>
			</View>
			<Pressable
				onPress={() => removeEntry(entry.id)}
				style={styles.removeButton}
			>
				<ThemedText style={styles.removeText}>✕</ThemedText>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#c7c7c7',
	},
	info: {
		flex: 1,
		gap: 2,
	},
	time: {
		fontSize: 28,
		lineHeight: 36,
		fontVariant: ['tabular-nums'],
	},
	label: {
		fontSize: 13,
		opacity: 0.6,
	},
	removeButton: {
		padding: 8,
	},
	removeText: {
		fontSize: 18,
		opacity: 0.5,
	},
});
