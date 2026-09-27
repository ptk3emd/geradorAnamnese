/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cid10ProtocolItem } from '../types/clinical';

export const CID10_PROTOCOLS: Cid10ProtocolItem[] = [
  {
    id: 'icc-descompensada',
    cid: 'I50.9',
    nome: 'Insuficiência Cardíaca Congestiva Descompensada',
    categoria: 'Cardiologia',
    sinonimos: ['icc', 'insuficiencia cardiaca', 'congestao pulmonar', 'dispneia paroxistica noturna', 'ortopneia', 'crepitacoes bibasais', 'edema mmii', 'turgencia jugular'],
    regexTrigger: /\b(icc|insufici[eê]ncia\s+card[ií]aca|congest[aã]o|dispneia\s+aos\s+esfor[cç]os|ortopneia|edema\s+(de\s+)?membros|turg[eê]ncia|perfil\s+[abcd]|crepita[cç][aã]o\s+bibasal)\b/i,
    diferenciaisComuns: [
      'Pneumonia Adquirida na Comunidade (J18.9)',
      'Tromboembolismo Pulmonar (I26.9)',
      'Exacerbação de DPOC (J44.1)',
      'Síndrome Nefrótica / DRC agudizada (N18.9)'
    ],
    examesSugeridos: [
      { exame: 'Radiografia de tórax (PA e Perfil)', finalidade: 'Avaliar padrão congestivo, cardiomegalia e descartar consolidações associadas' },
      { exame: 'Eletrocardiograma (ECG) de 12 derivações', finalidade: 'Pesquisar arritmias desencadeantes (ex.: FA) e sobrecargas ventriculares' },
      { exame: 'BNP ou NT-proBNP sérico', finalidade: 'Estratificar gravidade hemodinâmica e monitorar resposta ao tratamento' },
      { exame: 'Eletrólitos (Sódio, Potássio) e Ureia/Creatinina', finalidade: 'Monitorar segurança de diuréticos e avaliar função renal / síndrome cardiorrenal' },
      { exame: 'Ecocardiograma Transtorácico', finalidade: 'Avaliar fração de ejeção, função diastólica e valvopatias estruturais' }
    ],
    condutaTerapeuticaSugerida: 'Furosemida 20 a 40 mg EV (ou dobrar dose de uso ambulatorial); otimização ou manutenção de betabloqueador conforme estabilidade; avaliar vasodilatador (nitroglicerina EV se PAS > 110 mmHg com congestão exuberante); restrição de sódio e líquidos se congestão grave.',
    cuidadosGeraisSugeridos: 'Cabeceira elevada a 30-45°; monitorização contínua de diurese e balanço hídrico rigoroso; controle de peso diário em jejum; profilaxia de TEV com heparina/enoxaparina profilática.',
    orientacoesAlta: 'Alta após compensação clínica (euvolemia), transição para via oral estável por 24h, orientação quanto à pesagem diária, restrição hidrossalina e retorno ambulatorial em até 7 a 14 dias.',
    alertasClinicos: ['Sinais de baixo débito / Perfil L (hipotensão PAS < 90, extremidades frias)', 'Piora progressiva de escórias nitrogenadas com oligúria']
  },
  {
    id: 'sca-iam',
    cid: 'I21.9',
    nome: 'Infarto Agudo do Miocárdio / Síndrome Coronariana Aguda',
    categoria: 'Cardiologia / Urgência',
    sinonimos: ['iam', 'sca', 'angina', 'dor toracica', 'dor precordial', 'retroesternal', 'troponina alta', 'supradesnivelamento'],
    regexTrigger: /\b(iam|sca|infarto|dor\s+(tor[aá]cica|precordial|retroesternal|no\s+peito)|angina|troponina|supra(desnivelamento)?|infradesnivelamento)\b/i,
    diferenciaisComuns: [
      'Dissecção Aguda de Aorta (I71.0)',
      'Tromboembolismo Pulmonar (I26.9)',
      'Pericardite Aguda (I30.9)',
      'Doença do Refluxo Gastroesofágico / Espasmo Esofágico (K21.9)'
    ],
    examesSugeridos: [
      { exame: 'ECG de 12 derivações em até 10 minutos da admissão', finalidade: 'Confirmar ou afastar IAM com supra de ST e guiar terapia de reperfusão imediata' },
      { exame: 'Curva de Troponina ultrassensível (0h e 1-2h)', finalidade: 'Confirmar lesão miocárdica e estratificar risco isquêmico' },
      { exame: 'Hemograma, Coagulograma e Função Renal', finalidade: 'Avaliar plaquetas e função renal prévia ao uso de contraste / cateterismo' },
      { exame: 'Radiografia de tórax', finalidade: 'Avaliar alargamento de mediastino (descartar dissecção aórtica) e congestão' }
    ],
    condutaTerapeuticaSugerida: 'AAS 200 a 300 mg mastigável; segundo antiagregante (Ticagrelor 180 mg ou Clopidogrel 300-600 mg); Anticoagulação plena (Enoxaparina 1 mg/kg SC 12/12h ou HNF); Nitrato sublingual se dor refratária e sem contraindicações; Estatina de alta potência (Atorvastatina 80 mg); Reperfusão imediata se IAM com supra (ICP primária em < 120 min ou fibrinolítico em < 30 min).',
    cuidadosGeraisSugeridos: 'Monitorização multiparamétrica contínua; Acesso venoso calibroso; Oxigênio suplementar apenas se SatO2 < 90%; Repouso absoluto no leito; Jejum inicial.',
    orientacoesAlta: 'Planejamento de coronariografia, estratificação não invasiva pós-estabilização, prevenção secundária agressiva (antiagregação dupla, betabloqueador, IECA/BRA, estatina) e encaminhamento à reabilitação cardíaca.',
    alertasClinicos: ['Instabilidade hemodinâmica (choque cardiogênico)', 'Arritmias ventriculares graves (FV/TV) ou BAV de alto grau']
  },
  {
    id: 'pac-pneumonia',
    cid: 'J18.9',
    nome: 'Pneumonia Adquirida na Comunidade (PAC)',
    categoria: 'Pneumologia / Infectologia',
    sinonimos: ['pac', 'pneumonia', 'infeccao pulmonar', 'tosse produtiva', 'escarro purulento', 'febre e tosse', 'crepitacoes inspiratorias'],
    regexTrigger: /\b(pac|pneumonia|consolida[cç][aã]o|escarro\s+(amarelado|esverdeado|purulento)|febre.*tosse|tosse.*febre|crepita[cç][oõ]es\s+focais)\b/i,
    diferenciaisComuns: [
      'Exacerbação de Asma ou DPOC (J44.1 / J45.9)',
      'Tromboembolismo Pulmonar (I26.9)',
      'Tuberculose Pulmonar (A15.0)',
      'Edema Agudo de Pulmão (J81)'
    ],
    examesSugeridos: [
      { exame: 'Radiografia de tórax (PA e Perfil)', finalidade: 'Confirmar infiltrado pulmonar alveolar/intersticial e pesquisar derrame parapneumônico' },
      { exame: 'Hemograma completo com diferencial', finalidade: 'Estratificar leucocitose com desvio à esquerda e resposta inflamatória' },
      { exame: 'Proteína C Reativa (PCR) sérica', finalidade: 'Marcador inflamatório de baseline para monitorar resposta à antibioticoterapia' },
      { exame: 'Ureia e Creatinina', finalidade: 'Calcular escore de gravidade CURB-65 e ajustar dose de antimicrobianos' },
      { exame: 'Gasometria arterial (se SatO2 < 92%)', finalidade: 'Avaliar grau de hipoxemia (PaO2/FiO2) e distúrbios ventilatórios' }
    ],
    condutaTerapeuticaSugerida: 'Antibioticoterapia empírica precoce (< 4 horas da admissão): Em enfermaria: Ceftriaxona 1-2g EV 1x/dia + Claritromicina 500mg VO 12/12h (ou Levofloxacino 750mg EV/VO 1x/dia); Hidratação volêmica cuidadosa; Antipirético e analgesia conforme necessidade.',
    cuidadosGeraisSugeridos: 'Fisioterapia respiratória; Oxigenoterapia por cateter nasal para alvo SatO2 93-96% (ou 88-92% em retentores crônicos de CO2); Mobilização precoce.',
    orientacoesAlta: 'Troca para via oral após 48-72h de melhora clínica (afebril, queda de leucocitose, melhora da taquipneia); completar ciclo de 5 a 7 dias; seguimento ambulatorial e vacinação pneumocócica/influenza pós-cura.',
    alertasClinicos: ['CURB-65 ≥ 3 (indicação de UTI)', 'Disfunção respiratória iminente (FR > 30, esforço ventilatório)']
  },
  {
    id: 'crise-hipertensiva',
    cid: 'I16.0',
    nome: 'Urgência / Emergência Hipertensiva',
    categoria: 'Cardiologia / Urgência',
    sinonimos: ['has', 'crise hipertensiva', 'urgencia hipertensiva', 'emergencia hipertensiva', 'pa elevada', 'pao2 alta', 'picos hipertensivos'],
    regexTrigger: /\b(crise\s+hipertensiva|urg[eê]ncia\s+hipertensiva|emerg[eê]ncia\s+hipertensiva|press[aã]o\s+muito\s+alta|pa\s*(>=|>)?\s*180|pa\s*(>=|>)?\s*120|hipertens[aã]o\s+descompensada)\b/i,
    diferenciaisComuns: [
      'Pseudocrise hipertensiva por dor ou estresse emocional',
      'Acidente Vascular Cerebral agudo (I64)',
      'Encefalopatia Hipertensiva (I67.4)',
      'Síndrome Coronariana Aguda (I21.9)'
    ],
    examesSugeridos: [
      { exame: 'Fundoscopia ocular', finalidade: 'Pesquisar lesão aguda de órgão-alvo (papiledema, exsudatos e hemorragias)' },
      { exame: 'ECG de 12 derivações', finalidade: 'Descartar isquemia miocárdica aguda e sobrecarga ventricular esquerda' },
      { exame: 'Creatinina, Ureia e Urina tipo 1', finalidade: 'Avaliar injúria renal aguda e proteinúria/hematúria' },
      { exame: 'Radiografia de tórax', finalidade: 'Investigar sinais de congestão pulmonar ou dissecção aórtica' }
    ],
    condutaTerapeuticaSugerida: 'Diferenciar Urgência vs Emergência Hipertensiva: Se Urgência (sem lesão de órgão-alvo): reiniciar ou ajustar medicações orais (Losartana, Anlodipino, Captopril VO); meta de redução gradual em 24-48h. Se Emergência (com lesão de órgão-alvo): internação em UTI com droga parenteral titulável (Nitroprussiato de sódio ou Nitroglicerina EV).',
    cuidadosGeraisSugeridos: 'Ambiente calmo; controle rigoroso da dor e ansiedade; verificação horária da pressão arterial; restrição de sódio dietético.',
    orientacoesAlta: 'Prescrição ambulatorial revisada com combinação sinérgica de anti-hipertensivos; orientação de adesão medicamentosa e aferição domiciliar regular (MAPA/MRPA); consulta em 7 dias.',
    alertasClinicos: ['Cefaleia súbita de forte intensidade, alterações visuais ou rebaixamento sensorial', 'Dor torácica lancinante ou dispneia aguda associada']
  },
  {
    id: 'itu-pielonefrite',
    cid: 'N10',
    nome: 'Pielonefrite Aguda / Infecção do Trato Urinário Complicada',
    categoria: 'Infectologia / Urologia',
    sinonimos: ['itu', 'pielonefrite', 'cistite', 'disuria', 'polaciuria', 'giordano positivo', 'infeccao urinaria'],
    regexTrigger: /\b(pielonefrite|itu|infec[cç][aã]o\s+urin[aá]ria|dis[uú]ria|polaci[uú]ria|giordano(\s+positivo)?|dor\s+em\s+flanco|febre.*urina)\b/i,
    diferenciaisComuns: [
      'Litíase Renal / Cólica Nefrética (N20.0)',
      'Apendicite Aguda em localização retrocecal (K35.8)',
      'Doença Inflamatória Pélvica (N73.9)',
      'Abscesso renal ou perinefrético (N15.1)'
    ],
    examesSugeridos: [
      { exame: 'Urina Tipo 1 (EAS) e Urocultura com Antibiograma', finalidade: 'Confirmar piúria, bacteriúria e isolar o agente etiológico para terapia guiada' },
      { exame: 'Hemograma e Proteína C Reativa', finalidade: 'Avaliar resposta inflamatória sistêmica e risco de sepse de foco urinário' },
      { exame: 'Ureia e Creatinina sérica', finalidade: 'Avaliar se há comprometimento funcional renal agudo' },
      { exame: 'Ultrassonografia de Rins e Vias Urinárias', finalidade: 'Descartar hidronefrose, nefrolitíase obstrutiva e coleções perirrenais' }
    ],
    condutaTerapeuticaSugerida: 'Pielonefrite não complicada hospitalar: Ceftriaxona 1g EV 1x/dia ou Ciprofloxacino 400mg EV 12/12h; analgesia com anti-inflamatório (se função renal preservada) ou Dipirona; hidratação venosa vigorosa; transição para VO guiada pelo antibiograma.',
    cuidadosGeraisSugeridos: 'Controle de diurese horária; verificação de temperatura e sinais vitais a cada 4h; estímulo à ingesta hídrica conforme tolerância.',
    orientacoesAlta: 'Alta após 24-48h afebril e com melhora clínica; completar tempo total de antimicrobiano (7 a 10 dias); orientar sinais de alerta (persistência de febre, vômitos incoercíveis).',
    alertasClinicos: ['Giordano bilateral com hipotensão e taquicardia (risco de choque séptico)', 'Anúria ou oligúria com retenção urinária obstrutiva']
  },
  {
    id: 'asma-dpoc-agudizado',
    cid: 'J44.1',
    nome: 'Doença Pulmonar Obstrutiva Crônica (DPOC) Exacerbada / Asma em Crise',
    categoria: 'Pneumologia',
    sinonimos: ['asma', 'dpoc', 'broncoespasmo', 'sibilancia', 'chiado no peito', 'falta de ar com sibilos', 'enfisema'],
    regexTrigger: /\b(dpoc|asma|broncoespasmo|sibilo[s]?|sibil[aâ]ncia|chiado|enfisema|bronquite\s+cr[oô]nica|crise\s+asm[aá]tica)\b/i,
    diferenciaisComuns: [
      'Pneumonia associada (J18.9)',
      'Insuficiência Cardíaca Congestiva (I50.9)',
      'Pneumotórax espontâneo (J93.9)',
      'Tromboembolismo Pulmonar (I26.9)'
    ],
    examesSugeridos: [
      { exame: 'Gasometria arterial', finalidade: 'Avaliar retenção de CO2 (hipercapnia) e acidose respiratória aguda' },
      { exame: 'Radiografia de tórax', finalidade: 'Descartar complicações mecânicas (pneumotórax) e infecção bacteriana sobreposta' },
      { exame: 'Hemograma completo', finalidade: 'Avaliar eosinofilia ou leucocitose indicativa de gatilho bacteriano' },
      { exame: 'Pico de fluxo expiratório (Peak Flow)', finalidade: 'Quantificar grau de obstrução ao fluxo aéreo pré e pós-broncodilatador' }
    ],
    condutaTerapeuticaSugerida: 'Broncodilatadores inalatórios de curta ação: Salbutamol 4 a 8 jatos com espaçador (ou nebulização) a cada 20 min na 1ª hora + Brometo de Ipratrópio; Corticoide sistêmico (Prednisona 40-50mg VO/dia por 5 dias ou Hidrocortisona EV); Antibioticoterapia (Amoxicilina-Clavulanato ou Macrolídeo) se aumento de purulência do escarro.',
    cuidadosGeraisSugeridos: 'Alvo de oxigenação conservador em DPOC (SatO2 88-92% em máscara de Venturi para evitar narcose por CO2); Ventilação Não Invasiva (VNI) precoce se acidose respiratória moderada.',
    orientacoesAlta: 'Revisão da técnica inalatória com dispositivos de manutenção (CI + LABA); plano de ação por escrito para exacerbações; cessação do tabagismo obrigatória.',
    alertasClinicos: ['Silêncio respiratório à ausculta (fadiga muscular iminente)', 'Sonolência, confusão mental ou torpor por retenção de CO2']
  },
  {
    id: 'apendicite-abdome-agudo',
    cid: 'K35.8',
    nome: 'Apendicite Aguda / Abdome Agudo Inflamatório',
    categoria: 'Cirurgia Geral',
    sinonimos: ['apendicite', 'abdome agudo', 'blumberg positivo', 'dor fossa iliaca direita', 'fid', 'descompressao dolorosa'],
    regexTrigger: /\b(apendicite|abdome\s+agudo|blumberg(\s+positivo)?|fossa\s+[ií]liaca\s+direita|fid|descompress[aã]o\s+brusca|peritonite)\b/i,
    diferenciaisComuns: [
      'Adenite Mesentérica (I88.0)',
      'Gravidez Ectópica rota em mulheres jovens (O00.1)',
      'Diverticulite de Meckel (Q43.0)',
      'Cólica Ureteral direita (N23)'
    ],
    examesSugeridos: [
      { exame: 'Tomografia computadorizada de abdome e pelve com contraste', finalidade: 'Padrão-ouro para confirmação diagnóstica, espessamento do apêndice (> 6mm) e coleções' },
      { exame: 'Ultrassonografia de abdome total', finalidade: 'Método inicial em gestantes e pediatria para evitar radiação ionizante' },
      { exame: 'Hemograma completo com contagem de plaquetas', finalidade: 'Avaliar leucocitose com neutrofilia e resposta inflamatória' },
      { exame: 'Beta-HCG quantitativo (se mulher em idade fértil)', finalidade: 'Descartar gravidez ectópica ou gestação associada' },
      { exame: 'Coagulograma e Tipagem sanguínea com prova cruzada', finalidade: 'Preparo pré-operatório mandatório' }
    ],
    condutaTerapeuticaSugerida: 'Avaliação cirúrgica imediata para apendicectomia (preferencialmente videolaparoscópica); Jejum oral imediato; Hidratação venosa isotônica com Cristaloides; Antibioticoterapia pré-operatória profilática cobrindo gram-negativos e anaeróbios (ex.: Ciprofloxacino + Metronidazol ou Ceftriaxona + Metronidazol); Analgesia EV após definição diagnóstica.',
    cuidadosGeraisSugeridos: 'Manter em repouso no leito; controle térmico e de dor a cada 2h; suspender qualquer uso de laxantes ou enemas.',
    orientacoesAlta: 'Pós-operatório: alta após tolerância alimentar plena, deambulação e trânsito intestinal reestabelecido (geralmente D1-D2 pós-operatório laparoscópico); cuidados com ferida operatória e retirada de pontos em 7 a 10 dias.',
    alertasClinicos: ['Sinais de peritonite difusa (abdome em tábua, descompressão em todos os quadrantes)', 'Instabilidade com taquicardia desproporcional e febre alta (sepse intra-abdominal)']
  },
  {
    id: 'dm2-descompensada',
    cid: 'E11.9',
    nome: 'Diabetes Mellitus Tipo 2 Descompensada / Hiperglicemia Aguda',
    categoria: 'Endocrinologia / Clínica Médica',
    sinonimos: ['diabetes', 'dm2', 'hiperglicemia', 'cetoacidose', 'poliuria', 'polidipsia', 'glicemia alta'],
    regexTrigger: /\b(diabetes|dm2|hiperglicemia|poli[uú]ria|polidipsia|glicemia\s*(>=|>)?\s*250|cetoacidose|estado\s+hiperosmolar)\b/i,
    diferenciaisComuns: [
      'Cetoacidose Diabética - CAD (E10.1)',
      'Estado Hiperosmolar Hiperglicêmico - EHH (E11.0)',
      'Acidose Láctica associada à Metformina (E87.2)',
      'Infecção bacteriana oculta como gatilho (ITU, PAC, pele)'
    ],
    examesSugeridos: [
      { exame: 'Glicemia capilar e plasmática em jejum', finalidade: 'Quantificar nível glicêmico e titular escala de insulina' },
      { exame: 'Gasometria venosa ou arterial e Cetonemia/Cetonúria', finalidade: 'Descartar cetoacidose diabética (pesquisar gap aniônico elevado e acidose metabólica)' },
      { exame: 'Eletrólitos com cálculo do sódio corrigido e potássio', finalidade: 'Evitar hipocalemia fatal antes da insulinoterapia' },
      { exame: 'Hemoglobina Glicada (HbA1c)', finalidade: 'Avaliar controle glicêmico prévio nos últimos 3 meses e guiar esquema ambulatorial' },
      { exame: 'Pesquisa de focos infecciosos (Urina 1, RX tórax)', finalidade: 'Investigar causas descompensadoras infecciosas' }
    ],
    condutaTerapeuticaSugerida: 'Se hiperglicemia simples sem acidose: hidratação oral/venosa com SF 0,9% e insulina regular conforme escala; Se CAD ou EHH: hidratação vigorosa, reposição de potássio se K < 5.2 mEq/L e bomba de infusão contínua de Insulina Regular 0,1 U/kg/h após assegurar K > 3.3 mEq/L.',
    cuidadosGeraisSugeridos: 'Monitorização da glicemia capilar pré-refeições e às 22h (ou horária se bomba de insulina); incentivo à ingesta de água; dieta para diabético com contagem de carboidratos.',
    orientacoesAlta: 'Reavaliação das doses de antidiabéticos orais / esquema basal-bolus; reforço sobre sinais de hipoglicemia e seu manejo (regra dos 15g); encaminhamento nutricional.',
    alertasClinicos: ['Respiração de Kussmaul com hálito cetônico e desidratação grave', 'Rebaixamento do nível de consciência com osmolaridade sérica > 320 mOsm/kg']
  },
  {
    id: 'avc-isquemico',
    cid: 'I64',
    nome: 'Acidente Vascular Cerebral (AVC) / Déficit Neurológico Focal',
    categoria: 'Neurologia / Urgência',
    sinonimos: ['avc', 'ave', 'derrame', 'deficit motor', 'hemiparesia', 'afasia', 'desvio de rima', 'perda de forca'],
    regexTrigger: /\b(avc|ave|derrame|hemiparesia|hemiplegia|afasia|disartria|desvio\s+de\s+rima|d[eé]ficit\s+(motor|focal)|perda\s+de\s+for[cç]a)\b/i,
    diferenciaisComuns: [
      'Ataque Isquêmico Transitório - AIT (G45.9)',
      'Hemorragia Subaracnóidea - HSA (I60.9)',
      'Hipoglicemia simuladora de AVC (E16.2)',
      'Paralisia de Bell / periférica (G51.0)'
    ],
    examesSugeridos: [
      { exame: 'Tomografia de crânio sem contraste imediatamente', finalidade: 'Diferenciar evento isquêmico de hemorrágico e verificar sinais precoces de isquemia' },
      { exame: 'Glicemia capilar imediata na admissão', finalidade: 'Excluir hipoglicemia como causa mimetizadora de déficit focal' },
      { exame: 'Angiotomografia arterial de crânio e pescoço', finalidade: 'Identificar oclusão de grandes vasos para potencial trombectomia mecânica' },
      { exame: 'ECG e Enzimas cardíacas', finalidade: 'Pesquisar arritmia cardioembólica (FA) e infarto concomitante' }
    ],
    condutaTerapeuticaSugerida: 'Acionar protocolo de código AVC; calcular escala NIHSS; Se AVC isquêmico com tempo de início < 4,5h e sem contraindicações: Trombólise endovenosa com Alteplase ou Tenecteplase; Manter PAS < 185 e PAD < 110 mmHg para trombólise; Cabeceira a 0° inicial se tolerado; iniciar AAS 100-300mg e estatinas após 24h da trombólise (ou imediato se não candidato).',
    cuidadosGeraisSugeridos: 'Controle estrito de temperatura (< 37.5°C) e glicemia (140-180 mg/dL); vigilância de disfagia com dieta suspensa até teste de deglutição; profilaxia mecânica de TEV.',
    orientacoesAlta: 'Investigação etiológica completa (Ecocardiograma, Holter, Doppler de carótidas); fisioterapia motora precoce, fonoterapia e terapia ocupacional; prevenção secundária rigorosa.',
    alertasClinicos: ['Sinais de hipertensão intracraniana ou efeito de massa expansivo', 'Transformação hemorrágica com deterioração do NIHSS ≥ 4 pontos']
  },
  {
    id: 'gastroenterite-geca',
    cid: 'A09',
    nome: 'Gastroenterite Aguda Infecciosa / Diarreia Aguda',
    categoria: 'Clínica Médica / Gastroenterologia',
    sinonimos: ['gastroenterite', 'diarreia', 'vomito', 'nausea e vomito', 'dor em colica', 'desidratacao'],
    regexTrigger: /\b(gastroenterite|diarreia|v[oô]mito|evacua[cç][oõ]es\s+l[ií]quidas|enterite|c[oô]lica\s+abdominal)\b/i,
    diferenciaisComuns: [
      'Intoxicação alimentar bacteriana por toxina pré-formada (A05.9)',
      'Infecção por Clostridioides difficile pós-antimicrobiano (A04.7)',
      'Apendicite aguda precoce (K35.8)',
      'Doença Inflamatória Intestinal em crise (K50/K51)'
    ],
    examesSugeridos: [
      { exame: 'Eletrólitos (Sódio, Potássio, Cloreto) e Ureia/Creatinina', finalidade: 'Avaliar distúrbios hidroeletrolíticos e azotemia pré-renal por desidratação' },
      { exame: 'Coprocultura e pesquisa de toxinas / leucócitos nas fezes', finalidade: 'Indicado se febre alta, fezes com sangue/muco ou duração > 7 dias' },
      { exame: 'Hemograma completo', finalidade: 'Estratificar intensidade da desidratação (hemoconcentração) e leucocitose' }
    ],
    condutaTerapeuticaSugerida: 'Reidratação oral prioritária com solução de reidratação oral (SRO) conforme plano da OMS; Se desidratação moderada/grave ou vômitos incoercíveis: hidratação venosa com Ringer Lactato ou SF 0,9%; Antiemético (Ondansetrona 4-8mg EV/VO); Probióticos e Zinco; Antibioticoterapia (Ciprofloxacino ou Azitromicina) indicada apenas se disenteria com febre.',
    cuidadosGeraisSugeridos: 'Dieta branda normocalórica fracionada, evitando açúcares simples, leite e cafeína; higiene rigorosa das mãos.',
    orientacoesAlta: 'Manter ingesta vigorosa de líquidos em domicílio; orientar sinais de perigo: sangue nas fezes, prostração intensa, ausência de diurese por > 8 horas.',
    alertasClinicos: ['Sinais de choque hipovolêmico por desidratação grave', 'Presença de sangue vivo abundante nas fezes com instabilidade hemodinâmica']
  },
  {
    id: 'cefaleia-enxaqueca',
    cid: 'G43.9',
    nome: 'Cefaleia Primária / Enxaqueca / Cefaleia Tensional',
    categoria: 'Neurologia',
    sinonimos: ['cefaleia', 'dor de cabeca', 'enxaqueca', 'migranea', 'fotofobia', 'fonofobia'],
    regexTrigger: /\b(cefaleia|enxaqueca|dor\s+de\s+cabe[cç]a|migr[aâ]nea|puls[aá]til.*cabe[cç]a|fotofobia)\b/i,
    diferenciaisComuns: [
      'Hemorragia Subaracnóidea por rotura aneurismática (I60.9)',
      'Meningite Infecciosa Aguda (G03.9)',
      'Trombose Venosa Cerebral (I67.6)',
      'Cefaleia Cervicogênica (M54.2)'
    ],
    examesSugeridos: [
      { exame: 'Tomografia de crânio sem contraste', finalidade: 'Investigar causas secundárias se sinais de alarme ("red flags" - cefaleia em trovoada, febre, déficit focal)' },
      { exame: 'Punção lombar com análise de líquor', finalidade: 'Indicada se suspeita de hemorragia subaracnóidea com TC normal ou suspeita de meningite' }
    ],
    condutaTerapeuticaSugerida: 'Crise aguda moderada/grave: Triptano (Sumatriptano 50-100mg VO) + AINE (Cetoprofeno ou Ibuprofeno) + Antiemético dopaminérgico (Metoclopramida ou Clorpromazina EV); Evitar uso abusivo de opioides.',
    cuidadosGeraisSugeridos: 'Repouso em quarto silencioso e com baixa luminosidade; hidratação oral adequada; compressas frias locais.',
    orientacoesAlta: 'Identificação e controle de fatores desencadeantes (sono irregular, cafeína, jejum prolongado); diário da dor; indicar profilaxia farmacológica se ≥ 3-4 crises incapacitantes ao mês.',
    alertasClinicos: ['Cefaleia de início súbito "em trovoada" que atinge intensidade máxima em segundos', 'Presença de rigidez nucal ou febre associada']
  },
  {
    id: 'dengue-arbovirose',
    cid: 'A90',
    nome: 'Dengue / Síndrome Febril Aguda',
    categoria: 'Infectologia',
    sinonimos: ['dengue', 'arbovirose', 'febre alta e mialgia', 'dor retroorbitaria', 'plaquetopenia'],
    regexTrigger: /\b(dengue|arbovirose|dor\s+retro-?orbit[aá]ria|mialgia.*artralgia|prova\s+do\s+la[cç]o|plaquetopenia.*febre)\b/i,
    diferenciaisComuns: [
      'Chikungunya (A92.0)',
      'Zika vírus (A92.8)',
      'Leptospirose (A27.9)',
      'COVID-19 (U07.1)'
    ],
    examesSugeridos: [
      { exame: 'Hemograma completo seriado com Hematócrito', finalidade: 'Monitorar hemoconcentração (indicador de extravasamento plasmático) e contagem plaquetária' },
      { exame: 'Pesquisa de Antígeno NS1 ou Sorologia IgM/IgG', finalidade: 'Confirmação etiológica laboratorial conforme dia de evolução dos sintomas' },
      { exame: 'Transaminases (TGO/TGP)', finalidade: 'Avaliar acometimento hepático pelo vírus' }
    ],
    condutaTerapeuticaSugerida: 'Estratificação de grupos do Ministério da Saúde: Grupo A/B: Hidratação oral vigorosa (60 mL/kg/dia, sendo 1/3 com SRO); Grupo C (com sinais de alarme): Hidratação venosa imediata 10 mL/kg nas primeiras 2h; Grupo D (choque): Ressuscitação rápida com 20 mL/kg em 20 min; Analgesia estritamente com Dipirona ou Paracetamol; CONTRAINDICADOS terminantemente AAS e AINEs.',
    cuidadosGeraisSugeridos: 'Repouso; hidratação vigiada; retorno diário ou a cada 48h para hematócrito de controle até 48h após o término da febre.',
    orientacoesAlta: 'Alertar sobre sinais de alarme da fase crítica (3º ao 7º dia): dor abdominal intensa, vômitos persistentes, hipotensão postural, sangramento de mucosas e letargia.',
    alertasClinicos: ['Sinais de choque por extravasamento de plasma (tempo de enchimento capilar > 2s, pulso filiforme)', 'Plaquetopenia acentuada (< 50.000/mm³) com manifestações hemorrágicas']
  }
];

export function findMatchingProtocols(text: string): Cid10ProtocolItem[] {
  if (!text || text.trim().length === 0) return [];

  const matched = CID10_PROTOCOLS.filter((proto) => {
    if (proto.regexTrigger.test(text)) return true;
    const lower = text.toLowerCase();
    return proto.sinonimos.some((sin) => lower.includes(sin.toLowerCase()));
  });

  return matched;
}
