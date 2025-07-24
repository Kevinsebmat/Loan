'use client';

import { useLoanStore } from '@/lib/store';
import { memo } from 'react';

interface ReviewStepProps {
  onBack: () => void;
  onSubmit: () => void;
}

const ReviewStep = memo(({ onBack, onSubmit }: ReviewStepProps) => {
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Review & Submit</h2>
        
        <div className="space-y-8">
          {/* Personal Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Full Name</span>
                <p className="text-gray-800">{application.personalInfo.firstName} {application.personalInfo.lastName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Email</span>
                <p className="text-gray-800">{application.personalInfo.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Phone</span>
                <p className="text-gray-800">{application.personalInfo.phone}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Date of Birth</span>
                <p className="text-gray-800">{formatDate(application.personalInfo.dateOfBirth)}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm font-medium text-gray-500">Address</span>
                <p className="text-gray-800">
                  {application.personalInfo.address}<br />
                  {application.personalInfo.city}, {application.personalInfo.state} {application.personalInfo.zipCode}
                </p>
              </div>
            </div>
          </div>

          {/* Employment Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Employment & Income</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Employer</span>
                <p className="text-gray-800">{application.employmentInfo.employer}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Position</span>
                <p className="text-gray-800">{application.employmentInfo.position}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Employment Type</span>
                <p className="text-gray-800">{formatEmploymentType(application.employmentInfo.employmentType)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Monthly Income</span>
                <p className="text-gray-800">{formatCurrency(application.employmentInfo.monthlyIncome)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Employment Duration</span>
                <p className="text-gray-800">{application.employmentInfo.employmentDuration} months</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Work Phone</span>
                <p className="text-gray-800">{application.employmentInfo.workPhone}</p>
              </div>
            </div>
          </div>

          {/* Loan Details Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Loan Amount</span>
                <p className="text-gray-800">{formatCurrency(application.loanDetails.amount)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Loan Term</span>
                <p className="text-gray-800">{application.loanDetails.term} months</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Loan Purpose</span>
                <p className="text-gray-800">{formatPurpose(application.loanDetails.purpose)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Collateral</span>
                <p className="text-gray-800">{application.loanDetails.collateral ? 'Yes' : 'No'}</p>
              </div>
              {application.loanDetails.collateral && application.loanDetails.collateralDescription && (
                <div className="md:col-span-2">
                  <span className="text-sm font-medium text-gray-500">Collateral Description</span>
                  <p className="text-gray-800">{application.loanDetails.collateralDescription}</p>
                </div>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 mt-1"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I certify that all information provided in this application is true and accurate to the best of my knowledge. 
                I understand that providing false information may result in the denial of my loan application and potential legal consequences.
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onSubmit}
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