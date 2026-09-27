/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClinicalData } from '../types/clinical';

export interface RoteiroSectionInfo {
  titulo: string;
  subtitulo: string;
  itens: string[];
  dicasPraticas: string[];
}

export interface RoteiroDocDefinition {
  id: string;
  nome: string;
  origem: string;
  descricao: string;
  principios: string[];
  secoes: RoteiroSectionInfo[];
}

export interface AnamneseTemplateModel {
  id: string;
  titulo: string;
  origemRoteiro: 'adulto-pucrs' | 'pedagogico-mccp' | 'especialidade';
  subtitulo: string;
  descricao: string;
  tags: string[];
  data: ClinicalData;
}

/**
 * Definições e orientações pedagógicas dos dois roteiros oficiais
 */
export const ROTEIROS_OFICIAIS: RoteiroDocDefinition[] = [
  {
    id: 'roteiro-adulto-pucrs',
    nome: 'Roteiro de Anamnese para o Paciente Adulto',
    origem: 'PUCRS - Escola de Medicina / Hospital São Lucas',
    descricao:
      'Guia semiológico clássico e rigoroso para entrevista clínica completa do adulto, englobando identificação abrangente, os 8 atributos da HDA, revisão dos 9 aparelhos (ISDA) e antecedentes com cálculo de carga tabágica.',
    principios: [
      'Entrevista orientada e cronológica, evitando induzir respostas do paciente',
      'Registro da Queixa Principal com as palavras do paciente e tempo exato de evolução',
      'Caracterização exaustiva do sintoma-guia através dos 8 atributos semiológicos',
      'Interrogatório sintomatológico detalhado por sistemas para detectar comorbidades ocultas',
      'Investigação criteriosa de hábitos de vida, cálculo de anos-maço e história ocupacional',
    ],
    secoes: [
      {
        titulo: '1. Identificação Completa (13 Parâmetros)',
        subtitulo: 'Perfil epidemiológico e dados assistenciais essenciais',
        itens: [
          'Nome completo ou iniciais',
          'Idade e data de nascimento',
          'Sexo biológico e gênero',
          'Cor / Raça / Etnia (branca, parda, preta, amarela, indígena)',
          'Estado civil (solteiro, casado, união estável, separado, viúvo)',
          'Profissão atual e profissões anteriores (exposições ocupacionais prévias)',
          'Naturalidade (onde nasceu) e Procedência (onde vive atualmente e há quanto tempo)',
          'Religião / Espiritualidade (considerar restrições e crenças terapêuticas)',
          'Escolaridade formal',
          'Filiação / Nome da mãe ou responsável legal',
          'Convênio de saúde ou Sistema Único de Saúde (SUS)',
          'Leito, Enfermaria, Clínica e Data/Hora da internação',
          'Informante e Grau de Confiabilidade das informações prestadas',
        ],
        dicasPraticas: [
          'A procedência é vital para doenças endêmicas (Chagas, esquistossomose, malária).',
          'Profissões pregressas podem revelar exposição a poeiras minerais (silicose) ou amianto.',
        ],
      },
      {
        titulo: '2. Queixa Principal (QP)',
        subtitulo: 'Motivo primordial da procura de auxílio médico',
        itens: [
          'Reproduzir as palavras do próprio paciente (ipsissima verba)',
          'Associar invariavelmente ao tempo de duração do sintoma',
          'Evitar registrar diagnósticos prévios como queixa (ex: usar "falta de ar" e não "insuficiência cardíaca")',
        ],
        dicasPraticas: [
          'Exemplo clássico: "Dor no peito em aperto e suor frio há 2 horas".',
          'Se houver múltiplas queixas, identificar qual motivou a procura neste momento.',
        ],
      },
      {
        titulo: '3. História da Doença Atual (HDA) - Os 8 Atributos Semiológicos',
        subtitulo: 'Metodologia sistemática de dissecação do sintoma-guia',
        itens: [
          '1. Início: data, hora aproximada, modo de instalação (súbito, agudo ou insidioso/gradual) e circunstâncias associadas.',
          '2. Localização anatômica precisa e irradiação (ex: retroesternal com irradiação para mandíbula e MSE).',
          '3. Caráter / Qualidade: queimação, aperto/opressão, pontada/pleurítica, cólica, peso, pulsátil, lancinante.',
          '4. Intensidade / Severidade: mensurada na Escala Visual Analógica (EVA) de 0 a 10.',
          '5. Duração e Periodicidade: contínua ou episódica; se em crises, duração de cada crise e frequência diária/semanal.',
          '6. Fatores de Melhora e Fatores de Piora: relação com esforço físico, repouso, alimentação, postura, tosse, respiração, medicamentos.',
          '7. Manifestações Concomitantes: sintomas acompanhantes na mesma crise (náusea, sudorese, dispneia, febre, tontura).',
          '8. Evolução Temporal e Tratamentos Prévios: melhora, piora ou estabilidade ao longo do tempo e resposta a medicações já utilizadas.',
        ],
        dicasPraticas: [
          'A HDA deve contar uma história com começo, meio e fim cronológico claro.',
          'Sempre registrar as "negativas pertinentes" (ex: "nega tosse, nega febre, nega síncope").',
        ],
      },
      {
        titulo: '4. Interrogatório Sintomatológico / Revisão de Sistemas (ISDA)',
        subtitulo: 'Varredura por aparelhos para não omitir afecções concomitantes',
        itens: [
          'Sintomas Gerais: febre, calafrios, astenia, fadiga, alteração ponderal (kg em quanto tempo), sudorese noturna, apetite.',
          'Cabeça e Pescoço: cefaleia, acuidade visual, escotomas, diplopia, zumbido, otorreia, epistaxe, odinofagia, bócio, nódulos.',
          'Aparelho Respiratório: tosse (seca ou com expectoração), hemoptise, dispneia aos esforços, ortopneia, DPN, sibilância, dor pleurítica.',
          'Aparelho Cardiovascular: dor precordial, palpitações, edema de MMII (simetria e horário), claudicação intermitente, lipotímia, síncope.',
          'Aparelho Digestório: disfagia, pirose/azia, dor epigástrica e ritmo com alimentos, náuseas, vômitos, trânsito intestinal (Escala Bristol), melena, enterorragia, icterícia.',
          'Aparelho Geniturinário: disúria, polaciúria, nictúria, hematúria, jato urinário hesitante; DUM, ciclo menstrual, paridade (GPA), preventivo.',
          'Aparelho Locomotor: artralgias, artrites (flogose), rigidez matinal e sua duração, mialgias, limitação funcional.',
          'Sistema Nervoso e Psiquiátrico: convulsões, déficits motores, parestesias, tremores, insônia, humor deprimido, ansiedade.',
          'Pele e Fâneros: prurido, manchas, úlceras, alopecia, icterícia cutânea, unhas quebradiças.',
        ],
        dicasPraticas: [
          'Perguntas devem ser rápidas e diretas: "O senhor tem notado inchaço nas pernas? Falta de ar ao deitar reto?".',
        ],
      },
      {
        titulo: '5. Antecedentes Pessoais (APF e APP)',
        subtitulo: 'Histórico fisiológico, patológico, cirúrgico e farmacológico',
        itens: [
          'Fisiológicos: parto, DNPM, puberdade, vacinação atualizada (tétano, hepatite B, influenza, COVID-19).',
          'Patológicos: HAS, Diabetes, dislipidemia, DAC, IAM/AVC prévios, asma/DPOC, doença renal, neoplasias.',
          'Doenças Infecciosas Prévias: tuberculose, sífilis, hepatites virais, HIV, Chagas, dengue.',
          'Cirurgias e Internações: procedimentos prévios com ano e tipo de anestesia/intercorrências.',
          'Transfusões Sanguíneas: ano e reações adversas transfusionais.',
          'Alergias Medicamentosas: fármaco específico e tipo exato de reação (anafilaxia, urticária, angioedema).',
          'Medicamentos de Uso Contínuo: nome, dose, via, horário e grau de adesão ao tratamento.',
        ],
        dicasPraticas: [
          'Nunca aceite apenas "tenho pressão alta"; pergunte há quantos anos e quais remédios toma hoje.',
        ],
      },
      {
        titulo: '6. Antecedentes Familiares (AF)',
        subtitulo: 'Risco genético e história cardiovascular precoce',
        itens: [
          'História em parentes de 1º grau (pais, irmãos e filhos)',
          'Infarto ou morte súbita precoce (< 55 anos homem, < 65 anos mulher)',
          'Hipertensão, Diabetes Mellitus, AVC precoce',
          'Neoplasias familiares (tipo de câncer e idade ao diagnóstico)',
          'Doenças autoimunes ou psiquiátricas na família',
          'Consanguinidade entre os pais',
        ],
        dicasPraticas: [
          'A idade do familiar ao sofrer o evento define se é fator de risco coronariano precoce maior.',
        ],
      },
      {
        titulo: '7. Condições de Vida & Hábitos (CV/HV)',
        subtitulo: 'Determinantes sociais de saúde e cálculo de riscos',
        itens: [
          'Tabagismo: status, tipo, cigarros/dia, anos de fumo e Carga Tabágica (Anos-Maço).',
          'Etilismo: frequência, tipo de bebida, volume habitual e triagem CAGE.',
          'Uso de substâncias psicoativas ilícitas (maconha, cocaína, crack, outras).',
          'Padrão alimentar: consumo de sal, gorduras, verduras, água/hidratação.',
          'Atividade física: tipo, frequência semanal e duração por sessão.',
          'Sono: quantidade de horas, sono reparador, roncos e apneia.',
          'Condições de moradia: alvenaria, saneamento básico, água encanada, coleta de lixo, animais domésticos.',
          'História ocupacional: riscos químicos, físicos, biológicos e ergonomia.',
        ],
        dicasPraticas: [
          'Fórmula de Anos-Maço: (Nº de cigarros consumidos ao dia / 20) x Anos de tabagismo.',
        ],
      },
    ],
  },
  {
    id: 'roteiro-pedagogico-mccp',
    nome: 'Roteiro Pedagógico para Anamnese (MCCP & Semiologia Acadêmica)',
    origem: 'Método Clínico Centrado na Pessoa / Educação Médica',
    descricao:
      'Abordagem pedagógica que une a semiologia técnica à escuta ativa do paciente, estruturada no Modelo FIFE (Sentimentos, Ideias, Função, Expectativas) e no raciocínio diagnóstico em 3 níveis (Sindrômico, Topográfico e Etiológico).',
    principios: [
      'Acolhimento empático com comunicação verbal e não verbal atenta',
      'Exploração obrigatória das 4 dimensões da experiência da doença pelo paciente (FIFE)',
      'Construção do raciocínio semiológico em três níveis: Sindrômico, Topográfico e Etiológico',
      'Decisão compartilhada e construção conjunta do Projeto Terapêutico Singular',
      'Orientações educativas e pactuação clara de Sinais de Alarme (Red Flags)',
    ],
    secoes: [
      {
        titulo: '1. Acolhimento e Postura Profissional',
        subtitulo: 'Fundamentos da relação médico-paciente humanizada',
        itens: [
          'Apresentar-se pelo nome e função com aperto de mão ou cumprimento respeitoso',
          'Garantir privacidade, conforto térmico e ausência de interrupções no ambiente',
          'Manter contato visual sincero e postura corporal aberta',
          'Iniciar com pergunta aberta: "O que o(a) trouxe à nossa consulta hoje? Em que posso ajudá-lo(a)?"',
          'Ouvir sem interromper nos primeiros 90 segundos da narrativa espontânea',
        ],
        dicasPraticas: [
          'Estudos demonstram que a maioria dos médicos interrompe o paciente com menos de 20 segundos de fala.',
        ],
      },
      {
        titulo: '2. As 4 Dimensões da Doença - Modelo FIFE',
        subtitulo: 'Compreender a vivência subjetiva do adoecimento',
        itens: [
          'F - Feelings (Sentimentos): "O que mais te preocupa a respeito desse sintoma? Quais são seus maiores receios ou medos?"',
          'I - Ideas (Ideias): "O que você acha que pode estar acontecendo no seu corpo? Qual sua teoria pessoal sobre a causa?"',
          'F - Function (Função / Repercussão): "Como esse sintoma tem impactado suas atividades cotidianas, seu trabalho e o convívio com sua família?"',
          'E - Expectations (Expectativas): "O que você espera que façamos na consulta de hoje? Quais suas expectativas em relação a exames e medicações?"',
        ],
        dicasPraticas: [
          'Conhecer as expectativas do paciente evita solicitações desnecessárias de exames e aumenta a adesão terapêutica.',
        ],
      },
      {
        titulo: '3. Raciocínio Clínico em Três Níveis Diagnósticos',
        subtitulo: 'Da observação fenomenológica à elucidação etiopatogênica',
        itens: [
          '1. Diagnóstico Sindrômico: agrupamento de sinais e sintomas em uma grande síndrome fisiopatológica (ex: Síndrome Coronariana Aguda, Síndrome Dispneica, Síndrome Febril Prolongada, Síndrome Consumptiva).',
          '2. Diagnóstico Topográfico / Anatômico: identificação do órgão, tecido ou topografia corporal comprometida (ex: Parede anterior do miocárdio ventricular esquerdo, Lobo inferior pulmonar direito, Glomerular renal).',
          '3. Diagnóstico Etiológico: mecanismo causal exato - infeccioso, isquêmico aterotrombótico, autoimune, metabólico, tóxico, neoplásico (ex: Aterotrombose coronariana aguda com rotura de placa).',
        ],
        dicasPraticas: [
          'Essa tríade diagnóstica pedagógica organiza o raciocínio antes de solicitar exames complementares.',
        ],
      },
      {
        titulo: '4. Projeto Terapêutico & Decisão Compartilhada',
        subtitulo: 'Plano pactuado que une propedêutica e terapêutica',
        itens: [
          'Plano Propedêutico: exames direcionados com finalidade clínica específica.',
          'Plano Farmacológico: medicamentos explicados quanto a horários, efeitos e possíveis reações.',
          'Plano Não-Farmacológico: mudanças comportamentais, cessação do fumo, adaptações alimentares, suporte familiar.',
          'Sinais de Alarme (Red Flags): orientações explícitas sobre quando retornar imediatamente ao pronto-socorro.',
        ],
        dicasPraticas: [
          'Finalize sempre com: "Para termos certeza de que conversamos tudo com clareza, você poderia me explicar o que combinamos como plano?".',
        ],
      },
    ],
  },
];

