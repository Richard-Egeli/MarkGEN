import DOMComponent from '../../types/dom-component';
import { color } from '../../config';
import { CSS } from '../../types';

// DOM.addGlobalStyle({
//   '.dropdown-file-button': {
//     display: 'flex',
//     alignItems: 'center',
//     color: color.text,
//     width: '100%',
//     minHeight: '32px',
//     border: 'none',
//     textDecoration: 'none',
//     backgroundColor: color.buttonPrimary,
//   },

//   '.dropdown-file-button:hover': {
//     backgroundColor: color.buttonSecondary,
//   },

//   '.dropdown-file-text': {
//     paddingLeft: '8px',
//   },
// });

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

    const icon = new DOMComponent('img');
    icon.className = 'dropdown-nav-icon';
    icon.element.src = 'assets/plus.svg';
    this.appendChild(icon);

    const text = new DOMComponent('p');
    text.className = 'dropdown-nav-text';
    text.element.innerHTML = element.innerHTML;
    this.appendChild(text);
  }

  override compile() {
    this.addGlobalStyles(globalStyles);

    return super.compile();
  }
}

export default DropdownNav;
