import { PlatformUser, Patient, Appointment, SaaSInvoice, DenverMilestone, DenverAssessment } from '../types';

export const INITIAL_PLATFORM_USERS: PlatformUser[] = [
  {
    id: 'user-1',
    name: 'Dr. Henrique Vasconcelos',
    email: 'henrique@hospitalis.com.br',
    role: 'Médico',
    status: 'Ativo',
    phone: '(11) 98112-4040',
    createdAt: '2025-01-10',
    avatarColor: 'bg-emerald-500',
    specialty: 'Pediatra & Neurologista',
    crm: 'CRM/SP 123456'
  },
  {
    id: 'user-2',
    name: 'Dra. Amanda Silva Costa',
    email: 'amanda@hospitalis.com.br',
    role: 'Médico',
    status: 'Ativo',
    phone: '(11) 97422-1133',
    createdAt: '2025-02-15',
    avatarColor: 'bg-teal-500',
    specialty: 'Psicologia Infantil / Terapeuta',
    crm: 'CRP/SP 987654'
  },
  {
    id: 'user-3',
    name: 'Mariana Santos Rocha',
    email: 'mariana@hospitalis.com.br',
    role: 'Recepcionista',
    status: 'Ativo',
    phone: '(11) 97001-4455',
    createdAt: '2025-01-05',
    avatarColor: 'bg-stone-500'
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    name: 'Lucas Antunes Mendes',
    birthDate: '2024-02-10',
    ageText: '2 anos e 3 meses',
    parentsName: 'Gabriela Antunes e Marcos Mendes',
    phone: '(11) 96422-5566',
    status: 'Ativo',
    createdAt: '2025-03-10',
    gender: 'M',
    avatarColor: 'bg-sky-500'
  },
  {
    id: 'pat-2',
    name: 'Sofia Linhares Góes',
    birthDate: '2024-11-20',
    ageText: '1 ano e 6 meses',
    parentsName: 'Beatriz Linhares Góes',
    phone: '(11) 98777-3311',
    status: 'Ativo',
    createdAt: '2025-11-25',
    gender: 'F',
    avatarColor: 'bg-violet-500'
  },
  {
    id: 'pat-3',
    name: 'Miguel Souza Pinto',
    birthDate: '2023-05-14',
    ageText: '3 anos',
    parentsName: 'Roberto Souza Pinto',
    phone: '(11) 98822-7711',
    status: 'Ativo',
    createdAt: '2025-04-10',
    gender: 'M',
    avatarColor: 'bg-amber-500'
  },
  {
    id: 'pat-4',
    name: 'Estela Castilho Prado',
    birthDate: '2025-09-01',
    ageText: '8 meses',
    parentsName: 'Juliana Prado Castilho',
    phone: '(11) 91222-3443',
    status: 'Ativo',
    createdAt: '2025-12-01',
    gender: 'F',
    avatarColor: 'bg-rose-500'
  },
  {
    id: 'pat-5',
    name: 'Davi Figueiredo Martins',
    birthDate: '2023-01-05',
    ageText: '3 anos e 4 meses',
    parentsName: 'Clarice Figueiredo Martins',
    phone: '(11) 99114-1212',
    status: 'Inativo',
    createdAt: '2025-08-15',
    gender: 'M',
    avatarColor: 'bg-blue-500'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    patientId: 'pat-1',
    patientName: 'Lucas Antunes Mendes',
    doctorName: 'Dr. Henrique Vasconcelos',
    doctorSpecialty: 'Pediatria & Neurologista',
    date: '2026-05-21',
    time: '08:30',
    status: 'Finalizado',
    type: 'Avaliação Denver',
    notes: 'Sessão de aplicação da primeira etapa do protocolo Denver II. Foram avaliadas as esferas de desenvolvimento social e motor fino de forma satisfatória.',
    evolutionRegistered: 'Paciente apresentou evolução favorável no controle motor ao segurar blocos de encaixe, porém demonstrou atraso pontual na esfera de linguagem receptiva.'
  },
  {
    id: 'pat-2',
    patientId: 'pat-2',
    patientName: 'Sofia Linhares Góes',
    doctorName: 'Dra. Amanda Silva Costa',
    doctorSpecialty: 'Psicologia Infantil / Terapeuta',
    date: '2026-05-21',
    time: '10:00',
    status: 'Em Andamento',
    type: 'Sessão Regular',
    notes: 'Intervenção precoce focada em estimulação verbal e contato visual prolongado compartilhando blocos de cores.',
    evolutionRegistered: 'Sofia responde melhor sob estímulo lúdico de fantoches comerciais. Adotou contato visual de 3 segundos em 4 tentativas.'
  },
  {
    id: 'apt-3',
    patientId: 'pat-3',
    patientName: 'Miguel Souza Pinto',
    doctorName: 'Dr. Henrique Vasconcelos',
    doctorSpecialty: 'Pediatria & Neurologista',
    date: '2026-05-21',
    time: '14:30',
    status: 'Agendado',
    type: 'Triagem',
    notes: 'Primeira conversa de anamnese com o pai Roberto. Investigar suspeitas de intolerância a barulhos e desvios de atenção.'
  },
  {
    id: 'apt-4',
    patientId: 'pat-4',
    patientName: 'Estela Castilho Prado',
    doctorName: 'Dra. Amanda Silva Costa',
    doctorSpecialty: 'Psicologia Infantil / Terapeuta',
    date: '2026-05-21',
    time: '16:00',
    status: 'Agendado',
    type: 'Avaliação Denver',
    notes: 'Aplicação integral do Denver II voltado para marcos motores de 8 meses (rolar, engatinhar por arrasto, ficar sentado sem apoio).'
  },
  {
    id: 'apt-5',
    patientId: 'pat-1',
    patientName: 'Lucas Antunes Mendes',
    doctorName: 'Dra. Amanda Silva Costa',
    doctorSpecialty: 'Psicologia Infantil / Terapeuta',
    date: '2026-05-22',
    time: '09:00',
    status: 'Agendado',
    type: 'Feedback Pais',
    notes: 'Reunião de feedback com os pais Gabriela e Marcos sobre o relatório final de Denver e encaminhamento pedagógico.'
  }
];

