import DOM from '../../dom';
import DOMComponent from '../../types/dom-component';
import { color } from '../../config';

DOM.addGlobalStyle({
  '.dropdown-file-button': {
    display: 'flex',
    alignItems: 'center',
    color: color.text,
    width: '100%',
    height: '32px',
    border: 'none',
    borderBottom: `1px solid ${color.border}`,
    backgroundColor: color.buttonSecondary,
    marginBottom: '8px',
  },

  '.dropdown-file-button:hover': {
    backgroundColor: color.buttonTertiary,
  },

  '.dropdown-file-text': {
    paddingLeft: '8px',
  },
});

class DropdownFile extends DOMComponent<'button'> {
  constructor(fileName: string, depth: number) {
    super('button');

    this.className = 'dropdown-file-button';

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
      paddingLeft: `${depth * 10 + 16}px`,
    });
  }
}

export default DropdownFile;
