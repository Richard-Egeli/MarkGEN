import DOMComponent from '../../dom/dom-component';
import SearchBar from '../../components/searchBar';
import Dropdown from '../../components/dropdown';
import { PageInfo } from '../../types';
import DropdownNav from '../../components/dropdown/dropdown-nav';
import { globalSidebarStyles } from './css';
import { SidebarTitle } from './sidebar-title';
import SidebarFooter from './sidebar-footer';

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

    this.addGlobalStyles(globalSidebarStyles);

    pageInfo.subPages.forEach((info) => {
      const dropdown = Dropdown.createDropdownFromPage(info);
      this.sidebarBody.appendChild(dropdown);
    });
  }

  override compile() {
    [
      ...this.page.content.element.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    ].forEach((element, index, arr) => {
      const nav = new DropdownNav(element);
      this.sidebarBody.prependChild(nav);

      if (index === arr.length - 1) {
        nav.className += ' dropdown-nav-last';
      }
    });

    return super.compile();
  }
}

export default Sidebar;