export const INITIAL_SAAS_INVOICES: SaaSInvoice[] = [
  {
    id: 'inv-101',
    planName: 'Hospitalis Clínica Premium',
    amount: 299.90,
    paymentMethod: 'Pix',
    dueDate: '2026-05-15',
    paymentDate: '2026-05-15',
    status: 'Pago'
  },
  {
    id: 'inv-102',
    planName: 'Hospitalis Clínica Premium',
    amount: 299.90,
    paymentMethod: 'Pix',
    dueDate: '2026-04-15',
    paymentDate: '2026-04-15',
    status: 'Pago'
  },
  {
    id: 'inv-103',
    planName: 'Hospitalis Clínica Premium',
    amount: 299.90,
    paymentMethod: 'Cartão de Crédito',
    dueDate: '2026-03-15',
    paymentDate: '2026-03-15',
    status: 'Pago'
  },
  {
    id: 'inv-104',
    planName: 'Hospitalis Clínica Premium',
    amount: 299.90,
    paymentMethod: 'Cartão de Crédito',
    dueDate: '2026-06-15',
    status: 'Pendente'
  }
];

export const SAAS_PLANS = [
  {
    name: 'Hospitalis Individual / Pro',
    price: 149.90,
    patientLimit: 15,
    features: ['Até 15 pacientes ativos', 'Suporte via Chat complementar', 'Acesso ao Protocolo Denver II básico', 'Exportar prontuário em PDF'],
    isCurrent: false
  },
  {
    name: 'Hospitalis Clínica Premium',
    price: 299.90,
    patientLimit: 100,
    features: ['Até 100 pacientes ativos', 'Suporte Prioritário 24/7', 'Acesso ilimitado a todos os Protocolos (Denver, Portage, etc.)', 'Multi-profissionais configurados', 'Indicadores avançados de evolução'],
    isCurrent: true
  },
  {
    name: 'Hospitalis Big Clinic / Enterprise',
    price: 599.90,
    patientLimit: 500,
    features: ['Até 500 pacientes ativos', 'Gerente de Contas dedicado', 'Personalização de Protocolos clínicos', 'Integração direta com APIs externas', 'Treinamento de equipe ao vivo'],
    isCurrent: false
  }
];

