/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DocumentType = 'evolucao' | 'anamnese';

export type SpecialtyProfile =
  | 'clinica-geral'
  | 'enfermaria-uti'
  | 'cardiologia'
  | 'pneumologia'
  | 'cirurgia'
  | 'pediatria';

export type OutputFormat = 'completo' | 'sintetico' | 'soap-problemas' | 'academico' | 'pedagogico-mccp';

export interface ExamRecord {
  id: string;
  data: string;
  resultado: string;
}

export interface ComplementaryExam {
  id: string;
  exame: string;
  finalidade: string;
}

export interface VitalSigns {
  pa: string; // Ex: 124x78
  fc: string; // Ex: 82
  fr: string; // Ex: 18
  tax: string; // Ex: 36.5
  satO2: string; // Ex: 96
  o2Suporte: string; // Ex: AA, Cateter 2L/min, Máscara Não-reinalante
  diurese: string; // Ex: 1400 ml/24h, clara
  evacuacoes: string; // Ex: presentes, Bristol 4
  balanco: string; // Ex: +250 ml / 24h
  glicemia?: string; // Ex: 110 mg/dL
  dorEscala?: string; // Ex: 0/10
}

export interface PatientIdentification {
  nomeIniciais: string;
  idade: string;
  idadeUnidade: 'anos' | 'meses' | 'dias';
  sexo: 'M' | 'F' | 'outro';
  leito: string;
  data: string;
  hora: string;
  responsavel: string;
  crm?: string;
  naturalidade: string;
  ocupacao: string;
  acompanhante: string;
  confiabilidade: 'boa' | 'moderada' | 'duvidosa' | 'prejudicada';
  // Campos detalhados do Roteiro de Anamnese do Adulto (PUCRS)
  corEtnia?: string;
  estadoCivil?: string;
  procedencia?: string;
  religiao?: string;
  escolaridade?: string;
  filiacao?: string;
  convenioSus?: string;
  clinicaEnfermaria?: string;
}

export interface ResumoProblemas {
  tempoInternacao: string; // #1 Ex: D3 IH
  motivoInternacao: string; // #2 Ex: ICC descompensada perfil B
  intercorrencias: string; // #3 Ex: Sem intercorrências nas últimas 24h
  comorbidadesAlergias: string; // #4 Ex: HAS + DM2. Nega alergias conhecidas
  tratamentosFimDefinido: string; // #5 Ex: D3/7 ceftriaxona; D2/5 prednisona; Furosemida EV D3
  acessosDispositivos: string; // #6 Ex: AVP MSE; CVC jugular D; SVD; O2 cateter 2 L/min
  examesPorData: ExamRecord[]; // #7 Ex: 04/05 RX tórax: congestão; 06/05 creatinina: 1.1
}

export interface ReviewOfSystems {
  constitucional: string; // febre, perda ponderal, astenia
  cardiovascular: string; // dor torácica, palpitações, síncope, edema
  respiratorio: string; // dispneia, tosse, expectoração, sibilância
  gastrointestinal: string; // dor, vômitos, diarreia, constipação, sangramentos
  geniturinario: string; // disúria, hematúria, alteração de diurese
  neurologico: string; // cefaleia, déficit focal, convulsão, confusão
  cabecaPescoco?: string; // visão, audição, orofaringe, tireoide, linfonodos
  osteoarticular?: string; // artralgias, artrites, rigidez matinal
  peleAnexos?: string; // lesões, prurido, alopecia, alterações tróficas
}

export interface PhysicalExam {
  estadoGeral: string; // BEG / MEG / REG, corado, hidratado, anictérico, acianótico, afebril
  ectoscopia: string; // fácies atípica, perfusão periférica < 2s, sem linfonodomegalias
  cabecaPescoco: string; // pupilas isocóricas e fotorreagentes, sem turgência jugular
  acv: string; // RCR, 2T, BNF, sem sopros
  aResp: string; // MVUA, sem RA (ou crepitações bibasais finas)
  abdome: string; // RHA+, plano, flácido, indolor à palpação, sem visceromegalias, descompressão indolor
  extremidades: string; // pulsos periféricos palpáveis e simétricos, sem empastamento ou edema (ou edema +/4+)
  neurologicoPele: string; // vigil, orientado no tempo e espaço, sem déficits motores ou sensitivos
}

export interface ClinicalHypothesis {
  codigoCid: string;
  nomeCid: string;
  justificativa: string;
}

