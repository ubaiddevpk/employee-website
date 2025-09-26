const StatsCard = ({ icon: Icon, title, value, bgColor, iconColor, isDarkMode }) => (
  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-3 sm:p-4`}>
    <div className="flex items-center">
      <div className={`${bgColor} p-2 rounded-full flex-shrink-0`}>
        <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${iconColor}`} />
      </div>
      <div className="ml-2 sm:ml-3 min-w-0 flex-1">
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>{title}</p>
        <p className={`text-sm sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} truncate`}>{value}</p>
      </div>
    </div>
  </div>
);

export default StatsCard