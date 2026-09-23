export type Persona = 'personal_trainer' | 'nutricionista';

export type DimensionId =
  | 'posicionamento'
  | 'modelo_negocio'
  | 'aquisicao'
  | 'processo_comercial'
  | 'esteira_servicos'
  | 'retencao'
  | 'gestao_indicadores';

export type AnswerValue = 'sempre' | 'frequentemente' | 'as_vezes' | 'raramente' | 'nunca';

export interface AnswerOptionConfig {
  value: AnswerValue;
  label: string;
  score: number; // 0 for Sempre, 1 for Frequentemente, 2 for Às vezes, 3 for Raramente, 4 for Nunca
  description: string;
}

export interface Question {
  id: string;
  dimension: DimensionId;
  order: number;
  questionText: {
    personal_trainer: string;
    nutricionista: string;
  };
  contextNote?: {
    personal_trainer: string;
    nutricionista: string;
  };
  active: boolean;
}

export interface DimensionMeta {
  id: DimensionId;
  code: string; // '01', '02', etc.
  name: string;
  shortDescription: string;
}

export interface DimensionScore {
  dimensionId: DimensionId;
  code: string;
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface BottleneckDetail {
  dimensionId: DimensionId;
  dimensionName: string;
  orderNumber: number;
  impactLevel: 'Alto Impacto' | 'Impacto Moderado' | 'Ponto de Atenção';
  headline: string;
  diagnosticText: string;
  consequence: string;
}

export interface PriorityAction {
  orderNumber: number;
  title: string;
  targetDimension: string;
  problem: string;
  consequence: string;
  solutionDirection: string;
}

export interface MaturityLevel {
  level: 1 | 2 | 3 | 4 | 5;
  title: string;
  tagline: string;
  description: string;
  minScore: number;
  maxScore: number;
}

export interface UserLead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  profession: Persona;
  createdAt: string;
}

export interface DiagnosisResult {
  id: string;
  user: UserLead;
  profession: Persona;
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
  maturityLevel: MaturityLevel;
  dimensionScores: Record<DimensionId, DimensionScore>;
  sortedDimensionScores: DimensionScore[];
  topBottlenecks: BottleneckDetail[];
  priorities: PriorityAction[];
  executiveSummary: string;
  answers: Record<string, { value: AnswerValue; score: number }>;
  createdAt: string;
}

export type AppScreen =
  | 'home'
  | 'persona_select'
  | 'quiz'
  | 'lead_capture'
  | 'processing'
  | 'result'
  | 'admin';
