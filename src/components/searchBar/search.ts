import { Color } from '../../config';
import DOMElement from '../../types/element';

const searchBar = new DOMElement('div');
const input = new DOMElement('input');

searchBar.id = 'search-bar';
input.id = 'search-input';
input.element.setAttribute('type', 'text');
input.element.setAttribute('placeholder', 'Search');

searchBar.setStyle({
  boxSizing: 'border-box',
  width: '100%',
  padding: '8px 8px',
});

input.setStyle({
  position: 'block',
  boxSizing: 'border-box',
  padding: '8px 16px',
  width: '100%',
  borderRadius: '16px',
  border: `1px solid ${Color.border}`,
});

searchBar.appendChild(input);
export default searchBar;
