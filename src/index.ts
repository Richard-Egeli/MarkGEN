import Sidebar from './containers/sidebar';
import config from '../markgen.config.json';
import DOM from './dom';

DOM.addDOMElement(Sidebar);
DOM.compileElements();
DOM.compileScripts();
DOM.save(`${config.outDir}/index.html`);
