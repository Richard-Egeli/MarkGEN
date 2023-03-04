import Color from '../../config/colorPalette';
import config from '../../../markgen.config.json';
import DOMElement from '../../types/element';
import SearchBar from '../../components/searchBar/search';
import Dropdown from '../../components/dropdown';

const sidebar = new DOMElement('div');
const title = new DOMElement('h2');
const button = new DOMElement('button');
const dropdown = new Dropdown();

sidebar.id = 'sidebar-id';
title.id = 'sidebar-title';
button.id = 'buttonId';

title.textContent = config.project;
button.textContent = 'Click me';

sidebar.setStyle({
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
});

title.setStyle({
  backgroundColor: Color.secondary,
  borderBottom: `1px solid ${Color.border}`,
  color: Color.text,
  padding: '30px 10px',
  margin: '0',
});

button.setStyle({
  width: '100%',
});

sidebar.appendChild(title);
sidebar.appendChild(SearchBar);
sidebar.appendChild(dropdown);

export default sidebar;
