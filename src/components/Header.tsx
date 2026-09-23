import React from 'react';
import { AppScreen } from '../types';

interface HeaderProps {
  currentScreen: AppScreen;
  onNavigateHome: () => void;
  onOpenAdmin: () => void;
  questionProgress?: {
    current: number;
    total: number;
    percent: number;
  };
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigateHome,
  onOpenAdmin,
  questionProgress,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#A6824A]/20 bg-[#101111]/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Zone - Single line wordmark and quiet classification */}
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="group flex flex-col text-left transition-opacity hover:opacity-90"
            title="Ir para o início"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#E6E2DA] uppercase">
              Raio-X do Negócio
            </span>
            <span className="text-[10px] tracking-widest text-[#A6824A] uppercase font-sans font-medium">
              Diagnóstico de Maturidade Empresarial
            </span>
          </button>
        </div>

        {/* Dynamic Center / Right Progress or Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          {currentScreen === 'quiz' && questionProgress && (
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs font-medium tracking-wide text-[#E6E2DA]/70 font-sans">
                Pergunta {String(questionProgress.current).padStart(2, '0')} de {questionProgress.total}
              </span>
              <span className="text-[#A6824A]/40">·</span>
              <span className="text-xs font-semibold tabular-nums text-[#A6824A] font-sans">
                {questionProgress.percent}% concluído
              </span>
            </div>
          )}

          {/* Strategic Admin / Backoffice shortcut */}
          <button
            onClick={onOpenAdmin}
            className={`text-xs font-medium tracking-wide transition-colors ${
              currentScreen === 'admin'
                ? 'text-[#A6824A] underline underline-offset-4'
                : 'text-[#E6E2DA]/60 hover:text-[#A6824A]'
            }`}
          >
            {currentScreen === 'admin' ? '← Voltar ao Início' : 'Área do Consultor'}
          </button>
        </div>
      </div>
    </header>
  );
};
