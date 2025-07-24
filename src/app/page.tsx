import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/LoadingSpinner';

// Dynamic import for performance optimization
const LoanApplication = dynamic(() => import('@/components/LoanApplication'), {
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-600">Loading application...</p>
      </div>
    </div>
  ),
  ssr: false, // Disable SSR for Zustand store
});

export default function Home() {
  return <LoanApplication />;
} 