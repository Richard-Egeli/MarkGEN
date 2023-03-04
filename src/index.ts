import Sidebar from './containers/sidebar';
import config from '../markgen.config.json';
import DOM from './dom';
import { generateInlineCSS } from './utils/generator';
import fs from 'fs';

const styles = generateInlineCSS({
  '#sidebar-id': {
    position: 'absolute',
    backgroundColor: 'white',
    border: 'none',
    borderWidth: '0',
    color: 'black',
  },

  '#sidebar-id h2': {
    backgroundColor: 'white',
    border: 'none',
    borderWidth: '0',
  },
});

// styles.toString();

fs.writeFileSync(`${config.outDir}/styles.css`, styles);
console.log(styles.toString());

// DOM.addDOMElement(Sidebar);
// DOM.compileElements();
// DOM.compileScripts();
// DOM.save(`${config.outDir}/index.html`);
