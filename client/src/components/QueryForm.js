// src/components/QueryForm.js
import React, { useState } from 'react';
import { useMapContext } from '../context/MapContext';

const QueryForm = () => {
  const [query, setQuery] = useState('');
  const [file, setFile] = useState('');
  const { setLayers, setSelectedLayerId } = useMapContext();

  // Helper function to create a layer from data and add it to the context
  const createLayerFromData = (data, label) => {
    // Ensure each feature has a unique id
    const features = (data.features || [data]).map((feature, index) => {
      if (!feature.properties) feature.properties = {};
      if (!feature.properties.id) feature.properties.id = Date.now() + index; // Assign unique ID
      return feature;
    });

    const newLayer = { id: Date.now(), label, features }; // Use label for layer naming
    setLayers((prevLayers) => [...prevLayers, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  // Fetch data using API and create a new layer
  const fetchLayerData = async (query) => {
    try {
      const response = await fetch(query);
      if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
      const data = await response.json();
      createLayerFromData(data, query); // Use `query` as the label
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle file upload and create a new layer
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile.name); // Set the file name for layer labeling

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        createLayerFromData(data, uploadedFile.name); // Use file name as the label
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
    <form onSubmit={handleQuerySubmit} className="flex gap-4 w-full">
      <input
        type="text"
        placeholder="Enter Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
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
        <span className="bg-green-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-green-600">
          Upload a File
        </span>
      </label>
    </form>
  );
};

export default QueryForm;
