import { Directory } from '../types';
import fs from 'fs';

export const getDirectoriesNew = (
  path: string,
  extensions: string[]
): Directory => {
  return fs.readdirSync(path, { withFileTypes: true }).reduce(
    (dir, dirent) => {
      if (dirent.isDirectory()) {
        dir.subDirectories.push(
          getDirectoriesNew(`${path}/${dirent.name}`, extensions)
        );
      } else if (dirent.name.split('.').pop() === 'md') {
        dir.page = dirent.name;
      } else {
        if (extensions.includes(dirent.name.split('.').pop() as string)) {
          dir.files.push(dirent.name);
        }
      }

      return dir;
    },
    {
      name: path.split('/').pop(),
      path,
      subDirectories: [],
      files: [],
    } as Directory
  );
};

export const getDirectories = (
  path: string,
  extensions: string[],
  depth: number = 0
): Directory[] => {
  return fs.readdirSync(path, { withFileTypes: true }).reduce(
    (dirs, dirent) => {
      if (dirent.isDirectory()) {
        dirs.push(
          ...getDirectories(`${path}/${dirent.name}`, extensions, depth + 1)
        );
      } else {
        if (extensions.includes(dirent.name.split('.').pop() as string)) {
          const dir = dirs.find((d) => d.path === path);
          if (dir) dir.files.push(dirent.name);
        }
      }

      return dirs;
    },
    (depth !== 0
      ? [
          {
            path,
            name: path.split('/').pop(),
            subDirectories: [],
            files: [],
          },
        ]
      : []) as Directory[]
  );
};
