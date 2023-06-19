import React, {useReducer} from 'react';
import CartContext from './cart-context';

//this component is used to wrap the component PROVIDER, so it
//can be easily used to wrap any element that will receive any
//data from this provider


const defaultCartState = {
    items: [],
    totalAmount: 0,
}
//state: last snapshot or update of data
//actions: will dispatch actions that will be changing the state
//cartReducer returns default state updated
const cartReducer = (state, action) => {
//LOGIC TO MAKE SURE ONE ITEM IS ADDED TO THE ARRAY AND COUNT ALL PRICE AMOUNT
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount //to determine price total price of specific item
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id) //will find especific ide to find.
        const existingCartItem = state.items[existingCartItemIndex] // will check if item exist and will not add it.

        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {

            updatedItems = state.items.concat(action.item) // adding the item to the array
        }

        if (action.type === 'REMOVE') {

            const existingCartItemIndex = state.items.findIndex(item => item.id === action.id); //will find especific ide to find.
            const existingItem = state.items[existingCartItemIndex]
            const updatedTotalAmount = state.totalAmount - existingItem.price

            let updatedItems;
            if (existingItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.id)
            } else {
                const updatedItem = {...existingItem, amount: existingItem.amount - 1} //decrease the value by 1
                updatedItems = [...state.items]
                updatedItems[existingCartItemIndex] = updatedItem
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }
        // return defaultCartState
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }


    return defaultCartState
}
const CartProvider = (props) => {
    //destructure to assign variables to a different constants
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    //logic: if existing item -> update the amount
    //if not existing item -> then add new item and update amount
    //useState or usereducer can update state
    const addItemCartHandler = item => {
        dispatchCartAction({type: "ADD", item: item})
    }
    const removeItemCartHandler = id => {
        dispatchCartAction({type: "REMOVE", id: id})
    }


    const cartContext = {
        // items: [], we use cartState to provider current or latest snapshot
        items: cartState.items,
        // totalAmount: 0,we use totalAmount state to provider current or latest snapshot
        totalAmount: cartState.totalAmount,
        addItem: addItemCartHandler,
        removeItem: removeItemCartHandler,
    }
    //cartContext will be the value we are going to update or pass in the components
    return <CartContext.Provider value={cartContext}>
        {props.children}

    </CartContext.Provider>
}

export default CartProvider;