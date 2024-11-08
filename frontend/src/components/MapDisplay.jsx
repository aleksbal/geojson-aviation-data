// src/components/MapDisplay.jsx
import React, { useEffect, useRef } from 'react';
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
    const mapContainerRef = useRef(null);  // Reference to the MapContainer div
    const currentLayer = layers[selectedLayerIndex];
    const features = currentLayer ? currentLayer.features : [];

    // Function to calculate center coordinates for various geometry types
    const getFeatureCenterCoordinates = (geometry) => {
        if (!geometry) return null;

        const { type, coordinates } = geometry;

        switch (type) {
            case 'Point':
                return [coordinates[1], coordinates[0]]; // Directly use point coordinates

            case 'LineString': {
                // Calculate the midpoint for LineString
                const midIndex = Math.floor(coordinates.length / 2);
                return [coordinates[midIndex][1], coordinates[midIndex][0]];
            }

            case 'Polygon': {
                // Calculate a simple centroid for Polygon
                const flatCoords = coordinates[0];
                const centroid = flatCoords.reduce(
                    (acc, coord) => [acc[0] + coord[0], acc[1] + coord[1]],
                    [0, 0]
                ).map((sum) => sum / flatCoords.length);
                return [centroid[1], centroid[0]];
            }

            default:
                return null;
        }
    };

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
            return { color: isSelected ? 'green' : 'blue', weight: isSelected ? 6 : 4 };
        }
        if (feature.geometry?.type === "Polygon") {
            return { color: isSelected ? 'green' : 'blue', weight: isSelected ? 4 : 2, fillOpacity: 0.3 };
        }
        return { color: isSelected ? 'green' : 'blue' };
    };

    const onEachFeature = (feature, layer) => {
        layer.on('click', () => setSelectedFeature(feature));
    };

    useEffect(() => {
        const map = mapContainerRef.current?.leafletElement;

        // Ensure map resizes properly when the container size changes
        const resizeObserver = new ResizeObserver(() => {
            if (map) {
                map.invalidateSize();
            }
        });

        if (mapContainerRef.current) {
            resizeObserver.observe(mapContainerRef.current);
        }

        return () => {
            if (mapContainerRef.current) {
                resizeObserver.unobserve(mapContainerRef.current);
            }
        };
    }, []);

    return (
        <MapContainer ref={mapContainerRef} center={[47.943889, -2.181943]} zoom={10} style={{ height: "70vh", width: "100%" }}>
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

            {selectedFeature && selectedFeature.geometry && (
                <>
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
