import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);
// import { StrictMode } from "react";

// eslint-disable-next-line
// import '@aws-amplify/ui-react/styles.css';

const rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement,
);
