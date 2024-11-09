// src/components/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useMapContext } from '../context/MapContext';

const MapComponent = () => {
  const { layers, selectedLayerId, setSelectedFeatureId } = useMapContext();

  const handleFeatureClick = (feature) => {
    setSelectedFeatureId(feature.properties.id); // Sync the selected feature
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {layers.map((layer) =>
        layer.id === selectedLayerId ? (
          <GeoJSON
            key={layer.id}
            data={{ type: "FeatureCollection", features: layer.features }}
            onEachFeature={(feature, layer) => {
              layer.on('click', () => handleFeatureClick(feature));
            }}
          />
        ) : null
      )}
    </MapContainer>
  );
};

export default MapComponent;
