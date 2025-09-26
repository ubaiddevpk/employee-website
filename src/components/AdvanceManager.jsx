// import React from "react";

// const AdvanceManager = ({ isDarkMode, advances, onAdd, onUpdate, onRemove }) => {
//   return (
//     <div className="mt-6">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-lg font-semibold">Advances</h3>
//         <button
//           type="button"
//           onClick={onAdd}
//           className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Advance
//         </button>
//       </div>
//       {advances.map((adv) => (
//         <div
//           key={adv.id}
//           className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3 p-3 border rounded bg-gray-50 dark:bg-gray-700"
//         >
//           <input
//             type="number"
//             placeholder="Amount"
//             value={adv.originalAmount}
//             onChange={(e) =>
//               onUpdate(adv.id, "originalAmount", Number(e.target.value))
//             }
//             className="border p-2 rounded"
//           />
//           <input
//             type="date"
//             value={adv.date}
//             onChange={(e) => onUpdate(adv.id, "date", e.target.value)}
//             className="border p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Reason"
//             value={adv.reason}
//             onChange={(e) => onUpdate(adv.id, "reason", e.target.value)}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Deduction"
//             value={adv.deduction}
//             onChange={(e) =>
//               onUpdate(adv.id, "deduction", Number(e.target.value))
//             }
//             className="border p-2 rounded"
//           />
//           <button
//             type="button"
//             onClick={() => onRemove(adv.id)}
//             className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdvanceManager;

import React from "react";
import { Trash2, Plus } from "lucide-react";

const AdvanceManager = ({
  isDarkMode,
  advances,
  onAdd,
  onUpdate,
  onRemove,
}) => {
  const inputStyle = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none ${
    isDarkMode
      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
  }`;

  const getTotalAdvanceAmount = () => {
    return advances.reduce(
      (sum, adv) => sum + Number(adv.originalAmount || 0),
      0
    );
  };

  const getTotalDeductions = () => {
    return advances.reduce((sum, adv) => sum + Number(adv.deduction || 0), 0);
  };

  const getRemainingAmount = () => {
    return getTotalAdvanceAmount() - getTotalDeductions();
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
            Advances Management
          </h3>
          <div
            className={`text-sm mt-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Total: AED {getTotalAdvanceAmount().toLocaleString()} | Deducted:
            AED {getTotalDeductions().toLocaleString()} | Remaining: AED{" "}
            {getRemainingAmount().toLocaleString()}
          </div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Advance
        </button>
      </div>

      {advances.length === 0 ? (
        <div
          className={`text-center py-8 border-2 border-dashed rounded-lg ${
            isDarkMode
              ? "border-gray-600 text-gray-400 bg-gray-800/50"
              : "border-gray-300 text-gray-500 bg-gray-50"
          }`}
        >
          <p className="text-sm">No advances added yet</p>
          <p className="text-xs mt-1">Click "Add Advance" to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {advances.map((adv, index) => (
            <div
              key={adv.id}
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
                  Advance #{index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      adv.remainingAmount > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {adv.remainingAmount > 0 ? "Pending" : "Cleared"}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(adv.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Remove Advance"
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
                    value={adv.originalAmount || ""}
                    onChange={(e) =>
                      onUpdate(adv.id, "originalAmount", e.target.value)
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
                    value={adv.date || ""}
                    onChange={(e) => onUpdate(adv.id, "date", e.target.value)}
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
                    placeholder="Purpose of advance"
                    value={adv.reason || ""}
                    onChange={(e) => onUpdate(adv.id, "reason", e.target.value)}
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
                    max={adv.originalAmount || 0}
                    step="0.01"
                    value={adv.deduction || ""}
                    onChange={(e) =>
                      onUpdate(adv.id, "deduction", e.target.value)
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
                      Number(adv.originalAmount || 0) -
                      Number(adv.deduction || 0)
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

export default AdvanceManager;