/**
 * Modelos de Anamnese prontos para carregar diretamente no formulário
 */
export const MODELOS_DE_ANAMNESE: AnamneseTemplateModel[] = [
  {
    id: 'modelo-adulto-hospitalar-pucrs',
    titulo: 'Anamnese Completa do Adulto (Roteiro PUCRS / Hospitalar)',
    origemRoteiro: 'adulto-pucrs',
    subtitulo: 'Admissão hospitalar de alta complexidade com os 8 atributos da dor e ISDA completo',
    descricao:
      'Modelo baseado no roteiro clássico de anamnese do paciente adulto da PUCRS. Inclui identificação com 13 itens, caracterização metódica de dor torácica aguda, histórico de comorbidades e revisão de aparelhos.',
    tags: ['Hospitalar', 'PUCRS', 'Adulto', 'Dor Torácica', 'ISDA Completo'],
    data: {
      tipo: 'anamnese',
      perfil: 'cardiologia',
      formatoSaida: 'academico',
      identificacao: {
        nomeIniciais: 'A.R.S.',
        idade: '62',
        idadeUnidade: 'anos',
        sexo: 'M',
        corEtnia: 'Branca',
        estadoCivil: 'Casado',
        ocupacao: 'Motorista de caminhão aposentado',
        naturalidade: 'Porto Alegre - RS',
        procedencia: 'Porto Alegre - RS (reside no mesmo município há 40 anos)',
        religiao: 'Católica',
        escolaridade: 'Ensino Médio Completo',
        filiacao: 'Helena Ramos da Silva',
        convenioSus: 'SUS',
        clinicaEnfermaria: 'Clínica Médica / Enfermaria Adulto',
        leito: 'Leito 204-B',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '10:00',
        responsavel: 'Dr. Médico Assistente',
        crm: '45892-RS',
        acompanhante: 'Esposa (confiabilidade boa)',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH (Admissão)',
        motivoInternacao: 'Dor torácica típica em aperto a esclarecer / Síndrome Coronariana Aguda',
        intercorrencias: 'Episódio agudo de dor precordial de forte intensidade hoje pela manhã.',
        comorbidadesAlergias: 'HAS de longa data, Dislipidemia e Tabagismo pesado. Nega alergias medicamentosas.',
        tratamentosFimDefinido: 'Dose de ataque de AAS 300mg e Clopidogrel 300mg administrada na admissão.',
        acessosDispositivos: 'AVP em MSE jelco 20G, em ar ambiente.',
        examesPorData: [
          { id: '1', data: 'Hoje', resultado: 'ECG: Infradesnivelamento de segmento ST de 1.5mm em V4-V6' },
        ],
      },
      sinaisVitais: {
        pa: '152x94',
        fc: '86',
        fr: '18',
        tax: '36.5',
        satO2: '97',
        o2Suporte: 'AA',
        diurese: 'presente, clara',
        evacuacoes: 'presentes',
        balanco: 'zerado',
        glicemia: '124 mg/dL',
        dorEscala: '8/10',
      },
      pacienteRelata: 'Refere dor intensa no meio do peito iniciada hoje cedo em repouso.',
      sintomasAtuais: 'Desconforto retroesternal residual nota 4/10, náusea leve e sudorese fria.',
      negativasRelevantes: 'Nega febre, tosse, dor pleurítica ou episódios de síncope.',
      queixaPrincipal: 'Dor no peito em aperto e queimação com suor frio há 3 horas',
      hda:
        'Paciente masculino, 62 anos, previamente hipertenso e tabagista, relata que há aproximadamente 3 horas, enquanto estava sentado em repouso assistindo à televisão, iniciou quadro de dor retroesternal em aperto e queimação, de forte intensidade (EVA 8/10). A dor irradia para o membro superior esquerdo (face medial do braço) e para a mandíbula. Como manifestações associadas, refere sudorese fria profusa, náuseas e discreta sensação de sufocação. Não observou alívio com mudança postural ou repouso. Procurou a emergência trazido por familiares. Ao interrogatório sistemático dirigido, nega episódios semelhantes prévios no mesmo padrão, nega febre, tosse, palpitações ou sintomas respiratórios precedentes. Estado geral no momento: queixoso de desconforto residual retroesternal (EVA 4/10).',
      hpp:
        'Hipertensão Arterial Sistêmica diagnosticada há 15 anos com controle irregular. Dislipidemia mista não tratada regularmente. Nega Diabetes Mellitus, AVC, nefropatia ou infarto prévio. Cirurgias prévias: apendicectomia aos 25 anos sem intercorrências. Nega transfusões de sangue. Nega alergias medicamentosas conhecidas.',
      historiaFamiliar:
        'Pai falecido por infarto agudo do miocárdio aos 52 anos (história precoce de DAC em parente de 1º grau). Mãe hipertensa de longa data, faleceu aos 78 anos por AVC. Dois irmãos vivos, um deles hipertenso e revascularizado com angioplastia aos 58 anos.',
      historiaFisiologica:
        'Nascido de parto normal a termo sem intercorrências perinatais. Desenvolvimento neuropsicomotor dentro do esperado. Calendário vacinal do adulto incompleto (último reforço antitetânico há mais de 10 anos). Padrão intestinal habitual diário, diurese sem queixas.',
      historiaSocial:
        'Reside em casa de alvenaria em Porto Alegre com esposa e um filho. Conta com água encanada tratada, esgoto sanitário e energia elétrica. Tabagista ativo desde os 18 anos, consome 1 maço de cigarros por dia há 44 anos (Carga Tabágica: 44 anos-maço). Etilismo social (cerveja nos finais de semana, cerca de 3 a 4 latas). Nega uso de substâncias ilícitas. Sedentário, sem prática de exercícios físicos regulares. Alimentação com excesso de sal e gorduras saturadas.',
      revisaoSistemas: {
        constitucional: 'Nega astenia crônica, nega febre ou perda ponderal recente.',
        cabecaPescoco: 'Sem queixas de cefaleia habitual, nega tontura rotatória, visão e audição preservadas.',
        respiratorio: 'Nega tosse crônica, nega expectoração ou chieira; nega dor ventilatório-dependente.',
        cardiovascular: 'Refere dor retroesternal típica descrita na HDA. Nega palpitações ou ortopneia prévia.',
        gastrointestinal: 'Náuseas no episódio agudo. Nega pirose crônica, nega disfagia ou sangramento digestivo.',
        geniturinario: 'Nega disúria, polaciúria, hematúria ou jato urinário fraco.',
        osteoarticular: 'Nega artralgias, artrites ou rigidez matinal significativa.',
        neurologico: 'Lúcido, orientado e contactuante; sem déficits motores ou sensitivos focais.',
        peleAnexos: 'Sudorese fria na admissão; sem lesões cutâneas ativas.',
      },
      habitosVidaDetalhado: {
        tabagismoStatus: 'fumante-ativo',
        cigarrosDia: '20',
        anosFumo: '44',
        cargaTabagicaAnosMaco: '44',
        etilismo: 'Social aos finais de semana (3-4 latas cerveja)',
        drogasIlicitas: 'Nega',
        alimentacao: 'Dieta hipercalórica com alto teor de sódio e carnes vermelhas',
        atividadeFisica: 'Sedentário',
        padraoSono: '6 horas por noite, sem queixa de insônia crônica',
        condicoesMoradia: 'Alvenaria, saneamento básico completo, sem animais domésticos',
        riscosOcupacionais: 'Sedentarismo e estresse prévio na condução de veículos pesados',
      },
      exameFisico: {
        estadoGeral: 'REG, lúcido e orientado no tempo e espaço, sudoreico, corado, hidratado, anictérico, acianótico, afebril.',
        ectoscopia: 'Fácies de sofrimento agudo por dor. Perfusão periférica rápida (TEC < 2s). Sem linfonodomegalias cervicais.',
        cabecaPescoco: 'Pupilas isocóricas e fotorreagentes. Mucosas úmidas e coradas. Sem turgência jugular patológica a 45°.',
        acv: 'Ritmo cardíaco regular em 2 tempos, bulhas normofonéticas, sem sopros audíveis. Ictus cordis no 5º EIC na linha hemiclavicular esquerda.',
        aResp: 'Murmúrio vesicular universalmente audível, limpo, sem ruídos adventícios crepitantes ou sibilos. Eupneico em repouso.',
        abdome: 'Plano, flácido, ruídos hidroaéreos normoativos, indolor à palpação superficial e profunda, sem visceromegalias, descompressão brusca negativa.',
        extremidades: 'Pulsos radiais e pediosos palpáveis, cheios e simétricos bilateralmente. Sem edema ou empastamento de panturrilhas.',
        neurologicoPele: 'Glasgow 15, sem sinais de irritação meníngea, sem déficits motores ou sensitivos focais.',
      },
      sinteseClinica:
        'Paciente masculino idoso com múltiplos fatores de risco cardiovascular maiores (HAS, tabagismo pesado e história familiar precoce) admitido com quadro típico de dor torácica anginosa e alterações isquêmicas no ECG (infradesnivelamento de ST), configurando Síndrome Coronariana Aguda sem Supradesnivelamento de ST (SCASST).',
      hipotesePrincipal: {
        codigoCid: 'I21.4',
        nomeCid: 'Infarto Agudo do Miocárdio Subendocárdico (Sem Supradesnivelamento de ST)',
        justificativa:
          'Dor anginosa típica com mais de 20 minutos de duração em paciente de alto risco cardiovascular + alteração isquêmica em parede lateral no ECG (infra de ST em V4-V6).',
      },
      diferenciais: [
        {
          codigoCid: 'I20.0',
          nomeCid: 'Angina Instável de Alto Risco',
          justificativa: 'Principal diagnóstico diferencial a ser definido conforme curva seriada de troponina.',
        },
        {
          codigoCid: 'I26.9',
          nomeCid: 'Tromboembolismo Pulmonar Agudo',
          justificativa: 'Menos provável por ausência de taquipneia, dor pleurítica ou hipoxemia (Escore de Wells baixo).',
        },
        {
          codigoCid: 'I71.0',
          nomeCid: 'Dissecção Aguda de Aorta Torácica',
          justificativa: 'Afastada pela ausência de assimetria de pulsos/PA e ausência de dor interescapular lancinante.',
        },
      ],
      condutaDiagnostica:
        '1. Troponina I ultrassensível em curva (0h, 1h, 3h)\n2. Hemograma, Creatinina, Ureia, Glicemia, Sódio, Potássio, Coagulograma e Lipidograma\n3. ECG de 12 derivações seriado a cada 6 horas ou se recorrência de dor\n4. Radiografia de tórax no leito\n5. Estratificação invasiva com Cineangiocoronariografia (Cateterismo cardíaco) nas primeiras 24h conforme Escore GRACE.',
      condutaTerapeutica:
        '1. Dieta branda para coronariopatia, hipossódica e hipolipídica\n2. Monitorização cardíaca contínua e oximetria de pulso\n3. AAS 100 mg/dia VO após dose de ataque\n4. Clopidogrel 75 mg/dia VO\n5. Enoxaparina 1 mg/kg SC de 12/12h (80 mg SC 12/12h)\n6. Atorvastatina 80 mg VO à noite\n7. Metoprolol succinato 25 mg VO 1x/dia se PA e FC estáveis sem sinais de IC aguda\n8. Nitroglicerina SL se dor precordial refratária.',
      cuidadosGerais:
        'Repouso absoluto no leito, cabeceira a 30°, controle rigoroso de PA de 2/2h e avaliação de pulsos periféricos. Notificar médico se recorrência de dor torácica.',
      planoAltaSeguimento:
        'Permanência em Unidade Coronariana / Semi-Intensiva para estratificação e cineangiocoronariografia. Orientação prévia de cessação total do tabagismo e reabilitação cardiovascular futura.',
      examesComplementares: [
        { id: '1', exame: 'Troponina I Ultrassensível seriada', finalidade: 'Confirmação de necrose miocárdica e diagnóstico diferencial entre IAM sem supra e Angina Instável' },
        { id: '2', exame: 'Cineangiocoronariografia (Cateterismo)', finalidade: 'Identificação da artéria culpada e desobstrução coronária percutânea com stent farmacológico' },
        { id: '3', exame: 'Ecocardiograma Transtorácico', finalidade: 'Avaliação de função sistólica ventricular esquerda e déficits de motilidade segmentar' },
      ],
    },
  },
  {
    id: 'modelo-pedagogico-mccp',
    titulo: 'Anamnese Centrada na Pessoa (Roteiro Pedagógico - MCCP & FIFE)',
    origemRoteiro: 'pedagogico-mccp',
    subtitulo: 'Abordagem formativa com exploração das dimensões FIFE e raciocínio sindrômico/topográfico/etiológico',
    descricao:
      'Modelo baseado no Roteiro Pedagógico de Anamnese. Explora com rigor a vivência do paciente (Sentimentos, Ideias, Função e Expectativas), divide o diagnóstico nos 3 níveis e pactua sinais de alarme e plano não farmacológico.',
    tags: ['Pedagógico', 'MCCP', 'FIFE', 'Semiologia Acadêmica', 'Medicina Centrada na Pessoa'],
    data: {
      tipo: 'anamnese',
      perfil: 'clinica-geral',
      formatoSaida: 'pedagogico-mccp',
      identificacao: {
        nomeIniciais: 'M.L.C.',
        idade: '47',
        idadeUnidade: 'anos',
        sexo: 'F',
        corEtnia: 'Parda',
        estadoCivil: 'União Estável',
        ocupacao: 'Professora de Ensino Fundamental',
        naturalidade: 'Belo Horizonte - MG',
        procedencia: 'Belo Horizonte - MG',
        religiao: 'Espírita',
        escolaridade: 'Superior Completo',
        filiacao: 'Ana Lúcia Campos',
        convenioSus: 'SUS',
        clinicaEnfermaria: 'Ambulatório de Clínica Médica / MFC',
        leito: 'Consultório 04',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '14:30',
        responsavel: 'Dr. Médico / Interno de Medicina',
        crm: '38190-MG',
        acompanhante: 'Sozinha (confiabilidade boa)',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'Ambulatorial',
        motivoInternacao: 'Cefaleia holocraniana em aperto e fadiga crônica há 2 meses',
        intercorrencias: 'Piora dos episódios de dor durante fechamento de notas escolares e noites mal dormidas.',
        comorbidadesAlergias: 'Sem comorbidades prévias diagnosticadas. Alergia a sulfa.',
        tratamentosFimDefinido: 'Uso abusivo de analgésicos comuns por conta própria (Dipirona + Paracetamol).',
        acessosDispositivos: 'Sem dispositivos invasivos.',
        examesPorData: [],
      },
      sinaisVitais: {
        pa: '128x82',
        fc: '74',
        fr: '16',
        tax: '36.4',
        satO2: '99',
        o2Suporte: 'AA',
        diurese: 'normal',
        evacuacoes: 'normais',
        balanco: 'neutro',
        glicemia: '92 mg/dL',
        dorEscala: '6/10',
      },
      pacienteRelata: 'Refere dores de cabeça quase diárias em aperto, associadas a cansaço intenso e preocupação com o trabalho.',
      sintomasAtuais: 'Tensão muscular na região cervical e dor em faixa na fronte e occipital.',
      negativasRelevantes: 'Nega náuseas, vômitos em jato, fotofobia incapacitante, febre ou déficits visuais.',
      queixaPrincipal: 'Dor na cabeça diária e cansaço constante há 2 meses',
      hda:
        'Paciente feminina de 47 anos relata quadro insidioso de cefaleia com início há cerca de 2 meses. Descreve a dor como sensação de "capacete apertado" ou "faixa que aperta a testa e a nuca", de caráter não pulsátil, com intensidade moderada flutuante (EVA 5 a 7/10). Os episódios iniciam-se predominantemente no período vespertino e pioram no final da jornada de trabalho. Nega aura, nega vômitos em jato, nega alterações visuais ou déficits motores. Refere que a dor melhora temporariamente com banho morno e analgésicos simples, porém reaparece no dia seguinte, tendo passado a tomar 4 a 6 comprimidos de analgésicos combinados por semana. Ao interrogatório detalhado, relata alta sobrecarga laboral e estresse emocional recente decorrente de problemas na gestão escolar.',
      hpp:
        'Nega hipertensão, diabetes ou dislipidemia prévios. História de gastrite erosiva leve diagnosticada há 3 anos. Nega cirurgias prévias. Alergia documentada a Sulfametoxazol-Trimetoprima (rash cutâneo prurítico). Medicamentos atuais: Dipirona 1g VO SOS quase diário e Neosaldina.',
      historiaFamiliar:
        'Mãe com histórico de enxaqueca na juventude, hoje hipertensa aos 74 anos. Pai falecido aos 80 anos por causas naturais. Nega histórico familiar de aneurisma intracraniano ou neoplasias do SNC.',
      historiaFisiologica:
        'Desenvolvimento sem intercorrências. Ciclos menstruais regulares, DUM há 12 dias. G2P2A0 (dois partos cesáreos a termo). Não faz uso de anticoncepcional hormonal.',
      historiaSocial:
        'Professora há 22 anos. Reside com o esposo e duas filhas adolescentes em boas condições habitacionais. Não fuma (não tabagista), não ingere bebidas alcoólicas. Não pratica atividade física há 3 anos por alegação de falta de tempo. Padrão alimentar irregular, pula o café da manhã com frequência e ingere 4 a 5 xícaras de café ao dia.',
      revisaoSistemas: {
        constitucional: 'Astenia vespertina, nega febre, peso estável.',
        cabecaPescoco: 'Tensão e dor à palpação de musculatura trapeziana e suboccipital. Visão e audição normais.',
        respiratorio: 'Sem queixas respiratórias.',
        cardiovascular: 'Sem palpitações ou precordialgia.',
        gastrointestinal: 'Epigastralgia ocasional em queimação quando em uso excessivo de analgésicos.',
        geniturinario: 'Sem queixas urinárias.',
        osteoarticular: 'Dor miofascial em cintura escapular e pescoço.',
        neurologico: 'Sono fragmentado (acorda várias vezes à noite). Sem déficits focais.',
        peleAnexos: 'Sem lesões.',
      },
      // Dimensões do Modelo FIFE (Roteiro Pedagógico)
      experienciaDoencaFife: {
        sentimentos:
          'Muito ansiosa e com medo de que a dor de cabeça constante seja sinal de um "tumor cerebral" ou aneurisma, já que uma colega de trabalho teve diagnóstico recente.',
        ideias:
          'Acredita que o estresse das aulas e a pressão no trabalho causaram a dor, mas teme que algo mais grave esteja escondido em sua cabeça.',
        funcao:
          'A dor tem prejudicado sua paciência com os alunos, tem reduzido sua produtividade no planejamento das aulas e atrapalhado os momentos de lazer com a família nos fins de semana.',
        expectativas:
          'Espera que o médico ouça suas angústias, solicita se é necessário fazer uma ressonância magnética para descartar causas graves e deseja aprender a tratar a dor sem depender de remédios todos os dias.',
      },
      // Raciocínio Clínico em 3 Níveis (Roteiro Pedagógico)
      raciocinioClinico: {
        sindromico: 'Síndrome de Cefaleia Primária Crônica (Cefaleia Tensional Crônica com provável Cefaleia por Uso Excessivo de Medicamentos / Rebound).',
        topografico: 'Músculos pericranianos (músculos temporal, frontal, occipital e trapézio) e vias de modulação central da dor.',
        etiologico: 'Hipertonia miofascial e hipersensibilização central desencadeada por estresse psicossocial, privação de sono e piorada pelo uso frequente de analgésicos.',
      },
      habitosVidaDetalhado: {
        tabagismoStatus: 'nunca-fumou',
        cigarrosDia: '0',
        anosFumo: '0',
        cargaTabagicaAnosMaco: '0',
        etilismo: 'Abstêmia',
        drogasIlicitas: 'Nega',
        alimentacao: 'Irregular, ingere pouco líquido e consome café em excesso (5 xícaras/dia)',
        atividadeFisica: 'Sedentária há 3 anos',
        padraoSono: 'Sono não reparador, cerca de 5h/noite, despertares frequentes com pensamentos sobre o trabalho',
        condicoesMoradia: 'Alvenaria com excelente saneamento em bairro urbano estruturado',
        riscosOcupacionais: 'Sobrecarga de trabalho mental, ruído em sala de aula e postura estática',
      },
      exameFisico: {
        estadoGeral: 'BEG, vigil, orientada no tempo e espaço, corada, hidratada, anictérica, acianótica, afebril.',
        ectoscopia: 'Fácies de preocupação e cansaço. Sem linfonodomegalias.',
        cabecaPescoco: 'Palpação com dor à digitopressão em musculatura pericraniana bilateral (músculos temporais, trapézio e suboccipitais). Sem dor na palpação de artérias temporais. Sem bócio.',
        acv: 'RCR, 2T, BNF, sem sopros. PA 128x82 mmHg e FC 74 bpm.',
        aResp: 'MVUA bilateralmente, sem ruídos adventícios.',
        abdome: 'Flácido, indolor, sem visceromegalias.',
        extremidades: 'Bem perfundidas, sem edemas.',
        neurologicoPele:
          'Exame neurológico minucioso: Pares cranianos (I a XII) preservados e simétricos. Força muscular grau 5 globalmente. Reflexos profundos normorreflexos (2+/4+). Sensibilidade tátil e térmica preservadas. Coordenação (índex-nariz) e marcha normais. Fundo de olho: papilas ópticas de bordas nítidas, sem edema de papila. Sinais de Kernig e Brudzinski ausentes.',
      },
      sinteseClinica:
        'Mulher de 47 anos com cefaleia de características puramente tensionais e exame neurológico rigorosamente normal (sem red flags), apresentando cefaleia por uso abusivo de analgésicos e grande sobrecarga psicossocial. Exploração FIFE revelou intenso medo de neoplasia do SNC.',
      hipotesePrincipal: {
        codigoCid: 'G44.2',
        nomeCid: 'Cefaleia Tensional Crônica',
        justificativa:
          'Dor holocraniana em aperto/faixa, não pulsátil, de moderada intensidade, bilateral, sem piora com atividade física rotineira e com exame neurológico e fundoscopia normais.',
      },
      diferenciais: [
        {
          codigoCid: 'G44.4',
          nomeCid: 'Cefaleia Induzida por Medicamentos (Uso Abusivo de Analgésicos)',
          justificativa: 'Ingestão de mais de 15 dias no mês de analgésicos simples há mais de 2 meses.',
        },
        {
          codigoCid: 'G43.9',
          nomeCid: 'Enxaqueca Sem Aura',
          justificativa: 'Menos provável por ausência de dor latejante/unilateral, náuseas e fotofobia limitante.',
        },
      ],
      condutaDiagnostica:
        'Quadro clínico típico com ausência de sinais de alarme ("red flags"). Não há indicação médica inicial de neuroimagem (tomografia ou ressonância), o que foi esclarecido e pactuado com a paciente.',
      condutaTerapeutica:
        '1. Desmame progressivo e interrupção do uso indiscriminado de analgésicos combinados.\n2. Prescrição de Amitriptilina 10 mg VO à noite para profilaxia e melhora da qualidade do sono.\n3. Analgesia de resgate restrita: Naproxeno 500 mg VO se dor incapacitante, limitado a 2x por semana.',
      planoNaoFarmacologico:
        '1. Higiene do sono: ambiente escuro, sem telas 1h antes de dormir, horário regular.\n2. Redução da cafeína para no máximo 1 xícara pequena pela manhã.\n3. Prática de atividade física aeróbica regular (caminhada 30 min, 3 a 4x/semana).\n4. Técnicas de relaxamento muscular e alongamento cervical guiado.\n5. Diário da Cefaleia para registrar gatilhos e frequência.',
      sinaisAlarme:
        'Orientada a procurar atendimento médico de emergência caso ocorra: dor de início súbito com intensidade máxima em segundos ("trovoada"), febre com rigidez de nuca, alteração visual súbita, perda de força em braço ou perna, ou convulsão.',
      cuidadosGerais:
        'Acolhimento da angústia com esclarecimento fisiopatológico compreensível, reforçando a natureza benigna e tratável do quadro.',
      planoAltaSeguimento:
        'Retorno agendado em 30 dias para avaliação do diário da cefaleia, adesão à profilaxia com amitriptilina e reavaliação de metas.',
      examesComplementares: [
        { id: '1', exame: 'Diário da Dor de Cabeça (30 dias)', finalidade: 'Mapear dias com dor, gatilhos emocionais/alimentares e resposta às medidas profiláticas' },
      ],
    },
  },
  {
    id: 'modelo-emergencia-sample',
    titulo: 'Anamnese de Emergência Rápida (Protocolo SAMPLE / AMPLIAR)',
    origemRoteiro: 'especialidade',
    subtitulo: 'Roteiro dinâmico e direcionado para sala de urgência e trauma clínico',
    descricao:
      'Modelo baseado no método mnemônico SAMPLE (Sinais/Sintomas, Alergias, Medicações, Passado médico, Líquidos/Última refeição, Eventos que antecederam). Ideal para plantões de emergência.',
    tags: ['Emergência', 'Urgência', 'SAMPLE', 'AMPLIAR', 'Pronto-Socorro'],
    data: {
      tipo: 'anamnese',
      perfil: 'enfermaria-uti',
      formatoSaida: 'sintetico',
      identificacao: {
        nomeIniciais: 'E.V.M.',
        idade: '54',
        idadeUnidade: 'anos',
        sexo: 'M',
        corEtnia: 'Parda',
        estadoCivil: 'Divorciado',
        ocupacao: 'Eletricista',
        naturalidade: 'São Paulo - SP',
        procedencia: 'São Paulo - SP',
        religiao: 'Não informada',
        escolaridade: 'Fundamental Completo',
        filiacao: 'Maria Luísa V. Martins',
        convenioSus: 'SUS',
        clinicaEnfermaria: 'Pronto-Socorro / Sala Vermelha',
        leito: 'Leito 01 - Estabilização',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        responsavel: 'Médico Plantonista de Emergência',
        crm: '109876-SP',
        acompanhante: 'Trazido pelo SAMU',
        confiabilidade: 'moderada',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 Emergência',
        motivoInternacao: 'Dispneia súbita e broncoespasmo grave / Crise de Asma Aguda Grave',
        intercorrencias: 'Episódio agudo de broncoespasmo sem resposta a medicação inalatória domiciliar.',
        comorbidadesAlergias: 'Asma brônquica crônica. Alergia a AAS e AINEs (precipita broncoespasmo).',
        tratamentosFimDefinido: 'Nebulização com Fenoterol + Ipratrópio e Hidrocortisona EV 200mg no SAMU.',
        acessosDispositivos: 'AVP MSE calibroso; máscara de O2 com reservatório a 10 L/min.',
        examesPorData: [
          { id: '1', data: 'Hoje', resultado: 'Gasometria arterial: pH 7.32, pCO2 44 mmHg (fadiga iminente), pO2 68 mmHg' },
        ],
      },
      sinaisVitais: {
        pa: '140x90',
        fc: '122',
        fr: '32',
        tax: '36.8',
        satO2: '91',
        o2Suporte: 'Máscara com reservatório 10L/min',
        diurese: 'presente',
        evacuacoes: 'presentes',
        balanco: 'neutro',
        glicemia: '142 mg/dL',
        dorEscala: '0/10',
      },
      pacienteRelata: 'Frases entrecortadas por intensa falta de ar: "Sufoco... chiado no peito... bombinha não fez efeito".',
      sintomasAtuais: 'Tiragem intercostal evidente, fala entrecortada, batimento de asa de nariz.',
      negativasRelevantes: 'Nega febre prévia, dor torácica anginosa ou expectoração purulenta.',
      queixaPrincipal: 'Falta de ar sufocante e chiado no peito há 2 horas',
      hda:
        'Paciente com histórico de asma crônica grave com má adesão a corticoide inalatório domiciliar. Trazido pelo SAMU com queixa de crise aguda de broncoespasmo há cerca de 2 horas após limpeza de galpão fechado com exposição a poeira e mofo. Fez uso de 6 jatos de salbutamol em domicílio sem alívio. Na admissão, apresenta-se com fala monossilábica entrecortada, esforço ventilatório acentuado e taquipneia severa.',
      hpp:
        'Asma brônquica desde a infância, com 2 internações prévias em UTI há 4 anos. Nega HAS, DM ou coronariopatia. Alergia grave a ácido acetilsalicílico (AAS) e anti-inflamatórios não esteroidais (crise de broncoespasmo induzida por AAS).',
      historiaFamiliar: 'Mãe asmática, irmã com rinite alérgica.',
      historiaFisiologica: 'Sem alterações.',
      historiaSocial: 'Tabagista ativo (15 cigarros/dia há 25 anos = 18.7 anos-maço). Etilismo social.',
      revisaoSistemas: {
        constitucional: 'Diaforese profusa na admissão.',
        cabecaPescoco: 'Sem alterações na orofaringe, sem estridor laríngeo.',
        respiratorio: 'Dispneia intensa, sibilos expiratórios e inspiratórios difusos bilaterais com tempo expiratório prolongado.',
        cardiovascular: 'Taquicardia sinusal, sem sopros audíveis.',
        gastrointestinal: 'Abdome com participação na respiração, sem dor.',
        geniturinario: 'Sem queixas.',
        osteoarticular: 'Sem queixas.',
        neurologico: 'Ansioso, agitado, orientado no tempo e espaço.',
      },
      exameFisico: {
        estadoGeral: 'REG a MEG, sudoreico, taquipneico grave, acianótico, afebril, falando frases entrecortadas.',
        ectoscopia: 'Tiragem intercostal e de fúrcula esternal moderada a grave. TEC < 2s.',
        cabecaPescoco: 'Batimento de asa de nariz presente. Sem turgência jugular.',
        acv: 'Taquicárdico (FC 122 bpm), RCR 2T BNF, sem sopros audíveis.',
        aResp: 'FR 32 irpm. Expansibilidade torácica diminuída difusamente. Murmúrio vesicular diminuído com sibilos universais e tempo expiratório acentuadamente prolongado.',
        abdome: 'Flácido, respiração com discreto padrão paradoxal.',
        extremidades: 'Sem edemas, pulsos periféricos amplos e taquicárdicos.',
        neurologicoPele: 'Ansioso, confuso/sonolência incipiente (alerta para fadiga respiratória por retenção de CO2).',
      },
      sinteseClinica:
        'Crise asmática aguda com critérios de gravidade (fala entrecortada, taquipneia > 30, taquicardia > 120, satO2 limítrofe mesmo com O2 suplementar e gasometria com pseudonormalização de pCO2 indicando fadiga muscular iminente).',
      hipotesePrincipal: {
        codigoCid: 'J45.9',
        nomeCid: 'Asma Grave Agudizada com Falência Respiratória Iminente',
        justificativa:
          'Histórico de asma com exposição a alérgeno, broncoespasmo universal refratário a beta-2 agonista inalatório domiciliar e sinais de exaustão muscular ventilatória.',
      },
      diferenciais: [
        { codigoCid: 'I26.9', nomeCid: 'Tromboembolismo Pulmonar', justificativa: 'Sibilância difusa e ausência de dor pleurítica tornam improvável.' },
        { codigoCid: 'J18.9', nomeCid: 'Pneumonia Bacteriana com Broncoespasmo Reativo', justificativa: 'Afebril, sem consolidação focal na ausculta inicial.' },
      ],
      condutaDiagnostica:
        '1. Gasometria arterial seriada\n2. Radiografia de tórax no leito para descartar pneumotórax hipertensivo\n3. Pico de fluxo expiratório (Peak Flow) se tolerado após estabilização inicial.',
      condutaTerapeutica:
        '1. O2 suplementar para manter SatO2 entre 93% e 95%\n2. Beta-2 agonista de curta duração (Salbutamol 10 a 20 gotas ou 4-8 puffs) associado a Brometo de Ipratrópio contínuo na primeira hora\n3. Metilprednisolona 60 a 125 mg EV\n4. Sulfato de Magnésio 2g EV em 20 minutos\n5. Preparar material de via aérea avançada (intubação com sequência rápida) se houver rebaixamento ou piora da gasometria.',
      cuidadosGerais: 'Manter vigilância leito-a-leito na sala vermelha com monitorização contínua multiparamétrica.',
      planoAltaSeguimento: 'Sem previsão de alta no momento. Encaminhamento para leito de UTI se mantiver fadiga após sulfato de magnésio.',
      examesComplementares: [
        { id: '1', exame: 'Gasometria Arterial Seriada', finalidade: 'Monitorar risco de hipercapnia e fadiga muscular da musculatura respiratória' },
        { id: '2', exame: 'Radiografia de Tórax no Leito', finalidade: 'Descartar barotrauma, pneumotórax ou consolidação infecciosa subjacente' },
      ],
    },
  },
];

