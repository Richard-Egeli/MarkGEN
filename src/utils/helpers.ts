import { PageInfo } from '../types';
import config from '../config';
import fs from 'fs';
import path = require('path');

export const compileAssets = (path = `${config.baseDir}/${config.srcDir}`) => {
  const assetPath = `${config.baseDir}/${config.outDir}/${config.assetDir}`;
  if (!fs.existsSync(assetPath)) {
    fs.mkdirSync(assetPath, { recursive: true });
  }

  fs.readdirSync(path, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.isDirectory()) {
      if (dirent.name === config.assetDir) {
        fs.readdirSync(`${path}/${dirent.name}`, {
          withFileTypes: true,
        }).forEach((file) => {
          if (file.isFile()) {
            fs.copyFileSync(
              `${path}/${dirent.name}/${file.name}`,
              `${config.baseDir}/${config.outDir}/${config.assetDir}/${file.name}`
            );
          }
        });
      } else {
        compileAssets(`${path}/${dirent.name}`);
      }
    }
  });
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
      } else if (config.extensions.includes(dirent.name.split('.').pop())) {
        page.files.push({
          name: dirent.name,
          directory: dir,
        });
      }
    }
  });

  return page;
};
