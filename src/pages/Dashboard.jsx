import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  DollarSign,
  Calendar,
  CreditCard,
  Banknote,
  HandCoins,
} from "lucide-react";
import Header from "../components/Header";
import MonthlyRecords from "../components/records/MonthlyRecords";
import StatsCard from "../components/StatsCard";
import Controls from "../components/SearchAndFilter";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
const DashboardPage = ({
  isDarkMode,
  setIsDarkMode,
  setIsSignedIn,
  employees,
  setEmployees,
  showForm,
  setShowForm,
  editingEmployee,
  setEditingEmployee,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const navigate = useNavigate();

  // const exportToPDF = () => {
  //   const printWindow = window.open("", "_blank");
  //   const employeeData = filteredEmployees;

  //   const htmlContent = `
  //     <html>
  //       <head>
  //         <title>Employee Report</title>
  //         <style>
  //           body { font-family: Arial, sans-serif; margin: 20px; }
  //           table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  //           th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  //           th { background-color: #f2f2f2; }
  //           h1 { color: #333; }
  //           .header { margin-bottom: 20px; }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="header">
  //           <h1>Employee Report</h1>
  //           <p>Generated on: ${new Date().toLocaleDateString()}</p>
  //           <p>Total Employees: ${employeeData.length}</p>
  //         </div>
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>Employee ID</th>
  //               <th>Name</th>
  //               <th>Job Title</th>
  //               <th>Basic Salary</th>
  //               <th>Commission</th>
  //               <th>Advance</th>
  //               <th>Visa Loan</th>
  //               <th>Net Salary</th>
  //               <th>Joining Date</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             ${employeeData
  //               .map(
  //                 (emp) => `
  //               <tr>
  //                 <td>${emp.employeeId}</td>
  //                 <td>${emp.name}</td>
  //                 <td>${emp.jobTitle}</td>
  //                 <td>AED ${emp.basicSalary.toLocaleString()}</td>
  //                 <td>AED ${emp.commission.toLocaleString()}</td>
  //                 <td>AED ${emp.advance.toLocaleString()}</td>
  //                 <td>AED ${emp.visaLoan.toLocaleString()}</td>
  //                 <td>AED ${emp.netSalary.toLocaleString()}</td>
  //                 <td>${new Date(emp.joiningDate).toLocaleDateString()}</td>
  //               </tr>
  //             `
  //               )
  //               .join("")}
  //           </tbody>
  //         </table>
  //       </body>
  //     </html>
  //   `;

  //   printWindow.document.write(htmlContent);
  //   printWindow.document.close();
  //   printWindow.focus();
  //   printWindow.print();
  // };

  const exportToPDF = () => {
    const printWindow = window.open("", "_blank");
    const employeeData = filteredEmployees;

    const htmlContent = `
    <html>
      <head>
        <title>Employee Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 10px; }
          th, td { border: 1px solid #ddd; padding: 4px; text-align: left; }
          th { background-color: #f2f2f2; }
          h1 { color: #333; }
          .header { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Employee Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <p>Total Employees: ${employeeData.length}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Job Title</th>
              <th>Basic Salary</th>
              <th>Commission</th>
              <th>Overtime</th>
              <th>Advance Ded.</th>
              <th>Loan Ded.</th>
              <th>Remaining Adv.</th>
              <th>Remaining Loan</th>
              <th>Net Salary</th>
              <th>Joining Date</th>
            </tr>
          </thead>
          <tbody>
            ${employeeData
              .map(
                (emp) => `
              <tr>
                <td>${emp.employeeId || "N/A"}</td>
                <td>${emp.name || "N/A"}</td>
                <td>${emp.phoneNumber || "N/A"}</td>
                <td>${emp.jobTitle || "N/A"}</td>
                <td>AED ${Number(emp.basicSalary || 0).toLocaleString()}</td>
                <td>AED ${Number(emp.commission || 0).toLocaleString()}</td>
                <td>AED ${Number(emp.overtime || 0).toLocaleString()}</td>
                <td>AED ${(emp.advances || [])
                  .reduce((sum, adv) => sum + Number(adv.deduction || 0), 0)
                  .toLocaleString()}</td>
                <td>AED ${(emp.loans || [])
                  .reduce((sum, loan) => sum + Number(loan.deduction || 0), 0)
                  .toLocaleString()}</td>
                <td>AED ${Number(
                  emp.remainingAdvance || 0
                ).toLocaleString()}</td>
                <td>AED ${Number(emp.remainingLoan || 0).toLocaleString()}</td>
                <td>AED ${Number(emp.netSalary || 0).toLocaleString()}</td>
                <td>${
                  emp.joiningDate
                    ? new Date(emp.joiningDate).toLocaleDateString()
                    : "N/A"
                }</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // const exportToExcel = () => {
  //   const employeeData = filteredEmployees;
  //   const csvContent = [
  //     [
  //       "Employee ID",
  //       "Name",
  //       "Job Title",
  //       "Location",
  //       "Basic Salary",
  //       "Commission",
  //       "Advance",
  //       "Visa Loan",
  //       "Net Salary",
  //       "CNIC",
  //       "Joining Date",
  //     ],
  //     ...employeeData.map((emp) => [
  //       emp.employeeId,
  //       emp.name,
  //       emp.jobTitle,
  //       emp.location,
  //       emp.basicSalary,
  //       emp.commission,
  //       emp.advance,
  //       emp.visaLoan,
  //       emp.netSalary,
  //       emp.cnic,
  //       emp.joiningDate,
  //     ]),
  //   ]
  //     .map((row) => row.join(","))
  //     .join("\n");

  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   const url = URL.createObjectURL(blob);
  //   link.setAttribute("href", url);
  //   link.setAttribute(
  //     "download",
  //     `employees_${new Date().toISOString().split("T")[0]}.csv`
  //   );
  //   link.style.visibility = "hidden";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  // const filteredEmployees = employees.filter((employee) => {
  //   const matchesSearch =
  //     employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

  //   let matchesFilter = true;
  //   if (searchFilter === "high-salary")
  //     matchesFilter = employee.netSalary >= 50000;
  //   if (searchFilter === "recent")
  //     matchesFilter = new Date(employee.joiningDate) > new Date("2024-01-01");

  //   let matchesTab = true;
  //   if (activeTab === "remaining-advance") matchesTab = employee.advance > 0;
  //   if (activeTab === "commission") matchesTab = employee.commission > 0;
  //   if (activeTab === "remaining-loan") matchesTab = employee.visaLoan > 0;

  //   const matchesLocation =
  //     !locationFilter ||
  //     (employee.location || "").toLowerCase() === locationFilter.toLowerCase();

  //   return matchesSearch && matchesFilter && matchesTab && matchesLocation;
  // });

  const exportToExcel = () => {
    const employeeData = filteredEmployees;
    const csvContent = [
      [
        "Employee ID",
        "Name",
        "Phone Number",
        "Job Title",
        "Location",
        "Basic Salary",
        "Commission",
        "Overtime",
        "Advance Deductions",
        "Loan Deductions",
        "Remaining Advance",
        "Remaining Loan",
        "Net Salary",
        "CNIC",
        "Joining Date",
      ],
      ...employeeData.map((emp) => [
        emp.employeeId || "N/A",
        emp.name || "N/A",
        emp.phoneNumber || "N/A",
        emp.jobTitle || "N/A",
        emp.location || "N/A",
        emp.basicSalary || 0,
        emp.commission || 0,
        emp.overtime || 0,
        (emp.advances || []).reduce(
          (sum, adv) => sum + Number(adv.deduction || 0),
          0
        ),
        (emp.loans || []).reduce(
          (sum, loan) => sum + Number(loan.deduction || 0),
          0
        ),
        emp.remainingAdvance || 0,
        emp.remainingLoan || 0,
        emp.netSalary || 0,
        emp.cnic || "N/A",
        emp.joiningDate || "N/A",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `employees_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      (employee.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.employeeId || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (employee.jobTitle || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (searchFilter === "high-salary")
      matchesFilter = Number(employee.netSalary || 0) >= 50000;
    if (searchFilter === "recent")
      matchesFilter = new Date(employee.joiningDate) > new Date("2024-01-01");

    let matchesTab = true;
    if (activeTab === "advance") {
      const advanceDeductions = (employee.advances || []).reduce(
        (sum, adv) => sum + Number(adv.deduction || 0),
        0
      );
      matchesTab = advanceDeductions > 0;
    }
    if (activeTab === "commission")
      matchesTab = Number(employee.commission || 0) > 0;
    if (activeTab === "loan") {
      const loanDeductions = (employee.loans || []).reduce(
        (sum, loan) => sum + Number(loan.deduction || 0),
        0
      );
      matchesTab = loanDeductions > 0;
    }
    if (activeTab === "remaining-advance")
      matchesTab = Number(employee.remainingAdvance || 0) > 0;
    if (activeTab === "remaining-loan")
      matchesTab = Number(employee.remainingLoan || 0) > 0;

    const matchesLocation =
      !locationFilter ||
      (employee.location || "").toLowerCase() === locationFilter.toLowerCase();

    return matchesSearch && matchesFilter && matchesTab && matchesLocation;
  });

  const handleSaveEmployee = (employeeData) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === employeeData.id ? employeeData : emp
        )
      );
    } else {
      setEmployees([...employees, employeeData]);
    }
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  // const totalAdvance = employees.reduce((sum, emp) => sum + emp.advance, 0);
  // const totalCommission = employees.reduce(
  //   (sum, emp) => sum + emp.commission,
  //   0
  // );
  // const totalLoan = employees.reduce((sum, emp) => sum + emp.visaLoan, 0);

  // Replace the existing totalAdvance, totalCommission, totalLoan calculations with:
  const totalAdvance = employees.reduce((sum, emp) => {
    const advances = emp.advances || [];
    return (
      sum +
      advances.reduce((advSum, adv) => advSum + Number(adv.deduction || 0), 0)
    );
  }, 0);

  const totalCommission = employees.reduce(
    (sum, emp) => sum + Number(emp.commission || 0),
    0
  );

  const totalLoan = employees.reduce((sum, emp) => {
    const loans = emp.loans || [];
    return (
      sum +
      loans.reduce((loanSum, loan) => loanSum + Number(loan.deduction || 0), 0)
    );
  }, 0);

  const totalRemainingAdvance = employees.reduce(
    (sum, emp) => sum + Number(emp.remainingAdvance || 0),
    0
  );
  const totalRemainingLoan = employees.reduce(
    (sum, emp) => sum + Number(emp.remainingLoan || 0),
    0
  );

  // const statsData = [
  //   {
  //     icon: Users,
  //     title: "Total Employees",
  //     value: employees.length,
  //     bgColor: isDarkMode ? "bg-blue-900" : "bg-blue-100",
  //     iconColor: isDarkMode ? "text-blue-400" : "text-blue-600",
  //   },
  //   {
  //     icon: DollarSign,
  //     title: "Total Payroll",
  //     value: `AED ${employees
  //       .reduce((sum, emp) => sum + emp.netSalary, 0)
  //       .toLocaleString()}`,
  //     bgColor: isDarkMode ? "bg-green-900" : "bg-green-100",
  //     iconColor: isDarkMode ? "text-green-400" : "text-green-600",
  //   },
  //   {
  //     icon: Calendar,
  //     title: "New This Month",
  //     value: "2",
  //     bgColor: isDarkMode ? "bg-yellow-900" : "bg-yellow-100",
  //     iconColor: isDarkMode ? "text-yellow-400" : "text-yellow-600",
  //   },
  //   {
  //     icon: HandCoins,
  //     title: "Total Advance",
  //     value: `AED ${totalAdvance.toLocaleString()}`,
  //     bgColor: isDarkMode ? "bg-red-900" : "bg-red-100",
  //     iconColor: isDarkMode ? "text-red-400" : "text-red-600",
  //   },
  //   {
  //     icon: Banknote,
  //     title: "Total Commission",
  //     value: `AED ${totalCommission.toLocaleString()}`,
  //     bgColor: isDarkMode ? "bg-green-900" : "bg-green-100",
  //     iconColor: isDarkMode ? "text-green-400" : "text-green-600",
  //   },
  //   {
  //     icon: CreditCard,
  //     title: "Total Loans",
  //     value: `AED ${totalLoan.toLocaleString()}`,
  //     bgColor: isDarkMode ? "bg-purple-900" : "bg-purple-100",
  //     iconColor: isDarkMode ? "text-purple-400" : "text-purple-600",
  //   },
  // ];

  const statsData = [
    {
      icon: Users,
      title: "Total Employees",
      value: employees.length,
      bgColor: isDarkMode ? "bg-blue-900" : "bg-blue-100",
      iconColor: isDarkMode ? "text-blue-400" : "text-blue-600",
    },
    {
      icon: DollarSign,
      title: "Total Payroll",
      value: `AED ${employees
        .reduce((sum, emp) => sum + Number(emp.netSalary || 0), 0)
        .toLocaleString()}`,
      bgColor: isDarkMode ? "bg-green-900" : "bg-green-100",
      iconColor: isDarkMode ? "text-green-400" : "text-green-600",
    },
    {
      icon: Calendar,
      title: "New This Month",
      value: employees.filter((emp) => {
        const joiningDate = new Date(emp.joiningDate);
        const now = new Date();
        return (
          joiningDate.getMonth() === now.getMonth() &&
          joiningDate.getFullYear() === now.getFullYear()
        );
      }).length,
      bgColor: isDarkMode ? "bg-yellow-900" : "bg-yellow-100",
      iconColor: isDarkMode ? "text-yellow-400" : "text-yellow-600",
    },
    {
      icon: HandCoins,
      title: "Total Advance Deducted",
      value: `AED ${totalAdvance.toLocaleString()}`,
      bgColor: isDarkMode ? "bg-red-900" : "bg-red-100",
      iconColor: isDarkMode ? "text-red-400" : "text-red-600",
    },
    {
      icon: Banknote,
      title: "Total Commission",
      value: `AED ${totalCommission.toLocaleString()}`,
      bgColor: isDarkMode ? "bg-green-900" : "bg-green-100",
      iconColor: isDarkMode ? "text-green-400" : "text-green-600",
    },
    {
      icon: CreditCard,
      title: "Total Loan Deducted",
      value: `AED ${totalLoan.toLocaleString()}`,
      bgColor: isDarkMode ? "bg-purple-900" : "bg-purple-100",
      iconColor: isDarkMode ? "text-purple-400" : "text-purple-600",
    },
    {
      icon: HandCoins,
      title: "Remaining Advances",
      value: `AED ${totalRemainingAdvance.toLocaleString()}`,
      bgColor: isDarkMode ? "bg-orange-900" : "bg-orange-100",
      iconColor: isDarkMode ? "text-orange-400" : "text-orange-600",
    },
    {
      icon: CreditCard,
      title: "Remaining Loans",
      value: `AED ${totalRemainingLoan.toLocaleString()}`,
      bgColor: isDarkMode ? "bg-yellow-900" : "bg-yellow-100",
      iconColor: isDarkMode ? "text-yellow-400" : "text-yellow-600",
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setIsSignedIn={setIsSignedIn}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              bgColor={stat.bgColor}
              iconColor={stat.iconColor}
              isDarkMode={isDarkMode}
            />
          ))}
        </div> */}

        {/* Stats */}
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              bgColor={stat.bgColor}
              iconColor={stat.iconColor}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {/* Controls */}
        <Controls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onAddEmployee={() => {
            setShowForm(true);
            setEditingEmployee(null);
          }}
          exportToPDF={exportToPDF}
          exportToExcel={exportToExcel}
          isDarkMode={isDarkMode}
        />

        {/* Employee Table */}
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={setEditingEmployee}
          onView={(emp) => navigate(`/employees/${emp.id}`)}
          onDelete={handleDeleteEmployee}
          isDarkMode={isDarkMode}
        />

        {filteredEmployees.length === 0 && (
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-md p-12 text-center`}
          >
            <Users
              className={`w-16 h-16 ${
                isDarkMode ? "text-gray-600" : "text-gray-300"
              } mx-auto mb-4`}
            />
            <h3
              className={`text-lg font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-2`}
            >
              No employees found
            </h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Try adjusting your search or add a new employee.
            </p>
          </div>
        )}
      </div>

      {/* Employee Form Modal */}
      {(showForm || editingEmployee) && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={handleSaveEmployee}
          onCancel={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
          isDarkMode={isDarkMode}
        />
      )}

      {/* navigates to /employees/:id on row click */}
    </div>
  );
};

export default DashboardPage;
