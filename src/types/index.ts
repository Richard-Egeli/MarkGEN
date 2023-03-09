export * from './dom-component';

export type StyleSheet = Partial<ElementCSSInlineStyle['style']>;
export type CSS = StyleSheet | Record<string, StyleSheet>;

export interface FileInfo {
  name: string;
  directory: string;
}

export interface PageInfo {
  path: string;
  title: string;
  content: string;
  files: FileInfo[];
  subPages: PageInfo[];
}

export interface Directory {
  name: string;
  path: string;
  page: string;
  subDirectories: Directory[];
  files: string[];
}
