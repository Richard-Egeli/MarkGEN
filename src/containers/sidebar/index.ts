import { Color, Config } from '../../config';
import DOMElement from '../../types/element';
import SearchBar from '../../components/searchBar/search';
import Dropdown from '../../components/dropdown';
import DOM from '../../dom';

const sidebar = new DOMElement('div');
const title = new DOMElement('h2');
const button = new DOMElement('button');
const dropdown = new Dropdown();

sidebar.id = 'sidebar-id';
title.id = 'sidebar-title';
button.id = 'buttonId';

title.textContent = Config.project;
button.textContent = 'Click me';

DOM.addGlobalStyle({
  '#sidebar-id': {
    position: 'absolute',
    top: '0',
    left: '0',
    padding: '0',
    margin: '0',
    width: '250px',
    height: '100vh',
    backgroundColor: Color.primary,
    borderRight: `1px solid ${Color.border}`,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  '#sidebar-title': {
    backgroundColor: Color.secondary,
    borderBottom: `1px solid ${Color.border}`,
    color: Color.text,
    padding: '30px 10px',
    margin: '0',
  },
});

button.setStyle({
  width: '100%',
});

sidebar.appendChild(title);
sidebar.appendChild(SearchBar);
sidebar.appendChild(dropdown);

export default sidebar;
