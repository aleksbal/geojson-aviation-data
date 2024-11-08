// src/components/FeatureList.jsx
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const FeatureList = ({ layers, selectedLayerIndex, setSelectedFeature }) => {
    const [selectedIndexes, setSelectedIndexes] = useState({}); // Track selected feature index per layer

    const currentLayer = layers[selectedLayerIndex];
    if (!currentLayer) return null;

    // Update selection when the active layer changes
    const selectedIndex = selectedIndexes[selectedLayerIndex] ?? null;

    const handleItemClick = (feature, index) => {
        setSelectedFeature(feature);
        // Set the selected index for the active layer
        setSelectedIndexes((prevIndexes) => ({
            ...prevIndexes,
            [selectedLayerIndex]: index,
        }));
    };

    return (
        <div style={{ height: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
            <Typography variant="h6" gutterBottom>
                Feature List for Query: {currentLayer.query}
            </Typography>
            <List>
                {currentLayer.features.map((feature, index) => {
                    const geometryType = feature.geometry?.type;
                    const coordinates = feature.geometry?.coordinates;
                    const message = feature.properties?.type || "No type available";

                    return (
                        <React.Fragment key={index}>
                            <ListItem
                                button
                                onClick={() => handleItemClick(feature, index)}
                                style={{
                                    marginBottom: '10px',
                                    backgroundColor: selectedIndex === index ? '#e0e0e0' : 'transparent', // Highlight only if selected
                                }}
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
