import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <WishlistProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </WishlistProvider>
  </BrowserRouter>
);
