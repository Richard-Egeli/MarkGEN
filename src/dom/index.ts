import { JSDOM } from 'jsdom';
import fs from 'fs';
import DOMComponent from '../types/dom-component';
import {
  compileAssets,
  compileElements,
  compileScripts,
  getScriptDirPaths,
} from './helper';
import path, { dirname } from 'path';
import { generateInlineCSS } from '../utils/generator';
import { CSS } from '../types';
import config, { compilationOpts as opts } from '../config';
import Page from '../containers/page';

class DOM {
  private static dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost',
  });

  public static window = this.dom.window;
  public static document = this.dom.window.document;
  private static elements: DOMComponent<any>[] = [];
  private static scripts = this.document.createDocumentFragment();
  private static styles = this.document.createElement('style');

  public static addDOMElement = (element: DOMComponent<any>): number =>
    this.elements.push(element);

  public static addGlobalStyle = (code: CSS | string) => {
    switch (typeof code) {
      case 'string':
        this.styles.innerHTML += code;
        break;
      case 'object':
        this.styles.innerHTML += generateInlineCSS(code);
        break;
    }
  };

  public static setSessionParam = (name: string, value: any) => {
    DOM?.window?.sessionStorage?.setItem(name, value);
  };

  public static getSessionParam = (name: string): any => {
    return DOM?.window?.sessionStorage?.getItem(name);
  };

  public static addGlobalScript = (code: string) => {
    const script = this.document.createElement('script');

    script.innerHTML = `{${code}}`;
    this.scripts.appendChild(script);
  };

  public static compileAssets = () => {
    const path = config.baseDir + '/' + config.srcDir;
    compileAssets(config.baseDir + '/' + config.srcDir);
  };

  public static compileElements = () => {
    this.document.body.appendChild(compileElements(this.elements));
  };

  public static compileScripts = () => {
    const root = dirname(require.main?.filename || '');
    const paths = getScriptDirPaths(root);
    compileScripts(paths);
  };

  // public static savePage = (page: Page) => {
  //   DOM.addDOMElement(page);
  //   console.log('Saving page: ' + page.title);

  //   this.compileElements();
  //   this.compileScripts();

  //   opts.compileCss && this.document.head.appendChild(this.styles);
  //   opts.compileScripts && this.document.body.appendChild(this.scripts);

  //   fs.writeFileSync(
  //     path.join(config.outDir + '/' + page.title + '.html'),
  //     this.dom.serialize()
  //   );

  //   this.elements = [];
  //   this.scripts = this.document.createDocumentFragment();
  //   this.styles = this.document.createElement('style');
  //   this.dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
  //     runScripts: 'dangerously',
  //     resources: 'usable',
  //     url: 'http://localhost',
  //   });
  // };

  public static save = (buildFolder: string) => {
    this.compileElements();
    this.compileScripts();

    opts.compileCss && this.document.head.appendChild(this.styles);
    opts.compileScripts && this.document.body.appendChild(this.scripts);

    fs.writeFileSync(buildFolder, this.dom.serialize());
  };
}

export default DOM;
