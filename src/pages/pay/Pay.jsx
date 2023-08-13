import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../../components/checkoutForm/CheckoutForm';
import newRequest from '../../utils/newRequest';
import './Pay.scss';

const stripePromise = loadStripe(
  'pk_test_51M2xoUINQDiqJvsZJZGqqVbyrGVRRvoKKnpau4KCsuo1BCVIarz9Da9cLNWsTAc1qbvshBNH4TacLkVDHONsTy8H00evxXd3WR'
);

function Pay() {
  const [clientSecret, setClientSecret] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export { Pay };
