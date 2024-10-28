import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AppBar, Toolbar, Typography, Container, Grid, List, ListItem, ListItemText, ListItemIcon, Divider, Tabs, Tab, TextField, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import TimelineIcon from '@mui/icons-material/Timeline';
import TerrainIcon from '@mui/icons-material/Terrain';

const GeoJsonMap = () => {
  const [layers, setLayers] = useState([]);  // Manage multiple layers
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);  // Which layer is currently selected
  const [query, setQuery] = useState('');  // Input field for the user's query
  const [loading, setLoading] = useState(false);  // Loading state
  const [selectedFeature, setSelectedFeature] = useState(null);  // Track selected feature

  const fetchLayerData = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(query);
      const data = await response.json();

      const geoJsonFeatureCollection = {
        query: query,  // Store the query for this layer
        features: data,
      };

      setLayers((prevLayers) => [...prevLayers, geoJsonFeatureCollection]);
      setSelectedLayerIndex(layers.length);  // Set the newly created layer as active
    } catch (error) {
      console.error('Error fetching GeoJSON:', error);
    } finally {
      setLoading(false);
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
        {Object.keys(feature.properties).map((key) => (
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

  const renderCurrentLayer = () => {
    const currentLayer = layers[selectedLayerIndex];
    if (!currentLayer) return null;

    const onEachFeature = (feature, layer) => {
      layer.on('click', () => {
        setSelectedFeature(feature);
      });
    };

    const handleFeatureClick = (feature) => {
      // Only set the selected feature if geometry is valid
      if (feature.geometry && feature.geometry.coordinates) {
        setSelectedFeature(feature);
      }
    };

    return (
      <Grid container spacing={2}>
        {/* Map Section */}
        <Grid item xs={12} md={8}>
          <MapContainer center={[47.943889, -2.181943]} zoom={10} style={{ height: "70vh", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {currentLayer.features && (
              <GeoJSON
                data={currentLayer.features}
                onEachFeature={onEachFeature}
                pointToLayer={(feature, latlng) => {
                  if (feature.geometry.type === "Point") {
                    return L.marker(latlng);
                  }
                }}
                style={feature => {
                  if (feature.geometry.type === "Polygon" || feature.geometry.type === "LineString") {
                    return { color: 'blue' };
                  }
                }}
              />
            )}

            {/* Show Popup for the selected feature only if geometry exists */}
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
              <CenterMapOnFeature coordinates={selectedFeature.geometry.coordinates} geometryType={selectedFeature.geometry.type} />
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

                let icon;
                if (geometryType === 'Point') icon = <PlaceIcon />;
                else if (geometryType === 'LineString') icon = <TimelineIcon />;
                else if (geometryType === 'Polygon') icon = <TerrainIcon />;
                else icon = <PlaceIcon />;

                return (
                  <React.Fragment key={index}>
                    <ListItem
                      button
                      onClick={() => handleFeatureClick(feature)}  // Use custom handler for geometry check
                      style={{ marginBottom: '10px' }}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText
                        primary={feature.properties.message}
                        secondary={coordinates ? `${geometryType}: ${coordinates.join(', ')}` : 'No coordinates available'}
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

      {/* Query Form */}
      <Container maxWidth="xl" style={{ marginTop: '20px' }}>
        <form onSubmit={handleQuerySubmit}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
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
          </Grid>
        </form>
      </Container>

      {/* Layer Tabs */}
      <Container maxWidth="xl" style={{ marginTop: '20px', flexGrow: 1 }}>
        {layers.length > 0 && (
          <>
            <Tabs
              value={selectedLayerIndex}
              onChange={(event, newValue) => setSelectedLayerIndex(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="layer tabs"
            >
              {layers.map((layer, index) => (
                <Tab key={index} label={`Layer ${index + 1} - ${layer.query}`} />
              ))}
            </Tabs>

            {/* Render the current layer's map and list */}
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
