import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      sendFileToBackend(file);
    }
  };

  const sendFileToBackend = async (file) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', file);

      // Update the URL to match your backend endpoint
      const apiUrl = 'http://localhost:5000/classify'; // Change this URL accordingly

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Backend Response:', response.data);
    } catch (error) {
      console.error('Error sending file to backend:', error);
      setError('An error occurred while processing the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Classifier</h1>
        <input type="file" onChange={handleFileChange} />
        {loading && <p>Uploading and processing file...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
