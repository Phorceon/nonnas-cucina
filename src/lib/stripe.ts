import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export const STRIPE_PRICES = {
  // Reservation deposit prices (replace with your actual Stripe Price IDs)
  STANDARD_DEPOSIT: process.env.STRIPE_PRICE_STANDARD_DEPOSIT || 'price_standard_deposit',
  VIP_DEPOSIT: process.env.STRIPE_PRICE_VIP_DEPOSIT || 'price_vip_deposit',
};
