'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { sampleReviews } from '../data/sampleReviews';

// Fonction pour regrouper les avis par mois
const groupReviewsByMonth = (reviews: typeof sampleReviews) => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  // Créer un objet pour stocker les données par mois
  const monthlyData: Record<string, any> = {};

  // Initialiser les 6 derniers mois
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    monthlyData[monthIndex] = {
      date: months[monthIndex],
      ratings: [],
      count: 0,
      published: 0,
      pending: 0
    };
  }

  // Remplir avec les données des avis
  reviews.forEach(review => {
    // Simuler une date aléatoire dans les 6 derniers mois
    const monthIndex = Math.floor(Math.random() * 6);
    const reviewDate = new Date();
    reviewDate.setMonth(currentMonth - monthIndex);

    const monthData = monthlyData[reviewDate.getMonth()];
    if (monthData) {
      monthData.ratings.push(review.rating);
      monthData.count++;
      if (review.published) {
        monthData.published++;
      } else {
        monthData.pending++;
      }
    }
  });

  // Calculer les moyennes et autres métriques
  return Object.values(monthlyData).map(month => ({
    date: month.date,
    average: month.ratings.length > 0
      ? Number((month.ratings.reduce((sum: number, rating: number) => sum + rating, 0) / month.ratings.length).toFixed(1))
      : 0,
    count: month.count,
    satisfaction: month.ratings.length > 0
      ? Math.round((month.ratings.filter((rating: number) => rating >= 4).length / month.ratings.length) * 100)
      : 0,
    published: month.published,
    pending: month.pending,
    responseRate: Math.min(100, Math.round(Math.random() * 20) + 80) // Taux de réponse simulé
  }));
};

// Types pour les métriques
type Metric = {
  id: number;
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  trend?: number[];  // Rendre le champ optionnel
};

// Types pour les données de distribution des notes
type RatingDistribution = {
  name: string;
  value: number;
  color: string;
  bgColor: string;
};

// Composant de tooltip personnalisé
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">
          Note: <span className="font-medium">{payload[0].payload.average}</span>
        </p>
        <p className="text-sm text-gray-600">
          Avis: <span className="font-medium">{payload[0].payload.count}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Composant de carte de métrique
