import React, { useEffect, useState } from 'react'
import Modal from "react-modal";
import "./PaymentModal.css";
Modal.setAppElement('#root');

export default function PaymentModal({ isOpen, isSuccess, onClose }) {
    const [countdown, setCountDown] = useState(5);

    useEffect(() => {
        let interval;
        if (isOpen){
            interval = setInterval(() => {
                setCountDown((prevCount) => prevCount - 1)
            }, 800)
        }
        return () => clearInterval(interval);
    }, [isOpen]);
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Payment Status"
            overlayClassName="modal-overlay"
            className="modal-content"
        >
            <div className="modal-content">
              {isSuccess ? (
                <>
                  <h2>Payment Successful!</h2>
                  <p>Your payment has been processed successfully.</p>
                </>
              ) : (
                <>
                  <h2>Payment Failed!</h2>
                  <p>There was an issue processing your payment. Please try again later.</p>
                </>
              )}
                <div className="countdown">
                    <div className="slider" style={{ width: `${(countdown / 5) * 100}%` }} />
                </div>
                <button onClick={onClose}>Close</button>
            </div>
          </Modal>
    );
    
}
