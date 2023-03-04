import Sidebar from './components/sidebar';
import DOM from './dom';

DOM.addDOMElement(Sidebar);
DOM.compileElements();
DOM.compileScripts();
DOM.save('build/index.html');
