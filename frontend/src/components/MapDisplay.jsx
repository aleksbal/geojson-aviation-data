// src/components/MapDisplay.jsx
import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import CenterMapOnFeature from './CenterMapOnFeature';
import PopupContent from './PopupContent';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const MapDisplay = ({ layers, selectedLayerIndex, selectedFeature, setSelectedFeature }) => {
    const currentLayer = layers[selectedLayerIndex];
    if (!currentLayer) return null;

    // Only display features of the current layer
    const features = currentLayer.features;

    // Define the style for features, highlighting the selected feature
    const getFeatureStyle = (feature) => {
        const isSelected = selectedFeature && selectedFeature.properties.id === feature.properties.id;

        if (feature.geometry?.type === "LineString") {
            return { color: isSelected ? 'yellow' : 'green', weight: isSelected ? 6 : 4 };
        }
        if (feature.geometry?.type === "Polygon") {
            return { color: isSelected ? 'yellow' : 'blue', weight: isSelected ? 4 : 2, fillOpacity: 0.3 };
        }
        return { color: isSelected ? 'yellow' : 'red' };
    };

    const onEachFeature = (feature, layer) => {
        layer.on('click', () => setSelectedFeature(feature));
    };

    return (
        <MapContainer center={[47.943889, -2.181943]} zoom={10} style={{ height: "70vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Render only the active layer's features */}
            <GeoJSON
                key={currentLayer.query}  // Use query or unique ID as key to force re-rendering on layer change
                data={features}
                onEachFeature={onEachFeature}
                pointToLayer={(feature, latlng) => {
                    if (feature.geometry?.type === "Point") {
                        return L.marker(latlng, { icon: customIcon });
                    }
                    return null;
                }}
                style={getFeatureStyle}  // Apply dynamic style for selected feature
            />

            {/* Conditionally render PopupContent and CenterMapOnFeature only if geometry exists */}
            {selectedFeature && selectedFeature.geometry && (
                <>
                    <PopupContent feature={selectedFeature} />
                    <CenterMapOnFeature
                        coordinates={selectedFeature.geometry.coordinates}
                        geometryType={selectedFeature.geometry.type}
                    />
                </>
            )}
        </MapContainer>
    );
};

export default MapDisplay;
