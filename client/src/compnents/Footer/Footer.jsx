import React from 'react'
import "./Footer.css";
import {faPaperPlane, faLocationDot,faPhone,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
    
    
    return (
        <footer className='footer'>
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <div className="footer-col__company">
                            <img alt='logo'/>
                            <h4>Company name</h4>
                            <p>Some description text....</p>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-col__title">Opening Hours</h4>
                        <ul className="footer-col__list">
                            <li>
                                <span>Monday - Thursday</span>
                                <p>10:00 - 23:00</p>
                            </li>
                            <li>
                                <span>Friday - Sunday</span>
                                <p>14:00 - 03:00</p>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                    <h4 className="footer-col__title">Contact</h4>
                        <ul className="footer-col__list">
                            <li className='contactList'>
                                <span><FontAwesomeIcon icon={faLocationDot} /></span>
                                <p>Osloveien, 0666 Oslo, Norway</p>
                            </li>
                            <li className='contactList'>
                                <span><FontAwesomeIcon icon={faPhone} /></span>
                                <p>+47 123 12 123</p>
                            </li>
                            <li className='contactList'>
                                <span><FontAwesomeIcon icon={faEnvelope} /></span>
                                <p>Example@mail.com</p>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Subscribe</h4>
                        <p>Don't miss out on our sales, Subscribe now</p>
                        <div className="newsletter">
                            <input type='email' placeholder='Your email...'/>
                            <span>
                                <i><FontAwesomeIcon icon={faPaperPlane} /></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}
