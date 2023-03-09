import { color, config } from '../../config';
import DOMComponent from '../../types/dom-component';
import SearchBar from '../../components/searchBar';
import Dropdown from '../../components/dropdown';
import { PageInfo, CSS } from '../../types';

const globalSidebarStyles: CSS = {
  '#sidebar-id': {
    position: 'fixed',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    top: '0',
    left: '0',
    padding: '0',
    margin: '0',
    width: '280px',
    height: '100vh',
    backgroundColor: color.primary,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },

  '.sidebar-head': {
    backgroundColor: color.secondary,
    width: '100%',
    borderRight: `1px solid ${color.secondary}`,
    paddingBottom: '10px',
  },

  '.sidebar-body': {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0',
    borderRight: `1px solid ${color.border}`,
    paddingBottom: '20px',
  },

  '.sidebar-footer': {
    position: 'relative',
    bottom: '0',
    width: '100%',
    textAlign: 'center',
    backgroundColor: color.primary,
    borderTop: `1px solid ${color.border}`,
  },

  '.sidebar-footer a': {
    color: color.secondary,
    fontWeight: 'bold',
  },

  '#sidebar-title-button': {
    textDecoration: 'none',
    display: 'block',
    width: '90%',
    margin: '0 auto',
    cursor: 'pointer',
  },

  '#sidebar-title-button:hover': {
    textDecoration: 'none',
    opacity: '0.8',
  },

  '#sidebar-title': {
    color: color.title,
    padding: '15px 10px',
    margin: '0px',
    textDecoration: 'none',
    border: 'none',
  },
};

const generateFooter = (): DOMComponent<'div'> => {
  const footer = new DOMComponent('div');
  footer.className = 'sidebar-footer';

  const builtWith = new DOMComponent('p');
  builtWith.textContent = 'Built with ';

  const title = new DOMComponent('a');
  title.textContent = 'MarkGEN';
  title.element.href = 'https://github.com/Richard-Egeli/MarkGEN';

  builtWith.appendChild(title);
  footer.appendChild(builtWith);
  return footer;
};

class Sidebar extends DOMComponent<'div'> {
  constructor(pageInfo: PageInfo) {
    super('div');

    const titleButton = new DOMComponent('a');
    const title = new DOMComponent('h4');
    const searchBar = new SearchBar();
    const sidebarHead = new DOMComponent('div');
    const sidebarBody = new DOMComponent('div');
    const sidebarFooter = generateFooter();

    sidebarHead.className = 'sidebar-head';
    sidebarBody.className = 'sidebar-body';

    this.id = 'sidebar-id';
    title.id = 'sidebar-title';
    title.textContent = config.project;
    titleButton.id = 'sidebar-title-button';
    titleButton.element.href = './index.html';

    titleButton.appendChild(title);
    sidebarHead.appendChild(titleButton);
    sidebarHead.appendChild(searchBar);

    this.appendChild(sidebarHead);
    this.appendChild(sidebarBody);
    this.appendChild(sidebarFooter);
    this.addGlobalStyles(globalSidebarStyles);

    pageInfo.subPages.forEach((info) => {
      const dropdown = Dropdown.createDropdownFromPage(info);
      sidebarBody.appendChild(dropdown);
    });
  }
}

export default Sidebar;
