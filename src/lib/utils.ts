// Phone number formatting utility
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '');
  
  // Format based on length
  if (digitsOnly.length <= 3) {
    return digitsOnly;
  } else if (digitsOnly.length <= 6) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
  } else {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
  }
};

// Validate phone number format
export const isValidPhoneNumber = (phone: string): boolean => {
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it's a valid US phone number (10 or 11 digits)
  if (digitsOnly.length === 10) {
    return true; // Standard 10-digit number
  }
  
  if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return true; // 11-digit number starting with 1 (country code)
  }
  
  return false;
};

// Get phone number error message
export const getPhoneErrorMessage = (phone: string): string | null => {
  if (!phone) return 'Phone number is required';
  
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length < 10) {
    return 'Phone number must be at least 10 digits';
  }
  
  if (digitsOnly.length > 11) {
    return 'Phone number is too long';
  }
  
  if (digitsOnly.length === 11 && !digitsOnly.startsWith('1')) {
    return 'Invalid country code';
  }
  
  return null;
}; 