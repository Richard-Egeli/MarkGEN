import { JSDOM } from 'jsdom';
import fs from 'fs';
import DOMElement from '../types/element';
import { compileElements, compileScripts, getScriptDirPaths } from './helper';
import { dirname } from 'path';
import { generateInlineCSS } from '../utils/generator';
import { CSS } from '../types';
import { compilationOpts as opts } from '../config';

class DOM {
  private static dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    runScripts: 'dangerously',
    resources: 'usable',
  });

  public static window = this.dom.window;
  public static document = this.dom.window.document;
  private static elements: DOMElement<any>[] = [];
  private static scripts = this.document.createDocumentFragment();
  private static styles = this.document.createElement('style');

  public static addDOMElement = (element: DOMElement<any>): number =>
    this.elements.push(element);

  public static addGlobalStyle = (code: CSS) => {
    this.styles.innerHTML = this.styles.innerHTML + generateInlineCSS(code);
  };

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

  public static save = (path: string) => {
    this.compileElements();
    this.compileScripts();

    opts.compileCss && this.document.head.appendChild(this.styles);
    opts.compileScripts && this.document.body.appendChild(this.scripts);

    fs.writeFileSync(path, this.dom.serialize());
  };
}

export default DOM;
