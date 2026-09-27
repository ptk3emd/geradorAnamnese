/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhysicalExam, VitalSigns } from '../types/clinical';

export type ExamTargetField = keyof PhysicalExam;

export interface ExamSuggestionItem {
  id: string;
  syndrome: string;
  targetField: ExamTargetField;
  title: string;
  clinicalRationale: string;
  searchKeywords: string[];
  suggestedNormal: string;
  suggestedAbnormal: string;
  status?: 'missing' | 'present';
}

export interface DetectedSyndrome {
  name: string;
  matchedTerms: string[];
  color: string;
}

export interface DifferentialExamAnalysis {
  detectedSyndromes: DetectedSyndrome[];
  suggestions: ExamSuggestionItem[];
  missingCount: number;
  presentCount: number;
}

interface SyndromeRule {
  name: string;
  triggerRegex: RegExp;
  color: string;
  suggestions: Omit<ExamSuggestionItem, 'status' | 'syndrome'>[];
}

const SYNDROME_RULES: SyndromeRule[] = [
  {
    name: 'Dor Torácica / Precordialgia',
    triggerRegex: /(dor tor[aá]cica|precordial|dor no peito|queima[çc][aã]o no peito|aperto no peito|angina|retroesternal|dor ventilat[oó]rio-dependente|dor pleur[ií]tica)/i,
    color: 'border-red-500/40 text-red-300 bg-red-500/10',
    suggestions: [
      {
        id: 'dor-toracica-pulsos',
        targetField: 'extremidades',
        title: 'Simetria e Amplitude dos Pulsos Periféricos',
        clinicalRationale: 'Fundamental para rastreio de dissecção aguda de aorta e choque cardiogênico.',
        searchKeywords: ['pulsos', 'sim[eé]tric', 'radia', 'femorais', 'amplitude'],
        suggestedNormal: 'pulsos periféricos radiais e femorais amplos, simétricos e sincrônicos, sem assimetria de pulso',
        suggestedAbnormal: 'assimetria de pulsos periféricos entre membros superiores/inferiores',
      },
      {
        id: 'dor-toracica-acv-sopros-atrito',
        targetField: 'acv',
        title: 'Ausculta de Sopros, B3/B4 e Atrito Pericárdico',
        clinicalRationale: 'Pesquisa de sopro de regurgitação aórtica (dissecção), B3 (falência de VE) e atrito pericárdico.',
        searchKeywords: ['atrito', 'sopro', 'b3', 'b4', 'galope', 'peric[aá]rd'],
        suggestedNormal: 'sem sopros regurgitantes, sem terceira ou quarta bulha (B3/B4 ausentes), sem atrito pericárdico audível',
        suggestedAbnormal: 'presença de atrito pericárdico em bordo esternal esquerdo / sopro diastólico aórtico aspirativo',
      },
      {
        id: 'dor-toracica-jugular',
        targetField: 'cabecaPescoco',
        title: 'Turgência Jugular Patológica a 45°',
        clinicalRationale: 'Avaliação de congestão venosa sistêmica, sobrecarga de ventrículo direito ou tamponamento cardíaco.',
        searchKeywords: ['turg[eê]ncia', 'jugular', 'estase'],
        suggestedNormal: 'sem turgência jugular patológica a 45°, pulsos carotídeos sem sopros',
        suggestedAbnormal: 'turgência jugular patológica a 45° presente (ingurgitamento jugular)',
      },
      {
        id: 'dor-toracica-palpacao-toracica',
        targetField: 'estadoGeral',
        title: 'Palpação da Parede Torácica & Articulações Condrocostais',
        clinicalRationale: 'Diferenciação de dor musculoesquelética / costocondrite (Síndrome de Tietze).',
        searchKeywords: ['parede tor[aá]cica', 'condrocost', 'palpa[çc][aã]o tor[aá]cica', 'tietze'],
        suggestedNormal: 'parede torácica sem dor à palpação de articulações condrocostais ou musculatura',
        suggestedAbnormal: 'dor reproduzível à palpação localizada de articulações condrocostais esquerdas',
      },
      {
        id: 'dor-toracica-aresp-crepitacoes',
        targetField: 'aResp',
        title: 'Pesquisa de Estertores / Congestão Pulmonar',
        clinicalRationale: 'Exclusão de edema agudo de pulmão secundário à síndrome coronariana ou pneumotórax hipertensivo.',
        searchKeywords: ['crepita', 'estertores', 'pulmonar', 'mvua', 'sim[eé]trico'],
        suggestedNormal: 'murmúrio vesicular simétrico, sem estertores crepitantes pulmonares bibasais',
        suggestedAbnormal: 'estertores crepitantes finos tele-inspiratórios em terço inferior de ambos os hemitórax',
      },
    ],
  },
  {
    name: 'Dispneia / Desconforto Respiratório',
    triggerRegex: /(dispneia|falta de ar|cansa[çc]o|dificuldade para respirar|ortopneia|dpn|sufoca[çc][aã]o|chieira|chiado)/i,
    color: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    suggestions: [
      {
        id: 'dispneia-tiragem-respiratorio',
        targetField: 'aResp',
        title: 'Sinais de Desconforto: Tiragem e Ruídos Adventícios',
        clinicalRationale: 'Avalia gravidade do desconforto, uso de musculatura acessória, sibilos ou crepitações.',
        searchKeywords: ['tiragem', 'musculatura acess[oó]ria', 'sibilo', 'crepita', 'batimento'],
        suggestedNormal: 'sem uso de musculatura acessória, sem tiragem intercostal ou supraclavicular, ausência de sibilos',
        suggestedAbnormal: 'tiragem intercostal leve/moderada com sibilos expiratórios difusos e tempo expiratório prolongado',
      },
      {
        id: 'dispneia-edema-mmii-godet',
        targetField: 'extremidades',
        title: 'Edema de MMII com Sinal de Godet e Perfusão Periférica',
        clinicalRationale: 'Diferenciação entre etiologia cardíaca congestiva (ICC) e pulmonar primária (DPOC/Asma).',
        searchKeywords: ['godet', 'edema', 'cacifo', 'mmii', 'perfus[aã]o'],
        suggestedNormal: 'membros inferiores sem edema, sem sinal de Godet/cacifo, tempo de enchimento capilar < 2s',
        suggestedAbnormal: 'edema bilateral de membros inferiores até terço médio da perna, depressível (Godet 2+/4+), indolor',
      },
      {
        id: 'dispneia-jugular-hepatojugular',
        targetField: 'cabecaPescoco',
        title: 'Estase Jugular e Refluxo Hepatojugular',
        clinicalRationale: 'Critério maior de Framingham para insuficiência cardíaca descompensada.',
        searchKeywords: ['jugular', 'refluxo', 'hepatojugular'],
        suggestedNormal: 'ausência de turgência jugular a 45°, refluxo hepatojugular negativo',
        suggestedAbnormal: 'turgência jugular patológica evidente a 45° com refluxo hepatojugular positivo',
      },
      {
        id: 'dispneia-acv-ritmo-b3',
        targetField: 'acv',
        title: 'Pesquisa de Terceira Bulha (B3) e Ictus Cordis',
        clinicalRationale: 'Marcador de sobrecarga volumétrica ventricular e disfunção sistólica importante.',
        searchKeywords: ['b3', 'terceira bulha', 'galope', 'ictus'],
        suggestedNormal: 'bulhas normofonéticas em 2 tempos, sem terceira bulha (B3 ausente), ictus em 5º EIC na linha hemiclavicular',
        suggestedAbnormal: 'ritmo de galope ventricular com presença de terceira bulha (B3 audível em foco mitral)',
      },
    ],
  },
  {
    name: 'Dor Abdominal / Abdome Agudo',
    triggerRegex: /(dor abdominal|dor na barriga|epigastr|fossa il[ií]aca|c[oó]lica abdominal|abdome agudo|n[aá]usea|v[oô]mito|parada de fezes)/i,
    color: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10',
    suggestions: [
      {
        id: 'dor-abd-blumberg-descompressao',
        targetField: 'abdome',
        title: 'Sinal de Blumberg (Descompressão Brusca Peritoneal)',
        clinicalRationale: 'Principal manobra para descartar irritação peritoneal / peritonite aguda (ex: apendicite, perfuração).',
        searchKeywords: ['blumberg', 'descompress[aã]o', 'irrita[çc][aã]o peritoneal', 'defesa'],
        suggestedNormal: 'descompressão brusca indolor em todos os quadrantes (Blumberg negativo), sem sinais de peritonite',
        suggestedAbnormal: 'descompressão brusca dolorosa em fossa ilíaca direita (Sinal de Blumberg positivo)',
      },
      {
        id: 'dor-abd-murphy',
        targetField: 'abdome',
        title: 'Sinal de Murphy (Interrupção Inspiratória em Hipocôndrio Direito)',
        clinicalRationale: 'Essencial para afastar colecistite aguda litiásica ou cálculo biliar impactado.',
        searchKeywords: ['murphy', 'c[ií]stic', 'hipoc[oô]ndrio direito'],
        suggestedNormal: 'Sinal de Murphy negativo (sem dor ou interrupção inspiratória à palpação de ponto cístico)',
        suggestedAbnormal: 'Sinal de Murphy positivo com parada súbita da inspiração à palpação profunda em hipocôndrio direito',
      },
      {
        id: 'dor-abd-giordano',
        targetField: 'abdome',
        title: 'Sinal de Giordano (Punho-Percussão Lombar)',
        clinicalRationale: 'Fundamental para diferenciar litíase renoureteral e pielonefrite aguda de abdome cirúrgico.',
        searchKeywords: ['giordano', 'punho-percuss[aã]o', 'lombar', 'fossas lombares'],
        suggestedNormal: 'punho-percussão lombar bilateral indolor (Sinal de Giordano negativo)',
        suggestedAbnormal: 'punho-percussão lombar francamente dolorosa unilateral (Sinal de Giordano positivo)',
      },
      {
        id: 'dor-abd-rha-peristalse',
        targetField: 'abdome',
        title: 'Ruídos Hidroaéreos (RHA) e Distensão',
        clinicalRationale: 'Detecta íleo paralítico, oclusão mecânica intestinal (RHA metálicos) ou isquemia mesentérica.',
        searchKeywords: ['rha', 'ru[ií]dos hidroa[eé]reos', 'peristalse', 'timpanis'],
        suggestedNormal: 'ruídos hidroaéreos presentes e normoativos nos quatro quadrantes, abdome sem distensão',
        suggestedAbnormal: 'ruídos hidroaéreos aumentados com timbre metálico em episódios de cólica / RHA abolidos',
      },
      {
        id: 'dor-abd-hernias-ectoscopia',
        targetField: 'ectoscopia',
        title: 'Inspeção de Orifícios Herniários e Icterícia',
        clinicalRationale: 'Descartar hérnias inguinais/femorais encarceradas e coledocolitíase/icterícia em escleras.',
        searchKeywords: ['herni', 'inguina', 'icter[ií]cia', 'esclera', 'orif[ií]cio'],
        suggestedNormal: 'escleras anictéricas, orifícios herniários inguinais livres e indolores à palpação com manobra de Valsalva',
        suggestedAbnormal: 'presença de abaulamento irredutível e doloroso em região inguinal / escleras ictéricas',
      },
    ],
  },
  {
    name: 'Cefaleia / Dor de Cabeça',
    triggerRegex: /(cefaleia|dor de cabe[çc]a|enxaqueca|holocraniana|puls[aá]til na cabe[çc]a|fotofobia)/i,
    color: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    suggestions: [
      {
        id: 'cefaleia-meningeos',
        targetField: 'neurologicoPele',
        title: 'Sinais Meníngeos: Rigidez de Nuca, Kernig e Brudzinski',
        clinicalRationale: 'Crítico para descartar meningite bacteriana/viral e hemorragia subaracnóidea (HSA).',
        searchKeywords: ['rigidez de nuca', 'nuca', 'kernig', 'brudzinski', 'men[ií]nge'],
        suggestedNormal: 'sem rigidez de nuca, flexão cervical passiva indolor e livre, sinais de Kernig e Brudzinski ausentes',
        suggestedAbnormal: 'rigidez de nuca nítida à flexão anterior com sinais de Kernig e Brudzinski positivos',
      },
      {
        id: 'cefaleia-pupilas-fotomotor',
        targetField: 'cabecaPescoco',
        title: 'Pupilas: Simetria e Reflexo Fotomotor (Direto e Consensual)',
        clinicalRationale: 'Avaliação de anisocoria, herniação uncal ou lesões expansivas com hipertensão intracraniana.',
        searchKeywords: ['pupila', 'isoc[oó]ric', 'fotomotor', 'anisoc[oó]ri', 'fotorreagent'],
        suggestedNormal: 'pupilas isocóricas e fotorreagentes ao estímulo luminoso direto e consensual',
        suggestedAbnormal: 'anisocoria pupilar (D > E) com fotorreatividade diminuída à direita',
      },
      {
        id: 'cefaleia-pares-deficit',
        targetField: 'neurologicoPele',
        title: 'Pares Cranianos & Déficit Motor Focal',
        clinicalRationale: 'Pesquisa de paralisia de III, IV ou VI pares, assimetria facial ou hemiparesia motora.',
        searchKeywords: ['pares cranianos', 'focal', 'paresia', 'for[çc]a motora', 'mímica facial'],
        suggestedNormal: 'motricidade ocular preservada sem diplopia, mímica facial simétrica, força motora grau 5 nos 4 membros',
        suggestedAbnormal: 'assimetria facial com paresia de membro superior contralateral',
      },
      {
        id: 'cefaleia-arterias-temporais',
        targetField: 'cabecaPescoco',
        title: 'Palpação de Artérias Temporais (em > 50 anos)',
        clinicalRationale: 'Investigação de Arterite de Células Gigantes (Arterite Temporal) para prevenção de perda visual.',
        searchKeywords: ['art[eé]ria temporal', 'temporal', 'espessamento'],
        suggestedNormal: 'artérias temporais superficiais bilaterais palpáveis, indolores e sem espessamento nodular',
        suggestedAbnormal: 'artéria temporal espessada, nodular e dolorosa à palpação local',
      },
    ],
  },
  {
    name: 'Febre / Síndrome Infecciosa Aguda',
    triggerRegex: /(febre|febril|calafrio|tax elevada|sudorese noturna|calafrios|bacteri[ae]|infec[çc][aã]o)/i,
    color: 'border-orange-500/40 text-orange-300 bg-orange-500/10',
    suggestions: [
      {
        id: 'febre-ectoscopia-pele-tec',
        targetField: 'ectoscopia',
        title: 'Perfusão Capilar (TEC), Petéquias e Fácies Tóxica',
        clinicalRationale: 'Rastreio precoce de sepse, disfunção orgânica periférica e meningococcemia/endocardite.',
        searchKeywords: ['tec', 'perfus[aã]o', 'enchimento capilar', 'pet[eé]quia', 'rash', 'exantema'],
        suggestedNormal: 'pele sem lesões ou petéquias, mucosas coradas e úmidas, tempo de enchimento capilar < 2 segundos',
        suggestedAbnormal: 'tempo de enchimento capilar lentificado (> 3s), extremidades frias com livedo reticular / petéquias',
      },
      {
        id: 'febre-oroscopia-linfonodos',
        targetField: 'cabecaPescoco',
        title: 'Oroscopia e Cadeias Linfonodais Cervicais',
        clinicalRationale: 'Foco infeccioso em vias aéreas superiores: amigdalite, abscesso periamigdaliano, sinusite.',
        searchKeywords: ['oroscopia', 'am[ií]gdala', 'orofaringe', 'linfonod', 'cervical'],
        suggestedNormal: 'oroscopia sem hiperemia ou placas purulentas, ausência de linfonodomegalias cervicais patológicas',
        suggestedAbnormal: 'orofaringe hiperemiada com exsudato purulento em amígdalas e linfonodomegalia submandibular dolorosa',
      },
      {
        id: 'febre-ausculta-respiratoria',
        targetField: 'aResp',
        title: 'Foco Infeccioso Pulmonar: Crepitações e Sopro Tubário',
        clinicalRationale: 'Pesquisa semiológica de pneumonia comunitária (PAC) ou broncopneumonia.',
        searchKeywords: ['crepita', 'sopro tub[aá]rio', 'bronc', 'pneumon'],
        suggestedNormal: 'murmúrio vesicular simétrico, sem estertores crepitantes localizados ou broncofonia patológica',
        suggestedAbnormal: 'estertores crepitantes finos localizados em base direita associados a aumento do frêmito toracovocal',
      },
    ],
  },
  {
    name: 'Síncope / Vertigem / Tontura',
    triggerRegex: /(s[ií]ncope|desmaio|lipotimia|tontura|vertigem|escurecimento visual|perda transit[oó]ria da consci[eê]ncia)/i,
    color: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    suggestions: [
      {
        id: 'sincope-pa-ortostatica',
        targetField: 'extremidades',
        title: 'Avaliação de Hipotensão Ortostática e Pulsos',
        clinicalRationale: 'Queda de PAS ≥ 20 mmHg ou PAD ≥ 10 mmHg após 3 min ortostático confirma síncope autonômica/medicamentosa.',
        searchKeywords: ['ortost[aá]t', 'postura', 'dec[uú]bito', 'deitado'],
        suggestedNormal: 'sem hipotensão postural à mudança de decúbito, pulsos periféricos amplos e simétricos',
        suggestedAbnormal: 'hipotensão ortostática documentada (queda de PA em ortostase com reprodução de sintomas pré-sincopais)',
      },
      {
        id: 'sincope-acv-sopro-aortico',
        targetField: 'acv',
        title: 'Ausculta de Estenose Aórtica / Cardiomiopatia Hipertrófica',
        clinicalRationale: 'Estenose aórtica grave e CMH provocam obstrução dinâmica de via de saída gerando síncope de esforço.',
        searchKeywords: ['estenose', 'sopro sist[oó]lico', 'eje[çc][aã]o', 'foco a[oó]rtico'],
        suggestedNormal: 'ritmo cardíaco regular, bulhas normofonéticas sem sopro sistólico ejetivo em foco aórtico',
        suggestedAbnormal: 'sopro telessistólico rude em foco aórtico com irradiação para carótidas e desdobramento paradoxal de B2',
      },
      {
        id: 'sincope-neurologico-nistagmo-romberg',
        targetField: 'neurologicoPele',
        title: 'Nistagmo, Romberg e Equilíbrio',
        clinicalRationale: 'Diferencia vertigem periférica (labirintopatia/VPPB) de AVC de tronco ou cerebelo.',
        searchKeywords: ['nistagmo', 'romberg', 'equil[ií]brio', 'marcha', 'dix-hallpike'],
        suggestedNormal: 'pesquisa de nistagmo espontâneo negativa, teste de Romberg estático e dinâmico negativo, marcha estável',
        suggestedAbnormal: 'nistagmo horizontal-rotatório esgotável à fixação do olhar com desvio postural lateralizado',
      },
    ],
  },
  {
    name: 'Edema de MMII / Suspeita de TVP',
    triggerRegex: /(edema de membros|pernas inchadas|dor na panturrilha|edema unilateral|trombose|tvp|incha[çc]o nas pernas)/i,
    color: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
    suggestions: [
      {
        id: 'tvp-panturrilha-homans',
        targetField: 'extremidades',
        title: 'Sinal de Homans & Empastamento Muscular da Panturrilha',
        clinicalRationale: 'Manobras clássicas para investigar trombose venosa profunda em membro com dor/edema.',
        searchKeywords: ['homans', 'empastamento', 'panturrilha', 'panturrilhas', 'bandeira'],
        suggestedNormal: 'panturrilhas livres e sem empastamento, Sinal de Homans negativo bilateralmente, sem dor à dorsiflexão',
        suggestedAbnormal: 'panturrilha esquerda endurecida com empastamento muscular positivo e Sinal de Homans francamente positivo',
      },
      {
        id: 'tvp-assimetria-circunferencia',
        targetField: 'extremidades',
        title: 'Simetria da Circunferência e Temperatura Local',
        clinicalRationale: 'Diferença de panturrilha > 3 cm (medida 10cm abaixo da tuberosidade da tíbia) compõe o Escore de Wells.',
        searchKeywords: ['assimetria', 'circunfer[eê]ncia', 'temperatura', 'calor'],
        suggestedNormal: 'membros inferiores simétricos em diâmetro, sem hiperemia, temperatura preservada e homogênea',
        suggestedAbnormal: 'assimetria de panturrilha com edema unilateral evidente (> 3 cm de diferença) e calor local aumentado',
      },
    ],
  },
  {
    name: 'Déficit Neurológico Focal / Suspeita de AVC',
    triggerRegex: /(fraqueza de um lado|perda de for[çc]a|dorm[eê]ncia|boca torta|dificuldade para falar|disartria|hemiparesia|avc|ave|isquemia cerebral)/i,
    color: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
    suggestions: [
      {
        id: 'avc-escala-cincinnati',
        targetField: 'neurologicoPele',
        title: 'Tríade de Cincinnati / NIHSS (Face, Braço, Fala)',
        clinicalRationale: 'Tríade fundamental para triagem e reconhecimento rápido de acidente vascular encefálico.',
        searchKeywords: ['cincinnati', 'rima', 'm[ií]mica facial', 'queda do bra[çc]o', 'fala', 'disartria'],
        suggestedNormal: 'mímica facial simétrica sem desvio de rima, sem queda sustentada de membros (teste dos braços estendidos normal), fala fluente sem disartria',
        suggestedAbnormal: 'desvio de rima labial para a esquerda com paresia de membro superior direito (queda do braço em < 10s) e disartria',
      },
      {
        id: 'avc-babinski',
        targetField: 'neurologicoPele',
        title: 'Reflexo Cutâneo-Plantar (Sinal de Babinski)',
        clinicalRationale: 'Evidencia lesão do trato corticoespinhal / primeiro neurônio motor.',
        searchKeywords: ['babinski', 'cut[aá]neo-plantar', 'reflexo plantar'],
        suggestedNormal: 'reflexo cutâneo-plantar em flexão bilateralmente (Sinal de Babinski ausente)',
        suggestedAbnormal: 'reflexo cutâneo-plantar em extensão unilateral (Sinal de Babinski presente)',
      },
      {
        id: 'avc-sopros-carotideos',
        targetField: 'cabecaPescoco',
        title: 'Ausculta de Sopros Carotídeos',
        clinicalRationale: 'Detecção de estenose carotídea significativa como fonte aterotrombótica embólica.',
        searchKeywords: ['car[oó]tid', 'sopro carot[ií]deo', 'pulsos carot[ií]deos'],
        suggestedNormal: 'pulsos carotídeos simétricos, amplos, sem sopros auscultáveis em bifurcações',
        suggestedAbnormal: 'presença de sopro sistólico carotídeo unilateral em terço médio cervical',
      },
    ],
  },
  {
    name: 'Lombalgia / Dor Lombar Aguda',
    triggerRegex: /(lombalgia|dor na coluna|dor nas costas|ci[aá]tic|irradia[çc][aã]o para perna|dor lombar)/i,
    color: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    suggestions: [
      {
        id: 'lomb-lasegue',
        targetField: 'neurologicoPele',
        title: 'Manobra de Lasègue (Elevação da Perna Estendida)',
        clinicalRationale: 'Pesquisa de compressão radicular lombo-sacra / hérnia discal aguda (L4-L5, L5-S1).',
        searchKeywords: ['las[eè]gue', 'eleva[çc][aã]o da perna', 'radiculopatia'],
        suggestedNormal: 'Manobra de Lasègue negativa bilateralmente até 70 graus, sem dor irradiada abaixo do joelho',
        suggestedAbnormal: 'Manobra de Lasègue positiva a 40 graus com dor irradiada em choque na face posterior da coxa e perna',
      },
      {
        id: 'lomb-giordano-renal',
        targetField: 'abdome',
        title: 'Exclusão de Foco Renoureteral (Sinal de Giordano)',
        clinicalRationale: 'Diferenciação mandatória entre lombalgia mecânica e cólica nefrética/pielonefrite.',
        searchKeywords: ['giordano', 'punho-percuss[aã]o', 'fossa renal'],
        suggestedNormal: 'punho-percussão lombar bilateral indolor (Giordano negativo), dor exclusivamente mecânica à palpação de paravertebrais',
        suggestedAbnormal: 'punho-percussão lombar intensamente dolorosa unilateralmente (Giordano positivo)',
      },
    ],
  },
];

