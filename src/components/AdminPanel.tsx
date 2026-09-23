import React, { useState } from 'react';
import {
  Download,
  Filter,
  Search,
  Trash2,
  Eye,
  FileSpreadsheet,
  FileCode,
  Users,
  TrendingUp,
  AlertOctagon,
  Database,
  ArrowLeft,
  X,
  CheckCircle,
} from 'lucide-react';
import { QUESTIONS_BANK } from '../data/questions';
import { storageService } from '../services/storageService';
import { DiagnosisResult, Persona } from '../types';

interface AdminPanelProps {
  onBackToApp: () => void;
  onViewDiagnosisDetail: (diag: DiagnosisResult) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onBackToApp,
  onViewDiagnosisDetail,
}) => {
  const [diagnoses, setDiagnoses] = useState<DiagnosisResult[]>(() =>
    storageService.getDiagnoses()
  );
  const [filterProfession, setFilterProfession] = useState<'all' | Persona>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<DiagnosisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'questions' | 'supabase'>('leads');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const stats = storageService.getStats();

  const handleRefresh = () => {
    setDiagnoses(storageService.getDiagnoses());
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Deseja realmente remover o diagnóstico de "${name}"?`)) {
      storageService.deleteDiagnosis(id);
      handleRefresh();
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
      setFeedbackMsg('Registro removido com sucesso.');
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  const handleDownloadCsv = () => {
    const csvData = storageService.exportToCsv();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `raiox_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const jsonData = storageService.exportToJson();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `raiox_database_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter diagnoses
  const filteredDiagnoses = diagnoses.filter((item) => {
    const matchesProfession =
      filterProfession === 'all' || item.profession === filterProfession;
    const matchesSearch =
      searchTerm === '' ||
      item.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.whatsapp.includes(searchTerm);

    return matchesProfession && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#101111] text-[#E6E2DA] py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Bar Navigation */}
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#A6824A]/20 pb-6">
        <div>
          <button
            onClick={onBackToApp}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#A6824A] hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Diagnóstico</span>
          </button>
          <h1 className="font-serif text-3xl font-bold text-[#E6E2DA]">
            Painel do Consultor Estratégico
          </h1>
          <p className="text-xs text-[#E6E2DA]/65">
            Gestão de Leads, Auditoria de Diagnósticos e Métricas de Maturidade.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#A6824A]/40 bg-[#141615] hover:border-[#A6824A] text-xs font-mono text-[#E6E2DA] transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#A6824A]" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#A6824A]/40 bg-[#141615] hover:border-[#A6824A] text-xs font-mono text-[#E6E2DA] transition-colors"
          >
            <FileCode className="w-3.5 h-3.5 text-[#A6824A]" />
            <span>Exportar JSON</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackMsg && (
        <div className="mx-auto max-w-6xl border border-[#A6824A] bg-[#154230]/40 p-3 text-xs text-[#E6E2DA] flex items-center gap-2 font-mono">
          <CheckCircle className="w-4 h-4 text-[#A6824A]" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="border border-[#A6824A]/25 bg-[#141615] p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#E6E2DA]/60">
            <span>Total de Leads</span>
            <Users className="w-4 h-4 text-[#A6824A]" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[#E6E2DA] tabular-nums">
            {stats.total}
          </p>
          <span className="text-[10px] text-[#A6824A] uppercase font-mono block">
            {stats.personalCount} Personais · {stats.nutriCount} Nutris
          </span>
        </div>

        <div className="border border-[#A6824A]/25 bg-[#141615] p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#E6E2DA]/60">
            <span>Pontuação Média</span>
            <TrendingUp className="w-4 h-4 text-[#A6824A]" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[#A6824A] tabular-nums">
            {stats.avgScore} <span className="text-xs text-[#E6E2DA]/40 font-normal">/ 80</span>
          </p>
          <span className="text-[10px] text-[#E6E2DA]/50 uppercase font-mono block">
            Grau de dependência média
          </span>
        </div>

        <div className="border border-[#A6824A]/25 bg-[#141615] p-4 space-y-1 col-span-2">
          <div className="flex items-center justify-between text-xs text-[#E6E2DA]/60">
            <span>Gargalo Mais Frequente</span>
            <AlertOctagon className="w-4 h-4 text-[#5D1E21]" />
          </div>
          <p className="text-xl sm:text-2xl font-serif font-bold text-[#E6E2DA] truncate">
            {stats.bottleneckFrequency[0]?.name || 'N/A'}
          </p>
          <span className="text-[10px] text-[#A6824A] uppercase font-mono block">
            Presente em {stats.bottleneckFrequency[0]?.count || 0} de {stats.total} diagnósticos
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-6xl flex border-b border-[#A6824A]/20 gap-6 text-xs uppercase tracking-widest font-mono">
        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 transition-colors ${
            activeTab === 'leads'
              ? 'border-b-2 border-[#A6824A] text-[#A6824A] font-bold'
              : 'text-[#E6E2DA]/60 hover:text-[#E6E2DA]'
          }`}
        >
          Leads Qualificados ({filteredDiagnoses.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 transition-colors ${
            activeTab === 'analytics'
              ? 'border-b-2 border-[#A6824A] text-[#A6824A] font-bold'
              : 'text-[#E6E2DA]/60 hover:text-[#E6E2DA]'
          }`}
        >
          Distribuição dos Gargalos
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`pb-3 transition-colors ${
            activeTab === 'questions'
              ? 'border-b-2 border-[#A6824A] text-[#A6824A] font-bold'
              : 'text-[#E6E2DA]/60 hover:text-[#E6E2DA]'
          }`}
        >
          Banco de Perguntas (20)
        </button>
        <button
          onClick={() => setActiveTab('supabase')}
          className={`pb-3 transition-colors ${
            activeTab === 'supabase'
              ? 'border-b-2 border-[#A6824A] text-[#A6824A] font-bold'
              : 'text-[#E6E2DA]/60 hover:text-[#E6E2DA]'
          }`}
        >
          Supabase SQL Schema
        </button>
      </div>

      {/* TAB 1: LEADS TABLE */}
      {activeTab === 'leads' && (
        <div className="mx-auto max-w-6xl space-y-4">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A6824A]" />
              <input
                type="text"
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#141615] border border-[#A6824A]/30 focus:border-[#A6824A] pl-9 pr-4 py-2 text-xs text-[#E6E2DA] placeholder-[#E6E2DA]/40 outline-none font-mono"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-[#141615] p-1 border border-[#A6824A]/25 text-xs font-mono">
              <span className="text-[10px] text-[#A6824A] uppercase px-2 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filtro:
              </span>
              <button
                onClick={() => setFilterProfession('all')}
                className={`px-2.5 py-1 transition-colors ${
                  filterProfession === 'all'
                    ? 'bg-[#154230] text-[#E6E2DA] font-bold'
                    : 'text-[#E6E2DA]/60 hover:text-[#E6E2DA]'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterProfession('personal_trainer')}
                className={`px-2.5 py-1 transition-colors ${
                  filterProfession === 'personal_trainer'
                    ? 'bg-[#154230] text-[#E6E2DA] font-bold'
                    : 'text-[#E6E2DA]/60 hover:text-[#E6E2DA]'
                }`}
              >
                Personais
              </button>
              <button
                onClick={() => setFilterProfession('nutricionista')}
                className={`px-2.5 py-1 transition-colors ${
                  filterProfession === 'nutricionista'
                    ? 'bg-[#154230] text-[#E6E2DA] font-bold'
                    : 'text-[#E6E2DA]/60 hover:text-[#E6E2DA]'
                }`}
              >
                Nutricionistas
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-[#A6824A]/25 bg-[#141615] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#A6824A]/20 bg-[#101111] text-[#A6824A] uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4">Profissional</th>
                  <th className="py-3 px-4">Contato</th>
                  <th className="py-3 px-4">Perfil</th>
                  <th className="py-3 px-4 text-center">Score</th>
                  <th className="py-3 px-4">Maturidade</th>
                  <th className="py-3 px-4">Gargalo #1</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A6824A]/10 text-[#E6E2DA]/80">
                {filteredDiagnoses.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-[#E6E2DA]/50 font-mono">
                      Nenhum diagnóstico encontrado para os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredDiagnoses.map((item) => (
                    <tr key={item.id} className="hover:bg-[#181919] transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-[#E6E2DA]/60 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-sm text-[#E6E2DA]">
                        {item.user.name}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] space-y-0.5">
                        <div className="text-[#E6E2DA]">{item.user.whatsapp}</div>
                        <div className="text-[#E6E2DA]/50 text-[10px]">{item.user.email}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="border border-[#A6824A]/30 px-2 py-0.5 text-[10px] uppercase font-mono text-[#A6824A]">
                          {item.profession === 'personal_trainer' ? 'Personal' : 'Nutri'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-sm text-[#A6824A]">
                        {item.totalScore}/80
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-serif text-xs text-[#E6E2DA]">
                          {item.maturityLevel.title}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[11px] text-[#E6E2DA]/70 font-mono">
                          {item.topBottlenecks[0]?.dimensionName || '—'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setSelectedLead(item)}
                          className="px-2 py-1 border border-[#A6824A]/40 text-[#A6824A] hover:bg-[#A6824A] hover:text-[#101111] transition-all"
                          title="Inspecionar respostas"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onViewDiagnosisDetail(item)}
                          className="px-2 py-1 border border-[#154230] text-[#E6E2DA] hover:bg-[#154230] transition-all text-[11px]"
                          title="Abrir como Relatório Oficial"
                        >
                          Relatório
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.user.name)}
                          className="px-2 py-1 border border-[#5D1E21]/50 text-[#5D1E21] hover:bg-[#5D1E21] hover:text-[#E6E2DA] transition-all"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ANALYTICS & BOTTLENECKS FREQUENCY */}
      {activeTab === 'analytics' && (
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bottlenecks Ranking */}
          <div className="border border-[#A6824A]/30 bg-[#141615] p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#E6E2DA] border-b border-[#A6824A]/20 pb-2">
              Gargalos Mais Recorrentes na Base
            </h3>
            <div className="space-y-3">
              {stats.bottleneckFrequency.map((b, idx) => {
                const percent = stats.total > 0 ? Math.round((b.count / stats.total) * 100) : 0;
                return (
                  <div key={b.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-serif text-[#E6E2DA]">
                        0{idx + 1}. {b.name}
                      </span>
                      <span className="font-mono text-[#A6824A]">
                        {b.count} ({percent}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#101111] overflow-hidden">
                      <div
                        className="h-full bg-[#A6824A]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Maturity Level Distribution */}
          <div className="border border-[#A6824A]/30 bg-[#141615] p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#E6E2DA] border-b border-[#A6824A]/20 pb-2">
              Distribuição por Nível de Maturidade
            </h3>
            <div className="space-y-3">
              {Object.entries(stats.maturityDistribution).map(([title, count]) => {
                const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={title} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-serif text-[#E6E2DA]">{title}</span>
                      <span className="font-mono text-[#A6824A]">
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#101111] overflow-hidden">
                      <div
                        className="h-full bg-[#154230]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: QUESTIONS BANK INSPECTOR */}
      {activeTab === 'questions' && (
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="border border-[#A6824A]/25 bg-[#141615] p-4">
            <h3 className="font-serif text-lg font-bold text-[#E6E2DA] mb-1">
              Estrutura das 20 Perguntas Estratégicas
            </h3>
            <p className="text-xs text-[#E6E2DA]/65">
              Distribuídas entre as 7 dimensões, com formulação adaptada dinamicamente entre Personal Trainer e Nutricionista.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {QUESTIONS_BANK.map((q) => (
              <div
                key={q.id}
                className="border border-[#A6824A]/15 bg-[#141615] p-4 space-y-2 hover:border-[#A6824A]/40 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A6824A] font-bold">
                    Q{String(q.order).padStart(2, '0')} · {q.dimension.toUpperCase()}
                  </span>
                  <span className="text-[10px] bg-[#154230] text-[#E6E2DA] px-2 py-0.5">
                    Ativa
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="border-l-2 border-[#A6824A]/40 pl-3">
                    <span className="text-[10px] uppercase font-mono text-[#A6824A] block">
                      Versão Personal Trainer:
                    </span>
                    <p className="text-[#E6E2DA]/90 font-serif text-sm mt-0.5">
                      “{q.questionText.personal_trainer}”
                    </p>
                  </div>
                  <div className="border-l-2 border-[#154230] pl-3">
                    <span className="text-[10px] uppercase font-mono text-[#E6E2DA]/60 block">
                      Versão Nutricionista:
                    </span>
                    <p className="text-[#E6E2DA]/90 font-serif text-sm mt-0.5">
                      “{q.questionText.nutricionista}”
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUPABASE SQL READY SCHEMA */}
      {activeTab === 'supabase' && (
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="border border-[#A6824A]/25 bg-[#141615] p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#A6824A]">
              <Database className="w-5 h-5" />
              <h3 className="font-serif text-xl font-bold">
                Arquitetura de Banco de Dados Supabase (PostgreSQL)
              </h3>
            </div>
            <p className="text-xs text-[#E6E2DA]/70 leading-relaxed">
              O front-end e o modelo de dados já estão 100% estruturados para conexão com o Supabase. Basta executar
              o script DDL abaixo no SQL Editor do seu projeto Supabase para criar as tabelas <code className="text-[#A6824A]">users</code> e <code className="text-[#A6824A]">diagnoses</code> com relações de chave estrangeira, restrições e índices otimizados.
            </p>

            <pre className="bg-[#101111] p-4 text-[11px] font-mono text-[#E6E2DA]/90 overflow-x-auto border border-[#A6824A]/20">
{`-- 1. TABELA DE LEADS / USUÁRIOS
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  whatsapp TEXT NOT NULL,
  profession TEXT NOT NULL CHECK (profession IN ('personal_trainer', 'nutricionista')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABELA DE DIAGNÓSTICOS DE MATURIDADE
CREATE TABLE IF NOT EXISTS public.diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  profession TEXT NOT NULL,
  total_score INTEGER NOT NULL,
  max_possible_score INTEGER NOT NULL DEFAULT 80,
  maturity_level INTEGER NOT NULL CHECK (maturity_level BETWEEN 1 AND 5),
  maturity_title TEXT NOT NULL,
  dimension_scores JSONB NOT NULL,
  top_bottlenecks JSONB NOT NULL,
  executive_summary TEXT NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ÍNDICES DE PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_diagnoses_user_id ON public.diagnoses(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnoses_profession ON public.diagnoses(profession);
CREATE INDEX IF NOT EXISTS idx_diagnoses_created_at ON public.diagnoses(created_at DESC);`}
            </pre>
          </div>
        </div>
      )}

      {/* LEAD INSPECTION MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101111]/85 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl border border-[#A6824A] bg-[#141615] p-6 sm:p-8 relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-[#E6E2DA]/60 hover:text-[#A6824A] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#A6824A] font-mono">
                Auditoria do Lead
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#E6E2DA]">
                {selectedLead.user.name}
              </h3>
              <p className="text-xs text-[#E6E2DA]/60 font-mono mt-0.5">
                {selectedLead.user.email} · {selectedLead.user.whatsapp} ·{' '}
                {selectedLead.profession === 'personal_trainer' ? 'Personal Trainer' : 'Nutricionista'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="border border-[#A6824A]/20 p-3 bg-[#101111]">
                <span className="text-[#A6824A] block">Score Total</span>
                <span className="text-lg font-bold text-[#E6E2DA]">
                  {selectedLead.totalScore} / 80 ({selectedLead.percentage}%)
                </span>
              </div>
              <div className="border border-[#A6824A]/20 p-3 bg-[#101111]">
                <span className="text-[#A6824A] block">Nível de Maturidade</span>
                <span className="text-sm font-serif font-bold text-[#E6E2DA]">
                  {selectedLead.maturityLevel.title}
                </span>
              </div>
            </div>

            {/* Top Bottlenecks */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#A6824A] font-semibold block">
                Top 3 Gargalos Identificados
              </span>
              <div className="space-y-2">
                {selectedLead.topBottlenecks.map((b) => (
                  <div key={b.dimensionId} className="border border-[#5D1E21] bg-[#5D1E21]/20 p-3 text-xs">
                    <div className="flex justify-between font-bold text-[#E6E2DA]">
                      <span>{b.orderNumber}. {b.dimensionName}</span>
                      <span className="text-[10px] font-mono text-[#A6824A]">{b.impactLevel}</span>
                    </div>
                    <p className="text-[#E6E2DA]/80 mt-1 italic leading-relaxed">
                      “{b.headline}”
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons in modal */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  onViewDiagnosisDetail(selectedLead);
                  setSelectedLead(null);
                }}
                className="px-4 py-2 bg-[#154230] border border-[#A6824A] text-xs uppercase font-mono tracking-wider text-[#E6E2DA]"
              >
                Abrir Visualização Completa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
