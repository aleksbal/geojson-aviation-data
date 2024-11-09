// src/context/MapContext.js
import React, { createContext, useContext, useState } from 'react';

const MapContext = createContext();

export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
  const [layers, setLayers] = useState([]); // Initialize as an array
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const [error, setError] = useState(null);

  return (
    <MapContext.Provider
      value={{
        layers,
        setLayers,
        selectedLayerId,
        setSelectedLayerId,
        selectedFeatureId,
        setSelectedFeatureId,
        error,
        setError,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

