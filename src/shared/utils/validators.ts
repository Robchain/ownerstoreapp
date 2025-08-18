import { VALIDATION_RULES } from "../constants";

export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION_RULES.PHONE.test(phone);
};

export const validateUrl = (url: string): boolean => {
  return VALIDATION_RULES.URL.test(url);
};

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};