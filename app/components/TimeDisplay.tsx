'use client';

import { useEffect, useState } from 'react';

// Fonction utilitaire pour formater l'heure de manière cohérente
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

export default function TimeDisplay() {
  // Initialiser avec une valeur par défaut cohérente
  const [currentTime, setCurrentTime] = useState<string>('--:--:--');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Marquer le composant comme monté (côté client uniquement)
    setIsMounted(true);
    
    // Mettre à jour l'heure immédiatement
    const updateTime = () => {
      setCurrentTime(formatTime(new Date()));
    };
    
    updateTime();
    
    // Mettre à jour l'heure chaque seconde
    const timer = setInterval(updateTime, 1000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(timer);
  }, []);

  // Ne rien afficher pendant le rendu côté serveur
  if (!isMounted) {
    return null;
  }

  return (
    <span className="inline-block" suppressHydrationWarning>
      Dernière mise à jour: {currentTime}
    </span>
  );
}
