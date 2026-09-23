import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Activity, Apple } from 'lucide-react';
import { Persona } from '../types';

interface PersonaSelectorProps {
  onSelectPersona: (persona: Persona) => void;
  onBack: () => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  onSelectPersona,
  onBack,
}) => {
  const [selected, setSelected] = useState<Persona | null>(null);

  const handleContinue = () => {
    if (selected) {
      onSelectPersona(selected);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-[#101111] text-[#E6E2DA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-10">
        {/* Back and Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E6E2DA]/60 hover:text-[#A6824A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar</span>
          </button>
          <span className="text-xs uppercase tracking-widest text-[#A6824A]/70 font-mono">
            Etapa 01 de 03 · Perfil
          </span>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#E6E2DA]">
            QUAL DESCREVE MELHOR O SEU NEGÓCIO?
          </h2>
          <p className="text-sm text-[#E6E2DA]/70 max-w-lg mx-auto">
            A escolha calibrará a linguagem, os exemplos e a análise dos gargalos para a realidade da sua profissão.
          </p>
        </div>

        {/* Two Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Card 1: Personal Trainer */}
          <div
            onClick={() => setSelected('personal_trainer')}
            className={`cursor-pointer group relative p-8 border transition-all duration-200 select-none ${
              selected === 'personal_trainer'
                ? 'border-[#A6824A] bg-[#154230]/40 shadow-xl shadow-[#A6824A]/10 scale-[1.01]'
                : 'border-[#A6824A]/20 bg-[#141615] hover:border-[#A6824A]/60 hover:bg-[#181919]'
            }`}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between mb-6">
              <div
                className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                  selected === 'personal_trainer'
                    ? 'border-[#A6824A] text-[#A6824A] bg-[#101111]'
                    : 'border-[#A6824A]/30 text-[#E6E2DA]/70 group-hover:text-[#A6824A]'
                }`}
              >
                <Activity className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  selected === 'personal_trainer'
                    ? 'border-[#A6824A] bg-[#A6824A]'
                    : 'border-[#A6824A]/40'
                }`}
              >
                {selected === 'personal_trainer' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#101111]" />
                )}
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#E6E2DA] tracking-wide mb-2.5">
              PERSONAL TRAINER
            </h3>

            <p className="text-sm text-[#E6E2DA]/75 leading-relaxed">
              “Meu negócio é baseado principalmente em treinamento físico, atendimento individual ou
              acompanhamento de alunos.”
            </p>

            <div className="mt-6 pt-4 border-t border-[#A6824A]/15 text-[11px] uppercase tracking-wider text-[#A6824A]">
              Foco: Escala de agenda, consultoria e esteira
            </div>
          </div>

          {/* Card 2: Nutricionista */}
          <div
            onClick={() => setSelected('nutricionista')}
            className={`cursor-pointer group relative p-8 border transition-all duration-200 select-none ${
              selected === 'nutricionista'
                ? 'border-[#A6824A] bg-[#154230]/40 shadow-xl shadow-[#A6824A]/10 scale-[1.01]'
                : 'border-[#A6824A]/20 bg-[#141615] hover:border-[#A6824A]/60 hover:bg-[#181919]'
            }`}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between mb-6">
              <div
                className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                  selected === 'nutricionista'
                    ? 'border-[#A6824A] text-[#A6824A] bg-[#101111]'
                    : 'border-[#A6824A]/30 text-[#E6E2DA]/70 group-hover:text-[#A6824A]'
                }`}
              >
                <Apple className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  selected === 'nutricionista'
                    ? 'border-[#A6824A] bg-[#A6824A]'
                    : 'border-[#A6824A]/40'
                }`}
              >
                {selected === 'nutricionista' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#101111]" />
                )}
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#E6E2DA] tracking-wide mb-2.5">
              NUTRICIONISTA
            </h3>

            <p className="text-sm text-[#E6E2DA]/75 leading-relaxed">
              “Meu negócio é baseado principalmente em consultas, acompanhamento nutricional ou programas de
              nutrição.”
            </p>

            <div className="mt-6 pt-4 border-t border-[#A6824A]/15 text-[11px] uppercase tracking-wider text-[#A6824A]">
              Foco: Retenção a longo prazo, programas e LTV
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`inline-flex items-center justify-center gap-3 px-10 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-200 ${
              selected
                ? 'bg-[#154230] hover:bg-[#1a533d] border border-[#A6824A] text-[#E6E2DA] cursor-pointer shadow-lg'
                : 'bg-[#141615] border border-[#A6824A]/20 text-[#E6E2DA]/40 cursor-not-allowed'
            }`}
          >
            <span>Continuar</span>
            <ArrowRight className="w-4 h-4 text-[#A6824A]" />
          </button>
        </div>
      </div>
    </div>
  );
};
