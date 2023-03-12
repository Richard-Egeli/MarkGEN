import DOMComponent from '../../dom/dom-component';
import SearchBar from '../../components/search-bar';
import Dropdown from '../../components/dropdown';
import { PageInfo } from '../../types';
import DropdownNav from '../../components/dropdown/dropdown-nav';
import { SidebarTitle } from './sidebar-title';
import SidebarFooter from './sidebar-footer';
import { color } from '../../config';

const defaultGlobalStyles = {
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
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0',
    borderRight: `1px solid ${color.border}`,
    paddingBottom: '20px',
  },
};

class Sidebar extends DOMComponent<'div'> {
  private sidebarHead: DOMComponent<'div'>;
  private sidebarBody: DOMComponent<'div'>;
  private sidebarFooter: DOMComponent<'div'>;

  constructor(pageInfo: PageInfo) {
    super('div');

    this.id = 'sidebar-id';

    this.sidebarHead = this.addComponent('div');
    this.sidebarBody = this.addComponent('div');
    this.sidebarFooter = this.addComponent(SidebarFooter);

    this.sidebarHead.addComponent(SidebarTitle);
    this.sidebarHead.addComponent(SearchBar);

    this.sidebarHead.className = 'sidebar-head';
    this.sidebarBody.className = 'sidebar-body';

    this.addGlobalStyles(defaultGlobalStyles);
    this.initializeSubPages(pageInfo);
  }

  private initializeSubPages(info: PageInfo) {
    info.subPages.forEach((info) =>
      this.sidebarBody.appendChild(Dropdown.createDropdownFromPage(info))
    );
  }

  override render() {
    [
      ...this.page.content.element.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    ].forEach((element, index, arr) => {
      const nav = new DropdownNav(element);
      this.sidebarBody.prependChild(nav);

      if (index === arr.length - 1) {
        nav.className += ' dropdown-nav-last';
      }
    });

    return super.render();
  }
}

export default Sidebar;
