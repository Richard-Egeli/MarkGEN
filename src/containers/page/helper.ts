import Page from '.';
import DOMComponent from '../../dom/dom-component';

export const recursivelySetPage = (page: Page, child: DOMComponent<any>) => {
  child.childrenAppend.forEach((c) => recursivelySetPage(page, c));
  child.page = page;
};
