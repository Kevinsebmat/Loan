export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  ssn: string;
}

export interface EmploymentInfo {
  employer: string;
  position: string;
  employmentType: 'full-time' | 'part-time' | 'self-employed' | 'unemployed';
  monthlyIncome: number;
  employmentDuration: number; // in months
  workPhone: string;
}

export interface LoanDetails {
  amount: number;
  purpose: 'home-purchase' | 'home-improvement' | 'debt-consolidation' | 'business' | 'personal' | 'education' | 'other';
  term: number; // in months
  collateral: boolean;
  collateralDescription?: string;
}

export interface LoanApplication {
  personalInfo: PersonalInfo;
  employmentInfo: EmploymentInfo;
  loanDetails: LoanDetails;
  step: number;
  isComplete: boolean;
} 