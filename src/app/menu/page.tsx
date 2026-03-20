'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  vegetarian?: boolean;
  serves?: string;
}

interface MenuCategory {
  title: string;
  subtitle: string;
  icon: string;
  items: MenuItem[];
}

// Reliable food images from Unsplash (verified working)
const foodImages = {
  italian: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
  pasta: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
  meat: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
  seafood: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
  bread: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
  tomato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
  cheese: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
  wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
  dessert: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400',
  coffee: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
  vegetables: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
  risotto: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400',
  steak: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
  chicken: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
  soup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
  appetizer: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=400',
};

const menuCategories: Record<string, MenuCategory> = {
  antipasti: {
    title: 'Antipasti',
    subtitle: 'Appetizers',
    icon: '🫒',
    items: [
      {
        name: 'Bruschetta al Pomodoro',
        description: 'Grilled sourdough, San Marzano tomatoes, fresh basil, garlic, extra virgin olive oil',
        price: '$14',
        image: foodImages.tomato,
        vegetarian: true,
      },
      {
        name: 'Caprese di Bufala',
        description: 'Buffalo mozzarella, heirloom tomatoes, fresh basil, balsamic glaze',
        price: '$18',
        image: foodImages.cheese,
        vegetarian: true,
      },
      {
        name: 'Arancini al Ragù',
        description: 'Sicilian rice balls, beef ragù, peas, mozzarella, marinara sauce',
        price: '$16',
        image: foodImages.risotto,
      },
      {
        name: 'Carpaccio di Manzo',
        description: 'Thinly sliced raw beef, arugula, capers, parmesan shavings, truffle aioli',
        price: '$22',
        image: foodImages.meat,
      },
      {
        name: 'Calamari Fritti',
        description: 'Crispy fried squid, lemon aioli, marinara, fresh lemon',
        price: '$19',
        image: foodImages.seafood,
      },
      {
        name: 'Prosciutto e Melone',
        description: 'Prosciutto di Parma, cantaloupe melon, fresh mint, aged balsamic',
        price: '$20',
        image: foodImages.appetizer,
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
        image: foodImages.pasta,
      },
      {
        name: 'Bucatini all\'Amatriciana',
        description: 'Guanciale, San Marzano tomatoes, pecorino romano, white wine',
        price: '$23',
        image: foodImages.pasta,
      },
      {
        name: 'Risotto ai Funghi Porcini',
        description: 'Arborio rice, porcini mushrooms, parmesan, white wine, truffle oil',
        price: '$28',
        image: foodImages.risotto,
        vegetarian: true,
      },
      {
        name: 'Lasagna della Nonna',
        description: 'House-made pasta, beef ragù, béchamel, parmesan, mozzarella',
        price: '$26',
        image: foodImages.italian,
      },
      {
        name: 'Pappardelle al Cinghiale',
        description: 'Wide ribbon pasta, wild boar ragù, juniper berries, parmesan',
        price: '$32',
        image: foodImages.pasta,
      },
      {
        name: 'Cacio e Pepe',
        description: 'Tonnarelli pasta, pecorino romano, black pepper',
        price: '$22',
        image: foodImages.pasta,
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
        image: foodImages.meat,
      },
      {
        name: 'Saltimbocca alla Romana',
        description: 'Veal scaloppine, prosciutto, sage, white wine sauce, roasted potatoes',
        price: '$38',
        image: foodImages.meat,
      },
      {
        name: 'Branzino al Forno',
        description: 'Mediterranean sea bass, lemon, herbs, roasted vegetables, olive oil',
        price: '$36',
        image: foodImages.seafood,
      },
      {
        name: 'Bistecca alla Fiorentina',
        description: 'Grilled T-bone steak (for two), rosemary potatoes, grilled vegetables',
        price: '$85',
        image: foodImages.steak,
        serves: 'Serves 2',
      },
      {
        name: 'Pollo al Mattone',
        description: 'Brick-pressed chicken, lemon, rosemary, roasted potatoes',
        price: '$28',
        image: foodImages.chicken,
      },
      {
        name: 'Agnello alle Erbe',
        description: 'Herb-crusted lamb rack, mint pesto, roasted root vegetables',
        price: '$40',
        image: foodImages.meat,
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
        image: foodImages.vegetables,
        vegetarian: true,
      },
      {
        name: 'Verdure Grigliate',
        description: 'Grilled seasonal vegetables, balsamic glaze, herbs',
        price: '$10',
        image: foodImages.vegetables,
        vegetarian: true,
      },
      {
        name: 'Spinaci al Limone',
        description: 'Sautéed spinach, lemon, garlic, chili flakes',
        price: '$9',
        image: foodImages.salad,
        vegetarian: true,
      },
      {
        name: 'Funghi Trifolati',
        description: 'Sautéed wild mushrooms, garlic, parsley, white wine',
        price: '$12',
        image: foodImages.risotto,
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
        image: foodImages.dessert,
      },
      {
        name: 'Panna Cotta ai Frutti di Bosco',
        description: 'Vanilla bean panna cotta, mixed berry compote',
        price: '$12',
        image: foodImages.dessert,
      },
      {
        name: 'Cannoli Siciliani',
        description: 'Crispy pastry shells, sweet ricotta, pistachios, chocolate chips',
        price: '$13',
        image: foodImages.dessert,
      },
      {
        name: 'Affogato al Caffè',
        description: 'Vanilla gelato, hot espresso, amaretti cookies',
        price: '$10',
        image: foodImages.coffee,
      },
      {
        name: 'Torta della Nonna',
        description: 'Grandmother\'s cake, custard, pine nuts, powdered sugar',
        price: '$12',
        image: foodImages.dessert,
      },
      {
        name: 'Gelato Artigianale',
        description: 'Three scoops of house-made gelato (ask for flavors)',
        price: '$11',
        image: foodImages.dessert,
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
        image: foodImages.wine,
      },
      {
        name: 'Barolo DOCG',
        description: 'Piedmont, Italy - Glass / Bottle',
        price: '$22 / $95',
        image: foodImages.wine,
      },
      {
        name: 'Prosecco Superiore DOCG',
        description: 'Veneto, Italy - Glass / Bottle',
        price: '$12 / $48',
        image: foodImages.wine,
      },
      {
        name: 'Aperol Spritz',
        description: 'Aperol, Prosecco, soda, orange slice',
        price: '$14',
        image: foodImages.wine,
      },
      {
        name: 'Negroni',
        description: 'Gin, Campari, sweet vermouth, orange peel',
        price: '$16',
        image: foodImages.wine,
      },
      {
        name: 'Espresso / Cappuccino',
        description: 'Traditional Italian coffee',
        price: '$4 / $6',
        image: foodImages.coffee,
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
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920"
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
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = foodImages.italian;
                            }}
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
