import React from 'react';
import { Tabs, Tab, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Close';

const LayerTabs = ({ layers, selectedLayerIndex, setSelectedLayerIndex, setLayers }) => {
    const removeLayer = (index) => setLayers(layers.filter((_, i) => i !== index));

    return (
        <Tabs value={selectedLayerIndex} onChange={(e, newIndex) => setSelectedLayerIndex(newIndex)} variant="scrollable" scrollButtons="auto">
            {layers.map((layer, index) => (
                <Tab
                    key={index}
                    label={
                        <Box display="flex" alignItems="center">
                            {`Layer ${index + 1} - ${layer.query}`}
                            <IconButton color="secondary" size="small" onClick={() => removeLayer(index)} sx={{ ml: 1 }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    }
                />
            ))}
        </Tabs>
    );
};

export default LayerTabs;
