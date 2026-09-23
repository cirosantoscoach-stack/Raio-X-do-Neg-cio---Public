import { BOTTLENECK_KNOWLEDGE, DIMENSIONS_META } from '../data/dimensions';
import { QUESTIONS_BANK } from '../data/questions';
import {
  AnswerValue,
  BottleneckDetail,
  DiagnosisResult,
  DimensionId,
  DimensionScore,
  MaturityLevel,
  Persona,
  PriorityAction,
  UserLead,
} from '../types';

export const MATURITY_LEVELS: MaturityLevel[] = [
  {
    level: 1,
    title: 'Operação Dependente',
    tagline: 'Gargalo crítico de tempo e vulnerabilidade operacional.',
    description:
      'O negócio depende excessivamente da presença, agenda e esforço do profissional. Cada real adicional exige mais horas diretas de trabalho, gerando cansaço e limitando severamente a escala.',
    minScore: 0,
    maxScore: 24,
  },
  {
    level: 2,
    title: 'Estrutura em Construção',
    tagline: 'Primeiras bases lançadas, mas com gargalos severos de previsibilidade.',
    description:
      'Existem alguns elementos organizados e clientes ativos, mas ainda existem gargalos estruturais importantes na atração, retenção ou modelo de serviços que impedem consistência financeira.',
    minScore: 25,
    maxScore: 40,
  },
  {
    level: 3,
    title: 'Negócio em Evolução',
    tagline: 'Boa competência técnica com oportunidade clara de processos comerciais.',
    description:
      'Existe uma estrutura razoável e boa satisfação de entrega, mas faltam processos comerciais metódicos, esteira diversificada e previsibilidade em pontos estratégicos da operação.',
    minScore: 41,
    maxScore: 56,
  },
  {
    level: 4,
    title: 'Negócio Estruturado',
    tagline: 'Operação consistente com alavancagem parcial de tempo.',
    description:
      'A operação apresenta boa organização, clareza na precificação comercial e controle de indicadores. O próximo salto é consolidar modelos de recorrência e canais independentes de aquisição.',
    minScore: 57,
    maxScore: 70,
  },
  {
    level: 5,
    title: 'Negócio Previsível',
    tagline: 'Alta maturidade empresarial, esteira completa e previsibilidade de caixa.',
    description:
      'O profissional possui uma estrutura madura, processos padronizados de vendas, esteira diversificada de monetização, alta retenção contratual e capacidade de crescimento sustentável sem sobrecarga física.',
    minScore: 71,
    maxScore: 80,
  },
];

export function getMaturityLevel(score: number): MaturityLevel {
  for (const level of MATURITY_LEVELS) {
    if (score >= level.minScore && score <= level.maxScore) {
      return level;
    }
  }
  return MATURITY_LEVELS[0];
}

