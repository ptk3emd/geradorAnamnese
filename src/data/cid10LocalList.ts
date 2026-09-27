/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LocalCid10Item {
  code: string;
  description: string;
  category: string;
  synonyms: string[];
  suggestedJustification?: string;
  suggestedDifferentials?: Array<{ codigoCid: string; nomeCid: string; justificativa?: string }>;
}

export const LOCAL_CID10_LIST: LocalCid10Item[] = [
  // ================= CARDIOLOGIA =================
  {
    code: 'I21.9',
    description: 'Infarto Agudo do Miocárdio não especificado',
    category: 'Cardiologia',
    synonyms: ['iam', 'infarto', 'dor toracica', 'dor precordial', 'sca', 'retroesternal', 'troponina', 'supra st'],
    suggestedJustification: 'Quadro clínico compatível com dor torácica retroesternal opressiva típica, associada a diaforese fria, náuseas e fatores de risco cardiovasculares.',
    suggestedDifferentials: [
      { codigoCid: 'I26.9', nomeCid: 'Tromboembolismo Pulmonar' },
      { codigoCid: 'I71.0', nomeCid: 'Dissecção Aguda de Aorta' },
      { codigoCid: 'I30.9', nomeCid: 'Pericardite Aguda' },
      { codigoCid: 'K21.9', nomeCid: 'Espasmo Esofágico / DRGE' },
    ],
  },
  {
    code: 'I21.0',
    description: 'Infarto Agudo Transmural da Parede Anterior',
    category: 'Cardiologia',
    synonyms: ['iam com supra anterior', 'infarto de parede anterior', 'v1 a v4'],
    suggestedJustification: 'Supradesnivelamento de segmento ST em derivações precordiais anteriores (V1-V4), compatível com oclusão aguda da artéria descendente anterior.',
    suggestedDifferentials: [
      { codigoCid: 'I30.9', nomeCid: 'Pericardite Aguda' },
      { codigoCid: 'I42.8', nomeCid: 'Cardiopatia de Takotsubo' },
    ],
  },
  {
    code: 'I21.1',
    description: 'Infarto Agudo Transmural da Parede Inferior',
    category: 'Cardiologia',
    synonyms: ['iam inferior', 'parede inferior', 'd2 d3 avf'],
    suggestedJustification: 'Supradesnivelamento de ST em DII, DIII e aVF, com imagem em espelho em parede lateral/alta, indicando oclusão coronariana de CD ou Cx.',
    suggestedDifferentials: [
      { codigoCid: 'I30.9', nomeCid: 'Pericardite Aguda' },
      { codigoCid: 'K85.9', nomeCid: 'Pancreatite Aguda' },
    ],
  },
  {
    code: 'I20.0',
    description: 'Angina Instável',
    category: 'Cardiologia',
    synonyms: ['angina', 'angina de repouso', 'sca sem supra', 'dor anginosa'],
    suggestedJustification: 'Episódio anginoso em repouso de duração prolongada ou em crescendo, sem elevação inicial de biomarcadores de necrose miocárdica.',
    suggestedDifferentials: [
      { codigoCid: 'I21.9', nomeCid: 'Infarto Agudo do Miocárdio' },
      { codigoCid: 'I26.9', nomeCid: 'Embolia Pulmonar' },
    ],
  },
  {
    code: 'I50.9',
    description: 'Insuficiência Cardíaca não especificada (Congestiva)',
    category: 'Cardiologia',
    synonyms: ['icc', 'insuficiencia cardiaca', 'congestao pulmonar', 'edema mmii', 'ortopneia', 'dpn', 'perfil b'],
    suggestedJustification: 'Dispneia progressiva aos mínimos esforços, ortopneia, turgência jugular patológica a 45° e crepitações teleinspiratórias em bases pulmonares.',
    suggestedDifferentials: [
      { codigoCid: 'J18.9', nomeCid: 'Pneumonia Adquirida na Comunidade' },
      { codigoCid: 'I26.9', nomeCid: 'Tromboembolismo Pulmonar' },
      { codigoCid: 'J44.1', nomeCid: 'Exacerbação de DPOC' },
      { codigoCid: 'N18.9', nomeCid: 'Síndrome Nefrótica / Hipervolemia por DRC' },
    ],
  },
  {
    code: 'I50.1',
    description: 'Insuficiência Ventricular Esquerda / Edema Agudo de Pulmão',
    category: 'Cardiologia',
    synonyms: ['eap', 'edema agudo de pulmao', 'congestao franca', 'estertores difusos'],
    suggestedJustification: 'Insuficiência respiratória súbita, estertoração difusa em maré montante até ápices e expectoração rósea espumosa.',
    suggestedDifferentials: [
      { codigoCid: 'J80', nomeCid: 'Síndrome do Desconforto Respiratório Agudo' },
      { codigoCid: 'J18.9', nomeCid: 'Broncopneumonia Extensa' },
    ],
  },
  {
    code: 'I10',
    description: 'Hipertensão Essencial (Primária)',
    category: 'Cardiologia',
    synonyms: ['has', 'hipertensao arterial', 'pressao alta', 'crise hipertensiva'],
    suggestedJustification: 'Níveis pressóricos persistentemente elevados em repouso acima de 140/90 mmHg sem causa secundária aparente.',
    suggestedDifferentials: [
      { codigoCid: 'I15.9', nomeCid: 'Hipertensão Secundária' },
      { codigoCid: 'N28.0', nomeCid: 'Estenose de Artéria Renal' },
    ],
  },
  {
    code: 'I11.0',
    description: 'Doença Cardíaca Hipertensiva com Insuficiência Cardíaca',
    category: 'Cardiologia',
    synonyms: ['cardiopatia hipertensiva', 'icc hipertensiva', 'hipertrofia ve'],
    suggestedJustification: 'Insuficiência cardíaca com fração de ejeção preservada ou reduzida secundária a hipertrofia ventricular concêntrica de longa data.',
  },
  {
    code: 'I16.0',
    description: 'Emergência Hipertensiva',
    category: 'Cardiologia',
    synonyms: ['urgencia hipertensiva', 'pressao muito alta', 'lesao orgao alvo', 'encefalopatia hipertensiva'],
    suggestedJustification: 'Elevação crítica de PA (PAS > 180 ou PAD > 120 mmHg) com lesão aguda e progressiva de órgão-alvo (encefalopatia, edema pulmonar ou lesão renal aguda).',
    suggestedDifferentials: [
      { codigoCid: 'I64', nomeCid: 'Acidente Vascular Cerebral' },
      { codigoCid: 'I21.9', nomeCid: 'Síndrome Coronariana Aguda' },
      { codigoCid: 'I71.0', nomeCid: 'Dissecção Aórtica' },
    ],
  },
  {
    code: 'I48',
    description: 'Fibrilação e Flutter Atrial',
    category: 'Cardiologia',
    synonyms: ['fa', 'fibrilacao atrial', 'flutter', 'arritmia', 'palpitacoes', 'irregular'],
    suggestedJustification: 'Ritmo cardíaco totalmente irregular sem ondas P visíveis no traçado eletrocardiográfico e palpitações taquicárdicas associadas.',
    suggestedDifferentials: [
      { codigoCid: 'I47.1', nomeCid: 'Taquicardia Supraventricular Paroxística' },
      { codigoCid: 'I49.8', nomeCid: 'Extrassistolia Atrial Frequente' },
    ],
  },
  {
    code: 'I26.9',
    description: 'Tromboembolismo Pulmonar sem Cor Pulmonale Agudo',
    category: 'Cardiologia / Pneumologia',
    synonyms: ['tep', 'tromboembolismo pulmonar', 'embolia pulmonar', 'dispneia subita', 'dor pleuritica', 'd-dimero'],
    suggestedJustification: 'Dispneia súbita e desproporcional, taquicardia sinusal, dor torácica de padrão pleurítico e escore de Wells moderado/alto.',
    suggestedDifferentials: [
      { codigoCid: 'I21.9', nomeCid: 'Infarto Agudo do Miocárdio' },
      { codigoCid: 'J18.9', nomeCid: 'Pneumonia Comunitária' },
      { codigoCid: 'J93.9', nomeCid: 'Pneumotórax Espontâneo' },
    ],
  },
  {
    code: 'I80.2',
    description: 'Flebite e Tromboflebite dos Vasos Profundos das Extremidades Inferiores (TVP)',
    category: 'Cardiologia / Vascular',
    synonyms: ['tvp', 'trombose venosa profunda', 'edema unilateral de perna', 'panturrilha empastada'],
    suggestedJustification: 'Edema unilateral de membro inferior com aumento de circunferência > 3 cm, dor à palpação profunda da panturrilha e sinal de Homans positivo.',
    suggestedDifferentials: [
      { codigoCid: 'A46', nomeCid: 'Erisipela / Celulite de Membro Inferior' },
      { codigoCid: 'M71.2', nomeCid: 'Cisto de Baker Roto' },
    ],
  },
  {
    code: 'I42.0',
    description: 'Cardiomiopatia Dilatada',
    category: 'Cardiologia',
    synonyms: ['miocardiopatia dilatada', 'dilatacao ve', 'chagas', 'alcoolica'],
    suggestedJustification: 'Dilatação ventricular global com disfunção sistólica grave comprovada por ecocardiograma transtorácico.',
  },
  {
    code: 'I35.0',
    description: 'Estenose da Valva Aórtica',
    category: 'Cardiologia',
    synonyms: ['estenose aortica', 'sopro sistolico ejetivo', 'sincope de esforco'],
    suggestedJustification: 'Tríade clássica de angina de esforço, síncope e dispneia com sopro sistólico ejetivo áspero em foco aórtico com irradiação carotídea.',
  },

  // ================= PNEUMOLOGIA =================
  {
    code: 'J18.9',
    description: 'Pneumonia Adquirida na Comunidade (PAC) não especificada',
    category: 'Pneumologia',
    synonyms: ['pac', 'pneumonia', 'infeccao pulmonar', 'febre e tosse', 'crepitacoes focais', 'curb65'],
    suggestedJustification: 'Quadro infeccioso agudo com tosse produtiva mucopurulenta, febre diária aferida, dor pleurítica e estertores crepitantes localizados em hemitórax.',
    suggestedDifferentials: [
      { codigoCid: 'J44.1', nomeCid: 'Exacerbação de DPOC' },
      { codigoCid: 'I50.9', nomeCid: 'Insuficiência Cardíaca Congestiva' },
      { codigoCid: 'I26.9', nomeCid: 'Tromboembolismo Pulmonar' },
      { codigoCid: 'A16.2', nomeCid: 'Tuberculose Pulmonar' },
    ],
  },
  {
    code: 'J44.1',
    description: 'Doença Pulmonar Obstrutiva Crônica com Exacerbação Aguda',
    category: 'Pneumologia',
    synonyms: ['dpoc', 'exacerbacao de dpoc', 'enfisema', 'bronquite cronica', 'criterios de antonisen', 'escarro purulento'],
    suggestedJustification: 'Piora aguda do padrão basal de dispneia, aumento do volume e purulência do escarro (critérios de Anthonisen I) em paciente tabagista crônico.',
    suggestedDifferentials: [
      { codigoCid: 'J18.9', nomeCid: 'Pneumonia Comunitária' },
      { codigoCid: 'I50.9', nomeCid: 'Descompensação de ICC' },
      { codigoCid: 'I26.9', nomeCid: 'Embolia Pulmonar' },
      { codigoCid: 'J93.9', nomeCid: 'Pneumotórax Secundário' },
    ],
  },
  {
    code: 'J45.9',
    description: 'Asma não especificada / Crise Asmática Aguda',
    category: 'Pneumologia',
    synonyms: ['asma', 'crise asmatica', 'broncoespasmo', 'sibilancia', 'chiado no peito', 'falta de ar'],
    suggestedJustification: 'Dispneia paroxística expiratória acompanhada de sibilância difusa bilateral e tiragem intercostal desencadeada por aeroalérgenos/IVAS.',
    suggestedDifferentials: [
      { codigoCid: 'J44.1', nomeCid: 'Exacerbação de DPOC' },
      { codigoCid: 'I50.1', nomeCid: 'Asma Cardíaca / Congestão Pulmonar' },
      { codigoCid: 'T17.9', nomeCid: 'Aspiração de Corpo Estranho' },
    ],
  },
  {
    code: 'J93.9',
    description: 'Pneumotórax não especificado',
    category: 'Pneumologia',
    synonyms: ['pneumotorax', 'dor toracica ventilatorio-dependente', 'hipertimpanismo', 'murmurio abolido'],
    suggestedJustification: 'Início súbito de dor torácica unilateral pleurítica com abolição do murmúrio vesicular e timpanismo à percussão.',
    suggestedDifferentials: [
      { codigoCid: 'I26.9', nomeCid: 'Tromboembolismo Pulmonar' },
      { codigoCid: 'J18.9', nomeCid: 'Pleurite / Pneumonia' },
    ],
  },
  {
    code: 'J90',
    description: 'Derrame Pleural não classificado em outra parte',
    category: 'Pneumologia',
    synonyms: ['derrame pleural', 'liquido no pulmao', 'macicez a percussao', 'fremito toracovocal abolido'],
    suggestedJustification: 'Macicez à percussão de hemitórax com abolição do frêmito toracovocal e do murmúrio vesicular na base correspondente.',
    suggestedDifferentials: [
      { codigoCid: 'J18.9', nomeCid: 'Derrame Parapneumônico / Empiema' },
      { codigoCid: 'A16.2', nomeCid: 'Tuberculose Pleural' },
      { codigoCid: 'C34.9', nomeCid: 'Derrame Neoplásico' },
    ],
  },
  {
    code: 'A16.2',
    description: 'Tuberculose Pulmonar sem menção de confirmação bacteriológica ou histológica',
    category: 'Infectologia / Pneumologia',
    synonyms: ['tuberculose', 'tb', 'tosse ha mais de 3 semanas', 'sudorese noturna', 'perda de peso', 'hemoptise'],
    suggestedJustification: 'Tosse produtiva há mais de 3 semanas associada a sudorese noturna profusa, febre vespertina e emagrecimento involuntário.',
    suggestedDifferentials: [
      { codigoCid: 'C34.9', nomeCid: 'Neoplasia de Pulmão' },
      { codigoCid: 'J18.9', nomeCid: 'Pneumonia Fúngica / Bacteriana de Evolução Subaguda' },
    ],
  },
  {
    code: 'J06.9',
    description: 'Infecção Aguda das Vias Aéreas Superiores não especificada (IVAS)',
    category: 'Pneumologia / Clínica Geral',
    synonyms: ['ivas', 'resfriado comum', 'gripe', 'coriza', 'dor de garganta', 'congestao nasal'],
    suggestedJustification: 'Quadro catarral autolimitado com coriza hialina, odinofagia leve, espirros e febre baixa sem sinais de gravidade sistêmica.',
  },
  {
    code: 'J10.1',
    description: 'Influenza com outras manifestações respiratórias (Gripe)',
    category: 'Infectologia / Pneumologia',
    synonyms: ['gripe', 'influenza', 'h1n1', 'sindrome gripal', 'mialgia intensa'],
    suggestedJustification: 'Início súbito de febre alta, mialgia generalizada prostradora, cefaleia e tosse seca.',
  },
  {
    code: 'U07.1',
    description: 'COVID-19, vírus identificado',
    category: 'Infectologia / Pneumologia',
    synonyms: ['covid', 'sars-cov-2', 'coronavirus', 'anosmia', 'falta de ar covid'],
    suggestedJustification: 'Síndrome respiratória aguda febril com anosmia, disgeusia e teste de antígeno ou RT-PCR positivo para SARS-CoV-2.',
  },

  // ================= INFECTOLOGIA =================
  {
    code: 'A41.9',
    description: 'Sepse não especificada (Sepse de Foco Pulmonar/Urinário/Abdominal)',
    category: 'Infectologia',
    synonyms: ['sepse', 'choque septico', 'qsofa', 'infeccao generalizada', 'refratariedade', 'lactato elevado'],
    suggestedJustification: 'Disfunção orgânica aguda potencialmente ameaçadora à vida evidenciada por variação no escore SOFA ≥ 2 em vigência de foco infeccioso suspeito ou confirmado.',
    suggestedDifferentials: [
      { codigoCid: 'R57.0', nomeCid: 'Choque Cardiogênico' },
      { codigoCid: 'R57.1', nomeCid: 'Choque Hipovolêmico' },
      { codigoCid: 'T78.2', nomeCid: 'Choque Anafilático' },
    ],
  },
  {
    code: 'A90',
    description: 'Dengue [Dengue Clássico ou com Sinais de Alarme]',
    category: 'Infectologia',
    synonyms: ['dengue', 'arbovirose', 'febre alta', 'dor retroorbitaria', 'prova do laco', 'plaquetopenia'],
    suggestedJustification: 'Febre aguda de início súbito acompanhada de cefaleia, dor retro-orbitária, mialgias intensas e plaquetopenia progressiva em área endêmica.',
    suggestedDifferentials: [
      { codigoCid: 'A92.0', nomeCid: 'Chikungunya' },
      { codigoCid: 'A92.8', nomeCid: 'Zika Vírus' },
      { codigoCid: 'A27.9', nomeCid: 'Leptospirose' },
    ],
  },
  {
    code: 'A46',
    description: 'Erisipela / Celulite Infecciosa',
    category: 'Infectologia / Dermatologia',
    synonyms: ['erisipela', 'celulite infecciosa', 'placa eritematosa', 'calor e rubor', 'porta de entrada'],
    suggestedJustification: 'Placa eritematosa bem delimitada em membro inferior, com calor local, dor intensa, edema e febre com calafrios associados.',
    suggestedDifferentials: [
      { codigoCid: 'I80.2', nomeCid: 'Trombose Venosa Profunda (TVP)' },
      { codigoCid: 'I83.2', nomeCid: 'Dermatite de Estase Venosa' },
    ],
  },
  {
    code: 'N39.0',
    description: 'Infecção do Trato Urinário de localização não especificada (Cistite / ITU)',
    category: 'Infectologia / Urologia',
    synonyms: ['itu', 'cistite', 'disuria', 'polaciuria', 'urgencia miccional', 'urina turva'],
    suggestedJustification: 'Disúria miccional acompanhada de polaciúria, urgência e desconforto suprapúbico sem febre ou dor lombar.',
    suggestedDifferentials: [
      { codigoCid: 'N10', nomeCid: 'Pielonefrite Aguda' },
      { codigoCid: 'N41.0', nomeCid: 'Prostatite Aguda' },
      { codigoCid: 'N73.9', nomeCid: 'Doença Inflamatória Pélvica' },
    ],
  },
  {
    code: 'N10',
    description: 'Nefrite Tubulointersticial Aguda (Pielonefrite Aguda)',
    category: 'Infectologia / Nefrologia',
    synonyms: ['pielonefrite', 'giordano positivo', 'infeccao urinaria alta', 'febre e dor lombar'],
    suggestedJustification: 'Febre alta com calafrios, dor lombar unilateral exuberante e sinal de Giordano francamente positivo à punho-percussão.',
    suggestedDifferentials: [
      { codigoCid: 'N20.0', nomeCid: 'Cólica Nefrética / Litíase Renal' },
      { codigoCid: 'K35.8', nomeCid: 'Apendicite Aguda Retrocecal' },
      { codigoCid: 'N39.0', nomeCid: 'Cistite Simples' },
    ],
  },
  {
    code: 'A09',
    description: 'Gastroenterite e Colite de Origem Infecciosa não especificada (GECA)',
    category: 'Infectologia / Gastroenterologia',
    synonyms: ['geca', 'diarreia aguda', 'gastroenterite', 'vomitos', 'desidratacao'],
    suggestedJustification: 'Quadro diarreico agudo de início abrupto com fezes líquidas múltiplas ao dia, cólicas abdominais difusas, náuseas e vômitos.',
    suggestedDifferentials: [
      { codigoCid: 'K52.9', nomeCid: 'Gastroenterite não Infecciosa' },
      { codigoCid: 'K35.8', nomeCid: 'Apendicite Aguda Inicial' },
    ],
  },

  // ================= GASTROENTEROLOGIA & CIRURGIA =================
  {
    code: 'K35.8',
    description: 'Apendicite Aguda com Outras Complicações / Peritonite Localizada',
    category: 'Gastroenterologia & Cirurgia',
    synonyms: ['apendicite', 'dor na fossa iliaca direita', 'mcburney', 'blumberg', 'abdome agudo inflamatorio'],
    suggestedJustification: 'Dor periumbilical migratória que se fixou em fossa ilíaca direita, acompanhada de hiporexia, náuseas e sinal de Blumberg positivo no ponto de McBurney.',
    suggestedDifferentials: [
      { codigoCid: 'N10', nomeCid: 'Pielonefrite / Litíase Ureteral Direita' },
      { codigoCid: 'N83.0', nomeCid: 'Cisto Ovariano Roto / Torção Anexial' },
      { codigoCid: 'K52.9', nomeCid: 'Gastroenterite Aguda' },
      { codigoCid: 'K63.5', nomeCid: 'Diverticulite de Ceco' },
    ],
  },
  {
    code: 'K80.0',
    description: 'Calculose da Vesícula Biliar com Colecistite Aguda',
    category: 'Gastroenterologia & Cirurgia',
    synonyms: ['colecistite aguda', 'litíase biliar', 'pedra na vesícula', 'sinal de murphy', 'dor em hipocondrio direito'],
    suggestedJustification: 'Dor em cólica intensa e persistente em hipocôndrio direito após alimentação colecistoquinética, com sinal de Murphy positivo e febre.',
    suggestedDifferentials: [
      { codigoCid: 'K85.9', nomeCid: 'Pancreatite Aguda' },
      { codigoCid: 'K25.9', nomeCid: 'Úlcera Péptica Perfurada' },
      { codigoCid: 'I21.1', nomeCid: 'Infarto de Parede Inferior' },
    ],
  },
  {
    code: 'K85.9',
    description: 'Pancreatite Aguda não especificada',
    category: 'Gastroenterologia & Cirurgia',
    synonyms: ['pancreatite', 'dor em barra', 'amilase e lipase', 'ranson', 'baltazar'],
    suggestedJustification: 'Dor epigástrica súbita intensa em faixa irradiada para dorso, náuseas, vômitos refratários e elevação de lípase/amilase > 3x o limite superior da normalidade.',
    suggestedDifferentials: [
      { codigoCid: 'K80.0', nomeCid: 'Colecistite Aguda' },
      { codigoCid: 'K25.5', nomeCid: 'Úlcera Péptica Perfurada' },
      { codigoCid: 'I21.9', nomeCid: 'Síndrome Coronariana Aguda' },
      { codigoCid: 'K56.6', nomeCid: 'Obstrução Intestinal Aguda' },
    ],
  },
  {
    code: 'K25.9',
    description: 'Úlcera Gástrica não especificada / Doença Ulcerosa Péptica',
    category: 'Gastroenterologia & Cirurgia',
    synonyms: ['ulcera gastrica', 'gastrite', 'queimacao no estomago', 'dispepsia', 'melena'],
    suggestedJustification: 'Dor em queimação epigástrica pós-prandial ou em jejum, associada ao uso contínuo de AINEs e melhora com antiácidos.',
  },
  {
    code: 'K92.0',
    description: 'Hematêmese (Hemorragia Digestiva Alta)',
    category: 'Gastroenterologia & Cirurgia',
    synonyms: ['hda', 'hematemese', 'hemorragia digestiva alta', 'vomito com sangue', 'melena'],
    suggestedJustification: 'Vômitos com sangue vivo e coágulos precedidos de epigastralgia, associados a fezes em borra de café (melena) e instabilidade postural.',
    suggestedDifferentials: [
      { codigoCid: 'I85.0', nomeCid: 'Varizes Esofágicas Sangrantes' },
      { codigoCid: 'K25.0', nomeCid: 'Úlcera Péptica Sangrante' },
      { codigoCid: 'K22.6', nomeCid: 'Síndrome de Mallory-Weiss' },
    ],
  },
  {
    code: 'K57.9',
    description: 'Doença Diverticular do Intestino / Diverticulite Aguda',
    category: 'Gastroenterologia & Cirurgia',
    synonyms: ['diverticulite', 'dor na fossa iliaca esquerda', 'apendicite esquerda'],
    suggestedJustification: 'Dor em fossa ilíaca esquerda de evolução subaguda, febre baixa, parada de eliminação de gases e fezes e espessamento cólico localizado.',
  },
  {
    code: 'K56.6',
    description: 'Outras Obstruções Intestinais e as não especificadas (Abdome Agudo Obstrutivo)',
    category: 'Gastroenterologia & Cirurgia',
    synonyms: ['obstrucao intestinal', 'ileo paralitico', 'bridas', 'vomitos fecaloides', 'distensao abdominal'],
    suggestedJustification: 'Distensão abdominal progressiva, cólicas em crises, parada total da eliminação de flatos e fezes e níveis hidroaéreos na radiografia simples.',
  },

  // ================= NEUROLOGIA =================
  {
    code: 'I64',
    description: 'Acidente Vascular Cerebral não especificado como hemorrágico ou isquêmico (AVC)',
    category: 'Neurologia',
    synonyms: ['avc', 'ave', 'derrame', 'deficit focal', 'hemiplegia', 'paresia', 'afasia', 'nihss'],
    suggestedJustification: 'Déficit neurológico focal de instalação súbita, com hemiparesia braquiocrural e desvio de rima labial, sem história de trauma craniano.',
    suggestedDifferentials: [
      { codigoCid: 'G40.9', nomeCid: 'Paralisia Pós-Ictal de Todd' },
      { codigoCid: 'E15', nomeCid: 'Hipoglicemia com Déficit Focal (Stroke Mimic)' },
      { codigoCid: 'G43.9', nomeCid: 'Enxaqueca Hemiplégica com Aura' },
    ],
  },
  {
    code: 'I63.9',
    description: 'Infarto Cerebral não especificado (AVC Isquêmico)',
    category: 'Neurologia',
    synonyms: ['avci', 'acidente vascular cerebral isquemico', 'isquemia cerebral', 'trombolise'],
    suggestedJustification: 'Síndrome neurovascular aguda focal em território vascular encefálico compatível, com tomografia sem contraste inicial excluindo sangramento.',
  },
  {
    code: 'I61.9',
    description: 'Hemorragia Intracerebral não especificada (AVC Hemorrágico)',
    category: 'Neurologia',
    synonyms: ['avch', 'hemorragia intraparenquimatosa', 'hematoma cerebral'],
    suggestedJustification: 'Déficit neurológico focal súbito associado a cefaleia em trovoada, rebaixamento precoce do nível de consciência e hiperdensidade tomográfica focal.',
  },
  {
    code: 'G40.9',
    description: 'Epilepsia não especificada / Crise Convulsiva Aguda',
    category: 'Neurologia',
    synonyms: ['crise convulsiva', 'convulsao', 'epilepsia', 'tonico-clonica', 'periodo pos-ictal', 'mordedura de lingua'],
    suggestedJustification: 'Episódio paroxístico de perda súbita da consciência com abalos musculares tônico-clônicos generalizados, sialorréia e período pós-ictal com sonolência.',
    suggestedDifferentials: [
      { codigoCid: 'R55', nomeCid: 'Síncope Vasovagal / Cardiogênica' },
      { codigoCid: 'F44.5', nomeCid: 'Crise Não Epiléptica Psicogênica (CNEP)' },
      { codigoCid: 'E15', nomeCid: 'Crise Hipoglicêmica Severa' },
    ],
  },
  {
    code: 'G43.9',
    description: 'Enxaqueca sem especificação / Cefaleia Primária',
    category: 'Neurologia',
    synonyms: ['enxaqueca', 'migranea', 'cefaleia pulsátil', 'fotofobia', 'dor de cabeca'],
    suggestedJustification: 'Cefaleia unilateral pulsátil de intensidade moderada a forte, agravada por atividade física rotineira e acompanhada de náuseas e foto/fonofobia.',
    suggestedDifferentials: [
      { codigoCid: 'G44.2', nomeCid: 'Cefaleia Tensional' },
      { codigoCid: 'I60.9', nomeCid: 'Hemorragia Subaracnóidea' },
      { codigoCid: 'G03.9', nomeCid: 'Meningite Infecciosa' },
    ],
  },
  {
    code: 'G03.9',
    description: 'Meningite não especificada',
    category: 'Neurologia / Infectologia',
    synonyms: ['meningite', 'rigidez de nuca', 'kerning', 'brudzinski', 'liquor turvo'],
    suggestedJustification: 'Tríade clássica de febre alta, cefaleia holocraniana intensa e sinais evidentes de irritação meníngea (rigidez de nuca, Kerning e Brudzinski positivos).',
  },

  // ================= ENDOCRINOLOGIA & METABOLOGIA =================
  {
    code: 'E11.9',
    description: 'Diabetes Mellitus não-insulino-dependente sem complicações (DM Tipo 2)',
    category: 'Endocrinologia',
    synonyms: ['dm2', 'diabetes mellitus tipo 2', 'glicemia alta', 'hiperglicemia'],
    suggestedJustification: 'Glicemia de jejum repetida ≥ 126 mg/dL ou HbA1c ≥ 6,5% em paciente com resistência insulínica e sobrepeso.',
  },
  {
    code: 'E10.1',
    description: 'Diabetes Mellitus insulino-dependente com cetoacidose (CAD)',
    category: 'Endocrinologia',
    synonyms: ['cad', 'cetoacidose diabetica', 'hálito cetônico', 'kussmaul', 'glicemia > 250', 'acidose metabolica'],
    suggestedJustification: 'Hiperglicemia acentuada (> 250 mg/dL), acidose metabólica com ânion gap elevado, cetonemia/cetonúria franca e respiração profunda de Kussmaul.',
    suggestedDifferentials: [
      { codigoCid: 'E11.0', nomeCid: 'Estado Hiperglicêmico Hiperosmolar (EHH)' },
      { codigoCid: 'K35.8', nomeCid: 'Abdome Agudo Cirúrgico (Dor referida por CAD)' },
    ],
  },
  {
    code: 'E11.0',
    description: 'Diabetes Mellitus Tipo 2 com Coma / Estado Hiperglicêmico Hiperosmolar',
    category: 'Endocrinologia',
    synonyms: ['ehh', 'sindrome hiperosmolar', 'osmolaridade elevada', 'hiperglicemia grave sem cetose'],
    suggestedJustification: 'Glicemia sérica extrema (> 600 mg/dL), hiperosmolaridade plasmática eficaz (> 320 mOsm/kg), desidratação profunda e rebaixamento do sensório sem acidose.',
  },
  {
    code: 'E16.2',
    description: 'Hipoglicemia não especificada',
    category: 'Endocrinologia',
    synonyms: ['hipoglicemia', 'suor frio', 'tremores', 'glicemia baixa < 70', 'tríade de whipple'],
    suggestedJustification: 'Sintomas neuroglicopênicos e adrenérgicos com glicemia capilar < 70 mg/dL e reversão imediata após aporte de glicose (tríade de Whipple).',
  },
  {
    code: 'E03.9',
    description: 'Hipotireoidismo não especificado',
    category: 'Endocrinologia',
    synonyms: ['hipotireoidismo', 'tsh alto', 't4 livre baixo', 'fadiga', 'ganho de peso', 'bradicardia'],
    suggestedJustification: 'Astenia crônica, intolerância ao frio, obstipação intestinal, sonolência e elevação sérica de TSH com T4 livre diminuído.',
  },
  {
    code: 'E05.9',
    description: 'Tireotoxicose não especificada (Hipertireoidismo)',
    category: 'Endocrinologia',
    synonyms: ['hipertireoidismo', 'tireotoxicose', 'tsh suprimido', 'emagrecimento', 'palpitacao e calor'],
    suggestedJustification: 'Taquicardia sinusal de repouso, perda de peso involuntária, tremores de extremidades e TSH suprimido com T4 livre elevado.',
  },

  // ================= NEFROLOGIA & UROLOGIA =================
  {
    code: 'N17.9',
    description: 'Insuficiência Renal Aguda não especificada (LRA)',
    category: 'Nefrologia',
    synonyms: ['lra', 'ira', 'lesao renal aguda', 'creatinina subiu', 'oliguria', 'kdigo'],
    suggestedJustification: 'Elevação da creatinina sérica ≥ 0,3 mg/dL em 48h ou aumento ≥ 1,5x o valor basal presumido com redução proporcional do débito urinário.',
    suggestedDifferentials: [
      { codigoCid: 'N18.9', nomeCid: 'Doença Renal Crônica Prévia Agudizada' },
      { codigoCid: 'N13.9', nomeCid: 'Nefropatia Obstrutiva Pós-Renal' },
    ],
  },
  {
    code: 'N18.9',
    description: 'Doença Renal Crônica não especificada (DRC)',
    category: 'Nefrologia',
    synonyms: ['drc', 'doenca renal cronica', 'uremia', 'creatinina cronicamente alta', 'dialise'],
    suggestedJustification: 'Alterações estruturais ou ritmo de filtração glomerular persistentemente < 60 mL/min/1,73m² por mais de 3 meses.',
  },
  {
    code: 'N20.0',
    description: 'Cálculo do Rim / Cólica Nefrética',
    category: 'Nefrologia & Urologia',
    synonyms: ['colica nefreteica', 'calculo renal', 'litíase urinaria', 'dor lombar irradiada', 'hematuria'],
    suggestedJustification: 'Dor lombar intensa em cólica de início súbito, irradiada para flanco e região inguinal/escrotal, associada a micro ou macro-hematúria.',
    suggestedDifferentials: [
      { codigoCid: 'N10', nomeCid: 'Pielonefrite Aguda' },
      { codigoCid: 'K35.8', nomeCid: 'Apendicite Aguda' },
      { codigoCid: 'I71.0', nomeCid: 'Dissecção ou Aneurisma de Aorta' },
    ],
  },
  {
    code: 'N40',
    description: 'Hiperplasia da Próstata (HPB)',
    category: 'Urologia',
    synonyms: ['hpb', 'prostata aumentada', 'jato urinario fraco', 'nocturia', 'hesitacao miccional'],
    suggestedJustification: 'Sintomas do trato urinário inferior com jato fraco, hesitação miccional e noctúria frequente em paciente do sexo masculino idoso.',
  },

  // ================= REUMATOLOGIA & DOR =================
  {
    code: 'M54.5',
    description: 'Dor Lombar Baixa (Lombalgia Aguda)',
    category: 'Reumatologia & Ortopedia',
    synonyms: ['lombalgia', 'dor nas costas', 'lumbago', 'dor lombar mecanica'],
    suggestedJustification: 'Dor na região lombar baixa de caráter mecânico-postural, agravada ao movimento e sem sinais de alarme ou déficit radicular agudo.',
  },
  {
    code: 'M54.4',
    description: 'Lumbago com Ciática (Lombociatalgia)',
    category: 'Reumatologia & Ortopedia',
    synonyms: ['ciatica', 'lombociatalgia', 'hernia de disco', 'lasegue positivo', 'dor irradiada para perna'],
    suggestedJustification: 'Dor lombar com irradiação dermatomérica típica para membro inferior até pé e sinal de Lasègue positivo.',
  },
  {
    code: 'M79.7',
    description: 'Fibromialgia',
    category: 'Reumatologia & Dor',
    synonyms: ['fibromialgia', 'dor difusa', 'tender points', 'fadiga cronica', 'sono nao reparador'],
    suggestedJustification: 'Dor musculoesquelética generalizada crônica associada a fadiga, distúrbios do sono e múltiplos pontos dolorosos à palpação.',
  },
  {
    code: 'M10.9',
    description: 'Gota não especificada (Artrite Gotosa Aguda)',
    category: 'Reumatologia & Dor',
    synonyms: ['gota', 'podagra', 'acido urico alto', 'monoartrite aguda', 'primeiro metatarso'],
    suggestedJustification: 'Monoartrite hiperaguda dolorosa e rubor exuberante na primeira articulação metatarsofalângica (podagra) com hiperuricemia.',
  },

  // ================= SAÚDE MENTAL & PSIQUIATRIA =================
  {
    code: 'F32.9',
    description: 'Episódio Depressivo não especificado',
    category: 'Saúde Mental & Psiquiatria',
    synonyms: ['depressao', 'tristeza profunda', 'anedonia', 'desanimo', 'ideacao'],
    suggestedJustification: 'Humor deprimido persistente por mais de 2 semanas, perda de prazer em atividades habituais (anedonia), alteração de sono e apetite.',
  },
  {
    code: 'F41.0',
    description: 'Transtorno de Pânico [Ansiedade Paroxística Episódica]',
    category: 'Saúde Mental & Psiquiatria',
    synonyms: ['panico', 'crise de ansiedade', 'taquicardia', 'sensacao de morte iminente', 'falta de ar ansiosa'],
    suggestedJustification: 'Crises súbitas recorrentes de ansiedade avassaladora com sintomas somáticos autonômicos floridos (palpitação, sudorese, dispneia) sem causa orgânica.',
    suggestedDifferentials: [
      { codigoCid: 'I21.9', nomeCid: 'Síndrome Coronariana Aguda' },
      { codigoCid: 'I48', nomeCid: 'Arritmia Paroxística' },
      { codigoCid: 'E05.9', nomeCid: 'Tireotoxicose Aguda' },
    ],
  },
  {
    code: 'F41.1',
    description: 'Ansiedade Generalizada (TAG)',
    category: 'Saúde Mental & Psiquiatria',
    synonyms: ['tag', 'ansiedade generalizada', 'preocupacao excessiva', 'tensao muscular'],
    suggestedJustification: 'Preocupação excessiva e crônica com eventos cotidianos, associada a inquietação, tensão muscular e insônia.',
  },
  {
    code: 'F10.2',
    description: 'Transtornos Mentais e Comportamentais devidos ao uso de Álcool - Síndrome de Dependência',
    category: 'Saúde Mental & Psiquiatria',
    synonyms: ['alcoolismo', 'abstinencia alcoolica', 'delirium tremens', 'tremores matinais'],
    suggestedJustification: 'Padrão compulsivo de consumo de etanol com sintomas de tolerância e abstinência física.',
  },

  // ================= SINTOMAS, SINAIS E OUTROS =================
  {
    code: 'R07.4',
    description: 'Dor Torácica não especificada',
    category: 'Sintomas & Sinais Gerais',
    synonyms: ['dor no peito', 'dor toracica inespecifica', 'desconforto precordial'],
    suggestedJustification: 'Desconforto torácico em investigação etiológica inicial no pronto atendimento.',
  },
  {
    code: 'R10.4',
    description: 'Outras Dores Abdominais e as não especificadas',
    category: 'Sintomas & Sinais Gerais',
    synonyms: ['dor abdominal', 'dor na barriga', 'colica abdominal'],
    suggestedJustification: 'Dor abdominal de características inespecíficas sob elucidação diagnóstica e monitorização clínica.',
  },
  {
    code: 'R55',
    description: 'Síncope e Colapso (Desmaio)',
    category: 'Sintomas & Sinais Gerais',
    synonyms: ['sincope', 'desmaio', 'lipotimia', 'perda transitoria da consciencia'],
    suggestedJustification: 'Perda transitória da consciência de início rápido, curta duração e recuperação espontânea completa por hipoperfusão cerebral global temporária.',
  },
  {
    code: 'R50.9',
    description: 'Febre não especificada (Síndrome Febril)',
    category: 'Sintomas & Sinais Gerais',
    synonyms: ['febre', 'sindrome febril aguda', 'temperatura elevada', 'calafrios'],
    suggestedJustification: 'Elevação da temperatura corporal axilar acima de 37,8°C com síndrome tóxico-infecciosa sob investigação.',
  },
  {
    code: 'R42',
    description: 'Tontura e Instabilidade (Vertigem)',
    category: 'Sintomas & Sinais Gerais',
    synonyms: ['tontura', 'vertigem', 'labirintite', 'desequilibrio', 'nistagmo'],
    suggestedJustification: 'Sensação rotatória de ilusão de movimento associada a náuseas e instabilidade postural.',
  },
  {
    code: 'T78.4',
    description: 'Alergia não especificada (Reação Anafilactóide / Urticária Aguda)',
    category: 'Imunologia / Alergia',
    synonyms: ['alergia', 'anafilaxia', 'urticaria', 'prurido', 'edema de glote', 'angioedema'],
    suggestedJustification: 'Aparecimento agudo de placas eritemato-edematosas pruriginosas e/ou angioedema labial após exposição a agente alergênico.',
  },
  {
    code: 'D64.9',
    description: 'Anemia não especificada',
    category: 'Hematologia',
    synonyms: ['anemia', 'palidez cutaneo-mucosa', 'hemoglobina baixa', 'fraqueza e astenia'],
    suggestedJustification: 'Astenia, palidez cutaneomucosa desproporcional, taquicardia compensatória e níveis de hemoglobina sérica abaixo do valor de referência.',
  },
];

/**
 * Normalizes text removing diacritics and converting to lowercase for robust matching
 */
export function normalizeCidSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Queries the local CID-10 dataset
 */
export function searchLocalCid10(query: string, categoryFilter?: string): LocalCid10Item[] {
  const cleanQ = normalizeCidSearch(query.trim());
  const cleanCategory = categoryFilter && categoryFilter !== 'Todos' ? categoryFilter : null;

  return LOCAL_CID10_LIST.filter((item) => {
    if (cleanCategory && item.category !== cleanCategory) {
      return false;
    }

    if (!cleanQ) {
      return true;
    }

    const matchesCode = normalizeCidSearch(item.code).includes(cleanQ);
    const matchesDesc = normalizeCidSearch(item.description).includes(cleanQ);
    const matchesCat = normalizeCidSearch(item.category).includes(cleanQ);
    const matchesSyn = item.synonyms.some((syn) => normalizeCidSearch(syn).includes(cleanQ));

    return matchesCode || matchesDesc || matchesCat || matchesSyn;
  });
}
