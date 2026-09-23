import { DimensionId, DimensionMeta, Persona } from '../types';

export const DIMENSIONS_META: Record<DimensionId, DimensionMeta> = {
  posicionamento: {
    id: 'posicionamento',
    code: '01',
    name: 'Posicionamento',
    shortDescription: 'Clareza de público-alvo, percepção de valor e diferenciação técnica.',
  },
  modelo_negocio: {
    id: 'modelo_negocio',
    code: '02',
    name: 'Modelo de Negócio',
    shortDescription: 'Dependência da presença física, teto de faturamento e alavancagem de tempo.',
  },
  aquisicao: {
    id: 'aquisicao',
    code: '03',
    name: 'Aquisição de Clientes',
    shortDescription: 'Previsibilidade na atração de oportunidades e dependência de indicações.',
  },
  processo_comercial: {
    id: 'processo_comercial',
    code: '04',
    name: 'Processo Comercial',
    shortDescription: 'Qualificação, condução de conversa, tratamento de objeções e follow-up.',
  },
  esteira_servicos: {
    id: 'esteira_servicos',
    code: '05',
    name: 'Esteira de Serviços',
    shortDescription: 'Formatos variados de monetização (individual, híbrido, online, programas).',
  },
  retencao: {
    id: 'retencao',
    code: '06',
    name: 'Retenção e Recorrência',
    shortDescription: 'Continuidade de alunos/pacientes após primeiros ciclos e previsibilidade contratual.',
  },
  gestao_indicadores: {
    id: 'gestao_indicadores',
    code: '07',
    name: 'Gestão e Indicadores',
    shortDescription: 'Acompanhamento de conversão, ocupação da capacidade, ticket médio e metas.',
  },
};

export const BOTTLENECK_KNOWLEDGE: Record<
  DimensionId,
  {
    title: string;
    headline: {
      personal_trainer: string;
      nutricionista: string;
    };
    diagnosticText: {
      personal_trainer: string;
      nutricionista: string;
    };
    consequence: {
      personal_trainer: string;
      nutricionista: string;
    };
    prioritySolution: {
      personal_trainer: string;
      nutricionista: string;
    };
  }
