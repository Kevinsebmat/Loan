'use client';

import { useState } from 'react';
import { useLoanStore } from '@/lib/store';
import { memo } from 'react';

const FloatingActionButton = memo(() => {
  const { application, setStep } = useLoanStore();
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      label: 'Save Progress',
      icon: '💾',
      action: () => {
        // This would typically save to a backend
        alert('Progress saved!');
      },
    },
    {
      label: 'Print Application',
      icon: '🖨️',
      action: () => {
        window.print();
      },
    },
    {
      label: 'Export PDF',
      icon: '📄',
      action: () => {
        alert('PDF export feature coming soon!');
      },
    },
    {
      label: 'Help',
      icon: '❓',
      action: () => {
        alert('Need help? Contact support at support@loanapp.com');
      },
    },
  ];

  const stepLabels = [
    'Personal Info',
    'Employment',
    'Loan Details',
    'Review',
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Quick Actions Menu */}
      {isOpen && (
        <div className="mb-4 space-y-2">
          {quickActions.map((action, index) => (
            <button
              key={action.label}
              onClick={action.action}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <span className="text-lg">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Step Navigation */}
      {isOpen && (
        <div className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Quick Navigation
          </h3>
          <div className="space-y-1">
            {stepLabels.map((label, index) => (
              <button
                key={label}
                onClick={() => setStep(index + 1)}
                disabled={index + 1 > application.step}
                className={`w-full text-left px-3 py-1 rounded text-sm transition-all duration-200 ${
                  index + 1 === application.step
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : index + 1 < application.step
                    ? 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                    : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                {index + 1 < application.step ? '✓ ' : ''}
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Quick actions"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
});

FloatingActionButton.displayName = 'FloatingActionButton';

export default FloatingActionButton; 