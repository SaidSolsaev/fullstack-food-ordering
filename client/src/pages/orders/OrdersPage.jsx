import React, { useContext } from 'react'
import "./OrdersPage.css";
import useFetch from "../../hooks/useFetch";
import {AuthContext} from "../../context/AuthContext";
import Navbar from "../../compnents/Navbar/Navbar.jsx";
import LoadingSpinner from "../../compnents/LoadingSpinner/LoadingSpinner.jsx";
import Footer from "../../compnents/Footer/Footer.jsx";

export default function OrdersPage() {
    const {user} = useContext(AuthContext);
    

    const {data, loading} = useFetch(`/order/user/${user._id}`);
    
   
    
    function getRespDate(date){
        let respDate;
        let oldDate = new Date(date).toLocaleString();

        respDate = oldDate;
        return respDate;
    }

    const sortedData = [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    return (
        <>
            <Navbar />

            <div className="container">
                <div className='row'>
                    <div className='order_heading'>
                        {loading && <LoadingSpinner />}
                        <h1>Order History</h1>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Ordered Date</th>
                                <th>Price</th>
                                <th>Products</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {sortedData.map((order) => (
                            <tr key={order._id}>
                                <td>{getRespDate(order.createdAt)}</td>
                                <td>{order.price}$</td>
                                <td>{order.products.length}x</td>
                                <td className={order.status === 'Completed' ? 'status-completed' : 'status-pending'}>{order.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </>
    )
}
