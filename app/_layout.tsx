import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { GlobalCountdownBanner } from '@/src/shared/components/GlobalCountdownBanner';
import { useCountdownTick } from '@/src/shared/hooks/useCountdownTick';
import { useCountdownStore } from '@/src/store/countdownStore';

export const unstable_settings = {
	anchor: '(tabs)',
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	useCountdownTick();
	const hasEntries = useCountdownStore((s) => s.entries.length > 0);
	const theme = Colors[colorScheme ?? 'light'];

	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView
				style={{
					backgroundColor: hasEntries ? theme.tint : theme.background,
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
				<Stack.Screen
					name="modal"
					options={{ presentation: 'modal', title: 'Modal' }}
				/>
			</Stack>
			<StatusBar style="auto" />
		</View>
	);
}
