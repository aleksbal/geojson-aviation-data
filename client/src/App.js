// src/App.js
import React from 'react';
import Split from 'react-split';
import { MapProvider } from './context/MapContext';
import MapComponent from './components/Map';
import FeatureList from './components/FeatureList';
import FeatureComponent from './components/Feature';
import QueryForm from './components/QueryForm';

const App = () => {
  return (
    <MapProvider>
      {/* Tailwind classes for QueryForm styling */}
      <div className="p-4 bg-gray-100">
        <QueryForm />
      </div>

      {/* Split pane layout with Tailwind styling */}
      <Split
        className="flex h-[calc(100vh-4rem)]" // Adjust height to fill the screen minus QueryForm's height
        sizes={[25, 50, 25]}
        minSize={150}
        direction="horizontal"
      >
        <div className="overflow-y-auto flex flex-col h-full">
          <FeatureList />
        </div>
        <div className="overflow-y-auto flex flex-col h-full">
          <MapComponent />
        </div>
        <div className="overflow-y-auto flex flex-col h-full">
          <FeatureComponent />
        </div>
      </Split>
    </MapProvider>
  );
};

export default App;


