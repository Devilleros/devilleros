'use client';

import { useEffect, useState } from 'react';

export default function NatPage() {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // Cargar el script de model-viewer dinámicamente
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(script);

    return () => {
      // Limpiar el script al desmontar el componente
      const existingScript = document.querySelector('script[src*="model-viewer"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex flex-col">
      {/* Modal de bienvenida - Comentado */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-pink-200/50 max-w-2xl w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">😄</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Solo un detalle
                </h2>
              </div>
              
              <div className="text-lg text-gray-700 leading-relaxed mb-6">
                <p className="mb-4 font-medium text-pink-700">
                  Con cariño, por todo el esfuerzo que has puesto.
                </p>
                <p className="text-lg text-gray-800">
                  Sé que puedes lograrlo. <span className="text-pink-500">❤️</span>
                </p>
              </div>
              
              <p className="text-sm text-gray-500 mb-8 italic">
                (Este mensaje se cambiará antes de la presentación xD)
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={closeModal}
                  className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-12 py-3 rounded-xl font-medium hover:from-pink-500 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-pink-300 to-rose-400 text-pink-900 py-12">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
            Modelo 3D Interactivo
          </h1>
          <p className="text-xl text-pink-800 max-w-2xl mx-auto">
            Explora este modelo 3D con controles intuitivos y experiencia de realidad aumentada
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          {/* Contenedor del modelo con diseño mejorado */}
          <div className="bg-pink-50/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-pink-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-300 to-rose-400 p-4">
              <h2 className="text-2xl font-semibold text-pink-900 text-center">
                Modelo 3D - Lacasa POXA1b
              </h2>
              <p className="text-sm text-pink-800 text-center mt-2">
                Por Natalia Gil Traslaviña              </p>
            </div>
            
            <div className="p-8">
              {/* @ts-ignore */}
              <model-viewer
                src="/modelo3d/conservacion.glb"
                alt="Modelo 3D Ensayo"
                auto-rotate
                camera-controls
                ar
                ios-src="/modelo3d/conservacion.glb"
                style={{
                  width: '100%',
                  height: '600px',
                  backgroundColor: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
                  borderRadius: '12px'
                }}
              >
                <div className="poster" slot="poster">
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-pink-100 to-rose-100">
                    <div className="text-center">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200 border-t-pink-400 mx-auto mb-6"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-pink-300 to-rose-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <p className="text-pink-700 font-medium text-lg">Cargando modelo 3D...</p>
                      <p className="text-pink-500 text-sm mt-2">Por favor espera un momento</p>
                    </div>
                  </div>
                </div>
              {/* @ts-ignore */}
              </model-viewer>
            </div>
          </div>

          {/* Instrucciones mejoradas */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl mb-3">🖱️</div>
              <h3 className="font-semibold text-gray-800 mb-2">Rotar Modelo</h3>
              <p className="text-gray-600 text-sm">Click y arrastra para rotar el modelo en cualquier dirección</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-semibold text-gray-800 mb-2">Zoom</h3>
              <p className="text-gray-600 text-sm">Usa la rueda del mouse para acercar o alejar la vista</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-800 mb-2">Realidad Aumentada</h3>
              <p className="text-gray-600 text-sm">Toca el ícono AR para ver el modelo en tu espacio real</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pie de página personalizado */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="border-t border-gray-700 pt-6">
            <p className="text-lg font-medium text-gray-300 mb-2">
              By
            </p>
            <p className="text-sm text-gray-400 italic">
              Nobody
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-0.5 bg-gradient-to-r from-pink-300 to-rose-400">-..-------</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
