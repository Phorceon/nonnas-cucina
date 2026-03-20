'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

const menuCategories = {
  antipasti: {
    title: 'Antipasti',
    subtitle: 'Appetizers',
    icon: '🫒',
    items: [
      {
        name: 'Bruschetta al Pomodoro',
        description: 'Grilled sourdough, San Marzano tomatoes, fresh basil, garlic, extra virgin olive oil',
        price: '$14',
        image: 'https://images.unsplash.com/photo-1572695157363-bc31c5d4ef3c?w=400&q=80',
        vegetarian: true,
      },
      {
        name: 'Caprese di Bufala',
        description: 'Buffalo mozzarella, heirloom tomatoes, fresh basil, balsamic glaze',
        price: '$18',
        image: 'https://images.unsplash.com/photo-1529312266912-b33cf6227e24?w=400&q=80',
        vegetarian: true,
      },
      {
        name: 'Arancini al Ragù',
        description: 'Sicilian rice balls, beef ragù, peas, mozzarella, marinara sauce',
        price: '$16',
        image: 'https://images.unsplash.com/photo-1541544744-378ca6f00199?w=400&q=80',
      },
      {
        name: 'Carpaccio di Manzo',
        description: 'Thinly sliced raw beef, arugula, capers, parmesan shavings, truffle aioli',
        price: '$22',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
      },
      {
        name: 'Calamari Fritti',
        description: 'Crispy fried squid, lemon aioli, marinara, fresh lemon',
        price: '$19',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80',
      },
      {
        name: 'Prosciutto e Melone',
        description: 'Prosciutto di Parma, cantaloupe melon, fresh mint, aged balsamic',
        price: '$20',
        image: 'https://images.unsplash.com/photo-1529312266912-b33cf6227e24?w=400&q=80',
      },
    ],
  },
  primi: {
    title: 'Primi',
    subtitle: 'Pasta & Risotto',
    icon: '🍝',
    items: [
      {
        name: 'Spaghetti Carbonara',
        description: 'Guanciale, pecorino romano, farm egg, black pepper',
        price: '$24',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80',
      },
      {
        name: 'Bucatini all\'Amatriciana',
        description: 'Guanciale, San Marzano tomatoes, pecorino romano, white wine',
        price: '$23',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80',
      },
      {
        name: 'Risotto ai Funghi Porcini',
        description: 'Arborio rice, porcini mushrooms, parmesan, white wine, truffle oil',
        price: '$28',
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80',
        vegetarian: true,
      },
      {
        name: 'Lasagna della Nonna',
        description: 'House-made pasta, beef ragù, béchamel, parmesan, mozzarella',
        price: '$26',
        image: 'https://images.unsplash.com/photo-1574868233972-150cea940251?w=400&q=80',
      },
      {
        name: 'Pappardelle al Cinghiale',
        description: 'Wide ribbon pasta, wild boar ragù, juniper berries, parmesan',
        price: '$32',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80',
      },
      {
        name: 'Cacio e Pepe',
        description: 'Tonnarelli pasta, pecorino romano, black pepper',
        price: '$22',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80',
        vegetarian: true,
      },
    ],
  },
  secondi: {
    title: 'Secondi',
    subtitle: 'Main Courses',
    icon: '🥩',
    items: [
      {
        name: 'Osso Buco alla Milanese',
        description: 'Braised veal shanks, saffron risotto, gremolata',
        price: '$42',
        image: 'https://images.unsplash.com/photo-1544025152-870d97f1181e?w=400&q=80',
      },
      {
        name: 'Saltimbocca alla Romana',
        description: 'Veal scaloppine, prosciutto, sage, white wine sauce, roasted potatoes',
        price: '$38',
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80',
      },
      {
        name: 'Branzino al Forno',
        description: 'Mediterranean sea bass, lemon, herbs, roasted vegetables, olive oil',
        price: '$36',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
      },
      {
        name: 'Bistecca alla Fiorentina',
        description: 'Grilled T-bone steak (for two), rosemary potatoes, grilled vegetables',
        price: '$85',
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80',
        serves: 'Serves 2',
      },
      {
        name: 'Pollo al Mattone',
        description: 'Brick-pressed chicken, lemon, rosemary, roasted potatoes',
        price: '$28',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=80',
      },
      {
        name: 'Agnello alle Erbe',
        description: 'Herb-crusted lamb rack, mint pesto, roasted root vegetables',
        price: '$40',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80',
      },
    ],
  },
  contorni: {
    title: 'Contorni',
    subtitle: 'Side Dishes',
    icon: '🥗',
    items: [
      {
        name: 'Patate Arrosto',
        description: 'Rosemary roasted potatoes, garlic, olive oil',
        price: '$8',
        image: 'https://images.unsplash.com/photo-1605333329950-44751018f259?w=400&q=80',
        vegetarian: true,
      },
      {
        name: 'Verdure Grigliate',
        description: 'Grilled seasonal vegetables, balsamic glaze, herbs',
        price: '$10',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
        vegetarian: true,
      },
      {
        name: 'Spinaci al Limone',
        description: 'Sautéed spinach, lemon, garlic, chili flakes',
        price: '$9',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
        vegetarian: true,
      },
      {
        name: 'Funghi Trifolati',
        description: 'Sautéed wild mushrooms, garlic, parsley, white wine',
        price: '$12',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
        vegetarian: true,
      },
    ],
  },
  dolci: {
    title: 'Dolci',
    subtitle: 'Desserts',
    icon: '🍰',
    items: [
      {
        name: 'Tiramisù Classico',
        description: 'Espresso-soaked ladyfingers, mascarpone, cocoa',
        price: '$14',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
      },
      {
        name: 'Panna Cotta ai Frutti di Bosco',
        description: 'Vanilla bean panna cotta, mixed berry compote',
        price: '$12',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
      },
      {
        name: 'Cannoli Siciliani',
        description: 'Crispy pastry shells, sweet ricotta, pistachios, chocolate chips',
        price: '$13',
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
      },
      {
        name: 'Affogato al Caffè',
        description: 'Vanilla gelato, hot espresso, amaretti cookies',
        price: '$10',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
      },
      {
        name: 'Torta della Nonna',
        description: 'Grandmother\'s cake, custard, pine nuts, powdered sugar',
        price: '$12',
        image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=80',
      },
      {
        name: 'Gelato Artigianale',
        description: 'Three scoops of house-made gelato (ask for flavors)',
        price: '$11',
        image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80',
      },
    ],
  },
  bevande: {
    title: 'Bevande',
    subtitle: 'Drinks',
    icon: '🍷',
    items: [
      {
        name: 'Chianti Classico DOCG',
        description: 'Tuscany, Italy - Glass / Bottle',
        price: '$14 / $52',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80',
      },
      {
        name: 'Barolo DOCG',
        description: 'Piedmont, Italy - Glass / Bottle',
        price: '$22 / $95',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80',
      },
      {
        name: 'Prosecco Superiore DOCG',
        description: 'Veneto, Italy - Glass / Bottle',
        price: '$12 / $48',
        image: 'https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?w=400&q=80',
      },
      {
        name: 'Aperol Spritz',
        description: 'Aperol, Prosecco, soda, orange slice',
        price: '$14',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
      },
      {
        name: 'Negroni',
        description: 'Gin, Campari, sweet vermouth, orange peel',
        price: '$16',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
      },
      {
        name: 'Espresso / Cappuccino',
        description: 'Traditional Italian coffee',
        price: '$4 / $6',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
      },
    ],
  },
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('antipasti');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f0eb] to-[#f9f5f0]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80"
            alt="Menu background"
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
              Discover Our Flavors
            </motion.span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-bold text-[#f5f0eb] mt-4 mb-6"
            >
              Our Menu
            </motion.h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-[#f5f0eb]/90 max-w-2xl mx-auto"
            >
              Authentic Italian recipes crafted with passion and the finest ingredients
            </motion.p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-[72px] z-40 bg-[#f5f0eb]/95 backdrop-blur-md border-b border-[#d4a574]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <motion.div
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {Object.entries(menuCategories).map(([key, category], index) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white shadow-lg'
                    : 'bg-[#2a2218] text-[#f5f0eb] hover:bg-[#3d2914]'
                }`}
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.title}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-5xl mb-4 block"
                >
                  {menuCategories[activeCategory as keyof typeof menuCategories].icon}
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-serif font-bold text-[#3d2914]"
                >
                  {menuCategories[activeCategory as keyof typeof menuCategories].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#6b7b5f] mt-2"
                >
                  {menuCategories[activeCategory as keyof typeof menuCategories].subtitle}
                </motion.p>
                <div className="divider-ornament">
                  <span>❧</span>
                </div>
              </div>

              {/* Menu Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {menuCategories[activeCategory as keyof typeof menuCategories].items.map(
                  (item, index) => (
                    <ScrollReveal
                      key={item.name}
                      direction="up"
                      delay={index * 0.05}
                      once
                    >
                      <motion.div
                        whileHover={{ y: -5, scale: 1.01 }}
                        className="rustic-card rounded-xl overflow-hidden flex flex-col sm:flex-row group"
                      >
                        <div className="sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-serif font-bold text-[#3d2914] group-hover:text-[#c25e3e] transition-colors">
                                {item.name}
                              </h3>
                              <span className="text-xl font-bold text-[#c25e3e] whitespace-nowrap">
                                {item.price}
                              </span>
                            </div>
                            {item.serves && (
                              <span className="inline-block px-2 py-1 bg-[#d4a574]/20 text-[#c25e3e] text-xs rounded-full mb-2">
                                {item.serves}
                              </span>
                            )}
                            <p className="text-[#6b7b5f] text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          {item.vegetarian && (
                            <span className="inline-block mt-3 px-2 py-1 bg-[#6b7b5f]/20 text-[#6b7b5f] text-xs rounded-full w-fit">
                              Vegetarian
                            </span>
                          )}
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  )
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#f9f5f0] to-[#f5f0eb]">
        <ScrollReveal direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif font-bold text-[#3d2914] mb-4"
            >
              Ready to Experience Our Cuisine?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#6b7b5f] mb-8"
            >
              Reserve your table and let us take you on a culinary journey through Italy
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="/reservations"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#c25e3e] to-[#a04a2e] text-white rounded-md font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Make a Reservation
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
