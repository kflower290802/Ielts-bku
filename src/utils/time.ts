export function getAllDatesBetween(startDate: Date, endDate: Date): string[] {
  const dates: string[] = [];
  const currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0);

  const lastDate = new Date(endDate);
  lastDate.setHours(23, 59, 59, 999);
  while (currentDate <= lastDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    dates.push(dateStr);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
