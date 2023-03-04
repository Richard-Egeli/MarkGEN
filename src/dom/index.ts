import { JSDOM } from 'jsdom';
import fs from 'fs';
import DOMElement from '../types/element';
import { compileElements, compileScripts } from './helper';
import { dirname } from 'path';
import { getScriptDirPaths } from '../helper';

class DOM {
  private static dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    runScripts: 'dangerously',
    resources: 'usable',
  });

  static window = this.dom.window;
  static document = this.dom.window.document;

  private static elements: DOMElement<any>[] = [];
  private static scripts = this.document.createDocumentFragment();

  public static save = (path: string) => {
    this.document.body.appendChild(this.scripts);

    fs.writeFileSync(path, this.dom.serialize());
  };

  public static addDOMElement = (element: DOMElement<any>): number =>
    this.elements.push(element);

  public static addGlobalScript = (code: string) => {
    const script = this.document.createElement('script');

    script.innerHTML = code;
    this.scripts.appendChild(script);
  };

  public static compileElements = () => {
    this.document.body.appendChild(compileElements(this.elements));
  };

  public static compileScripts = () => {
    const root = dirname(require.main?.filename || '');
    const paths = getScriptDirPaths(root);
    compileScripts(paths);
  };
}

export default DOM;
