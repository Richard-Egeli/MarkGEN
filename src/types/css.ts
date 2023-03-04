export type InlineStyle = Partial<ElementCSSInlineStyle['style']>;
export type CSS = InlineStyle | Record<string, InlineStyle>;
