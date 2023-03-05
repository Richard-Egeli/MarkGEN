import { Directory } from '../types';
import fs from 'fs';

export const getDirectories = (
  path: string,
  extensions: string[]
): Directory[] => {
  return fs.readdirSync(path, { withFileTypes: true }).reduce(
    (dirs, dirent) => {
      if (dirent.isDirectory()) {
        dirs.push(...getDirectories(`${path}/${dirent.name}`, extensions));
      } else {
        if (extensions.includes(dirent.name.split('.').pop() as string)) {
          const dir = dirs.find((d) => d.path === path);
          if (dir) dir.files.push(dirent.name);
        }
      }

      return dirs;
    },
    [
      {
        path,
        name: path.split('/').pop(),
        files: [],
      },
    ]
  );
};
