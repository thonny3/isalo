import React from 'react';
import { OrbitProgress } from 'react-loading-indicators';  // Assurez-vous d'importer correctement le composant

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 text-white">
      <div className="text-center">
        {/* Remplacement du spinner SVG par OrbitProgress */}
        <OrbitProgress variant="spokes" dense color="#cc8231" size="medium" text="" textColor="" />
      </div>
    </div>
  );
}
