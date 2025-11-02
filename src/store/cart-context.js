import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  emptyCart: () => {},
  // Checkout UI state and controls
  checkoutActive: false,
  checkoutData: null,
  openCheckout: (data) => {},
  closeCheckout: () => {}
});

export default CartContext;