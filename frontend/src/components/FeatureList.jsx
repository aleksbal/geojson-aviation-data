import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const FeatureList = ({ layers, selectedLayerIndex, setSelectedFeature }) => {
    const currentLayer = layers[selectedLayerIndex];

    // Add a fallback to prevent errors if currentLayer or currentLayer.features is undefined
    const features = currentLayer?.features || [];

    return (
        <div style={{ height: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
            <Typography variant="h6" gutterBottom>
                Feature List for Query: {currentLayer?.query || 'No query available'}
            </Typography>
            <List>
                {features.map((feature, index) => {
                    const geometryType = feature.geometry?.type;
                    const coordinates = feature.geometry?.coordinates;
                    const message = feature.properties?.message || "No message available";

                    return (
                        <React.Fragment key={index}>
                            <ListItem
                                button
                                onClick={() => {
                                    setSelectedFeature(feature);
                                }}
                                style={{ marginBottom: '10px' }}
                            >
                                <ListItemText
                                    primary={message}
                                    secondary={
                                        coordinates
                                            ? `${geometryType}: ${coordinates.join(', ')}`
                                            : 'No coordinates available'
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    );
                })}
            </List>
        </div>
    );
};

export default FeatureList;
