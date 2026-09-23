import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface ProcessingStepProps {
  onComplete: () => void;
}

const STEPS = [
  'Analisando posicionamento...',
  'Analisando modelo de negócio...',
  'Analisando processo comercial...',
  'Analisando retenção...',
  'Consolidando diagnóstico...',
];

export const ProcessingStep: React.FC<ProcessingStepProps> = ({ onComplete }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 550);

    return () => clearInterval(interval);
  }, [onComplete]);

  const progressPercentage = Math.round(((activeStepIndex + 1) / STEPS.length) * 100);

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-[#101111] text-[#E6E2DA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl text-center space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <span className="inline-block text-[11px] uppercase tracking-widest text-[#A6824A] font-medium">
            Inteligência Estratégica
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#E6E2DA]">
            ANALISANDO SEU NEGÓCIO
          </h2>
          <p className="text-xs sm:text-sm text-[#E6E2DA]/70 max-w-md mx-auto">
            Estamos cruzando suas respostas para identificar os principais pontos de atenção.
          </p>
        </div>

        {/* Central Geometric Spinner & Percentage */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          {/* Subtle Outer Ring */}
          <div className="absolute inset-0 border border-[#A6824A]/20 rounded-full" />

          {/* Animated Gold Ring Accent */}
          <div className="absolute inset-0 border-2 border-[#A6824A] border-t-transparent border-r-transparent rounded-full animate-spin duration-1000" />

          {/* Inner Static Monogram / Counter */}
          <div className="flex flex-col items-center justify-center">
            <span className="font-mono text-2xl font-bold text-[#A6824A] tabular-nums">
              {progressPercentage}%
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#E6E2DA]/50">Processando</span>
          </div>
        </div>

        {/* Step-by-Step Microsteps List */}
        <div className="mx-auto max-w-sm space-y-2 text-left">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;

            return (
              <div
                key={step}
                className={`flex items-center justify-between p-2.5 border transition-all duration-300 ${
                  isCurrent
                    ? 'border-[#A6824A] bg-[#154230]/30 text-[#E6E2DA]'
                    : isCompleted
                    ? 'border-[#A6824A]/20 bg-[#141615] text-[#E6E2DA]/80'
                    : 'border-transparent text-[#E6E2DA]/25'
                }`}
              >
                <div className="flex items-center gap-3 text-xs tracking-wide">
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] transition-colors ${
                      isCompleted
                        ? 'border-[#A6824A] bg-[#A6824A] text-[#101111]'
                        : isCurrent
                        ? 'border-[#A6824A] text-[#A6824A]'
                        : 'border-[#E6E2DA]/20 text-[#E6E2DA]/20'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                  </span>
                  <span className={isCurrent ? 'font-medium' : ''}>{step}</span>
                </div>

                {isCurrent && (
                  <span className="inline-block w-2 h-2 rounded-full bg-[#A6824A] animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-[#E6E2DA]/40 uppercase tracking-widest font-mono">
          Cruzando matriz de 7 dimensões empresariais
        </p>
      </div>
    </div>
  );
};
