/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#a44a2a';
const tintColorDark = '#e0865f';

export const Colors = {
	light: {
		text: '#2e2118',
		textMuted: '#756356',
		textInverted: '#fff8f0',
		background: '#f6efe5',
		backgroundMuted: '#efe3d3',
		surface: '#fff8f0',
		surfaceRaised: '#fffcf7',
		glass: 'rgba(255, 252, 247, 0.86)',
		border: '#dcc9b4',
		borderStrong: '#b49479',
		tint: tintColorLight,
		accent: '#a44a2a',
		accentSoft: '#ecd8c8',
		accentStrong: '#7d351b',
		danger: '#b5472f',
		success: '#3d7a4e',
		warning: '#a26727',
		icon: '#8a7a6e',
		tabIconDefault: '#8a7a6e',
		tabIconSelected: tintColorLight,
		tabBar: '#f2e6d8',
		banner: '#7d351b',
	},
	dark: {
		text: '#f7eadb',
		textMuted: '#c7b4a5',
		textInverted: '#1f1713',
		background: '#1f1713',
		backgroundMuted: '#2a201a',
		surface: '#2b211c',
		surfaceRaised: '#3a2b23',
		glass: 'rgba(58, 43, 35, 0.84)',
		border: '#5a4436',
		borderStrong: '#7c5e4a',
		tint: tintColorDark,
		accent: '#e0865f',
		accentSoft: '#4a2f22',
		accentStrong: '#ffb38f',
		danger: '#ef876b',
		success: '#73be8c',
		warning: '#e9ad68',
		icon: '#bfae9f',
		tabIconDefault: '#bfae9f',
		tabIconSelected: tintColorDark,
		tabBar: '#2a201a',
		banner: '#d1724e',
	},
};

export const Spacing = {
	xs: 6,
	sm: 10,
	md: 16,
	lg: 22,
	xl: 30,
	xxl: 40,
} as const;

export const Radii = {
	sm: 10,
	md: 14,
	lg: 20,
	xl: 26,
	pill: 999,
} as const;

export const Shadows = {
	card: {
		shadowColor: '#150d09',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.12,
		shadowRadius: 16,
		elevation: 6,
	},
	soft: {
		shadowColor: '#150d09',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.08,
		shadowRadius: 10,
		elevation: 3,
	},
} as const;

export const Fonts = Platform.select({
	ios: {
		/** iOS `UIFontDescriptorSystemDesignDefault` */
		sans: 'system-ui',
		/** iOS `UIFontDescriptorSystemDesignSerif` */
		serif: 'ui-serif',
		/** iOS `UIFontDescriptorSystemDesignRounded` */
		rounded: 'ui-rounded',
		/** iOS `UIFontDescriptorSystemDesignMonospaced` */
		mono: 'ui-monospace',
	},
	default: {
		sans: 'normal',
		serif: 'serif',
		rounded: 'normal',
		mono: 'monospace',
	},
	web: {
		sans: "'Avenir Next', 'Trebuchet MS', 'Segoe UI', sans-serif",
		serif: "Georgia, 'Times New Roman', serif",
		rounded:
			"'Avenir Next Rounded', 'Arial Rounded MT Bold', 'Segoe UI', sans-serif",
		mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	},
});
