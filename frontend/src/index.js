import React from 'react';
import ReactDom from 'react-dom/client';
import App from './components/App';

const root = document.getElementById('root');

const rootDom = ReactDom.createRoot(root);

rootDom.render(<App/>);