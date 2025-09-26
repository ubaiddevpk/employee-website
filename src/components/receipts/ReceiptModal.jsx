import React, { useState } from "react";
import { Printer, Download, X, Calendar, User, CreditCard } from "lucide-react";

const ReceiptModal = ({
  isDarkMode,
  open,
  onClose,
  employee,
  receiptData = {},
  onSaveReceipt,
}) => {
  const [receiptType, setReceiptType] = useState(receiptData.type || "salary");
  const [customItems, setCustomItems] = useState(receiptData.items || []);
  const [notes, setNotes] = useState(receiptData.notes || "");

  if (!open || !employee) return null;

  const getReceiptItems = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    switch (receiptType) {
      case "salary":
        return [
          {
            description: "Basic Salary",
            amount: employee.basicSalary || 0,
            type: "earning",
          },
          {
            description: "Commission",
            amount: employee.commission || 0,
            type: "earning",
          },
          {
            description: "Overtime Pay",
            amount: employee.overtime || 0,
            type: "earning",
          },
          {
            description: "Advance Deduction",
            amount: -(
              employee.advances?.reduce(
                (sum, a) => sum + Number(a.deduction || 0),
                0
              ) || 0
            ),
            type: "deduction",
          },
          {
            description: "Loan Deduction",
            amount: -(
              employee.loans?.reduce(
                (sum, l) => sum + Number(l.deduction || 0),
                0
              ) || 0
            ),
            type: "deduction",
          },
        ].filter((item) => item.amount !== 0);

      case "advance":
        return (
          employee.advances?.map((adv) => ({
            description: `Advance: ${adv.reason || "General"}`,
            amount: adv.originalAmount || 0,
            date: adv.date,
            type: "advance",
          })) || []
        );

      case "loan":
        return (
          employee.loans?.map((loan) => ({
            description: `Loan: ${loan.reason || "General"}`,
            amount: loan.originalAmount || 0,
            date: loan.date,
            type: "loan",
          })) || []
        );

      case "custom":
        return customItems;

      default:
        return [];
    }
  };

  const addCustomItem = () => {
    setCustomItems((prev) => [
      ...prev,
      {
        description: "",
        amount: 0,
        type: "earning",
        id: Date.now(),
      },
    ]);
  };

  const updateCustomItem = (id, field, value) => {
    setCustomItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeCustomItem = (id) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== id));
  };

  const items = getReceiptItems();
  const total = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const companyName = "Your Company Name"; // You can make this configurable
    const receiptNumber = `RCP-${Date.now()}`;

    const html = `
      <html>
        <head>
          <title>${
            receiptType.charAt(0).toUpperCase() + receiptType.slice(1)
          } Receipt - ${employee.name}</title>
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
            .receipt-title { 
              font-size: 20px; 
              color: #6b7280; 
              text-transform: uppercase; 
              letter-spacing: 1px; 
            }
            .receipt-info { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 30px; 
              background: #f9fafb; 
              padding: 15px; 
              border-radius: 8px; 
            }
            .employee-info, .receipt-meta { 
              flex: 1; 
            }
            .label { 
              font-weight: bold; 
              color: #374151; 
            }
            .value { 
              color: #6b7280; 
              margin-bottom: 8px; 
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 30px; 
              box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
            }
            th { 
              background: #4f46e5; 
              color: white; 
              padding: 15px; 
              text-align: left; 
              font-weight: 600; 
            }
            td { 
              padding: 12px 15px; 
              border-bottom: 1px solid #e5e7eb; 
            }
            tr:nth-child(even) { 
              background: #f9fafb; 
            }
            .amount-positive { 
              color: #059669; 
              font-weight: 600; 
            }
            .amount-negative { 
              color: #dc2626; 
              font-weight: 600; 
            }
            .total-row { 
              background: #4f46e5 !important; 
              color: white; 
              font-weight: bold; 
              font-size: 16px; 
            }
            .notes { 
              background: #f3f4f6; 
              padding: 15px; 
              border-radius: 8px; 
              margin-top: 20px; 
            }
            .notes-title { 
              font-weight: bold; 
              margin-bottom: 8px; 
              color: #374151; 
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
            <div class="receipt-title">${receiptType} Receipt</div>
          </div>
          
          <div class="receipt-info">
            <div class="employee-info">
              <div class="label">Employee Details:</div>
              <div class="value">Name: ${employee.name}</div>
              <div class="value">ID: ${employee.employeeId}</div>
              <div class="value">Position: ${employee.jobTitle || "N/A"}</div>
              <div class="value">CNIC: ${employee.cnic || "N/A"}</div>
            </div>
            <div class="receipt-meta">
              <div class="label">Receipt Details:</div>
              <div class="value">Receipt #: ${receiptNumber}</div>
              <div class="value">Date: ${new Date().toLocaleDateString()}</div>
              <div class="value">Time: ${new Date().toLocaleTimeString()}</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th style="text-align: right;">Amount (AED)</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
                <tr>
                  <td>${item.description || "N/A"}</td>
                  <td style="text-transform: capitalize;">${
                    item.type || "Item"
                  }</td>
                  <td style="text-align: right;" class="${
                    Number(item.amount) >= 0
                      ? "amount-positive"
                      : "amount-negative"
                  }">
                    ${Number(item.amount || 0).toLocaleString()}
                  </td>
                </tr>
              `
                )
                .join("")}
              <tr class="total-row">
                <td colspan="2">Net Total</td>
                <td style="text-align: right;">${total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          
          ${
            notes
              ? `
            <div class="notes">
              <div class="notes-title">Notes:</div>
              <div>${notes}</div>
            </div>
          `
              : ""
          }
          
          <div class="footer">
            <p>This is a system-generated receipt. Generated on ${new Date().toLocaleString()}</p>
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

  const handleSave = () => {
    const receiptRecord = {
      id: Date.now(),
      employeeId: employee.employeeId,
      employeeName: employee.name,
      type: receiptType,
      items: items,
      total: total,
      notes: notes,
      date: new Date().toISOString(),
      receiptNumber: `RCP-${Date.now()}`,
    };

    if (onSaveReceipt) {
      onSaveReceipt(receiptRecord);
    }

    // Close modal after saving
    onClose();
  };

  const inputStyle = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
    isDarkMode
      ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
      : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
  }`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-xl shadow-xl w-full max-w-4xl max-h-[95vh] overflow-y-auto`}
      >
        {/* Header */}
        <div
          className={`sticky top-0 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"} p-6`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CreditCard
                className={`w-6 h-6 ${
                  isDarkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              />
              <h2
                className={`${
                  isDarkMode ? "text-white" : "text-gray-800"
                } text-2xl font-bold`}
              >
                Generate Receipt
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              } hover:bg-gray-100 rounded-full p-2 transition-colors`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Employee Info */}
          <div
            className={`mb-6 p-4 rounded-lg border ${
              isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <User
                className={`w-5 h-5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              />
              <h3
                className={`font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Employee Information
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Name:
                </span>
                <div
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {employee.name}
                </div>
              </div>
              <div>
                <span
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  ID:
                </span>
                <div
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {employee.employeeId}
                </div>
              </div>
              <div>
                <span
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Position:
                </span>
                <div
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {employee.jobTitle || "N/A"}
                </div>
              </div>
              <div>
                <span
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Date:
                </span>
                <div
                  className={`font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Type Selection */}
          <div className="mb-6">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Receipt Type
            </label>
            <select
              value={receiptType}
              onChange={(e) => setReceiptType(e.target.value)}
              className={inputStyle}
            >
              <option value="salary">Salary Receipt</option>
              <option value="advance">Advance Receipt</option>
              <option value="loan">Loan Receipt</option>
              <option value="custom">Custom Receipt</option>
            </select>
          </div>

          {/* Custom Items (for custom receipt type) */}
          {receiptType === "custom" && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Custom Items
                </h3>
                <button
                  type="button"
                  onClick={addCustomItem}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
                >
                  Add Item
                </button>
              </div>
              {customItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 p-3 border rounded"
                >
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) =>
                      updateCustomItem(item.id, "description", e.target.value)
                    }
                    className={inputStyle}
                  />
                  <select
                    value={item.type}
                    onChange={(e) =>
                      updateCustomItem(item.id, "type", e.target.value)
                    }
                    className={inputStyle}
                  >
                    <option value="earning">Earning</option>
                    <option value="deduction">Deduction</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={item.amount}
                    onChange={(e) =>
                      updateCustomItem(
                        item.id,
                        "amount",
                        Number(e.target.value)
                      )
                    }
                    className={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => removeCustomItem(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          <div className="mb-6">
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Notes (Optional)
            </label>
            <textarea
              placeholder="Add any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={inputStyle}
            />
          </div>

          {/* Receipt Preview */}
          <div
            className={`mb-6 border rounded-lg ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div
              className={`px-4 py-3 border-b ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <h3
                className={`font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Receipt Preview
              </h3>
            </div>
            <div className="p-4">
              {items.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead
                      className={`${
                        isDarkMode
                          ? "bg-gray-700 text-gray-200"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <tr>
                        <th className="px-3 py-2 text-left">Description</th>
                        <th className="px-3 py-2 text-left">Type</th>
                        <th className="px-3 py-2 text-right">Amount (AED)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => (
                        <tr
                          key={idx}
                          className={`border-b ${
                            isDarkMode ? "border-gray-700" : "border-gray-200"
                          }`}
                        >
                          <td className="px-3 py-2">{item.description}</td>
                          <td className="px-3 py-2 capitalize">{item.type}</td>
                          <td
                            className={`px-3 py-2 text-right font-medium ${
                              Number(item.amount) >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {Number(item.amount || 0).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr
                        className={`border-t-2 ${
                          isDarkMode
                            ? "border-gray-600 bg-gray-700"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      >
                        <td className="px-3 py-3 font-bold" colSpan="2">
                          Net Total
                        </td>
                        <td
                          className={`px-3 py-3 text-right font-bold text-lg ${
                            total >= 0 ? "text-indigo-600" : "text-red-600"
                          }`}
                        >
                          {total.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div
                  className={`text-center py-8 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No items to display
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Save Receipt
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                isDarkMode
                  ? "bg-gray-600 hover:bg-gray-700 text-gray-200"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-700"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