export const DENVER_DEFAULT_MILESTONES: DenverMilestone[] = [
  { id: 'ms-ps-1', domain: 'personal-social', description: 'Olha para o rosto do examinador', rangeAgeMonths: '1-2 meses', status: 'concluido' },
  { id: 'ms-ps-2', domain: 'personal-social', description: 'Sorri em resposta ao estímulo', rangeAgeMonths: '1-3 meses', status: 'concluido' },
  { id: 'ms-ps-3', domain: 'personal-social', description: 'Alimenta-se sozinho (com as mãos)', rangeAgeMonths: '8-12 meses', status: 'concluido' },
  { id: 'ms-ps-4', domain: 'personal-social', description: 'Imita atividades domésticas básicas', rangeAgeMonths: '12-16 meses', status: 'concluido' },
  { id: 'ms-ps-5', domain: 'personal-social', description: 'Brinca de faz de conta de maneira imitativa', rangeAgeMonths: '18-24 meses', status: 'não-concluido' },
  { id: 'ms-fm-1', domain: 'fine-motor', description: 'Acompanha objeto em movimento (90°)', rangeAgeMonths: '1-3 meses', status: 'concluido' },
  { id: 'ms-fm-2', domain: 'fine-motor', description: 'Transfere objetos de uma mão para a outra', rangeAgeMonths: '5-8 meses', status: 'concluido' },
  { id: 'ms-fm-3', domain: 'fine-motor', description: 'Pega blocos pequenos com pinça digital', rangeAgeMonths: '9-12 meses', status: 'concluido' },
  { id: 'ms-fm-4', domain: 'fine-motor', description: 'Constrói torre de 4 blocos', rangeAgeMonths: '18-22 meses', status: 'concluido' },
  { id: 'ms-fm-5', domain: 'fine-motor', description: 'Tenta imitar linha reta riscada no papel', rangeAgeMonths: '22-30 meses', status: 'atrasado' },
  { id: 'ms-l-1', domain: 'language', description: 'Reage a sons altos batendo palmas', rangeAgeMonths: '1-2 meses', status: 'concluido' },
  { id: 'ms-l-2', domain: 'language', description: 'Vocaliza fonemas isolados (gugular)', rangeAgeMonths: '2-5 meses', status: 'concluido' },
  { id: 'ms-l-3', domain: 'language', description: 'Combina sílabas imitativas (dada, mama)', rangeAgeMonths: '8-12 meses', status: 'concluido' },
  { id: 'ms-l-4', domain: 'language', description: 'Aponta para 3 figuras reconhecíveis indicadas', rangeAgeMonths: '16-20 meses', status: 'concluido' },
  { id: 'ms-l-5', domain: 'language', description: 'Combina duas palavras independentes no cotidiano', rangeAgeMonths: '18-24 meses', status: 'não-concluido' },
  { id: 'ms-gm-1', domain: 'gross-motor', description: 'Eleva a cabeça deitado em pronação', rangeAgeMonths: '1-2 meses', status: 'concluido' },
  { id: 'ms-gm-2', domain: 'gross-motor', description: 'Senta sem suporte mantendo o equilíbrio', rangeAgeMonths: '6-8 meses', status: 'concluido' },
  { id: 'ms-gm-3', domain: 'gross-motor', description: 'Fica de pé apoiando-se em móveis', rangeAgeMonths: '9-11 meses', status: 'concluido' },
  { id: 'ms-gm-4', domain: 'gross-motor', description: 'Chuta bola arremessada devagar para os pés', rangeAgeMonths: '18-24 meses', status: 'concluido' },
  { id: 'ms-gm-5', domain: 'gross-motor', description: 'Salta mantendo os pés juntos no solo', rangeAgeMonths: '24-28 meses', status: 'não-concluido' }
];

export const INITIAL_DENVER_ASSESSMENTS: DenverAssessment[] = [
  {
    id: 'da-1',
    patientId: 'pat-1',
    date: '2026-03-15',
    assessorName: 'Dr. Henrique Vasconcelos',
    status: 'Normal',
    scorePersonalSocial: 80,
    scoreFineMotor: 90,
    scoreLanguage: 75,
    scoreGrossMotor: 100,
    observations: 'Primeira aplicação de triagem do Lucas. Resultados gerais adequados para a idade cronológica de 22 meses. Recomendado manter estímulo domiciliar constante.'
  },
  {
    id: 'da-2',
    patientId: 'pat-1',
    date: '2026-05-21',
    assessorName: 'Dr. Henrique Vasconcelos',
    status: 'Alerta',
    scorePersonalSocial: 80,
    scoreFineMotor: 80,
    scoreLanguage: 60,
    scoreGrossMotor: 80,
    observations: 'Acompanhamento do Lucas. Identificado atraso leve na esfera da Linguagem e comunicação interativa (motor fino expressivo). Próxima rodada deve detalhar teste Portage.'
  },
  {
    id: 'da-4',
    patientId: 'pat-1',
    date: '2026-05-21',
    assessorName: 'Dr. Henrique Vasconcelos',
    status: 'Alerta',
    scorePersonalSocial: 80,
    scoreFineMotor: 80,
    scoreLanguage: 60,
    scoreGrossMotor: 80,
    observations: 'Acompanhamento do Lucas. Identificado atraso leve na esfera da Linguagem e comunicação interativa (motor fino expressivo). Próxima rodada deve detalhar teste Portage.'
  },
  {
    id: 'da-3',
    patientId: 'pat-2',
    date: '2026-05-10',
    assessorName: 'Dra. Amanda Silva Costa',
    status: 'Normal',
    scorePersonalSocial: 90,
    scoreFineMotor: 100,
    scoreLanguage: 90,
    scoreGrossMotor: 95,
    observations: 'Sofia adaptou-se muito bem às atividades lúdicas propostas. Domínio excelente de marcos adaptativos.'
  }
];
