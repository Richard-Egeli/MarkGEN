export * from './dom-component';

export type StyleSheet = Partial<ElementCSSInlineStyle['style']>;
export type CSS = StyleSheet | Record<string, StyleSheet>;

export interface Directory {
  name: string;
  path: string;
  subDirectories: Directory[];
  files: string[];
}
