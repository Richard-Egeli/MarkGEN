import './config';

import Sidebar from './containers/sidebar';
import Config from './config';
import DOM from './dom';

DOM.addDOMElement(Sidebar);
DOM.compileElements();
DOM.compileScripts();
DOM.save(`${Config.outDir}/index.html`);
