// src/components/QueryForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const QueryForm = ({ layers, setLayers, setSelectedLayerIndex, setError }) => {
    const [query, setQuery] = useState('');

    const fetchLayerData = async (query) => {
        try {
            const response = await fetch(query);
            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
            const data = await response.json();
            const layer = { query, features: JSON.parse(JSON.stringify(data)) };
            setLayers([...layers, layer]);
            setSelectedLayerIndex(layers.length);
        } catch (error) {
            setError(`Unable to fetch data: ${error.message}`);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            const layer = { query: file.name, features: JSON.parse(JSON.stringify(data.features || [data])) };
            setLayers([...layers, layer]);
            setSelectedLayerIndex(layers.length);
        };
        reader.readAsText(file);
    };

    const handleQuerySubmit = (e) => {
        e.preventDefault();
        if (query) fetchLayerData(query);
    };

    return (
        <form onSubmit={handleQuerySubmit}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField fullWidth label="Enter Query" variant="outlined" value={query} onChange={(e) => setQuery(e.target.value)} />
                </Grid>
                <Grid item xs={2}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
                <Grid item xs={2}>
                    <input type="file" accept=".geojson,.json" onChange={handleFileUpload} style={{ display: 'none' }} id="upload-file" />
                    <label htmlFor="upload-file">
                        <Button variant="contained" color="secondary" component="span" fullWidth>Upload GeoJSON</Button>
                    </label>
                </Grid>
            </Grid>
        </form>
    );
};

export default QueryForm;