export function calculateDiagnosis(
  user: UserLead,
  answers: Record<string, { value: AnswerValue; score: number }>
): DiagnosisResult {
  const profession = user.profession;

  // Initialize dimensions score tracking
  const dimensionTotals: Record<DimensionId, { score: number; maxScore: number }> = {
    posicionamento: { score: 0, maxScore: 0 },
    modelo_negocio: { score: 0, maxScore: 0 },
    aquisicao: { score: 0, maxScore: 0 },
    processo_comercial: { score: 0, maxScore: 0 },
    esteira_servicos: { score: 0, maxScore: 0 },
    retencao: { score: 0, maxScore: 0 },
    gestao_indicadores: { score: 0, maxScore: 0 },
  };

  let totalScore = 0;
  let maxPossibleScore = 0;

  for (const q of QUESTIONS_BANK) {
    const ans = answers[q.id];
    const score = ans ? ans.score : 0; // Default to 0 if not answered
    dimensionTotals[q.dimension].score += score;
    dimensionTotals[q.dimension].maxScore += 4;
    totalScore += score;
    maxPossibleScore += 4;
  }

  // Build DimensionScore objects
  const dimensionScores: Record<DimensionId, DimensionScore> = {} as Record<DimensionId, DimensionScore>;
  const dimensionList: DimensionScore[] = [];

  for (const dimId of Object.keys(dimensionTotals) as DimensionId[]) {
    const meta = DIMENSIONS_META[dimId];
    const { score, maxScore } = dimensionTotals[dimId];
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    const dimScoreObj: DimensionScore = {
      dimensionId: dimId,
      code: meta.code,
      name: meta.name,
      score,
      maxScore,
      percentage,
    };

    dimensionScores[dimId] = dimScoreObj;
    dimensionList.push(dimScoreObj);
  }

  // Sort dimensions by percentage ascending (lowest score = biggest bottleneck)
  const sortedByBottleneck = [...dimensionList].sort((a, b) => a.percentage - b.percentage);

  // Top 3 Bottlenecks
  const impactLevels: ('Alto Impacto' | 'Impacto Moderado' | 'Ponto de Atenção')[] = [
    'Alto Impacto',
    'Impacto Moderado',
    'Ponto de Atenção',
  ];

  const topBottlenecks: BottleneckDetail[] = sortedByBottleneck.slice(0, 3).map((item, idx) => {
    const knowledge = BOTTLENECK_KNOWLEDGE[item.dimensionId];
    return {
      dimensionId: item.dimensionId,
      dimensionName: item.name,
      orderNumber: idx + 1,
      impactLevel: impactLevels[idx],
      headline: knowledge.headline[profession],
      diagnosticText: knowledge.diagnosticText[profession],
      consequence: knowledge.consequence[profession],
    };
  });

  // Priorities: action guidance for the 3 bottlenecks
  const priorities: PriorityAction[] = topBottlenecks.map((bottleneck, idx) => {
    const knowledge = BOTTLENECK_KNOWLEDGE[bottleneck.dimensionId];
    return {
      orderNumber: idx + 1,
      title: `Estruturar ${bottleneck.dimensionName}`,
      targetDimension: bottleneck.dimensionName,
      problem: bottleneck.headline,
      consequence: bottleneck.consequence,
      solutionDirection: knowledge.prioritySolution[profession],
    };
  });

  const maturityLevel = getMaturityLevel(totalScore);
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  // Executive summary tailored to profession & top bottleneck
  const primaryBottleneck = topBottlenecks[0];
  let executiveSummary = '';

  if (profession === 'personal_trainer') {
    if (primaryBottleneck.dimensionId === 'modelo_negocio') {
      executiveSummary =
        'Seu negócio apresenta forte dependência da agenda e da venda direta do seu tempo físico na academia. Isso significa que aumentar o faturamento hoje tende a exigir mais disponibilidade operacional e esgotamento físico, criando um teto rígido de crescimento.';
    } else if (primaryBottleneck.dimensionId === 'processo_comercial') {
      executiveSummary =
        'Seu negócio possui demanda e oportunidades, porém sofre com vazamento severo na etapa comercial. A ausência de um script estruturado de qualificação faz com que muitos alunos em potencial comparem apenas o preço da sua hora-aula com a concorrência.';
    } else if (primaryBottleneck.dimensionId === 'retencao') {
      executiveSummary =
        'Sua operação vive um ciclo de esforço contínuo para repor alunos que desistem após os primeiros meses. Sem contratos de compromisso estendido e rotinas ativas de renovação, sua previsibilidade financeira fica vulnerável à sazonalidade.';
    } else {
      executiveSummary = `Seu negócio apresenta uma base técnica sólida, porém seu principal limitador de crescimento atual está concentrado em ${primaryBottleneck.dimensionName}. Estruturar esse pilar é o primeiro passo para destravar previsibilidade e receita.`;
    }
  } else {
    // Nutricionista
    if (primaryBottleneck.dimensionId === 'modelo_negocio') {
      executiveSummary =
        'Seu negócio apresenta forte dependência de consultas pontuais e presença física em consultório. Enquanto cada incremento de receita depender de novas consultas unitárias, sua rentabilidade continuará refém das horas disponíveis no dia.';
    } else if (primaryBottleneck.dimensionId === 'retencao') {
      executiveSummary =
        'Seu consultório sofre com alta evasão após a entrega do primeiro plano alimentar. Quando a grande maioria dos pacientes não segue em acompanhamento continuado, você é obrigado a recomeçar a captação de novos pacientes todo início de mês.';
    } else if (primaryBottleneck.dimensionId === 'processo_comercial') {
      executiveSummary =
        'Existe interesse pelo seu trabalho, mas as solicitações de orçamento via WhatsApp terminam frequentemente sem fechamento. É necessário criar uma condução de ancoragem de valor antes de enviar o valor da consulta.';
    } else {
      executiveSummary = `Você possui excelente autoridade técnica e conhecimento clínico, contudo a dimensão de ${primaryBottleneck.dimensionName} atua como o principal freio do seu consultório. Alinhar essa estrutura trará segurança e previsibilidade financeira.`;
    }
  }

  const diagnosisId = `diag_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    id: diagnosisId,
    user,
    profession,
    totalScore,
    maxPossibleScore,
    percentage,
    maturityLevel,
    dimensionScores,
    sortedDimensionScores: dimensionList,
    topBottlenecks,
    priorities,
    executiveSummary,
    answers,
    createdAt: new Date().toISOString(),
  };
}
