// src/components/FeatureList.jsx
import React, { useState, useEffect, useRef } from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const FeatureList = ({ layers, selectedLayerIndex, setSelectedFeature, selectedFeature }) => {
    const [selectedIndexes, setSelectedIndexes] = useState({}); // Track selected feature index per layer
    const listItemRefs = useRef({}); // Track refs for list items to enable scrolling

    // Ensure currentLayer is consistently set
    const currentLayer = layers[selectedLayerIndex];

    // Determine the index of the selected feature for the current layer
    const selectedIndex = selectedIndexes[selectedLayerIndex] ?? null;

    // Synchronize selection with `selectedFeature`
    useEffect(() => {
        if (currentLayer && selectedFeature && selectedFeature.properties) {
            const featureIndex = currentLayer.features.findIndex(
                (feature) => feature.properties.id === selectedFeature.properties.id
            );

            // Update the selectedIndexes for the current layer and scroll if needed
            if (featureIndex !== -1 && featureIndex !== selectedIndex) {
                setSelectedIndexes((prevIndexes) => ({
                    ...prevIndexes,
                    [selectedLayerIndex]: featureIndex,
                }));

                // Scroll to make the selected item visible
                listItemRefs.current[featureIndex]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    }, [selectedFeature, currentLayer, selectedLayerIndex, selectedIndex]);

    const handleItemClick = (feature, index) => {
        setSelectedFeature(feature);
        // Update the selected index for the active layer
        setSelectedIndexes((prevIndexes) => ({
            ...prevIndexes,
            [selectedLayerIndex]: index,
        }));
    };

    // Render the list only if `currentLayer` exists
    return (
        currentLayer ? (
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
                                    ref={(el) => (listItemRefs.current[index] = el)} // Set ref for each list item
                                    style={{
                                        marginBottom: '10px',
                                        backgroundColor: selectedIndex === index ? '#e0e0e0' : 'transparent', // Highlight selected item
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
        ) : null
    );
};

export default FeatureList;
