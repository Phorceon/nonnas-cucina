'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ParallaxImage } from '@/components/ParallaxImage';

const featuredDishes = [
  {
    name: 'Spaghetti Carbonara',
    description: 'Guanciale, pecorino romano, farm egg, black pepper',
    price: '$24',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    category: 'Primi',
  },
  {
    name: 'Osso Buco alla Milanese',
    description: 'Braised veal shanks, saffron risotto, gremolata',
    price: '$42',
    image: 'https://images.unsplash.com/photo-1544025152-870d97f1181e?w=800&q=80',
    category: 'Secondi',
  },
  {
    name: 'Tiramisù Classico',
    description: 'Espresso-soaked ladyfingers, mascarpone, cocoa',
    price: '$14',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    category: 'Dolci',
  },
];

const testimonials = [
  {
    quote: "The most authentic Italian food I've had outside of Italy. Nonna would be proud!",
    author: 'Michael R.',
    rating: 5,
  },
  {
    quote: 'Every dish tells a story. The carbonara is simply perfection.',
    author: 'Sarah L.',
    rating: 5,
  },
  {
    quote: 'A warm, inviting atmosphere with food that feels like home.',
    author: 'James T.',
    rating: 5,
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80"
          >
            <source src="https://videos.pexels.com/video-files/5926268/5926268-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        >
          <ScrollReveal direction="up" delay={0.2} duration={1}>
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#d4a574] text-sm md:text-base mb-6 tracking-widest uppercase"
            >
              Welcome to
            </motion.p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4} duration={1}>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#f5f0eb] mb-6 leading-tight"
            >
              Nonna&apos;s Cucina
            </motion.h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.6} duration={1}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-[#f5f0eb]/90 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Authentic Italian recipes passed down through generations. 
              Experience the warmth of tradition in every bite.
            </motion.p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.8} duration={1}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/menu"
                className="group px-8 py-4 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-md font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Menu
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
              <Link
                href="/reservations"
                className="px-8 py-4 border-2 border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#1a1510] rounded-md font-medium text-lg transition-all duration-300"
              >
                Book a Table
              </Link>
            </motion.div>
          </ScrollReveal>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#d4a574]/50 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#d4a574] rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#1a1510] to-[#2a2218]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#d4a574] text-sm tracking-widest uppercase"
              >
                Our Specialties
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif font-bold text-[#f5f0eb] mt-4 mb-6"
              >
                Featured Dishes
              </motion.h2>
              <div className="divider-ornament">
                <span>❧</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <ScrollReveal
                key={dish.name}
                direction="up"
                delay={index * 0.2}
                once
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="group rustic-card rounded-xl overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#c25e3e] text-white text-sm rounded-full">
                      {dish.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-serif font-bold text-[#3d2914]">
                        {dish.name}
                      </h3>
                      <span className="text-2xl font-bold text-[#c25e3e]">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-[#6b7b5f]">{dish.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.6}>
            <div className="text-center mt-12">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-[#c25e3e] hover:text-[#a04a2e] font-medium text-lg group"
              >
                View Full Menu
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#f5f0eb] to-[#f9f5f0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&q=80"
                    alt="Nonna cooking"
                    className="w-full h-[500px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-[#c25e3e] to-[#d4a574] rounded-xl -z-0"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -top-8 -left-8 w-32 h-32 border-4 border-[#d4a574]/30 rounded-xl -z-0"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[#c25e3e] text-sm tracking-widest uppercase"
                >
                  Our Story
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-serif font-bold text-[#3d2914] mt-4 mb-6"
                >
                  A Tradition of Love & Flavor
                </motion.h2>
                <div className="divider-ornament justify-start">
                  <span>❧</span>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-[#3d2914]/80 leading-relaxed mb-6 text-lg"
                >
                  In 1952, Nonna Maria opened her small kitchen to neighbors, 
                  serving dishes she learned from her mother in the hills of Tuscany. 
                  What began as simple acts of generosity grew into a legacy.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-[#3d2914]/80 leading-relaxed mb-8 text-lg"
                >
                  Today, we honor her memory by preserving those original recipes, 
                  using the same techniques, the same passion, and the same belief 
                  that food is best when shared with love.
                </motion.p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-md font-medium hover:shadow-lg transition-all duration-300"
                >
                  Learn More About Us
                  <span>→</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#2a2218] to-[#1a1510]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#d4a574] text-sm tracking-widest uppercase"
              >
                Testimonials
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif font-bold text-[#f5f0eb] mt-4 mb-6"
              >
                What Our Guests Say
              </motion.h2>
              <div className="divider-ornament">
                <span>❧</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal
                key={testimonial.author}
                direction="up"
                delay={index * 0.2}
                once
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-8 rounded-xl bg-[#251e16] border border-[#3d2914]/30"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="text-[#d4a574]"
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                  <p className="text-[#f5f0eb]/90 text-lg leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="text-[#d4a574] font-medium">— {testimonial.author}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1510]/90 to-[#1a1510]/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif font-bold text-[#f5f0eb] mb-6"
            >
              Reserve Your Table
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#f5f0eb]/90 mb-10"
            >
              Join us for an unforgettable dining experience. 
              Book your table today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-md font-medium text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Make a Reservation
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
