export function isE164Phone(value: string): boolean {
  return /^\+[1-9]\d{7,14}$/.test(value.trim());
}
