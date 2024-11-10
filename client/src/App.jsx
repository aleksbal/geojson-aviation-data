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
      <div className="p-4 bg-gray-100 sticky top-0 z-10">
        <QueryForm />
      </div>

      {/* Tabs section, fixed between QueryForm and Split */}
      <div className="bg-white shadow sticky top-[4rem] z-10"> {/* Adjusts based on QueryForm height */}
        <Tabs />
      </div>

      {/* Split pane layout with Tailwind styling */}
      <Split
        className="flex h-[calc(100vh-8rem)] overflow-hidden" // Adjust height to account for QueryForm and Tabs
        sizes={[15, 65, 20]}
        minSize={150}
        gutterSize={4} // Width of the gutter between panes
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

