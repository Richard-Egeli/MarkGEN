export type StyleSheet = Partial<ElementCSSInlineStyle['style']>;
export type CSS = StyleSheet | Record<string, StyleSheet>;
