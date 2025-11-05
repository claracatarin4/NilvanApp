// O 'as const' garante que 'regular', 'medium', etc., são tipos string literal.
export const FONTS = {
    regular: 'System',
    medium: 'System',
    bold: 'System',
} as const;

// O 'as const' garante que os tamanhos são tipos numéricos literais (por exemplo, 12, 14, 16...).
export const FONT_SIZES = {
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 18,
    xxlarge: 24,
    title: 28,
} as const;

// (Opcional, mas útil) Tipos de união que podem ser exportados:
export type Font = typeof FONTS[keyof typeof FONTS];
export type FontSizeKey = keyof typeof FONT_SIZES;