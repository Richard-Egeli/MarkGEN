import fs from 'fs';
import DOM from '.';
import DOMElement from '../types/element';

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
export const compileElements = (
  elements: DOMElement<any>[]
): DocumentFragment => {
  const fragment = DOM.document.createDocumentFragment();

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