/**
 * Utilitários para formatação e inserção assistida
 */

// Helper: Gera o texto estruturado da HDA baseado nos 8 atributos do Roteiro Adulto
export function generate8AttributesHdaTemplate(
  sintoma: string,
  duracao: string,
  intensidade: string,
  localizacao: string,
): string {
  const sintomaLimpo = sintoma || 'dor';
  return `1. Início: Quadro com instalação [súbita / gradual / insidiosa], iniciado há cerca de ${duracao || '[tempo de evolução]'}, durante [repouso / esforço físico / atividade habitual].
2. Localização & Irradiação: Localizado em ${localizacao || '[região anatômica]'}, com irradiação para [nenhuma / descrever irradiamento].
3. Caráter / Qualidade: Descrito como [aperto / queimação / pontada ventilatório-dependente / cólica / pulsátil / peso].
4. Intensidade: Avaliada na Escala Visual Analógica em ${intensidade || '[0 a 10]'}/10, [com interferência nas atividades / incapacitante].
5. Duração & Periodicidade: Caráter [contínuo / em crises paroxísticas], com duração de [minutos / horas] a cada episódio.
6. Fatores de Melhora e Piora: Melhora com [repouso / uso de medicação / mudança de posição]; piora com [esforço físico / respiração profunda / alimentação / estresse].
7. Sintomas Associados: Refere concomitantemente [descrever sintomas concomitantes como sudorese, náuseas, dispneia, febre].
8. Evolução & Tratamentos Prévios: Refere que o quadro [piorou progressivamente / manteve-se estável], tendo feito uso de [nenhuma medicação / especificar medicação e resposta].`;
}

