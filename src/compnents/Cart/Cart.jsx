import React from 'react'
import "./Cart.css";
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import {faCircleXmark, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate} from "react-router-dom"

export default function Cart({setShowCart}) {
    const {cartState} = useCart();
    const navigate = useNavigate();

    const cartItems = cartState.cartItems;

    const handleNavigate = () => {
        navigate("/checkout")
    }

    function totalPrice(){
        let itemPrice = 0;

        cartItems.map(item => 
            itemPrice += item.item.price * item.quantity
        )

        return itemPrice.toFixed(2);
    }
    
    
    return (
        <div className="cart_container">
            <ul className='cart_list'>
                <div className="cart_close">
                    <span onClick={() => setShowCart(false)}>
                        <i><FontAwesomeIcon icon={faCircleXmark} /></i>
                    </span>
                </div>

                <div className="cart_items">
                    {cartItems.length === 0 ? (
                        <h3 style={{textAlign: "center"}}>Cart is empty</h3>
                    ) : (
                        cartItems.map((item, i) => (
                            <CartItem item={item} key={i}/>
                        ))
                    )}
                    
                </div>

                <div className="cart_bottom">
                    <h2>Total: {totalPrice()}$</h2>
                    <button className='cart_checkoutBtn' disabled={cartItems.length === 0 ? true : false} onClick={handleNavigate}>
                        Checkout
                        <span><FontAwesomeIcon icon={faArrowRight} /></span>
                    </button>
                </div>
            </ul>            
        </div>
    )
}
