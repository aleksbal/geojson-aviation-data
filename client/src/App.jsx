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
      {/* Full viewport height container with fixed layout */}
      <div className="flex flex-col h-screen overflow-hidden">

        {/* QueryForm - Fixed height, non-sticky */}
        <div className="p-0 bg-gray-100 z-10 h-[3rem]"> {/* Set fixed height for QueryForm */}
          <QueryForm />
        </div>

        {/* Tabs - Fixed height, directly below QueryForm */}
        <div className="bg-white shadow z-10 h-[2.5rem]"> {/* Set fixed height for Tabs */}
          <Tabs />
        </div>

        {/* Split pane layout that fills remaining height without bouncing */}
        <div className="flex-grow h-full overflow-hidden"> {/* Flex-grow to take up remaining space */}
          <Split
            className="flex h-full overflow-hidden"
            sizes={[15, 65, 20]}
            minSize={150}
            gutterSize={4}
            direction="horizontal"
            gutterAlign="center"
            cursor="col-resize"
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



