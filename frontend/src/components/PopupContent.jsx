import React from 'react';
import { Popup } from 'react-leaflet';
import { Typography } from '@mui/material';

const PopupContent = ({ feature }) => {
    if (!feature || !feature.geometry || !feature.properties) return null;

    return (
        <Popup
            position={
                feature.geometry.type === 'Point'
                    ? [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
                    : feature.geometry.coordinates[0]
            }
        >
            <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '10px' }}>
                <Typography variant="h6">Feature Details</Typography>
                <ul>
                    {Object.keys(feature.properties).map((key) => (
                        <li key={key}>
                            <strong>{key}:</strong> {String(feature.properties[key])}
                        </li>
                    ))}
                </ul>
            </div>
        </Popup>
    );
};

export default PopupContent;
