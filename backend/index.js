const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const stripe = require('stripe')('your-secret-key-here');
const app = express();
const port = 3001;

const pool = new Pool({
  user: 'vishnu',
  host: 'localhost',
  database: 'food-ordering-app',
  password: 'password',
  port: 5432,
});

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user');
const foodRoutes = require('./routes/food');

app.use('/api/users', userRoutes);
app.use('/api/food', foodRoutes);

app.post('/api/payment_intents', async (req, res) => {
  const { payment_method } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Replace with the actual amount
      currency: 'usd',
      payment_method,
      confirmation_method: 'manual',
      confirm: true,
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});