// src/components/Map.js
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useMapContext } from '../context/MapContext';

const MapComponent = () => {
  const { layers, selectedLayerId, setSelectedFeatureId } = useMapContext();

  // Find the selected layer based on the selectedLayerId
  const selectedLayer = layers.find(layer => layer.id === selectedLayerId);

  const handleFeatureClick = (feature) => {
    setSelectedFeatureId(feature.properties.id);
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedLayer && (
        <GeoJSON
          key={selectedLayerId} // Unique key to ensure re-render on layer change
          data={{ type: 'FeatureCollection', features: selectedLayer.features }}
          onEachFeature={(feature, layer) => {
            layer.on('click', () => handleFeatureClick(feature));
          }}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;

