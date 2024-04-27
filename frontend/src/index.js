import React from 'react';
import ReactDom from 'react-dom/client';
import router from './components/App';
import { RouterProvider } from 'react-router-dom';

const root = document.getElementById('root');

const rootDom = ReactDom.createRoot(root);

rootDom.render(<RouterProvider router={router} />);