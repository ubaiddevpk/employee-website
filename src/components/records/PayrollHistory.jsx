import React from "react";

const PayrollHistory = ({ isDarkMode, history = [] }) => {
  if (!history.length) {
    return (
      <div className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-center py-8`}>
        <div className="text-lg font-medium mb-2">No payroll history available</div>
        <div className="text-sm">Historical payroll data will appear here once available.</div>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Payroll History
      </h3>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <thead className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} uppercase border-b`}>
                Month/Year
              </th>
              <th className={`px-4 py-3 text-right text-xs font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} uppercase border-b`}>
                Gross Salary
              </th>
              <th className={`px-4 py-3 text-right text-xs font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} uppercase border-b`}>
                Advance Taken
              </th>
              <th className={`px-4 py-3 text-right text-xs font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} uppercase border-b`}>
                Loan Taken
              </th>
              <th className={`px-4 py-3 text-right text-xs font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} uppercase border-b`}>
                Advance Deducted
              </th>
              <th className={`px-4 py-3 text-right text-xs font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} uppercase border-b`}>
                Loan Deducted
              </th>
              <th className={`px-4 py-3 text-right text-xs font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} uppercase border-b`}>
                Remaining Advance
              </th>
              <th className={`px-4 py-3 text-right text-xs font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} uppercase border-b`}>
                Remaining Loan
              </th>
              <th className={`px-4 py-3 text-right text-xs font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"} uppercase border-b`}>
                Net Salary
              </th>
            </tr>
          </thead>
          <tbody className={`${isDarkMode ? "divide-gray-700" : "divide-gray-200"} divide-y`}>
            {history.map((h, idx) => (
              <tr key={idx} className={`${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                <td className={`px-4 py-3 font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {h.month}
                </td>
                <td className={`px-4 py-3 text-right font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  AED {Number(h.gross || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-right text-orange-600 font-medium">
                  AED {Number(h.totalAdvanceTaken || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-right text-purple-600 font-medium">
                  AED {Number(h.totalLoanTaken || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-right text-red-600 font-medium">
                  AED {Number(h.totalAdvanceDeducted || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-right text-red-600 font-medium">
                  AED {Number(h.totalLoanDeducted || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-right text-orange-500 font-medium">
                  AED {Number(h.remainingAdvance || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-right text-purple-500 font-medium">
                  AED {Number(h.remainingLoan || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-right text-indigo-600 font-bold">
                  AED {Number(h.net || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {history.map((h, idx) => (
          <div key={idx} className={`${isDarkMode ? "bg-gray-700" : "bg-gray-50"} rounded-lg p-4`}>
            <div className="mb-3">
              <h4 className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {h.month}
              </h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Gross Salary:</span>
                <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  AED {Number(h.gross || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className={`block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Advance Taken:</span>
                  <span className="font-medium text-orange-600">
                    AED {Number(h.totalAdvanceTaken || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className={`block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Loan Taken:</span>
                  <span className="font-medium text-purple-600">
                    AED {Number(h.totalLoanTaken || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className={`block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Advance Deducted:</span>
                  <span className="font-medium text-red-600">
                    AED {Number(h.totalAdvanceDeducted || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className={`block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Loan Deducted:</span>
                  <span className="font-medium text-red-600">
                    AED {Number(h.totalLoanDeducted || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className={`block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Remaining Advance:</span>
                  <span className="font-medium text-orange-500">
                    AED {Number(h.remainingAdvance || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className={`block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Remaining Loan:</span>
                  <span className="font-medium text-purple-500">
                    AED {Number(h.remainingLoan || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              
              <div className={`flex justify-between pt-3 border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
                <span className="font-semibold">Net Salary:</span>
                <span className="font-bold text-indigo-600 text-lg">
                  AED {Number(h.net || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayrollHistory;