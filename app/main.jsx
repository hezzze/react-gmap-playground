import ReactDOM from 'react-dom';
import React from 'react';
import Index from './components/Index';
import './sass/app.sass';

main();

function main() {
  ReactDOM.render(<Index />, document.getElementById('app'));
}
