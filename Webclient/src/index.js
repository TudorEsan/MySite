import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Sw from "./serviceWorkerRegistration";
import emailjs from 'emailjs-com'

emailjs.init("user_AMGJ2p5N2MwxeqeXtJNLW");
new Sw().init();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


