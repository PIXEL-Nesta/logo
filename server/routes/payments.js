const express = require('express');
const Razorpay = require('razorpay');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const router = express.Router();

const RZ_KEY = process.env.RAZORPAY_KEY_ID;
const RZ_SECRET = process.env.RAZORPAY_KEY_SECRET;
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
let rz = RZ_KEY && RZ_SECRET ? new Razorpay({ key_id: RZ_KEY, key_secret: RZ_SECRET }) : null;

router.post('/razorpay/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    if (!rz) return res.status(500).json({ error: 'Razorpay not configured' });
    const order = await rz.orders.create({ amount: Math.round(amount * 100), currency, receipt: receipt || 'rcpt_' + Date.now() });
    res.json({ success: true, order });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'failed to create order' });
  }
});

router.post('/razorpay/verify', bodyParser.urlencoded({ extended: false }), (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const shasum = crypto.createHmac('sha256', RZ_SECRET).update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
  if (shasum === razorpay_signature) {
    return res.json({ success: true });
  }
  return res.status(400).json({ error: 'Invalid signature' });
});

router.post('/stripe/create-checkout-session', async (req, res) => {
  if (!stripe) return res.status(500).json({ error: 'Stripe not configured' });
  const { priceId, successUrl, cancelUrl } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'stripe error' });
  }
});

router.post('/stripe/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return res.status(400).send('webhook not configured');
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Payment succeeded for session', session.id);
  }
  res.json({ received: true });
});

module.exports = router;