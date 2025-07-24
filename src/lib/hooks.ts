import { useMemo } from 'react';
import { useLoanStore } from './store';

export const useFormValidation = (step: number) => {
  const { application } = useLoanStore();
  
  return useMemo(() => {
    switch (step) {
      case 1:
        return {
          isValid: !!(
            application.personalInfo.firstName &&
            application.personalInfo.lastName &&
            application.personalInfo.email &&
            application.personalInfo.phone &&
            application.personalInfo.address &&
            application.personalInfo.city &&
            application.personalInfo.state &&
            application.personalInfo.zipCode &&
            application.personalInfo.dateOfBirth &&
            application.personalInfo.ssn
          ),
          missingFields: []
        };
      case 2:
        return {
          isValid: !!(
            application.employmentInfo.employer &&
            application.employmentInfo.position &&
            application.employmentInfo.monthlyIncome > 0 &&
            application.employmentInfo.employmentDuration >= 0 &&
            application.employmentInfo.workPhone
          ),
          missingFields: []
        };
      case 3:
        return {
          isValid: !!(
            application.loanDetails.amount >= 1000 &&
            application.loanDetails.amount <= 1000000 &&
            application.loanDetails.term >= 12 &&
            application.loanDetails.term <= 360 &&
            application.loanDetails.purpose
          ),
          missingFields: []
        };
      default:
        return { isValid: false, missingFields: [] };
    }
  }, [application, step]);
};

export const useStepNavigation = () => {
  const { application, setStep } = useLoanStore();
  
  const canGoNext = useMemo(() => {
    const { isValid } = useFormValidation(application.step);
    return isValid && application.step < 4;
  }, [application.step]);
  
  const canGoBack = useMemo(() => {
    return application.step > 1;
  }, [application.step]);
  
  const goNext = () => {
    if (canGoNext) {
      setStep(application.step + 1);
    }
  };
  
  const goBack = () => {
    if (canGoBack) {
      setStep(application.step - 1);
    }
  };
  
  return {
    canGoNext,
    canGoBack,
    goNext,
    goBack,
    currentStep: application.step
  };
}; 