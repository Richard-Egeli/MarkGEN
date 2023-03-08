import DOM from '../../dom';
import DOMComponent from '../../types/dom-component';
import { color } from '../../config';

DOM.addGlobalStyle({
  '.dropdown-folder-container': {
    display: 'flex',
    alignItems: 'center',
    marginTop: '8px',
  },

  '.dropdown-folder-container-button': {
    display: 'flex',
    alignItems: 'center',
    color: color.text,
    width: '100%',
    height: '32px',
    border: 'none',
    textAlign: 'left',
    padding: '8px',
    fontWeight: 'bold',
    fontSize: '12px',
    backgroundColor: color.buttonPrimary,
  },

  '.dropdown-folder-container-button:hover': {
    backgroundColor: color.buttonSecondary,
  },

  '.dropdown-folder-container-icon-chevron': {
    transform: 'rotate(0deg)',
    transition: 'transform 0.2s ease-in-out',
    color: color.text,
  },

  '.dropdown-folder-container-icon-button': {
    borderRight: `1px solid ${color.border}`,
    display: 'flex',
    alignItems: 'center',
    color: color.text,
    padding: '8px',
    borderTop: 'none',
    borderLeft: 'none',
    borderBottom: 'none',
    backgroundColor: color.buttonPrimary,
  },

  '.dropdown-folder-container-icon-button:hover': {
    backgroundColor: color.buttonSecondary,
  },
});

class DropdownFolder extends DOMComponent<'div'> {
  public iconButton: DOMComponent<'button'>;
  public button: DOMComponent<'button'>;
  public icon: DOMComponent<'img'>;
  public text: DOMComponent<'span'>;

  constructor(path: string, depth: number) {
    super('div');

    this.className = 'dropdown-folder-container';
    this.id = path + this.makeID();

    this.icon = new DOMComponent('img');
    this.text = new DOMComponent('span');
    this.button = new DOMComponent('button');
    this.iconButton = new DOMComponent('button');

    this.iconButton.className = this.className + '-icon-button';
    this.iconButton.element.style.paddingLeft = `${depth * 10}px`;

    this.button.className = this.className + '-button';
    this.button.id = this.id + '-button';

    this.icon.className = this.className + '-icon-chevron';
    this.icon.id = this.id + '-icon-chevron';
    this.icon.element.src = 'assets/chevron.svg';

    this.text.className = this.className + '-button-text';
    this.text.element.textContent = path.split('-').pop().toUpperCase();

    this.iconButton.appendChild(this.icon);
    this.button.appendChild(this.text);

    this.appendChild(this.iconButton);
    this.appendChild(this.button);
  }
}

export default DropdownFolder;
