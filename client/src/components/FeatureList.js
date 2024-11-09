// src/components/FeatureList.js
import React from 'react';
import { useMapContext } from '../context/MapContext';

const FeatureList = () => {
  const { layers, selectedLayerId, selectedFeatureId, setSelectedFeatureId } = useMapContext();

  const selectedLayer = layers.find(layer => layer.id === selectedLayerId);

  if (!selectedLayer) {
    return <p className="text-gray-500">No features available</p>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Feature List</h3>
      {selectedLayer.features.length > 0 ? (
        <ul className="list-none p-0">
          {selectedLayer.features.map((feature) => (
            <li
              key={feature.properties?.id || feature.id}
              className={`p-2 cursor-pointer ${feature.properties?.id === selectedFeatureId ? 'bg-gray-300' : 'bg-white'}`}
              onClick={() => setSelectedFeatureId(feature.properties?.id)}
            >
              {feature.geometry?.type || 'Unknown Type'}:
              {feature.geometry?.coordinates ? JSON.stringify(feature.geometry.coordinates) : 'No coordinates available'}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No features available in this layer</p>
      )}
    </div>
  );
};

export default FeatureList;
