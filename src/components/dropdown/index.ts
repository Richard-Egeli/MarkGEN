import { CSS } from '../../types/css';
import DOMElement from '../../types/element';
import { generateInlineFunction } from '../../utils/generator';
import { Color } from '../../config';

const defaultStyles: CSS = {
  backgroundColor: 'white',
  border: 'none',
  borderWidth: '0',
  color: Color.text,
  padding: '8px 16px',
  width: '100%',
  borderBottom: `1px solid ${Color.border}`,
};

class Dropdown extends DOMElement<'button'> {
  constructor() {
    super('button');

    this.id = 'dropdown';
    this.textContent = 'Dropdown';
    this.setStyle(defaultStyles);

    const func = generateInlineFunction(
      (id: string) => {
        const dropdown = document.getElementById(id);
        if (!dropdown) throw new Error('Dropdown id not found');

        dropdown.addEventListener('click', () => {
          console.log('Dropdown clicked');
        });
      },
      { id: this.id }
    );

    this.addScript(func);
  }
}

export default Dropdown;
