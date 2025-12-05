export interface KPI {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export interface ReviewData {
  date: string;
  count: number;
  average: number;
}