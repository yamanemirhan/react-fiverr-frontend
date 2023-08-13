import React from 'react';
import './Propositions.scss';

function Propositions() {
  return (
    <div className="propositions">
      <div className="container">
        <div className="item">
          <h1>A whole world of freelance talent at your fingertips</h1>
          <div className="title">
            <img src="./img/check.png" alt="check box" />
            The best for every budget
          </div>
          <p>
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
          <div className="title">
            <img src="./img/check.png" alt="check box" />
            Quality work done quickly
          </div>
          <p>
            Find the right freelancer to begin working on your project within
            minutes.
          </p>
          <div className="title">
            <img src="./img/check.png" alt="check box" />
            Protected payments, every time
          </div>
          <p>
            Always know what you&apos;ll pay upfront. Your payment isn&apos;t
            released until you approve the work.
          </p>
          <div className="title">
            <img src="./img/check.png" alt="check box" />
            24/7 support
          </div>
          <p>
            Questions? Our round-the-clock support team is available to help
            anytime, anywhere.
          </p>
        </div>
        <div className="item">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png"
            alt="propositions"
          ></img>
        </div>
      </div>
    </div>
  );
}

export { Propositions };
