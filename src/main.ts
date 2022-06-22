import './assets/style/index.scss';

import { createElement } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  createElement(App)
);
