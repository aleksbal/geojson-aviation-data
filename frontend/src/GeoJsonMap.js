import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AppBar, Toolbar, Typography, Container, Grid, List, ListItem, ListItemText, IconButton, Box, Divider, Tabs, Tab, TextField, Button, Alert } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import TimelineIcon from '@mui/icons-material/Timeline';
import TerrainIcon from '@mui/icons-material/Terrain';
import DeleteIcon from '@mui/icons-material/Close';

const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const GeoJsonMap = () => {
    const [layers, setLayers] = useState([]);  // Manage multiple layers
    const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);  // Currently selected layer
    const [query, setQuery] = useState('');  // Input field for the user's query
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state for API calls
    const [selectedFeature, setSelectedFeature] = useState(null);  // Track selected feature

    const fetchLayerData = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(query);
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const data = await response.json();

            const geoJsonFeatureCollection = {
                query: query,
                features: JSON.parse(JSON.stringify(data)),  // Deep clone data to ensure independence
            };

            setLayers((prevLayers) => [...prevLayers, geoJsonFeatureCollection]);
            setSelectedLayerIndex(layers.length);  // Set the newly created layer as active
        } catch (error) {
            setError(`Unable to fetch data. ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    const geoJsonFeatureCollection = {
                        query: `Uploaded: ${file.name}`,
                        features: JSON.parse(JSON.stringify(data.features || [data])),  // Deep clone to ensure unique layer data
                    };
                    setLayers((prevLayers) => [...prevLayers, geoJsonFeatureCollection]);
                    setSelectedLayerIndex(layers.length);  // Set the newly created layer as active
                } catch (error) {
                    setError("Invalid GeoJSON file format. Please upload a valid file.");
                }
            };
            reader.readAsText(file);
        }
    };

    const handleQuerySubmit = (event) => {
        event.preventDefault();
        if (query) {
            fetchLayerData(query);
            setQuery('');
        }
    };

    const renderPopupContent = (feature) => (
        <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '10px' }}>
            <Typography variant="h6">Feature Details</Typography>
            <ul>
                {Object.keys(feature.properties || {}).map((key) => (
                    <li key={key}>
                        <strong>{key}:</strong> {String(feature.properties[key])}
                    </li>
                ))}
            </ul>
        </div>
    );

    const CenterMapOnFeature = ({ coordinates, geometryType }) => {
        const map = useMap();
        useEffect(() => {
            if (coordinates) {
                if (geometryType === 'Point') {
                    map.flyTo([coordinates[1], coordinates[0]], 14);
                } else {
                    map.fitBounds(coordinates);
                }
            }
        }, [coordinates, geometryType, map]);
        return null;
    };

    const renderLayerTabs = () => (
        <Tabs
            value={selectedLayerIndex}
            onChange={(event, newValue) => setSelectedLayerIndex(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="layer tabs"
        >
            {layers.map((layer, index) => (
                <Tab
                    key={index}
                    label={
                        <Box display="flex" alignItems="center">
                            {`Layer ${index + 1} - ${layer.query}`}
                            <IconButton
                                color="secondary"
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();  // Prevent tab switch on delete
                                    removeLayer(index);
                                }}
                                sx={{ ml: 1 }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    }
                />
            ))}
        </Tabs>
    );

    const removeLayer = (index) => {
        setLayers((prevLayers) => prevLayers.filter((_, i) => i !== index));
        setSelectedLayerIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));  // Adjust selected layer if necessary
    };

    const renderCurrentLayer = () => {
        const currentLayer = layers[selectedLayerIndex];
        if (!currentLayer) return null;

        const validFeatures = currentLayer.features.filter(feature => {
            const coordinates = feature.geometry?.coordinates;
            return (
                feature.geometry?.type &&
                Array.isArray(coordinates) &&
                (feature.geometry.type === "Point"
                    ? coordinates.length === 2 && typeof coordinates[0] === "number" && typeof coordinates[1] === "number"
                    : coordinates.length >= 2)  // LineString and Polygon need at least 2 points
            );
        });

        const onEachFeature = (feature, layer) => {
            layer.on('click', () => {
                setSelectedFeature(feature);
            });
        };

        const handleFeatureClick = (feature) => {
            if (feature.geometry && Array.isArray(feature.geometry.coordinates)) {
                setSelectedFeature(feature);
            } else {
                console.warn("Feature does not have valid coordinates", feature);
            }
        };

        return (
            <Grid container spacing={2}>
                {/* Map Section */}
                <Grid item xs={12} md={8}>
                    <MapContainer center={[47.943889, -2.181943]} zoom={10} style={{ height: "70vh", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        {validFeatures.length > 0 && (
                            <GeoJSON
                                data={validFeatures}
                                onEachFeature={onEachFeature}
                                pointToLayer={(feature, latlng) => {
                                    if (feature.geometry.type === "Point") {
                                        return L.marker(latlng, { icon: customIcon });
                                    }
                                    return null;
                                }}
                                style={(feature) => {
                                    if (feature.geometry.type === "LineString") {
                                        return { color: 'green', weight: 4 };
                                    } else if (feature.geometry.type === "Polygon") {
                                        return { color: 'blue', weight: 2, fillOpacity: 0.3 };
                                    }
                                    return { color: 'red' };
                                }}
                            />
                        )}

                        {selectedFeature && selectedFeature.geometry && (
                            <Popup
                                position={
                                    selectedFeature.geometry.type === 'Point'
                                        ? [selectedFeature.geometry.coordinates[1], selectedFeature.geometry.coordinates[0]]
                                        : selectedFeature.geometry.coordinates[0]
                                }
                                autoPan={true}
                                autoPanPadding={[20, 20]}
                                maxWidth={300}
                            >
                                {renderPopupContent(selectedFeature)}
                            </Popup>
                        )}

                        {selectedFeature && selectedFeature.geometry && (
                            <CenterMapOnFeature
                                coordinates={selectedFeature.geometry.coordinates}
                                geometryType={selectedFeature.geometry.type}
                            />
                        )}
                    </MapContainer>
                </Grid>

                {/* List Section */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Feature List for Query: {currentLayer.query}
                    </Typography>
                    <div style={{ height: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
                        <List>
                            {currentLayer.features.map((feature, index) => {
                                const geometryType = feature.geometry?.type;
                                const coordinates = feature.geometry?.coordinates;
                                const message = feature.properties?.message || "No message available";

                                return (
                                    <React.Fragment key={index}>
                                        <ListItem
                                            button
                                            onClick={() => handleFeatureClick(feature)}
                                            style={{ marginBottom: '10px' }}
                                        >
                                            <ListItemText
                                                primary={message}
                                                secondary={
                                                    Array.isArray(coordinates)
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
                </Grid>
            </Grid>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        GeoJSON Layer Viewer
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Query Form and File Upload */}
            <Container maxWidth="xl" style={{ marginTop: '20px' }}>
                <form onSubmit={handleQuerySubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                label="Enter Query"
                                variant="outlined"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {loading ? 'Loading...' : 'Submit'}
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <input
                                type="file"
                                accept=".geojson,.json"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                id="upload-file"
                            />
                            <label htmlFor="upload-file">
                                <Button variant="contained" color="secondary" component="span" fullWidth>
                                    Upload GeoJSON
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                </form>
            </Container>

            {/* Error Message */}
            {error && (
                <Container maxWidth="xl" style={{ marginTop: '10px' }}>
                    <Alert severity="error">{error}</Alert>
                </Container>
            )}

            {/* Layer Tabs with Close (X) Buttons */}
            <Container maxWidth="xl" style={{ marginTop: '20px', flexGrow: 1 }}>
                {layers.length > 0 && (
                    <>
                        {renderLayerTabs()}
                        {renderCurrentLayer()}
                    </>
                )}
            </Container>

            {/* Footer */}
            <footer style={{
                padding: '10px',
                backgroundColor: '#f8f8f8',
                textAlign: 'center',
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0
            }}>
                <Typography variant="body2" color="textSecondary">
                    © 2024 GeoJSON Layer Viewer. All rights reserved.
                </Typography>
            </footer>
        </div>
    );
};

export default GeoJsonMap;
