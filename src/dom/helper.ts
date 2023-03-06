import fs from 'fs';
import DOM from '.';
import config from '../config';
import DOMComponent from '../types/dom-component';

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

/** Compile DOM elements into a document fragment
 *
 * @param elements Array of DOM elements
 * @returns Document fragment containing compiled elements
 */
export const compileElements = (elements: DOMComponent<any>[]): HTMLElement => {
  const fragment = DOM.document.createElement('div');

  elements.forEach((element) => {
    fragment.appendChild(element.compile());
  });

  return fragment;
};

/** Retrieve script files to inline into the html file
 *
 * @param path Array of paths to directories containing scripts
 */
export const compileScripts = (path: string[]) => {
  path.forEach((p) => {
    fs.readdirSync(p, { withFileTypes: true }).forEach((dirent) => {
      if (dirent.isFile()) {
        const code = fs.readFileSync(`${p}/${dirent.name}`, 'utf8');
        DOM.addGlobalScript(code);
      }
    });
  });
};

export const compileAssets = (path: string) => {
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
