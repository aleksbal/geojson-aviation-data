// src/components/FeatureList.js
import React, { useRef, useEffect } from 'react';
import { useMapContext } from '../context/MapContext';

const FeatureList = () => {
  const { layers, selectedLayerId, selectedFeatureId, setSelectedFeatureId } = useMapContext();

  const selectedLayer = layers.find(layer => layer.id === selectedLayerId);

  // Ref object to store references to each feature item
  const featureRefs = useRef({});

  // Scroll the selected item into view when `selectedFeatureId` changes
  useEffect(() => {
    if (selectedFeatureId && featureRefs.current[selectedFeatureId]) {
      featureRefs.current[selectedFeatureId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedFeatureId]);

  if (!selectedLayer) {
    return <p className="text-gray-500">No features available</p>;
  }

  return (
    <div className="p-4 overflow-y-auto h-full scroll-smooth">
      <h3 className="text-lg font-semibold mb-2">Feature List</h3>
      {selectedLayer.features.length > 0 ? (
        <ul className="list-none p-0">
          {selectedLayer.features.map((feature) => (
            <li
              key={feature.properties?.id || feature.id} // Ensure each key is unique
              ref={(el) => (featureRefs.current[feature.properties?.id] = el)} // Store ref in featureRefs
              className={`p-2 cursor-pointer rounded ${
                feature.properties?.id === selectedFeatureId ? 'bg-gray-300' : 'bg-white'
              } hover:bg-gray-200`}
              onClick={() => {
                if (feature.properties?.id !== selectedFeatureId) {
                  setSelectedFeatureId(feature.properties?.id); // Select new feature
                } else {
                  setSelectedFeatureId(null); // Deselect if clicked again
                }
              }}
            >
              {feature.properties?.type || 'Unknown Type'}:
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

