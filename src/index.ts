import './config';

import Sidebar from './containers/sidebar';
import config from './config';
import Page from './containers/page';

import { compileAssets, getPageInfo } from './utils/helpers';
import { PageInfo } from './types';

const pageData = getPageInfo(config.srcDir);
const createPages = (info: PageInfo, depth: number = 0) => {
  const sidebar = new Sidebar(pageData);
  const page = new Page(info, sidebar);
  page.appendChild(sidebar);
  page.serialize();

  info.subPages.forEach((subPage) => {
    createPages(subPage, depth + 1);
  });
};

createPages(pageData);
compileAssets();
