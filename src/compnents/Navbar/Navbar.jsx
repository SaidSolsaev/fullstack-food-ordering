import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./Navbar.css";
import {faBars, faXmark, faArrowRightFromBracket, faUser, faCartShopping} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Cart from '../Cart/Cart';

export default function Navbar() {
    const [showHamburger, setShowHamburger] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const {user, dispatch} = useContext(AuthContext);
    
    const cart = useCart();
    var cartItems = cart.cartState.cartItems;
    

    const handleShowCart = () => {
        setShowCart(!showCart);
    }

    
    const handleLogout = e => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        window.location.reload();
    }


    const handleShowHam = () => {
        setShowHamburger(!showHamburger);
    }

    return (
        <>
        
            <nav className='navbar-container'>
                <div className='logo'>
                    <h1>LOGO</h1>
                </div>

                <div className='nav-elements'>
                    <ul className={showHamburger ? "nav-menu active" : "nav-menu"}>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {user ? 
                            <li>
                                <NavLink to={`/orders/${user._id}`}>My Orders</NavLink>
                            </li>
                            : null
                        }
                        <li>
                            <NavLink to="">Food</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>

                        <li className='menu-profile'>
                            {user ? 
                                <button className="logoutbtn" onClick={handleLogout}>Log Out <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span></button>
                                :
                                <Link to="/login" style={{color: "#df2020"}}>Login</Link>
                            }
                        </li>
                    </ul>
                </div>

                <div className='profile'>
                    <span className='cart' onClick={handleShowCart}>
                        <i><FontAwesomeIcon icon={faCartShopping} /></i>
                        <span className={user ? 'cart_badge' : 'cart_badge user'}>{cartItems.length}</span>
                    </span>
                    {user ? (
                        <div className='dropdown'>
                            <span><FontAwesomeIcon icon={faUser} /></span>
                            <h3>{user.username}</h3>
                            <i onClick={handleLogout} style={{color: "#df2020", marginLeft: "20px", cursor: "pointer"}}><FontAwesomeIcon icon={faArrowRightFromBracket} /></i>
                        </div>
                    ): (
                        <button className='login'>
                            <Link to="/login">Login</Link>
                        </button>
                    )}
                </div>
                

                <div className='menu-icons'>
                    {showHamburger ? 
                        <i onClick={handleShowHam}><FontAwesomeIcon icon={faXmark} color='white'/></i>
                        :
                        <i onClick={handleShowHam}><FontAwesomeIcon icon={faBars} color='white'/></i>
                    }
                </div>

                
            </nav>

            {showCart && <Cart setShowCart={setShowCart}/>}
            
        </>
    )
}