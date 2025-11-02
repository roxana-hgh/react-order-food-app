import { useReducer, useState, useCallback } from "react";
import CartContext from "./cart-context";
import useHttp from "../hooks/http-request-hook";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - (existingItem.price * existingItem.amount);
    let updatedItems;
    // if (existingItem.amount === 1) {
    //   updatedItems = state.items.filter(item => item.id !== action.id);
    // } else {
    //   const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
    //   updatedItems = [...state.items];
    //   updatedItems[existingCartItemIndex] = updatedItem;
    // }
    updatedItems = state.items.filter(item => item.id !== action.id);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === 'EMPTY') {
    return defaultCartState;
  }

  return defaultCartState;
};
function CartProvider(props) {
    const [cartState, cartDispacher] = useReducer(cartReducer, defaultCartState)
    const [checkoutActive, setCheckoutActive] = useState(false);
    const [checkoutData, setCheckoutData] = useState(null);

  const { isLoading: isSubmitting, error: submitError, sendRequest } = useHttp();


  const addItemToCartHandler = (item) => {
    cartDispacher({type: "ADD", item: item})
   
  };

  const removeItemFromCartHandler = (id) => {
    cartDispacher({type: "REMOVE", id})
  };

  const emptyCartHandler = () => {
    cartDispacher({type: "EMPTY"})
  }
  const CheckoutStartHandler = () => {

    setCheckoutActive(true);
    //emptyCartHandler();
  }

  const openCheckout = useCallback((data) => {
    setCheckoutData(data || null);
    setCheckoutActive(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setCheckoutActive(false);
    setCheckoutData(null);
  }, []);

  const submitOrder = useCallback(
    async (orderPayload) => {
    
      try {
       
        const data = await sendRequest({
          url: '/orders.json',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: orderPayload,
        });

      
        emptyCartHandler();
        
        if (typeof closeCheckout === 'function') closeCheckout();

   
        return data;
      } catch (err) {
     
        throw err;
      }
    },
    [sendRequest, closeCheckout]
  );

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    emptyCart: emptyCartHandler,
    checkout: CheckoutStartHandler,
    checkoutStatus: checkoutActive,
    // new API
    checkoutActive: checkoutActive,
    checkoutData: checkoutData,
    openCheckout: openCheckout,
    closeCheckout: closeCheckout,
    submitOrder: submitOrder,
    isSubmitting: isSubmitting,
    submitError: submitError,
  };
  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
}

export default CartProvider;
