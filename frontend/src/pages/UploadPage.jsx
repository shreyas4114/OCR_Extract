import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setResponse(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setResponse({ error: 'Please select a file to upload.' });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', 'test_user');

    try {
      const res = await axios.post('https://ocr-extract-h1qh.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Upload error:', error.response);
      setResponse({
        error: error.response?.data?.error || 'An error occurred during upload'
      });
    } finally {
      setLoading(false);
    }
  };

  const renderSimpleResponse = () => {
    if (!response) return null;

    return (
      <div className="mt-6 p-4 border border-purple-300 rounded-lg bg-white shadow-md">
        {response.message && (
          <p className="text-gray-700">
            <strong>Message:</strong> {response.message}
          </p>
        )}
        {response.data && (
          <div className="mt-2">
            <h3 className="text-lg font-semibold text-purple-600">Extracted Data:</h3>
            {Object.entries(response.data).map(([key, value]) => (
              <p key={key} className="text-gray-800">
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        )}
        {response.error && (
          <p className="text-red-600 mt-2">
            <strong>Error:</strong> {response.error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="px-4 py-10 max-w-3xl mx-auto">
      <h2 className="text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-8">
        Upload Your Document
      </h2>

      <form onSubmit={handleUpload}>
        <div
          className={`flex flex-col items-center justify-center w-full h-48 p-6 border-2 ${dragOver ? 'border-purple-700 bg-purple-50' : 'border-dashed border-purple-300'
            } rounded-xl transition-colors cursor-pointer`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="text-center cursor-pointer">
            {file ? (
              <div className="text-center">
                <p className="text-lg font-medium text-purple-700">{file.name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {(file.size / (1024 * 1024) > 1
                    ? (file.size / (1024 * 1024)).toFixed(2) + ' MB'
                    : (file.size / 1024).toFixed(1) + ' KB')}
                </p>
              </div>
            ) : (
              <>
                <p className="text-lg text-gray-600">Drag & drop or click to select a file</p>
                <p className="text-sm text-gray-400 mt-1">Accepted: PNG, JPG, JPEG</p>
              </>
            )}
          </label>

        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            disabled={!file || loading}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition duration-300 ${loading || !file
                ? 'bg-purple-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90'
              }`}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>

      {renderSimpleResponse()}
    </div>
  );
};

export default UploadPage;
