import React from 'react';

const PayrollHistory = ({ isDarkMode, history = [] }) => {
  if (!history.length) {
    return <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No payroll history.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className={`${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
          <tr>
            <th className="px-3 py-2 border text-left">Month</th>
            <th className="px-3 py-2 border text-left">Gross</th>
            <th className="px-3 py-2 border text-left">Advances</th>
            <th className="px-3 py-2 border text-left">Loan Deductions</th>
            <th className="px-3 py-2 border text-left">Net</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, idx) => (
            <tr key={idx}>
              <td className="px-3 py-2 border">{h.month}</td>
              <td className="px-3 py-2 border">PKR {Number(h.gross || 0).toLocaleString()}</td>
              <td className="px-3 py-2 border">PKR {Number(h.totalAdvance || 0).toLocaleString()}</td>
              <td className="px-3 py-2 border">PKR {Number(h.totalLoanDeduction || 0).toLocaleString()}</td>
              <td className="px-3 py-2 border">PKR {Number(h.net || 0).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollHistory;


