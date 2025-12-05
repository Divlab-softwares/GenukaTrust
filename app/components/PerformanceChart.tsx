'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ReviewData } from '../types';

interface PerformanceChartProps {
  data: ReviewData[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  // Formater les données pour le graphique
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    note: item.average
  }));

  const averageRating = data.reduce((acc, curr) => acc + curr.average, 0) / data.length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Performance des avis (7 jours)</h2>
        {averageRating >= 4.5 && (
          <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            Excellent travail ! 🎉
          </span>
        )}
        {averageRating < 4.0 && (
          <span className="px-3 py-1 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full">
            Vous pouvez faire mieux ! 💪
          </span>
        )}
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#6b7280' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              domain={[0, 5]} 
              tick={{ fill: '#6b7280' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="note" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              dot={{ r: 4, fill: '#3b82f6' }}
              activeDot={{ r: 6, fill: '#2563eb' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}