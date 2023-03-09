import { color } from '../../config';
import { DOMComponent } from '../../dom';
import { CSS } from '../../types';

const defaultGlobalStyles: CSS = {
  '.sidebar-footer': {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '0',
    width: '100%',
    textAlign: 'center',
    backgroundColor: color.primary,
    borderTop: `1px solid ${color.border}`,
  },

  '.sidebar-footer a': {
    color: color.secondary,
    fontWeight: 'bold',
    paddingLeft: '4px',
  },

  '.sidebar-link': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
};

export class SidebarFooter extends DOMComponent<'div'> {
  constructor() {
    super('div');

    this.className = 'sidebar-footer';
    this.addGlobalStyles(defaultGlobalStyles);

    const builtWith: DOMComponent<'p'> = this.addComponent('p');
    builtWith.textContent = 'Built with ';

    const link: DOMComponent<'a'> = this.addComponent('a');
    link.textContent = ' MarkGEN';
    link.element.href = 'https://github.com/Richard-Egeli/MarkGEN';
  }
}

export default SidebarFooter;
