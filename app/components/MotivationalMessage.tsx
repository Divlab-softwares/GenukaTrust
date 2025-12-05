'use client';

interface MotivationalMessageProps {
  averageRating: number;
}

export default function MotivationalMessage({ averageRating }: MotivationalMessageProps) {
  if (averageRating >= 4.5) {
    return (
      <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center space-x-3">
        <span className="text-xl">🎉</span>
        <div>
          <p className="font-medium">Excellent travail !</p>
          <p className="text-sm">Continue comme ça 💪</p>
        </div>
      </div>
    );
  }

  if (averageRating < 4.0) {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg flex items-center space-x-3">
        <span className="text-xl">⚠</span>
        <div>
          <p className="font-medium">Quelques clients ne sont pas satisfaits</p>
          <p className="text-sm">Suggestion : améliorer la livraison</p>
        </div>
      </div>
    );
  }

  // Retourne null si la note est entre 4.0 et 4.5 (pas de message)
  return null;
}