// Dimensões do Roteiro Pedagógico (Método Clínico Centrado na Pessoa - MCCP)
export interface FifeDimensions {
  sentimentos: string; // F - Feelings: medos, preocupações do paciente
  ideias: string;      // I - Ideas: o que o paciente acha que é a causa
  funcao: string;      // F - Function: impacto no trabalho, sono, vida diária
  expectativas: string;// E - Expectations: o que espera da consulta e do tratamento
}

// Raciocínio Clínico Semiológico em 3 Níveis (Roteiro Pedagógico)
export interface RaciocinioClinico {
  sindromico: string;   // Diagnóstico Sindrômico (ex: Síndrome Coronariana Aguda)
  topografico: string;  // Diagnóstico Topográfico (ex: Miocárdio de Parede Anterior)
  etiologico: string;   // Diagnóstico Etiológico (ex: Aterosclerose com rotura de placa)
}

// Hábitos de Vida & Condições Socioeconômicas (Roteiro de Anamnese do Adulto)
export interface HabitosVida {
  tabagismoStatus: 'nunca-fumou' | 'fumante-ativo' | 'ex-fumante' | '';
  cigarrosDia: string;
  anosFumo: string;
  cargaTabagicaAnosMaco: string; // Calculado: (cigarrosDia/20) * anosFumo
  etilismo: string; // Frequência, tipo, quantidade (CAGE)
  drogasIlicitas: string;
  alimentacao: string;
  atividadeFisica: string;
  padraoSono: string;
  condicoesMoradia: string; // Água tratada, esgoto, cômodos, animais
  riscosOcupacionais: string; // Exposição a poeiras, químicos, estresse
}

export interface ClinicalData {
  tipo: DocumentType;
  perfil: SpecialtyProfile;
  formatoSaida: OutputFormat;
  identificacao: PatientIdentification;
  resumoProblemas: ResumoProblemas;
  sinaisVitais: VitalSigns;
  
  // Subjetivo (Evolução)
  pacienteRelata: string;
  sintomasAtuais: string;
  negativasRelevantes: string;

  // Anamnese Completa
  queixaPrincipal: string;
  hda: string;
  hpp: string; // Antecedentes Pessoais Patológicos
  historiaFamiliar: string;
  historiaFisiologica: string;
  historiaSocial: string;
  revisaoSistemas: ReviewOfSystems;

  // Dimensões do Roteiro Pedagógico (MCCP - FIFE)
  experienciaDoencaFife?: FifeDimensions;

  // Raciocínio Semiológico Pedagógico (3 Níveis)
  raciocinioClinico?: RaciocinioClinico;

  // Hábitos de Vida Detalhados (Roteiro Adulto)
  habitosVidaDetalhado?: HabitosVida;

  // Antecedentes Fisiológicos Estruturados
  antecedentesFisiologicos?: string;

  // Objetivo (Exame Físico)
  exameFisico: PhysicalExam;

  // Impressão / Avaliação (A)
  sinteseClinica: string;
  hipotesePrincipal: ClinicalHypothesis;
  diferenciais: ClinicalHypothesis[];

  // Conduta (P)
  condutaDiagnostica: string;
  condutaTerapeutica: string;
  cuidadosGerais: string;
  planoAltaSeguimento: string;
  examesComplementares: ComplementaryExam[];

  // Orientações ao Paciente & Sinais de Alarme (Roteiro Pedagógico)
  sinaisAlarme?: string;
  planoNaoFarmacologico?: string;
}

export interface Cid10ProtocolItem {
  id: string;
  cid: string;
  nome: string;
  categoria: string;
  sinonimos: string[];
  regexTrigger: RegExp;
  diferenciaisComuns: string[];
  examesSugeridos: Array<{ exame: string; finalidade: string }>;
  condutaTerapeuticaSugerida: string;
  cuidadosGeraisSugeridos: string;
  orientacoesAlta: string;
  alertasClinicos?: string[];
}

export interface ChecklistVerification {
  identificacaoConferida: boolean;
  diagnosticoClaro: boolean;
  intercorrenciasRegistradas: boolean;
  alergiasAntibioticosComDias: boolean;
  sinaisVitaisExameCoerentes: boolean;
  impressaoClinicaObjetiva: boolean;
  examesFinalidadeExplicita: boolean;
  condutasSeparadas: boolean;
  pendenciasPlanoRegistrados: boolean;
  linguagemProfissionalSemAmbiguidades: boolean;
}
