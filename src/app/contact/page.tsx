'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';

const contactInfo = [
  {
    icon: '📍',
    title: 'Visit Us',
    lines: ['123 Olive Garden Lane', 'New York, NY 10001'],
  },
  {
    icon: '📞',
    title: 'Call Us',
    lines: ['(212) 555-0123', '(212) 555-0124 (Reservations)'],
  },
  {
    icon: '✉️',
    title: 'Email Us',
    lines: ['ciao@nonnascucina.com', 'events@nonnascucina.com'],
  },
  {
    icon: '🕐',
    title: 'Opening Hours',
    lines: ['Mon-Thu: 5PM - 10PM', 'Fri-Sat: 5PM - 11PM', 'Sun: 4PM - 9:30PM'],
  },
];

const faqs = [
  {
    question: 'Do you accommodate dietary restrictions?',
    answer: 'Absolutely! We offer gluten-free pasta, vegetarian, and vegan options. Please inform us of any allergies or dietary needs when making your reservation.',
  },
  {
    question: 'Is there parking available?',
    answer: 'Yes, we have valet parking available in the evenings. There is also street parking and a public garage located one block away.',
  },
  {
    question: 'Do you host private events?',
    answer: 'Yes! Our private dining room can accommodate up to 40 guests. Please contact our events team at events@nonnascucina.com for more information.',
  },
  {
    question: 'What is your dress code?',
    answer: 'We maintain a smart casual dress code. We welcome you to dress comfortably while respecting the upscale atmosphere of our restaurant.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0eb] to-[#f9f5f0]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920"
            alt="Contact background"
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
              Get in Touch
            </motion.span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-bold text-[#f5f0eb] mt-4 mb-6"
            >
              Contact Us
            </motion.h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-[#f5f0eb]/90 max-w-2xl mx-auto"
            >
              We'd love to hear from you. Reach out with any questions or feedback.
            </motion.p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <ScrollReveal key={info.title} direction="up" delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="rustic-card rounded-xl p-6 text-center bg-gradient-to-br from-[#f9f5f0] to-[#f5f0eb]"
                >
                  <span className="text-4xl mb-4 block">{info.icon}</span>
                  <h3 className="text-lg font-serif font-bold text-[#3d2914] mb-3">
                    {info.title}
                  </h3>
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-[#6b7b5f] text-sm">
                      {line}
                    </p>
                  ))}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3d2914] mb-6">
                  Send Us a Message
                </h2>
                <p className="text-[#6b7b5f] mb-8">
                  Have a question or feedback? We'd love to hear from you. 
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rustic-card rounded-xl p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-serif font-bold text-[#3d2914] mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[#6b7b5f]">
                      Thank you for reaching out. We'll respond to your message shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#3d2914] font-medium mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-[#3d2914] font-medium mb-2">
                          Email Address *
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
                    </div>
                    <div>
                      <label className="block text-[#3d2914] font-medium mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="reservation">Reservation Question</option>
                        <option value="events">Private Events</option>
                        <option value="feedback">Feedback</option>
                        <option value="careers">Careers</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#3d2914] font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-[#d4a574]/30 bg-[#f9f5f0] text-[#3d2914] focus:outline-none focus:ring-2 focus:ring-[#c25e3e] focus:border-transparent transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <span>📨</span>
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Map Placeholder */}
            <ScrollReveal direction="right">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3d2914] mb-6">
                  Find Us
                </h2>
                <div className="rustic-card rounded-xl overflow-hidden h-[500px] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2a2218] to-[#1a1510] flex items-center justify-center">
                    <div className="text-center p-8">
                      <span className="text-6xl mb-4 block">🗺️</span>
                      <p className="text-[#f5f0eb] font-medium mb-2">Interactive Map</p>
                      <p className="text-[#d4a574] text-sm">123 Olive Garden Lane, New York, NY 10001</p>
                      <a
                        href="https://maps.google.com/?q=123+Olive+Garden+Lane+New+York+NY+10001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-md font-medium hover:shadow-lg transition-all"
                      >
                        Open in Google Maps
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                  {/* Decorative map elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-[#c25e3e]/20 rounded-full blur-xl" />
                  <div className="absolute bottom-4 left-4 w-32 h-32 bg-[#d4a574]/20 rounded-full blur-xl" />
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href="tel:+12125550123"
                    className="rustic-card rounded-xl p-4 text-center hover:bg-[#c25e3e]/10 transition-colors"
                  >
                    <span className="text-2xl mb-2 block">📞</span>
                    <span className="text-[#3d2914] font-medium">Call Now</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href="/reservations"
                    className="rustic-card rounded-xl p-4 text-center hover:bg-[#c25e3e]/10 transition-colors"
                  >
                    <span className="text-2xl mb-2 block">📅</span>
                    <span className="text-[#3d2914] font-medium">Book a Table</span>
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#f9f5f0] to-[#2a2218]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#d4a574] text-sm tracking-widest uppercase"
              >
                FAQ
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif font-bold text-[#f5f0eb] mt-4 mb-6"
              >
                Frequently Asked Questions
              </motion.h2>
              <div className="divider-ornament">
                <span>❧</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq.question} direction="up" delay={index * 0.1}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#2a2218] to-[#1a1510]">
        <ScrollReveal direction="up">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#d4a574] text-sm tracking-widest uppercase"
            >
              Follow Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-serif font-bold text-[#f5f0eb] mt-4 mb-6"
            >
              Stay Connected
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-[#f5f0eb]/80 mb-10"
            >
              Follow us on social media for daily specials, events, and behind-the-scenes content
            </motion.p>
            <div className="flex justify-center gap-6">
              {[
                { name: 'Instagram', icon: '📸', href: '#' },
                { name: 'Facebook', icon: '📘', href: '#' },
                { name: 'Twitter', icon: '🐦', href: '#' },
                { name: 'TikTok', icon: '🎵', href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 rounded-full bg-[#251e16] flex items-center justify-center text-3xl hover:bg-gradient-to-br hover:from-[#c25e3e] hover:to-[#a04a2e] transition-all shadow-lg"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="rustic-card rounded-xl overflow-hidden"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#c25e3e]/5 transition-colors"
      >
        <span className="text-[#3d2914] font-medium text-lg pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#c25e3e] text-2xl flex-shrink-0"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[#6b7b5f] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Add AnimatePresence import
import { AnimatePresence } from 'framer-motion';
