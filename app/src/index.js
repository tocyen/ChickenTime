import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Room from './ui/Room';
import Name from './ui/Name';
import Tutorial from './ui/Tutorial';
import * as serviceWorker from './serviceWorker';









ReactDOM.render(<Room />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
