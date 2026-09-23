import React, { useState } from 'react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [modalType, setModalType] = useState<'privacidade' | 'termos' | 'contato' | null>(null);

  return (
    <>
      <footer className="w-full border-t border-[#A6824A]/20 bg-[#101111] text-[#E6E2DA] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Identity & Subtitle */}
          <div className="space-y-1.5">
            <p className="font-serif text-lg font-semibold tracking-wider text-[#E6E2DA] uppercase">
              Raio-X do Negócio
            </p>
            <p className="text-xs text-[#E6E2DA]/65 tracking-wide max-w-md">
              Diagnóstico estratégico para Personal Trainers e Nutricionistas.
            </p>
          </div>

          {/* Clean Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#E6E2DA]/70 font-sans tracking-wide">
            <button
              onClick={() => setModalType('privacidade')}
              className="hover:text-[#A6824A] transition-colors"
            >
              Privacidade
            </button>
            <span className="text-[#A6824A]/30">·</span>
            <button
              onClick={() => setModalType('termos')}
              className="hover:text-[#A6824A] transition-colors"
            >
              Termos
            </button>
            <span className="text-[#A6824A]/30">·</span>
            <button
              onClick={() => setModalType('contato')}
              className="hover:text-[#A6824A] transition-colors"
            >
              Contato
            </button>
            {onOpenAdmin && (
              <>
                <span className="text-[#A6824A]/30">·</span>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-[#A6824A] transition-colors text-[#A6824A]/90"
                >
                  Gestão & Leads
                </button>
              </>
            )}
          </div>

          {/* Copyright */}
          <div className="text-xs text-[#E6E2DA]/50 tracking-wider">
            © 2026 Ciro dos Santos
          </div>
        </div>
      </footer>

      {/* Simple Institutional Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101111]/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg border border-[#A6824A]/40 bg-[#141615] p-6 sm:p-8 rounded-none shadow-2xl relative">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-[#E6E2DA]/60 hover:text-[#A6824A] text-lg font-mono"
            >
              ✕
            </button>

            {modalType === 'privacidade' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-[#A6824A]">Política de Privacidade</h3>
                <p className="text-sm text-[#E6E2DA]/80 leading-relaxed">
                  Os dados informados durante o diagnóstico do <strong>Raio-X do Negócio</strong> (nome, e-mail,
                  WhatsApp e respostas) são utilizados exclusivamente para gerar sua análise executiva personalizada
                  e viabilizar o alinhamento estratégico com nossa equipe de consultoria. Não comercializamos nem
                  compartilhamos informações com terceiros.
                </p>
                <button
                  onClick={() => setModalType(null)}
                  className="mt-4 px-4 py-2 border border-[#A6824A] text-xs uppercase tracking-widest text-[#A6824A] hover:bg-[#A6824A] hover:text-[#101111] transition-all"
                >
                  Entendido
                </button>
              </div>
            )}

            {modalType === 'termos' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-[#A6824A]">Termos de Uso</h3>
                <p className="text-sm text-[#E6E2DA]/80 leading-relaxed">
                  O Raio-X do Negócio é uma ferramenta metodológica de diagnóstico empresarial desenvolvida para fins de
                  orientação e qualificação executiva. Os índices e níveis de maturidade refletem as respostas
                  fornecidas e não constituem garantia expressa de faturamento financeiro.
                </p>
                <button
                  onClick={() => setModalType(null)}
                  className="mt-4 px-4 py-2 border border-[#A6824A] text-xs uppercase tracking-widest text-[#A6824A] hover:bg-[#A6824A] hover:text-[#101111] transition-all"
                >
                  Entendido
                </button>
              </div>
            )}

            {modalType === 'contato' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-[#A6824A]">Contato & Consultoria</h3>
                <p className="text-sm text-[#E6E2DA]/80 leading-relaxed">
                  Para dúvidas corporativas, mentorias individuais ou suporte sobre o diagnóstico:
                </p>
                <div className="border-t border-[#A6824A]/20 pt-3 text-xs space-y-1 text-[#E6E2DA]/70 font-mono">
                  <p>Mentoria & Gestão Estratégica: Ciro dos Santos</p>
                  <p>Canal de Sessões Estratégicas: https://bit.ly/diagnostico-quantum-gratuito</p>
                </div>
                <button
                  onClick={() => setModalType(null)}
                  className="mt-4 px-4 py-2 border border-[#A6824A] text-xs uppercase tracking-widest text-[#A6824A] hover:bg-[#A6824A] hover:text-[#101111] transition-all"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
