import React, { useState } from 'react';
import {
  ArrowRight,
  RotateCcw,
  Share2,
  ExternalLink,
  AlertTriangle,
  Compass,
} from 'lucide-react';
import { MATURITY_LEVELS } from '../utils/calculator';
import { DiagnosisResult } from '../types';
import { ShareModal } from './ShareModal';

interface ResultReportProps {
  diagnosis: DiagnosisResult;
  onRestart: () => void;
}

export const ResultReport: React.FC<ResultReportProps> = ({ diagnosis, onRestart }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const STRATEGIC_CALL_URL = 'https://bit.ly/diagnostico-quantum-gratuito';
  const isPersonal = diagnosis.profession === 'personal_trainer';

  return (
    <div className="min-h-screen bg-[#101111] text-[#E6E2DA] py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Top Notification / Title */}
      <div className="mx-auto max-w-4xl text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 border border-[#A6824A]/40 bg-[#154230]/40 px-3.5 py-1 text-xs uppercase tracking-widest text-[#E6E2DA]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A6824A]" />
          <span>Relatório de Maturidade Empresarial</span>
          <span className="text-[#A6824A]">·</span>
          <span>{isPersonal ? 'Personal Trainer' : 'Nutricionista'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#E6E2DA] leading-tight">
          SEU DIAGNÓSTICO ESTÁ PRONTO.
        </h1>

        <p className="text-sm text-[#E6E2DA]/70 max-w-xl mx-auto">
          Análise confidencial preparada para <strong className="text-[#E6E2DA]">{diagnosis.user.name}</strong>.
          Identificamos os pontos críticos que travam sua escala e previsibilidade.
        </p>
      </div>

      {/* 01. SEU NÍVEL DE MATURIDADE & PONTUAÇÃO */}
      <div className="mx-auto max-w-4xl border border-[#A6824A]/40 bg-[#141615] p-6 sm:p-10 relative shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#154230]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-8">
          {/* Header of Score Card */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#A6824A]/20 pb-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#A6824A] font-semibold">
                Classificação Oficial
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#E6E2DA] tracking-wide">
                {diagnosis.maturityLevel.title.toUpperCase()}
              </h2>
              <p className="text-xs sm:text-sm text-[#E6E2DA]/70 italic">
                “{diagnosis.maturityLevel.tagline}”
              </p>
            </div>

            <div className="sm:text-right">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#A6824A] tabular-nums">
                {diagnosis.totalScore} <span className="text-sm text-[#E6E2DA]/50 font-sans font-normal">/ 80 pts</span>
              </div>
              <span className="text-[11px] text-[#E6E2DA]/50 uppercase tracking-widest font-mono">
                Índice de Maturidade ({diagnosis.percentage}%)
              </span>
            </div>
          </div>

          {/* Description of the Level */}
          <p className="text-sm text-[#E6E2DA]/85 leading-relaxed font-sans max-w-3xl">
            {diagnosis.maturityLevel.description}
          </p>

          {/* Editorial Gauge / 5 Maturity Tiers Bar */}
          <div className="space-y-3 pt-2">
            <div className="text-[10px] uppercase tracking-widest text-[#E6E2DA]/60 flex justify-between">
              <span>Escala de Maturidade Empresarial</span>
              <span className="text-[#A6824A] font-mono font-medium">Nível {diagnosis.maturityLevel.level} de 5</span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {MATURITY_LEVELS.map((tier) => {
                const isActive = tier.level === diagnosis.maturityLevel.level;
                const isPassed = tier.level <= diagnosis.maturityLevel.level;

                return (
                  <div key={tier.level} className="space-y-1.5">
                    <div
                      className={`h-2 sm:h-2.5 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#A6824A] shadow-md shadow-[#A6824A]/20'
                          : isPassed
                          ? 'bg-[#154230]'
                          : 'bg-[#191B1A]'
                      }`}
                    />
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider font-mono text-center truncate">
                      <span className={isActive ? 'text-[#A6824A] font-bold' : 'text-[#E6E2DA]/40'}>
                        {tier.title.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 02. RESUMO EXECUTIVO */}
      <div className="mx-auto max-w-4xl border-l-2 border-[#A6824A] bg-[#154230]/20 p-6 sm:p-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#A6824A] font-semibold flex items-center gap-2">
          <Compass className="w-3.5 h-3.5" />
          O que seu diagnóstico mostra
        </span>
        <blockquote className="font-serif text-lg sm:text-xl text-[#E6E2DA] leading-relaxed italic">
          “{diagnosis.executiveSummary}”
        </blockquote>
      </div>

      {/* 03. PRINCIPAIS GARGALOS */}
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-1 border-b border-[#A6824A]/20 pb-4">
          <span className="text-xs uppercase tracking-widest text-[#A6824A] font-medium">
            Diagnóstico de Restrições
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#E6E2DA]">
            SEUS 3 PRINCIPAIS GARGALOS
          </h2>
          <p className="text-xs text-[#E6E2DA]/65">
            Os três pontos estruturais que mais drenam energia, limitam a margem e travam o crescimento do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {diagnosis.topBottlenecks.map((bottleneck) => {
            const isHigh = bottleneck.impactLevel === 'Alto Impacto';
            const isMedium = bottleneck.impactLevel === 'Impacto Moderado';

            return (
              <div
                key={bottleneck.dimensionId}
                className={`p-6 border flex flex-col justify-between space-y-4 relative ${
                  isHigh
                    ? 'border-[#5D1E21] bg-[#5D1E21]/20 shadow-lg'
                    : isMedium
                    ? 'border-[#A6824A]/40 bg-[#141615]'
                    : 'border-[#A6824A]/25 bg-[#141615]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-[#A6824A] font-mono">
                      0{bottleneck.orderNumber}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 font-mono ${
                        isHigh
                          ? 'border border-[#5D1E21] text-[#E6E2DA] bg-[#5D1E21]'
                          : 'border border-[#A6824A]/30 text-[#A6824A]'
                      }`}
                    >
                      {bottleneck.impactLevel}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#E6E2DA] leading-snug">
                    {bottleneck.dimensionName.toUpperCase()}
                  </h3>

                  <p className="text-xs text-[#E6E2DA]/85 font-medium leading-relaxed">
                    “{bottleneck.headline}”
                  </p>

                  <p className="text-xs text-[#E6E2DA]/65 leading-relaxed">
                    {bottleneck.diagnosticText}
                  </p>
                </div>

                <div className="border-t border-[#A6824A]/15 pt-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#A6824A] font-medium block mb-1">
                    Consequência Operacional:
                  </span>
                  <p className="text-xs text-[#E6E2DA]/70 italic">
                    {bottleneck.consequence}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 04. MATRIZ VISUAL: VISÃO GERAL DO SEU NEGÓCIO (7 DIMENSÕES) */}
      <div className="mx-auto max-w-4xl border border-[#A6824A]/30 bg-[#141615] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#A6824A]/20 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A6824A] font-medium">
              Auditoria de Maturidade
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#E6E2DA]">
              VISÃO GERAL DO SEU NEGÓCIO
            </h2>
          </div>
          <span className="text-xs text-[#E6E2DA]/50 font-mono">
            Avaliação comparativa das 7 dimensões
          </span>
        </div>

        {/* Editorial Horizontal Bars */}
        <div className="space-y-4 pt-2">
          {diagnosis.sortedDimensionScores.map((dim) => {
            const isLowest = dim.percentage <= 40;
            return (
              <div key={dim.dimensionId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#A6824A]">{dim.code}</span>
                    <span className="font-serif text-sm font-medium text-[#E6E2DA]">
                      {dim.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#E6E2DA]/50">
                      {dim.score} / {dim.maxScore} pts
                    </span>
                    <span
                      className={`text-xs font-mono tabular-nums font-semibold w-10 text-right ${
                        isLowest ? 'text-[#E6E2DA]' : 'text-[#A6824A]'
                      }`}
                    >
                      {dim.percentage}%
                    </span>
                  </div>
                </div>

                {/* Editorial Bar Track */}
                <div className="h-2 w-full bg-[#101111] border border-[#A6824A]/20 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ease-out ${
                      isLowest
                        ? 'bg-[#5D1E21]'
                        : dim.percentage <= 65
                        ? 'bg-[#A6824A]'
                        : 'bg-[#154230]'
                    }`}
                    style={{ width: `${Math.max(dim.percentage, 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-end gap-5 text-[11px] text-[#E6E2DA]/60 pt-3 border-t border-[#A6824A]/15 font-mono">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#5D1E21]" /> Gargalo Crítico (&le; 40%)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#A6824A]" /> Em Desenvolvimento (41% - 65%)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#154230]" /> Estruturado (&gt; 65%)
          </span>
        </div>
      </div>

      {/* 05. PRIORIDADE DE AÇÃO */}
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-1 border-b border-[#A6824A]/20 pb-4">
          <span className="text-xs uppercase tracking-widest text-[#A6824A] font-medium">
            Direcionamento Tático
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#E6E2DA]">
            POR ONDE COMEÇAR
          </h2>
          <p className="text-xs text-[#E6E2DA]/65">
            Sequência recomendada de intervenção para destravar os maiores entraves da sua rotina profissional.
          </p>
        </div>

        <div className="space-y-4">
          {diagnosis.priorities.map((item) => (
            <div
              key={item.orderNumber}
              className="border border-[#A6824A]/30 bg-[#141615] p-6 space-y-4 hover:border-[#A6824A]/60 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-[#A6824A]/15 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-serif font-bold text-xs uppercase tracking-widest bg-[#154230] text-[#A6824A] px-2.5 py-1 border border-[#A6824A]/30 font-mono">
                    Prioridade 0{item.orderNumber}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#E6E2DA]">
                    {item.title}
                  </h3>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#E6E2DA]/50 hidden sm:block font-mono">
                  {item.targetDimension}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Problema */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#A6824A] font-semibold block">
                    Problema Diagnosticado:
                  </span>
                  <p className="text-[#E6E2DA]/80 leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                {/* Consequência */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#5D1E21] font-semibold block">
                    Consequência no Caixa:
                  </span>
                  <p className="text-[#E6E2DA]/70 leading-relaxed">
                    {item.consequence}
                  </p>
                </div>

                {/* Direção da Solução */}
                <div className="space-y-1 bg-[#101111] p-3 border border-[#A6824A]/20">
                  <span className="text-[10px] uppercase tracking-wider text-[#A6824A] font-semibold block">
                    Direção da Solução:
                  </span>
                  <p className="text-[#E6E2DA] font-medium leading-relaxed">
                    {item.solutionDirection}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 06. CONVERSÃO / CTA FINAL */}
      <div className="mx-auto max-w-4xl border-2 border-[#A6824A] bg-[#154230]/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative">
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#A6824A] font-semibold font-mono">
            Próximo Passo Estratégico
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6E2DA] leading-tight">
            QUER ENTENDER COMO CORRIGIR ESSES GARGALOS?
          </h2>
          <p className="text-sm sm:text-base text-[#E6E2DA]/80 leading-relaxed">
            Seu diagnóstico mostra onde estão os principais pontos de atenção. Em uma conversa estratégica,
            podemos analisar seu cenário e identificar quais mudanças fazem mais sentido para o seu negócio.
          </p>
        </div>

        {/* Buttons Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={STRATEGIC_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#A6824A] hover:bg-[#876735] text-[#101111] px-8 sm:px-10 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-xl cursor-pointer"
          >
            <span>Quero uma Análise Estratégica</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => setShowShareModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#A6824A] text-[#E6E2DA] hover:bg-[#A6824A]/10 px-6 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#A6824A]" />
            <span>Compartilhar Diagnóstico</span>
          </button>
        </div>

        {/* Restart diagnostic link */}
        <div className="pt-2">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 text-xs text-[#E6E2DA]/50 hover:text-[#A6824A] uppercase tracking-wider transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refazer Diagnóstico</span>
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal diagnosis={diagnosis} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};
