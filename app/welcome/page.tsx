'use client';

import Link from 'next/link';
import { motion, type TargetAndTransition } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import type { Variants } from 'framer-motion';
import Topbar from '../components/Topbar';

// Variantes d'animation
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const buttonHover: TargetAndTransition = {
  scale: 1.03,
  transition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10
  }
};

const buttonTap: TargetAndTransition = {
  scale: 0.98
};

export default function Home() {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-white"
    >

      {/* En-tête simple */}
      <header className={` text-gray-600 backdrop-blur-sm border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="Genuka Trust" className="h-12 w-auto rounded-xl" />
            <span className="text-2xl font-bold bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
              Genuka Trust
            </span>
          </a>
        </div>
      </header>

      {/* Contenu principal */}
      <motion.main 
        variants={item}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24"
      >
        <div className="text-center">
          <motion.h1 
            variants={item}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Bienvenue sur <span className="text-yellow-600">Genuka Trust</span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto"
          >
            L'application dédiée à la gestion de vos avis clients. 
            Gérez, analysez et répondez aux retours de vos clients en toute simplicité.
          </motion.p>

          <motion.div 
            variants={item}
            className="mt-10"
          >
            <motion.div
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <Link 
                href="/dashboard" 
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Commencer maintenant
                <ArrowRightIcon className="ml-3 -mr-1 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Fonctionnalités */}
          <motion.div 
            variants={container}
            className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                name: 'Centralisation',
                description: 'Tous vos avis clients au même endroit',
                icon: '📊'
              },
              {
                name: 'Analyse',
                description: 'Des statistiques détaillées sur votre réputation',
                icon: '📈'
              },
              {
                name: 'Réactivité',
                description: 'Répondez rapidement à vos clients',
                icon: '⚡'
              }
            ].map((feature) => (
              <motion.div 
                key={feature.name} 
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.main>

      {/* Pied de page */}
      <motion.footer 
        variants={item}
        className="bg-white border-t border-gray-200 mt-12"
      >
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Genuka Trust. Tous droits réservés.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
}