# GeoJSON Backend Application

This project demonstrates a web-based application and (headless) service for displaying and interacting with GeoJSON data on a Leaflet map. The app allows users to query data from the API, upload files, or paste GeoJSON data directly into the application, creating dynamic map layers with full control over layout and interactions.

## Backend Features

The backend headless server's aim is to demonstrates simple microservice architecture for an aeronautical information system serving GeoJSON encoded aueronautical data. It is based on MongoDB/SpringBoot solution stack. The RESTful API provides access to several types of data such as NOTAMs, airports, flightplans, NAVAIDs etc. encoded in GeoJSON.

Currently only several test NOTAMs have correct JSON geometries. 

Once the application is up and running locally the Swagger API description will be available at http://localhost:9091/swagger-ui/

NOTAM geospatial example can be queried for testing using this URL:
http://localhost:9091/notamsarea?lon=-2.181943&lat=47.943889&d=1

## GUI Features

- **Layer Management**: Add layers via API query, file upload, or clipboard paste. Each layer displays as a tab for easy selection and deletion.
- **Map and Data Display**: Utilizes Leaflet to display map features, including Points, Lines, and other GeoJSON geometry types.
- **Customizable Layout**: Built with React, `react-split` for resizable panels, and Tailwind CSS for styling, providing a flexible, responsive user interface.
- **Enhanced User Interactions**: Features include dynamic resizing, scroll-free navigation, and a visually stable (non-bouncing) layout.

## Installation

### Prerequisites

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/geojson-map-app.git
   cd geojson-map-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```

4. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

## Components Overview

### `App`

The main layout component containing:

- **QueryForm**: A form for querying data via API URL input or file upload.
- **Tabs**: Displays each layer as a tab with options to select and delete layers.
- **Map Split View**: Contains `FeatureList`, `MapComponent`, and `FeatureComponent` in a resizable, responsive layout.

### `QueryForm`

This component provides multiple ways to add GeoJSON data to the map:
- **API Query**: Enter an API endpoint that returns GeoJSON, and submit to add a new layer.
- **File Upload**: Upload `.geojson` or `.json` files directly from your computer.
- **Paste GeoJSON**: Paste valid GeoJSON data directly (Ctrl+V) to add as a new layer.

> **Note**: The app automatically validates and formats GeoJSON data before adding it as a layer.

### `Tabs`

The tabs provide easy layer management:
- Each layer is displayed as a tab, labeled either by API URL or file name.
- Click to select a layer and display its features on the map.
- Click the close button (`×`) to delete a layer.

### `MapComponent`

The main map display:
- Uses Leaflet to render GeoJSON data on an interactive map.
- Automatically fits the map view to the bounds of new data when it is added.
- Features a scale bar and clustering options for an optimized view of multiple layers.

### `FeatureList`

Displays a list of features for the selected layer:
- Highlights the selected feature.
- Scrolls to the selected feature when updated.
- Avoids overlapping the scrollbar for clear readability.

## Key UI/UX Details

- **Non-Bouncing Layout**: The app prevents bouncing effects with `overscroll-behavior: none` and static `h-screen` settings, ensuring a stable view.
- **Dynamic Resizing**: `react-split` provides responsive resizing between the `FeatureList`, `MapComponent`, and `FeatureComponent` panels.
- **Keyboard Shortcuts**:
  - **Ctrl+V**: Paste GeoJSON data to add as a new layer.

## Styling and Layout

The layout is styled with Tailwind CSS, featuring a fixed-height, flex-based layout. Key styling classes include:

- `sticky`, `top-0`, and `z-10` for header components to ensure consistent placement.
- `flex-grow` and `h-full` to control panel height and ensure components occupy all available space.
- `overflow-hidden` on the main container to prevent page scrolling and "bounce" effects.

## Troubleshooting

- **Error Parsing JSON**: Ensure pasted or uploaded JSON content is correctly formatted without extra commas or syntax errors.
- **Bounce Effect on Scroll**: If the page still bounces, check that `overscroll-behavior` and `overflow` settings are applied globally to `html` and `body` in your CSS.

## Future Enhancements

- **Enhanced GeoJSON Validation**: Additional validation options for complex nested structures.
- **Layer Sorting and Filtering**: Advanced options for managing and organizing multiple layers.
- **Additional Map Controls**: Zoom, fullscreen, and other interactive controls for improved map handling.

---

This application serves as a powerful tool for GeoJSON visualization and manipulation, providing a clean, responsive user interface with flexible layer management. Enjoy mapping!
