export function maskPhone(value: string | null | undefined): string {
  if (!value) return '—';
  const normalized = value.replace(/\s/g, '');
  if (normalized.length <= 5) return '•••••';
  return `${normalized.slice(0, 5)}${'•'.repeat(Math.max(5, normalized.length - 7))}${normalized.slice(-2)}`;
}
