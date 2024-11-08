import React from 'react';
import { Typography, Box } from '@mui/material';

const Feature = ({ feature }) => {
    if (!feature) {
        return <Typography variant="body2">Select a feature to view details</Typography>;
    }

    return (
        <Box style={{ padding: '10px', maxHeight: '70vh', overflowY: 'auto' }}>
            <Typography variant="h6">Feature Details</Typography>
            {Object.entries(feature.properties).map(([key, value]) => (
                <Typography key={key} variant="body2">
                    <strong>{key}:</strong> {String(value)}
                </Typography>
            ))}
        </Box>
    );
};

export default Feature;
