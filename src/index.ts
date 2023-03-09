import './config';

import Sidebar from './containers/sidebar';
import config from './config';
import DOM from './dom';
import { getPageInfo } from './utils/helpers';
import Page from './containers/page';
import { PageInfo } from './types';

DOM.addGlobalStyle({
  '*': {
    boxSizing: 'border-box',
  },
});

const pageData = getPageInfo(config.srcDir);

const createPages = (info: PageInfo, depth: number = 0) => {
  const sidebar = new Sidebar(pageData);
  const page = new Page(info);
  page.appendChild(sidebar);
  page.serialize();

  info.subPages.forEach((subPage) => {
    createPages(subPage, depth + 1);
  });
};

createPages(pageData);
DOM.compileAssets();
