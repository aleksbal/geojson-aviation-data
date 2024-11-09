// src/App.js
import React from 'react';
import Split from 'react-split';
import { MapProvider } from './context/MapContext';
import MapComponent from './components/Map';
import FeatureList from './components/FeatureList';
import FeatureComponent from './components/Feature';
import QueryForm from './components/QueryForm';
import Tabs from './components/Tabs';

const App = () => {
  return (
    <MapProvider>
      {/* Top section with QueryForm */}
      <div className="p-4 bg-gray-100">
        <QueryForm />
      </div>
      <Tabs />

      {/* Split pane layout with Tailwind styling */}
      <Split
        className="flex h-[calc(100vh-4rem)]" // Adjust height to fill screen minus QueryForm's height
        sizes={[15, 65, 20]}
        minSize={150}
        gutterSize={8} // Width of the gutter between panes
        direction="horizontal"
        gutterAlign="center"
        cursor="col-resize" // Use col-resize cursor for horizontal resizing
      >
        <div className="overflow-y-auto flex flex-col h-full bg-gray-50">
          <FeatureList />
        </div>
        <div className="overflow-hidden flex flex-col h-full bg-white">
          <MapComponent />
        </div>
        <div className="overflow-y-auto flex flex-col h-full bg-gray-50">
          <FeatureComponent />
        </div>
      </Split>
    </MapProvider>
  );
};

export default App;

