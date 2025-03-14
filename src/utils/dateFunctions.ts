export const convertDateToString = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const resDate = `${year}-${month}-${day}`;
  return resDate;
};

export const getTodayDate = (): string => {
  const today = convertDateToString(new Date());
  return today;
};

export const validateDate = (dateStr: string): boolean => {
  const pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateStr.match(pattern);

  if (!match) return false;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  const currentYear = new Date().getFullYear();
  if (year < 1000 || year > currentYear) return false;
  if (month < 1 || month > 12) return false;

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return false;

  return true;
};
