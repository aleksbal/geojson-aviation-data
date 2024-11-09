// src/components/Map.js
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useMapContext } from '../context/MapContext';

// Define SVG templates for icons
const createSvgIcon = (fillColor, strokeColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="${strokeColor}" stroke-width="2" fill="none" />
    <circle cx="12" cy="12" r="5" fill="${fillColor}" />
  </svg>
`;

const createIcon = (fillColor, strokeColor) => L.divIcon({
  html: createSvgIcon(fillColor, strokeColor),
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const MapComponent = () => {
  const { layers, selectedLayerId, selectedFeatureId, setSelectedFeatureId } = useMapContext();
  const selectedLayer = layers.find(layer => layer.id === selectedLayerId);

  const handleFeatureClick = (feature) => {
    setSelectedFeatureId(feature.properties.id);
  };

  const pointToLayer = (feature, latlng) => {
    const isSelected = feature.properties.id === selectedFeatureId;
    const icon = isSelected
      ? createIcon('green', 'green')
      : createIcon('darkblue', 'darkblue');
    return L.marker(latlng, { icon });
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        className="h-full w-full"
        whenCreated={(mapInstance) => {
          mapInstance.invalidateSize(); // Trigger initial resize if necessary
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
        />
        {selectedLayer && (
          <GeoJSON
            key={selectedLayerId}
            data={{ type: 'FeatureCollection', features: selectedLayer.features }}
            pointToLayer={pointToLayer}
            onEachFeature={(feature, layer) => {
              layer.on('click', () => handleFeatureClick(feature));
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
