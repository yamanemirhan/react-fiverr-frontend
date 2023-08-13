import React from 'react';
import './Banner.scss';

function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <div className="item">
          <h1>fiverr business.</h1>
          <h1>
            A business solution designed for <i>teams</i>
          </h1>
          <p>
            Upgrade to a curated experience packed with tools and benefits,
            dedicated to businesses
          </p>
          <div className="title">
            <img src="./img/check.png" alt="check icon" />
            Connect to freelancers with proven business experience
          </div>
          <div className="title">
            <img src="./img/check.png" alt="check icon" />
            Get matched with the perfect talent by a customer success manager{' '}
          </div>
          <div className="title">
            <img src="./img/check.png" alt="check icon" />
            Manage teamwork and boost productivity with one powerful workspace{' '}
          </div>
          <button>Explore Fiverr Business</button>
        </div>
        <div className="item">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png"
            alt="propositions"
          ></img>
        </div>
      </div>
    </div>
  );
}

export { Banner };
