import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Join from './ui/Join';
import Tutorial from './ui/Tutorial';
import Create from './ui/Create';
import * as serviceWorker from './serviceWorker';









ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
