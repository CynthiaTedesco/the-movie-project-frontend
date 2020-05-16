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
  return document.documentElement.clientWidth <= 768
}
export function slices() {
  if (!document) {
    return 50
  }
  return isMobile() ? 20 : 50
}
