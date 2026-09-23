import React, { useState } from 'react';
import { Copy, Check, X, Share2 } from 'lucide-react';
import { DiagnosisResult } from '../types';

interface ShareModalProps {
  diagnosis: DiagnosisResult;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ diagnosis, onClose }) => {
  const [copied, setCopied] = useState(false);

  const professionLabel =
    diagnosis.profession === 'personal_trainer' ? 'Personal Trainer' : 'Nutricionista';
  const mainBottleneck = diagnosis.topBottlenecks[0]?.dimensionName || 'Modelo de Negócio';

  const shareText = `📊 RAIO-X DO NEGÓCIO — Relatório de Maturidade
Profissional: ${diagnosis.user.name} (${professionLabel})
Nível de Maturidade: ${diagnosis.maturityLevel.title.toUpperCase()}
Pontuação: ${diagnosis.totalScore}/80
Principal Gargalo: ${mainBottleneck}

Faça seu diagnóstico gratuito em: https://bit.ly/diagnostico-quantum-gratuito`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101111]/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg border border-[#A6824A]/40 bg-[#141615] p-6 sm:p-8 relative shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#E6E2DA]/60 hover:text-[#A6824A] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5">
          <span className="text-[10px] uppercase tracking-widest text-[#A6824A] font-medium">
            Cartão Executivo de Diagnóstico
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#E6E2DA]">
            Compartilhar Resultado
          </h3>
          <p className="text-xs text-[#E6E2DA]/60">
            Resumo executivo sem dados confidenciais de contato, pronto para publicação ou envio.
          </p>
        </div>

        {/* Shareable Card Visual Preview */}
        <div className="border border-[#A6824A] bg-[#101111] p-6 sm:p-8 space-y-6 relative overflow-hidden">
          {/* Subtle watermarked framing */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#154230]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5D1E21]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Bar */}
          <div className="flex items-center justify-between border-b border-[#A6824A]/20 pb-4">
            <div>
              <span className="font-serif text-lg font-bold tracking-wider text-[#E6E2DA] uppercase block">
                Raio-X do Negócio
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#A6824A] font-mono">
                Diagnóstico de Maturidade Empresarial
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-[#A6824A] block">
                {diagnosis.totalScore} / 80 pts
              </span>
              <span className="text-[9px] uppercase text-[#E6E2DA]/50">
                Índice Geral
              </span>
            </div>
          </div>

          {/* User & Persona */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#E6E2DA]/50 block">
              Profissional Diagnosticado
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-xl font-bold text-[#E6E2DA]">
                {diagnosis.user.name}
              </span>
              <span className="text-xs border border-[#A6824A]/40 px-2 py-0.5 text-[#A6824A] uppercase tracking-wider font-mono">
                {professionLabel}
              </span>
            </div>
          </div>

          {/* Maturity Classification */}
          <div className="border-t border-[#A6824A]/15 pt-4 space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#A6824A] block">
              Nível de Maturidade da Operação
            </span>
            <p className="font-serif text-xl font-bold text-[#E6E2DA] uppercase tracking-wide">
              {diagnosis.maturityLevel.title}
            </p>
            <p className="text-xs text-[#E6E2DA]/70 italic leading-relaxed">
              “{diagnosis.maturityLevel.tagline}”
            </p>
          </div>

          {/* Primary Bottleneck Callout */}
          <div className="border border-[#5D1E21] bg-[#5D1E21]/20 p-3.5 space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#A6824A] font-semibold block">
              Gargalo Prioritário Identificado
            </span>
            <p className="text-sm font-serif font-bold text-[#E6E2DA]">
              {diagnosis.topBottlenecks[0]?.dimensionName.toUpperCase()}
            </p>
            <p className="text-xs text-[#E6E2DA]/75">
              {diagnosis.topBottlenecks[0]?.headline}
            </p>
          </div>

          {/* Card Footer */}
          <div className="border-t border-[#A6824A]/20 pt-3 flex items-center justify-between text-[9px] text-[#E6E2DA]/50 font-mono">
            <span>© 2026 Ciro dos Santos</span>
            <span>bit.ly/diagnostico-quantum-gratuito</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleCopy}
            className="w-full inline-flex items-center justify-center gap-2.5 bg-[#154230] hover:bg-[#1a533d] border border-[#A6824A] text-[#E6E2DA] py-3.5 text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#A6824A]" />
                <span>Resumo Copiado para a Área de Transferência!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#A6824A]" />
                <span>Copiar Resumo em Texto</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="w-full inline-flex items-center justify-center gap-2 border border-[#A6824A]/30 text-[#E6E2DA]/70 hover:text-[#E6E2DA] hover:border-[#A6824A] py-3 text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Salvar como PDF / Imprimir Relatório</span>
          </button>
        </div>
      </div>
    </div>
  );
};
