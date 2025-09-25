
const StatsCard = ({ icon: Icon, title, value, bgColor, iconColor, isDarkMode }) => (
  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4`}>
    <div className="flex items-center">
      <div className={`${bgColor} p-2 rounded-full`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="ml-3">
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
        <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{value}</p>
      </div>
    </div>
  </div>
);

export default StatsCard