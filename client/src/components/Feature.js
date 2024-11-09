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
    return <p className="text-gray-500">Select a feature to see its properties</p>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Feature Properties</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-b border-gray-400 px-2 py-1 text-left">Property</th>
            <th className="border-b border-gray-400 px-2 py-1 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the properties of the selected feature */}
          {Object.entries(selectedFeature.properties).map(([key, value]) => (
            <tr key={key}>
              <td className="border-b border-gray-200 px-2 py-1">{key}</td>
              <td className="border-b border-gray-200 px-2 py-1">
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
