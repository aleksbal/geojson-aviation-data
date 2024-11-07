// src/components/FeatureList.jsx
import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const FeatureList = ({ layers, selectedLayerIndex, setSelectedFeature }) => {
    const currentLayer = layers[selectedLayerIndex];
    if (!currentLayer) return null;

    return (
        <div style={{ height: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
            <Typography variant="h6" gutterBottom>
                Feature List for Query: {currentLayer.query}
            </Typography>
            <List>
                {currentLayer.features.map((feature, index) => {
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
