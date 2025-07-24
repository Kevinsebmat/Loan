'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loanDetailsSchema, LoanDetailsFormData } from '@/lib/schemas';
import { useLoanStore } from '@/lib/store';

interface LoanDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

const LoanDetailsStep = ({ onNext, onBack }: LoanDetailsStepProps) => {
  const { application, updateLoanDetails } = useLoanStore();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoanDetailsFormData>({
    resolver: zodResolver(loanDetailsSchema),
    defaultValues: application.loanDetails,
    mode: 'onChange',
  });

  const collateral = useWatch({
    control,
    name: 'collateral',
  });

  const onSubmit = (data: LoanDetailsFormData) => {
    updateLoanDetails(data);
    onNext();
  };

  const loanPurposes = [
    { value: 'home-purchase', label: 'Home Purchase' },
    { value: 'home-improvement', label: 'Home Improvement' },
    { value: 'debt-consolidation', label: 'Debt Consolidation' },
    { value: 'business', label: 'Business' },
    { value: 'personal', label: 'Personal' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Loan Details</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount ($) *
              </label>
              <input
                {...register('amount', { valueAsNumber: true })}
                type="number"
                id="amount"
                className="input-field"
                placeholder="0"
                min="1000"
                max="1000000"
                step="1000"
              />
              {errors.amount && (
                <p className="error-message">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (months) *
              </label>
              <input
                {...register('term', { valueAsNumber: true })}
                type="number"
                id="term"
                className="input-field"
                placeholder="12"
                min="12"
                max="360"
              />
              {errors.term && (
                <p className="error-message">{errors.term.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
              Loan Purpose *
            </label>
            <select
              {...register('purpose')}
              id="purpose"
              className="input-field"
            >
              {loanPurposes.map((purpose) => (
                <option key={purpose.value} value={purpose.value}>
                  {purpose.label}
                </option>
              ))}
            </select>
            {errors.purpose && (
              <p className="error-message">{errors.purpose.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center mb-4">
              <input
                {...register('collateral')}
                type="checkbox"
                id="collateral"
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              />
              <label htmlFor="collateral" className="ml-2 text-sm font-medium text-gray-700">
                I will provide collateral for this loan
              </label>
            </div>
            {errors.collateral && (
              <p className="error-message">{errors.collateral.message}</p>
            )}
          </div>

          {collateral && (
            <div>
              <label htmlFor="collateralDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Collateral Description *
              </label>
              <textarea
                {...register('collateralDescription')}
                id="collateralDescription"
                rows={3}
                className="input-field"
                placeholder="Describe the collateral you will provide (e.g., vehicle, property, etc.)"
              />
              {errors.collateralDescription && (
                <p className="error-message">{errors.collateralDescription.message}</p>
              )}
            </div>
          )}

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onBack}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanDetailsStep; 