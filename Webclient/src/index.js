import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import emailjs from 'emailjs-com'

emailjs.init("user_AMGJ2p5N2MwxeqeXtJNLW");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
