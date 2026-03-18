import { View, type ViewProps } from 'react-native';

import { Shadows } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
	variant?: 'background' | 'surface' | 'raised' | 'glass';
	elevated?: boolean;
};

export function ThemedView({
	style,
	lightColor,
	darkColor,
	variant = 'background',
	elevated = false,
	...otherProps
}: ThemedViewProps) {
	const colorKey =
		variant === 'surface'
			? 'surface'
			: variant === 'raised'
				? 'surfaceRaised'
				: variant === 'glass'
					? 'glass'
					: 'background';
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		colorKey,
	);

	return (
		<View
			style={[
				{ backgroundColor },
				elevated ? Shadows.soft : undefined,
				style,
			]}
			{...otherProps}
		/>
	);
}
