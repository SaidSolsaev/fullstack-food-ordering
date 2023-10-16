import React, { useContext, useState } from 'react'
import "./login.css";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../compnents/Footer/Footer';
import Navbar from '../../compnents/Navbar/Navbar';


export default function Login() {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const [newUserCredentials, setNewUserCredentials] = useState({
        username: undefined,
        password: undefined,
        email: undefined,
        name: undefined,
        lastname: undefined
    });

    const [isLogin, setIsLogin] = useState(true);

    

    const navigate = useNavigate();

    const {error, dispatch} = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}));
    }

    const handleNewUserChange = (e) => {
        setNewUserCredentials(prev => ({...prev, [e.target.id]: e.target.value}));
    }

    const viewLogin = (status) => {
        setIsLogin(status);
    }


    const handleLogin = async e => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"})

        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/auth/login`, credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
            navigate("/")
        } catch (error) {
            dispatch({type: "LOGIN_FAIL", payload: error.response.data})
        }
    };

    const handleRegister = async e => {
        e.preventDefault();
        dispatch({type: "REGISTER_START"})

        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/auth/register`, newUserCredentials)
            
            dispatch({type: "REGISTER_SUCCESS", payload: res.data})
            window.location.reload(); 
        } catch (error) {
            console.log(error)
            dispatch({type: "REGISTER_FAIL", payload: error.response.data})
        }
    }

    return (
        <>
        
            <Navbar />
            <div className="auth-container">
                <div className='auth-container-box'>
                    <form>
                        <h2>{isLogin ? 'Please Log In' : 'Sign Up'}</h2>

                        {!isLogin && 
                            <>
                                <input required type='email' id='email' placeholder='Email...' onChange={handleNewUserChange}/>
                                <input required type='text' id='name' placeholder='First Name...' onChange={handleNewUserChange}/>
                                <input required type='text' id='lastname' placeholder='Last Name...' onChange={handleNewUserChange}/>
                            </>
                        }
                        
                        <input required type="text" placeholder='Username' id='username' onChange={isLogin ? handleChange : handleNewUserChange} />
                        <input required type="password" placeholder='Password' id='password' onChange={isLogin ? handleChange : handleNewUserChange}  />

                        <input type='submit' value={isLogin ? "Log in" : "Register"} className='create' onClick={isLogin ? handleLogin : handleRegister}/>
                        
                        {error && <span className='error-msg'>{error.message}!<br />Try again</span>}
                    </form>

                    <div className='auth-options'>
                        <button 
                            onClick={() => viewLogin(false)}
                            style={{backgroundColor: !isLogin ? '#df2020' : '#fde4e4', borderBottomLeftRadius: "10px"}}
                        >
                            Sign up
                        </button>
                        <button
                            style={{backgroundColor: isLogin ? '#df2020' : '#fde4e4', borderBottomRightRadius: "10px"}} 
                            onClick={() => viewLogin(true)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
