import './config';

import Sidebar from './containers/sidebar';
import config from './config';
import DOM from './dom';
import { getDirectoriesNew } from './utils/helpers';

DOM.addGlobalStyle({
  '*': {
    boxSizing: 'border-box',
  },
});

const directory = getDirectoriesNew(config.srcDir, config.extensions);
const sidebar = new Sidebar(directory);

DOM.addDOMElement(sidebar);
DOM.save(`${config.outDir}/index.html`);
