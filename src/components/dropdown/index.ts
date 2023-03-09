export * from './dropdown-file';
export * from './dropdown-folder';

import DOMComponent from '../../types/dom-component';
import config from '../../config';
import { Directory, PageInfo } from '../../types';
import DropdownFile from './dropdown-file';
import DropdownFolder from './dropdown-folder';

const menuFunctionality = (buttonId, chevronId, containerId, route) => {
  const button = document.getElementById(buttonId);
  const isOpen = sessionStorage.getItem(buttonId) === 'true';

  console.log(buttonId);

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
          sessionStorage.setItem(buttonId, 'false');
          chevron.style.transform = 'rotate(0deg)';
          container.style.display = 'none';

          if (oldRoute !== route) {
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
    const folder = new DropdownFolder(id, depth);
    this.appendChild(folder);

    this.appendChild(this.folders);
    this.folders.appendChild(this.files);

    this.addInlineScript(menuFunctionality, {
      buttonId: folder.button.id,
      chevronId: folder.icon.id,
      containerId: this.folders.id,
      route: `${id.split('-').pop()}.html`,
    });
  }

  public static isDirectoryEmpty(directory: Directory): boolean {
    return (
      config.compilationOptions &&
      directory.subDirectories.length === 0 &&
      directory.files.length === 0
    );
  }

  public static createDropdownFiles(
    files: string[],
    depth: number
  ): DropdownFile[] {
    return files.map((file) => {
      const dropdownFile = new DropdownFile(file, depth);
      return dropdownFile;
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

  public static createDropdownFromDirectory(directory: Directory, depth = 0) {
    const dropdown = new Dropdown(directory.path.split('/').join('-'), depth);

    directory.subDirectories.forEach((dir) => {
      if (Dropdown.isDirectoryEmpty(dir)) return;

      const d = Dropdown.createDropdownFromDirectory(dir, depth + 1);
      dropdown.folders.appendChild(d);
    });

    this.createDropdownFiles(directory.files, depth).forEach((file) => {
      dropdown.files.appendChild(file);
    });

    return dropdown;
  }

  set textContent(text: string) {
    const span = this.children[0].children[1];
    if (span) {
      span.textContent = text.toUpperCase();
    }
  }
}

export default Dropdown;
