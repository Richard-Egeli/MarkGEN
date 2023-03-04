import fs from 'fs';
import path from 'path';

export interface Directory {
  name: string;
  path: string;
  directories: Directory[];
  files: string[];
}

export const getDirectories = (
  path: string,
  extensions: string[]
): Directory => {
  const dir: Directory = {
    path,
    name: path.split('/').pop() || 'undefined',
    directories: [],
    files: [],
  };

  fs.readdirSync(path, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.isDirectory()) {
      dir.directories.push(
        getDirectories(`${path}/${dirent.name}`, extensions)
      );
    } else {
      if (extensions.includes(dirent.name.split('.').pop() as string))
        dir.files.push(dirent.name);
    }
  });

  return dir;
};

export const getScriptDirPaths = (path: string): string[] => {
  const dirs: string[] = [];
  fs.readdirSync(path, { withFileTypes: true }).map((dirent) => {
    if (dirent.isDirectory()) {
      if (dirent.name === 'scripts') {
        dirs.push(`${path}/${dirent.name}`);
      } else {
        dirs.push(...getScriptDirPaths(`${path}/${dirent.name}`));
      }
    }
  });

  return dirs;
};
