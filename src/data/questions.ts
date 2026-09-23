import { AnswerOptionConfig, Question } from '../types';

export const ANSWER_OPTIONS: AnswerOptionConfig[] = [
  {
    value: 'sempre',
    label: 'Sempre',
    score: 0,
    description: 'Ocorre quase todas as vezes no cotidiano da minha operação.',
  },
  {
    value: 'frequentemente',
    label: 'Frequentemente',
    score: 1,
    description: 'Acontece na maior parte das situações normais de trabalho.',
  },
  {
    value: 'as_vezes',
    label: 'Às vezes',
    score: 2,
    description: 'Ocorre em alguns períodos ou com determinados perfis.',
  },
  {
    value: 'raramente',
    label: 'Raramente',
    score: 3,
    description: 'Poucas vezes enfrento essa dificuldade ou limitação.',
  },
  {
    value: 'nunca',
    label: 'Nunca',
    score: 4,
    description: 'Tenho domínio e estrutura que eliminam completamente esse gargalo.',
  },
];

export const QUESTIONS_BANK: Question[] = [
  // 01 — POSICIONAMENTO (3 perguntas)
  {
    id: 'pos_1',
    dimension: 'posicionamento',
    order: 1,
    questionText: {
      personal_trainer:
        'Seus potenciais alunos frequentemente comparam o valor da sua hora-aula com a mensalidade da academia ou de outros personais?',
      nutricionista:
        'Seus potenciais pacientes frequentemente comparam o preço da sua consulta com a tabela de outros profissionais ou com o convênio?',
    },
    contextNote: {
      personal_trainer: 'Avalia se o mercado enxerga você como commodity horária ou como especialista.',
      nutricionista: 'Avalia se sua autoridade técnica está diferenciada da média do mercado.',
    },
    active: true,
  },
  {
    id: 'pos_2',
    dimension: 'posicionamento',
    order: 2,
    questionText: {
      personal_trainer:
        'Você sente dificuldade em comunicar em uma frase o resultado específico que o seu método gera para um perfil bem definido de aluno?',
      nutricionista:
        'Você sente dificuldade em comunicar em uma frase a transformação clínica específica que você gera para um perfil bem definido de paciente?',
    },
    contextNote: {
      personal_trainer: 'Clareza da proposta única de valor e nicho de atuação.',
      nutricionista: 'Clareza de posicionamento clínico e especialidade de solução.',
    },
    active: true,
  },
  {
    id: 'pos_3',
    dimension: 'posicionamento',
    order: 3,
    questionText: {
      personal_trainer:
        'Você aceita praticamente qualquer perfil de pessoa que procura seu treino por receio de ficar com horário vago na agenda?',
      nutricionista:
        'Você atende praticamente qualquer demanda ou perfil de paciente que aparece por receio de ficar sem consultas na semana?',
    },
    contextNote: {
      personal_trainer: 'Maturidade de seleção e qualificação do cliente ideal.',
      nutricionista: 'Foco de atuação vs generalismo por insegurança de receita.',
    },
    active: true,
  },

  // 02 — MODELO DE NEGÓCIO (3 perguntas)
  {
    id: 'mod_1',
    dimension: 'modelo_negocio',
    order: 4,
    questionText: {
      personal_trainer:
        'Se você quisesse aumentar seu faturamento em 30% hoje, você precisaria obrigatoriamente trabalhar mais horas na academia?',
      nutricionista:
        'Se você quisesse aumentar seu faturamento em 30% hoje, você precisaria obrigatoriamente abrir novos horários e atender mais consultas?',
    },
    contextNote: {
      personal_trainer: 'Grau de dependência direta entre receita e esforço físico presencial.',
      nutricionista: 'Grau de dependência entre receita e tempo individual em consultório.',
    },
    active: true,
  },
  {
    id: 'mod_2',
    dimension: 'modelo_negocio',
    order: 5,
    questionText: {
      personal_trainer:
        'Se você precisar parar de atender por 15 a 30 dias por motivos de saúde ou férias, seu faturamento mensal desmorona?',
      nutricionista:
        'Se você precisar fechar o consultório por 15 a 30 dias por motivos de saúde ou férias, seu faturamento mensal zera?',
    },
    contextNote: {
      personal_trainer: 'Resiliência operacional e existência de fontes de receita desatreladas do relógio.',
      nutricionista: 'Existência de modelos de receita recorrente ou ativos digitais.',
    },
    active: true,
  },
  {
    id: 'mod_3',
    dimension: 'modelo_negocio',
    order: 6,
    questionText: {
      personal_trainer:
        'Mais de 80% de todo o seu faturamento atual depende exclusivamente de aulas presenciais individuais (um para um)?',
      nutricionista:
        'Mais de 80% de todo o seu faturamento atual depende exclusivamente de consultas individuais presenciais ou online avulsas?',
    },
    contextNote: {
      personal_trainer: 'Concentração de risco em um único modelo de prestação de serviços.',
      nutricionista: 'Concentração de receita na venda unitária de tempo.',
    },
    active: true,
  },

  // 03 — AQUISIÇÃO DE CLIENTES (3 perguntas)
  {
    id: 'aqui_1',
    dimension: 'aquisicao',
    order: 7,
    questionText: {
      personal_trainer:
        'A entrada de novos alunos no seu negócio depende quase que 100% de indicações boca a boca espontâneas que você não controla?',
      nutricionista:
        'A chegada de novos pacientes no seu consultório depende de indicações espontâneas que você não consegue prever ou acelerar?',
    },
    contextNote: {
      personal_trainer: 'Ausência de canais previsíveis e ativos de geração de demanda.',
      nutricionista: 'Vulnerabilidade a flutuações sazonais sem controle de captação.',
    },
    active: true,
  },
  {
    id: 'aqui_2',
    dimension: 'aquisicao',
    order: 8,
    questionText: {
      personal_trainer:
        'Você passa semanas sem receber novos contatos de pessoas interessadas no seu trabalho no WhatsApp?',
      nutricionista:
        'Você enfrenta semanas com poucos contatos de novos pacientes buscando agendamento no seu consultório?',
    },
    contextNote: {
      personal_trainer: 'Constância do fluxo de atração qualificada.',
      nutricionista: 'Volume mínimo regular de novos contatos interessados.',
    },
    active: true,
  },
  {
    id: 'aqui_3',
    dimension: 'aquisicao',
    order: 9,
    questionText: {
      personal_trainer:
        'Você depende exclusivamente de postar diariamente no Instagram na esperança de que algum seguidor se interesse e mande mensagem?',
      nutricionista:
        'Você depende de produzir posts diários nas redes sociais sem ter um processo estruturado que direcione o público para a consulta?',
    },
    contextNote: {
      personal_trainer: 'Falta de funil de conversão e parcerias estratégicas estruturadas.',
      nutricionista: 'Ausência de estratégia de captação ativa além da produção de conteúdo solto.',
    },
    active: true,
  },

  // 04 — PROCESSO COMERCIAL (3 perguntas)
  {
    id: 'com_1',
    dimension: 'processo_comercial',
    order: 10,
    questionText: {
      personal_trainer:
        'Quando alguém pergunta o valor do seu treino no WhatsApp ou Instagram, você costuma enviar a tabela de preços de imediato?',
      nutricionista:
        'Quando alguém pergunta o valor da consulta no WhatsApp, você ou sua secretária costumam informar o preço logo na primeira mensagem?',
    },
    contextNote: {
      personal_trainer: 'Erros capitais no script comercial que desvalorizam o serviço.',
      nutricionista: 'Falta de qualificação e ancoragem de valor prévia ao preço.',
    },
    active: true,
  },
  {
    id: 'com_2',
    dimension: 'processo_comercial',
    order: 11,
    questionText: {
      personal_trainer:
        'Você perde alunos interessados que dizem que "vão ver e depois avisam" e você não possui uma rotina de follow-up planejada?',
      nutricionista:
        'Você perde pacientes que pedem informações e não fecham, sem que você tenha uma sequência estruturada para retomar o contato?',
    },
    contextNote: {
      personal_trainer: 'Falta de processo de acompanhamento pós-proposta (follow-up).',
      nutricionista: 'Ausência de cadência comercial para reengajar contatos frios.',
    },
    active: true,
  },
  {
    id: 'com_3',
    dimension: 'processo_comercial',
    order: 12,
    questionText: {
      personal_trainer:
        'Sua taxa de conversão depende do "feeling" do momento em vez de perguntas estratégicas de diagnóstico e condução de fechamento?',
      nutricionista:
        'Sua taxa de agendamento varia conforme o humor do dia por não ter um roteiro claro para contornar objeções clássicas de preço e tempo?',
    },
    contextNote: {
      personal_trainer: 'Falta de método de vendas e tratamento profissional de objeções.',
      nutricionista: 'Improviso na negociação com pacientes hesitantes.',
    },
    active: true,
  },

  // 05 — ESTEIRA DE SERVIÇOS (3 perguntas)
  {
    id: 'est_1',
    dimension: 'esteira_servicos',
    order: 13,
    questionText: {
      personal_trainer:
        'Você só tem uma única opção de serviço para oferecer (ex: personal presencial mensal), sem planos híbridos, consultoria ou programas?',
      nutricionista:
        'Você só tem uma única opção de serviço para oferecer (ex: consulta avulsa tradicional), sem programas de 3 ou 6 meses de acompanhamento?',
    },
    contextNote: {
      personal_trainer: 'Monoproduto: incapacidade de atender diferentes bolsos e rotinas.',
      nutricionista: 'Ausência de programas com maior valor agregado e retenção prolongada.',
    },
    active: true,
  },
  {
    id: 'est_2',
    dimension: 'esteira_servicos',
    order: 14,
    questionText: {
      personal_trainer:
        'Você recusa ou perde pessoas que têm horários incompatíveis ou menor poder aquisitivo por falta de uma consultoria online estruturada?',
      nutricionista:
        'Você deixa de monetizar pacientes que moram longe ou precisam de suporte constante por não ter um formato estruturado de acompanhamento digital?',
    },
    contextNote: {
      personal_trainer: 'Dinheiro deixado na mesa por rigidez de formato de entrega.',
      nutricionista: 'Perda de receita escalável além das paredes físicas do consultório.',
    },
    active: true,
  },
  {
    id: 'est_3',
    dimension: 'esteira_servicos',
    order: 15,
    questionText: {
      personal_trainer:
        'A maioria dos seus alunos paga apenas mês a mês sem planos trimestrais, semestrais ou anuais com fidelidade contratual?',
      nutricionista:
        'A maioria dos seus pacientes paga consulta a consulta sem planos de ciclos (90 a 180 dias) com compromisso financeiro estabelecido?',
    },
    contextNote: {
      personal_trainer: 'Instabilidade financeira provocada pela falta de contratos de médio e longo prazo.',
      nutricionista: 'Insegurança de caixa por depender de novas decisões de compra frequentes.',
    },
    active: true,
  },

  // 06 — RETENÇÃO E RECORRÊNCIA (3 perguntas)
  {
    id: 'ret_1',
    dimension: 'retencao',
    order: 16,
    questionText: {
      personal_trainer:
        'Você sente que gasta muita energia todo trimestre repondo alunos que desistem após os primeiros 2 ou 3 meses de treino?',
      nutricionista:
        'Você percebe que a maioria dos pacientes faz a consulta inicial (e o retorno de 30 dias) e depois desaparece sem dar continuidade?',
    },
    contextNote: {
      personal_trainer: 'Vazamento crônico na base de alunos e esforço dobrado de vendas.',
      nutricionista: 'Evasão precoce de pacientes antes da consolidação de resultados.',
    },
    active: true,
  },
  {
    id: 'ret_2',
    dimension: 'retencao',
    order: 17,
    questionText: {
      personal_trainer:
        'Você não possui marcos formais de reavaliação periódica e celebração de resultados para renovar o compromisso do aluno com antecedência?',
      nutricionista:
        'Você não possui marcos de evolução clínica pré-agendados que mostrem ao paciente o próximo degrau do tratamento dele?',
    },
    contextNote: {
      personal_trainer: 'Falta de rituais de encantamento e renovação programada.',
      nutricionista: 'Falta de visão de longo prazo para o paciente na sua jornada de saúde.',
    },
    active: true,
  },
  {
    id: 'ret_3',
    dimension: 'retencao',
    order: 18,
    questionText: {
      personal_trainer:
        'Ex-alunos que deixaram de treinar com você ficam meses esquecidos sem qualquer contato ativo de relacionamento ou reativação?',
      nutricionista:
        'Pacientes que interromperam o acompanhamento ficam em uma gaveta sem uma rotina periódica de mensagem e convite de retorno?',
    },
    contextNote: {
      personal_trainer: 'Desperdício do ativo mais valioso: quem já comprou de você no passado.',
      nutricionista: 'Falta de campanha ativa de resgate de pacientes inativos.',
    },
    active: true,
  },

  // 07 — GESTÃO E INDICADORES (2 perguntas)
  {
    id: 'ges_1',
    dimension: 'gestao_indicadores',
    order: 19,
    questionText: {
      personal_trainer:
        'Você encerra o mês sem acompanhar em planilha ou sistema o seu ticket médio por aluno, índice de cancelamentos e taxa de ocupação da agenda?',
      nutricionista:
        'Você fecha o mês sem saber exatamente sua taxa de retorno real, taxa de conversão de novos contatos e lucro líquido por consulta?',
    },
    contextNote: {
      personal_trainer: 'Gestão intuitiva que cega decisões estratégicas de precificação e crescimento.',
      nutricionista: 'Falta de métricas de saúde financeira e eficiência de consultório.',
    },
    active: true,
  },
  {
    id: 'ges_2',
    dimension: 'gestao_indicadores',
    order: 20,
    questionText: {
      personal_trainer:
        'Você não tem clareza prévia de quanto faturará no mês seguinte devido à oscilação de presenças, faltas e pagamentos avulsos?',
      nutricionista:
        'Você não tem previsão de receita para o mês seguinte porque seu faturamento depende de quantas consultas serão agendadas no dia a dia?',
    },
    contextNote: {
      personal_trainer: 'Falta de receita previsível e gestão financeira estratégica.',
      nutricionista: 'Incerteza crônica do fluxo de caixa operacional.',
    },
    active: true,
  },
];
