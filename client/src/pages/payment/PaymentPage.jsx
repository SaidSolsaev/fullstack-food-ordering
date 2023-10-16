import React from 'react'
import "./PaymentPage.css";
import PageHeader from '../../compnents/PageHeaders/PageHeader';
import Navbar from "../../compnents/Navbar/Navbar";
import CheckoutForm from '../../compnents/CheckoutForm/CheckoutForm';
import Footer from "../../compnents/Footer/Footer";

export default function PaymentPage() {
    return (
        <>
            <Navbar />
            <PageHeader title="Checkout"/>
            <CheckoutForm />
            <Footer />
        </>
    )
}
