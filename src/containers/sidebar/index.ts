import { color, config } from '../../config';
import DOMComponent from '../../types/dom-component';
import SearchBar from '../../components/searchBar/search';
import Dropdown from '../../components/dropdown';
import { Directory } from '../../types';
import DOM from '../../dom';

DOM.addGlobalStyle({
  '#sidebar-id': {
    position: 'fixed',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    top: '0',
    left: '0',
    padding: '0',
    margin: '0',
    width: '300px',
    height: '100vh',
    backgroundColor: color.primary,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    paddingBottom: '20px',
  },

  '.sidebar-head': {
    backgroundColor: color.secondary,
    width: '300px',
    borderRight: `1px solid ${color.secondary}`,
  },

  '.sidebar-body': {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0',
    borderRight: `1px solid ${color.border}`,
  },

  '#sidebar-title': {
    color: color.title,
    padding: '15px 10px',
    margin: '0',
  },
});

class Sidebar extends DOMComponent<'div'> {
  constructor(directory: Directory) {
    super('div');

    const title = new DOMComponent('h4');
    const searchBar = new SearchBar();
    const sidebarHead = new DOMComponent('div');
    const sidebarBody = new DOMComponent('div');

    sidebarHead.className = 'sidebar-head';
    sidebarBody.className = 'sidebar-body';

    this.id = 'sidebar-id';
    title.id = 'sidebar-title';
    title.textContent = config.project;

    sidebarHead.appendChild(title);
    sidebarHead.appendChild(searchBar);

    this.appendChild(sidebarHead);
    this.appendChild(sidebarBody);

    directory.subDirectories.forEach((dir, index) => {
      const dropdown = Dropdown.createDropdownFromDirectory(dir, 1);
      if (index === directory.subDirectories.length - 1)
        dropdown.className += ' dropdown-folder-container-last-child';

      sidebarBody.appendChild(dropdown);
    });

    Dropdown.createDropdownFiles(directory.files, 0).forEach((file) =>
      sidebarBody.appendChild(file)
    );
  }
}

export default Sidebar;
