import { color } from '../../config';
import DOMComponent from '../../dom/dom-component';

const globalStyles = {
  '.search-bar-input': {
    position: 'block',
    boxSizing: 'border-box',
    padding: '6px 16px',
    margin: '8px auto',
    width: '90%',
    borderRadius: '16px',
    border: `1px solid ${color.border}`,
  },

  '.search-bar-input:focus': {
    outline: 'none',
  },
};

class SearchBar extends DOMComponent<'input'> {
  constructor() {
    super('input');

    this.className = 'search-bar-input';
    this.id = 'search-bar-input';
    this.element.type = 'text';
    this.element.placeholder = 'Search';

    this.addGlobalStyles(globalStyles);
    this.addExternalScript(__dirname + '/script.js');
  }

  get value(): string {
    return this.element.value;
  }

  set value(value: string) {
    this.element.value = value;
  }

  get type(): string {
    return this.element.type;
  }

  set type(type: string) {
    this.element.type = type;
  }

  get placeholder(): string {
    return this.element.placeholder;
  }

  set placeholder(placeholder: string) {
    this.element.placeholder = placeholder;
  }
}

export default SearchBar;
