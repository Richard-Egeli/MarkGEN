import DOM from '../../dom';
import DOMComponent from '../../types/dom-component';
import { color } from '../../config';

DOM.addGlobalStyle({
  '.dropdown-file-button': {
    display: 'flex',
    alignItems: 'center',
    color: color.text,
    width: '100%',
    minHeight: '32px',
    border: 'none',
    textDecoration: 'none',
    backgroundColor: color.buttonPrimary,
  },

  '.dropdown-file-button:hover': {
    backgroundColor: color.buttonSecondary,
  },

  '.dropdown-file-text': {
    paddingLeft: '8px',
  },
});

class DropdownFile extends DOMComponent<'a'> {
  constructor(fileName: string, depth: number) {
    super('a');

    this.className = 'dropdown-file-button';
    this.element.href = './test.html';

    const icon = new DOMComponent('img');
    icon.className = 'dropdown-file-icon';
    icon.element.src = 'assets/dash.svg';
    this.appendChild(icon);

    const text = new DOMComponent('span');
    text.className = 'dropdown-file-text';
    text.element.style.paddingLeft = '8px';
    text.element.textContent = fileName;
    this.appendChild(text);

    this.setStyle({
      paddingLeft: `${depth * 10 + 10}px`,
    });
  }
}

export default DropdownFile;
