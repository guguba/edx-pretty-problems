import React from 'react';
import ReactDOM from 'react-dom';
import './styles/mystyle.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './client_config';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
