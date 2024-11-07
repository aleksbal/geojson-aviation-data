// src/components/CenterMapOnFeature.jsx
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const CenterMapOnFeature = ({ coordinates, geometryType }) => {
    const map = useMap();

    useEffect(() => {
        if (coordinates) {
            if (geometryType === 'Point') {
                map.flyTo([coordinates[1], coordinates[0]], 14);
            } else {
                // Fit bounds for LineString, Polygon, etc.
                map.fitBounds(coordinates);
            }
        }
    }, [coordinates, geometryType, map]);

    return null;
};

export default CenterMapOnFeature;
