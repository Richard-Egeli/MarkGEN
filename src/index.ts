import './config';

import Sidebar from './containers/sidebar';
import config from './config';
import Page from './containers/page';

import { compileAssets, getPageInfo } from './utils/helpers';
import { PageInfo } from './types';
import { translate } from './translate/c';

const pageData = getPageInfo(config.srcDir);
const sidebar = new Sidebar(pageData);

// translate('example/src/network/socket.h');
// // translate(pageData.files[1].directory + '/' + pageData.files[1].name);

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
