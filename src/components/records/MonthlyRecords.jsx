import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Calendar, TrendingUp } from "lucide-react";
import { calculateMonthlyPayroll } from "../../utils/calculations";
const MonthlyRecords = ({ isDarkMode, employees }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [expandedRows, setExpandedRows] = useState({});

  const monthlyData = useMemo(() => {
    return employees.map((emp) => calculateMonthlyPayroll(emp, year, month));
  }, [employees, year, month]);

  const totals = monthlyData.reduce(
    (acc, record) => ({
      gross: acc.gross + record.gross,
      advanceDeductions: acc.advanceDeductions + record.advanceDeductions,
      loanDeductions: acc.loanDeductions + record.loanDeductions,
      totalDeductions: acc.totalDeductions + record.totalDeductions,
      net: acc.net + record.net,
    }),
    {
      gross: 0,
      advanceDeductions: 0,
      loanDeductions: 0,
      totalDeductions: 0,
      net: 0,
    }
  );

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg p-6`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Calendar
          className={`w-5 h-5 ${
            isDarkMode ? "text-indigo-400" : "text-indigo-600"
          }`}
        />
        <h2
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Monthly Payroll Records
        </h2>
      </div>

      {/* Date Selection */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300"
          }`}
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {Array.from({ length: 12 }).map((_, m) => (
            <option key={m} value={m}>
              {new Date(2000, m, 1).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>

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
                Employee
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } uppercase`}
              >
                Location
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
                Advances
              </th>
              <th
                className={`px-4 py-3 text-right text-xs font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } uppercase`}
              >
                Loans
              </th>
              <th
                className={`px-4 py-3 text-right text-xs font-semibold ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } uppercase`}
              >
                Total Deductions
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
            {monthlyData.map((record) => (
              <tr
                key={record.employeeId}
                className={`${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <td
                  className={`px-4 py-3 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } font-medium`}
                >
                  {record.employeeName}
                  <div
                    className={`text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {record.employeeId}
                  </div>
                </td>
                <td
                  className={`px-4 py-3 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {record.location}
                </td>
                <td
                  className={`px-4 py-3 text-right font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  AED {record.gross.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-red-600 font-medium">
                  AED {record.advanceDeductions.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-red-600 font-medium">
                  AED {record.loanDeductions.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-red-700 font-semibold">
                  AED {record.totalDeductions.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-indigo-600 font-bold">
                  AED {record.net.toLocaleString()}
                </td>
              </tr>
            ))}
            <tr
              className={`${
                isDarkMode ? "bg-gray-900" : "bg-gray-100"
              } font-bold`}
            >
              <td
                colSpan="2"
                className={`px-4 py-3 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                TOTALS
              </td>
              <td
                className={`px-4 py-3 text-right ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                AED {totals.gross.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right text-red-600">
                AED {totals.advanceDeductions.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right text-red-600">
                AED {totals.loanDeductions.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right text-red-700">
                AED {totals.totalDeductions.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right text-indigo-600">
                AED {totals.net.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {monthlyData.map((record) => (
          <div
            key={record.employeeId}
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            } rounded-lg p-4`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {record.employeeName}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {record.employeeId} • {record.location}
                </p>
              </div>
              <button
                onClick={() => toggleRow(record.employeeId)}
                className={`p-1 rounded ${
                  isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                }`}
              >
                {expandedRows[record.employeeId] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  Gross Salary:
                </span>
                <span
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  AED {record.gross.toLocaleString()}
                </span>
              </div>

              {expandedRows[record.employeeId] && (
                <>
                  <div className="flex justify-between">
                    <span
                      className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      Advance Deductions:
                    </span>
                    <span className="font-medium text-red-600">
                      AED {record.advanceDeductions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      Loan Deductions:
                    </span>
                    <span className="font-medium text-red-600">
                      AED {record.loanDeductions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      Total Deductions:
                    </span>
                    <span className="font-semibold text-red-700">
                      AED {record.totalDeductions.toLocaleString()}
                    </span>
                  </div>
                </>
              )}

              <div
                className={`flex justify-between pt-2 border-t ${
                  isDarkMode ? "border-gray-600" : "border-gray-300"
                }`}
              >
                <span className="font-semibold">Net Salary:</span>
                <span className="font-bold text-indigo-600">
                  AED {record.net.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Totals */}
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
            TOTALS
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Gross:</span>
              <span className="font-semibold">
                AED {totals.gross.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Deductions:</span>
              <span className="font-semibold text-red-600">
                AED {totals.totalDeductions.toLocaleString()}
              </span>
            </div>
            <div
              className={`flex justify-between pt-2 border-t ${
                isDarkMode ? "border-gray-700" : "border-gray-400"
              }`}
            >
              <span className="font-bold">Net:</span>
              <span className="font-bold text-indigo-600">
                AED {totals.net.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MonthlyRecords;
//
