'use client';

import { useState, useCallback } from 'react';
import { useLoanStore } from '@/lib/store';
import ProgressIndicator from './ProgressIndicator';
import PersonalInfoStep from './PersonalInfoStep';
import EmploymentStep from './EmploymentStep';
import LoanDetailsStep from './LoanDetailsStep';
import ReviewStep from './ReviewStep';
import ThemeToggle from './ThemeToggle';
import ProgressCelebration from './ProgressCelebration';

const LoanApplication = () => {
  const { application, setStep } = useLoanStore();
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationStep, setCelebrationStep] = useState(0);
  const [showFinalConfetti, setShowFinalConfetti] = useState(false);

  const handleNext = useCallback(() => {
    if (application.step < 4) {
      // Show celebration for steps 1-3
      setCelebrationStep(application.step);
      setShowCelebration(true);
      
      // Move to next step after a short delay
      setTimeout(() => {
        setStep(application.step + 1);
      }, 500);
    } else {
      // Final submission
      setShowFinalConfetti(true);
      setTimeout(() => {
        // Mark as complete in store
        useLoanStore.getState().markComplete();
      }, 1000);
    }
  }, [application.step, setStep]);

  const handlePrevious = useCallback(() => {
    if (application.step > 1) {
      setStep(application.step - 1);
    }
  }, [application.step, setStep]);

  const handleCelebrationComplete = useCallback(() => {
    setShowCelebration(false);
  }, []);

  const renderStep = () => {
    switch (application.step) {
      case 1:
        return <PersonalInfoStep onNext={handleNext} />;
      case 2:
        return <EmploymentStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <LoanDetailsStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <ReviewStep onNext={handleNext} onPrevious={handlePrevious} />;
      default:
        return null;
    }
  };

  // Show final success screen
  if (application.isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center animate-bounce-in">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
              Application Submitted!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for your loan application. We'll review your information and get back to you within 2-3 business days.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Application received</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span>Under review</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Decision notification</span>
              </div>
            </div>
            <button
              onClick={() => {
                useLoanStore.getState().resetApplication();
                setShowFinalConfetti(false);
              }}
              className="mt-6 btn-primary w-full"
            >
              Start New Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-8">
            Loan Application
          </h1>
          
          <ProgressIndicator 
            currentStep={application.step} 
            totalSteps={4}
            steps={['Personal Information', 'Employment & Income', 'Loan Details', 'Review & Submit']}
          />
          
          <div className="mt-8 step-container">
            {renderStep()}
          </div>
        </div>
      </div>

      {/* Step completion celebration */}
      <ProgressCelebration
        step={celebrationStep}
        isVisible={showCelebration}
        onComplete={handleCelebrationComplete}
      />

      {/* Final submission confetti */}
      {showFinalConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {/* Enhanced confetti for final submission */}
          {Array.from({ length: 120 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: Math.random() * window.innerWidth,
                top: -20,
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'][Math.floor(Math.random() * 8)],
                width: 6 + Math.random() * 8,
                height: 6 + Math.random() * 8,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanApplication; 