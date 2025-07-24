import { z } from 'zod';

// Phone number validation function
const validatePhoneNumber = (phone: string) => {
  // Remove all non-digit characters
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

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .refine(validatePhoneNumber, 'Please enter a valid phone number (e.g., 555-123-4567 or (555) 123-4567)'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().length(2, 'Please enter a valid 2-letter state code'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18 && age <= 100;
  }, 'You must be at least 18 years old'),
});

export const employmentInfoSchema = z.object({
  employer: z.string().min(2, 'Employer name must be at least 2 characters'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  employmentType: z.enum(['full-time', 'part-time', 'self-employed', 'unemployed']),
  monthlyIncome: z.number().min(0, 'Monthly income must be a positive number'),
  employmentDuration: z.number().min(0, 'Employment duration must be a positive number'),
  workPhone: z.string()
    .min(10, 'Work phone number must be at least 10 digits')
    .refine(validatePhoneNumber, 'Please enter a valid work phone number (e.g., 555-123-4567 or (555) 123-4567)'),
});

export const loanDetailsSchema = z.object({
  amount: z.number().min(1000, 'Loan amount must be at least $1,000').max(1000000, 'Loan amount cannot exceed $1,000,000'),
  purpose: z.enum(['home-purchase', 'home-improvement', 'debt-consolidation', 'business', 'personal', 'education', 'other']),
  term: z.number().min(12, 'Loan term must be at least 12 months').max(360, 'Loan term cannot exceed 360 months'),
  collateral: z.boolean(),
  collateralDescription: z.string().optional().refine((val) => {
    // If collateral is true, description is required
    return !val || val.length > 0;
  }, 'Collateral description is required when collateral is provided'),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type EmploymentInfoFormData = z.infer<typeof employmentInfoSchema>;
export type LoanDetailsFormData = z.infer<typeof loanDetailsSchema>; 