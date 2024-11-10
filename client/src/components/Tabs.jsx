// src/components/Tabs.js
import React from 'react';
import { useMapContext } from '../context/MapContext';

const Tabs = () => {
  const { layers, selectedLayerId, setSelectedLayerId, deleteLayer } = useMapContext();

  // Function to generate a unique label for each layer
  const getLayerLabel = (layer, index) => {
    const duplicateCount = layers.filter(l => l.label === layer.label).length;
    const label = duplicateCount > 1
      ? `${layer.label} (${index + 1})`
      : layer.label || `Layer ${layer.id}`;
    return label;
  };

  return (
    <div className="flex border-b border-gray-300"> {/* Remove min height */}
      {layers.length > 0 ? (
        layers.map((layer, index) => (
          <div key={layer.id} className="relative flex items-center">
            <button
              onClick={() => setSelectedLayerId(layer.id)}
              className={`px-2 py-1 pr-6 focus:outline-none ${
                selectedLayerId === layer.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
              }`}
            >
              {getLayerLabel(layer, index)}
            </button>
            <button
              onClick={() => deleteLayer(layer.id)}
              className="absolute right-0 mr-1 text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full text-gray-400 h-8"> {/* Set placeholder height */}
          No layers available
        </div>
      )}
    </div>
  );
};

export default Tabs;
