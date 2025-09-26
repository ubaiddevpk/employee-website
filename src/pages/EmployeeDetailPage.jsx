import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  Download,
  Calendar,
  User,
  CreditCard,
  DollarSign,
} from "lucide-react";
import ReceiptModal from "../components/receipts/ReceiptModal.jsx"; // Import your existing ReceiptModal

const EmployeeDetailPage = ({ employees, isDarkMode, onSaveReceipt }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Find the employee by ID
  const employee = employees.find(
    (emp) => emp.id === id || emp.id === parseInt(id)
  );

  // If employee not found
  if (!employee) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        } p-4`}
      >
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-white hover:bg-gray-200 text-gray-700"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div
            className={`text-center p-8 rounded-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Employee Not Found
            </h2>
            <p
              className={`mt-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              The employee you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Helper functions to calculate totals
  const getAdvancesDeduction = (advances = []) => {
    if (!Array.isArray(advances)) return 0;
    return advances.reduce((sum, adv) => sum + Number(adv.deduction || 0), 0);
  };

  const getLoansDeduction = (loans = []) => {
    if (!Array.isArray(loans)) return 0;
    return loans.reduce((sum, loan) => sum + Number(loan.deduction || 0), 0);
  };

  const getAdvancesTotal = (advances = []) => {
    if (!Array.isArray(advances)) return 0;
    return advances.reduce(
      (sum, adv) => sum + Number(adv.originalAmount || adv.amount || 0),
      0
    );
  };

  const getLoansTotal = (loans = []) => {
    if (!Array.isArray(loans)) return 0;
    return loans.reduce(
      (sum, loan) => sum + Number(loan.originalAmount || loan.amount || 0),
      0
    );
  };

  const getRemainingAdvances = (advances = []) => {
    if (!Array.isArray(advances)) return 0;
    return advances.reduce(
      (sum, adv) => sum + Number(adv.remainingAmount || 0),
      0
    );
  };

  const getRemainingLoans = (loans = []) => {
    if (!Array.isArray(loans)) return 0;
    return loans.reduce(
      (sum, loan) => sum + Number(loan.remainingAmount || 0),
      0
    );
  };

  // Calculate current totals
  const basicSalary = Number(employee.basicSalary || 0);
  const commission = Number(employee.commission || 0);
  const overtime = Number(employee.overtime || 0);
  const totalEarnings = basicSalary + commission + overtime;
  const advanceDeductions = getAdvancesDeduction(employee.advances);
  const loanDeductions = getLoansDeduction(employee.loans);
  const totalDeductions = advanceDeductions + loanDeductions;
  const netSalary = totalEarnings - totalDeductions;

  const handlePrintReceipt = () => {
    const printWindow = window.open("", "_blank");
    const companyName = "Your Company Name";

    const html = `
      <html>
        <head>
          <title>Employee Details - ${employee.name}</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              margin: 0; 
              padding: 20px; 
              color: #333;
              background: #fff;
            }
            .header { 
              text-align: center; 
              border-bottom: 3px solid #4f46e5; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .company-name { 
              font-size: 28px; 
              font-weight: bold; 
              color: #4f46e5; 
              margin-bottom: 5px; 
            }
            .employee-name { 
              font-size: 24px; 
              color: #374151; 
              margin-bottom: 10px; 
            }
            .section { 
              margin-bottom: 25px; 
              page-break-inside: avoid;
            }
            .section-title { 
              font-size: 18px; 
              font-weight: bold; 
              color: #4f46e5; 
              margin-bottom: 15px; 
              border-bottom: 2px solid #e5e7eb; 
              padding-bottom: 5px; 
            }
            .grid-2 { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 15px; 
              margin-bottom: 15px;
            }
            .grid-3 { 
              display: grid; 
              grid-template-columns: 1fr 1fr 1fr; 
              gap: 15px; 
              margin-bottom: 15px;
            }
            .detail-item { 
              margin-bottom: 10px; 
            }
            .label { 
              font-weight: bold; 
              color: #6b7280; 
              font-size: 14px; 
            }
            .value { 
              color: #374151; 
              font-size: 15px; 
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 10px 0; 
            }
            th, td { 
              border: 1px solid #e5e7eb; 
              padding: 12px; 
              text-align: left; 
            }
            th { 
              background: #f9fafb; 
              font-weight: bold; 
              color: #374151; 
            }
            .amount { 
              text-align: right; 
              font-weight: 600; 
            }
            .positive { color: #059669; }
            .negative { color: #dc2626; }
            .total-section { 
              border-top: 2px solid #374151; 
              margin-top: 20px; 
              padding-top: 15px; 
              font-weight: bold; 
            }
            .footer { 
              margin-top: 40px; 
              text-align: center; 
              color: #6b7280; 
              font-size: 12px; 
              border-top: 1px solid #e5e7eb; 
              padding-top: 20px; 
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">${companyName}</div>
            <div class="employee-name">${employee.name} - ${
      employee.employeeId
    }</div>
            <div style="color: #6b7280;">Employee Details Report</div>
            <div style="color: #6b7280; font-size: 14px;">Generated on: ${new Date().toLocaleDateString()}</div>
          </div>
          
          <!-- Personal Information -->
          <div class="section">
            <div class="section-title">Personal Information</div>
            <div class="grid-3">
              <div class="detail-item">
                <div class="label">Employee ID</div>
                <div class="value">${employee.employeeId}</div>
              </div>
              <div class="detail-item">
                <div class="label">Full Name</div>
                <div class="value">${employee.name}</div>
              </div>
              <div class="detail-item">
                <div class="label">Job Title</div>
                <div class="value">${employee.jobTitle || "N/A"}</div>
              </div>
              <div class="detail-item">
                <div class="label">CNIC</div>
                <div class="value">${employee.cnic || "N/A"}</div>
              </div>
              <div class="detail-item">
                <div class="label">Location</div>
                <div class="value">${employee.location || "N/A"}</div>
              </div>
              <div class="detail-item">
                <div class="label">Joining Date</div>
                <div class="value">${
                  employee.joiningDate
                    ? new Date(employee.joiningDate).toLocaleDateString()
                    : "N/A"
                }</div>
              </div>
            </div>
          </div>
          
          <!-- Salary Information -->
          <div class="section">
            <div class="section-title">Salary Information</div>
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Amount (AED)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic Salary</td>
                  <td class="amount">${basicSalary.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Commission</td>
                  <td class="amount positive">+ ${commission.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Overtime Pay</td>
                  <td class="amount positive">+ ${overtime.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Advance Deductions</td>
                  <td class="amount negative">- ${advanceDeductions.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Loan Deductions</td>
                  <td class="amount negative">- ${loanDeductions.toLocaleString()}</td>
                </tr>
                <tr class="total-section">
                  <td>Net Salary</td>
                  <td class="amount ${
                    netSalary >= 0 ? "positive" : "negative"
                  }">
                    ${netSalary.toLocaleString()}
                    ${netSalary < 0 ? " (Deficit)" : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Advances Information -->
          ${
            employee.advances && employee.advances.length > 0
              ? `
          <div class="section">
            <div class="section-title">Advances (${
              employee.advances.length
            })</div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Original Amount</th>
                  <th>Deduction</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                ${employee.advances
                  .map(
                    (adv) => `
                  <tr>
                    <td>${adv.date || "N/A"}</td>
                    <td>${adv.reason || "N/A"}</td>
                    <td class="amount">${Number(
                      adv.originalAmount || 0
                    ).toLocaleString()}</td>
                    <td class="amount negative">- ${Number(
                      adv.deduction || 0
                    ).toLocaleString()}</td>
                    <td class="amount">${Number(
                      adv.remainingAmount || 0
                    ).toLocaleString()}</td>
                  </tr>
                `
                  )
                  .join("")}
                <tr style="font-weight: bold; background: #f9fafb;">
                  <td colspan="2">Total Advances</td>
                  <td class="amount">${getAdvancesTotal(
                    employee.advances
                  ).toLocaleString()}</td>
                  <td class="amount negative">- ${advanceDeductions.toLocaleString()}</td>
                  <td class="amount">${getRemainingAdvances(
                    employee.advances
                  ).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          `
              : ""
          }
          
          <!-- Loans Information -->
          ${
            employee.loans && employee.loans.length > 0
              ? `
          <div class="section">
            <div class="section-title">Loans (${employee.loans.length})</div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Original Amount</th>
                  <th>Deduction</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                ${employee.loans
                  .map(
                    (loan) => `
                  <tr>
                    <td>${loan.date || "N/A"}</td>
                    <td>${loan.reason || "N/A"}</td>
                    <td class="amount">${Number(
                      loan.originalAmount || 0
                    ).toLocaleString()}</td>
                    <td class="amount negative">- ${Number(
                      loan.deduction || 0
                    ).toLocaleString()}</td>
                    <td class="amount">${Number(
                      loan.remainingAmount || 0
                    ).toLocaleString()}</td>
                  </tr>
                `
                  )
                  .join("")}
                <tr style="font-weight: bold; background: #f9fafb;">
                  <td colspan="2">Total Loans</td>
                  <td class="amount">${getLoansTotal(
                    employee.loans
                  ).toLocaleString()}</td>
                  <td class="amount negative">- ${loanDeductions.toLocaleString()}</td>
                  <td class="amount">${getRemainingLoans(
                    employee.loans
                  ).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          `
              : ""
          }
          
          <div class="footer">
            <p>This is a system-generated employee report. Generated on ${new Date().toLocaleString()}</p>
            <p>For any queries, please contact HR Department</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      } p-4`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-white hover:bg-gray-200 text-gray-700"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Employees
          </button>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowReceiptModal(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              Generate Receipt
            </button>

            <button
              onClick={handlePrintReceipt}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Details
            </button>

            <button
              onClick={handlePrintReceipt}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Employee Details Card */}
        <div
          className={`rounded-xl shadow-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } mb-6`}
        >
          {/* Header */}
          <div
            className={`px-6 py-4 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${
                  isDarkMode ? "bg-indigo-900" : "bg-indigo-100"
                }`}
              >
                <User
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-indigo-300" : "text-indigo-600"
                  }`}
                />
              </div>
              <div>
                <h1
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {employee.name}
                </h1>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {employee.employeeId} • {employee.jobTitle || "N/A"} •{" "}
                  {employee.location || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="space-y-4">
                <h3
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } mb-3`}
                >
                  Personal Information
                </h3>

                <div>
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Employee ID
                  </span>
                  <p
                    className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {employee.employeeId}
                  </p>
                </div>

                <div>
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    CNIC
                  </span>
                  <p
                    className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {employee.cnic || "N/A"}
                  </p>
                </div>

                <div>
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Location
                  </span>
                  <p
                    className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {employee.location || "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } mb-3`}
                >
                  Employment Details
                </h3>

                <div>
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Job Title
                  </span>
                  <p
                    className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {employee.jobTitle || "N/A"}
                  </p>
                </div>

                <div>
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Joining Date
                  </span>
                  <p
                    className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {employee.joiningDate
                      ? new Date(employee.joiningDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Employment Duration
                  </span>
                  <p
                    className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {employee.joiningDate
                      ? Math.floor(
                          (new Date() - new Date(employee.joiningDate)) /
                            (1000 * 60 * 60 * 24)
                        ) + " days"
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } mb-3`}
                >
                  Salary Summary
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Basic Salary:
                    </span>
                    <span
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      AED {basicSalary.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Commission:
                    </span>
                    <span className="font-medium text-green-600">
                      AED {commission.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Overtime:
                    </span>
                    <span className="font-medium text-blue-600">
                      AED {overtime.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2 border-gray-600">
                    <span
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-green-300" : "text-green-800"
                      }`}
                    >
                      Total Earnings:
                    </span>
                    <span className="font-bold text-green-600">
                      AED {totalEarnings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Salary Breakdown */}
            <div
              className={`p-6 rounded-lg ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              } mb-6`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Detailed Salary Breakdown
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Deductions */}
                <div>
                  <h4
                    className={`font-medium mb-3 ${
                      isDarkMode ? "text-red-300" : "text-red-800"
                    }`}
                  >
                    💸 Deductions
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Advance Deductions:
                      </span>
                      <span className="font-medium text-red-600">
                        AED {advanceDeductions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Loan Deductions:
                      </span>
                      <span className="font-medium text-red-600">
                        AED {loanDeductions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2 border-gray-600">
                      <span
                        className={`text-sm font-semibold ${
                          isDarkMode ? "text-red-300" : "text-red-800"
                        }`}
                      >
                        Total Deductions:
                      </span>
                      <span className="font-bold text-red-600">
                        AED {totalDeductions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Net Salary */}
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-indigo-900/20" : "bg-indigo-50"
                  } border ${
                    isDarkMode ? "border-indigo-700" : "border-indigo-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign
                      className={`w-5 h-5 ${
                        isDarkMode ? "text-indigo-300" : "text-indigo-600"
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        isDarkMode ? "text-indigo-300" : "text-indigo-800"
                      }`}
                    >
                      Net Salary
                    </span>
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      netSalary >= 0 ? "text-indigo-600" : "text-red-600"
                    }`}
                  >
                    AED {Math.abs(netSalary).toLocaleString()}
                    {netSalary < 0 && (
                      <span className="text-sm ml-2">(Deficit)</span>
                    )}
                  </div>
                  {netSalary < 0 && (
                    <p
                      className={`text-sm mt-2 ${
                        isDarkMode ? "text-red-300" : "text-red-600"
                      }`}
                    >
                      ⚠️ Deductions exceed total earnings
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Advances and Loans Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Advances Section */}
              <div
                className={`p-4 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Advances ({employee.advances?.length || 0})
                </h3>

                {employee.advances && employee.advances.length > 0 ? (
                  <div className="space-y-3">
                    {employee.advances.map((advance, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded border ${
                          isDarkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span
                            className={`font-medium ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {advance.reason || "General Advance"}
                          </span>
                          <span
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {advance.date || "N/A"}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span
                              className={`${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Original:
                            </span>
                            <div className="font-medium">
                              AED{" "}
                              {Number(
                                advance.originalAmount || 0
                              ).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span
                              className={`${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Deduction:
                            </span>
                            <div className="font-medium text-red-600">
                              AED{" "}
                              {Number(advance.deduction || 0).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span
                              className={`${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Remaining:
                            </span>
                            <div className="font-medium text-green-600">
                              AED{" "}
                              {Number(
                                advance.remainingAmount || 0
                              ).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className={`p-3 rounded border-2 ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-800"
                          : "border-gray-300 bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between font-semibold">
                        <span>Total Advances:</span>
                        <span>
                          AED{" "}
                          {getAdvancesTotal(employee.advances).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Deducted:</span>
                        <span className="text-red-600">
                          AED {advanceDeductions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Remaining:</span>
                        <span className="text-green-600">
                          AED{" "}
                          {getRemainingAdvances(
                            employee.advances
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p
                    className={`text-center py-4 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No advances recorded
                  </p>
                )}
              </div>

              {/* Loans Section */}
              <div
                className={`p-4 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Loans ({employee.loans?.length || 0})
                </h3>

                {employee.loans && employee.loans.length > 0 ? (
                  <div className="space-y-3">
                    {employee.loans.map((loan, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded border ${
                          isDarkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span
                            className={`font-medium ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {loan.reason || "General Loan"}
                          </span>
                          <span
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {loan.date || "N/A"}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span
                              className={`${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Original:
                            </span>
                            <div className="font-medium">
                              AED{" "}
                              {Number(
                                loan.originalAmount || 0
                              ).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span
                              className={`${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Deduction:
                            </span>
                            <div className="font-medium text-red-600">
                              AED {Number(loan.deduction || 0).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span
                              className={`${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              Remaining:
                            </span>
                            <div className="font-medium text-green-600">
                              AED{" "}
                              {Number(
                                loan.remainingAmount || 0
                              ).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className={`p-3 rounded border-2 ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-800"
                          : "border-gray-300 bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between font-semibold">
                        <span>Total Loans:</span>
                        <span>
                          AED {getLoansTotal(employee.loans).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Deducted:</span>
                        <span className="text-red-600">
                          AED {loanDeductions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Remaining:</span>
                        <span className="text-green-600">
                          AED{" "}
                          {getRemainingLoans(employee.loans).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p
                    className={`text-center py-4 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No loans recorded
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        isDarkMode={isDarkMode}
        open={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        employee={employee}
        onSaveReceipt={onSaveReceipt}
      />
    </div>
  );
};

export default EmployeeDetailPage;
