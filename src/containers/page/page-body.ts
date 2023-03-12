import hljs from 'highlight.js';
import { marked } from 'marked';
import { DOMComponent } from '../../dom';

const defaultGlobalStyles = {
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

export class PageBody extends DOMComponent<'div'> {
  constructor(content: string) {
    super('div');

    this.className = 'markdown-body';
    this.element.innerHTML = marked(content);
    this.element.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });

    this.addGlobalStyles(defaultGlobalStyles);
  }
}