/**
 * Analyzes the user's entered QP and HDA/HMA against the current physical exam fields
 * and returns auto-suggested semiological items with missing/present status.
 */
export function analyzeDifferentialExamLogic(
  queixaPrincipal: string,
  hda: string,
  exameFisico: PhysicalExam,
  sinaisVitais?: VitalSigns
): DifferentialExamAnalysis {
  const combinedHistory = `${queixaPrincipal || ''} ${hda || ''}`.toLowerCase();

  // Combine all physical exam text to check if any keyword is already mentioned
  const examFullText = [
    exameFisico.estadoGeral || '',
    exameFisico.ectoscopia || '',
    exameFisico.cabecaPescoco || '',
    exameFisico.acv || '',
    exameFisico.aResp || '',
    exameFisico.abdome || '',
    exameFisico.extremidades || '',
    exameFisico.neurologicoPele || '',
    sinaisVitais?.pa || '',
    sinaisVitais?.fc || '',
    sinaisVitais?.fr || '',
    sinaisVitais?.satO2 || '',
  ]
    .join(' ')
    .toLowerCase();

  const detectedSyndromes: DetectedSyndrome[] = [];
  const candidateSuggestionsMap = new Map<string, ExamSuggestionItem>();

  for (const rule of SYNDROME_RULES) {
    const match = combinedHistory.match(rule.triggerRegex);
    if (match) {
      detectedSyndromes.push({
        name: rule.name,
        matchedTerms: [match[0]],
        color: rule.color,
      });

      for (const item of rule.suggestions) {
        if (!candidateSuggestionsMap.has(item.id)) {
          // Check if any keyword matches the target field or full exam text
          const targetText = (exameFisico[item.targetField] || '').toLowerCase();
          const isPresentInField = item.searchKeywords.some((kw) => {
            const rx = new RegExp(kw, 'i');
            return rx.test(targetText) || rx.test(examFullText);
          });

          candidateSuggestionsMap.set(item.id, {
            ...item,
            syndrome: rule.name,
            status: isPresentInField ? 'present' : 'missing',
          });
        }
      }
    }
  }

  const suggestions = Array.from(candidateSuggestionsMap.values());
  const missingCount = suggestions.filter((s) => s.status === 'missing').length;
  const presentCount = suggestions.filter((s) => s.status === 'present').length;

  return {
    detectedSyndromes,
    suggestions,
    missingCount,
    presentCount,
  };
}
