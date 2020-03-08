export function beautifyCashValue(labelValue) {
  // Nine Zeroes for Billions
  // Math.abs(Number(labelValue)) >= 1.0e+9

  // Six Zeroes for Millions
  return Math.abs(Number(labelValue)) >= 1.0e6
    ? Math.floor(Math.abs(Number(labelValue)) / 1.0e6) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Math.floor(Math.abs(Number(labelValue)) / 1.0e3) + 'K'
    : Math.floor(Math.abs(Number(labelValue)))
}
