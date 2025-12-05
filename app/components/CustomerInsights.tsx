'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { StarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

// Données des avis avec plus de points pour un graphique plus lisse
const reviewData = [
  { date: 'Jan', average: 4.2, count: 145, satisfaction: 82 },
  { date: 'Fév', average: 4.3, count: 167, satisfaction: 85 },
  { date: 'Mar', average: 4.1, count: 189, satisfaction: 80 },
  { date: 'Avr', average: 4.4, count: 156, satisfaction: 87 },
  { date: 'Mai', average: 4.5, count: 178, satisfaction: 89 },
  { date: 'Juin', average: 4.6, count: 195, satisfaction: 91 },
  { date: 'Juil', average: 4.7, count: 210, satisfaction: 93 },
  { date: 'Août', average: 4.6, count: 198, satisfaction: 90 },
  { date: 'Sep', average: 4.8, count: 225, satisfaction: 94 }
];

const ratingDistribution = [
  { name: '5 étoiles', value: 68, color: '#10B981', bgColor: 'bg-green-100' },
  { name: '4 étoiles', value: 20, color: '#3B82F6', bgColor: 'bg-blue-100' },
  { name: '3 étoiles', value: 7, color: '#F59E0B', bgColor: 'bg-yellow-100' },
  { name: '2 étoiles', value: 3, color: '#F97316', bgColor: 'bg-orange-100' },
  { name: '1 étoile', value: 2, color: '#EF4444', bgColor: 'bg-red-100' }
];

const metrics = [
  {
    id: 1,
    name: 'Note moyenne',
    value: '4.6',
    change: '+0.2',
    changeType: 'increase',
    trend: [4.2, 4.3, 4.1, 4.4, 4.5, 4.6, 4.7, 4.6, 4.8]
  },
  {
    id: 2,
    name: 'Avis ce mois-ci',
    value: '1,234',
    change: '+12%',
    changeType: 'increase',
    trend: [145, 167, 189, 156, 178, 195, 210, 198, 225]
  },
  {
    id: 3,
    name: 'Satisfaction',
    value: '92%',
    change: '+5%',
    changeType: 'increase',
    trend: [82, 85, 80, 87, 89, 91, 93, 90, 94]
  }
];

// Composant de tooltip personnalisé
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">
          Note: <span className="font-medium">{payload[0].value}</span>
        </p>
        <p className="text-sm text-gray-600">
          Avis: <span className="font-medium">{payload[0].payload.count}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Composant de légende personnalisé
const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-1" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const MetricCard = ({ metric }: { metric: typeof metrics[0] }) => {
  const isIncrease = metric.changeType === 'increase';
  
  return (
    <motion.div 
      className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
      whileHover={{ y: -2 }}
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
              className={`ml-2 flex items-center text-sm font-medium ${
                isIncrease ? 'text-green-600' : 'text-red-600'
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
                data={metric.trend.map((value, i) => ({ value, name: i }))}
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête amélioré avec dégradé et ombres */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-700 p-6 shadow-lg">
          {/* Effet de vague décoratif */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20"></div>
          <div className="absolute -right-5 -bottom-5 h-20 w-20 rounded-full bg-white/20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Aperçu des performances</h2>
                <p className="mt-1 text-yellow-100">Analyse détaillée des avis clients</p>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-2 rounded-full bg-white/30 px-4 py-2 backdrop-blur-sm">
                  <span className="text-sm font-medium text-white">Mise à jour en temps réel</span>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <MetricCard metric={metric} />
                </motion.div>
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
                    {Math.round((item.value / 100) * 1234)} avis
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full`}
                    style={{ 
                      backgroundColor: item.color,
                      width: 0
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
                    className={`h-6 w-6 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={star <= 4 ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-900">4.6</span>
                <span className="ml-1 text-sm text-gray-500">/ 5.0</span>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                Basé sur 1,234 avis
              </div>
            </div>
            
            <div className="mt-4 bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-medium">+12%</span> par rapport au mois dernier
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}