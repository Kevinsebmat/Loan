'use client';

import { useState, useCallback } from 'react';
import { useLoanStore } from '@/lib/store';
import ProgressIndicator from './ProgressIndicator';
import PersonalInfoStep from './PersonalInfoStep';
import EmploymentStep from './EmploymentStep';
import LoanDetailsStep from './LoanDetailsStep';
import ReviewStep from './ReviewStep';

const steps = [
  'Personal Information',
  'Employment & Income',
  'Loan Details',
  'Review & Submit'
];

const LoanApplication = () => {
  const { application, setStep, markComplete, resetApplication } = useLoanStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = useCallback(() => {
    const nextStep = Math.min(application.step + 1, 4);
    setStep(nextStep);
  }, [application.step, setStep]);

  const handleBack = useCallback(() => {
    const prevStep = Math.max(application.step - 1, 1);
    setStep(prevStep);
  }, [application.step, setStep]);

  const handleSubmit = useCallback(() => {
    markComplete();
    setIsSubmitted(true);
  }, [markComplete]);

  const handleReset = useCallback(() => {
    resetApplication();
    setIsSubmitted(false);
  }, [resetApplication]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for submitting your loan application. We have received your information and will review it shortly. 
              You will receive an email confirmation and updates on your application status.
            </p>
            <button
              onClick={handleReset}
              className="btn-primary"
            >
              Start New Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (application.step) {
      case 1:
        return <PersonalInfoStep onNext={handleNext} />;
      case 2:
        return <EmploymentStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <LoanDetailsStep onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <ReviewStep onBack={handleBack} onSubmit={handleSubmit} />;
      default:
        return <PersonalInfoStep onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Loan Application</h1>
          <p className="text-gray-600">Complete all steps to submit your loan application</p>
        </div>

        <ProgressIndicator
          currentStep={application.step}
          totalSteps={steps.length}
          steps={steps}
        />

        {renderStep()}
      </div>
    </div>
  );
};

export default LoanApplication; 