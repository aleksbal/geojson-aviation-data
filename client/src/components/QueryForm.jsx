// src/components/QueryForm.js
import React, { useState } from 'react';
import { useMapContext } from '../context/MapContext';
import ArrowUpTrayIcon from '@heroicons/react/24/outline/ArrowUpTrayIcon';

const QueryForm = () => {
  const [query, setQuery] = useState('');
  const { setLayers, setSelectedLayerId } = useMapContext();

  const fetchLayerData = async (query) => {
    try {
      const response = await fetch(query);
      if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
      const data = await response.json();
      const features = (data.features || [data]).map((feature, index) => {
        if (!feature.properties) feature.properties = {};
        if (!feature.properties.id) feature.properties.id = Date.now() + index;
        return feature;
      });

      const newLayer = { id: Date.now(), label: query, features };
      setLayers((prevLayers) => [...prevLayers, newLayer]);
      setSelectedLayerId(newLayer.id);
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
        const features = (data.features || [data]).map((feature, index) => {
          if (!feature.properties) feature.properties = {};
          if (!feature.properties.id) feature.properties.id = Date.now() + index;
          return feature;
        });

        const newLayer = { id: Date.now(), label: uploadedFile.name, features };
        setLayers((prevLayers) => [...prevLayers, newLayer]);
        setSelectedLayerId(newLayer.id);
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

  return (
    <form
      onSubmit={handleQuerySubmit}
      className="flex gap-4 w-full h-full bg-white p-1 border-b border-gray-200" // Changed background, padding, and added border
    >
      <input
        type="text"
        placeholder="Enter Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded text-gray-700" // Removed gray background on input
      />

      <button
        type="submit"
        className="bg-gray-400 text-white rounded px-4 py-1 hover:bg-gray-500" // Reduced padding on button for lower height
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
        <span className="flex items-center justify-center bg-gray-400 text-white rounded-full p-2 cursor-pointer hover:bg-gray-500">
          <ArrowUpTrayIcon className="h-5 w-5 text-white" />
        </span>
      </label>
    </form>
  );
};

export default QueryForm;

