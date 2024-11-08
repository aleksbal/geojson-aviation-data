import React from 'react';
import { Typography } from '@mui/material';

const Footer = () => (
    <footer style={{ padding: '10px', backgroundColor: '#f8f8f8', textAlign: 'center', position: 'fixed', left: 0, right: 0, bottom: 0 }}>
        <Typography variant="body2" color="textSecondary">
            © 2024 GeoJSON Viewer. All rights reserved.
        </Typography>
    </footer>
);

export default Footer;
