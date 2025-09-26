import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

const EmployeeTable = ({ employees, onEdit, onDelete, onView, isDarkMode }) => {
  // Helper function to safely calculate totals from advances/loans arrays
  const getAdvancesDeduction = (advances = []) => {
    if (!Array.isArray(advances)) return 0;
    return advances.reduce((sum, adv) => {
      const deduction = Number(adv.deduction || 0);
      return sum + deduction;
    }, 0);
  };

  const getLoansDeduction = (loans = []) => {
    if (!Array.isArray(loans)) return 0;
    return loans.reduce((sum, loan) => {
      const deduction = Number(loan.deduction || 0);
      return sum + deduction;
    }, 0);
  };

  const getAdvancesTotal = (advances = []) => {
    if (!Array.isArray(advances)) return 0;
    return advances.reduce((sum, adv) => {
      const amount = Number(adv.originalAmount || adv.amount || 0);
      return sum + amount;
    }, 0);
  };

  const getLoansTotal = (loans = []) => {
    if (!Array.isArray(loans)) return 0;
    return loans.reduce((sum, loan) => {
      const amount = Number(loan.originalAmount || loan.amount || 0);
      return sum + amount;
    }, 0);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Name</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Emp ID</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Location</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Job Title</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Basic Salary</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Commission</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Overtime</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Advance Ded.</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Loan Ded.</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Net Salary</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>CNIC</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Joining Date</th>
              <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`${isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
            {employees.map((employee) => {
              const advanceDeductions = getAdvancesDeduction(employee.advances);
              const loanDeductions = getLoansDeduction(employee.loans);
              
              return (
                <tr 
                  key={employee.id} 
                  className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer`}
                  onClick={(e) => {
                    // Only trigger onView if we didn't click on a button
                    if (!e.target.closest('button') && onView) {
                      onView(employee);
                    }
                  }}
                >
                  <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {employee.name || 'N/A'}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {employee.employeeId || 'N/A'}
                  </td>
                  <td className={`px-4 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} max-w-xs truncate`}>
                    {employee.location || 'N/A'}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {employee.jobTitle || 'N/A'}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    PKR {Number(employee.basicSalary || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    PKR {Number(employee.commission || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    PKR {Number(employee.overtime || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                    PKR {advanceDeductions.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                    PKR {loanDeductions.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-indigo-600">
                    PKR {Number(employee.netSalary || 0).toLocaleString()}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {employee.cnic || 'N/A'}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(employee);
                        }}
                        className={`p-2 text-blue-600 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} rounded-full transition-colors`}
                        title="Edit Employee"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(employee.id);
                        }}
                        className={`p-2 text-red-600 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'} rounded-full transition-colors`}
                        title="Delete Employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden ">
        {employees.map((employee) => {
          const advanceDeductions = getAdvancesDeduction(employee.advances);
          const loanDeductions = getLoansDeduction(employee.loans);
          
          return (
            <div 
              key={employee.id} 
              className={`p-4  border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} last:border-b-0 cursor-pointer mb-3 m-4 border rounded-[20px]`} 
              onClick={(e) => {
                if (!e.target.closest('button') && onView) {
                  onView(employee);
                }
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {employee.name || 'N/A'}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {employee.employeeId || 'N/A'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(employee);
                    }}
                    className={`p-2 text-blue-600 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} rounded-full transition-colors`}
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(employee.id);
                    }}
                    className={`p-2 text-red-600 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'} rounded-full transition-colors`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-x-4">
                  <div>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Job Title:</span> 
                    <span className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {employee.jobTitle || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>CNIC:</span> 
                    <span className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {employee.cnic || 'N/A'}
                    </span>
                  </div>
                </div>
                <div>
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location:</span> 
                  <span className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {employee.location || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Joining Date:</span> 
                  <span className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                
                <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Basic:</span>
                      <span className={`ml-1 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        PKR {Number(employee.basicSalary || 0).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Commission:</span>
                      <span className="ml-1 font-medium text-green-600">
                        PKR {Number(employee.commission || 0).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Overtime:</span>
                      <span className="ml-1 font-medium text-blue-600">
                        PKR {Number(employee.overtime || 0).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Advance Ded.:</span>
                      <span className="ml-1 font-medium text-red-600">
                        PKR {advanceDeductions.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loan Ded.:</span>
                      <span className="ml-1 font-medium text-red-600">
                        PKR {loanDeductions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`mt-2 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-800'} font-medium`}>Net Salary:</span>
                      <span className="text-base font-bold text-indigo-600">
                        PKR {Number(employee.netSalary || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeTable;