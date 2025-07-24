import { renderHook, act } from '@testing-library/react';
import { useLoanStore } from '../store';

describe('useLoanStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset store to initial state
    const { result } = renderHook(() => useLoanStore());
    act(() => {
      result.current.resetApplication();
    });
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useLoanStore());

    expect(result.current.application.step).toBe(1);
    expect(result.current.application.isComplete).toBe(false);
    expect(result.current.application.personalInfo.firstName).toBe('');
    expect(result.current.application.employmentInfo.employer).toBe('');
    expect(result.current.application.loanDetails.amount).toBe(0);
  });

  it('updates personal info correctly', () => {
    const { result } = renderHook(() => useLoanStore());

    const personalInfo = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      dateOfBirth: '1990-01-01',
      ssn: '123-45-6789',
    };

    act(() => {
      result.current.updatePersonalInfo(personalInfo);
    });

    expect(result.current.application.personalInfo.firstName).toBe('John');
    expect(result.current.application.personalInfo.lastName).toBe('Doe');
    expect(result.current.application.personalInfo.email).toBe('john@example.com');
  });

  it('updates employment info correctly', () => {
    const { result } = renderHook(() => useLoanStore());

    const employmentInfo = {
      employer: 'Tech Corp',
      position: 'Developer',
      employmentType: 'full-time' as const,
      monthlyIncome: 5000,
      employmentDuration: 24,
      workPhone: '987-654-3210',
    };

    act(() => {
      result.current.updateEmploymentInfo(employmentInfo);
    });

    expect(result.current.application.employmentInfo.employer).toBe('Tech Corp');
    expect(result.current.application.employmentInfo.monthlyIncome).toBe(5000);
  });

  it('updates loan details correctly', () => {
    const { result } = renderHook(() => useLoanStore());

    const loanDetails = {
      amount: 50000,
      purpose: 'home-purchase' as const,
      term: 360,
      collateral: true,
      collateralDescription: 'House property',
    };

    act(() => {
      result.current.updateLoanDetails(loanDetails);
    });

    expect(result.current.application.loanDetails.amount).toBe(50000);
    expect(result.current.application.loanDetails.collateral).toBe(true);
  });

  it('changes step correctly', () => {
    const { result } = renderHook(() => useLoanStore());

    act(() => {
      result.current.setStep(3);
    });

    expect(result.current.application.step).toBe(3);
  });

  it('marks application as complete', () => {
    const { result } = renderHook(() => useLoanStore());

    act(() => {
      result.current.markComplete();
    });

    expect(result.current.application.isComplete).toBe(true);
  });

  it('resets application to initial state', () => {
    const { result } = renderHook(() => useLoanStore());

    // First, update some data
    act(() => {
      result.current.updatePersonalInfo({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        dateOfBirth: '1990-01-01',
        ssn: '123-45-6789',
      });
      result.current.setStep(3);
      result.current.markComplete();
    });

    // Then reset
    act(() => {
      result.current.resetApplication();
    });

    expect(result.current.application.step).toBe(1);
    expect(result.current.application.isComplete).toBe(false);
    expect(result.current.application.personalInfo.firstName).toBe('');
  });
}); 