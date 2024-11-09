// src/components/QueryForm.js
import React, { useState } from 'react';
import { useMapContext } from '../context/MapContext';

const QueryForm = () => {
  const [query, setQuery] = useState('');
  const { setLayers, setSelectedLayerId } = useMapContext();

  const fetchLayerData = async (query) => {
    try {
      const response = await fetch(query);
      if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);

      const data = await response.json();
      const newLayer = { id: Date.now(), query, features: data.features };

      setLayers((prevLayers) => [...prevLayers, newLayer]);
      setSelectedLayerId(newLayer.id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const newLayer = { id: Date.now(), query: file.name, features: data.features };

        setLayers((prevLayers) => [...prevLayers, newLayer]);
        setSelectedLayerId(newLayer.id);
      } catch (error) {
        console.error("Error parsing file:", error);
      }
    };
    reader.readAsText(file);
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
