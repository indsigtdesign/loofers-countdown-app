import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const theme = Colors[colorScheme ?? 'light'];

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.tabIconSelected,
				tabBarInactiveTintColor: theme.tabIconDefault,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarLabelPosition: 'below-icon',
				tabBarStyle: [
					styles.tabBar,
					{
						backgroundColor: theme.glass,
						borderColor: theme.border,
					},
				],
				tabBarIconStyle: styles.tabBarIcon,
				tabBarLabelStyle: styles.tabBarLabel,
				tabBarItemStyle: styles.tabBarItem,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Create',
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="timer" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: 'Countdowns',
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name="list.bullet"
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		position: 'absolute',
		borderTopLeftRadius: 22,
		borderTopRightRadius: 22,
		borderWidth: 1,
		height: 80,
		left: 0,
		right: 0,
		bottom: 0,
		paddingBottom: 12,
		paddingTop: 10,
	},
	tabBarItem: {
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabBarIcon: {
		alignSelf: 'center',
		marginBottom: 1,
	},
	tabBarLabel: {
		fontSize: 12,
		fontWeight: '600',
		letterSpacing: 0.2,
		textAlign: 'center',
	},
});
