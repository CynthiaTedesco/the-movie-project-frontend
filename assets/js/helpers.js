import { isValid } from 'date-fns';

export function beautifyCashValue(labelValue) {
  // Nine Zeroes for Billions
  // Math.abs(Number(labelValue)) >= 1.0e+9

  // Six Zeroes for Millions
  return Math.abs(Number(labelValue)) >= 1.0e6
    ? Math.floor(Math.abs(Number(labelValue)) / 1.0e6) + 'M$'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Math.floor(Math.abs(Number(labelValue)) / 1.0e3) + 'K$'
    : Math.floor(Math.abs(Number(labelValue)))
}
export function isMobile() {
  return document.documentElement.clientWidth <= 860
}
export function slices() {
  if (!document) {
    return 50
  }
  return isMobile() ? 20 : 50
}
export function calculateAge (birthdate, releaseDate) {
  if (!birthdate || !releaseDate) { return '' }
  if (!isValid(new Date(birthdate)) || !isValid(new Date(releaseDate))) {
    return '';
  }

  const diff_ms = new Date(releaseDate).getTime() - new Date(birthdate).getTime();
  const age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}