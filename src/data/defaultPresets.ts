/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClinicalData } from '../types/clinical';

export const PDF_SYNTHETIC_EXAMPLE: ClinicalData = {
  tipo: 'evolucao',
  perfil: 'enfermaria-uti',
  formatoSaida: 'completo',
  identificacao: {
    nomeIniciais: 'P.M.S.',
    idade: '68',
    idadeUnidade: 'anos',
    sexo: 'M',
    leito: '12',
    data: '06/05/2026',
    hora: '08:30',
    responsavel: 'Dr. Plantonista / Equipe de Clínica Médica',
    crm: '123456-SP',
    naturalidade: 'São Paulo - SP',
    ocupacao: 'Aposentado',
    acompanhante: 'Filha',
    confiabilidade: 'boa'
  },
  resumoProblemas: {
    tempoInternacao: 'D3 IH',
    motivoInternacao: 'ICC descompensada perfil B',
    intercorrencias: 'Sem intercorrências nas últimas 24 h.',
    comorbidadesAlergias: 'HAS + DM2. Nega alergias conhecidas.',
    tratamentosFimDefinido: 'Furosemida EV D3; sem ATB.',
    acessosDispositivos: 'AVP MSE.',
    examesPorData: [
      { id: '1', data: '04/05', resultado: 'RX tórax: congestão pulmonar' },
      { id: '2', data: '06/05', resultado: 'Creatinina: 1,1 mg/dL; Ureia: 38 mg/dL; K+: 4,2 mEq/L' }
    ]
  },
  sinaisVitais: {
    pa: '124x78',
    fc: '82',
    fr: '18',
    tax: '36.4',
    satO2: '96',
    o2Suporte: 'AA',
    diurese: '1800 ml/24h, clara',
    evacuacoes: 'presentes',
    balanco: '-650 ml/24h',
    glicemia: '118 mg/dL',
    dorEscala: '0/10'
  },
  pacienteRelata: 'Melhora progressiva da dispneia, dormiu bem à noite com 1 travesseiro, boa aceitação da dieta.',
  sintomasAtuais: 'Discreta tosse seca eventual; diurese abundante satisfatória.',
  negativasRelevantes: 'Nega dor torácica, febre, palpitações ou ortopneia nas últimas 24 h.',
  queixaPrincipal: 'Falta de ar e inchaço nas pernas há 5 dias',
  hda: 'Paciente com diagnóstico prévio de insuficiência cardíaca de fração de ejeção reduzida (ICFEr), admitido com piora da classe funcional (NYHA IV), ortopneia e edema de MMII após transgressão alimentar.',
  hpp: 'Hipertensão Arterial Sistêmica de longa data, Diabetes Mellitus Tipo 2 compensado. Nega tabagismo atual ou cirurgias prévias.',
  historiaFamiliar: 'Pai falecido por infarto aos 72 anos. Mãe com história de hipertensão.',
  historiaFisiologica: 'Sono restaurador com uso de diurético diurno, padrão intestinal preservado.',
  historiaSocial: 'Aposentado, reside com esposa e filha em boas condições habitacionais.',
  revisaoSistemas: {
    constitucional: 'Afebril, sem perda de peso aguda recente.',
    cardiovascular: 'Nega precordialgia, refere redução progressiva de ortopneia.',
    respiratorio: 'Sem sibilos ou expectoração purulenta.',
    gastrointestinal: 'Abdome indolor, nega náuseas ou obstipação.',
    geniturinario: 'Diurese espontânea e clara em bom volume.',
    neurologico: 'Lúcido, orientado e cooperativo.'
  },
  exameFisico: {
    estadoGeral: 'Bom estado geral, lúcido e orientado no tempo e espaço, corado, hidratado, anictérico, acianótico, afebril.',
    ectoscopia: 'Sem turgência jugular patológica a 45°, perfusão periférica < 2s.',
    cabecaPescoco: 'Mucosas úmidas e coradas, tireoide não palpável.',
    acv: 'RCR, 2T, BNF, sem sopros audíveis.',
    aResp: 'MVUA, crepitações finas bibasais discretas em bases pulmonares.',
    abdome: 'Plano, flácido, RHA+, indolor à palpação, sem visceromegalias palpáveis.',
    extremidades: 'MMII com edema +/4+, simétrico, com cacifo, panturrilhas livres.',
    neurologicoPele: 'Glasgow 15, sem déficits motores focais ou sinais meníngeos.'
  },
  sinteseClinica: 'Evolui com melhora clínica e redução de sinais congestivos, mantendo estabilidade hemodinâmica e boa resposta à diureticoterapia endovenosa.',
  hipotesePrincipal: {
    codigoCid: 'I50.9',
    nomeCid: 'Insuficiência Cardíaca Congestiva Descompensada (Perfil B)',
    justificativa: 'Congestão pulmonar radiológica + edema periférico responsivo a diurético de alça em paciente com histórico cardiológico.'
  },
  diferenciais: [
    { codigoCid: 'J18.9', nomeCid: 'Pneumonia Adquirida na Comunidade', justificativa: 'Descartada por ausência de febre, leucocitose e consolidação em RX.' },
    { codigoCid: 'I26.9', nomeCid: 'Tromboembolismo Pulmonar', justificativa: 'Baixa probabilidade clínica (escore de Wells baixo).' }
  ],
  condutaDiagnostica: 'Solicitar eletrólitos e função renal (Ureia, Creatinina, K+, Na+) para monitorar segurança da diurese; RX de tórax de controle pré-alta.',
  condutaTerapeutica: 'Manter Furosemida 40 mg EV 12/12h; manter Enalapril 10 mg 12/12h e Carvedilol 12,5 mg 12/12h; controle rigoroso de diurese e peso diário.',
  cuidadosGerais: 'Dieta hipossódica (2g sal/dia), restrição hídrica relativa (1500 mL/dia), cabeceira elevada a 30°, profilaxia para TEV.',
  planoAltaSeguimento: 'Reavaliar transição para via oral (Furosemida VO) conforme balanço hídrico das próximas 24h e estabilidade da função renal. Previsão de alta em 48h se euvolêmico.',
  examesComplementares: [
    { id: '1', exame: 'Creatinina e Ureia séricas', finalidade: 'Monitorar segurança renal da terapia diurética intensiva' },
    { id: '2', exame: 'Sódio e Potássio séricos', finalidade: 'Prevenir hipocalemia induzida por furosemida' }
  ]
};

