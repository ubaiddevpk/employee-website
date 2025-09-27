import React, { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { calculateMonthlyPayroll } from "../../utils/calculations";

const YearlyRecords = ({ isDarkMode, employees }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());

const yearlyData = useMemo(() => {
  const monthlyTotals = Array.from({ length: 12 }).map((_, month) => {
    const monthData = employees.map((emp) =>
      calculateMonthlyPayroll(emp, year, month)
    );
    return monthData.reduce(
      (acc, record) => ({
        month: new Date(year, month).toLocaleString("default", {
          month: "short",
        }),
        gross: acc.gross + record.gross,
        deductions: acc.deductions + record.totalDeductions,
        totalAdvanceTaken: acc.totalAdvanceTaken + (record.totalAdvanceTaken || 0),
        totalLoanTaken: acc.totalLoanTaken + (record.totalLoanTaken || 0),
        remainingAdvances: acc.remainingAdvances + (record.remainingAdvance || 0),
        remainingLoans: acc.remainingLoans + (record.remainingLoan || 0),
        net: acc.net + record.net,
      }),
      { 
        gross: 0, 
        deductions: 0, 
        totalAdvanceTaken: 0,
        totalLoanTaken: 0,
        remainingAdvances: 0,
        remainingLoans: 0,
        net: 0 
      }
    );
  });

  return monthlyTotals;
}, [employees, year]);

  const yearlyTotals = yearlyData.reduce(
  (acc, month) => ({
    gross: acc.gross + month.gross,
    deductions: acc.deductions + month.deductions,
    totalAdvanceTaken: acc.totalAdvanceTaken + month.totalAdvanceTaken,
    totalLoanTaken: acc.totalLoanTaken + month.totalLoanTaken,
    remainingAdvances: acc.remainingAdvances + month.remainingAdvances,
    remainingLoans: acc.remainingLoans + month.remainingLoans,
    net: acc.net + month.net,
  }),
  { 
    gross: 0, 
    deductions: 0, 
    totalAdvanceTaken: 0,
    totalLoanTaken: 0,
    remainingAdvances: 0,
    remainingLoans: 0,
    net: 0 
  }
);

 return (
  <div
    className={`${
      isDarkMode ? "bg-gray-800" : "bg-white"
    } rounded-lg shadow-lg p-6`}
  >
    <div className="flex items-center gap-2 mb-6">
      <TrendingUp
        className={`w-5 h-5 ${
          isDarkMode ? "text-green-400" : "text-green-600"
        }`}
      />
      <h2
        className={`text-2xl font-bold ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Yearly Payroll Summary
      </h2>
    </div>

    {/* Year Selection */}
    <div className="mb-6">
      <select
        className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const y = now.getFullYear() - 3 + i;
          return (
            <option key={y} value={y}>
              {y}
            </option>
          );
        })}
      </select>
    </div>

    {/* Desktop Table */}
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full">
        <thead className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
          <tr>
            <th
              className={`px-4 py-3 text-left text-xs font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } uppercase`}
            >
              Month
            </th>
            <th
              className={`px-4 py-3 text-right text-xs font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } uppercase`}
            >
              Gross Salary
            </th>
            <th
              className={`px-4 py-3 text-right text-xs font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } uppercase`}
            >
              Total Advances
            </th>
            <th
              className={`px-4 py-3 text-right text-xs font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } uppercase`}
            >
              Total Loans
            </th>
            <th
              className={`px-4 py-3 text-right text-xs font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } uppercase`}
            >
              Remaining Advances
            </th>
            <th
              className={`px-4 py-3 text-right text-xs font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } uppercase`}
            >
              Remaining Loans
            </th>
            <th
              className={`px-4 py-3 text-right text-xs font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } uppercase`}
            >
              Deductions
            </th>
            <th
              className={`px-4 py-3 text-right text-xs font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } uppercase`}
            >
              Net Salary
            </th>
          </tr>
        </thead>
        <tbody
          className={`${
            isDarkMode ? "divide-gray-700" : "divide-gray-200"
          } divide-y`}
        >
          {yearlyData.map((monthData, idx) => (
            <tr
              key={idx}
              className={`${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
            >
              <td
                className={`px-4 py-3 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } font-medium`}
              >
                {monthData.month} {year}
              </td>
              <td
                className={`px-4 py-3 text-right font-medium ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                 {monthData.gross.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3 text-right text-orange-600 font-medium">
                 {(monthData.totalAdvanceTaken || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3 text-right text-purple-600 font-medium">
                 {(monthData.totalLoanTaken || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3 text-right text-orange-500 font-medium">
                 {(monthData.remainingAdvances || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3 text-right text-purple-500 font-medium">
                 {(monthData.remainingLoans || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3 text-right text-red-600 font-medium">
                 {monthData.deductions.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3 text-right text-indigo-600 font-bold">
                 {monthData.net.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
          <tr
            className={`${
              isDarkMode ? "bg-gray-900" : "bg-gray-100"
            } font-bold`}
          >
            <td
              className={`px-4 py-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              ANNUAL TOTALS
            </td>
            <td
              className={`px-4 py-3 text-right ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
               {yearlyTotals.gross.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-3 text-right text-orange-600">
               {yearlyTotals.totalAdvanceTaken.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-3 text-right text-purple-600">
               {yearlyTotals.totalLoanTaken.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-3 text-right text-orange-500">
               {yearlyTotals.remainingAdvances.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-3 text-right text-purple-500">
               {yearlyTotals.remainingLoans.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-3 text-right text-red-600">
               {yearlyTotals.deductions.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-3 text-right text-indigo-600">
               {yearlyTotals.net.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}
    <div className="md:hidden space-y-3">
      {yearlyData.map((monthData, idx) => (
        <div
          key={idx}
          className={`${
            isDarkMode ? "bg-gray-700" : "bg-gray-50"
          } rounded-lg p-4`}
        >
          <h3
            className={`font-semibold mb-3 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {monthData.month} {year}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                Gross:
              </span>
              <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                 {monthData.gross.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span>Advances:</span>
                <span className="font-medium text-orange-600">
                   {(monthData.totalAdvanceTaken || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Loans:</span>
                <span className="font-medium text-purple-600">
                   {(monthData.totalLoanTaken || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Rem. Adv.:</span>
                <span className="font-medium text-orange-500">
                   {(monthData.remainingAdvances || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Rem. Loan:</span>
                <span className="font-medium text-purple-500">
                   {(monthData.remainingLoans || 0).toLocaleString('en-AE', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Deductions:</span>
              <span className="font-medium text-red-600">
                 {monthData.deductions.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div
              className={`flex justify-between pt-2 border-t ${
                isDarkMode ? "border-gray-600" : "border-gray-300"
              }`}
            >
              <span className="font-semibold">Net:</span>
              <span className="font-bold text-indigo-600">
                 {monthData.net.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Mobile Annual Totals */}
      <div
        className={`${
          isDarkMode ? "bg-gray-900" : "bg-gray-200"
        } rounded-lg p-4`}
      >
        <h3
          className={`font-bold mb-3 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          ANNUAL TOTALS {year}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Gross:</span>
            <span className="font-semibold">
               {yearlyTotals.gross.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span>Total Advances:</span>
              <span className="font-semibold text-orange-600">
                 {yearlyTotals.totalAdvanceTaken.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Loans:</span>
              <span className="font-semibold text-purple-600">
                 {yearlyTotals.totalLoanTaken.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Rem. Advances:</span>
              <span className="font-semibold text-orange-500">
                 {yearlyTotals.remainingAdvances.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Rem. Loans:</span>
              <span className="font-semibold text-purple-500">
                 {yearlyTotals.remainingLoans.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Deductions:</span>
            <span className="font-semibold text-red-600">
               {yearlyTotals.deductions.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div
            className={`flex justify-between pt-2 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-400"
            }`}
          >
            <span className="font-bold">Net:</span>
            <span className="font-bold text-indigo-600">
               {yearlyTotals.net.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default YearlyRecords;
