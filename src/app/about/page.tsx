'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';

const timeline = [
  {
    year: '1952',
    title: 'The Beginning',
    description: 'Nonna Maria opens her small kitchen to neighbors in Florence, serving traditional Tuscan dishes passed down through generations.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
  },
  {
    year: '1968',
    title: 'A Family Legacy',
    description: 'The recipes are passed to Nonna\'s daughter, Sofia, who expands the menu while preserving the authentic flavors of home.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
  },
  {
    year: '1985',
    title: 'Crossing Oceans',
    description: 'The family immigrates to America, bringing with them nothing but their cherished recipes and unwavering commitment to quality.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
  },
  {
    year: '1992',
    title: 'Nonna\'s Cucina Opens',
    description: 'The first official restaurant opens in New York, quickly becoming a beloved destination for authentic Italian cuisine.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600',
  },
  {
    year: 'Today',
    title: 'Continuing the Tradition',
    description: 'Three generations later, we continue to honor Nonna Maria\'s legacy with the same recipes, passion, and love for Italian cooking.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
  },
];

const team = [
  {
    name: 'Chef Antonio Rossi',
    role: 'Executive Chef & Owner',
    bio: 'Grandson of Nonna Maria, Antonio trained in Michelin-starred kitchens across Italy before returning to honor his family\'s legacy.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600',
  },
  {
    name: 'Sofia Benedetti',
    role: 'Pastry Chef',
    bio: 'Great-granddaughter of Nonna Maria, Sofia creates desserts that perfectly balance tradition with modern techniques.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600',
  },
  {
    name: 'Marco Gentile',
    role: 'Sommelier',
    bio: 'With over 20 years of experience, Marco curates our extensive wine collection featuring the finest Italian vintages.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600',
  },
];

const gallery = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', alt: 'Restaurant interior' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', alt: 'Chef preparing pasta' },
  { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800', alt: 'Dining area' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', alt: 'Kitchen' },
  { src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800', alt: 'Wine selection' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', alt: 'Fresh ingredients' },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0eb] to-[#f9f5f0]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920"
            alt="Nonna cooking"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#f5f0eb]" />
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6"
        >
          <ScrollReveal direction="up">
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 0.8 }}
              className="text-[#d4a574] text-sm tracking-widest uppercase"
            >
              Since 1952
            </motion.span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-bold text-[#f5f0eb] mt-4 mb-6"
            >
              Our Story
            </motion.h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-[#f5f0eb]/90 max-w-2xl mx-auto"
            >
              Three generations of passion, tradition, and authentic Italian flavors
            </motion.p>
          </ScrollReveal>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[#c25e3e] text-sm tracking-widest uppercase"
                >
                  Our Heritage
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-serif font-bold text-[#3d2914] mt-4 mb-6"
                >
                  From Florence to Your Table
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
                  In the rolling hills of Tuscany, Nonna Maria learned to cook from her mother, 
                  using ingredients from their garden and recipes that had been whispered 
                  from mother to daughter for centuries.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-[#3d2914]/80 leading-relaxed mb-6 text-lg"
                >
                  Every Sunday, the family would gather around her wooden table, 
                  watching as she transformed simple ingredients into extraordinary dishes. 
                  The smell of garlic and basil, the sound of rolling pasta dough, 
                  the warmth of her oven—these are the memories that built Nonna's Cucina.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-[#3d2914]/80 leading-relaxed text-lg"
                >
                  Today, we honor her memory by preserving those original recipes, 
                  using the same techniques, the same passion, and the same belief 
                  that food is best when shared with love.
                </motion.p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800"
                  alt="Traditional Italian cooking"
                  className="rounded-xl shadow-2xl w-full"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#c25e3e] to-[#d4a574] rounded-xl -z-10"
                />
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#f9f5f0] to-[#2a2218]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#d4a574] text-sm tracking-widest uppercase"
              >
                Our Journey
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif font-bold text-[#f5f0eb] mt-4 mb-6"
              >
                Through the Years
              </motion.h2>
              <div className="divider-ornament">
                <span>❧</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#c25e3e] via-[#d4a574] to-[#c25e3e]" />

            {timeline.map((item, index) => (
              <ScrollReveal
                key={item.year}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.1}
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex items-center gap-8 mb-16 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="rustic-card p-6 rounded-xl inline-block"
                    >
                      <span className="text-3xl font-bold text-[#c25e3e]">{item.year}</span>
                      <h3 className="text-xl font-serif font-bold text-[#3d2914] mt-2 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[#6b7b5f] leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                    className="w-6 h-6 bg-gradient-to-br from-[#c25e3e] to-[#d4a574] rounded-full border-4 border-[#f5f0eb] shadow-lg z-10"
                  />

                  <div className="flex-1 hidden md:block">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
                Our Team
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif font-bold text-[#f5f0eb] mt-4 mb-6"
              >
                Meet the Family
              </motion.h2>
              <div className="divider-ornament">
                <span>❧</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <ScrollReveal
                key={member.name}
                direction="up"
                delay={index * 0.15}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="rustic-card rounded-xl overflow-hidden"
                >
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-serif font-bold text-[#f5f0eb]">
                        {member.name}
                      </h3>
                      <p className="text-[#d4a574]">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[#6b7b5f] leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#1a1510] to-[#f5f0eb]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#d4a574] text-sm tracking-widest uppercase"
              >
                Gallery
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif font-bold text-[#3d2914] mt-4 mb-6"
              >
                A Glimpse Inside
              </motion.h2>
              <div className="divider-ornament">
                <span>❧</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
              <ScrollReveal
                key={image.alt}
                direction="up"
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  className={`rounded-xl overflow-hidden shadow-lg ${
                    index === 0 || index === 5 ? 'md:col-span-2' : ''
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#f5f0eb] to-[#f9f5f0]">
        <ScrollReveal direction="up">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-[#3d2914] mb-6"
            >
              Experience Our Tradition
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#6b7b5f] mb-10"
            >
              Join us for an unforgettable journey through authentic Italian cuisine
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/reservations"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-md font-medium text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Reserve a Table
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-[#c25e3e] text-[#c25e3e] hover:bg-[#c25e3e] hover:text-white rounded-md font-medium text-xl transition-all duration-300"
              >
                View Menu
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
