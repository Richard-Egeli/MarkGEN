import { CSS } from '../../types';
import { color } from '../../config';

export const globalSidebarStyles: CSS = {
  '#sidebar-id': {
    position: 'fixed',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    top: '0',
    left: '0',
    padding: '0',
    margin: '0',
    width: '280px',
    height: '100vh',
    backgroundColor: color.primary,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },

  '.sidebar-head': {
    backgroundColor: color.secondary,
    width: '100%',
    borderRight: `1px solid ${color.secondary}`,
    paddingBottom: '10px',
  },

  '.sidebar-body': {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0',
    borderRight: `1px solid ${color.border}`,
    paddingBottom: '20px',
  },
};
