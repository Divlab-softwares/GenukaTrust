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
import api from "@/app/api/feedback/route";

// Composant Header amélioré avec logo Genuka
const Header =() =>{

  return (
    <div className="space-y-0">
      {/* Barre supérieure avec dégradé et logo */}
      <div className="bg-white px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Logo Genuka */}
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Genuka Logo"
                className="h-10 w-auto"
              />
              <span className="ml-3 text-2xl font-bold bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">Genuka Trust</span>
            </div>
            <div className="h-6 w-px bg-gray-200"></div>
            {/* <h2 className="text-base font-medium text-gray-700">
              Bonjour, <span className="font-semibold">Ma Boutique</span> 👋
            </h2> */}
            
          </div>

          <div className="flex items-center  space-x-3">
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
      </div>

      {/* En-tête principal avec ombre portée */}
      <motion.header
        className="bg-gray-50 border-b border-gray-200"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="px-3 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto w-full">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-black">
                Tableau de bord
              </h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Bienvenue sur votre espace d'administration • <TimeDisplay />
            </p>
          </div>
        </div>
      </motion.header>
    </div>
  );
}

// Composant principal
export default function Home() {

  const [produits, setProduits] = useState([
    { nom: "Sérum Éclat Jeunesse", etoiles: 4.9, avis: 1248, avis_pos: 94, position: 4 },
    { nom: "Crème Hydratante Intense", etoiles: 4.8, avis: 987, avis_pos: 92, position: 3 },
    { nom: "Masque Nourrissant", etoiles: 4.7, avis: 856, avis_pos: 90, position: 2 },
    { nom: "Gel Nettoyant Doux", etoiles: 4.6, avis: 723, avis_pos: 89, position: 1 },
  ])

  const [data, setData] = useState(null);

  useEffect(() => {
  
    const fetchFeedbacks = async () => {
      try {
        const res = await api.get("https://647c83fd1a2d.ngrok-free.app/api/dashboard"); // Remplace par ton endpoint Laravel
        console.log("DATA:", res.data);

        if(res.data.success){
          // Traite les données reçues et mets à jour l'état si nécessaire
          setData(res.data);
        } else {
          console.error("Erreur lors de la récupération des donnees");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeedbacks();


  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="mb-8 bg-linear-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 shadow-sm border border-yellow-100">
       

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {produits.map((product, index) => (
              <div key={index}>
                {product.position == 4 ? (
                  <div className="md:col-span-3 mb-4">
                    <div className="p-5 bg-linear-to-r from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              MEILLEUR PRODUIT
                            </span>
                          </div>
                          <h4 className="mt-2 text-lg font-bold text-gray-900">Sérum Éclat Jeunesse</h4>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-1 text-sm font-medium text-gray-600">4.9/5</span>
                            </div>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">1,248 avis</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-yellow-600">94%</div>
                          <div className="text-xs text-yellow-600 font-medium">Avis positifs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div  className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-yellow-200 transition-colors">
                    <h4 className="font-medium text-gray-900">{product.nom}</h4>
                    <div className="mt-2 flex items-center">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.round(product.etoiles) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm font-medium text-gray-600">{product.etoiles}</span>
                      </div>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{product.avis} avis</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-yellow-500 h-1.5 rounded-full"
                          style={{ width: `${product.avis_pos}%` }}
                        ></div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-yellow-700">{product.avis_pos}% positifs</span>
                      </div>
                    </div>
                  </div>
                )
                }
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <Footer />
      {/*  */}
    </div>
  );
}