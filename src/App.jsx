import React, { useState } from 'react';
import Navbar from './Navbar';
import Table from './Table';
import AssetModal from './AssetModal';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openModal = (assetId) => {
    setSelectedAssetId(assetId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssetId(null);
  };

    return (
      <div className={darkMode ? 'dark' : ''}>

      <Navbar className="mb-8" darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="mt-12 text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Hubcrack Dashboard
        </h1>
        <p className="text-center text-lg mb-12 text-gray-700 dark:text-gray-300">
          Enabled and disable hubcrack counters for GE related assets
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-cyan-500 text-xl font-bold">0</p>
            <p className="text-gray-600 dark:text-gray-400">Assets Enabled</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-purple-500 text-xl font-bold">11,759</p>
            <p className="text-gray-600 dark:text-gray-400">Total Assets</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-purple-600 text-xl font-bold">1236</p>
            <p className="text-gray-600 dark:text-gray-400">Total Sites</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-green-500 text-xl font-bold">0.10%</p>
            <p className="text-gray-600 dark:text-gray-400">Fleet Enabled</p>
          </div>
        </div>
        
        <div className="p-8 rounded-lg shadow-lg w-1/2 bg-white dark:bg-gray-800">
          <Table openModal={openModal}/>
        </div>

        {isModalOpen && (
        <AssetModal
          isOpen={isModalOpen}
          onClose={closeModal}
          assetId={selectedAssetId}
        />
      )}

      </div>
    </div>
    );
  
}

export default App
