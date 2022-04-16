import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement,
);

// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//     // [::1] is the IPv6 localhost address.
//     window.location.hostname === '[::1]' ||
//     // 127.0.0.1/8 is considered localhost for IPv4.
//     window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
// );

// // Assuming you have two redirect URIs, and the first is for localhost and second is for production
// const [localRedirectSignIn, productionRedirectSignIn] = awsConfig.oauth.redirectSignIn.split(',');

// const [localRedirectSignOut, productionRedirectSignOut] =
//   awsConfig.oauth.redirectSignOut.split(',');

// const updatedAwsConfig = {
//   ...awsConfig,
//   oauth: {
//     ...awsConfig.oauth,
//     redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
//     redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
//   },
// };

// Amplify.configure(updatedAwsConfig);
