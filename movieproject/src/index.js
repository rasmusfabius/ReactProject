import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainComponent from './Components/MainComponent';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<MainComponent />, document.getElementById('root'));

serviceWorker.unregister();
