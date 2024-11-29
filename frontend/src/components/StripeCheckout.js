import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Load your publishable key from Stripe
const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    // Send paymentMethod.id to your server to create a payment intent
    const response = await axios.post('/api/payment_intents', {
      payment_method: paymentMethod.id,
    });

    const { client_secret } = response.data;

    const { error: confirmError } = await stripe.confirmCardPayment(client_secret);

    if (confirmError) {
      setMessage(confirmError.message);
    } else {
      setMessage('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <CardElement className="p-2 mb-4 border rounded" />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={!stripe}>
        Pay Now
      </button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Test Card Details</h3>
        <p>Card Number: 4242 4242 4242 4242</p>
        <p>Expiry Date: Any future date</p>
        <p>CVV: Any 3 digits</p>
      </div>
    </form>
  );
};

const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCheckout;