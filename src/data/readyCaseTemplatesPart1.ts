/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClinicalData } from '../types/clinical';

export interface ReadyCaseTemplate {
  id: string;
  categoria: 'Feminina' | 'Masculina' | 'Mista';
  especialidade: string;
  titulo: string;
  subtitulo: string;
  data: ClinicalData;
}

export const TOP_20_READY_CASES_PART1: ReadyCaseTemplate[] = [
  // 1. Colecistite Aguda Litiásica (Feminina)
  {
    id: 'colecistite-aguda-fem',
    categoria: 'Feminina',
    especialidade: 'Cirurgia Geral',
    titulo: 'Colecistite Aguda Litiásica (Murphy +)',
    subtitulo: 'Mulher 42 anos, dor pós-prandial em hipocôndrio direito e febre.',
    data: {
      tipo: 'anamnese',
      perfil: 'cirurgia',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'M.S.R.',
        idade: '42',
        idadeUnidade: 'anos',
        sexo: 'F',
        leito: 'Leito 04 - Cirurgia',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '10:00',
        responsavel: 'Equipe de Cirurgia Geral',
        crm: '102938-SP',
        naturalidade: 'Ribeirão Preto - SP',
        ocupacao: 'Professora',
        acompanhante: 'Esposo',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Colecistite Aguda Litiásica',
        intercorrencias: 'Pico febril de 38.3°C na admissão com vômitos alimentares.',
        comorbidadesAlergias: 'Dislipidemia e obesidade grau I. Nega alergias medicamentosas.',
        tratamentosFimDefinido: 'D1 Ceftriaxona 1g EV 1x/dia + Metronidazol 500mg EV 8/8h.',
        acessosDispositivos: 'AVP MSE 18G.',
        examesPorData: [
          { id: '1', data: 'Hoje', resultado: 'USG Abdome: vesícula distendida com cálculos, parede espessada (5mm) e Murphy sonográfico positivo.' },
          { id: '2', data: 'Hoje', resultado: 'Leucograma: 14.800/mm³ com 6% de bastões; PCR: 68 mg/L.' }
        ],
      },
      sinaisVitais: {
        pa: '130x85',
        fc: '94',
        fr: '18',
        tax: '38.1',
        satO2: '98',
        o2Suporte: 'AA',
        diurese: 'clara',
        evacuacoes: 'presentes',
        balanco: 'neutro',
        dorEscala: '8/10',
      },
      pacienteRelata: 'Dor intensa contínua em hipocôndrio direito iniciada após refeição copiosa, irradiada para escápula direita, com náuseas e calafrios.',
      sintomasAtuais: 'Dor à palpação profunda em HCD, plenitude gástrica e náuseas.',
      negativasRelevantes: 'Nega icterícia, colúria, acolia fecal ou sangramento digestivo.',
      queixaPrincipal: 'Dor forte na barriga do lado direito e febre há 1 dia',
      hda: 'Paciente feminina, 42 anos, refere início de dor em cólica em hipocôndrio direito há 24 horas após ingestão de alimentos gordurosos, que evoluiu para dor contínua de forte intensidade (EVA 8/10), irradiada para dorso e escápula direita. Apresentou três episódios de vômitos e febre aferida em 38.3°C com calafrios.',
      hpp: 'Episódios prévios autolimitados de cólica biliar nos últimos 6 meses. G3P3A0. Nega cirurgias abdominais.',
      historiaFamiliar: 'Mãe submetida a colecistectomia aos 48 anos.',
      historiaFisiologica: 'Ciclos menstruais regulares, última menstruação há 14 dias.',
      historiaSocial: 'Nega etilismo e tabagismo. Dieta rica em carboidratos refinados e lipídios.',
      revisaoSistemas: {
        constitucional: 'Febre com calafrios, astenia.',
        cardiovascular: 'Nega precordialgia ou palpitações.',
        respiratorio: 'Dor ao respirar fundo devido ao impacto subdiafragmático.',
        gastrointestinal: 'Náuseas, vômitos alimentares, dor em HCD.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Lúcida e orientada.',
      },
      exameFisico: {
        estadoGeral: 'REG, lúcida, corada, hidratada, anictérica, acianótica, febril.',
        ectoscopia: 'Mucosas coradas, anictérica (escleras brancas), sem edemas.',
        cabecaPescoco: 'Sem estase jugular, tireoide tópica.',
        acv: 'RCR, 2T, BNF, taquicárdica (FC 94), sem sopros.',
        aResp: 'MVUA, sem RA, eupneica.',
        abdome: 'Plano, ruídos hidroaéreos diminuídos, dor intensa à palpação de hipocôndrio direito com interrupção súbita da inspiração profunda (Sinal de Murphy positivo). Descompressão brusca negativa em outros quadrantes.',
        extremidades: 'Pulsos cheios e simétricos, sem edema.',
        neurologicoPele: 'Glasgow 15, sem déficits focais.',
      },
      sinteseClinica: 'Quadro clássico de Colecistite Aguda Litiásica (TG18 grau I/leve) com Murphy clínico e ecográfico positivo, leucocitose e febre.',
      hipotesePrincipal: {
        codigoCid: 'K81.0',
        nomeCid: 'Colecistite Aguda Litiásica',
        justificativa: 'Dor em HCD contínua com febre, leucocitose com desvio e espessamento parietal vesicular com cálculos na ultrassonografia.',
      },
      diferenciais: [
        { codigoCid: 'K85.9', nomeCid: 'Pancreatite Aguda Biliar', justificativa: 'Amilase e lipase séricas normais, dor não em faixa.' },
        { codigoCid: 'K25.9', nomeCid: 'Úlcera Péptica Perfurada', justificativa: 'Sem abdome em tábua ou pneumoperitônio.' }
      ],
      condutaDiagnostica: 'Hemograma de controle pré-operatório, coagulograma, bilirrubinas totais e frações, transaminases, amilase e lipase séricas.',
      condutaTerapeutica: 'Jejum oral absoluto; Hidratação venosa vigorosa com Ringer Lactato 30-35 mL/kg/dia; Ceftriaxona 1g EV 1x/dia + Metronidazol 500mg EV 8/8h; Dipirona 1g EV 6/6h se dor; Cetoprofeno 100mg EV 12/12h; Indicação de Colecistectomia Videolaparoscópica precoce nas primeiras 24-72h.',
      cuidadosGerais: 'Manter em decúbito elevado a 30°; controle rigoroso da curva térmica e escala de dor a cada 4 horas.',
      planoAltaSeguimento: 'Programar alta hospitalar após 24-48h de pós-operatório estável com aceitação de dieta e ferida limpa.',
      examesComplementares: [
        { id: '1', exame: 'Ultrassonografia de Abdome Superior', finalidade: 'Avaliar via biliar principal e descartar coledocolitíase' },
        { id: '2', exame: 'Bilirrubinas Totais e Frações', finalidade: 'Descartar colangite ou obstrução biliar concomitante' }
      ],
    }
  },

  // 2. Pré-Eclâmpsia Grave com Sinais de Iminência (Feminina / Obstétrica)
  {
    id: 'preeclampsia-grave-fem',
    categoria: 'Feminina',
    especialidade: 'Obstetrícia / Terapia Intensiva',
    titulo: 'Pré-Eclâmpsia com Sinais de Gravidade',
    subtitulo: 'Primigesta 34 semanas com PA 170x110, cefaleia refratária e escotomas.',
    data: {
      tipo: 'anamnese',
      perfil: 'enfermaria-uti',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'A.P.L.',
        idade: '28',
        idadeUnidade: 'anos',
        sexo: 'F',
        leito: 'Leito 02 - UCI Obstétrica',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '14:30',
        responsavel: 'Plantão Obstetrícia / Cuidados Críticos',
        crm: '147258-SP',
        naturalidade: 'São Paulo - SP',
        ocupacao: 'Analista Financeira',
        acompanhante: 'Mãe',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Pré-Eclâmpsia Grave (PA 170x110 mmHg + Cefaleia)',
        intercorrencias: 'Pico pressórico com escotomas cintilantes e dor epigástrica súbita.',
        comorbidadesAlergias: 'Nulípara, sem comorbidades prévias. Nega alergias.',
        tratamentosFimDefinido: 'D1 Sulfato de Magnésio (esquema de Zuspan: ataque 4g EV + manutenção 1g/h em BIC).',
        acessosDispositivos: 'AVP calibroso 16G MSE; Sonda Vesical de Demora para diurese horária.',
        examesPorData: [
          { id: '1', data: 'Hoje', resultado: 'Relação Proteína/Creatinina urinária: 0.85; Plaquetas: 135.000/mm³; TGO: 72 U/L; DHL: 480 U/L.' }
        ],
      },
      sinaisVitais: {
        pa: '172x112',
        fc: '86',
        fr: '16',
        tax: '36.6',
        satO2: '99',
        o2Suporte: 'AA',
        diurese: '55 ml/h, límpida em SVD',
        evacuacoes: 'presentes',
        balanco: 'controlado',
        dorEscala: '7/10',
      },
      pacienteRelata: 'Cefaleia frontal pulsátil intensa, turvação visual com pontos brilhantes (escotomas) e dor em queimação no estômago.',
      sintomasAtuais: 'Cefaleia, náuseas, dor epigástrica.',
      negativasRelevantes: 'Nega convulsões prévias, perda de líquido amniótico ou sangramento vaginal ativo.',
      queixaPrincipal: 'Pressão alta, dor de cabeça forte e vista embaçada há 3 horas',
      hda: 'Gestante na 34ª semana (DUM confirmada por USG de 1º trimestre), primípara, relata aferição de PA 170x110 mmHg em consulta ambulatorial, acompanhada de cefaleia holocraniana refratária a analgésicos comuns, turvação visual com escotomas e dor epigástrica em barra.',
      hpp: 'Sem antecedentes de hipertensão arterial crônica ou diabetes pré-gestacional. Pré-natal com 6 consultas.',
      historiaFamiliar: 'Mãe com história de pré-eclâmpsia na primeira gestação.',
      historiaFisiologica: 'G1P0A0. Movimentação fetal ativa referida pela mãe.',
      historiaSocial: 'Nega tabagismo, etilismo ou uso de drogas ilícitas.',
      revisaoSistemas: {
        constitucional: 'Sem febre.',
        cardiovascular: 'Hipertensão severa.',
        respiratorio: 'Eupneica, sem desconforto.',
        gastrointestinal: 'Epigastralgia em barra (Sinal de Chaussier).',
        geniturinario: 'Edema acentuado de vulva e membros inferiores.',
        neurologico: 'Hiperreflexia patelar (+3/+4).',
      },
      exameFisico: {
        estadoGeral: 'REG, vigil, orientada, corada, acianótica, afebril, fácies de sofrimento.',
        ectoscopia: 'Edema facial e de mãos evidente. Edema de MMII +++/4+ com cacifo.',
        cabecaPescoco: 'Pupilas fotorreagentes, sem estase jugular.',
        acv: 'RCR, 2T, BNF com hiperfonese de B2 em foco aórtico, sem sopros.',
        aResp: 'MVUA bilateral sem ruídos adventícios.',
        abdome: 'Útero gravídico com Altura Uterina de 32 cm. BCF de 142 bpm, rítmico. Tônus uterino normal. Dor à palpação do epigástrio.',
        extremidades: 'Pulsos simétricos. Reflexos patelares patelofemorais vivos com clônus esgotável.',
        neurologicoPele: 'Sem déficits motores focais. Reflexo patelar hiperativo.',
      },
      sinteseClinica: 'Pré-eclâmpsia com critérios de gravidade (níveis pressóricos ≥ 160x110 mmHg + sinais de iminência de eclâmpsia: escotomas, cefaleia e epigastralgia).',
      hipotesePrincipal: {
        codigoCid: 'O14.1',
        nomeCid: 'Pré-Eclâmpsia Grave',
        justificativa: 'Gestante > 20 semanas com PA ≥ 160/110 mmHg associada a cefaleia refratária, alterações visuais e proteinúria significativa.',
      },
      diferenciais: [
        { codigoCid: 'O15.0', nomeCid: 'Eclâmpsia', justificativa: 'Ausência de crises convulsivas tônico-clônicas generalizadas até o momento.' },
        { codigoCid: 'O14.2', nomeCid: 'Síndrome HELLP', justificativa: 'Plaquetas ainda > 100.000/mm³ e transaminases discretamente elevadas; monitorar de perto.' }
      ],
      condutaDiagnostica: 'Coleta urgente de perfil HELLP: Hemograma, Plaquetas, TGO, TGP, DHL, Bilirrubinas, Creatinina, Ácido Úrico e Coagulograma; Cardiotocografia basal e USG Obstétrica com Doppler.',
      condutaTerapeutica: 'Neuroproteção materna e profilaxia de convulsões: Sulfato de Magnésio (Zuspan) 4g EV em 20 min (dose de ataque) seguido de infusão contínua de 1g/h em BIC; Controle anti-hipertensivo agudo: Hidralazina 5mg EV a cada 20 min (máx 20mg) para manter PAD entre 90-100 mmHg; Corticoterapia para maturação pulmonar fetal se indicação de parto (Betametasona 12mg IM 24/24h por 2 doses).',
      cuidadosGerais: 'Sonda vesical de demora fechada com controle de diurese horária (suspender MgSO4 se diurese < 25 ml/h); Vigilância rigorosa de reflexos patelares e frequência respiratória (> 16 irpm); Ambiente silencioso com baixa luminosidade.',
      planoAltaSeguimento: 'Avaliação obstétrica conjunta para definição do momento oportuno de interrupção da gestação.',
      examesComplementares: [
        { id: '1', exame: 'Cardiotocografia Contínua', finalidade: 'Avaliar vitalidade fetal em vigência de crise hipertensiva materna' },
        { id: '2', exame: 'Contagem de Plaquetas e Enzimas Hepáticas Seriadas a cada 6h', finalidade: 'Monitorar desenvolvimento de Síndrome HELLP' }
      ],
    }
  },

  // 3. Doença Inflamatória Pélvica Aguda - DIP (Feminina)
  {
    id: 'dip-aguda-fem',
    categoria: 'Feminina',
    especialidade: 'Ginecologia / Infectologia',
    titulo: 'Doença Inflamatória Pélvica (DIP) Estágio II',
    subtitulo: 'Mulher 25 anos com dor pélvica intensa, mobilização do colo uterino dolorosa e corrimento fétido.',
    data: {
      tipo: 'anamnese',
      perfil: 'clinica-geral',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'C.F.N.',
        idade: '25',
        idadeUnidade: 'anos',
        sexo: 'F',
        leito: 'Leito 08 - Enfermaria',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '11:15',
        responsavel: 'Equipe de Clínica Médica / Ginecologia',
        crm: '135790-SP',
        naturalidade: 'Campinas - SP',
        ocupacao: 'Recepcionista',
        acompanhante: 'Irmã',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'DIP Aguda com Febre e Dor Pélvica Refratária',
        intercorrencias: 'Febre de 38.6°C e dor intensa aos movimentos.',
        comorbidadesAlergias: 'Nega comorbidades crônicas. Alergia a sulfa.',
        tratamentosFimDefinido: 'D1 Ceftriaxona 1g EV 1x/dia + Doxiciclina 100mg VO 12/12h + Metronidazol 400mg EV 12/12h.',
        acessosDispositivos: 'AVP MSD 20G.',
        examesPorData: [
          { id: '1', data: 'Hoje', resultado: 'Beta-HCG qualitativo: Negativo.' },
          { id: '2', data: 'Hoje', resultado: 'USG Transvaginal: espessamento tubário bilateral com conteúdo hipoecogênico e líquido livre na pelve.' }
        ],
      },
      sinaisVitais: {
        pa: '115x75',
        fc: '98',
        fr: '18',
        tax: '38.5',
        satO2: '98',
        o2Suporte: 'AA',
        diurese: 'clara',
        evacuacoes: 'presentes',
        balanco: 'neutro',
        dorEscala: '8/10',
      },
      pacienteRelata: 'Dor no baixo ventre iniciada há 5 dias com piora progressiva, acompanhada de corrimento vaginal amarelado com odor desagradável e febre há 2 dias.',
      sintomasAtuais: 'Dor pélvica bilateral, dispareunia e corrimento vaginal purulento.',
      negativasRelevantes: 'Nega sangramento uterino anormal, náuseas incoercíveis ou queixas urinárias altas.',
      queixaPrincipal: 'Dor forte na parte baixa da barriga e corrimento com febre há 3 dias',
      hda: 'Paciente jovem relata dor pélvica contínua de intensidade progressiva (EVA 8/10), com piora após término do último ciclo menstrual. Nega uso consistente de método de barreira. Evoluiu com febre diária e secreção purulenta endocervical.',
      hpp: 'Histórico de tratamento prévio de cervicite por Chlamydia há 2 anos. Uso de anticoncepcional oral combinado.',
      historiaFamiliar: 'Sem histórico familiar relevante.',
      historiaFisiologica: 'G0P0A0. DUM há 8 dias.',
      historiaSocial: 'Tabagismo social. Nega etilismo.',
      revisaoSistemas: {
        constitucional: 'Febre alta, calafrios e indisposição geral.',
        cardiovascular: 'Taquicardia sinusal compatível com estado febril.',
        respiratorio: 'Sem queixas.',
        gastrointestinal: 'Dor à descompressão pélvica, sem vômitos.',
        geniturinario: 'Disúria terminal discreta.',
        neurologico: 'Orientada.',
      },
      exameFisico: {
        estadoGeral: 'REG, corada, hidratada, anictérica, febril.',
        ectoscopia: 'Sem lesões cutâneas ativas.',
        cabecaPescoco: 'Sem alterações.',
        acv: 'RCR, 2T, BNF, FC 98 bpm, sem sopros.',
        aResp: 'MVUA, sem RA.',
        abdome: 'Dor intensa à palpação profunda em hipogástrio e ambas as fossas ilíacas. Descompressão brusca moderadamente dolorosa no baixo ventre.',
        extremidades: 'Sem edemas, pulsos amplos.',
        neurologicoPele: 'Toque Vaginal / Especular: Presença de secreção mucopurulenta no colo uterino; dor lancinante à mobilização do colo uterino (Sinal de Proust positivo) e anexos espessados dolorosos.',
      },
      sinteseClinica: 'Doença Inflamatória Pélvica Aguda com critérios maiores (dor anexial, uterina e à mobilização do colo) e menores (febre, corrimento purulento e PCR elevada). Indicação de tratamento parenteral hospitalar.',
      hipotesePrincipal: {
        codigoCid: 'N73.9',
        nomeCid: 'Doença Inflamatória Pélvica Aguda (DIP)',
        justificativa: 'Tríade clássica de dor à palpação uterina, anexial e à mobilização do colo uterino em mulher jovem febril com corrimento purulento.',
      },
      diferenciais: [
        { codigoCid: 'K35.8', nomeCid: 'Apendicite Aguda', justificativa: 'Dor pélvica é estritamente bilateral e acompanhada de secreção cervical purulenta.' },
        { codigoCid: 'O00.1', nomeCid: 'Gravidez Ectópica', justificativa: 'Descartada por Beta-HCG sérico negativo.' }
      ],
      condutaDiagnostica: 'Coleta de PCR, VHS, Hemograma completo, Urocultura, Sorologias (HIV, Sífilis, Hepatites B e C) e PCR para N. gonorrhoeae e C. trachomatis.',
      condutaTerapeutica: 'Internação hospitalar e início imediato de esquema parenteral: Ceftriaxona 1g EV 1x/dia + Doxiciclina 100mg VO 12/12h + Metronidazol 400mg EV 12/12h por pelo menos 48h após melhora clínica; Analgesia escalonada com Dipirona 1g EV 6/6h e Tramadol 50mg EV se dor refratária.',
      cuidadosGerais: 'Repouso no leito em posição de Fowler (facilita drenagem das secreções pélvicas); Abstinência sexual até resolução clínica; Rastreio e tratamento obrigatório dos parceiros sexuais.',
      planoAltaSeguimento: 'Transição para via oral após 48h afebril e melhora da dor abdominal, completando 14 dias totais de antimicrobianos.',
      examesComplementares: [
        { id: '1', exame: 'Ultrassonografia Pélvica / Transvaginal', finalidade: 'Descartar abscesso tubo-ovariano que exija drenagem percutânea ou cirúrgica' },
        { id: '2', exame: 'PCR e VHS Seriados', finalidade: 'Avaliar resposta terapêutica à antibioticoterapia venosa' }
      ],
    }
  },

  // 4. Tromboembolismo Pulmonar - TEP pós-anticoncepcional (Feminina)
  {
    id: 'tep-anticoncepcional-fem',
    categoria: 'Feminina',
    especialidade: 'Pneumologia / Terapia Intensiva',
    titulo: 'Tromboembolismo Pulmonar Agudo (TEP)',
    subtitulo: 'Mulher 31 anos em uso de ACO combinado com dispneia súbita e dor pleurítica.',
    data: {
      tipo: 'anamnese',
      perfil: 'pneumologia',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'R.M.T.',
        idade: '31',
        idadeUnidade: 'anos',
        sexo: 'F',
        leito: 'Leito 03 - UTI',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '16:00',
        responsavel: 'Equipe de Terapia Intensiva / Pneumologia',
        crm: '159753-SP',
        naturalidade: 'Santos - SP',
        ocupacao: 'Advogada',
        acompanhante: 'Noivo',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'TEP Agudo de Risco Intermediário-Alto',
        intercorrencias: 'Taquicardia sinusal persistente com dessaturação até 90% em ar ambiente.',
        comorbidadesAlergias: 'Uso contínuo de etinilestradiol + drospirenona há 4 anos. Nega alergias.',
        tratamentosFimDefinido: 'D1 Enoxaparina 1 mg/kg SC 12/12h (iniciada dose plena 70mg SC).',
        acessosDispositivos: 'AVP calibroso MSD; O2 suplementar sob cânula nasal 2 L/min.',
        examesPorData: [
          { id: '1', data: 'Hoje', resultado: 'Angio-TC de Tórax: falha de enchimento em ramo lobar inferior direito e artéria pulmonar principal direita.' },
          { id: '2', data: 'Hoje', resultado: 'Troponina ultrassensível: 42 pg/mL (elevada); D-Dímero: 3.450 ng/mL; BNP: 210 pg/mL.' }
        ],
      },
      sinaisVitais: {
        pa: '118x76',
        fc: '112',
        fr: '24',
        tax: '36.8',
        satO2: '95',
        o2Suporte: 'Cateter O2 2 L/min',
        diurese: 'preservada',
        evacuacoes: 'presentes',
        balanco: 'neutro',
        dorEscala: '7/10',
      },
      pacienteRelata: 'Falta de ar súbita iniciada enquanto trabalhava, com dor em pontada no hemitórax direito que piora ao respirar fundo e tosse seca.',
      sintomasAtuais: 'Dispneia moderada aos mínimos esforços, dor pleurítica e taquicardia.',
      negativasRelevantes: 'Nega síncope, hemoptise, febre ou cirurgias recentes.',
      queixaPrincipal: 'Falta de ar que começou de repente e dor forte no peito ao respirar há 4 horas',
      hda: 'Paciente jovem, sem comorbidades clínicas conhecidas, em uso regular de anticoncepcional oral hormonal. Relata viagem aérea internacional prolongada (11 horas) há 10 dias. Iniciou subitamente quadro de dor torácica pleurítica à direita com taquipneia e sensação de asfixia.',
      hpp: 'Nega trombose venosa profunda prévia ou abortamentos de repetição.',
      historiaFamiliar: 'Tia materna com histórico de TVP aos 40 anos.',
      historiaFisiologica: 'Uso de ACO oral combinado há 4 anos ininterruptos.',
      historiaSocial: 'Nega tabagismo. Atividade física regular interrompida na última semana.',
      revisaoSistemas: {
        constitucional: 'Afebril, ansiosa e sudoreica.',
        cardiovascular: 'Taquicardia persistente, sem hipotensão.',
        respiratorio: 'Taquipneia com dor em pontada.',
        gastrointestinal: 'Sem alterações.',
        geniturinario: 'Sem alterações.',
        neurologico: 'Lúcida e orientada.',
      },
      exameFisico: {
        estadoGeral: 'REG, lúcida, taquipneica, pálida, acianótica, afebril.',
        ectoscopia: 'Sem edema visível ou cianose periférica.',
        cabecaPescoco: 'Turgência jugular a 45° discreta presente.',
        acv: 'RCR, 2T, taquicárdico (FC 112 bpm), hiperfonese de P2 em foco pulmonar, sem sopros.',
        aResp: 'MVUA bilateral, sem ruídos adventícios, discreta diminuição do murmúrio em base direita pela dor ventilatória.',
        abdome: 'Livre, indolor à palpação, RHA+.',
        extremidades: 'Panturrilha esquerda com empastamento leve e discreta assimetria de diâmetro (+1,5 cm em relação à direita), sinal de Homans positivo à esquerda.',
        neurologicoPele: 'Glasgow 15, sem déficits.',
      },
      sinteseClinica: 'Tromboembolismo pulmonar agudo confirmado por angiotomografia, estratificado como risco intermediário-alto (Escore de Wells alto + biomarcadores positivos: troponina e BNP elevados, com estabilidade hemodinâmica sistêmica).',
      hipotesePrincipal: {
        codigoCid: 'I26.9',
        nomeCid: 'Tromboembolismo Pulmonar (TEP)',
        justificativa: 'Dispneia súbita e dor pleurítica com falha de enchimento vascular pulmonar em angio-TC e TVP associada em usuária de ACO pós-viagem prolongada.',
      },
      diferenciais: [
        { codigoCid: 'I21.9', nomeCid: 'Síndrome Coronariana Aguda', justificativa: 'ECG com padrão S1Q3T3 e sobrecarga de VD sem supra de ST.' },
        { codigoCid: 'J93.9', nomeCid: 'Pneumotórax Espontâneo', justificativa: 'Descartado por imagem tomográfica com parênquima expandido.' }
      ],
      condutaDiagnostica: 'Ecocardiograma Transtorácico à beira do leito para avaliar função do ventrículo direito (relação VD/VE e TAPSE); Doppler venoso de membros inferiores; Painel de trombofilias após fase aguda.',
      condutaTerapeutica: 'Anticoagulação plena imediata com Enoxaparina 1 mg/kg SC de 12/12h; Oxigenoterapia para alvo de SatO2 entre 94-96%; Analgesia com Dipirona 1g EV; Suspender imediatamente anticoncepcional hormonal de forma definitiva; Manter leito de UTI com monitorização contínua e kit trombolítico de resgate (Alteplase) disponível se hipotensão ou choque obstrutivo.',
      cuidadosGerais: 'Repouso absoluto no leito nas primeiras 24 horas; monitorização multiparamétrica de saturação, ECG e pressão arterial; meias elásticas após estabilização.',
      planoAltaSeguimento: 'Transição futura para anticoagulante oral direto (DOAC - Rivaroxabana ou Apixabana) mantido por pelo menos 3 a 6 meses; orientação expressa de contraindicação absoluta ao uso futuro de estrogênios.',
      examesComplementares: [
        { id: '1', exame: 'Ecocardiograma Transtorácico', finalidade: 'Avaliar disfunção sistólica do ventrículo direito e pressão sistólica da artéria pulmonar' },
        { id: '2', exame: 'Ultrassonografia Doppler Venosa de MMII', finalidade: 'Confirmar e mapear trombose venosa profunda em membro inferior esquerdo' }
      ],
    }
  },

  // 5. Hemorragia Digestiva Alta por Úlcera Gástrica (Masculina)
  {
    id: 'hda-ulcera-masc',
    categoria: 'Masculina',
    especialidade: 'Gastroenterologia / Urgência',
    titulo: 'Hemorragia Digestiva Alta (Melena / Hematêmese)',
    subtitulo: 'Homem 56 anos etilista/tabagista com melena volumosa, hipotensão e Hb 7.2.',
    data: {
      tipo: 'anamnese',
      perfil: 'enfermaria-uti',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'J.R.B.',
        idade: '56',
        idadeUnidade: 'anos',
        sexo: 'M',
        leito: 'Leito 01 - Semi-Intensiva',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '07:45',
        responsavel: 'Equipe de Gastroenterologia e Terapia Intensiva',
        crm: '112233-SP',
        naturalidade: 'Sorocaba - SP',
        ocupacao: 'Caminhoneiro',
        acompanhante: 'Esposa',
        confiabilidade: 'moderada',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'HDA Volumosa com Instabilidade Hemodinâmica',
        intercorrencias: 'Episódio de síncope ao evacuar fezes enegrecidas e fétidas (melena).',
        comorbidadesAlergias: 'Uso crônico de AINEs (Diclofenaco) para dor lombar. Tabagista e etilista.',
        tratamentosFimDefinido: 'D1 Omeprazol EV em bolus 80mg seguido de infusão contínua 8mg/h.',
        acessosDispositivos: 'Dois acessos venosos periféricos calibrosos 16G em MSE e MSD.',
        examesPorData: [
          { id: '1', data: 'Hoje', resultado: 'Hemograma: Hb 7.2 g/dL; Ht 22%; Plaquetas 240.000/mm³; Coagulograma: RNI 1.1.' },
          { id: '2', data: 'Hoje', resultado: 'Ureia: 86 mg/dL; Creatinina: 1.1 mg/dL (relação Ureia/Creatinina elevada sugestiva de sangramento digestivo alto).' }
        ],
      },
      sinaisVitais: {
        pa: '92x58',
        fc: '118',
        fr: '20',
        tax: '36.3',
        satO2: '96',
        o2Suporte: 'AA',
        diurese: 'clara',
        evacuacoes: 'melena volumosa recente',
        balanco: 'positivo',
        dorEscala: '4/10',
      },
      pacienteRelata: 'Evacuação de fezes pretas como piche, com odor fétido e sensação de desmaio ao levantar-se da cama, acompanhada de queimação no estômago.',
      sintomasAtuais: 'Fraqueza intensa, tontura postural, epigastralgia em queimação e sudorese fria.',
      negativasRelevantes: 'Nega vômito com sangue vivo recente (hematêmese), nega febre.',
      queixaPrincipal: 'Fezes pretas como graxa e desmaio há 6 horas',
      hda: 'Paciente masculino, 56 anos, relata dor em queimação no epigástrio que piora com estômago vazio há 3 semanas, com alívio temporário após alimentação. Fez uso de diclofenaco e piroxicam diariamente para lombalgia. Apresentou hoje três episódios de melena volumosa e episódio sincopal no banheiro.',
      hpp: 'Dispepsia crônica sem investigação prévia. Nega cirurgias prévias.',
      historiaFamiliar: 'Pai falecido por câncer gástrico aos 68 anos.',
      historiaFisiologica: 'Hábito intestinal alterado hoje pela melena.',
      historiaSocial: 'Etilismo de destilados (cachaça) há 25 anos. Tabagismo de 30 maços-ano.',
      revisaoSistemas: {
        constitucional: 'Palidez cutânea acentuada, astenia e sudorese fria.',
        cardiovascular: 'Taquicardia sinusal compensatória à perda volêmica.',
        respiratorio: 'Eupneico.',
        gastrointestinal: 'Epigastralgia, melena confirmada ao toque retal.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Sonolento mas cooperativo e orientado.',
      },
      exameFisico: {
        estadoGeral: 'REG, lúcido, descorado +++/4+, desidratado ++/4+, anictérico, afebril.',
        ectoscopia: 'Mucosas intensamente descoradas, extremidades frias, TEC 3s.',
        cabecaPescoco: 'Pupilas isocóricas, carótidas com pulsos taquicárdicos.',
        acv: 'RCR, 2T, bulhas hipofonéticas, taquicárdico (FC 118), sem sopros patológicos.',
        aResp: 'MVUA bilateralmente, sem ruídos adventícios.',
        abdome: 'Plano, flácido, doloroso à palpação profunda do epigástrio, sem defesa ou descompressão dolorosa, sem estigmas de hepatopatia crônica (sem circulação colateral ou ascite).',
        extremidades: 'Pulsos finos, taquicárdicos, sem edemas.',
        neurologicoPele: 'Toque retal com fezes enegrecidas pastosas fétidas na luva de procedimento (melena franca).',
      },
      sinteseClinica: 'Hemorragia digestiva alta volumosa com repercussão hemodinâmica (taquicardia + hipotensão postural) secundária à provável úlcera péptica gástrica associada ao uso abusivo de AINEs.',
      hipotesePrincipal: {
        codigoCid: 'K25.0',
        nomeCid: 'Úlcera Gástrica com Hemorragia Aguda (HDA)',
        justificativa: 'Melena volumosa com repercussão hemodinâmica, queda de hematócrito e elevação de escórias nitrogenadas em paciente em uso de AINE.',
      },
      diferenciais: [
        { codigoCid: 'I85.0', nomeCid: 'Hemorragia por Varizes Esofágicas', justificativa: 'Paciente etilista crônico, mas sem outros estigmas periféricos de hipertensão portal; EDA diferenciará.' },
        { codigoCid: 'K22.6', nomeCid: 'Síndrome de Mallory-Weiss', justificativa: 'Menos provável pela ausência de vômitos vigorosos prévios ao sangramento.' }
      ],
      condutaDiagnostica: 'Endoscopia Digestiva Alta (EDA) de urgência nas primeiras 12-24h após estabilização hemodinâmica inicial; Tipagem sanguínea com prova cruzada de 2 concentrados de hemácias; Coagulograma seriado.',
      condutaTerapeutica: 'Ressuscitação volêmica imediata com Cristaloides (SF 0,9% 1000 mL em 30 min); Transfusão de 1 a 2 concentrados de hemácias com alvo de Hb entre 7-9 g/dL; Omeprazol 80mg EV em bólus + 8mg/h em infusão contínua em BIC por 72h; Suspender em definitivo qualquer anti-inflamatório não esteroidal (AINE).',
      cuidadosGerais: 'Jejum absoluto; Oxigênio em cateter para manter SatO2 > 95%; Monitorização horária de diurese, FC e pressão arterial.',
      planoAltaSeguimento: 'Pesquisa e erradicação de Helicobacter pylori se identificado na EDA; Inibidor de bomba de prótons oral por 8 semanas; reavaliação endoscópica de controle.',
      examesComplementares: [
        { id: '1', exame: 'Endoscopia Digestiva Alta de Urgência', finalidade: 'Identificar local do sangramento, classificar escala de Forrest e realizar hemostasia endoscópica (clipagem/injeção de adrenalina)' },
        { id: '2', exame: 'Hemograma Seriado a cada 6h', finalidade: 'Monitorar estabilização do hematócrito e hemoglobina' }
      ],
    }
  }
];
