// src/components/MapDisplay.jsx
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
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

    const onEachFeature = (feature, layer) => {
        layer.on('click', () => setSelectedFeature(feature));
    };

    return (
        <MapContainer center={[47.943889, -2.181943]} zoom={10} style={{ height: "70vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON
                key={currentLayer.id}  // Unique key for each layer
                data={currentLayer.features}
                onEachFeature={onEachFeature}
                pointToLayer={(feature, latlng) => {
                    if (feature.geometry?.type === "Point") {
                        return L.marker(latlng, { icon: customIcon });
                    }
                    return null;
                }}
                style={(feature) => {
                    if (feature.geometry?.type === "LineString") return { color: 'green', weight: 4 };
                    if (feature.geometry?.type === "Polygon") return { color: 'blue', weight: 2, fillOpacity: 0.3 };
                    return { color: 'red' };
                }}
            />
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
