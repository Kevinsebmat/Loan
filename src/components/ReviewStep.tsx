'use client';

import { useLoanStore } from '@/lib/store';
import { memo } from 'react';

interface ReviewStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const ReviewStep = memo(({ onNext, onPrevious }: ReviewStepProps) => {
  const { application } = useLoanStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPurpose = (purpose: string) => {
    return purpose.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatEmploymentType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-6">Review & Submit</h2>
        
        <div className="space-y-8">
          {/* Personal Information Section */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</span>
                <p className="text-gray-800 dark:text-gray-200">{application.personalInfo.firstName} {application.personalInfo.lastName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</span>
                <p className="text-gray-800 dark:text-gray-200">{application.personalInfo.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</span>
                <p className="text-gray-800 dark:text-gray-200">{application.personalInfo.phone}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</span>
                <p className="text-gray-800 dark:text-gray-200">{formatDate(application.personalInfo.dateOfBirth)}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</span>
                <p className="text-gray-800 dark:text-gray-200">
                  {application.personalInfo.address}<br />
                  {application.personalInfo.city}, {application.personalInfo.state} {application.personalInfo.zipCode}
                </p>
              </div>
            </div>
          </div>

          {/* Employment Information Section */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Employment & Income</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Employer</span>
                <p className="text-gray-800 dark:text-gray-200">{application.employmentInfo.employer}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Position</span>
                <p className="text-gray-800 dark:text-gray-200">{application.employmentInfo.position}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Employment Type</span>
                <p className="text-gray-800 dark:text-gray-200">{formatEmploymentType(application.employmentInfo.employmentType)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Income</span>
                <p className="text-gray-800 dark:text-gray-200">{formatCurrency(application.employmentInfo.monthlyIncome)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Employment Duration</span>
                <p className="text-gray-800 dark:text-gray-200">{application.employmentInfo.employmentDuration} months</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Work Phone</span>
                <p className="text-gray-800 dark:text-gray-200">{application.employmentInfo.workPhone}</p>
              </div>
            </div>
          </div>

          {/* Loan Details Section */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Loan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Loan Amount</span>
                <p className="text-gray-800 dark:text-gray-200">{formatCurrency(application.loanDetails.amount)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Loan Purpose</span>
                <p className="text-gray-800 dark:text-gray-200">{formatPurpose(application.loanDetails.purpose)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Loan Term</span>
                <p className="text-gray-800 dark:text-gray-200">{application.loanDetails.term} months</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Collateral</span>
                <p className="text-gray-800 dark:text-gray-200">{application.loanDetails.collateral ? 'Yes' : 'No'}</p>
              </div>
              {application.loanDetails.collateral && application.loanDetails.collateralDescription && (
                <div className="md:col-span-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Collateral Description</span>
                  <p className="text-gray-800 dark:text-gray-200">{application.loanDetails.collateralDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-8">
          <button
            type="button"
            onClick={onPrevious}
            className="btn-secondary"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="btn-primary"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
});

ReviewStep.displayName = 'ReviewStep';

export default ReviewStep; 