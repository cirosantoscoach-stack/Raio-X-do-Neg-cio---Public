import { calculateDiagnosis } from '../utils/calculator';
import { DiagnosisResult, Persona, UserLead } from '../types';

const STORAGE_KEY = 'raiox_negocio_diagnoses_v1';

/**
 * SQL SCHEMA FOR SUPABASE / POSTGRESQL PRODUCTION:
 * 
 * -- Users table
 * CREATE TABLE IF NOT EXISTS public.users (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   name TEXT NOT NULL,
 *   email TEXT NOT NULL UNIQUE,
 *   whatsapp TEXT NOT NULL,
 *   profession TEXT NOT NULL CHECK (profession IN ('personal_trainer', 'nutricionista')),
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 * 
 * -- Diagnoses table
 * CREATE TABLE IF NOT EXISTS public.diagnoses (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
 *   profession TEXT NOT NULL,
 *   total_score INTEGER NOT NULL,
 *   max_possible_score INTEGER NOT NULL DEFAULT 80,
 *   maturity_level INTEGER NOT NULL CHECK (maturity_level BETWEEN 1 AND 5),
 *   maturity_title TEXT NOT NULL,
 *   dimension_scores JSONB NOT NULL,
 *   top_bottlenecks JSONB NOT NULL,
 *   executive_summary TEXT NOT NULL,
 *   answers JSONB NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 * 
 * -- Indexes
 * CREATE INDEX idx_diagnoses_user_id ON public.diagnoses(user_id);
 * CREATE INDEX idx_diagnoses_profession ON public.diagnoses(profession);
 * CREATE INDEX idx_diagnoses_created_at ON public.diagnoses(created_at DESC);
 */

// Initial seed data to give the consultant / admin immediate rich analytics
const SEED_DATA: DiagnosisResult[] = [
  calculateDiagnosis(
    {
      id: 'lead_seed_1',
      name: 'Rodrigo Medeiros',
      email: 'rodrigo.personal@exemplo.com.br',
      whatsapp: '(11) 98765-4321',
      profession: 'personal_trainer',
      createdAt: '2026-03-20T14:30:00.000Z',
    },
    {
      pos_1: { value: 'frequentemente', score: 1 },
      pos_2: { value: 'as_vezes', score: 2 },
      pos_3: { value: 'frequentemente', score: 1 },
      mod_1: { value: 'sempre', score: 0 },
      mod_2: { value: 'sempre', score: 0 },
      mod_3: { value: 'sempre', score: 0 },
      aqui_1: { value: 'frequentemente', score: 1 },
      aqui_2: { value: 'as_vezes', score: 2 },
      aqui_3: { value: 'frequentemente', score: 1 },
      com_1: { value: 'sempre', score: 0 },
      com_2: { value: 'frequentemente', score: 1 },
      com_3: { value: 'as_vezes', score: 2 },
      est_1: { value: 'sempre', score: 0 },
      est_2: { value: 'frequentemente', score: 1 },
      est_3: { value: 'sempre', score: 0 },
      ret_1: { value: 'frequentemente', score: 1 },
      ret_2: { value: 'as_vezes', score: 2 },
      ret_3: { value: 'frequentemente', score: 1 },
      ges_1: { value: 'as_vezes', score: 2 },
      ges_2: { value: 'frequentemente', score: 1 },
    }
  ),
  calculateDiagnosis(
    {
      id: 'lead_seed_2',
      name: 'Dra. Camila Vasconcelos',
      email: 'camila.nutri@clinica.com.br',
      whatsapp: '(21) 99876-1234',
      profession: 'nutricionista',
      createdAt: '2026-03-21T10:15:00.000Z',
    },
    {
      pos_1: { value: 'as_vezes', score: 2 },
      pos_2: { value: 'raramente', score: 3 },
      pos_3: { value: 'as_vezes', score: 2 },
      mod_1: { value: 'frequentemente', score: 1 },
      mod_2: { value: 'frequentemente', score: 1 },
      mod_3: { value: 'frequentemente', score: 1 },
      aqui_1: { value: 'sempre', score: 0 },
      aqui_2: { value: 'frequentemente', score: 1 },
      aqui_3: { value: 'frequentemente', score: 1 },
      com_1: { value: 'as_vezes', score: 2 },
      com_2: { value: 'frequentemente', score: 1 },
      com_3: { value: 'as_vezes', score: 2 },
      est_1: { value: 'as_vezes', score: 2 },
      est_2: { value: 'raramente', score: 3 },
      est_3: { value: 'frequentemente', score: 1 },
      ret_1: { value: 'sempre', score: 0 },
      ret_2: { value: 'sempre', score: 0 },
      ret_3: { value: 'frequentemente', score: 1 },
      ges_1: { value: 'raramente', score: 3 },
      ges_2: { value: 'as_vezes', score: 2 },
    }
  ),
  calculateDiagnosis(
    {
      id: 'lead_seed_3',
      name: 'Lucas Brandão',
      email: 'lucas.trainer@fit.com.br',
      whatsapp: '(31) 97654-8901',
      profession: 'personal_trainer',
      createdAt: '2026-03-22T16:45:00.000Z',
    },
    {
      pos_1: { value: 'raramente', score: 3 },
      pos_2: { value: 'raramente', score: 3 },
      pos_3: { value: 'raramente', score: 3 },
      mod_1: { value: 'as_vezes', score: 2 },
      mod_2: { value: 'as_vezes', score: 2 },
      mod_3: { value: 'as_vezes', score: 2 },
      aqui_1: { value: 'as_vezes', score: 2 },
      aqui_2: { value: 'raramente', score: 3 },
      aqui_3: { value: 'as_vezes', score: 2 },
      com_1: { value: 'raramente', score: 3 },
      com_2: { value: 'raramente', score: 3 },
      com_3: { value: 'as_vezes', score: 2 },
      est_1: { value: 'raramente', score: 3 },
      est_2: { value: 'raramente', score: 3 },
      est_3: { value: 'as_vezes', score: 2 },
      ret_1: { value: 'raramente', score: 3 },
      ret_2: { value: 'raramente', score: 3 },
      ret_3: { value: 'as_vezes', score: 2 },
      ges_1: { value: 'nunca', score: 4 },
      ges_2: { value: 'raramente', score: 3 },
    }
  ),
];

