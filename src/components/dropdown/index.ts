import DOMComponent from '../../types/dom-component';
import config, { color } from '../../config';
import DOM from '../../dom';
import { Directory } from '../../types';

DOM.addGlobalStyle({
  '.dropdown-button-container': {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${color.border}`,

    backgroundColor: color.buttonPrimary,
  },

  '.dropdown-button': {
    backgroundColor: color.buttonPrimary,
    display: 'flex',
    alignItems: 'center',
    color: color.text,
    width: '100%',
    height: '32px',
    border: 'none',
    textAlign: 'left',
    padding: '8px',
  },

  '.dropdown-button:hover': {
    backgroundColor: color.buttonSecondary,
  },

  '.dropdown-icon-button': {
    backgroundColor: color.buttonPrimary,
    display: 'flex',
    alignItems: 'center',
    color: color.text,
    padding: '8px 8px',
    border: 'none',
  },

  '.dropdown-icon-button:hover': {
    backgroundColor: color.buttonSecondary,
  },

  '.dropdown-file-button': {
    display: 'flex',
    alignItems: 'center',
    color: color.text,
    width: '100%',
    height: '32px',
    border: 'none',
    borderBottom: `1px solid ${color.border}`,
    backgroundColor: color.buttonSecondary,
  },

  '.dropdown-file-button:hover': {
    backgroundColor: color.buttonTertiary,
  },
});

const menuFunctionality = (buttonId, chevronId, containerId) => {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener('click', () => {
      const chevron = document.getElementById(chevronId);
      const container = document.getElementById(containerId);
      if (chevron && container) {
        if (chevron.style.transform === 'rotate(90deg)') {
          chevron.style.transform = 'rotate(0deg)';
          container.style.display = 'none';
          return;
        }

        chevron.style.transform = 'rotate(90deg)';
        container.style.display = 'block';
      }
    });
  }
};

class Dropdown extends DOMComponent<'div'> {
  private folders: DOMComponent<'div'> = new DOMComponent('div');
  private files: DOMComponent<'div'> = new DOMComponent('div');

  constructor(id?: string, depth: number = 0) {
    super('div');

    const svg = new DOMComponent('img');
    const text = new DOMComponent('span');
    const button = new DOMComponent('button');
    const iconButton = new DOMComponent('button');
    const buttonContainer = new DOMComponent('div');

    this.className = 'dropdown';
    this.id = id + this.makeID();

    this.folders.id = this.id + '-container';
    this.folders.element.style.display = 'none';

    button.className = 'dropdown-button';
    button.id = this.id + '-button';

    iconButton.className = 'dropdown-icon-button';
    iconButton.element.style.paddingLeft = `${depth * 10}px`;

    buttonContainer.className = 'dropdown-button-container';

    svg.id = this.id + '-chevron';
    svg.element.src = 'assets/chevron.svg';
    svg.element.style.transition = 'transform 0.2s ease-in-out';
    svg.element.style.color = color.text;

    text.className = this.className + '-text';
    text.element.style.fontWeight = 'bold';
    text.element.textContent = id.split('-').pop().toUpperCase();

    iconButton.appendChild(svg);
    button.appendChild(text);

    buttonContainer.appendChild(iconButton);
    buttonContainer.appendChild(button);

    this.appendChild(buttonContainer);
    this.appendChild(this.folders);
    this.folders.appendChild(this.files);
    this.addScript(menuFunctionality, {
      buttonId: button.id,
      chevronId: svg.id,
      containerId: this.folders.id,
    });
  }

  public static createDropdownFiles(
    files: string[],
    depth: number = 0
  ): DOMComponent<'button'>[] {
    const body: DOMComponent<'button'>[] = [];

    files.forEach((file) => {
      const f = new DOMComponent('button');
      f.className = 'dropdown-file-button';
      f.element.style.paddingLeft = `${depth * 10 + 16}px`;

      const icon = new DOMComponent('img');
      icon.className = 'dropdown-file-icon';
      icon.element.src = 'assets/dash.svg';
      f.appendChild(icon);

      const text = new DOMComponent('span');
      text.className = 'dropdown-file-text';
      text.element.style.paddingLeft = '8px';
      text.element.textContent = file;

      f.appendChild(text);
      body.push(f);
    });

    return body;
  }

  public static isDirectoryEmpty(directory: Directory): boolean {
    return (
      config.compilationOptions &&
      directory.subDirectories.length === 0 &&
      directory.files.length === 0
    );
  }

  public static createDropdownFromDirectory(directory: Directory, depth = 0) {
    const dropdown = new Dropdown(directory.path.split('/').join('-'), depth);

    directory.subDirectories.forEach((dir) => {
      if (Dropdown.isDirectoryEmpty(dir)) return;

      const d = Dropdown.createDropdownFromDirectory(dir, depth + 1);
      dropdown.folders.appendChild(d);
    });

    this.createDropdownFiles(directory.files, depth).forEach((file) => {
      dropdown.files.appendChild(file);
    });

    return dropdown;
  }

  set textContent(text: string) {
    const span = this.children[0].children[1];
    if (span) {
      span.textContent = text.toUpperCase();
    }
  }
}

export default Dropdown;
