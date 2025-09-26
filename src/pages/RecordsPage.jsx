import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MonthlyRecords from '../components/records/MonthlyRecords.jsx';
import YearlyRecords from '../components/records/YearlyRecords.jsx';

const RecordsPage = ({ isDarkMode, employees }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg mb-4 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-white hover:bg-gray-100 text-gray-800'
            } transition-colors shadow`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Payroll Records
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'monthly'
                ? 'bg-indigo-600 text-white'
                : isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Monthly Records
          </button>
          <button
            onClick={() => setActiveTab('yearly')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'yearly'
                ? 'bg-indigo-600 text-white'
                : isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Yearly Summary
          </button>
        </div>

        {/* Content */}
        {activeTab === 'monthly' && (
          <MonthlyRecords isDarkMode={isDarkMode} employees={employees} />
        )}
        {activeTab === 'yearly' && (
          <YearlyRecords isDarkMode={isDarkMode} employees={employees} />
        )}
      </div>
    </div>
  );
};

export default RecordsPage;