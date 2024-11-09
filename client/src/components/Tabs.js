// src/components/Tabs.js
import React from 'react';
import { useMapContext } from '../context/MapContext';

const Tabs = () => {
  const { layers, selectedLayerId, setSelectedLayerId } = useMapContext();

  // Function to generate a unique label for each layer
  const getLayerLabel = (layer, index) => {
    const duplicateCount = layers.filter(l => l.label === layer.label).length;

    // Append count only if there are duplicates
    const label = duplicateCount > 1
      ? `${layer.label} (${index + 1})` // Display as "label (1)", "label (2)", etc.
      : layer.label || `Layer ${layer.id}`;

    return label;
  };

  return (
    <div className="flex border-b border-gray-300">
      {layers.map((layer, index) => (
        <button
          key={layer.id}
          onClick={() => setSelectedLayerId(layer.id)}
          className={`px-4 py-2 focus:outline-none ${
            selectedLayerId === layer.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'
          }`}
        >
          {getLayerLabel(layer, index)} {/* Use the unique label */}
        </button>
      ))}
    </div>
  );
};

export default Tabs;


