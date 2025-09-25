import React, { useMemo, useState } from 'react';
import { monthlyPayrollRecord } from '../../utils/calculations';

const MonthlyRecords = ({ isDarkMode, employees }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const rows = useMemo(() => {
    return employees.map(e => monthlyPayrollRecord(e, year, month));
  }, [employees, year, month]);

  const totals = rows.reduce((acc, r) => ({
    gross: acc.gross + r.gross,
    advance: acc.advance + r.totalAdvance,
    loan: acc.loan + r.totalLoanDeduction,
    net: acc.net + r.net,
  }), { gross: 0, advance: 0, loan: 0, net: 0 });

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
      <div className="flex gap-3 items-center mb-4">
        <select className={`px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300' } rounded`} value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {Array.from({ length: 6 }).map((_, i) => {
            const y = now.getFullYear() - 3 + i;
            return <option key={y} value={y}>{y}</option>;
          })}
        </select>
        <select className={`px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300' } rounded`} value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }).map((_, m) => (
            <option key={m} value={m}>{new Date(2000, m, 1).toLocaleString(undefined, { month: 'long' })}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className={`${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
            <tr>
              <th className="px-3 py-2 border text-left">Employee</th>
              <th className="px-3 py-2 border text-left">Gross</th>
              <th className="px-3 py-2 border text-left">Advances</th>
              <th className="px-3 py-2 border text-left">Loan Deductions</th>
              <th className="px-3 py-2 border text-left">Net</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.employeeId}>
                <td className="px-3 py-2 border">{r.employeeName}</td>
                <td className="px-3 py-2 border">PKR {r.gross.toLocaleString()}</td>
                <td className="px-3 py-2 border">PKR {r.totalAdvance.toLocaleString()}</td>
                <td className="px-3 py-2 border">PKR {r.totalLoanDeduction.toLocaleString()}</td>
                <td className="px-3 py-2 border">PKR {r.net.toLocaleString()}</td>
              </tr>
            ))}
            <tr>
              <td className="px-3 py-2 border font-semibold">Totals</td>
              <td className="px-3 py-2 border font-semibold">PKR {totals.gross.toLocaleString()}</td>
              <td className="px-3 py-2 border font-semibold">PKR {totals.advance.toLocaleString()}</td>
              <td className="px-3 py-2 border font-semibold">PKR {totals.loan.toLocaleString()}</td>
              <td className="px-3 py-2 border font-semibold">PKR {totals.net.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyRecords;


