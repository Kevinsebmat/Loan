'use client';

import { useEffect, useState } from 'react';
import { memo } from 'react';

interface ProgressCelebrationProps {
  step: number;
  isVisible: boolean;
  onComplete: () => void;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  size: number;
  rotation: number;
  velocity: { x: number; y: number };
  gravity: number;
}

const ProgressCelebration = memo(({ step, isVisible, onComplete }: ProgressCelebrationProps) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // yellow
    '#ef4444', // red
    '#8b5cf6', // purple
    '#06b6d4', // cyan
    '#f97316', // orange
    '#ec4899', // pink
  ];

  const shapes = ['circle', 'square', 'triangle'] as const;

  useEffect(() => {
    if (isVisible) {
      // Create confetti pieces
      const newConfetti: ConfettiPiece[] = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: 4 + Math.random() * 8,
        rotation: Math.random() * 360,
        velocity: {
          x: (Math.random() - 0.5) * 8,
          y: Math.random() * 3 + 2,
        },
        gravity: 0.1 + Math.random() * 0.2,
      }));

      setConfetti(newConfetti);
      setShowMessage(true);

      // Animate confetti
      const animateConfetti = () => {
        setConfetti(prev => 
          prev.map(piece => ({
            ...piece,
            x: piece.x + piece.velocity.x,
            y: piece.y + piece.velocity.y,
            velocity: {
              x: piece.velocity.x * 0.99,
              y: piece.velocity.y + piece.gravity,
            },
            rotation: piece.rotation + 2,
          })).filter(piece => piece.y < window.innerHeight + 50)
        );
      };

      const animationInterval = setInterval(animateConfetti, 16);

      // Clean up after 3 seconds
      const cleanupTimer = setTimeout(() => {
        clearInterval(animationInterval);
        setShowMessage(false);
        setConfetti([]);
        onComplete();
      }, 3000);

      return () => {
        clearInterval(animationInterval);
        clearTimeout(cleanupTimer);
      };
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const renderConfettiShape = (piece: ConfettiPiece) => {
    const style = {
      left: piece.x,
      top: piece.y,
      backgroundColor: piece.color,
      width: piece.size,
      height: piece.size,
      transform: `rotate(${piece.rotation}deg)`,
      position: 'absolute' as const,
      borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'triangle' ? '0' : '2px',
    };

    if (piece.shape === 'triangle') {
      return (
        <div
          key={piece.id}
          style={{
            ...style,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderLeft: `${piece.size / 2}px solid transparent`,
            borderRight: `${piece.size / 2}px solid transparent`,
            borderBottom: `${piece.size}px solid ${piece.color}`,
          }}
        />
      );
    }

    return <div key={piece.id} style={style} />;
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Confetti pieces */}
      {confetti.map(renderConfettiShape)}

      {/* Celebration message */}
      {showMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700 animate-bounce-in">
            <div className="text-4xl mb-2 animate-bounce">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Great Progress!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              You've completed step {step} of 4
            </p>
            <div className="mt-3 flex justify-center space-x-1">
              {[1, 2, 3, 4].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-2 h-2 rounded-full ${
                    stepNum <= step
                      ? 'bg-green-500 animate-pulse'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Background overlay with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-900/20 dark:to-purple-900/20 animate-pulse" />
    </div>
  );
});

ProgressCelebration.displayName = 'ProgressCelebration';

export default ProgressCelebration; 