import React, { useContext, useState } from 'react'
import "./CheckoutForm.css";
import CheckoutBill from './CheckoutBill';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import PaymentModal from '../PaymentModal/PaymentModal';


export default function CheckoutForm() {
    const [showModal, setShowModal] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const {user} = useContext(AuthContext);

    const {cartState, dispatch} = useCart();

    const cartItems = cartState.cartItems;

    function getItems(){
        let itemsIds = []
        
        cartItems.map(item => 
            itemsIds.push(item.item._id)
        );

        return itemsIds
    }


    function totalPrice(){
        let shipping = 29;
        let totalPrice = 0;

        cartItems.map(item => 
            totalPrice += item.item.price * item.quantity
        )

        totalPrice = totalPrice + shipping;

        return totalPrice.toFixed(2);
    }

    const [info, setInfo] = useState({
        email: undefined,
        name: undefined,
        phoneNumber: undefined,
        
    });

    const [adressInfo, setAdressInfo] = useState({
        country: undefined,
        city: undefined,
        postalCode: undefined,
        street: undefined,
    })

    const handleChange = (e) => {
        setInfo(prev => ({...prev, [e.target.id]: e.target.value}));
        setAdressInfo(prev => ({...prev, [e.target.id]: e.target.value}));

    }

    const handleShowModal = (status) => {
        setPaymentSuccess(status);
        setShowModal(true);
        
        setTimeout(() => {
            setShowModal(false);
        }, 5000);
    }

    const handlePayment = async e => {
        e.preventDefault();

        if (cartItems.length === 0){
            console.log("No items in cart")
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/order`, {
                shippingAdress: adressInfo,
                price: totalPrice(),
                user: user ? user._id : null,
                userInfo: info,
                products: getItems()
            });
            if(res.status === 200){
                console.log(res.data)
                handleShowModal(true)
            }
        } catch (error) {
            handleShowModal(false);
            console.log(error)
        }
    }

    const clearCart = () =>{
        dispatch({type: "CLEAR_CART"});
    }

    return (
        <div className="container" id='checkout'>
            <div className="row">
                <div className="checkoutCol">
                    <form onSubmit={handlePayment}>
                        <h3>Shipping Information</h3>
                        <div className="form_group">
                            <label>Full Name: </label>
                            <input type='text' id='name' placeholder='Full Name...' required onChange={handleChange}/>
                        </div>
                        
                        <div className="form_group">
                            <label>Email: </label>
                            <input type='email' id='email' placeholder='Your@email.com' required onChange={handleChange}/>
                        </div>
                        
                        <div className="form_group">
                            <label>Telephone: </label>
                            <input type='number' id='phoneNumber' placeholder='+47 123 12 123' required onChange={handleChange}/>
                        </div>
                        
                        <div className="form_group">
                            
                            <label>Country: </label>
                            <input type='text' id='country' placeholder='England...' required onChange={handleChange}/>
                        </div>
                        
                        <div className="form_group">
                            
                            <label>City: </label>
                            <input type='text' id='city' placeholder='London...' required onChange={handleChange}/>
                        </div>
                        
                        <div className="form_group">
                            <label>Street: </label>
                            <input type='text' id='street' placeholder='Streetname 12...' required onChange={handleChange}/>
                        </div>

                        <div className="form_group">
                            <label>Postcode: </label>
                            <input type='number' id='postalcode' placeholder='05545...' required onChange={handleChange}/>
                        </div>
                        <button type='submit' className='payment_submit_btn' onClick={clearCart}>Payment</button>
                    </form>
                </div>

                {/* Checkout bill */}
                <CheckoutBill />
            </div>

            <PaymentModal isOpen={showModal} isSuccess={paymentSuccess} onClose={() => setShowModal(false)}/>
        </div>
    )
}
