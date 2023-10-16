import { createContext, useContext, useReducer } from 'react';

// Define the initial state of the cart
const initialState = {
    cartItems: [],
};

// Create the cart context
export const CartContext = createContext();

// Define a custom hook to access the cart context
export function useCart() {
  return useContext(CartContext);
}

// Define the cart reducer function
function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cartItems.find(item => item.item._id === action.payload.item._id);

            if (existingItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(item => 
                        item.item._id === action.payload.item._id
                        ? {...item, quantity: item.quantity +1}
                        : item
                    ),
                };

                
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, {...action.payload, quantity: 1}],
                };
            }
        case 'ADD_QUANTITY':
            return{
                ...state,
                cartItems: state.cartItems.map(item => 
                    item.item._id === action.payload
                    ? {...item, quantity: item.quantity +1}
                    : item
                ),
            };
        case 'REDUCE_QUANTITY':
            return{
                ...state,
                cartItems: state.cartItems.map(item => 
                    item.item._id === action.payload
                    ? {...item, quantity: Math.max(1, item.quantity - 1)}
                    : item
                ),
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.item._id !== action.payload),
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [],
            };
        default:
        return state;
    }
}

// Create a CartProvider component to wrap your app
export function CartProvider({ children }) {
    const [cartState, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ cartState, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}
