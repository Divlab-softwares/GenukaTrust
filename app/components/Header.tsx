import { shopName } from '../data/mockData';

export default function Header() {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      <p className="text-gray-600">Bonjour, {shopName} 👋</p>
    </header>
  );
}