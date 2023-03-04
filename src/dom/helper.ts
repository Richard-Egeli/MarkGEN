import fs from 'fs';
import DOM from '.';
import DOMElement from '../types/element';

export const compileElements = (
  elements: DOMElement<any>[]
): DocumentFragment => {
  const fragment = DOM.document.createDocumentFragment();

  elements.forEach((element) => {
    fragment.appendChild(element.compile());
  });

  return fragment;
};

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
