import React from 'react'
import "./Header.css";
import hero from "./../../assets/images/hero.png";
import { faCar, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
    
    return (
        <section className='headerSection' id='home'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='content'>
                            <h5>Easy way to make an order</h5>
                            <h1>
                                <span>HUNGRY? </span>
                                Just Wait <br /> food at
                                <span> your door</span>
                            </h1>
                            <p>some description text or something.....</p>
                            
                            <div className="col-btns">
                                <button className="orderBtn">Order Now</button>
                                <button className="allFoodsBtn">See all foods</button>
                            </div>

                            <div className="service">
                                <p>
                                    <span><FontAwesomeIcon icon={faCar} /></span>
                                    Free delivery
                                </p>
                                <p>
                                    <span><FontAwesomeIcon icon={faMoneyCheckDollar} /></span>
                                    100% secure checkout
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className="imgHero">
                            <img alt='hero' src={hero}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
