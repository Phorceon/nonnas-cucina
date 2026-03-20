'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';

const timeSlots = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
];

const seatingOptions = [
  { value: 'indoor', label: 'Indoor Dining', icon: '🏠', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD_DEPOSIT },
  { value: 'patio', label: 'Outdoor Patio', icon: '🌿', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD_DEPOSIT },
  { value: 'private', label: 'Private Room', icon: '🍷', priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP_DEPOSIT },
];

export default function ReservationsPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    seating: 'indoor',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check for success/cancelled payment
  const paymentSuccess = searchParams.get('success');
  const paymentCancelled = searchParams.get('canceled');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get the price ID for the selected seating
      const selectedSeating = seatingOptions.find(s => s.value === formData.seating);
      const priceId = selectedSeating?.value === 'private' 
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP_DEPOSIT 
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD_DEPOSIT;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservationData: formData,
          priceId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0eb] to-[#f9f5f0]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#f5f0eb]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <ScrollReveal direction="up">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 0.8 }}
              className="text-[#d4a574] text-sm tracking-widest uppercase"
            >
              Book Your Table
            </motion.span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-bold text-[#f5f0eb] mt-4 mb-6"
            >
              Reservations
            </motion.h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-[#f5f0eb]/90 max-w-2xl mx-auto"
            >
              Reserve your table for an unforgettable Italian dining experience
            </motion.p>
          </ScrollReveal>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="py-16 px-6 -mt-20 relative z-20">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                onSubmit={handleSubmit}
                className="rustic-card rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] p-6">
                  <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                    <span>📅</span>
                    Reservation Details
                  </h2>
                </div>

                <div className="p-8">
                  {/* Date, Time, Guests Row */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <ScrollReveal direction="up" delay={0.1}>
                      <div>
                        <label className="block text-[#3d2914] font-medium mb-2">
                          Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={today}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all"
                        />
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.2}>
                      <div>
                        <label className="block text-[#3d2914] font-medium mb-2">
                          Time *
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.3}>
                      <div>
                        <label className="block text-[#3d2914] font-medium mb-2">
                          Guests *
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                        </select>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Seating Preference */}
                  <ScrollReveal direction="up" delay={0.4}>
                    <div className="mb-8">
                      <label className="block text-[#3d2914] font-medium mb-4">
                        Seating Preference
                      </label>
                      <div className="grid md:grid-cols-3 gap-4">
                        {seatingOptions.map((option, index) => (
                          <motion.label
                            key={option.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all ${
                              formData.seating === option.value
                                ? 'border-[#c25e3e] bg-[#c25e3e]/10'
                                : 'border-[#d4a574]/30 bg-[#f9f5f0] hover:border-[#c25e3e]/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="seating"
                              value={option.value}
                              checked={formData.seating === option.value}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <span className="text-3xl block mb-2">{option.icon}</span>
                              <span className="text-[#3d2914] font-medium">{option.label}</span>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Divider */}
                  <div className="border-t border-[#d4a574]/30 my-8" />

                  {/* Personal Information */}
                  <div className="mb-8">
                    <h3 className="text-xl font-serif font-bold text-[#3d2914] mb-6 flex items-center gap-2">
                      <span>👤</span>
                      Your Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ScrollReveal direction="left" delay={0.5}>
                        <div>
                          <label className="block text-[#3d2914] font-medium mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all"
                            placeholder="John"
                          />
                        </div>
                      </ScrollReveal>

                      <ScrollReveal direction="right" delay={0.5}>
                        <div>
                          <label className="block text-[#3d2914] font-medium mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all"
                            placeholder="Doe"
                          />
                        </div>
                      </ScrollReveal>

                      <ScrollReveal direction="left" delay={0.6}>
                        <div>
                          <label className="block text-[#3d2914] font-medium mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </ScrollReveal>

                      <ScrollReveal direction="right" delay={0.6}>
                        <div>
                          <label className="block text-[#3d2914] font-medium mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <ScrollReveal direction="up" delay={0.7}>
                    <div className="mb-8">
                      <label className="block text-[#3d2914] font-medium mb-2">
                        Special Requests
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all resize-none"
                        placeholder="Allergies, special occasions, seating preferences..."
                      />
                    </div>
                  </ScrollReveal>

                  {/* Auth Notice */}
                  <ScrollReveal direction="up" delay={0.8}>
                    {!isSignedIn && (
                      <div className="bg-[#2a2218]/10 rounded-lg p-4 mb-8 flex items-center gap-4">
                        <span className="text-2xl">🔐</span>
                        <div>
                          <p className="text-[#3d2914] font-medium">Sign in for faster booking</p>
                          <p className="text-[#6b7b5f] text-sm">Your information will be saved for future reservations</p>
                        </div>
                        <SignInButton>
                          <button type="button" className="ml-auto px-4 py-2 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-md font-medium text-sm">
                            Sign In
                          </button>
                        </SignInButton>
                      </div>
                    )}
                  </ScrollReveal>

                  {/* Payment Status Messages */}
                  {paymentSuccess && (
                    <ScrollReveal direction="up">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-center gap-4">
                        <span className="text-2xl">✅</span>
                        <div>
                          <p className="text-green-800 font-medium">Payment Successful!</p>
                          <p className="text-green-600 text-sm">Your reservation is confirmed. Check your email for details.</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  )}

                  {paymentCancelled && (
                    <ScrollReveal direction="up">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex items-center gap-4">
                        <span className="text-2xl">⚠️</span>
                        <div>
                          <p className="text-yellow-800 font-medium">Payment Cancelled</p>
                          <p className="text-yellow-600 text-sm">Your reservation was not completed. Please try again.</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  )}

                  {/* Submit Button */}
                  <ScrollReveal direction="up" delay={0.9}>
                    <motion.button
                      type="button"
                      onClick={handleCheckout}
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>🍽️</span>
                          {formData.seating === 'private' ? 'Reserve Private Room - $100' : 'Reserve Table - $25 Deposit'}
                        </>
                      )}
                    </motion.button>
                    <p className="text-center text-[#6b7b5f] text-sm mt-3">
                      🔒 Secure payment powered by Stripe. Deposit is refundable.
                    </p>
                  </ScrollReveal>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rustic-card rounded-2xl overflow-hidden shadow-2xl text-center p-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
                >
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="w-12 h-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-serif font-bold text-[#3d2914] mb-4"
                >
                  Reservation Confirmed!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[#6b7b5f] mb-8"
                >
                  We look forward to welcoming you on{' '}
                  <span className="font-semibold text-[#c25e3e]">
                    {formData.date} at {formData.time}
                  </span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rustic-card rounded-xl p-6 mb-8 inline-block"
                >
                  <div className="grid grid-cols-2 gap-6 text-left">
                    <div>
                      <p className="text-[#6b7b5f] text-sm">Party Size</p>
                      <p className="text-[#3d2914] font-semibold">{formData.guests} Guests</p>
                    </div>
                    <div>
                      <p className="text-[#6b7b5f] text-sm">Seating</p>
                      <p className="text-[#3d2914] font-semibold capitalize">{formData.seating}</p>
                    </div>
                    <div>
                      <p className="text-[#6b7b5f] text-sm">Name</p>
                      <p className="text-[#3d2914] font-semibold">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-[#6b7b5f] text-sm">Confirmation</p>
                      <p className="text-[#3d2914] font-semibold">#NC{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-[#6b7b5f] mb-8"
                >
                  A confirmation email has been sent to{' '}
                  <span className="text-[#3d2914]">{formData.email}</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <a
                    href="/menu"
                    className="px-8 py-3 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-md font-medium hover:shadow-lg transition-all"
                  >
                    Preview Menu
                  </a>
                  <a
                    href="/contact"
                    className="px-8 py-3 border-2 border-[#c25e3e] text-[#c25e3e] rounded-md font-medium hover:bg-[#c25e3e] hover:text-white transition-all"
                  >
                    Contact Us
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center p-6"
              >
                <span className="text-5xl mb-4 block">🕐</span>
                <h3 className="text-xl font-serif font-bold text-[#3d2914] mb-2">Opening Hours</h3>
                <p className="text-[#6b7b5f]">Mon-Thu: 5PM - 10PM</p>
                <p className="text-[#6b7b5f]">Fri-Sat: 5PM - 11PM</p>
                <p className="text-[#6b7b5f]">Sunday: 4PM - 9:30PM</p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center p-6"
              >
                <span className="text-5xl mb-4 block">📞</span>
                <h3 className="text-xl font-serif font-bold text-[#3d2914] mb-2">Call Us</h3>
                <p className="text-[#6b7b5f]">For immediate assistance</p>
                <a href="tel:+12125550123" className="text-[#c25e3e] font-semibold hover:underline">
                  (212) 555-0123
                </a>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center p-6"
              >
                <span className="text-5xl mb-4 block">🎉</span>
                <h3 className="text-xl font-serif font-bold text-[#3d2914] mb-2">Private Events</h3>
                <p className="text-[#6b7b5f]">Hosting a special occasion?</p>
                <a href="/contact" className="text-[#c25e3e] font-semibold hover:underline">
                  Contact for bookings
                </a>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
