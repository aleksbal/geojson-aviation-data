// src/components/Feature.jsx
import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';

const Feature = ({ feature }) => {
    if (!feature) {
        return <Typography variant="body2">Select a feature to view details</Typography>;
    }

    return (
        <Box style={{ padding: '10px', maxHeight: '70vh', overflowY: 'auto' }}>
            <Typography variant="h6">Feature Details</Typography>
            <TableContainer>
                <Table size="small" aria-label="feature properties table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Value</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(feature.properties).map(([key, value], index) => (
                            <TableRow
                                key={key}
                                style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}
                            >
                                <TableCell component="th" scope="row">{key}</TableCell>
                                <TableCell>{String(value)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Feature;

