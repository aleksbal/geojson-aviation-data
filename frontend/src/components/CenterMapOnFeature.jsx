import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const CenterMapOnFeature = ({ coordinates, geometryType }) => {
    const map = useMap();

    useEffect(() => {
        if (!coordinates) return;

        if (geometryType === 'Point') {
            // Center map on a single point
            map.flyTo([coordinates[1], coordinates[0]], 10);
        } else {
            // Fit bounds for LineString, Polygon, etc.
            const latLngs = geometryType === 'LineString' || geometryType === 'Polygon'
                ? coordinates.map(coord => [coord[1], coord[0]])
                : coordinates;
            map.fitBounds(latLngs);
        }
    }, [coordinates, geometryType, map]);

    return null;
};

export default CenterMapOnFeature;
