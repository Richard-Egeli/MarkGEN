import Page from '.';
import DOMComponent from '../../types/dom-component';

export const recursivelySetPage = (page: Page, child: DOMComponent<any>) => {
  child.children.forEach((c) => recursivelySetPage(page, c));
  child.page = page;
};
