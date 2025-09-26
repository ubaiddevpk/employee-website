import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignInPage from "./pages/SignInScreen";
import DashboardPage from "./pages/Dashboard";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";
import RecordsPage from "./pages/RecordsPage";
const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sample data
  useEffect(() => {
    const sampleEmployees = [
      {
        id: 1,
        employeeId: "EMP001",
        name: "John Doe",
        location: "Karachi",
        basicSalary: 50000,
        commission: 5000,
        advance: 2000,
        visaLoan: 1000,
        advances: [],
        loans: [],
        cnic: "12345-1234567-1",
        joiningDate: "2024-01-15",
        jobTitle: "Software Developer",
        netSalary: 52000,
      },
      {
        id: 2,
        employeeId: "EMP002",
        name: "Jane Smith",
        location: "Lahore",
        basicSalary: 45000,
        commission: 3000,
        advance: 1500,
        visaLoan: 0,
        advances: [],
        loans: [],
        cnic: "12345-1234567-2",
        joiningDate: "2024-02-20",
        jobTitle: "UI/UX Designer",
        netSalary: 46500,
      },
      {
        id: 3,
        employeeId: "EMP003",
        name: "Alice Johnson",
        location: "Islamabad",
        basicSalary: 55000,
        commission: 2000,
        advance: 3000,
        visaLoan: 2000,
        advances: [],
        loans: [],
        cnic: "12345-1234567-3",
        joiningDate: "2024-03-10",
        jobTitle: "Project Manager",
        netSalary: 52000,
      },
    ];
    setEmployees(sampleEmployees);
  }, []);

  const navigate = useNavigate();

  if (!isSignedIn) {
    return (
      <SignInPage
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setIsSignedIn={setIsSignedIn}
      />
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardPage
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            setIsSignedIn={setIsSignedIn}
            employees={employees}
            setEmployees={setEmployees}
            showForm={showForm}
            setShowForm={setShowForm}
            editingEmployee={editingEmployee}
            setEditingEmployee={setEditingEmployee}
          />
        }
      />
      <Route
        path="/employees/:id"
        element={
          <EmployeeDetailPage isDarkMode={isDarkMode} employees={employees} />
        }
      />
      // In your Routes:
      <Route
        path="/records"
        element={<RecordsPage isDarkMode={isDarkMode} employees={employees} />}
      />
    </Routes>
  );
};

export default App;
