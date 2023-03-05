import { color, config } from '../../config';
import DOMElement from '../../types/element';
import SearchBar from '../../components/searchBar/search';
import Dropdown from '../../components/dropdown';
import DOM from '../../dom';

DOM.addGlobalStyle({
  '#sidebar-id': {
    position: 'absolute',
    top: '0',
    left: '0',
    padding: '0',
    margin: '0',
    width: '250px',
    height: '100vh',
    backgroundColor: color.primary,
    borderRight: `1px solid ${color.border}`,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  '#sidebar-title': {
    backgroundColor: color.secondary,
    borderBottom: `1px solid ${color.border}`,
    color: color.text,
    padding: '30px 10px',
    margin: '0',
  },
});

class Sidebar extends DOMElement<'div'> {
  constructor() {
    super('div');

    const title = new DOMElement('h2');
    const dropdown = new Dropdown();
    const searchBar = new SearchBar();

    this.id = 'sidebar-id';
    title.id = 'sidebar-title';
    title.textContent = config.project;

    this.appendChild(title);
    this.appendChild(searchBar);
    this.appendChild(dropdown);
  }
}

export default Sidebar;
