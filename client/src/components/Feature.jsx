// src/components/FeatureComponent.js
import React from 'react';
import { useMapContext } from '../context/MapContext';

const FeatureComponent = () => {
  const { layers, selectedLayerId, selectedFeatureId } = useMapContext();

  const selectedLayer = layers.find(layer => layer.id === selectedLayerId);
  const selectedFeature = selectedLayer
    ? selectedLayer.features.find(feature => feature.properties.id === selectedFeatureId)
    : null;

  if (!selectedFeature) {
    return <p className="text-gray-500 font-light antialiased">No feature selected</p>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 antialiased">Properties</h3>
      <table className="w-full text-gray-600 font-light antialiased">
        <thead>
          <tr>
            <th className="text-left font-semibold text-gray-700">Name</th>
            <th className="text-left font-semibold text-gray-700">Value</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the properties of the selected feature */}
          {Object.entries(selectedFeature.properties).map(([key, value]) => (
            <tr key={key}>
              <td className="border-t border-gray-300 py-1 px-2">{key}</td>
              <td className="border-t border-gray-300 py-1 px-2">
                  {/* Check if the value is an object and handle accordingly */}
                  {typeof value === 'object' && value !== null ? (
                    <pre>{JSON.stringify(value, null, 2)}</pre> // Display objects as JSON
                  ) : (
                    value
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureComponent;
