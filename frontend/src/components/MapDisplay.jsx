// src/components/MapDisplay.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
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
    const features = currentLayer ? currentLayer.features : [];

    // Helper component to fit bounds based on the layer's features
    const FitBoundsOnLoad = () => {
        const map = useMap();
        useEffect(() => {
            if (!features || features.length === 0) return;

            const latLngs = [];
            features.forEach((feature) => {
                const geometry = feature.geometry;

                // Ensure geometry and coordinates are defined
                if (geometry && geometry.coordinates) {
                    const { coordinates, type } = geometry;

                    if (type === "Point") {
                        latLngs.push([coordinates[1], coordinates[0]]);
                    } else if (type === "LineString" || type === "Polygon") {
                        coordinates.forEach(coord => latLngs.push([coord[1], coord[0]]));
                    }
                }
            });

            if (latLngs.length > 0) {
                map.fitBounds(latLngs);
            }
        }, [features, map]);

        return null;
    };

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
            {/* Always display the base map layer */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Fit map bounds to current layer's features on load */}
            {features.length > 0 && <FitBoundsOnLoad />}

            {/* Conditionally render the GeoJSON layer if features are available */}
            {features.length > 0 && (
                <GeoJSON
                    key={currentLayer.query}  // Unique key to force re-rendering on layer change
                    data={features}
                    onEachFeature={onEachFeature}
                    pointToLayer={(feature, latlng) => {
                        if (feature.geometry?.type === "Point") {
                            return L.marker(latlng, { icon: customIcon });
                        }
                        return null;
                    }}
                    style={getFeatureStyle}
                />
            )}

            {/* Conditionally render popup and centering only if a feature is selected */}
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