const MetricCard = ({ metric }: { metric: Metric }) => {
  const isIncrease = metric.changeType === 'increase';

  return (
    <motion.div
      className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{metric.name}</p>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
            <span
              className={`ml-2 flex items-center text-sm font-medium ${isIncrease ? 'text-green-600' : 'text-red-600'
                }`}
            >
              {isIncrease ? (
                <ArrowUpIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              )}
              <span className="sr-only">
                {isIncrease ? 'Increased' : 'Decreased'} by
              </span>
              {metric.change}
            </span>
          </div>
          <div className="mt-4 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={metric.trend?.map((value, i) => ({ value, name: i })) ?? []}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`color${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isIncrease ? '#10B981' : '#EF4444'} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={isIncrease ? '#10B981' : '#EF4444'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isIncrease ? '#10B981' : '#EF4444'}
                  fillOpacity={1}
                  fill={`url(#color${metric.id})`}
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${isIncrease ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          <StarIcon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default function CustomerInsights() {
  const [timeRange, setTimeRange] = useState('6m');
  const [isMounted, setIsMounted] = useState(false);
  const [chartType, setChartType] = useState<'average' | 'count' | 'responseRate'>('average');

  // Générer les données mensuelles à partir des avis
  const reviewData = useMemo(() => groupReviewsByMonth(sampleReviews), []);

  // Calculer les métriques globales
  const metrics = useMemo<Metric[]>(() => {
    const totalReviews = reviewData.reduce((sum, month) => sum + month.count, 0);
    const avgRating = reviewData.length > 0
      ? Number((reviewData.reduce((sum, month) => sum + month.average * month.count, 0) / totalReviews).toFixed(1))
      : 0;
    const publishedReviews = reviewData.reduce((sum, month) => sum + month.published, 0);
    const pendingReviews = reviewData.reduce((sum, month) => sum + month.pending, 0);
    const avgResponseRate = reviewData.length > 0
      ? Math.round(reviewData.reduce((sum, month) => sum + month.responseRate, 0) / reviewData.length)
      : 0;

    return [
      {
        id: 1,
        name: 'Note moyenne',
        value: avgRating.toFixed(1),
        change: '+0.2',
        changeType: 'increase' as const,
        trend: reviewData.map(month => month.average)
      },
      {
        id: 2,
        name: 'Avis publiés',
        value: publishedReviews.toString(),
        change: `+${Math.round(publishedReviews * 0.15)}`,
        changeType: 'increase' as const,
        trend: reviewData.map(month => month.published)
      },
      {
        id: 3,
        name: 'Avis en attente',
        value: pendingReviews.toString(),
        change: pendingReviews > 0 ? `+${Math.round(pendingReviews * 0.1)}` : '0',
        changeType: pendingReviews > 0 ? 'increase' : 'decrease',
        trend: reviewData.map(month => month.pending)
      },
      {
        id: 4,
        name: 'Taux de réponse',
        value: `${avgResponseRate}%`,
        change: '+5%',
        changeType: 'increase' as const,
        trend: reviewData.map(month => month.responseRate)
      },
    ];
  }, [reviewData]);

  // Calculer la distribution des notes
  const ratingDistribution = useMemo<RatingDistribution[]>(() => {
    // Compter le nombre d'avis par note (1-5 étoiles)
    const ratingCounts = [0, 0, 0, 0, 0]; // Indices 0-4 pour les notes 1-5

    sampleReviews.forEach(review => {
      const rating = Math.round(review.rating); // Arrondir la note à l'entier le plus proche
      if (rating >= 1 && rating <= 5) {
        ratingCounts[5 - rating]++; // Inverser l'ordre pour avoir 5 étoiles en premier
      }
    });

    const totalRatings = sampleReviews.length;

    // Si aucun avis, retourner des valeurs par défaut
    if (totalRatings === 0) {
      return [
        { name: '5 étoiles', value: 0, color: '#10B981', bgColor: 'bg-green-100' },
        { name: '4 étoiles', value: 0, color: '#3B82F6', bgColor: 'bg-blue-100' },
        { name: '3 étoiles', value: 0, color: '#F59E0B', bgColor: 'bg-yellow-100' },
        { name: '2 étoiles', value: 0, color: '#F97316', bgColor: 'bg-orange-100' },
        { name: '1 étoile', value: 0, color: '#EF4444', bgColor: 'bg-red-100' }
      ];
    }

    // Calculer les pourcentages
    return [
      {
        name: '5 étoiles',
        value: Math.round((ratingCounts[0] / totalRatings) * 100),
        color: '#10B981',
        bgColor: 'bg-green-100'
      },
      {
        name: '4 étoiles',
        value: Math.round((ratingCounts[1] / totalRatings) * 100),
        color: '#3B82F6',
        bgColor: 'bg-blue-100'
      },
      {
        name: '3 étoiles',
        value: Math.round((ratingCounts[2] / totalRatings) * 100),
        color: '#F59E0B',
        bgColor: 'bg-yellow-100'
      },
      {
        name: '2 étoiles',
        value: Math.round((ratingCounts[3] / totalRatings) * 100),
        color: '#F97316',
        bgColor: 'bg-orange-100'
      },
      {
        name: '1 étoile',
        value: Math.round((ratingCounts[4] / totalRatings) * 100),
        color: '#EF4444',
        bgColor: 'bg-red-100'
      }
    ];
  }, [sampleReviews]);

  // Calculer la note moyenne globale
  const averageRating = useMemo(() => {
    if (sampleReviews.length === 0) return 0;
    const sum = sampleReviews.reduce((total, review) => total + review.rating, 0);
    return sum / sampleReviews.length;
  }, [sampleReviews]);

  return (
    <div className="space-y-6">
      {/* En-tête amélioré avec dégradé et ombres */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-amber-500 to-amber-600 p-6 shadow-lg bg-backdrop-blur-sm border border-yellow-200">
          {/* Effet de vague décoratif */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20"></div>
          <div className="absolute -right-5 -bottom-5 h-20 w-20 rounded-full bg-white/20"></div>
          
          <div className="absolute -left-10 -top-5 h-32 w-32 rounded-full bg-white/20"></div>
          <div className="absolute -left-5 -bottom-10 h-50 w-50 rounded-full bg-white/20"></div>
          <div className="absolute -right-1/2 -top-2 h-32 w-32 rounded-full bg-white/20"></div>
          <div className="absolute -right-5 -bottom-5 h-20 w-20 rounded-full bg-white/20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Aperçu des performances</h2>
                <p className="mt-1 text-yellow-100 text-sm">Analyse détaillée des avis clients</p>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-2 rounded-full bg-white/30 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
                  <span className="text-sm font-medium text-gray-600">Temps réel</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div 
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Évolution des notes</h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="7d">7 derniers jours</option>
              <option value="30d">30 derniers jours</option>
              <option value="6m">6 derniers mois</option>
              <option value="12m">12 derniers mois</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={reviewData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  domain={[3.5, 5]} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  width={30}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="average"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorAverage)"
                  strokeWidth={2}
                  activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2, fill: '#FFFFFF' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Répartition des notes</h3>
          <div className="space-y-4">
            {ratingDistribution.map((item, index) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 text-sm font-medium text-gray-600">
                      {item.name}
                    </div>
                    <div className="ml-2 text-sm font-medium text-gray-900">
                      {item.value}%
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {sampleReviews.filter(review => Math.round(review.rating) === (5 - index)).length} avis
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full`}
                    style={{
                      backgroundColor: item.color,
                      width: `${item.value}%`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + (index * 0.1),
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Note moyenne globale</h4>
            <div className="flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-6 w-6 ${star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={star <= Math.round(averageRating) ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  {averageRating.toFixed(1)}
                </span>
                <span className="ml-1 text-sm text-gray-500">/ 5.0</span>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                Basé sur {sampleReviews.length} avis
              </div>
            </div>

            <div className="mt-4 bg-blue-50 p-3 rounded-lg">
              {/* <p className="text-sm text-blue-700">
                <span className="font-medium">+12%</span> par rapport au mois dernier
              </p> */}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}