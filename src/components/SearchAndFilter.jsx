import { Search, Plus, FileText, FileSpreadsheet } from "lucide-react";
import { locations } from "../data/locations";

const Controls = ({
  searchTerm,
  setSearchTerm,
  searchFilter,
  setSearchFilter,
  locationFilter,
  setLocationFilter,
  activeTab,
  setActiveTab,
  onAddEmployee,
  exportToPDF,
  exportToExcel,
  isDarkMode,
}) => {
  const tabFilters = [
    { key: "all", label: "All", color: "indigo" },
    // { key: "advance", label: "Advance", color: "red" },
    { key: "commission", label: "Commission", color: "green" },
    // { key: "loan", label: "Loan", color: "purple" },
    { key: "remaining-advance", label: "Remaining Adv.", color: "orange" },
    { key: "remaining-loan", label: "Remaining Loan", color: "yellow" },
  ];

  const dark = isDarkMode;
  const baseInput =
    "px-3 py-1.5 text-sm rounded-md border focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

  return (
    <div
      className={`${
        dark ? "bg-gray-800" : "bg-white"
      } rounded-md shadow p-4 space-y-4`}
    >
      {/* ── Row 1 : Search + Filters ────────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              dark ? "text-gray-400" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Search employees..."
            className={`${baseInput} pl-9 w-full ${
              dark
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <select
          className={`${baseInput} min-w-[150px] ${
            dark
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-gray-900"
          }`}
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        >
          <option value="all">All Employees</option>
          <option value="high-salary">High Salary (50k+)</option>
          <option value="recent">Recent Hires</option>
        </select>

        <select
          className={`${baseInput} min-w-[150px] ${
            dark
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-gray-900"
          }`}
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* ── Row 2 : Tabs + Actions ─────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Tabs */}
        <div
          className={`flex flex-wrap rounded-md overflow-hidden border ${
            dark ? "border-gray-600" : "border-gray-300"
          }`}
        >
          {tabFilters.map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-2.5 py-1 text-xs font-medium transition-colors
                ${
                  activeTab === key
                    ? `bg-${color}-600 text-white`
                    : dark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Current Date Display */}
<div className={`text-center py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
  <span className="text-sm font-medium">
    Current Date: {new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })} | {new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}
  </span>
</div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportToPDF}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition-colors
              ${
                dark
                  ? "bg-red-700 hover:bg-red-600 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
          >
            <FileText className="w-3.5 h-3.5" />
            PDF
          </button>

          <button
            onClick={exportToExcel}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-medium transition-colors
              ${
                dark
                  ? "bg-green-700 hover:bg-green-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Excel
          </button>

          <button
            onClick={onAddEmployee}
            className="flex items-center gap-1.5 px-4 py-1 text-xs rounded-md font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
