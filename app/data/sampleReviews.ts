export interface Review {
  id: number;
  rating: number;
  message: string;
  date: string;
  published: boolean;
  author: string;
  product: string;
}

export const sampleReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    message: 'Service exceptionnel, je recommande vivement ce produit ! La qualité est au rendez-vous et la livraison a été rapide. Emballage soigné et instructions claires.',
    date: 'Il y a 2 heures',
    published: false,
    author: 'Jean D.',
    product: 'Montre connectée Pro',
  },
  {
    id: 2,
    rating: 4,
    message: 'Très bon produit, correspond parfaitement à mes attentes. Petit bémol sur la durée de vie de la batterie qui pourrait être améliorée. Le design est moderne et confortable à porter.',
    date: 'Hier',
    published: true,
    author: 'Marie L.',
    product: 'Casque audio sans fil',
  },
  {
    id: 3,
    rating: 3,
    message: 'Produit correct pour le prix, mais j\'ai rencontré quelques difficultés avec la configuration initiale. Le service client a été réactif pour résoudre le problème. Je recommande tout de même.',
    date: 'Il y a 3 jours',
    published: false,
    author: 'Thomas P.',
    product: 'Enceinte Bluetooth',
  },
  {
    id: 4,
    rating: 5,
    message: 'Tout simplement parfait ! Le produit dépasse mes attentes. La qualité est au rendez-vous et le service client est réactif. Je recommande vivement ce produit à tous les amateurs de technologie.',
    date: 'Il y a 5 jours',
    published: true,
    author: 'Sophie M.',
    product: 'Smartphone Premium',
  },
  {
    id: 5,
    rating: 4,
    message: 'Très satisfait de mon achat. Le produit est de bonne qualité et répond à mes besoins. La livraison a été rapide et l\'emballage soigné.',
    date: 'Il y a 1 semaine',
    published: true,
    author: 'Alexandre B.',
    product: 'Écran 4K 27"',
  }
];
