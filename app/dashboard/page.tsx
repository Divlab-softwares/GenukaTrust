'use client';

import CustomerInsights from '../components/CustomerInsights';
import RecentReviews from '../components/RecentReviews';
import GeneratedImages from '../components/GeneratedImages';
import MotivationalMessage from '../components/MotivationalMessage';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import NotificationDropdown from '../components/NotificationDropdown';
import { motion } from 'framer-motion';
import TimeDisplay from '../components/TimeDisplay';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

// Composant Header amélioré avec logo Genuka
const Header =() =>{

  const [produits, setProduits] = useState([
    { nom: "Sérum Éclat Jeunesse", etoiles: 4.9, avis: 1248, avis_pos: 94, position: 0 },
    { nom: "Crème Hydratante Intense", etoiles: 4.8, avis: 987, avis_pos: 92, position: 0 },
    { nom: "Masque Nourrissant", etoiles: 4.7, avis: 856, avis_pos: 90, position: 0 },
    { nom: "Gel Nettoyant Doux", etoiles: 4.6, avis: 723, avis_pos: 89, position: 0 },
  ])

  // useEffect(() => {

  //   produits.forEach((p, i) => {

  //   });

  // }, [produits])


  return (
    <div className="space-y-0">
      {/* Barre supérieure avec dégradé et logo */}
      <div className="bg-white px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Logo Genuka */}
            <div className="flex items-center">
              <img
                src="/images/Genuka.jpg"
                alt="Genuka Logo"
                className="h-10 w-auto"
              />
              <span className="ml-3 text-2xl font-bold text-yellow-600">Genuka Trust</span>
            </div>
            <div className="h-6 w-px bg-gray-200"></div>
            {/* <h2 className="text-base font-medium text-gray-700">
              Bonjour, <span className="font-semibold">Ma Boutique</span> 👋
            </h2> */}
          </div>
        </div>
      </div>

      {/* En-tête principal avec ombre portée */}
      <motion.header
        className="bg-gray-50 border-b border-gray-200"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto w-full">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-yellow-600">
                Tableau de bord
              </h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Bienvenue sur votre espace d'administration • <TimeDisplay />
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-2 border border-yellow-200 rounded-lg leading-5 bg-white/50 placeholder-yellow-400/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-all duration-200 text-yellow-800"
                placeholder="Rechercher..."
              />
            </div>

            <div className="relative">
              <NotificationDropdown />
            </div>

            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200">
              <div className="h-8 w-8 rounded-full bg-yellow-600 flex items-center justify-center text-white font-medium">
                MB
              </div>
              <span className="text-sm font-medium text-gray-700 hidden lg:inline">Mon Compte</span>
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </motion.header>
    </div>
  );
}

// Composant principal
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="mb-8 bg-linear-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 shadow-sm border border-yellow-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-yellow-800">Aperçu des performances</h2>
            <div className="flex items-center space-x-2 bg-white/50 px-3 py-1.5 rounded-full border border-yellow-200">
              <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
              <span className="text-sm font-medium text-yellow-700">En temps réel</span>
            </div>
          </div>

          <CustomerInsights />

          {/* Message de motivation basé sur la note moyenne */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MotivationalMessage averageRating={4.3} />
          </motion.div>
        </div>

        <div className="mb-8">
          <RecentReviews />
        </div>

        <div className="mb-8">
          <GeneratedImages />
        </div>

        {/* Section Produits les mieux notés */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium mb-4 text-yellow-800">Produits les mieux notés</h3>
         
        </div>
      </main>

      {/* Pied de page */}
      <Footer />
      {/*  */}
    </div>
  );
}