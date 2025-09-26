import React from "react";
import { Trash2, Plus } from "lucide-react";

const LoanManager = ({ isDarkMode, loans, onAdd, onUpdate, onRemove }) => {
  const inputStyle = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${
    isDarkMode
      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
  }`;

  const getTotalLoanAmount = () => {
    return loans.reduce(
      (sum, loan) => sum + Number(loan.originalAmount || 0),
      0
    );
  };

  const getTotalDeductions = () => {
    return loans.reduce((sum, loan) => sum + Number(loan.deduction || 0), 0);
  };

  const getRemainingAmount = () => {
    return getTotalLoanAmount() - getTotalDeductions();
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Loans Management
          </h3>
          <div
            className={`text-sm mt-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Total: AED {getTotalLoanAmount().toLocaleString()} | Deducted: AED{" "}
            {getTotalDeductions().toLocaleString()} | Remaining: AED{" "}
            {getRemainingAmount().toLocaleString()}
          </div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Loan
        </button>
      </div>

      {loans.length === 0 ? (
        <div
          className={`text-center py-8 border-2 border-dashed rounded-lg ${
            isDarkMode
              ? "border-gray-600 text-gray-400 bg-gray-800/50"
              : "border-gray-300 text-gray-500 bg-gray-50"
          }`}
        >
          <p className="text-sm">No loans added yet</p>
          <p className="text-xs mt-1">Click "Add Loan" to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {loans.map((loan, index) => (
            <div
              key={loan.id}
              className={`p-4 border rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Loan #{index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      loan.remainingAmount > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {loan.remainingAmount > 0 ? "Pending" : "Cleared"}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(loan.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Remove Loan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Original Amount (AED)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    value={loan.originalAmount || ""}
                    onChange={(e) =>
                      onUpdate(loan.id, "originalAmount", e.target.value)
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={loan.date || ""}
                    onChange={(e) => onUpdate(loan.id, "date", e.target.value)}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Reason
                  </label>
                  <input
                    type="text"
                    placeholder="Purpose of loan"
                    value={loan.reason || ""}
                    onChange={(e) =>
                      onUpdate(loan.id, "reason", e.target.value)
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Monthly Deduction (AED)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    max={loan.originalAmount || 0}
                    step="0.01"
                    value={loan.deduction || ""}
                    onChange={(e) =>
                      onUpdate(loan.id, "deduction", e.target.value)
                    }
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-medium mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Remaining (AED)
                  </label>
                  <div
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-600 text-gray-300"
                        : "border-gray-300 bg-gray-100 text-gray-700"
                    }`}
                  >
                    {(
                      Number(loan.originalAmount || 0) -
                      Number(loan.deduction || 0)
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanManager;
