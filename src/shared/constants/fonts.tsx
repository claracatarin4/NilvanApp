export const FONTS = {
    regular: 'System',
    medium: 'System',
    bold: 'System',
} as const;

export const FONT_SIZES = {
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 18,
    xxlarge: 24,
    title: 28,
} as const;

export type Font = typeof FONTS[keyof typeof FONTS];
export type FontSizeKey = keyof typeof FONT_SIZES;