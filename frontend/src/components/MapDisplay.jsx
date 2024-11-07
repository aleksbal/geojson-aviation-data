// src/components/MapDisplay.jsx
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import CenterMapOnFeature from './CenterMapOnFeature';
import PopupContent from './PopupContent';
import 'leaflet/dist/leaflet.css';

const MapDisplay = ({ layers, selectedLayerIndex, selectedFeature, setSelectedFeature }) => {
    const currentLayer = layers[selectedLayerIndex];
    if (!currentLayer) return null;

    const onEachFeature = (feature, layer) => layer.on('click', () => setSelectedFeature(feature));

    return (
        <MapContainer center={[47.943889, -2.181943]} zoom={10} style={{ height: "70vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON data={currentLayer.features} onEachFeature={onEachFeature} />
            {selectedFeature && <PopupContent feature={selectedFeature} />}
            {selectedFeature && <CenterMapOnFeature coordinates={selectedFeature.geometry.coordinates} geometryType={selectedFeature.geometry.type} />}
        </MapContainer>
    );
};

export default MapDisplay;