// Helper: Gera o texto estruturado do Modelo FIFE (Roteiro Pedagógico)
export function generateFifeHdaTemplate(): string {
  return `[MÉTODO CLÍNICO CENTRADO NA PESSOA - MODELO FIFE]
• Feelings (Sentimentos / Medos): O paciente relata como sentimentos e preocupações principais [ex: medo de infarto, angústia com a dor, receio de internação].
• Ideas (Ideias do Paciente): O paciente supõe que a causa seja [ex: estresse do trabalho, algo que comeu, problema de circulação herdado da família].
• Function (Função / Impacto): O sintoma tem interferido no cotidiano através de [ex: faltas ao trabalho, impossibilidade de cuidar dos filhos, privação do sono].
• Expectations (Expectativas): O paciente espera desta avaliação médica [ex: alívio seguro dos sintomas, esclarecimento diagnóstico objetivo e evitar exames invasivos].`;
}

// Helper: Calcula Anos-Maço (Carga Tabágica)
export function calculatePackYears(cigarrosDia: number | string, anos: number | string): number {
  const c = typeof cigarrosDia === 'string' ? parseFloat(cigarrosDia) : cigarrosDia;
  const a = typeof anos === 'string' ? parseFloat(anos) : anos;
  if (isNaN(c) || isNaN(a) || c <= 0 || a <= 0) return 0;
  return Math.round(((c / 20) * a) * 10) / 10;
}
