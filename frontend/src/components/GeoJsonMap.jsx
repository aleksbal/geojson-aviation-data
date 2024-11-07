// src/components/GeoJsonMap.jsx
import React, { useState } from 'react';
import { Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import QueryForm from './QueryForm';
import LayerTabs from './LayerTabs';
import MapDisplay from './MapDisplay';
import FeatureList from './FeatureList';
import ErrorBoundary from './ErrorBoundary';
import Split from 'react-split';

const GeoJsonMap = () => {
    const [layers, setLayers] = useState([]);
    const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [error, setError] = useState(null);

    const handleAddLayer = (newLayer) => {
        setLayers((prevLayers) => [...prevLayers, newLayer]);
        setSelectedLayerIndex(layers.length);
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

                {/* Split component for resizable Map and List sections */}
                <Split
                    className="split" /* Ensure this class matches your CSS */
                    sizes={[70, 30]} /* Initial width percentages */
                    minSize={200} /* Minimum width of each panel */
                    gutterSize={10} /* Divider size */
                    direction="horizontal"
                    style={{ display: 'flex', width: '100%', marginTop: '20px', height: '70vh' }}
                >
                    {/* Map Section */}
                    <div style={{ flexGrow: 1 }}>
                        <ErrorBoundary>
                            <MapDisplay
                                layers={layers}
                                selectedLayerIndex={selectedLayerIndex}
                                selectedFeature={selectedFeature}
                                setSelectedFeature={setSelectedFeature}
                            />
                        </ErrorBoundary>
                    </div>

                    {/* List Section (Always visible, even when empty) */}
                    <div style={{ overflowY: 'auto', paddingRight: '10px' }}>
                        <FeatureList
                            layers={layers}
                            selectedLayerIndex={selectedLayerIndex}
                            setSelectedFeature={setSelectedFeature}
                        />
                    </div>
                </Split>
            </Container>
            <Footer />
        </div>
    );
};

export default GeoJsonMap;
