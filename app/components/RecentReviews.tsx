'use client';

import { CheckIcon, XMarkIcon, ChatBubbleLeftRightIcon, StarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Animation variants
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { 
      duration: 0.2 
    } 
  },
};

// Gradient colors for avatars
const avatarGradients = [
  'from-blue-500 to-indigo-600',
  'from-pink-500 to-rose-500',
  'from-emerald-500 to-teal-600',
  'from-amber-400 to-orange-500',
  'from-purple-500 to-fuchsia-600',
];

// Get random gradient for avatar
const getRandomGradient = (index: number) => {
  return avatarGradients[index % avatarGradients.length];
};

type Review = {
  id: number;
  rating: number;
  message: string;
  date: string;
  published: boolean;
  author: string;
  product: string;
};

const RecentReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      rating: 5,
      message: 'Service exceptionnel, je recommande vivement ce produit ! La qualité est au rendez-vous et la livraison a été rapide. Emballage soigné et instructions claires.',
      date: 'Il y a 2 heures',
      published: false,
      author: 'Jean D.',
      product: 'Montre connectée Pro',
    },
    {
      id: 2,
      rating: 4,
      message: 'Très bon produit, correspond parfaitement à mes attentes. Petit bémol sur la durée de vie de la batterie qui pourrait être améliorée. Le design est moderne et confortable à porter.',
      date: 'Hier',
      published: true,
      author: 'Marie L.',
      product: 'Casque audio sans fil',
    },
    {
      id: 3,
      rating: 3,
      message: 'Produit correct pour le prix, mais j\'ai rencontré quelques difficultés avec la configuration initiale. Le service client a été réactif pour résoudre le problème. Je recommande tout de même.',
      date: 'Il y a 3 jours',
      published: false,
      author: 'Thomas P.',
      product: 'Enceinte Bluetooth',
    },
    {
      id: 4,
      rating: 5,
      message: 'Tout simplement parfait ! Le produit dépasse mes attentes. La qualité est au rendez-vous et le service client est réactif. Je recommande vivement ce produit à tous les amateurs de technologie.',
      date: 'Il y a 5 jours',
      published: true,
      author: 'Sophie M.',
      product: 'Smartphone Premium',
    },
  ]);
  
  // Référence pour le conteneur des avis
  const containerRef = useRef<HTMLDivElement>(null);
  
  // État pour gérer le rendu côté client uniquement
  const [isClient, setIsClient] = useState(false);
  
  // Mise à jour de l'état après le montage côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePublish = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, published: true } : review
    ));
  };

  const handleReject = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.span
            key={star}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          >
            <StarIcon
              className={`w-5 h-5 ${
                star <= rating ? 'text-amber-400' : 'text-gray-200'
              }`}
              fill={star <= rating ? 'currentColor' : 'none'}
            />
          </motion.span>
        ))}
        <motion.span 
          className="ml-2 text-sm font-medium bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {rating.toFixed(1)}
        </motion.span>
      </div>
    );
  };

  // Afficher un état de chargement côté serveur
  if (!isClient) {
    return (
      <div className="mt-8">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="mt-8"
      initial="hidden"
      animate="show"
      variants={container}
      key="reviews-container"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.div variants={item} className="relative">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Avis récents
          </h2>
          <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
        </motion.div>
        
        <motion.button 
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="group flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
        >
          <span className="relative">
            Voir tous les avis
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
          </span>
          <ArrowRightIcon className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-200" />
        </motion.button>
      </div>
      
      <div ref={containerRef} className="space-y-5">
        <AnimatePresence>
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              layout
              variants={item}
              initial="hidden"
              animate="show"
              exit="exit"
              className={`group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                !review.published 
                  ? 'ring-2 ring-indigo-100 bg-gradient-to-br from-white to-indigo-50' 
                  : 'border border-gray-100 hover:border-indigo-100'
              }`}
            >
              {!review.published && (
                <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">
                  Nouveau
                </span>
              )}
              
              <div className="flex items-start space-x-5">
                <motion.div 
                  className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold 
                    bg-gradient-to-br ${getRandomGradient(index)} shadow-md`}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {review.author.charAt(0)}
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">{review.author}</h4>
                      <p className="text-sm text-gray-500">Avis sur <span className="font-medium text-gray-700">{review.product}</span></p>
                    </div>
                    <span className="mt-1 sm:mt-0 text-xs font-medium text-gray-400">
                      {review.date}
                    </span>
                  </div>
                  
                  <motion.div 
                    className="mt-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {renderStars(review.rating)}
                  </motion.div>
                  
                  <motion.p 
                    className="mt-3 text-sm text-gray-600 leading-relaxed relative pl-4 border-l-2 border-indigo-100"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    "{review.message}"
                  </motion.p>
                  
                  {!review.published && (
                    <motion.div 
                      className="mt-4 pt-4 flex justify-end space-x-3 border-t border-gray-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.button 
                        onClick={() => handleReject(review.id)}
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center border border-red-100"
                      >
                        <XMarkIcon className="h-4 w-4 mr-1.5" />
                        Rejeter
                      </motion.button>
                      <motion.button 
                        onClick={() => handlePublish(review.id)}
                        whileHover={{ scale: 1.05, y: -2, boxShadow: '0 4px 14px -2px rgba(99, 102, 241, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
                      >
                        <CheckIcon className="h-4 w-4 mr-1.5 text-white" />
                        Publier l'avis
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-5/6 h-2 bg-indigo-50 rounded-b-full filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RecentReviews;
