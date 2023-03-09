import DOMComponent from '../../types/dom-component';
import { marked } from 'marked';
import hljs from 'highlight.js';
import config from '../../config';
import path = require('path');
import { PageInfo, CSS } from '../../types';
import { generateInlineCSS } from '../../utils/generator';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { recursivelySetPage } from './helper';

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
  title: string;
  content: string;
  children: DOMComponent<any>[] = [];
  dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost',
  });

  window = this.dom.window;
  document = this.window.document;
  body = this.document.body;
  head = this.document.head;

  globalScripts = this.createDocumentFragment();
  globalStyles = this.createElement('style');

  constructor(info: PageInfo) {
    this.title = info.title;
    this.content = info.content;
    this.addGlobalStyles(globalStyles);
    this.head.appendChild(this.globalStyles);

    const markupBody = new DOMComponent('div');
    markupBody.className = 'markdown-body';
    markupBody.element.innerHTML = marked(info.content);

    this.addExternalGlobalCSS(
      path.join(codeStylePath, config.codeTheme + '.css')
    );

    markupBody.element.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });

    this.appendChild(markupBody);
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

  public createDocumentFragment() {
    return this.document.createDocumentFragment();
  }

  public createElement<T extends keyof HTMLElementTagNameMap>(
    tag: T
  ): HTMLElementTagNameMap[T] {
    return this.document.createElement(tag) as HTMLElementTagNameMap[T];
  }

  public addExternalGlobalCSS = (path: string) => {
    this.addGlobalStyles(fs.readFileSync(path, 'utf8'));
  };

  public addGlobalScript = (code: string) => {
    const script = this.createElement('script');

    script.innerHTML = `{${code}}`;
    this.globalScripts.appendChild(script);
  };

  public appendChild = (child: DOMComponent<any>) => {
    recursivelySetPage(this, child);
    this.children.push(child);
  };

  public setSessionParam = (name: string, value: any) => {
    this.dom?.window?.sessionStorage?.setItem(name, value);
  };

  public getSessionParam = (name: string): any => {
    return this.dom?.window?.sessionStorage?.getItem(name);
  };

  public serialize() {
    this.head.appendChild(this.globalStyles);

    this.children
      .map((child) => child.compile())
      .forEach((child) => {
        this.body.appendChild(child);
      });

    this.body.appendChild(this.globalScripts);
    const file = this.dom.serialize();

    fs.writeFileSync(path.join(config.outDir, this.title + '.html'), file);
  }
}

export default Page;
