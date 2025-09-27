import React, { useState, useEffect } from "react";
import { locations } from "../data/locations";
import AdvanceManager from "./AdvanceManager";
import LoanManager from "./LoanManager";

const EmployeeForm = ({ employee, onSave, onCancel, isDarkMode }) => {
  const normalizeAdvance = (adv) => ({
    id: adv.id ?? Date.now(),
    originalAmount: Number(adv.originalAmount ?? adv.amount ?? 0),
    remainingAmount: Number(
      adv.remainingAmount ??
        (adv.originalAmount ?? adv.amount ?? 0) - (adv.deduction ?? 0)
    ),
    date: adv.date ?? "",
    reason: adv.reason ?? "",
    deduction: Number(adv.deduction ?? 0),
  });

  const normalizeLoan = (loan) => ({
    id: loan.id ?? Date.now(),
    originalAmount: Number(loan.originalAmount ?? loan.amount ?? 0),
    remainingAmount: Number(
      loan.remainingAmount ??
        (loan.originalAmount ?? loan.amount ?? 0) - (loan.deduction ?? 0)
    ),
    date: loan.date ?? "",
    reason: loan.reason ?? "",
    deduction: Number(loan.deduction ?? 0),
  });

  const [formData, setFormData] = useState({
    employeeId: employee?.employeeId || "",
    name: employee?.name || "",
    location: employee?.location || "",
    basicSalary: employee?.basicSalary?.toString() || "",
    commission: employee?.commission?.toString() || "",
    overtime: employee?.overtime?.toString() || "",
    cnic: employee?.cnic || "",
    phoneNumber: employee?.phoneNumber || "",
    joiningDate: employee?.joiningDate || "",
    jobTitle: employee?.jobTitle || "",
  });

  const [advances, setAdvances] = useState(
    (employee?.advances || []).map(normalizeAdvance)
  );
  const [loans, setLoans] = useState(
    (employee?.loans || []).map(normalizeLoan)
  );
  const [netSalary, setNetSalary] = useState(0);

  // Real-time net salary calculation
  const calculateNetSalary = () => {
    const basic = Number(formData.basicSalary || 0);
    const commission = Number(formData.commission || 0);
    const overtime = Number(formData.overtime || 0);

    const totalAdvanceDeductions = advances.reduce(
      (s, a) => s + Number(a.deduction || 0),
      0
    );
    const totalLoanDeductions = loans.reduce(
      (s, l) => s + Number(l.deduction || 0),
      0
    );

    return (
      basic +
      commission +
      overtime -
      totalAdvanceDeductions -
      totalLoanDeductions
    );
  };

  // Update net salary whenever form data, advances, or loans change
  useEffect(() => {
    setNetSalary(calculateNetSalary());
  }, [
    formData.basicSalary,
    formData.commission,
    formData.overtime,
    advances,
    loans,
  ]);

  // Add these two functions after getRemainingLoan
  const getTotalRemainingAdvance = () => {
    return advances.reduce(
      (sum, adv) => sum + Number(adv.remainingAmount || 0),
      0
    );
  };

  const getTotalRemainingLoan = () => {
    return loans.reduce(
      (sum, loan) => sum + Number(loan.remainingAmount || 0),
      0
    );
  };

  const addAdvance = () => {
    const newAdvance = {
      id: Date.now() + Math.random(),
      originalAmount: 0,
      remainingAmount: 0,
      date: new Date().toISOString().split("T")[0],
      reason: "",
      deduction: 0,
    };
    setAdvances((prev) => [...prev, newAdvance]);
  };

  const updateAdvance = (id, field, value) => {
    setAdvances((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;

        const updatedAdvance = { ...a };

        if (field === "originalAmount") {
          const original = Number(value || 0);
          updatedAdvance.originalAmount = original;
          updatedAdvance.remainingAmount = Math.max(
            0,
            original - Number(a.deduction || 0)
          );
        } else if (field === "deduction") {
          const ded = Number(value || 0);
          const maxDeduction = Number(a.originalAmount || 0);
          updatedAdvance.deduction = Math.min(ded, maxDeduction); // Prevent deduction > original
          updatedAdvance.remainingAmount = Math.max(
            0,
            Number(a.originalAmount || 0) - updatedAdvance.deduction
          );
        } else {
          updatedAdvance[field] = value;
        }

        return updatedAdvance;
      })
    );
  };

  const removeAdvance = (id) =>
    setAdvances((prev) => prev.filter((a) => a.id !== id));

  const addLoan = () => {
    const newLoan = {
      id: Date.now() + Math.random(),
      originalAmount: 0,
      remainingAmount: 0,
      date: new Date().toISOString().split("T")[0],
      reason: "",
      deduction: 0,
    };
    setLoans((prev) => [...prev, newLoan]);
  };

  const updateLoan = (id, field, value) => {
    setLoans((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;

        const updatedLoan = { ...l };

        if (field === "originalAmount") {
          const original = Number(value || 0);
          updatedLoan.originalAmount = original;
          updatedLoan.remainingAmount = Math.max(
            0,
            original - Number(l.deduction || 0)
          );
        } else if (field === "deduction") {
          const ded = Number(value || 0);
          const maxDeduction = Number(l.originalAmount || 0);
          updatedLoan.deduction = Math.min(ded, maxDeduction); // Prevent deduction > original
          updatedLoan.remainingAmount = Math.max(
            0,
            Number(l.originalAmount || 0) - updatedLoan.deduction
          );
        } else {
          updatedLoan[field] = value;
        }

        return updatedLoan;
      })
    );
  };

  const removeLoan = (id) =>
    setLoans((prev) => prev.filter((l) => l.id !== id));

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      basicSalary: Number(formData.basicSalary || 0),
      commission: Number(formData.commission || 0),
      overtime: Number(formData.overtime || 0),
      advances,
      loans,
      netSalary: netSalary,
      remainingAdvance: getTotalRemainingAdvance(), // Add this line
      remainingLoan: getTotalRemainingLoan(), // Add this line
      id: employee?.id || Date.now(),
      createdAt: employee?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(data);
  };

  const inputStyle = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-colors ${
    isDarkMode
      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
  }`;

  const getSalaryBreakdown = () => {
    const basic = Number(formData.basicSalary || 0);
    const commission = Number(formData.commission || 0);
    const overtime = Number(formData.overtime || 0);
    const totalEarnings = basic + commission + overtime;

    const totalAdvanceDeductions = advances.reduce(
      (s, a) => s + Number(a.deduction || 0),
      0
    );
    const totalLoanDeductions = loans.reduce(
      (s, l) => s + Number(l.deduction || 0),
      0
    );
    const totalDeductions = totalAdvanceDeductions + totalLoanDeductions;

    return {
      totalEarnings,
      totalAdvanceDeductions,
      totalLoanDeductions,
      totalDeductions,
      netSalary,
    };
  };

  const breakdown = getSalaryBreakdown();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-xl p-6 w-full max-w-5xl max-h-[95vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {employee ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className={`${
              isDarkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
            } text-2xl hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors`}
          >
            ×
          </button>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Employee ID *
            </label>
            <input
              required
              placeholder="e.g. EMP001"
              className={inputStyle}
              value={formData.employeeId}
              onChange={(e) => handleFormChange("employeeId", e.target.value)}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Employee Name *
            </label>
            <input
              required
              placeholder="Full name"
              className={inputStyle}
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
            />
          </div>

          {/* <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Location *
            </label>
            <select
              required
              className={inputStyle}
              value={formData.location}
              onChange={(e) => handleFormChange("location", e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div> */}

          <div>
  <label
    className={`block text-sm font-medium mb-1 ${
      isDarkMode ? "text-gray-300" : "text-gray-700"
    }`}
  >
    Location *
  </label>
  <input
    required
    placeholder="e.g. Dubai, Abu Dhabi"
    className={inputStyle}
    value={formData.location}
    onChange={(e) => handleFormChange("location", e.target.value)}
  />
</div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Job Title *
            </label>
            <input
              required
              placeholder="e.g. Software Developer"
              className={inputStyle}
              value={formData.jobTitle}
              onChange={(e) => handleFormChange("jobTitle", e.target.value)}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              CNIC *
            </label>
            <input
              required
              placeholder="12345-1234567-1"
              className={inputStyle}
              value={formData.cnic}
              onChange={(e) => handleFormChange("cnic", e.target.value)}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Phone Number *
            </label>
            <input
              required
              placeholder="e.g. 0300-1234567"
              className={inputStyle}
              value={formData.phoneNumber}
              onChange={(e) => handleFormChange("phoneNumber", e.target.value)}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Joining Date *
            </label>
            <input
              required
              type="date"
              className={inputStyle}
              value={formData.joiningDate}
              onChange={(e) => handleFormChange("joiningDate", e.target.value)}
            />
          </div>
        </div>

        {/* Salary Information */}
        <div
          className={`mb-6 p-4 border rounded-lg ${
            isDarkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Salary Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Basic Salary (AED) *
              </label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 50000"
                className={inputStyle}
                value={formData.basicSalary}
                onChange={(e) =>
                  handleFormChange("basicSalary", e.target.value)
                }
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Commission (AED)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Optional"
                className={inputStyle}
                value={formData.commission}
                onChange={(e) => handleFormChange("commission", e.target.value)}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Overtime Pay (AED)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Optional"
                className={inputStyle}
                value={formData.overtime}
                onChange={(e) => handleFormChange("overtime", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Advance & Loan Managers */}
        <AdvanceManager
          isDarkMode={isDarkMode}
          advances={advances}
          onAdd={addAdvance}
          onUpdate={updateAdvance}
          onRemove={removeAdvance}
        />

        <LoanManager
          isDarkMode={isDarkMode}
          loans={loans}
          onAdd={addLoan}
          onUpdate={updateLoan}
          onRemove={removeLoan}
        />

        {/* Real-time Salary Breakdown */}
        <div
          className={`mt-6 p-4 border-2 rounded-lg ${
            isDarkMode
              ? "bg-gradient-to-r from-green-900 to-blue-900 border-green-700"
              : "bg-gradient-to-r from-green-50 to-blue-50 border-green-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Salary Breakdown
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings */}
            <div>
              <h4
                className={`text-sm font-medium mb-3 ${
                  isDarkMode ? "text-green-300" : "text-green-800"
                }`}
              >
                💰 Earnings
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    Basic Salary:
                  </span>
                  <span
                    className={`font-medium ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    AED {Number(formData.basicSalary || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    Commission:
                  </span>
                  <span className={`font-medium text-green-600`}>
                    AED {Number(formData.commission || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    Overtime:
                  </span>
                  <span className={`font-medium text-blue-600`}>
                    AED {Number(formData.overtime || 0).toLocaleString()}
                  </span>
                </div>
                <div
                  className={`flex justify-between pt-2 border-t ${
                    isDarkMode ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      isDarkMode ? "text-green-300" : "text-green-800"
                    }`}
                  >
                    Total Earnings:
                  </span>
                  <span className={`font-bold text-green-600`}>
                    AED {breakdown.totalEarnings.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <h4
                className={`text-sm font-medium mb-3 ${
                  isDarkMode ? "text-red-300" : "text-red-800"
                }`}
              >
                💸 Deductions
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    Advance Deductions:
                  </span>
                  <span className="font-medium text-red-600">
                    AED {breakdown.totalAdvanceDeductions.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                  >
                    Loan Deductions:
                  </span>
                  <span className="font-medium text-red-600">
                    AED {breakdown.totalLoanDeductions.toLocaleString()}
                  </span>
                </div>
                <div
                  className={`flex justify-between pt-2 border-t ${
                    isDarkMode ? "border-gray-600" : "border-gray-300"
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      isDarkMode ? "text-red-300" : "text-red-800"
                    }`}
                  >
                    Total Deductions:
                  </span>
                  <span className="font-bold text-red-600">
                    AED {breakdown.totalDeductions.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div
            className={`mt-4 pt-4 border-t-2 ${
              isDarkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-center">
              <span
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                💵 Net Salary:
              </span>
              <span
                className={`text-2xl font-bold ${
                  netSalary >= 0 ? "text-indigo-600" : "text-red-600"
                }`}
              >
                AED {Math.abs(netSalary).toLocaleString()}
                {netSalary < 0 && (
                  <span className="text-sm ml-1">(Deficit)</span>
                )}
              </span>
            </div>
            {netSalary < 0 && (
              <div
                className={`mt-2 p-2 rounded text-sm ${
                  isDarkMode
                    ? "bg-red-900 text-red-200"
                    : "bg-red-100 text-red-800"
                }`}
              >
                ⚠️ Warning: Deductions exceed total earnings
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <button
            type="submit"
            disabled={netSalary < 0}
            className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-colors ${
              netSalary < 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            }`}
          >
            {employee ? "Update Employee" : "Save Employee"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? "bg-gray-600 hover:bg-gray-700 text-gray-200 focus:ring-2 focus:ring-gray-500"
                : "bg-gray-300 hover:bg-gray-400 text-gray-700 focus:ring-2 focus:ring-gray-400"
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
