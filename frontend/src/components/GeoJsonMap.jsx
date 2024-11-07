// src/components/GeoJsonMap.jsx
import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import QueryForm from './QueryForm';
import LayerTabs from './LayerTabs';
import MapDisplay from './MapDisplay';
import FeatureList from './FeatureList';

const GeoJsonMap = () => {
    const [layers, setLayers] = useState([]);
    const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [error, setError] = useState(null);

    // Add a new layer and set it as the selected layer
    const handleAddLayer = (newLayer) => {
        setLayers((prevLayers) => [...prevLayers, newLayer]);
        setSelectedLayerIndex(layers.length);  // Automatically select the new layer
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <Container maxWidth="xl" style={{ marginTop: '20px', flexGrow: 1 }}>
                <QueryForm
                    addLayer={handleAddLayer}
                    setError={setError}
                />
                {error && <div>{error}</div>}
                <LayerTabs
                    layers={layers}
                    selectedLayerIndex={selectedLayerIndex}
                    setSelectedLayerIndex={setSelectedLayerIndex}
                    setLayers={setLayers}
                />

                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    <Grid item xs={12} md={8}>
                        <MapDisplay
                            layers={layers}
                            selectedLayerIndex={selectedLayerIndex}
                            selectedFeature={selectedFeature}
                            setSelectedFeature={setSelectedFeature}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeatureList
                            layers={layers}
                            selectedLayerIndex={selectedLayerIndex}
                            setSelectedFeature={setSelectedFeature}
                        />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default GeoJsonMap;
