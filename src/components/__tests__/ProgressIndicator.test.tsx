import { render, screen } from '@testing-library/react';
import ProgressIndicator from '../ProgressIndicator';

describe('ProgressIndicator', () => {
  const mockSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  it('renders with correct step information', () => {
    render(
      <ProgressIndicator
        currentStep={2}
        totalSteps={4}
        steps={mockSteps}
      />
    );

    expect(screen.getByText('Step 2 of 4')).toBeInTheDocument();
    expect(screen.getByText('50% Complete')).toBeInTheDocument();
  });

  it('shows all step numbers', () => {
    render(
      <ProgressIndicator
        currentStep={1}
        totalSteps={4}
        steps={mockSteps}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('shows checkmark for completed steps', () => {
    render(
      <ProgressIndicator
        currentStep={3}
        totalSteps={4}
        steps={mockSteps}
      />
    );

    // Should show checkmarks for steps 1 and 2
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks).toHaveLength(2);
  });

  it('shows step labels', () => {
    render(
      <ProgressIndicator
        currentStep={1}
        totalSteps={4}
        steps={mockSteps}
      />
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    expect(screen.getByText('Step 4')).toBeInTheDocument();
  });

  it('calculates percentage correctly', () => {
    render(
      <ProgressIndicator
        currentStep={3}
        totalSteps={4}
        steps={mockSteps}
      />
    );

    expect(screen.getByText('75% Complete')).toBeInTheDocument();
  });
}); 