'use client';

import { memo } from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressIndicator = memo(({ currentStep, totalSteps, steps }: ProgressIndicatorProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
          Step {currentStep} of {totalSteps}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      
      <div className="relative">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 shadow-lg ${
                    index + 1 < currentStep
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/30'
                      : index + 1 === currentStep
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/30 animate-pulse'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 shadow-gray-300/30 dark:shadow-gray-600/30'
                  }`}
                >
                  {index + 1 < currentStep ? '✓' : index + 1}
                </div>
                <span
                  className={`text-xs mt-3 text-center transition-colors duration-300 font-medium ${
                    index + 1 <= currentStep ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {step}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                    index + 1 < currentStep 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator; 