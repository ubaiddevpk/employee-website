import { useState } from "react";
import { Moon, Sun ,Users} from 'lucide-react';


const SignInPage = ({ isDarkMode, setIsDarkMode, setIsSignedIn }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSignIn = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      setIsSignedIn(true);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} flex items-center justify-center p-4`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-gray-600 hover:bg-gray-100'} transition-colors`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 w-full max-w-md`}>
        <div className="text-center mb-8">
          <div className={`${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Users className={`w-8 h-8 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          </div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Latte Dashboard</h1>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Employee Management System</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email Address</label>
            <input
              type="email"
              className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Password</label>
            <input
              type="password"
              className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none`}
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignInPage