import React from 'react'

const PaymentFailed = () => {
  // Generate a random 9-digit order number
  const orderNumber = Math.floor(Math.random() * 1000000000);

  return (
    <>
    <div className='main'>
      <div className="container">
        <div className="printer-top"></div>

        <div className="paper-container">
          <div className="printer-bottom"></div>

          <div className="paper">
            <div className="main-contents">
              <div className="success-icon" style={{background:'white',fontSize:'45px'}}>❌</div>
              <div className="success-title">Payment Failed</div>
              <div className="success-description">
              Oops! Payment unsuccessful. Apologies for inconvenience. Please try again later or contact support for assistance. Thank you for understanding.</div>
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

export default PaymentFailed;
