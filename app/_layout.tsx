import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { GlobalCountdownBanner } from '@/src/shared/components/GlobalCountdownBanner';
import { useCountdownTick } from '@/src/shared/hooks/useCountdownTick';

export const unstable_settings = {
	anchor: '(tabs)',
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	useCountdownTick();
	const theme = Colors[colorScheme ?? 'light'];
	const statusBarStyle = colorScheme === 'dark' ? 'light' : 'dark';

	return (
		<View style={[styles.container, { backgroundColor: theme.background }]}>
			<SafeAreaView
				style={{
					backgroundColor: theme.background,
				}}
				edges={['top']}
			/>
			<GlobalCountdownBanner />
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="(tabs)" />
			</Stack>
			<StatusBar style={statusBarStyle} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
