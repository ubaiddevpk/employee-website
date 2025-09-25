export function toDate(value) {
  return value ? new Date(value) : null;
}

export function getMonthKey(year, month) {
  const mm = String(month + 1).padStart(2, '0');
  return `${year}-${mm}`;
}

export function isSameMonth(dateA, year, month) {
  const d = toDate(dateA);
  if (!d) return false;
  return d.getFullYear() === year && d.getMonth() === month;
}

export function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function startOfNextMonth(date) {
  const d = toDate(date) || new Date();
  const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  return next;
}

export function isOnOrAfter(a, b) {
  return a.getTime() >= b.getTime();
}

export function isOnOrBefore(a, b) {
  return a.getTime() <= b.getTime();
}

export function monthRangeContains(startDate, installments, targetYear, targetMonth) {
  const firstDeduction = startOfNextMonth(startDate);
  const endDeduction = addMonths(firstDeduction, Math.max(installments - 1, 0));
  const target = new Date(targetYear, targetMonth, 1);
  const targetEnd = new Date(targetYear, targetMonth + 1, 0);
  return isOnOrAfter(targetEnd, firstDeduction) && isOnOrBefore(target, endDeduction) === false
    ? (target.getFullYear() >= firstDeduction.getFullYear() && target.getMonth() >= firstDeduction.getMonth() && target <= endDeduction)
    : (target >= firstDeduction && target <= endDeduction);
}