export const ANAMNESE_CHEST_PAIN_EXAMPLE: ClinicalData = {
  tipo: 'anamnese',
  perfil: 'cardiologia',
  formatoSaida: 'completo',
  identificacao: {
    nomeIniciais: 'J.C.S.',
    idade: '58',
    idadeUnidade: 'anos',
    sexo: 'M',
    leito: 'Urgência - Leito 03',
    data: new Date().toLocaleDateString('pt-BR'),
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    responsavel: 'Médico Emergencista',
    crm: '654321-SP',
    naturalidade: 'Campinas - SP',
    ocupacao: 'Comerciante',
    acompanhante: 'Esposa',
    confiabilidade: 'boa'
  },
  resumoProblemas: {
    tempoInternacao: 'D1 Admissão',
    motivoInternacao: 'Dor torácica típica a esclarecer / Suspeita de SCA',
    intercorrencias: 'Episódio de dor em repouso com pico de intensidade há 2 horas.',
    comorbidadesAlergias: 'HAS, Dislipidemia e Tabagismo (30 maços-ano). Nega alergias.',
    tratamentosFimDefinido: 'Dose de ataque de AAS 200mg e Ticagrelor 180mg administradas na admissão.',
    acessosDispositivos: 'AVP MSE com jelco 18G.',
    examesPorData: [
      { id: '1', data: 'Hoje', resultado: 'ECG: Infradesnivelamento de 1.5mm de ST em V4-V6' }
    ]
  },
  sinaisVitais: {
    pa: '148x92',
    fc: '88',
    fr: '18',
    tax: '36.6',
    satO2: '97',
    o2Suporte: 'AA',
    diurese: 'presente',
    evacuacoes: 'presentes',
    balanco: 'neutro',
    glicemia: '134 mg/dL',
    dorEscala: '7/10'
  },
  pacienteRelata: 'Dor opressiva retroesternal irradiada para mandíbula e membro superior esquerdo, com sudorese fria associada.',
  sintomasAtuais: 'Desconforto precordial residual (escala 3/10 após nitrato sublingual), náuseas discretas.',
  negativasRelevantes: 'Nega febre, tosse, dispneia súbita com dor ventilatório-dependente ou síncope.',
  queixaPrincipal: 'Dor no peito em aperto iniciada há 2 horas',
  hda: 'Paciente relata início súbito de dor precordial em aperto/opressão, de forte intensidade (nota 7/10), com irradiação típica para face interna de MSE e mandíbula, acompanhada de diaforese fria e náuseas, surgida em repouso. Refere alívio parcial com uso de dinitrato de isossorbida 5mg sublingual na unidade de triagem.',
  hpp: 'Hipertenso há 10 anos em uso irregular de Losartana 50mg/dia. Dislipidemia sem tratamento contínuo. Nega diabetes, infarto ou AVC prévio.',
  historiaFamiliar: 'Pai sofreu morte súbita cardíaca aos 52 anos.',
  historiaFisiologica: 'Diurese e fezes sem alterações recentes.',
  historiaSocial: 'Tabagista ativo (1 maço ao dia há 30 anos). Etilismo social aos fins de semana. Sedentário.',
  revisaoSistemas: {
    constitucional: 'Diaforese fria profusa durante o pico doloroso.',
    cardiovascular: 'Precordialgia em aperto, sem palpitações taquicárdicas.',
    respiratorio: 'Eupneico, sem sibilos ou estertores.',
    gastrointestinal: 'Episódio isolado de náusea sem vômitos.',
    geniturinario: 'Sem queixas urinárias.',
    neurologico: 'Lúcido, sem déficits focais.'
  },
  exameFisico: {
    estadoGeral: 'REG, lúcido, orientado, corado, sudoreico, anictérico, afebril.',
    ectoscopia: 'Pele fria e pegajosa durante a dor, sem cianose periférica.',
    cabecaPescoco: 'Sem estase jugular a 45°, carótidas com pulsos amplos e simétricos sem sopros.',
    acv: 'RCR em 2 tempos, bulhas normofonéticas, sem B3 ou B4, sem sopros.',
    aResp: 'MVUA bilateralmente, sem ruídos adventícios.',
    abdome: 'Flácido, indolor, sem massas.',
    extremidades: 'Pulsos periféricos presentes e simétricos, sem edema.',
    neurologicoPele: 'Sem déficits focais.'
  },
  sinteseClinica: 'Quadro clássico de Síndrome Coronariana Aguda sem supradesnivelamento do segmento ST (SCASSST) de alto risco em paciente hipertenso, tabagista com histórico familiar positivo.',
  hipotesePrincipal: {
    codigoCid: 'I21.9',
    nomeCid: 'Síndrome Coronariana Aguda sem Supradesnivelamento de ST (SCASSST) / IAM',
    justificativa: 'Dor torácica anginosa típica prolongada em repouso com alterações isquêmicas de ST no ECG em paciente de alto risco cardiovascular.'
  },
  diferenciais: [
    { codigoCid: 'I71.0', nomeCid: 'Dissecção Aguda de Aorta', justificativa: 'Afastada pela ausência de assimetria de pulsos/pressão arterial e dor em rasgadura dorsal.' },
    { codigoCid: 'I26.9', nomeCid: 'Tromboembolismo Pulmonar', justificativa: 'Menos provável por dor não pleurítica e ausência de taquipneia/dessaturação.' }
  ],
  condutaDiagnostica: 'Coleta seriada de Troponina ultrassensível (0h e 2h); Hemograma, Coagulograma, Ureia, Creatinina, Eletrólitos; Radiografia de tórax no leito; Agendar Cateterismo cardíaco (Estratificação invasiva precoce < 24h).',
  condutaTerapeutica: 'Enoxaparina 1 mg/kg SC 12/12h; Atorvastatina 80 mg VO; Metoprolol succinato 25 mg VO (se FC > 70 e sem sinais de IC/broncoespasmo); Analgesia com Morfina se dor refratária.',
  cuidadosGerais: 'Monitorização eletrocardiográfica contínua em leito de observação crítica / UTI; O2 se SatO2 < 90%; Repouso no leito; Jejum oral.',
  planoAltaSeguimento: 'Transferência para Unidade Coronariana (UCO) para estratificação invasiva e cineangiocoronariografia.',
  examesComplementares: [
    { id: '1', exame: 'Curva de Troponina ultrassensível 0h e 2h', finalidade: 'Confirmar necrose miocárdica e estratificar risco TIMI / GRACE' },
    { id: '2', exame: 'Eletrocardiograma seriado a cada 6h ou na dor', finalidade: 'Vigiar evolução para supradesnivelamento de ST ou arritmias' },
    { id: '3', exame: 'Cineangiocoronariografia (Cateterismo)', finalidade: 'Visualizar anatomia coronariana e guiar angioplastia com stent' }
  ]
};

