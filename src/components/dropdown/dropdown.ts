import { PageInfo } from '../../types';
import DOMComponent from '../../dom/dom-component';
import DropdownLink from './dropdown-links';

const menuFunctionality = (buttonId, chevronId, containerId, route) => {
  const button = document.getElementById(buttonId);
  const isOpen = sessionStorage.getItem(buttonId) === 'true';

  // keep open on refresh
  if (isOpen) {
    const chevron = document.getElementById(chevronId);
    const container = document.getElementById(containerId);

    if (chevron && container) {
      chevron.style.transform = 'rotate(90deg)';
      container.style.display = 'block';
    }
  }

  if (button) {
    button.addEventListener('click', () => {
      const chevron = document.getElementById(chevronId);
      const container = document.getElementById(containerId);
      const oldRoute = window.location.href.split('/').pop();

      if (chevron && container) {
        if (chevron.style.transform === 'rotate(90deg)') {
          if (!route || oldRoute === route) {
            sessionStorage.setItem(buttonId, 'false');
            chevron.style.transform = 'rotate(0deg)';
            container.style.display = 'none';
          } else {
            if (route !== undefined) {
              setTimeout(() => {
                window.location.href = route;
              }, 200);
            }
          }

          return;
        }

        sessionStorage.setItem(buttonId, 'true');
        chevron.style.transform = 'rotate(90deg)';
        container.style.display = 'block';

        if (route !== undefined && oldRoute !== route) {
          setTimeout(() => {
            window.location.href = route;
          }, 200);
        }
      }
    });
  }
};

class Dropdown extends DOMComponent<'div'> {
  private container: DOMComponent<'div'> = new DOMComponent('div');

  constructor(id?: string, depth: number = 0) {
    super('div');

    this.id = id;
    this.className = 'dropdown';

    const link: DropdownLink = this.addComponent(DropdownLink, id, depth);

    this.container.id = this.id + '-container';
    this.container.element.style.display = 'none';
    this.appendChild(this.container);

    this.addInlineScript(
      menuFunctionality,
      link.button.id,
      link.icon.id,
      this.id + '-container',
      `${id.split('-').pop()}.html`
    );

    this.addInlineScript(
      menuFunctionality,
      link.iconButton.id,
      link.icon.id,
      this.container.id
    );
  }

  public static createDropdownFromPage(page: PageInfo, depth: number = 0) {
    const dropdown = new Dropdown(page.path.split('/').join('-'), depth);

    page.subPages.forEach((page) =>
      dropdown.container.appendChild(
        Dropdown.createDropdownFromPage(page, depth + 1)
      )
    );

    return dropdown;
  }
}

export default Dropdown;
