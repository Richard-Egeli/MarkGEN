import DOMComponent from '../../types/dom-component';
import { color } from '../../config';
import DOM from '../../dom';
import { Directory } from '../../types';

DOM.addGlobalStyle({
  '.dropdown-button': {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    color: color.text,
    padding: '8px 16px',
    width: '100%',
    borderBottom: `1px solid ${color.border}`,
    borderLeft: `0`,
    borderRight: `0`,
    borderTop: `0`,
    textAlign: 'left',
  },

  '.dropdown-button-text': {
    paddingLeft: '10px',
  },
});

const rotateChevron = (buttonId, chevronId, containerId) => {
  const button = document.getElementById(buttonId);
  if (button) {
    console.log(buttonId);
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
  private container: DOMComponent<'div'> = new DOMComponent('div');
  depth: number = 0;

  constructor(id?: string, depth: number = 0) {
    super('div');

    const svg = new DOMComponent('img');
    const text = new DOMComponent('span');
    const button = new DOMComponent('button');

    this.depth += depth;
    this.className = 'dropdown';
    this.id = id + this.makeID();

    this.container.id = this.id + '-container';
    this.container.element.style.display = 'none';

    button.className = 'dropdown-button';
    button.id = this.id + '-button';
    button.element.style.paddingLeft = `${this.depth * 10 + 10}px`;

    svg.id = this.id + '-chevron';
    svg.element.src = 'assets/chevron.svg';
    svg.element.style.transition = 'transform 0.2s ease-in-out';
    svg.element.style.color = color.text;

    text.className = this.className + '-text';
    text.element.style.fontWeight = 'bold';

    button.appendChild(svg);
    button.appendChild(text);

    this.appendChild(button);
    this.appendChild(this.container);
    this.addScript(rotateChevron, {
      buttonId: button.id,
      chevronId: svg.id,
      containerId: this.container.id,
    });
  }

  public static createDropdownFromDirectory(directory: Directory, depth = 0) {
    const dropdown = new Dropdown(directory.path.split('/').join('-'), depth);
    dropdown.textContent = directory.name;

    directory.subDirectories.forEach((dir) => {
      const d = Dropdown.createDropdownFromDirectory(dir, depth + 1);
      dropdown.container.appendChild(d);
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
