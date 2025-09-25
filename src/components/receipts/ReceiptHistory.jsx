import React, { useState } from 'react';
import { Calendar, User, CreditCard, Download, Filter, Search, Eye, Trash2 } from 'lucide-react';

const ReceiptHistory = ({ 
  isDarkMode, 
  receipts = [], 
  employees = [],
  onDeleteReceipt,
  onViewReceipt,
  onPrintReceipt 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter receipts based on search criteria
  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = 
      receipt.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.receiptNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.notes?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || receipt.type === selectedType;
    
    const matchesEmployee = selectedEmployee === 'all' || receipt.employeeId === selectedEmployee;

    const receiptDate = new Date(receipt.date).toDateString();
    const matchesDateRange = 
      (!dateRange.start || new Date(receipt.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(receipt.date) <= new Date(dateRange.end));

    return matchesSearch && matchesType && matchesEmployee && matchesDateRange;
  });

  const getTotalsByType = () => {
    const totals = { salary: 0, advance: 0, loan: 0, custom: 0, count: 0 };
    filteredReceipts.forEach(receipt => {
      totals[receipt.type] += Number(receipt.total || 0);
      totals.count += 1;
    });
    return totals;
  };

  const handlePrint = (receipt) => {
    if (onPrintReceipt) {
      onPrintReceipt(receipt);
    } else {
      // Default print functionality
      const printWindow = window.open('', '_blank');
      const html = `
        <html>
          <head>
            <title>Receipt - ${receipt.receiptNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total { font-weight: bold; background-color: #f9f9f9; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Receipt #${receipt.receiptNumber}</h1>
              <p>Employee: ${receipt.employeeName} | Type: ${receipt.type}</p>
              <p>Date: ${new Date(receipt.date).toLocaleDateString()}</p>
            </div>
            <table>
              <thead>
                <tr><th>Description</th><th>Type</th><th>Amount (PKR)</th></tr>
              </thead>
              <tbody>
                ${receipt.items?.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.type}</td>
                    <td>${Number(item.amount).toLocaleString()}</td>
                  </tr>
                `).join('') || '<tr><td colspan="3">No items</td></tr>'}
                <tr class="total">
                  <td colspan="2">Total</td>
                  <td>PKR ${Number(receipt.total).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            ${receipt.notes ? `<p><strong>Notes:</strong> ${receipt.notes}</p>` : ''}
          </body>
        </html>
      `;
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const totals = getTotalsByType();

  const inputStyle = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
    isDarkMode
      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
  }`;

  if (receipts.length === 0) {
    return (
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
        <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <CreditCard className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className="text-lg font-medium mb-2">No receipts found</p>
          <p className="text-sm">Generated receipts will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
      {/* Header with Stats */}
      <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CreditCard className={`w-6 h-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-xl font-bold`}>
              Receipt History
            </h2>
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {totals.count} receipts found
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
            <div className="text-xs text-green-600 font-medium">Salary Receipts</div>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-800'}`}>
              PKR {totals.salary.toLocaleString()}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
            <div className="text-xs text-blue-600 font-medium">Advance Receipts</div>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
              PKR {totals.advance.toLocaleString()}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
            <div className="text-xs text-purple-600 font-medium">Loan Receipts</div>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-800'}`}>
              PKR {totals.loan.toLocaleString()}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-900/20 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="text-xs text-gray-600 font-medium">Custom Receipts</div>
            <div className={`text-lg font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-800'}`}>
              PKR {totals.custom.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Search
            </label>
            <div className="relative">
              <Search className={`absolute left-3 top-2.5 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search receipts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${inputStyle}`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={inputStyle}
            >
              <option value="all">All Types</option>
              <option value="salary">Salary</option>
              <option value="advance">Advance</option>
              <option value="loan">Loan</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Employee
            </label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className={inputStyle}
            >
              <option value="all">All Employees</option>
              {employees.map(emp => (
                <option key={emp.employeeId} value={emp.employeeId}>
                  {emp.name} ({emp.employeeId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-1">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className={`text-xs ${inputStyle}`}
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className={`text-xs ${inputStyle}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Receipts List */}
      <div className="p-6">
        {filteredReceipts.length === 0 ? (
          <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Filter className={`w-8 h-8 mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className="font-medium mb-1">No receipts match your filters</p>
            <p className="text-sm">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReceipts.map((receipt, index) => (
              <div
                key={receipt.id || index}
                className={`border rounded-lg p-4 ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-900/50 hover:bg-gray-900' 
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                } transition-colors`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className={`w-4 h-4 ${
                          receipt.type === 'salary' ? 'text-green-600' :
                          receipt.type === 'advance' ? 'text-blue-600' :
                          receipt.type === 'loan' ? 'text-purple-600' :
                          'text-gray-600'
                        }`} />
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          receipt.type === 'salary' 
                            ? 'bg-green-100 text-green-800' 
                            : receipt.type === 'advance'
                            ? 'bg-blue-100 text-blue-800'
                            : receipt.type === 'loan'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {receipt.type}
                        </span>
                      </div>
                      <span className={`text-sm font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {receipt.receiptNumber}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {receipt.employeeName}
                        </span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          ({receipt.employeeId})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {new Date(receipt.date).toLocaleDateString()}
                        </span>
                      </div>

                      <div className={`font-bold text-lg ${
                        Number(receipt.total) >= 0 ? 'text-indigo-600' : 'text-red-600'
                      }`}>
                        PKR {Math.abs(Number(receipt.total)).toLocaleString()}
                        {Number(receipt.total) < 0 && ' (Deduction)'}
                      </div>
                    </div>

                    {receipt.notes && (
                      <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <strong>Notes:</strong> {receipt.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewReceipt && onViewReceipt(receipt)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'text-indigo-400 hover:bg-indigo-900/20' 
                          : 'text-indigo-600 hover:bg-indigo-50'
                      }`}
                      title="View Receipt"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handlePrint(receipt)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'text-green-400 hover:bg-green-900/20' 
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      title="Print Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    {onDeleteReceipt && (
                      <button
                        onClick={() => onDeleteReceipt(receipt.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode 
                            ? 'text-red-400 hover:bg-red-900/20' 
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                        title="Delete Receipt"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptHistory;