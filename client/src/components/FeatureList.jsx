import React, { useRef, useEffect } from 'react';
import { useMapContext } from '../context/MapContext';

const FeatureList = () => {
  const { layers, selectedLayerId, selectedFeatureId, setSelectedFeatureId } = useMapContext();

  const selectedLayer = layers.find(layer => layer.id === selectedLayerId);

  // Ref object to store references to each feature item
  const featureRefs = useRef({});

  // Scroll the selected item into view when `selectedFeatureId` changes
  useEffect(() => {
    if (selectedFeatureId && featureRefs.current[selectedFeatureId]) {
      featureRefs.current[selectedFeatureId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedFeatureId]);

  if (!selectedLayer) {
    return <p className="text-gray-500 font-light text-xs antialiased">No features available</p>;
  }

  const formatCoordinates = (coordinates) => {
    const findFirstCoordinate = (coords) => {
      if (Array.isArray(coords[0])) {
        return findFirstCoordinate(coords[0]); // Continue drilling down if it's an array
      }
      return coords; // Return the coordinate if it's not nested further
    };
    const firstCoordinate = findFirstCoordinate(coordinates);
    return `${JSON.stringify(firstCoordinate)}...`; // Format and add ellipsis for more data
  };

  return (
    <div className="p-4 overflow-y-auto h-full scroll-smooth pr-4"> {/* Add padding-right here */}
      <h3 className="text-md font-semibold mb-2 text-gray-700 antialiased">Feature List</h3>
      {selectedLayer.features.length > 0 ? (
        <ul className="list-none p-0 mb-0">
          {selectedLayer.features.map((feature) => (
            <li
              key={feature.properties?.id || feature.id}
              ref={(el) => (featureRefs.current[feature.properties?.id] = el)}
              className={`p-1 cursor-pointer rounded w-full overflow-hidden text-ellipsis pr-2 ${
                feature.properties?.id === selectedFeatureId ? 'bg-gray-300' : 'bg-white'
              } text-gray-600 font-light text-xs antialiased hover:bg-gray-200`}
              onClick={() => {
                if (feature.properties?.id !== selectedFeatureId) {
                  setSelectedFeatureId(feature.properties?.id);
                } else {
                  setSelectedFeatureId(null);
                }
                console.log("Selected Feature ID:", selectedFeatureId);
              }}
            >
              {/* Feature type */}
              {feature.properties?.type || 'Unknown Type'}

              {/* Feature geometry type and formatted coordinates */}
              <br />
              {feature.geometry?.type || 'Unknown Geometry Type'}:
              {feature.geometry?.coordinates
                ? formatCoordinates(feature.geometry.coordinates)
                : 'No coordinates available'}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 font-light text-xs antialiased">No features available in this layer</p>
      )}
    </div>
  );
};

export default FeatureList;

