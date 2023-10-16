import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartProvider>
        <App style={{width: "100vw"}}/>
      </CartProvider>
    </AuthContextProvider>
  </React.StrictMode>
);