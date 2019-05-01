import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './components/Reducers/index';

const store = createStore(reducer, applyMiddleware(thunk, logger));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


