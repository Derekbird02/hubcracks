import React, { useState } from 'react';
import { data } from './data';

const Table = ({ openModal }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
  
    // Constants for pagination
    const entriesPerPage = 5;
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  
    // Filtered and paginated data based on search term and current page
    const filteredData = data.filter(asset =>
      asset.assetId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  
    // Function to handle pagination click
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
    // Function to handle search term change
    const handleSearchChange = event => {
      setCurrentPage(1); // Reset to first page when searching
      setSearchTerm(event.target.value);
    };
  
    // Calculate the number of empty rows needed to maintain table height
    const emptyRowCount = entriesPerPage - currentEntries.length;
    const emptyRows = Array.from({ length: emptyRowCount }, (_, index) => (
      <tr key={`empty-${index}`} className="h-14">
        <td className="px-6 py-4">&nbsp;</td>
        <td className="px-6 py-4">&nbsp;</td>
        <td className="px-6 py-4">&nbsp;</td>
      </tr>
    ));
  
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Search bar */}

        <div className="mb-5">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                </div>
                <input 
                type="search" 
                id="default-search" 
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search by Asset ID..."
                value={searchTerm}
                onChange={handleSearchChange}
                required 
                />

            </div>
        </div>
       
  
        {/* Table */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Asset ID</th>
              <th scope="col" className="px-6 py-3">State</th>
              <th scope="col" className="px-6 py-3"><span>Toggle</span></th>
            </tr>
          </thead>
  
          <tbody>
            {currentEntries.map((asset, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {asset.assetId}
                </td>
                <td className="px-6 py-4">{asset.active ? 'Enabled' : 'Disabled'}</td>
                <td className="px-6 py-4 text-right">
                {/* MODAL TRIGGER */}
                <button 
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => openModal(asset.assetId)}
                >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                </button>
              </td>
              </tr>
            ))}
  
            {/* Empty rows to maintain table height */}
            {emptyRows}
  
          </tbody>
        </table>
  
        {/* Pagination */}
        {filteredData.length > entriesPerPage && (
                <div className="mt-4 px-6 py-3 flex items-center justify-between bg-white dark:bg-gray-800 dark:border-gray-700 sm:px-6">
                    {/* Previous page button */}
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <span className="sr-only">Previous</span>
                        {/* Heroicon name: solid/chevron-left */}
                        <svg className="w-6 h-6 text-gray-800 dark:text-white transform rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M3 4a1 1 0 0 0-.822 1.57L6.632 12l-4.454 6.43A1 1 0 0 0 3 20h13.153a1 1 0 0 0 .822-.43l4.847-7a1 1 0 0 0 0-1.14l-4.847-7a1 1 0 0 0-.822-.43H3Z" clipRule="evenodd"/>
                        </svg>
                    </button>

                    {/* Page info */}
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                        Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredData.length)} of {filteredData.length} results
                    </p>

                    {/* Next page button */}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastEntry >= filteredData.length}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <span className="sr-only">Next</span>
                        {/* Heroicon name: solid/chevron-right */}
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M3 4a1 1 0 0 0-.822 1.57L6.632 12l-4.454 6.43A1 1 0 0 0 3 20h13.153a1 1 0 0 0 .822-.43l4.847-7a1 1 0 0 0 0-1.14l-4.847-7a1 1 0 0 0-.822-.43H3Z" clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>
            )}
      </div>
    );
  };

export default Table;