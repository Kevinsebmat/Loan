'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employmentInfoSchema, EmploymentInfoFormData } from '@/lib/schemas';
import { useLoanStore } from '@/lib/store';

interface EmploymentStepProps {
  onNext: () => void;
  onBack: () => void;
}

const EmploymentStep = ({ onNext, onBack }: EmploymentStepProps) => {
  const { application, updateEmploymentInfo } = useLoanStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmploymentInfoFormData>({
    resolver: zodResolver(employmentInfoSchema),
    defaultValues: application.employmentInfo,
    mode: 'onChange',
  });

  const onSubmit = (data: EmploymentInfoFormData) => {
    updateEmploymentInfo(data);
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Employment & Income</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="employer" className="block text-sm font-medium text-gray-700 mb-2">
                Employer Name *
              </label>
              <input
                {...register('employer')}
                type="text"
                id="employer"
                className="input-field"
                placeholder="Enter your employer name"
              />
              {errors.employer && (
                <p className="error-message">{errors.employer.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                Position/Title *
              </label>
              <input
                {...register('position')}
                type="text"
                id="position"
                className="input-field"
                placeholder="Enter your job title"
              />
              {errors.position && (
                <p className="error-message">{errors.position.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type *
            </label>
            <select
              {...register('employmentType')}
              id="employmentType"
              className="input-field"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="self-employed">Self-employed</option>
              <option value="unemployed">Unemployed</option>
            </select>
            {errors.employmentType && (
              <p className="error-message">{errors.employmentType.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Income ($) *
              </label>
              <input
                {...register('monthlyIncome', { valueAsNumber: true })}
                type="number"
                id="monthlyIncome"
                className="input-field"
                placeholder="0"
                min="0"
                step="0.01"
              />
              {errors.monthlyIncome && (
                <p className="error-message">{errors.monthlyIncome.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="employmentDuration" className="block text-sm font-medium text-gray-700 mb-2">
                Employment Duration (months) *
              </label>
              <input
                {...register('employmentDuration', { valueAsNumber: true })}
                type="number"
                id="employmentDuration"
                className="input-field"
                placeholder="0"
                min="0"
              />
              {errors.employmentDuration && (
                <p className="error-message">{errors.employmentDuration.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="workPhone" className="block text-sm font-medium text-gray-700 mb-2">
              Work Phone Number *
            </label>
            <input
              {...register('workPhone')}
              type="tel"
              id="workPhone"
              className="input-field"
              placeholder="Enter your work phone number"
            />
            {errors.workPhone && (
              <p className="error-message">{errors.workPhone.message}</p>
            )}
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

export default EmploymentStep; 