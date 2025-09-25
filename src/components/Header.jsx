
import {Users,Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header = ({ isDarkMode, setIsDarkMode, setIsSignedIn }) => (
  <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-6">
        <div className="flex items-center">
          <div className={`${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} p-2 rounded-lg mr-3`}>
            <Users className={`w-6 h-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          </div>
          <Link to="/" className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Latte Dashboard</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} font-medium`}>
            Dashboard
          </Link>
          <Link to="/records" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} font-medium`}>
            Monthly Records
          </Link>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsSignedIn(false)}
            className={`px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} font-medium`}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Header