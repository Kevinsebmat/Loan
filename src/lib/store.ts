import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoanApplication, PersonalInfo, EmploymentInfo, LoanDetails } from '@/types/loan';

interface LoanStore {
  // Application state
  application: LoanApplication;
  
  // Actions
  updatePersonalInfo: (data: PersonalInfo) => void;
  updateEmploymentInfo: (data: EmploymentInfo) => void;
  updateLoanDetails: (data: LoanDetails) => void;
  setStep: (step: number) => void;
  resetApplication: () => void;
  markComplete: () => void;
}

const initialApplication: LoanApplication = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    ssn: '',
  },
  employmentInfo: {
    employer: '',
    position: '',
    employmentType: 'full-time',
    monthlyIncome: 0,
    employmentDuration: 0,
    workPhone: '',
  },
  loanDetails: {
    amount: 0,
    purpose: 'personal',
    term: 12,
    collateral: false,
    collateralDescription: '',
  },
  step: 1,
  isComplete: false,
};

export const useLoanStore = create<LoanStore>()(
  persist(
    (set, get) => ({
      application: initialApplication,

      updatePersonalInfo: (data: PersonalInfo) =>
        set((state) => ({
          application: {
            ...state.application,
            personalInfo: data,
          },
        })),

      updateEmploymentInfo: (data: EmploymentInfo) =>
        set((state) => ({
          application: {
            ...state.application,
            employmentInfo: data,
          },
        })),

      updateLoanDetails: (data: LoanDetails) =>
        set((state) => ({
          application: {
            ...state.application,
            loanDetails: data,
          },
        })),

      setStep: (step: number) =>
        set((state) => ({
          application: {
            ...state.application,
            step,
          },
        })),

      resetApplication: () =>
        set({
          application: initialApplication,
        }),

      markComplete: () =>
        set((state) => ({
          application: {
            ...state.application,
            isComplete: true,
          },
        })),
    }),
    {
      name: 'loan-application-storage',
      partialize: (state) => ({ application: state.application }),
    }
  )
); 