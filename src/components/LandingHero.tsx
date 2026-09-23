import React from 'react';
import { ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { DIMENSIONS_META } from '../data/dimensions';

interface LandingHeroProps {
  onStart: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStart }) => {
  const dimensionsList = Object.values(DIMENSIONS_META);

  return (
    <div className="relative overflow-hidden bg-[#101111] text-[#E6E2DA] min-h-[calc(100vh-4.5rem)] flex flex-col justify-between">
      {/* Decorative Architectural Hairlines & Background Geometry */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-[#A6824A] via-transparent to-transparent" />
        <div className="absolute top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-[#A6824A] to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A6824A] to-transparent" />
      </div>

      {/* Main Section */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16">
        {/* Subtle Editorial Top Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 border border-[#A6824A]/40 bg-[#154230]/40 px-3.5 py-1 text-xs uppercase tracking-widest text-[#E6E2DA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A6824A]" />
            <span>Diagnóstico de Maturidade Empresarial</span>
            <span className="text-[#A6824A]">·</span>
            <span className="text-[#E6E2DA]/80">Personal Trainers & Nutricionistas</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#E6E2DA] leading-[1.08] text-balance">
            RAIO-X DO <span className="italic text-[#A6824A]">NEGÓCIO</span>
          </h1>

          <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#E6E2DA]/90 font-normal leading-snug max-w-3xl mx-auto text-balance">
            Descubra o que está impedindo seu negócio de crescer com mais previsibilidade.
          </p>

          <p className="font-sans text-sm sm:text-base text-[#E6E2DA]/70 max-w-2xl mx-auto leading-relaxed">
            Um diagnóstico rápido e estratégico para identificar os principais gargalos da sua operação e
            descobrir exatamente onde você deveria concentrar seus esforços primeiro.
          </p>
        </div>

        {/* Strategic Manifesto Callout Box */}
        <div className="mt-10 mx-auto max-w-3xl border border-[#A6824A]/30 bg-[#154230]/30 p-6 sm:p-8 relative">
          <div className="absolute -top-3 left-6 bg-[#101111] px-2 text-[11px] font-sans uppercase tracking-widest text-[#A6824A]">
            Premissa Central
          </div>
          <blockquote className="font-serif text-lg sm:text-xl text-[#E6E2DA] italic text-center leading-relaxed">
            “Você pode ser excelente tecnicamente e ainda possuir um negócio desorganizado, dependente demais de você e
            difícil de escalar.”
          </blockquote>
          <p className="mt-3 text-center text-xs text-[#E6E2DA]/60 font-sans tracking-wide uppercase">
            Não é teste comportamental. É diagnóstico de maturidade de modelo e vendas.
          </p>
        </div>

        {/* Call to Action Group */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 bg-[#154230] hover:bg-[#1a533d] border border-[#A6824A] text-[#E6E2DA] px-8 sm:px-12 py-4 text-sm sm:text-base font-semibold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-[#A6824A]/10 active:scale-[0.99] cursor-pointer"
          >
            <span>Começar Diagnóstico</span>
            <ArrowRight className="w-4 h-4 text-[#A6824A] transition-transform group-hover:translate-x-1" />
          </button>

          {/* Micro Indicators */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#E6E2DA]/65 font-sans pt-2">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#A6824A]" />
              Tempo estimado: 5 minutos
            </span>
            <span className="hidden sm:inline text-[#A6824A]/40">·</span>
            <span className="inline-flex items-center gap-1.5 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A6824A]" />
              Seus dados são utilizados apenas para gerar seu diagnóstico e permitir contato estratégico.
            </span>
          </div>
        </div>

        {/* 7 Dimensions Strategic Architecture Preview */}
        <div className="mt-16 pt-12 border-t border-[#A6824A]/20">
          <div className="text-center mb-8">
            <span className="text-[11px] font-sans uppercase tracking-widest text-[#A6824A]">
              Estrutura Metodológica
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#E6E2DA] mt-1 font-semibold">
              As 7 Dimensões Avaliadas
            </h2>
            <p className="text-xs sm:text-sm text-[#E6E2DA]/60 mt-1 max-w-lg mx-auto">
              Cada etapa audita a solidez da sua operação para mapear gargalos de alta prioridade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {dimensionsList.map((dim) => (
              <div
                key={dim.id}
                className="group border border-[#A6824A]/15 bg-[#141615] p-4.5 transition-all duration-200 hover:border-[#A6824A]/50 hover:bg-[#181919]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-[#A6824A]">
                    {dim.code}
                  </span>
                  <span className="text-[10px] tracking-wider uppercase text-[#E6E2DA]/40">
                    Dimensão
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#E6E2DA] mt-1.5 group-hover:text-[#A6824A] transition-colors">
                  {dim.name}
                </h3>
                <p className="text-xs text-[#E6E2DA]/65 mt-1 leading-relaxed">
                  {dim.shortDescription}
                </p>
              </div>
            ))}

            {/* Final Highlight Card */}
            <div className="border border-[#5D1E21]/60 bg-[#5D1E21]/20 p-4.5 flex flex-col justify-center sm:col-span-2 lg:col-span-1">
              <span className="text-[10px] tracking-wider uppercase text-[#A6824A] font-semibold">
                Relatório Executivo
              </span>
              <h3 className="font-serif text-base font-semibold text-[#E6E2DA] mt-1">
                Visão Clara de Gargalos
              </h3>
              <p className="text-xs text-[#E6E2DA]/70 mt-1">
                Você receberá pontuação geral, classificação de maturidade em 5 níveis e prioridades de ação imediatas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
