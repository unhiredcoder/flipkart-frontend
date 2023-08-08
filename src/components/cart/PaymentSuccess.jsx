import React, { useEffect } from 'react'
import { clearCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const PaymentSuccess = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const orderNumber = Math.floor(Math.random() * 1000000000);
  useEffect(() => {
    dispatch(clearCart());
    setTimeout(() => {
      navigate("/")
    }, 5000)
  }, [])
  return (
    <>
      <div className='main'>
        <div className="container">
          <div className="printer-top"></div>

          <div className="paper-container">
            <div className="printer-bottom"></div>

            <div className="paper">
              <div className="main-contents">
                <div className="success-icon">&#10004;</div>
                <div className="success-title">Payment Complete</div>
                <div className="success-description">
                  Your transaction has been successfully processed, and we are delighted to have you as our esteemed customer. Welcome to our growing family! 😊    </div>
                <div className="order-details">
                  <div className="order-number-label">Order Number</div>
                  {/* Display the generated random order number */}
                  <div className="order-number">{orderNumber}</div>
                </div>
                <div className="order-footer">Thank you!</div>
              </div>
              <div className="jagged-edge"></div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default PaymentSuccess;
