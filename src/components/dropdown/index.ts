export * from './dropdown-nav';
export * from './dropdown-links';

import { PageInfo } from '../../types';
import DOMComponent from '../../types/dom-component';
import DropdownLink from './dropdown-links';

const menuIconFunc = (buttonId, chevronId, containerId) => {
  const button = document.getElementById(buttonId);

  if (button) {
    button.addEventListener('click', () => {
      const chevron = document.getElementById(chevronId);
      const container = document.getElementById(containerId);

      if (chevron && container) {
        if (chevron.style.transform === 'rotate(90deg)') {
          sessionStorage.setItem(buttonId, 'false');
          chevron.style.transform = 'rotate(0deg)';
          container.style.display = 'none';

          return;
        }

        sessionStorage.setItem(buttonId, 'true');
        chevron.style.transform = 'rotate(90deg)';
        container.style.display = 'block';
      }
    });
  }
};

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
          if (oldRoute === route) {
            sessionStorage.setItem(buttonId, 'false');
            chevron.style.transform = 'rotate(0deg)';
            container.style.display = 'none';
          } else {
            setTimeout(() => {
              window.location.href = route;
            }, 200);
          }

          return;
        }

        sessionStorage.setItem(buttonId, 'true');
        chevron.style.transform = 'rotate(90deg)';
        container.style.display = 'block';

        if (oldRoute !== route) {
          setTimeout(() => {
            window.location.href = route;
          }, 200);
        }
      }
    });
  }
};

class Dropdown extends DOMComponent<'div'> {
  private folders: DOMComponent<'div'> = new DOMComponent('div');
  private files: DOMComponent<'div'> = new DOMComponent('div');

  constructor(id?: string, depth: number = 0) {
    super('div');

    this.className = 'dropdown';
    this.id = id;

    this.folders.id = this.id + '-container';
    this.folders.element.style.display = 'none';
    this.folders.element.style.textAlign = 'left';

    const folder = new DropdownLink(id, depth);

    this.appendChild(folder);
    this.appendChild(this.folders);
    this.folders.appendChild(this.files);

    this.addInlineScript(menuFunctionality, {
      buttonId: folder.button.id,
      chevronId: folder.icon.id,
      containerId: this.folders.id,
      route: `${id.split('-').pop()}.html`,
    });

    this.addInlineScript(menuIconFunc, {
      buttonId: folder.iconButton.id,
      chevronId: folder.icon.id,
      containerId: this.folders.id,
    });
  }

  public static createDropdownFromPage(page: PageInfo, depth: number = 0) {
    const dropdown = new Dropdown(page.path.split('/').join('-'), depth);

    page.subPages.forEach((page) => {
      const d = Dropdown.createDropdownFromPage(page, depth + 1);
      dropdown.folders.appendChild(d);
    });

    return dropdown;
  }

  set textContent(text: string) {
    const span = this.childrenAppend[0].childrenAppend[1];
    if (span) {
      span.textContent = text.toUpperCase();
    }
  }
}

export default Dropdown;
