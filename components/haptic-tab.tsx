import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { StyleSheet } from 'react-native';

export function HapticTab(props: BottomTabBarButtonProps) {
	return (
		<PlatformPressable
			{...props}
			onPressIn={(ev) => {
				if (process.env.EXPO_OS === 'ios') {
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				}
				props.onPressIn?.(ev);
			}}
			style={(state) => {
				const base =
					typeof props.style === 'function'
						? props.style(state)
						: props.style;

				return [
					base,
					styles.base,
					state.pressed ? styles.pressed : undefined,
				];
			}}
		/>
	);
}

const styles = StyleSheet.create({
	base: {},
	pressed: {
		opacity: 0.9,
		transform: [{ scale: 0.96 }],
	},
});
