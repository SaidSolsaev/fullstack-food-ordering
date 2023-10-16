import React, {useEffect, useState } from 'react';
import "./CheckoutBill.css";
import { useCart } from '../../context/CartContext';
import axios from 'axios';


export default function CheckoutBill() {
    const [data, setData] = useState([]);
    const [expireDate, setExpireDate] = useState();
    const [cuponActive, setCuponActive] = useState();
    const [cuponName, setCuponName] = useState("");
    const [cuponValError, setCuponValError] = useState(null);
    const [cuponValid, setCuponValid] = useState(false);
    const {cartState} = useCart();

    const cartItems = cartState.cartItems;


    const getCuponData = async () => {
        
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVERURL}/cupon?code=${cuponName}`)
            setData(res.data);
            
            if (res.data.length === 0){
                setCuponValid(false);
                setCuponValError("Cupon code not valid. Please try again with valid code!")
            } else{
                setCuponValid(true)
                setCuponValError(`Cupon Valid!`);
            }
        } catch (error) {
            setCuponValError(error);
        }

    }
    
    useEffect(() => {
        if (cuponValid){
            data.map((cup) => (setExpireDate(new Date(cup.expireDate)), setCuponActive(cup.isActive)))
        } else{
            setExpireDate(undefined)
            setCuponActive(false);
        }

    }, [data, cuponValid]);

    function checkSubPrice(){
        let totalPrice = 0;
        let sale = checkSale();

        cartItems.map(item => 
            totalPrice += item.item.price * item.quantity
        )

        totalPrice -= totalPrice * sale /100;

        return totalPrice;
    }

    function checkSalePrice(){
        let sale = checkSale();
        let price = 0;
        let discount = 0;

        cartItems.map(item => 
            price += item.item.price * item.quantity
        )
        
        discount = price * sale /100;

        return discount;
    }

    const handelChange = (e) =>{
        setCuponName(e.target.value);
    }
    
    const handleCuponValidate = () => {
        getCuponData();
    }
    
    function checkSale(){
        let sale = 0;
        
        if (cuponActive){
            data.map(item =>     
                sale = item.discount
            );
        }
        
        return sale;
    }

    function checkTotalPrice(){
        let shipping = 29;
        let totalPrice = checkSubPrice();

        totalPrice = shipping + checkSubPrice();
        
        return totalPrice;
    }



    return (
        <div className='checkout_bill_col'>
            {cartItems.map((item) => (
                <div className='checkout_product_container' key={item.item._id}>
                    <img alt='product_img'/>
                    <div className='product_desc'>
                        <h4>{item.item.title}</h4>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <p>{item.quantity}x</p>
                            <span>{item.item.price}$</span>
                        </div>
                    </div>
                    <span>{item.item.price * item.quantity}$</span>
                </div>
            ))}
            <h4 style={{marginTop: "40px"}}>Subtotal: <span>{checkSubPrice().toFixed(2)}$</span></h4>
            <h4>Shipping: <span>29$</span></h4>
            <div className='checkout_total'>
                <h3>Total: <span>{checkTotalPrice().toFixed(2)}$</span></h3>
            </div>
            
            <div className='cuponInputContainer'>
                <h4 style={{marginTop: "20px"}}>Discount: <span>{checkSalePrice().toFixed(2)}$</span></h4>
                <div className='inputContainer'>
                    <input placeholder='Write your code...' value={cuponName} onChange={handelChange}/>
                    <button onClick={handleCuponValidate}>Validate</button>
                </div>
                {cuponValError ? (
                    <div className='showErrorMsg' style={{marginTop: "10px"}}>
                        <p style={{color: cuponValid ? "green" : "red", fontSize: "14px", textAlign: "center"}}>{cuponValError}</p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
