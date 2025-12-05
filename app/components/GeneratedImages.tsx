'use client';

import { ArrowDownTrayIcon, ShareIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GeneratedImages = () => {
  // Données factices pour les images générées
  // Utilisation d'IDs et de tailles déterministes pour éviter les erreurs d'hydratation
  const generatedImages = [
    { id: 'image-1', title: 'Design Produit 1', type: 'Produit', size: '1.4 MB' },
    { id: 'image-2', title: 'Design Bannière 2', type: 'Marketing', size: '1.8 MB' },
    { id: 'image-3', title: 'Design Produit 3', type: 'Produit', size: '1.2 MB' },
    { id: 'image-4', title: 'Design Bannière 4', type: 'Marketing', size: '1.6 MB' },
    { id: 'image-5', title: 'Design Produit 5', type: 'Produit', size: '1.3 MB' },
    { id: 'image-6', title: 'Design Bannière 6', type: 'Marketing', size: '1.7 MB' }
  ].map((image, index) => ({
    ...image,
    date: new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    dimensions: '1200x800'
  }));

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Médias générés</h2>
          <p className="text-sm text-gray-500 mt-1">Vos créations récentes et modèles</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium flex items-center">
            <span>Générer une image</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {generatedImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
            className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* En-tête de la carte avec badge de type */}
            <div className="relative">
              {/* Placeholder d'image avec dégradé */}
              <div className="h-48 bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkYiLz4KICA8cGF0aCBkPSJNMzAgMTVMMjAgMzAgTDMwIDQ1IEw0MCAzMCBaIiBmaWxsPSIjRkZGIiBzdHJva2U9IiNGRkY3MDAiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=')]"></div>
                <span className="text-yellow-600 font-medium text-center px-4">
                  {image.title}\n
                  <span className="block text-sm font-normal text-yellow-500 mt-1">
                    {image.dimensions} • {image.size}
                  </span>
                </span>
                
                {/* Badge de type */}
                <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  image.type === 'Produit' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {image.type}
                </span>
              </div>
              
              {/* Overlay d'actions au survol */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                <button 
                  className="p-2 bg-white/90 text-yellow-600 rounded-full hover:bg-white transition-all transform hover:scale-110"
                  title="Télécharger"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
                <button 
                  className="p-2 bg-white/90 text-yellow-600 rounded-full hover:bg-white transition-all transform hover:scale-110"
                  title="Partager"
                >
                  <ShareIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Pied de carte avec informations */}
            <div className="p-4 border-t border-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 line-clamp-1">{image.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Créé le {image.date}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1 -mr-2">
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xs font-medium">
                    {index + 1}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">Version 1.0</span>
                </div>
                <span className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded-md">
                  {image.dimensions}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Bouton Voir plus */}
      <div className="mt-8 text-center">
        <button className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium text-sm">
          Voir toutes les images générées
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GeneratedImages;
