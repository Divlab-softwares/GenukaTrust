
import { KPI, ReviewData } from '../types';

export const shopName = "Boutique Modèle";

export const kpiData: KPI[] = [
  {
    id: 'total-reviews',
    title: 'Avis totaux',
    value: '1,248',
    description: '+12% par rapport au mois dernier',
    icon: '📊',
    trend: 'up',
    trendValue: '12%'
  },
  {
    id: 'average-rating',
    title: 'Note moyenne',
    value: '4.7',
    description: 'sur 5 étoiles',
    icon: '⭐',
    trend: 'up',
    trendValue: '0.2'
  },
  {
    id: 'response-rate',
    title: 'Taux de réponse',
    value: '92%',
    description: 'des avis ont reçu une réponse',
    icon: '💬',
    trend: 'up',
    trendValue: '5%'
  }
];

export const reviewData: ReviewData[] = [
  { date: '2023-11-29', count: 42, average: 4.5 },
  { date: '2023-11-30', count: 38, average: 4.6 },
  { date: '2023-12-01', count: 45, average: 4.7 },
  { date: '2023-12-02', count: 52, average: 4.8 },
  { date: '2023-12-03', count: 48, average: 4.9 },
  { date: '2023-12-04', count: 56, average: 4.8 },
  { date: '2023-12-05', count: 62, average: 4.7 },
];