export const storageService = {
  getDiagnoses(): DiagnosisResult[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
        return SEED_DATA;
      }
      return JSON.parse(raw);
    } catch {
      return SEED_DATA;
    }
  },

  saveDiagnosis(diagnosis: DiagnosisResult): void {
    const list = this.getDiagnoses();
    // Prepend new diagnosis
    const updated = [diagnosis, ...list.filter((d) => d.id !== diagnosis.id)];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save diagnosis to localStorage', e);
    }
  },

  getDiagnosisById(id: string): DiagnosisResult | null {
    const list = this.getDiagnoses();
    return list.find((d) => d.id === id) || null;
  },

  deleteDiagnosis(id: string): void {
    const list = this.getDiagnoses();
    const updated = list.filter((d) => d.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete diagnosis', e);
    }
  },

  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
  },

  exportToCsv(): string {
    const list = this.getDiagnoses();
    const headers = [
      'ID',
      'Data',
      'Nome',
      'Email',
      'WhatsApp',
      'Profissão',
      'Pontuação Total',
      'Nível de Maturidade',
      'Gargalo 1',
      'Gargalo 2',
      'Gargalo 3',
    ];

    const rows = list.map((item) => {
      const b1 = item.topBottlenecks[0]?.dimensionName || '';
      const b2 = item.topBottlenecks[1]?.dimensionName || '';
      const b3 = item.topBottlenecks[2]?.dimensionName || '';
      return [
        `"${item.id}"`,
        `"${new Date(item.createdAt).toLocaleDateString('pt-BR')}"`,
        `"${item.user.name.replace(/"/g, '""')}"`,
        `"${item.user.email}"`,
        `"${item.user.whatsapp}"`,
        `"${item.profession === 'personal_trainer' ? 'Personal Trainer' : 'Nutricionista'}"`,
        `"${item.totalScore}/80"`,
        `"${item.maturityLevel.title}"`,
        `"${b1}"`,
        `"${b2}"`,
        `"${b3}"`,
      ].join(';');
    });

    return [headers.join(';'), ...rows].join('\n');
  },

  exportToJson(): string {
    const list = this.getDiagnoses();
    return JSON.stringify(list, null, 2);
  },

  getStats() {
    const list = this.getDiagnoses();
    const total = list.length;
    if (total === 0) {
      return {
        total: 0,
        avgScore: 0,
        personalCount: 0,
        nutriCount: 0,
        bottleneckFrequency: [] as { name: string; count: number }[],
        maturityDistribution: {} as Record<string, number>,
      };
    }

    const totalScores = list.reduce((acc, curr) => acc + curr.totalScore, 0);
    const avgScore = Math.round(totalScores / total);
    const personalCount = list.filter((d) => d.profession === 'personal_trainer').length;
    const nutriCount = list.filter((d) => d.profession === 'nutricionista').length;

    // Bottlenecks frequency
    const bottleneckMap: Record<string, number> = {};
    const maturityMap: Record<string, number> = {};

    list.forEach((diag) => {
      const topName = diag.topBottlenecks[0]?.dimensionName || 'Outro';
      bottleneckMap[topName] = (bottleneckMap[topName] || 0) + 1;

      const matTitle = diag.maturityLevel.title;
      maturityMap[matTitle] = (maturityMap[matTitle] || 0) + 1;
    });

    const bottleneckFrequency = Object.entries(bottleneckMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      total,
      avgScore,
      personalCount,
      nutriCount,
      bottleneckFrequency,
      maturityDistribution: maturityMap,
    };
  },
};
