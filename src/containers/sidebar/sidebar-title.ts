import config from '../../config';
import { DOMComponent } from '../../dom';
import { CSS } from '../../types';
import { color } from '../../config';

const globalStyles: CSS = {
  '#sidebar-title-button': {
    textDecoration: 'none',
    display: 'block',
    width: '90%',
    margin: '0 auto',
    cursor: 'pointer',
  },

  '#sidebar-title-button:hover': {
    textDecoration: 'none',
    opacity: '0.8',
  },

  '#sidebar-title': {
    color: color.title,
    padding: '15px 10px',
    margin: '0px',
    textDecoration: 'none',
    border: 'none',
  },
};

export class SidebarTitle extends DOMComponent<'a'> {
  constructor() {
    super('a');

    const title: DOMComponent<'h4'> = this.addComponent('h4');

    this.id = 'sidebar-title-button';
    this.element.href = './index.html';

    title.id = 'sidebar-title';
    title.textContent = config.project;

    this.addGlobalStyles(globalStyles);
  }
}
