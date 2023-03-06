import './config';

import Sidebar from './containers/sidebar';
import config from './config';
import DOM from './dom';
import { getDirectoriesNew } from './utils/helpers';
import DOMComponent from './types/dom-component';
import Dropdown from './components/dropdown';

DOM.addGlobalStyle({
  '*': {
    boxSizing: 'border-box',
  },
});

const directory = getDirectoriesNew(config.srcDir, config.extensions);
const sidebar = new Sidebar(directory);

// const first = new Dropdown('div');
// first.textContent = 'first';

// const second = new Dropdown('div');
// second.textContent = 'second';

// const third = new Dropdown('div');
// third.textContent = 'third';

// const fourth = new Dropdown('div');
// fourth.textContent = 'fourth';

// first.appendChild(second);
// second.appendChild(third);
// second.appendChild(fourth);

// DOM.addDOMElement(first);
DOM.addDOMElement(sidebar);
DOM.save(`${config.outDir}/index.html`);