> = {
  posicionamento: {
    title: 'Posicionamento e Percepção de Valor',
    headline: {
      personal_trainer: 'Sua autoridade técnica não está refletida na percepção de valor dos alunos.',
      nutricionista: 'Seu conhecimento técnico não se traduz em percepção imediata de valor diferenciado.',
    },
    diagnosticText: {
      personal_trainer:
        'Você é visto por muitos como um aplicador de treinos por hora, competindo pelo preço da mensalidade e sofrendo com comparações frequentes.',
      nutricionista:
        'Você é visto por muitos pacientes como alguém que entrega um plano alimentar ou consulta pontual, competindo com a tabela média do mercado.',
    },
    consequence: {
      personal_trainer:
        'Dificuldade para cobrar um ticket condizente com sua qualificação e atração de alunos pouco comprometidos que regateiam mensalidades.',
      nutricionista:
        'Dificuldade para precificar seu acompanhamento acima da média e atração de pacientes que buscam apenas uma dieta rápida de gaveta.',
    },
    prioritySolution: {
      personal_trainer:
        'Refinar a mensagem de transformação, definir um nicho prioritário e comunicar o benefício final do seu método em vez de vender horas de aula.',
      nutricionista:
        'Redefinir o posicionamento para vender a solução definitiva para o problema do paciente (ex: performance, saúde intestinal, emagrecimento definitivo) e não uma consulta isolada.',
    },
  },
  modelo_negocio: {
    title: 'Modelo de Negócio e Dependência de Tempo',
    headline: {
      personal_trainer: 'Seu faturamento ainda é refém direto do relógio e da sua presença física.',
      nutricionista: 'Sua receita depende diretamente de horas em consultório e consultas individuais.',
    },
    diagnosticText: {
      personal_trainer:
        'Para faturar mais você é forçado a acordar mais cedo e sair mais tarde da academia. Não existe escala sem esgotamento físico.',
      nutricionista:
        'Se você não sentar na cadeira e atender, o faturamento do mês zera. Férias, viagens ou imprevistos de saúde desorganizam seu caixa.',
    },
    consequence: {
      personal_trainer:
        'Esgotamento físico crônico, teto salarial intransponível e risco de colapso de receita caso precise se ausentar.',
      nutricionista:
        'Teto financeiro rígido determinado pela quantidade máxima de consultas por semana e estresse com cancelamentos de agenda.',
    },
    prioritySolution: {
      personal_trainer:
        'Desacoplar parte da sua receita das horas presenciais por meio de consultorias híbridas, programas orientados a metas e modelos semi-personal.',
      nutricionista:
        'Migrar da cobrança por consulta avulsa para planos de acompanhamento trimestrais/semestrais com suporte ativo e entregáveis assíncronos.',
    },
  },
  aquisicao: {
    title: 'Aquisição e Fluxo de Oportunidades',
    headline: {
      personal_trainer: 'Dependência excessiva de indicação espontânea sem previsibilidade mensal.',
      nutricionista: 'Oscilação imprevisível na chegada de novos pacientes e refém do boca a boca.',
    },
    diagnosticText: {
      personal_trainer:
        'Você não tem um mecanismo ativo que coloque interessados qualificados no seu WhatsApp todos os meses com consistência.',
      nutricionista:
        'Sua demanda sobe e desce sem que você tenha controle do fluxo, dependendo de postagens aleatórias no Instagram ou indicações.',
    },
    consequence: {
      personal_trainer:
        'Insegurança sobre a estabilidade financeira dos próximos meses e incapacidade de prever investimentos pessoais.',
      nutricionista:
        'Meses com consultório cheio intercalados por semanas de buracos na agenda sem saber quando novos contatos entrarão.',
    },
    prioritySolution: {
      personal_trainer:
        'Estabelecer ao menos 2 canais estruturados de aquisição ativa (parcerias estratégicas locais, prospecção orientada e tráfego direcionado).',
      nutricionista:
        'Construir um ecossistema de captação contínua integrando parcerias com médicos/academias, conteúdo de autoridade e anúncios de conversão para WhatsApp.',
    },
  },
  processo_comercial: {
    title: 'Processo Comercial e Conversão',
    headline: {
      personal_trainer: 'Você perde contratações por falta de uma condução estratégica na conversa.',
      nutricionista: 'Muitos contatos interessados não viram pacientes por falta de condução na negociação.',
    },
    diagnosticText: {
      personal_trainer:
        'Ao receber uma mensagem pedindo valores, o preço é enviado rapidamente sem entender o momento do aluno, gerando a resposta "vou pensar".',
      nutricionista:
        'O paciente pede o valor da consulta, recebe o preço no WhatsApp e some sem resposta, porque a percepção de valor não foi ancorada antes.',
    },
    consequence: {
      personal_trainer:
        'Taxa de conversão baixa, desperdício de interessados e sensação de que as pessoas só se importam com o preço mais baixo.',
      nutricionista:
        'Grande volume de mensagens frias que não se convertem em agendamentos pagos e ausência de processo de follow-up organizado.',
    },
    prioritySolution: {
      personal_trainer:
        'Implementar um roteiro de qualificação em 3 etapas (diagnóstico do objetivo, ancoragem de valor e fechamento com opções pré-formatadas).',
      nutricionista:
        'Criar uma rotina comercial de atendimento com perguntas diagnósticas antes de revelar o investimento e acompanhamento de quem pediu orçamento nos últimos 14 dias.',
    },
  },
  esteira_servicos: {
    title: 'Esteira de Serviços e Monetização',
    headline: {
      personal_trainer: 'Falta de opções estruturadas para monetizar diferentes perfis de alunos.',
      nutricionista: 'Monetização restrita a consultas isoladas sem planos de longo prazo.',
    },
    diagnosticText: {
      personal_trainer:
        'Ou a pessoa paga sua mensalidade cheia de personal presencial ou ela não contrata nada. Não há ofertas de menor contato ou maior margem.',
      nutricionista:
        'Você oferece uma consulta avulsa, no máximo com direito a retorno em 30 dias. Falta um programa estruturado de metas que retenha o paciente.',
    },
    consequence: {
      personal_trainer:
        'Você deixa dinheiro na mesa com pessoas que gostariam do seu método mas não têm o orçamento ou o horário para o presencial individual.',
      nutricionista:
        'Perda da receita de longo prazo do paciente e dependência contínua de vender novos começos em vez de manter quem já confia em você.',
    },
    prioritySolution: {
      personal_trainer:
        'Estruturar uma esteira com 3 ofertas claras: Consultoria Online Premium, Atendimento Híbrido e Personal Presencial Exclusivo.',
      nutricionista:
        'Transformar a consulta em porta de entrada para Programas de Acompanhamento de 90 a 180 dias com encontros quinzenais e suporte diário.',
    },
  },
  retencao: {
    title: 'Retenção, Continuidade e LTV',
    headline: {
      personal_trainer: 'Alta rotatividade de alunos que abandonam após 60 a 90 dias.',
      nutricionista: 'Evasão massiva de pacientes após a entrega do primeiro plano alimentar.',
    },
    diagnosticText: {
      personal_trainer:
        'Você vive em um ciclo vicioso de repor alunos que saem, em vez de acumular base com contratos semestrais e anuais com renovação automática.',
      nutricionista:
        'O paciente pega o plano, faz o retorno do primeiro mês e nunca mais volta para renovar, te obrigando a buscar novos pacientes todo mês.',
    },
    consequence: {
      personal_trainer:
        'Instabilidade financeira todo início de ano ou inverno e gasto excessivo de energia apenas para manter o mesmo faturamento.',
      nutricionista:
        'Custo de aquisição elevado e frustração por não ver os pacientes alcançarem transformações profundas e duradouras.',
    },
    prioritySolution: {
      personal_trainer:
        'Instituir contratos recorrentes (débito recorrente ou parcelamento sem limite) e marcos de reavaliação física trimestrais para ancorar renovações.',
      nutricionista:
        'Estruturar pontos de contato pré-agendados de acompanhamento, check-ins semanais e planos continuados de manutenção de saúde.',
    },
  },
  gestao_indicadores: {
    title: 'Gestão, Finanças e Indicadores',
    headline: {
      personal_trainer: 'Gestão no escuro sem métricas de conversão, ocupação e receita futura.',
      nutricionista: 'Ausência de controle métrico sobre faturamento previsto, perdas e retenção.',
    },
    diagnosticText: {
      personal_trainer:
        'Você sabe apenas o quanto cai na conta no fim do mês, sem saber exatamente sua taxa de ocupação, índice de cancelamentos ou receita futura.',
      nutricionista:
        'Falta de dados claros sobre a origem dos pacientes mais lucrativos, taxa de retorno real do consultório e custo operacional.',
    },
    consequence: {
      personal_trainer:
        'Tomada de decisões no improviso, dificuldade para planejar reajustes de preço e ausência de metas previsíveis de crescimento.',
      nutricionista:
        'Sensação de trabalhar muito e não saber para onde vai o lucro líquido ou como aumentar a rentabilidade por hora atendida.',
    },
    prioritySolution: {
      personal_trainer:
        'Implantar uma planilha ou painel de gestão com 4 indicadores essenciais: Taxa de Ocupação da Agenda, LTV (tempo médio do aluno), Churn mensal e Ticket Médio.',
      nutricionista:
        'Controlar mensalmente a Taxa de Retenção a 90 dias, Receita Recorrente Contratada, Custo por Paciente e Margem Líquida por Atendimento.',
    },
  },
};
