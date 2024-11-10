// src/components/QueryForm.js
import React, { useState, useEffect } from 'react';
import { useMapContext } from '../context/MapContext';
import ArrowUpTrayIcon from '@heroicons/react/24/outline/ArrowUpTrayIcon';

const QueryForm = () => {
  const [query, setQuery] = useState('');
  const { setLayers, setSelectedLayerId } = useMapContext();

  // Function to add a new layer to the map context
  const addNewLayer = (data, label) => {
    const features = (data.features || [data]).map((feature, index) => {
      if (!feature.properties) feature.properties = {};
      if (!feature.properties.id) feature.properties.id = Date.now() + index;
      return feature;
    });

    const newLayer = { id: Date.now(), label, features };
    setLayers((prevLayers) => [...prevLayers, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  const fetchLayerData = async (query) => {
    try {
      const response = await fetch(query);
      if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
      const data = await response.json();
      addNewLayer(data, query);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        addNewLayer(data, uploadedFile.name);
      } catch (error) {
        console.error("Error parsing file:", error);
      }
    };
    reader.readAsText(uploadedFile);
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (query) fetchLayerData(query);
  };

  // Paste handler for Ctrl+V paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text'); // Get the pasted text
    console.log("Raw pasted data:", pasteData); // Log the raw pasted content

    try {
      const parsedData = JSON.parse(pasteData); // Try parsing the JSON
      console.log("Parsed data:", parsedData); // Log the parsed data for verification

      // Basic GeoJSON validation
      if (parsedData.type && (parsedData.type === 'FeatureCollection' || parsedData.type === 'Feature')) {
        addNewLayer(parsedData, 'Pasted Layer');
        console.log("GeoJSON content pasted and added as a new layer.");
      } else {
        console.warn("Pasted content is not valid GeoJSON.");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error); // Log the detailed error message
    }
  };


  // Attach paste event listener on component mount
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste); // Cleanup on unmount
  }, []);

  return (
    <form onSubmit={handleQuerySubmit} className="flex gap-4 w-full bg-white p-1 border-b border-gray-200">
      <input
        type="text"
        placeholder="Enter Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow p-1 border border-gray-300 rounded text-gray-700"
      />

      <button
        type="submit"
        className="bg-gray-400 text-white rounded px-3 py-1 hover:bg-gray-500"
      >
        Submit
      </button>

      <input
        type="file"
        accept=".geojson,.json"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="upload-file"
      />
      <label htmlFor="upload-file">
        <span className="flex items-center justify-center bg-gray-400 text-white rounded-full p-1 cursor-pointer hover:bg-gray-500">
          <ArrowUpTrayIcon className="h-5 w-5 text-white" />
        </span>
      </label>
    </form>
  );
};

export default QueryForm;
