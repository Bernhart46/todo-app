import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import AppComponent from './components/app-component';

import './index.css';

const rootElement = document.querySelector('#root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>
  </Provider>
);
