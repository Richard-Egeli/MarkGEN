import DOMElement from '../../types/element';
import { color } from '../../config';
import DOM from '../../dom';

DOM.addGlobalStyle({
  '.dropdown-button': {
    backgroundColor: 'white',
    border: 'none',
    borderWidth: '0',
    color: color.text,
    padding: '8px 16px',
    width: '100%',
    borderBottom: `1px solid ${color.border}`,
  },
});

class Dropdown extends DOMElement<'button'> {
  constructor() {
    super('button');

    this.id = 'dropdown-button';
    this.className = 'dropdown-button';
    this.textContent = 'Dropdown';

    this.addScript(
      (id: string) => {
        const dropdown = document.getElementById(id);
        if (!dropdown) throw new Error('Dropdown id not found');

        dropdown.addEventListener('click', () => {
          console.log('Dropdown clicked');
        });
      },
      { id: this.id }
    );
  }
}

export default Dropdown;
