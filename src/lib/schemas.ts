import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().length(2, 'Please enter a valid 2-letter state code'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18 && age <= 100;
  }, 'You must be at least 18 years old'),
  ssn: z.string().regex(/^\d{3}-?\d{2}-?\d{4}$/, 'Please enter a valid SSN (XXX-XX-XXXX)'),
});

export const employmentInfoSchema = z.object({
  employer: z.string().min(2, 'Employer name must be at least 2 characters'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  employmentType: z.enum(['full-time', 'part-time', 'self-employed', 'unemployed']),
  monthlyIncome: z.number().min(0, 'Monthly income must be a positive number'),
  employmentDuration: z.number().min(0, 'Employment duration must be a positive number'),
  workPhone: z.string().regex(/^\+?[\d\s\-\(\)]{10,}$/, 'Please enter a valid work phone number'),
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