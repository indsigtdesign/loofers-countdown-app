import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?:
		| 'default'
		| 'title'
		| 'defaultSemiBold'
		| 'subtitle'
		| 'link'
		| 'headline'
		| 'bodySm'
		| 'label'
		| 'eyebrow'
		| 'mono'
		| 'button';
	tone?: 'default' | 'muted' | 'accent' | 'inverted' | 'danger' | 'success';
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = 'default',
	tone = 'default',
	...rest
}: ThemedTextProps) {
	const toneColor =
		tone === 'muted'
			? 'textMuted'
			: tone === 'accent'
				? 'accent'
				: tone === 'inverted'
					? 'textInverted'
					: tone === 'danger'
						? 'danger'
						: tone === 'success'
							? 'success'
							: 'text';
	const color = useThemeColor(
		{ light: lightColor, dark: darkColor },
		toneColor,
	);

	return (
		<Text
			style={[
				{ color },
				type === 'default' ? styles.default : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				type === 'link' ? styles.link : undefined,
				type === 'headline' ? styles.headline : undefined,
				type === 'bodySm' ? styles.bodySm : undefined,
				type === 'label' ? styles.label : undefined,
				type === 'eyebrow' ? styles.eyebrow : undefined,
				type === 'mono' ? styles.mono : undefined,
				type === 'button' ? styles.button : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: Fonts.sans,
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '600',
		fontFamily: Fonts.sans,
	},
	title: {
		fontSize: 38,
		lineHeight: 42,
		fontWeight: '700',
		letterSpacing: -0.5,
		fontFamily: Fonts.rounded,
	},
	subtitle: {
		fontSize: 20,
		lineHeight: 26,
		fontWeight: '700',
		fontFamily: Fonts.rounded,
	},
	headline: {
		fontSize: 26,
		lineHeight: 32,
		fontWeight: '700',
		fontFamily: Fonts.rounded,
	},
	bodySm: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: Fonts.sans,
	},
	label: {
		fontSize: 13,
		lineHeight: 18,
		fontWeight: '600',
		fontFamily: Fonts.sans,
	},
	eyebrow: {
		fontSize: 11,
		lineHeight: 16,
		fontWeight: '600',
		textTransform: 'uppercase',
		letterSpacing: 1,
		fontFamily: Fonts.sans,
	},
	mono: {
		fontFamily: Fonts.mono,
		fontVariant: ['tabular-nums'],
	},
	button: {
		fontSize: 15,
		lineHeight: 20,
		fontWeight: '700',
		letterSpacing: 0.2,
		fontFamily: Fonts.sans,
	},
	link: {
		lineHeight: 24,
		fontSize: 16,
		fontWeight: '600',
		textDecorationLine: 'underline',
		fontFamily: Fonts.sans,
	},
});
