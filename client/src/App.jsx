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
      <div className="flex flex-col h-screen"> {/* Full screen height for App container */}

        {/* Top section with QueryForm */}
        <div className="p-0 bg-gray-100 sticky top-0 z-10">
          <QueryForm />
        </div>

        {/* Tabs section, positioned below QueryForm */}
        <div className="bg-white shadow sticky top-[3rem] z-10">
          <Tabs />
        </div>

        {/* Split pane layout that fills remaining height */}
        <div className="flex-grow h-full">
          <Split
            className="flex h-full overflow-hidden" // Full height within available space
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
        </div>
      </div>
    </MapProvider>
  );
};

export default App;


