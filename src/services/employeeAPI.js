// src/services/employeeAPI.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Employee API functions
export const employeeAPI = {
  // Get all employees
  getAllEmployees: async () => {
    return await apiRequest('/employees');
  },

  // Add new employee
  addEmployee: async (employeeData) => {
    return await apiRequest('/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData),
    });
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    return await apiRequest(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employeeData),
    });
  },

  // Delete employee
  deleteEmployee: async (id) => {
    return await apiRequest(`/employees/${id}`, {
      method: 'DELETE',
    });
  },

  // Get single employee (if you need this)
  getEmployee: async (id) => {
    return await apiRequest(`/employees/${id}`);
  },
};

// Auth API functions (you'll need these for login)
export const authAPI = {
  login: async (credentials) => {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData) => {
    return await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

export default employeeAPI;