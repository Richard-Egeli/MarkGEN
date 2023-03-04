import DOM from '../../dom';
import { CSS } from '../../types/css';

class Dropdown {
  parent: HTMLDivElement;
  children: Array<HTMLElement | Dropdown> = [];

  constructor() {
    this.parent = DOM.document.createElement('div');
  }

  public setStyle(styles: CSS): void {
    Object.assign(this.parent.style, styles);
  }
}

export default Dropdown;
