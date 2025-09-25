 import { useEffect } from "react";
 
 
 useEffect(() => {
    const sampleEmployees = [
      {
        id: 1,
        employeeId: 'EMP001',
        name: 'John Doe',
        address: '123 Main St, City',
        basicSalary: 50000,
        commission: 5000,
        advance: 2000,
        visaLoan: 1000,
        cnic: '12345-1234567-1',
        joiningDate: '2024-01-15',
        jobTitle: 'Software Developer',
        netSalary: 52000
      },
      {
        id: 2,
        employeeId: 'EMP002',
        name: 'Jane Smith',
        address: '456 Oak Ave, Town',
        basicSalary: 45000,
        commission: 3000,
        advance: 1500,
        visaLoan: 0,
        cnic: '12345-1234567-2',
        joiningDate: '2024-02-20',
        jobTitle: 'UI/UX Designer',
        netSalary: 46500
      },
      {
        id: 3,
        employeeId: 'EMP003',
        name: 'Alice Johnson',
        address: '789 Pine St, Village',
        basicSalary: 55000,
        commission: 2000,
        advance: 3000,
        visaLoan: 2000,
        cnic: '12345-1234567-3',
        joiningDate: '2024-03-10',
        jobTitle: 'Project Manager',
        netSalary: 52000
      }
    ];
    setEmployees(sampleEmployees);
  }, []);
