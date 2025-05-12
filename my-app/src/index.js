import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductProvider } from './context/ProductContext';
import { IndividualLedgerProvider } from './context/IndividualLedgerContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <IndividualLedgerProvider>
      <App />
      </IndividualLedgerProvider>
    </ProductProvider>
  </React.StrictMode>
);

