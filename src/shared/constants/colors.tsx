export const COLORS = {
    primary: '#1E2B5C',
    secondary: '#E8344E',
    warning: '#FFCC00',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    mediumGray: '#E0E0E0',
    darkGray: '#666666',
    text: '#333333',
    textLight: '#999999',
    border: '#DDDDDD',
    background: '#FFFFFF',
    backgroundLight: "#F0F0F0",
} as const;
export type Colors = typeof COLORS;
export type ColorKey = keyof typeof COLORS;