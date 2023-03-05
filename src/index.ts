import './config';

import Sidebar from './containers/sidebar';
import config from './config';
import DOM from './dom';
import { getDirectories } from './utils/helpers';

const dirs = getDirectories(config.srcDir, config.extensions);
console.log(JSON.stringify(dirs, null, 2));

DOM.addGlobalStyle({
  '*': {
    boxSizing: 'border-box',
  },
});

DOM.addDOMElement(new Sidebar());
DOM.save(`${config.outDir}/index.html`);
