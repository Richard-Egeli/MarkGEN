import DOMComponent from '../../dom/dom-component';
import { DOMFactory } from '../../dom';

import fs from 'fs';
import path from 'path';
import hljs from 'highlight.js';
import config from '../../config';

import { JSDOM } from 'jsdom';
import { marked } from 'marked';
import { PageInfo, CSS } from '../../types';
import { generateInlineCSS } from '../../utils/generator';
import Sidebar from '../sidebar';
import { PageBody } from './page-body';

const globalStyles: CSS = {
  '*': {
    boxSizing: 'border-box',
  },

  '.page': {
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '100%',
    margin: '0',
    fontFamily: 'sans-serif',
    padding: '10px 40px',
    overflow: 'auto',
  },

  '.hljs': {
    whiteSpace: 'pre',
    overflowX: 'auto',
  },

  '.markdown-body': {
    position: 'absolute',
    right: '0',
    top: '0',
    fontFamily: 'sans-serif',
    width: 'calc(100% - 280px)',
    height: '100%',
    padding: '10px 40px',
  },
};

const codeStylePath = path.join(
  config.baseDir,
  '/node_modules/highlight.js/styles/'
);

class Page {
  path: string;
  title: string;
  sidebar: Sidebar;
  content: DOMComponent<'div'>;
  dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost',
  });

  window = this.dom.window;
  document = this.window.document;
  body = this.document.body;
  head = this.document.head;

  globalScripts = DOMFactory.createDocumentFragment();
  globalStyles = DOMFactory.createElement('style');

  constructor(info: PageInfo, sidebar: Sidebar) {
    this.path = info.path;
    this.sidebar = sidebar;
    this.title = info.title;

    this.content = new PageBody(info.content);
    this.appendChild(this.content);
    // this.content.className = 'markdown-body';
    // this.content.element.innerHTML = marked(info.content);
    // this.content.element.querySelectorAll('pre code').forEach((block) => {
    //   hljs.highlightElement(block as HTMLElement);
    // });

    // this.appendChild(this.content);
    this.addGlobalStyles(globalStyles);
    this.head.appendChild(this.globalStyles);
    this.addExternalGlobalCSS(
      path.join(codeStylePath, config.codeTheme + '.css')
    );
  }

  public addGlobalStyles = (code: CSS | string) => {
    switch (typeof code) {
      case 'string':
        this.globalStyles.innerHTML += code;
        break;
      case 'object':
        this.globalStyles.innerHTML += generateInlineCSS(code);
        break;
    }
  };

  public addExternalGlobalCSS = (path: string) => {
    this.addGlobalStyles(fs.readFileSync(path, 'utf8'));
  };

  public addGlobalScript = (code: string) => {
    const script = DOMFactory.createElement('script');

    script.innerHTML = `{${code}}`;
    this.globalScripts.appendChild(script);
  };

  public appendChild = (child: DOMComponent<any>) => {
    child.page = this;
    this.body.appendChild(child.render());
  };

  public setSessionParam = (name: string, value: any) => {
    this.dom?.window?.sessionStorage?.setItem(name, value);
  };

  public getSessionParam = (name: string): any => {
    return this.dom?.window?.sessionStorage?.getItem(name);
  };

  public serialize() {
    // Add styles to head
    this.head.appendChild(this.globalStyles);

    // Add scripts to body
    this.body.appendChild(this.globalScripts);

    // Serialize
    const file = this.dom.serialize();
    fs.writeFileSync(path.join(config.outDir, this.title + '.html'), file);
  }
}

export default Page;
