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