export const BLANK_CLINICAL_DATA: ClinicalData = {
  tipo: 'anamnese',
  perfil: 'clinica-geral',
  formatoSaida: 'completo',
  identificacao: {
    nomeIniciais: '',
    idade: '',
    idadeUnidade: 'anos',
    sexo: 'M',
    leito: '',
    data: new Date().toLocaleDateString('pt-BR'),
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    responsavel: '',
    crm: '',
    naturalidade: '',
    ocupacao: '',
    acompanhante: '',
    confiabilidade: 'boa'
  },
  resumoProblemas: {
    tempoInternacao: '',
    motivoInternacao: '',
    intercorrencias: '',
    comorbidadesAlergias: '',
    tratamentosFimDefinido: '',
    acessosDispositivos: '',
    examesPorData: []
  },
  sinaisVitais: {
    pa: '',
    fc: '',
    fr: '',
    tax: '',
    satO2: '',
    o2Suporte: 'AA',
    diurese: '',
    evacuacoes: '',
    balanco: '',
    glicemia: '',
    dorEscala: ''
  },
  pacienteRelata: '',
  sintomasAtuais: '',
  negativasRelevantes: '',
  queixaPrincipal: '',
  hda: '',
  hpp: '',
  historiaFamiliar: '',
  historiaFisiologica: '',
  historiaSocial: '',
  revisaoSistemas: {
    constitucional: '',
    cardiovascular: '',
    respiratorio: '',
    gastrointestinal: '',
    geniturinario: '',
    neurologico: ''
  },
  exameFisico: {
    estadoGeral: '',
    ectoscopia: '',
    cabecaPescoco: '',
    acv: '',
    aResp: '',
    abdome: '',
    extremidades: '',
    neurologicoPele: ''
  },
  sinteseClinica: '',
  hipotesePrincipal: {
    codigoCid: '',
    nomeCid: '',
    justificativa: ''
  },
  diferenciais: [],
  condutaDiagnostica: '',
  condutaTerapeutica: '',
  cuidadosGerais: '',
  planoAltaSeguimento: '',
  examesComplementares: []
};
