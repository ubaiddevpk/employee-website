import { startOfNextMonth } from './dateHelpers';

export function calculateNetSalary(basicSalary, commission, advances = [], loans = []) {
  const totalAdvances = advances.reduce((sum, a) => sum + (Number(a.amount) || 0), 0);
  const totalLoans = loans.reduce((sum, l) => sum + (Number(l.amount) || 0), 0);
  return Number(basicSalary || 0) + Number(commission || 0) - totalAdvances - totalLoans;
}

export function generateLoanSchedule(loan) {
  const amount = Number(loan.amount) || 0;
  const installments = Math.max(Number(loan.installments) || 1, 1);
  const monthly = Math.ceil(amount / installments);
  const firstMonth = startOfNextMonth(loan.date || new Date());
  const schedule = [];
  for (let i = 0; i < installments; i++) {
    const dueDate = new Date(firstMonth.getFullYear(), firstMonth.getMonth() + i, 1);
    schedule.push({
      sequence: i + 1,
      dueDate: dueDate.toISOString(),
      amount: monthly,
      paid: false,
    });
  }
  return schedule;
}

export function monthlyPayrollRecord(employee, year, month) {
  const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
  const advances = (employee.advances || []).filter(a => a.date && new Date(a.date).getFullYear() === year && new Date(a.date).getMonth() === month);
  const loanDeductions = (employee.loans || []).flatMap(l => (l.schedule || [])).filter(s => {
    const d = new Date(s.dueDate);
    return d.getFullYear() === year && d.getMonth() === month;
  });
  const totalAdvance = advances.reduce((sum, a) => sum + (Number(a.amount) || 0), 0);
  const totalLoanDeduction = loanDeductions.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);
  const gross = Number(employee.basicSalary || 0) + Number(employee.commission || 0);
  const net = gross - totalAdvance - totalLoanDeduction;
  return {
    employeeId: employee.id,
    employeeName: employee.name,
    month: monthStr,
    gross,
    totalAdvance,
    totalLoanDeduction,
    net,
  };
}

// Helper function to calculate monthly payroll
export const calculateMonthlyPayroll = (employee, year, month) => {
  const basic = Number(employee.basicSalary || 0);
  const commission = Number(employee.commission || 0);
  const overtime = Number(employee.overtime || 0);
  const gross = basic + commission + overtime;

  const advanceDeductions = (employee.advances || []).reduce((sum, adv) => 
    sum + Number(adv.deduction || 0), 0
  );
  
  const loanDeductions = (employee.loans || []).reduce((sum, loan) => 
    sum + Number(loan.deduction || 0), 0
  );

  const net = gross - advanceDeductions - loanDeductions;

  return {
    employeeId: employee.employeeId,
    employeeName: employee.name,
    location: employee.location,
    gross,
    advanceDeductions,
    loanDeductions,
    totalDeductions: advanceDeductions + loanDeductions,
    net,
    month: `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`
  };
};




