/** @format */

export function getFormatedDate(date) {
  return new Intl.DateTimeFormat("he-IL").format(date);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
