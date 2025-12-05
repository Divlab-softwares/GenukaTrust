import { KPI } from '../types';

interface KpiCardsProps {
  data: KPI[];
}

export default function KpiCards({ data }: KpiCardsProps) {
  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      {data.map((kpi) => (
        <div
          key={kpi.id}
          className="p-6 bg-white rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 mr-4 text-2xl rounded-full bg-blue-50 text-blue-600">
              {kpi.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
              <p className="text-2xl font-semibold text-gray-700">
                {kpi.value}
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 flex items-center">
            <span className={`font-medium mr-1 ${getTrendColor(kpi.trend)}`}>
              {kpi.trend && (
                <>
                  {getTrendIcon(kpi.trend)} {kpi.trendValue}
                </>
              )}
            </span>
            <span>{kpi.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}