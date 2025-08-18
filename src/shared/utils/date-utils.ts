export const isDateExpired = (date: string | Date): boolean => {
  return new Date(date) < new Date();
};

export const getDaysUntilExpiration = (date: string | Date): number => {
  const expDate = new Date(date);
  const now = new Date();
  const diffTime = expDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getExpirationStatus = (date: string | Date): string => {
  const days = getDaysUntilExpiration(date);
  
  if (days < 0) return 'Vencido';
  if (days <= 7) return 'Vence pronto';
  if (days <= 30) return 'Próximo a vencer';
  return 'Vigente';
};