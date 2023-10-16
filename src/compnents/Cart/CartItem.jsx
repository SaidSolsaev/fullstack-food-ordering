import React from 'react'
import { useCart } from '../../context/CartContext';
import pic from "../../assets/images/exampleItem.jpg";
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CartItem({item}) {
    const {dispatch} = useCart();

    const removeFromCart = (itemId) => {
        dispatch({type: "REMOVE_FROM_CART", payload: itemId})
    }

    const increaseItem = (itemId) => {
        dispatch({type: "ADD_QUANTITY", payload: itemId})

    }

    const decreaseItem = (itemId) => {
        dispatch({type: "REDUCE_QUANTITY", payload: itemId})
    }
    
    
    return (
        <div className='cart_item_info'>
            <div style={{display: "flex", alignItems: "center", marginRight: "20px"}}>

                <img alt='product' src={pic}/>
            </div>

            <div className='cart_product_info'>
                <div className='cart_product_info_col'>
                    <h4>{item.item.title}</h4>
                    <p>
                        {item.quantity}x
                        <span>{(item.item.price * item.quantity).toFixed(2)}$</span>
                    </p>

                    <div className="cart_product_increase">
                        <span className='increase' onClick={() => increaseItem(item.item._id)}>+</span>
                        <span className='qnty'>{item.quantity}</span>
                        <span className='deacrese' onClick={() => decreaseItem(item.item._id)}>-</span>
                    </div>
                </div>

                <span className='cart_delete_btn' onClick={() => removeFromCart(item.item._id)}>
                    <i><FontAwesomeIcon icon={faXmark} /></i>
                </span>
            </div>

        </div>
    )
}
