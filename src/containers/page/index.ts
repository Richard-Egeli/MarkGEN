import DOM from '../../dom';
import DOMComponent from '../../types/dom-component';
import { marked } from 'marked';
import fs from 'fs';
import hljs from 'highlight.js';
import config from '../../config';
import path = require('path');
import { Directory } from '../../types';
import Sidebar from '../sidebar';

DOM.addGlobalStyle({
  '.page': {
    position: 'absolute',
    top: '0',
    left: '300px',
    width: 'calc(100% - 300px)',
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
});

const codeStylePath = path.join(
  config.baseDir,
  '/node_modules/highlight.js/styles/'
);

class Page extends DOMComponent<'div'> {
  directory: Directory;

  constructor(directory: Directory) {
    super('div');
    this.className = 'page';
    this.directory = directory;

    const pagePath = path.join(config.baseDir, directory.path, directory.page);
    const value = fs.readFileSync(pagePath, 'utf8');
    const md = marked(value);

    this.element.innerHTML = md;
    this.addExternalCSS(path.join(codeStylePath, config.codeTheme + '.css'));
    this.element.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }
}

export default Page;
