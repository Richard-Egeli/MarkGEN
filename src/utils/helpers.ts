import { Directory, PageInfo } from '../types';
import config from '../config';
import fs from 'fs';
import path = require('path');

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

const pageMerge = (page: PageInfo, toMerge: PageInfo): PageInfo => {
  page.files = page.files.concat(toMerge.files);
  page.subPages = page.subPages.concat(toMerge.subPages);
  return page;
};

const pageExists = (dir: string) => {
  const p = path.join(config.baseDir, dir);

  return fs
    .readdirSync(p, { withFileTypes: true })
    .find((dirent) => dirent.name.split('.').pop() === 'md');
};

export const getPageInfo = (dir: string): PageInfo => {
  const page: PageInfo = {
    path: dir,
    title: '',
    content: '',
    files: [],
    subPages: [],
  };

  const p = path.join(config.baseDir, dir);
  fs.readdirSync(p, { withFileTypes: true }).map((dirent) => {
    if (dirent.isDirectory()) {
      const newPage = getPageInfo(`${dir}/${dirent.name}`);

      if (pageExists(`${dir}/${dirent.name}`)) {
        page.subPages.push(newPage);
      } else {
        pageMerge(page, newPage);
      }
    } else {
      if (dirent.name.split('.').pop() === 'md') {
        page.content = fs.readFileSync(`${p}/${dirent.name}`, 'utf8');
        page.title = dirent.name.split('.').shift() as string;
      } else {
        page.files.push({
          name: dirent.name,
          directory: dir,
        });
      }
    }
  });

  return page;
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
