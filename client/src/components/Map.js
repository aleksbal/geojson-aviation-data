// src/components/Map.js
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useMapContext } from '../context/MapContext';
import L from 'leaflet';

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
  const geoJsonLayerRef = useRef(null); // Reference to the GeoJSON layer
  const markersRef = useRef({}); // Store markers by feature ID for easy updates

  const handleFeatureClick = (feature) => {
    setSelectedFeatureId(feature.properties.id);
  };

  // General function to set feature styles based on selection state
  const setFeatureStyle = (feature) => {
    const isSelected = feature.properties.id === selectedFeatureId;

    // Style for point geometries (change icon)
    if (feature.geometry.type === 'Point') {
      return {
        icon: isSelected ? createIcon('green', 'green') : createIcon('darkblue', 'darkblue'),
      };
    }

    // Style for line and polygon geometries
    return {
      color: isSelected ? 'green' : 'darkblue',
      weight: 3,
    };
  };

  const pointToLayer = (feature, latlng) => {
    const { icon } = setFeatureStyle(feature); // Apply icon style for points
    const marker = L.marker(latlng, { icon });
    markersRef.current[feature.properties.id] = marker;
    marker.on('click', () => handleFeatureClick(feature));

    return marker;
  };

  const onEachFeature = (feature, layer) => {
    layer.on('click', () => handleFeatureClick(feature));

    // Apply style for non-point geometries (e.g., LineString, Polygon)
    if (feature.geometry.type !== 'Point') {
      layer.setStyle(setFeatureStyle(feature));
    }
  };

  // Effect to render only the active layer initially
  useEffect(() => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.clearLayers();

      if (selectedLayer) {
        geoJsonLayerRef.current.addData(selectedLayer);
      }
    }
  }, [selectedLayer]);

  // Effect to update the selected feature’s style on selection change
  useEffect(() => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.eachLayer((layer) => {
        if (layer.feature) {
          // Update style for each feature based on selection
          const style = setFeatureStyle(layer.feature);

          // Apply icon for point markers
          if (layer.feature.geometry.type === 'Point' && markersRef.current[layer.feature.properties.id]) {
            markersRef.current[layer.feature.properties.id].setIcon(style.icon);
          } else {
            layer.setStyle(style); // Apply style for non-point geometries
          }
        }
      });
    }
  }, [selectedFeatureId]); // Depend on selectedFeatureId for selection changes

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[54.54, 25.19]}
        zoom={4}
        className="h-full w-full"
        whenCreated={(mapInstance) => {
          geoJsonLayerRef.current = L.geoJSON(null, {
            pointToLayer,
            onEachFeature,
          }).addTo(mapInstance);
          mapInstance.invalidateSize();
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;

