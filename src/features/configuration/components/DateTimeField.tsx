import DateTimePicker, {
	type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
	value: Date;
	onChange: (date: Date) => void;
	onSpinningChange?: (spinning: boolean) => void;
};

export const DateTimeField = ({ value, onChange, onSpinningChange }: Props) => {
	const spinningRef = useRef(false);

	const setSpinning = useCallback(
		(spinning: boolean) => {
			if (spinningRef.current !== spinning) {
				spinningRef.current = spinning;
				onSpinningChange?.(spinning);
			}
		},
		[onSpinningChange],
	);

	const handleTouchStart = useCallback(() => {
		setSpinning(true);
	}, [setSpinning]);

	const handleChange = (event: DateTimePickerEvent, nextValue?: Date) => {
		if (event.type === 'dismissed' || !nextValue) return;
		setSpinning(false);
		onChange(nextValue);
	};

	return (
		<View style={styles.card}>
			<View onTouchStart={handleTouchStart}>
				<DateTimePicker
					value={value}
					mode="datetime"
					display="spinner"
					minimumDate={new Date()}
					onChange={handleChange}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		padding: 16,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: '#d0d5dd',
		gap: 12,
	},
	fieldButton: {
		paddingHorizontal: 14,
		paddingVertical: 12,
		borderRadius: 12,
		backgroundColor: '#f4f8fb',
	},
	fieldLabel: {
		fontSize: 12,
		opacity: 0.65,
		textTransform: 'uppercase',
	},
});
