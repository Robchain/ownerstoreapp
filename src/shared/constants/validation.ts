export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  EMAIL: 'Ingresa un email válido',
  MIN_LENGTH: (min: number) => `Debe tener al menos ${min} caracteres`,
  MAX_LENGTH: (max: number) => `No puede exceder ${max} caracteres`,
  URL: 'Ingresa una URL válida',
  PHONE: 'Ingresa un teléfono válido',
} as const;

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  URL: /^https?:\/\/.+/,
} as const;