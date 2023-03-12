import DOMComponent from '../../dom/dom-component';
import { color } from '../../config';
import { CSS } from '../../types';

const globalStyles: CSS = {
  '.dropdown-nav': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '36px',
    textDecoration: 'none',
    color: color.text,
  },

  '.dropdown-nav:hover': {
    backgroundColor: color.buttonSecondary,
  },

  '.dropdown-nav-icon': {
    height: '36px',
    width: '36px',
    padding: '8px',
  },

  '.dropdown-nav-text': {
    paddingLeft: '8px',
    fontSize: '14px',
  },

  '.dropdown-nav-last': {
    borderBottom: `1px solid ${color.border}`,
  },
};

class DropdownNav extends DOMComponent<'a'> {
  constructor(element: Element) {
    super('a');

    this.className = 'dropdown-nav';
    this.element.href = `#${element.id}`;
    this.addGlobalStyles(globalStyles);

    const icon: DOMComponent<'img'> = this.addComponent('img');
    const text: DOMComponent<'p'> = this.addComponent('p');

    icon.className = 'dropdown-nav-icon';
    icon.element.src = 'assets/plus.svg';

    text.className = 'dropdown-nav-text';
    text.element.innerHTML = element.innerHTML;
  }
}

export default DropdownNav;
