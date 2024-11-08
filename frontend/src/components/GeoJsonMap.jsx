// src/components/GeoJsonMap.jsx
import React, { useState } from 'react';
import { Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import QueryForm from './QueryForm';
import LayerTabs from './LayerTabs';
import MapDisplay from './MapDisplay';
import FeatureList from './FeatureList';
import Feature from './Feature';
import ErrorBoundary from './ErrorBoundary';
import Split from 'react-split';

const GeoJsonMap = () => {
    const [layers, setLayers] = useState([]);
    const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
    const [selectedFeatures, setSelectedFeatures] = useState({}); // Store selected feature per layer
    const [error, setError] = useState(null);

    const handleAddLayer = (newLayer) => {
        setLayers((prevLayers) => [...prevLayers, newLayer]);
        setSelectedLayerIndex(layers.length);
    };

    // Handle feature selection, updating per layer
    const handleSetSelectedFeature = (feature) => {
        setSelectedFeatures((prevSelectedFeatures) => ({
            ...prevSelectedFeatures,
            [selectedLayerIndex]: feature,
        }));
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

                {/* Split component for resizable List, Map, and Feature sections */}
                <Split
                    className="split"
                    sizes={[20, 60, 20]}
                    minSize={200}
                    gutterSize={10}
                    direction="horizontal"
                    style={{ display: 'flex', width: '100%', marginTop: '20px', height: '70vh' }}
                >
                    {/* List Section on the Left */}
                    <div style={{ overflowY: 'auto', paddingRight: '10px' }}>
                        <FeatureList
                            layers={layers}
                            selectedLayerIndex={selectedLayerIndex}
                            setSelectedFeature={handleSetSelectedFeature}
                        />
                    </div>

                    {/* Map Section in the Center */}
                    <div style={{ flexGrow: 1 }}>
                        <ErrorBoundary>
                            <MapDisplay
                                layers={layers}
                                selectedLayerIndex={selectedLayerIndex}
                                selectedFeature={selectedFeatures[selectedLayerIndex] || null}
                                setSelectedFeature={handleSetSelectedFeature}
                            />
                        </ErrorBoundary>
                    </div>

                    {/* Feature Details Section on the Right */}
                    <div style={{ overflowY: 'auto', paddingLeft: '10px' }}>
                        <Feature feature={selectedFeatures[selectedLayerIndex] || null} />
                    </div>
                </Split>
            </Container>
            <Footer />
        </div>
    );
};

export default GeoJsonMap;
