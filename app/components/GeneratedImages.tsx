'use client';

import { StarIcon, XMarkIcon, ArrowDownTrayIcon, CheckIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import domtoimage from 'dom-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Review, sampleReviews } from '../data/sampleReviews';

interface GeneratedImage {
  id: string;
  title: string;
  type: string;
  date: string;
  dimensions: string;
  size: number;
  imageUrl: string;
}

interface ReviewImageGeneratorProps {
  review: string;
  author: string;
  productName: string;
  rating: number;
  onClose: () => void;
  onSave: (image: GeneratedImage) => void;
}

// Composant pour la sélection d'un avis
const ReviewSelectionModal = ({
  reviews,
  onSelect,
  onClose,
}: {
  reviews: Review[];
  onSelect: (review: Review) => void;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Sélectionner un avis</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors relative group"
              onClick={() => onSelect(review)}
              whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors">
                      {review.author}
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="text-sm text-blue-600 font-medium">
                      {review.product}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-200'
                          }`}
                      />
                    ))}
                    <span className="ml-1 text-sm font-medium text-gray-500">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 line-clamp-2 group-hover:text-gray-800 transition-colors">
                  {review.message}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{review.date}</span>
                  <motion.span
                    className="text-sm font-medium text-indigo-600 flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <span className="mr-1">Sélectionner</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Composant pour générer une image d'avis
const ReviewImageGenerator = ({
  review,
  author,
  productName,
  rating,
  onClose,
  onSave,
}: ReviewImageGeneratorProps) => {
  const reviewRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!reviewRef.current) return;

    try {
      const node = reviewRef.current;
      const dataUrl = await domtoimage.toPng(node, {
        quality: 1,
        bgcolor: 'white',
        imagePlaceholder: undefined,
        filter: (node: Node) => {
          // Filtrer les éléments à exclure si nécessaire
          return true;
        }
      });
      onSave({
        id: `review-${Date.now()}`,
        title: `Avis ${author}`,
        type: 'Avis Client',
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        dimensions: '1200x800',
        size: Math.round(dataUrl.length / 1024 / 1024 * 10) / 10,
        imageUrl: dataUrl
      });

      onClose();
    } catch (error) {
      console.error('Erreur lors de la génération de l\'image:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Générer une image d'avis</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="p-1">
                      <StarIcon
                        className={`h-8 w-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
                <div className="w-full p-3 bg-white rounded-lg border border-gray-200 text-gray-800 font-medium">
                  {productName}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auteur de l'avis</label>
                <div className="w-full p-3 bg-white rounded-lg border border-gray-200 text-gray-800 font-medium">
                  {author}
                </div>
              </div>

              <button
                onClick={generateImage}
                className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Générer l'image
              </button>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">Aperçu</label>
              <div
                ref={reviewRef}
                className="bg-white rounded-2xl p-8 shadow-lg flex-1 flex flex-col border border-gray-200"
                style={{ width: '100%', minHeight: '350px' }}
              >
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-10 w-10 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xl text-gray-800 text-center mb-8 flex-grow flex items-center justify-center leading-relaxed px-4 font-serif italic">
                  "{review}"
                </p>
                <div className="text-center border-t border-gray-100 pt-6">
                  <p className="font-semibold text-gray-800 text-lg">{author}</p>
                  <p className="text-blue-600 font-medium mt-1">Avis sur {productName}</p>
                  <div className="mt-4 flex justify-center">
                    <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GeneratedImages = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  type SelectedReview = Review & {
    comment: string;
    productName: string;
  };

  const [selectedReview, setSelectedReview] = useState<SelectedReview | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Utilisation des avis partagés depuis sampleReviews
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);

  const handleReviewSelect = (review: Review) => {
    setSelectedReview({
      ...review,
      comment: review.message,
      productName: review.product
    });
    setIsReviewModalOpen(false);
    setIsGeneratorOpen(true);
  };

  const handleSaveImage = (newImage: GeneratedImage) => {
    // La taille est déjà un nombre, on peut l'utiliser directement
    setGeneratedImages(prev => [newImage, ...prev]);

    setIsGeneratorOpen(false);
    setSelectedReview(null);
  };

  const handleDownload = async (imageUrl: string, title: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `avis-${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="mt-8 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Médias générés</h2>
          <p className="text-sm text-gray-500 mt-1">Vos créations récentes et modèles</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Génération en cours...</span>
              </>
            ) : (
              <>
                <span>Générer une image</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal de sélection des avis */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <ReviewSelectionModal
            reviews={reviews}
            onSelect={handleReviewSelect}
            onClose={() => setIsReviewModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Modal de génération d'image */}
      {isGeneratorOpen && selectedReview && (
        <ReviewImageGenerator
          review={selectedReview.comment}
          author={selectedReview.author}
          productName={selectedReview.productName}
          rating={selectedReview.rating}
          onClose={() => {
            setIsGeneratorOpen(false);
            setSelectedReview(null);
          }}
          onSave={handleSaveImage}
        />
      )}

      {/* Liste des images générées */}
      {generatedImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {generatedImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gray-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleDownload(image.imageUrl, image.title)}
                    className="bg-white p-2 rounded-full shadow-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Télécharger"
                    disabled={isLoading}
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">{image.title}</h3>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>{image.date}</span>
                  <div className="flex space-x-2">
                    <span>{image.dimensions}</span>
                    <span>•</span>
                    <span>{formatFileSize(image.size)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune image générée</h3>
          <p className="mt-1 text-sm text-gray-500">Commencez par générer votre première image d'avis.</p>
        </div>
      )}
    </div>
  );
};

export default GeneratedImages;