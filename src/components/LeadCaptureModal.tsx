import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { Persona, UserLead } from '../types';

interface LeadCaptureModalProps {
  profession: Persona;
  onSubmit: (lead: UserLead) => void;
  onBack: () => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  profession,
  onSubmit,
  onBack,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanWhatsapp = whatsapp.trim();

    if (!cleanName || cleanName.length < 2) {
      setError('Por favor, informe seu nome completo.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Por favor, informe um endereço de e-mail corporativo válido.');
      return;
    }

    const phoneDigits = cleanWhatsapp.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Por favor, informe um número de WhatsApp com DDD válido (mínimo 10 dígitos).');
      return;
    }

    const userLead: UserLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: cleanName,
      email: cleanEmail,
      whatsapp: cleanWhatsapp,
      profession,
      createdAt: new Date().toISOString(),
    };

    onSubmit(userLead);
  };

  // WhatsApp auto-formatting helper
  const handleWhatsappChange = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (raw.length <= 2) {
      setWhatsapp(raw ? `(${raw}` : '');
    } else if (raw.length <= 6) {
      setWhatsapp(`(${raw.slice(0, 2)}) ${raw.slice(2)}`);
    } else if (raw.length <= 10) {
      setWhatsapp(`(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`);
    } else {
      setWhatsapp(`(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-[#101111] text-[#E6E2DA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl border border-[#A6824A]/30 bg-[#141615] p-6 sm:p-10 shadow-2xl space-y-8 relative">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#A6824A]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#A6824A]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#A6824A]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#A6824A]" />

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 border border-[#A6824A]/40 bg-[#154230]/40 px-3 py-1 text-[10px] uppercase tracking-widest text-[#A6824A]">
            <Lock className="w-3 h-3" />
            <span>Relatório Confidencial</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E6E2DA] tracking-tight">
            SEU DIAGNÓSTICO ESTÁ CONCLUÍDO
          </h2>

          <p className="text-xs sm:text-sm text-[#E6E2DA]/70 max-w-md mx-auto leading-relaxed">
            Informe onde devemos vincular sua análise para gerar o relatório executivo completo com seus 3
            principais gargalos e prioridades.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="border border-[#5D1E21] bg-[#5D1E21]/20 p-3 text-xs text-[#E6E2DA] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A6824A]" />
            <span>{error}</span>
          </div>
        )}

        {/* Capture Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider text-[#A6824A] font-medium">
              Nome Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Dra. Mariana Costa"
              className="w-full bg-[#101111] border border-[#A6824A]/30 focus:border-[#A6824A] px-4 py-3 text-sm text-[#E6E2DA] placeholder-[#E6E2DA]/30 outline-none transition-colors"
              required
            />
          </div>

          {/* E-mail */}
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider text-[#A6824A] font-medium">
              E-mail Profissional
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: contato@seudominio.com.br"
              className="w-full bg-[#101111] border border-[#A6824A]/30 focus:border-[#A6824A] px-4 py-3 text-sm text-[#E6E2DA] placeholder-[#E6E2DA]/30 outline-none transition-colors"
              required
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider text-[#A6824A] font-medium">
              WhatsApp (com DDD)
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => handleWhatsappChange(e.target.value)}
              placeholder="Ex: (11) 98765-4321"
              maxLength={16}
              className="w-full bg-[#101111] border border-[#A6824A]/30 focus:border-[#A6824A] px-4 py-3 text-sm text-[#E6E2DA] placeholder-[#E6E2DA]/30 outline-none transition-colors font-mono"
              required
            />
          </div>

          {/* Profissão (pre-filled) */}
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider text-[#A6824A] font-medium">
              Profissão / Especialidade
            </label>
            <input
              type="text"
              readOnly
              value={profession === 'personal_trainer' ? 'Personal Trainer' : 'Nutricionista'}
              className="w-full bg-[#101111]/60 border border-[#A6824A]/20 px-4 py-3 text-sm text-[#E6E2DA]/70 cursor-not-allowed select-none"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full group bg-[#154230] hover:bg-[#1a533d] border border-[#A6824A] text-[#E6E2DA] py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:shadow-[#A6824A]/10 active:scale-[0.99]"
            >
              <span>Ver Meu Diagnóstico</span>
              <ArrowRight className="w-4 h-4 text-[#A6824A] transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Privacy Note */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-[#E6E2DA]/50 flex items-center justify-center gap-1.5 leading-relaxed">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A6824A] shrink-0" />
              Seus dados são estritamente confidenciais e utilizados apenas para gerar seu diagnóstico e contato
              estratégico.
            </p>
          </div>
        </form>

        {/* Back Link */}
        <div className="text-center pt-2">
          <button
            onClick={onBack}
            className="text-xs text-[#E6E2DA]/50 hover:text-[#A6824A] uppercase tracking-wider transition-colors"
          >
            ← Voltar e revisar respostas
          </button>
        </div>
      </div>
    </div>
  );
};
