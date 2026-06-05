export function formatDatePtBr(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR');
}

export function formatCurrencyPtBr(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

export function getInitials(name: string): string {
  return `${name.charAt(0)}${name.split(' ').length > 1 ? name.split(' ')[1].charAt(0) : ''}`;
}
