import './config';

import Sidebar from './containers/sidebar';
import config from './config';
import DOM from './dom';
import { getDirectoriesNew } from './utils/helpers';
import Page from './containers/page';

DOM.addGlobalStyle({
  '*': {
    boxSizing: 'border-box',
  },
});

const directory = getDirectoriesNew(config.srcDir, config.extensions);
const sidebar = new Sidebar(directory);
const page = new Page(__dirname + '/' + directory.page);

DOM.addDOMElement(sidebar);
DOM.addDOMElement(page);
DOM.save(`${config.outDir}/index.html`);
