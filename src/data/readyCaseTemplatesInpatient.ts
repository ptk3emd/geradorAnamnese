/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReadyCaseTemplate } from './readyCaseTemplatesPart1';

export const INPATIENT_HOSPITAL_CASES: ReadyCaseTemplate[] = [
  // 1. Colecistite Aguda Litiásica (Internação Cirúrgica)
  {
    id: 'inpatient-colecistite-aguda',
    categoria: 'Feminina',
    especialidade: 'Cirurgia Geral',
    titulo: 'Colecistite Aguda Litiásica / Murphy Positivo',
    subtitulo: 'Mulher 46 anos com dor intensa contínua em hipocôndrio direito, Murphy positivo, febre e espessamento de parede da vesícula.',
    data: {
      tipo: 'anamnese',
      perfil: 'cirurgia',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'M.R.S.',
        idade: '46',
        idadeUnidade: 'anos',
        sexo: 'F',
        leito: 'Leito 12 - Cirurgia Geral',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '09:30',
        responsavel: '',
        naturalidade: 'São Paulo - SP',
        ocupacao: 'Comerciária',
        acompanhante: 'Filha',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Colecistite Aguda Litiásica (K81.0)',
        intercorrencias: 'Admitida no pronto-socorro cirúrgico com dor aguda em hipocôndrio direito e febre; sem intercorrências no leito.',
        comorbidadesAlergias: 'Colelitíase sintomática prévia, Sobrepeso (IMC 28). Nega alergias medicamentosas.',
        tratamentosFimDefinido: 'Ceftriaxona 1g EV 12/12h + Metronidazol 500mg EV 8/8h (D1).',
        acessosDispositivos: 'AVP em MSE pérvio e fluente. Em ar ambiente.',
        examesPorData: [
          { id: '1', data: new Date().toLocaleDateString('pt-BR'), resultado: 'USG Abdome: vesícula biliar distendida, cálculo de 16mm impactado no infundíbulo, parede espessada (5,2 mm), líquido pericolecístico; colédoco de calibre normal (4 mm). Leucócitos 14.800/mm³ com 6% de bastões.' }
        ]
      },
      queixaPrincipal: 'Dor forte embaixo da costela direita e febre há 1 dia',
      hda: 'Paciente refere dor em cólica de início súbito em hipocôndrio direito há 24 horas após almoço copioso (refeição gordurosa), que evoluiu para dor contínua de forte intensidade (8/10), irradiada para dorso e região infraescapular direita. Associada a múltiplos episódios de náuseas, vômitos biliosos e febre aferida em 38,3°C precedida por calafrios. Fez uso domiciliar de escopolamina e dipirona sem melhora clínica. Nega icterícia, colúria ou acolia fecal.',
      pacienteRelata: 'Refere dor contínua no lado direito da barriga que piora ao respirar fundo e ao se movimentar no leito.',
      negativasRelevantes: 'Nega icterícia, colúria, acolia fecal, queixas urinárias ou alterações do hábito intestinal.',
      hpp: 'Histórico de episódios esporádicos de cólica biliar nos últimos 6 meses. Nega HAS, DM ou cirurgias abdominais prévias.',
      historiaFamiliar: 'Mãe submetida a colecistectomia aos 50 anos por colelitíase.',
      historiaSocial: 'Nega tabagismo ou etilismo. Dieta rica em carboidratos e lipídios.',
      sintomasAtuais: 'Sintomas conforme descritos na história atual.',
      historiaFisiologica: 'Sem particularidades fisiológicas pregressas relevantes.',
      revisaoSistemas: {
        constitucional: 'Sem outras queixas constitucionais.',
        cardiovascular: 'Sem queixas cardiovasculares adicionais.',
        respiratorio: 'Sem queixas respiratórias adicionais.',
        gastrointestinal: 'Conforme descrito na HDA.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Vigil, orientado e comunicativo.'
      },
      sinaisVitais: {
        o2Suporte: 'AA',
        diurese: 'Preservada (> 0.5 mL/kg/h)',
        evacuacoes: 'Presentes',
        balanco: 'Neutro',
        pa: '125/80 mmHg',
        fc: '96 bpm',
        fr: '18 irpm',
        tax: '38.0 °C',
        satO2: '97% em ar ambiente',
        glicemia: '108 mg/dL',
        dorEscala: '7/10',
      },
      exameFisico: {
        estadoGeral: 'Regular estado geral, lúcida e orientada em tempo e espaço, fáscies de dor, anictérica, acianótica, afebril no momento.',
        ectoscopia: 'Mucosas coradas e hidratadas, perfusão capilar periférica < 2 segundos.',
        cabecaPescoco: 'Sem turgência jugular a 45°, sem linfonodomegalias cervicais.',
        acv: 'Ritmo cardíaco regular em 2 tempos, bulhas normofonéticas sem sopros audíveis.',
        aResp: 'Murmúrio vesicular universalmente audível e simétrico, sem ruídos adventícios.',
        abdome: 'Abdome plano, ruídos hidroaéreos presentes e diminuídos em quadrante superior direito; doloroso à palpação superficial e profunda em hipocôndrio direito com parada brusca da inspiração à palpação do ponto cístico (Sinal de Murphy positivo); ausência de descompressão brusca em fossa ilíaca direita (Blumberg negativo). Sem visceromegalias palpáveis.',
        extremidades: 'Extremidades aquecidas, sem edema em membros inferiores, pulsos pediosos e tibiais posteriores cheios e simétricos.',
        neurologicoPele: 'Sem déficits neurológicos focais, sem rigidez de nuca.',
      },
      hipotesePrincipal: {
        codigoCid: 'K81.0',
        nomeCid: 'Colecistite aguda',
        justificativa: 'Quadro clínico clássico de dor contínua em hipocôndrio direito com Sinal de Murphy positivo, febre, leucocitose com desvio e USG confirmando cálculo biliar impactado com espessamento parietal significativo (> 4 mm).'
      },
      diferenciais: [
        { codigoCid: 'K80.2', nomeCid: 'Calculose da vesícula biliar sem colecistite (Cólica Biliar)', justificativa: 'Dor na cólica biliar tipicamente regride em < 6h e não cursa com febre ou espessamento parietal.' },
        { codigoCid: 'K85.1', nomeCid: 'Pancreatite aguda biliar', justificativa: 'Enzimas pancreáticas (amilase e lipase) normais descartam envolvimento pancreático concomitante.' },
        { codigoCid: 'K25.0', nomeCid: 'Úlcera péptica perfurada', justificativa: 'Ausência de pneumoperitônio no RX/USG e abdome sem peritonite difusa em tábua.' },
      ],
      sinteseClinica: 'Paciente do sexo feminino de 46 anos com quadro de colecistite aguda litiásica confirmada por critérios clínicos, laboratoriais e ultrassonográficos, com indicação de colecistectomia videolaparoscópica de urgência.',
      condutaDiagnostica: 'Coleta de coagulograma completo, tipagem sanguínea com prova cruzada (reserva de hemocomponentes), ECG e risco cirúrgico pré-operatório.',
      condutaTerapeutica: 'Jejum pré-operatório; hidratação venosa com Ringer Lactato 1.500 mL/24h; Ceftriaxona 1g EV 12/12h + Metronidazol 500mg EV 8/8h; Dipirona 1g EV 6/6h + Cetoprofeno 100mg EV 12/12h; Ondansetrona 8mg EV se náuseas; programar Colecistectomia Videolaparoscópica.',
      planoNaoFarmacologico: 'Repouso no leito com cabeceira elevada a 30°, controle rigoroso de sinais vitais de 4 em 4 horas e débito urinário.',
      sinaisAlarme: 'Febre persistente acima de 38,5°C, icterícia nas escleras, confusão mental ou piora da dor com defesa abdominal difusa.',
      cuidadosGerais: 'Jejum absoluto a partir da meia-noite, analgesia regular, vigilância hemodinâmica.',
      planoAltaSeguimento: 'Alta prevista para 24 a 48h pós-operatório caso boa evolução clínica, tolerância alimentar e ausência de febre.',
      examesComplementares: [
        { id: '1', exame: 'Coagulograma (TP, INR, TTPA)', finalidade: 'Avaliação pré-operatória de hemostasia' },
        { id: '2', exame: 'Bilirrubinas Totais e Frações', finalidade: 'Afastar coledocolitíase associada' },
        { id: '3', exame: 'Amilase e Lipase séricas', finalidade: 'Excluir pancreatite biliar associada' }
      ]
    }
  },

  // 2. Abdome Agudo Obstrutivo por Bridas / Aderências (Internação Cirúrgica)
  {
    id: 'inpatient-obstrucao-bridas',
    categoria: 'Masculina',
    especialidade: 'Cirurgia Geral',
    titulo: 'Abdome Agudo Obstrutivo por Bridas / Aderências',
    subtitulo: 'Homem 58 anos com apendicectomia prévia, dor em cólica difusa, vômitos biliosos e parada de eliminação de fezes e flatos há 48h.',
    data: {
      tipo: 'anamnese',
      perfil: 'cirurgia',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'J.C.B.',
        idade: '58',
        idadeUnidade: 'anos',
        sexo: 'M',
        leito: 'Leito 15 - Cirurgia Geral',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '10:15',
        responsavel: '',
        naturalidade: 'Campinas - SP',
        ocupacao: 'Motorista',
        acompanhante: 'Esposa',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Suboclusão / Obstrução Intestinal Mecânica por Bridas (K56.5)',
        intercorrencias: 'Passada SNG nº 16 com drenagem inicial de 650 mL de secreção biliosa com alívio importante das náuseas.',
        comorbidadesAlergias: 'HAS leve controlada com Enalapril. Apendicectomia complicada há 10 anos. Nega alergias.',
        tratamentosFimDefinido: 'SNG aberta em frasco coletor, hidratação venosa vigorosa com SF 0,9% + reposição de KCl.',
        acessosDispositivos: 'AVP calibroso em MSE (Jelco 18), SNG aberta, SVF com diurese clara.',
        examesPorData: [
          { id: '1', data: new Date().toLocaleDateString('pt-BR'), resultado: 'RX de Abdome em ortostase e decúbito: dilatação importante de alças de delgado com níveis hidroaéreos escalonados e empilhamento de moedas; ausência de gás no cólon distal e ampola retal. Ureia 68 mg/dL, Creatinina 1,4 mg/dL, K+ 3,2 mEq/L, Na+ 134 mEq/L.' }
        ]
      },
      queixaPrincipal: 'Barriga inchada, dor em cólica e vômitos sem conseguir soltar gases há 2 dias',
      hda: 'Paciente com histórico de apendicectomia prévia há 10 anos, refere início insidioso há 48 horas de dor abdominal difusa em cólica de intensidade progressiva (7/10), associada a parada completa de eliminação de flatos e fezes. Nas últimas 24 horas evoluiu com distensão abdominal importante e múltiplos episódios de vômitos inicialmente alimentares e posteriormente biliosos/esverdeados. Nega febre aferida. Nega sangramento retal ou perda ponderal recente.',
      pacienteRelata: 'Sente cólicas fortes na barriga em ondas e sensação de plenitude e estufamento gástrico.',
      negativasRelevantes: 'Nega febre, icterícia, melena, hematoquezia ou episódios semelhantes prévios.',
      hpp: 'Apendicectomia aberta via incisão de McBurney por apendicite perfurada há 10 anos. HAS em uso de Enalapril 10mg/dia.',
      historiaFamiliar: 'Pai falecido por IAM aos 65 anos.',
      historiaSocial: 'Ex-tabagista (cessou há 12 anos). Nega etilismo.',
      sintomasAtuais: 'Sintomas conforme descritos na história atual.',
      historiaFisiologica: 'Sem particularidades fisiológicas pregressas relevantes.',
      revisaoSistemas: {
        constitucional: 'Sem outras queixas constitucionais.',
        cardiovascular: 'Sem queixas cardiovasculares adicionais.',
        respiratorio: 'Sem queixas respiratórias adicionais.',
        gastrointestinal: 'Conforme descrito na HDA.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Vigil, orientado e comunicativo.'
      },
      sinaisVitais: {
        o2Suporte: 'AA',
        diurese: 'Preservada (> 0.5 mL/kg/h)',
        evacuacoes: 'Presentes',
        balanco: 'Neutro',
        pa: '110/70 mmHg',
        fc: '102 bpm',
        fr: '20 irpm',
        tax: '36.8 °C',
        satO2: '96% em ar ambiente',
        glicemia: '115 mg/dL',
        dorEscala: '6/10',
      },
      exameFisico: {
        estadoGeral: 'Regular estado geral, lúcido e orientado, desidratado 2+/4+, taquicárdico, anictérico, acianótico, afebril.',
        ectoscopia: 'Mucosas secas, turgor cutâneo diminuído, perfusão periférica no limite superior (2s).',
        cabecaPescoco: 'Sem linfadenomegalias, jugulares planas a 45°.',
        acv: 'Ritmo cardíaco taquicárdico e regular em 2 tempos, sem sopros.',
        aResp: 'Murmúrio vesicular presente bilateralmente, discretamente diminuído em bases por elevação diafragmática.',
        abdome: 'Abdome globoso, distendido simetricamente; cicatriz cirúrgica oblíqua em fossa ilíaca direita de boa cicatrização; ruídos hidroaéreos aumentados com timbre metálico associados aos picos de dor em cólica; dor difusa à palpação média, sem sinais de peritonite ou descompressão brusca (Blumberg negativo); timpanismo difuso à percussão. Orifícios herniários livres e indolores; toque retal com ampola vazia, sem fezes ou massas palpáveis.',
        extremidades: 'Sem edema em MMII, pulsos periféricos finos e simétricos.',
        neurologicoPele: 'Sem déficits neurológicos focais.',
      },
      hipotesePrincipal: {
        codigoCid: 'K56.5',
        nomeCid: 'Aderências intestinais [bridas] com obstrução',
        justificativa: 'Paciente com antecedente de laparotomia prévia, apresentando a tétrade clássica de obstrução mecânica de delgado (dor em cólica, distensão abdominal, vômitos biliosos e parada de gases/fezes) e RX com níveis hidroaéreos.'
      },
      diferenciais: [
        { codigoCid: 'K56.0', nomeCid: 'Íleo paralítico', justificativa: 'No íleo paralítico os ruídos hidroaéreos estão universalmente abolidos, enquanto aqui há RHA metálicos aumentados.' },
        { codigoCid: 'K40.3', nomeCid: 'Hérnia estrangulada', justificativa: 'Inspeção e palpação de orifícios herniários inguinais, crurais e umbilicais normais.' },
      ],
      sinteseClinica: 'Homem de 58 anos com obstrução intestinal mecânica de delgado secundária a bridas pós-cirúrgicas, com desidratação leve e hipocalemia, respondendo à descompressão nasogástrica inicial.',
      condutaDiagnostica: 'Controle de eletrólitos seriados (Na+, K+, Cl-), gasometria venosa (avaliação de perfusão/lactato) e RX de abdome seriado em 12h para controle de progressão.',
      condutaTerapeutica: 'Jejum absoluto; SNG nº 16 mantida aberta em drenagem contínua por gravidade; hidratação venosa com SF 0,9% 2.000 mL/dia associado a KCl 10% 20 mL/dia; Ondansetrona 8mg EV 8/8h; Dipirona 1g EV 6/6h; Enoxaparina 40mg SC/dia (profilaxia TEV); reavaliação cirúrgica seriada a cada 6 horas.',
      planoNaoFarmacologico: 'Balanço hídrico rigoroso com registro do débito da SNG e da diurese; deambulação assistida quando possível.',
      sinaisAlarme: 'Aparecimento de febre, taquicardia desproporcional, piora da dor contínua com peritonismo (defesa involuntária/Blumberg) ou leucocitose progressiva sugerindo sofrimento de alça/isquemia.',
      cuidadosGerais: 'Monitorar sinais vitais e eletrólitos; programar laparotomia/videolaparoscopia se não houver resolução clínica conservadora em 48-72h.',
      planoAltaSeguimento: 'Retomada gradual da dieta oral após retorno de ruídos e eliminação de flatos; acompanhamento ambulatorial na cirurgia geral.',
      examesComplementares: [
        { id: '1', exame: 'Lactato Sérico e Gasometria Venosa', finalidade: 'Rastreio de isquemia ou sofrimento de alça intestinal' },
        { id: '2', exame: 'Tomografia Computadorizada de Abdome com Contraste EV', finalidade: 'Identificar ponto de transição e afastar estrangulamento caso falha clínica' }
      ]
    }
  },

  // 3. Fratura Transtrocantérica de Fêmur no Idoso (Internação Ortopédica / Cirúrgica)
  {
    id: 'inpatient-fratura-femur-idoso',
    categoria: 'Feminina',
    especialidade: 'Ortopedia / Cirurgia',
    titulo: 'Fratura Transtrocantérica de Fêmur em Idosa',
    subtitulo: 'Mulher 81 anos com queda da própria altura, impotência funcional de MID, encurtamento e rotação externa de membro.',
    data: {
      tipo: 'anamnese',
      perfil: 'cirurgia',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'E.A.M.',
        idade: '81',
        idadeUnidade: 'anos',
        sexo: 'F',
        leito: 'Leito 08 - Ortopedia e Traumatologia',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '11:45',
        responsavel: '',
        naturalidade: 'Ribeirão Preto - SP',
        ocupacao: 'Aposentada',
        acompanhante: 'Cuidadora / Neto',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Fratura Transtrocantérica de Fêmur Direito (S72.1)',
        intercorrencias: 'Imobilizado membro com coxim de conforto; analgesia multimodal estabelecida.',
        comorbidadesAlergias: 'Osteoporose senil severa, HAS de longa data, Hipotireoidismo. Nega alergias.',
        tratamentosFimDefinido: 'Enoxaparina 40mg SC/dia profilática, analgesia escalonada, Levotiroxina 50 mcg/dia.',
        acessosDispositivos: 'AVP em MSD. Sem cateter vesical.',
        examesPorData: [
          { id: '1', data: new Date().toLocaleDateString('pt-BR'), resultado: 'RX de Bacia e Quadril Direito: fratura transtrocantérica estável (classificação AO 31-A1) sem cominuição póstero-medial grave. Hemoglobina 11,2 g/dL, Leucócitos 8.900/mm³, Creatinina 0,9 mg/dL.' }
        ]
      },
      queixaPrincipal: 'Dor insuportável no quadril direito após cair no chão do banheiro hoje de manhã',
      hda: 'Paciente relata que estava caminhando para o banheiro quando tropeçou no tapete e sofreu queda da própria altura, caindo sobre o trocânter maior direito. Imediatamente evoluiu com dor intensa em região de quadril e virilha direita (9/10) e incapacidade absoluta de se levantar ou apoiar o membro no chão. Nega traumatismo cranioencefálico, perda transitória de consciência, síncope ou dor torácica precedendo a queda. Trazida pelo SAMU devidamente imobilizada.',
      pacienteRelata: 'Não consegue mexer a perna direita nem deitar de lado por conta da dor forte no quadril.',
      negativasRelevantes: 'Nega dor torácica, palpitações, escurecimento visual, cefaleia prévia ou déficits motores nos outros membros.',
      hpp: 'Osteoporose em uso irregular de carbonato de cálcio e colecalciferol. HAS em uso de Losartana 50mg/dia. Hipotireoidismo em uso de Levotiroxina 50 mcg/dia. Deambulava previamente sem auxílio de bengala.',
      historiaFamiliar: 'Irmã com fratura de rádio distal aos 70 anos.',
      historiaSocial: 'Viúva, reside com neto e cuidadora. Nega tabagismo ou etilismo.',
      sintomasAtuais: 'Sintomas conforme descritos na história atual.',
      historiaFisiologica: 'Sem particularidades fisiológicas pregressas relevantes.',
      revisaoSistemas: {
        constitucional: 'Sem outras queixas constitucionais.',
        cardiovascular: 'Sem queixas cardiovasculares adicionais.',
        respiratorio: 'Sem queixas respiratórias adicionais.',
        gastrointestinal: 'Conforme descrito na HDA.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Vigil, orientado e comunicativo.'
      },
      sinaisVitais: {
        o2Suporte: 'AA',
        diurese: 'Preservada (> 0.5 mL/kg/h)',
        evacuacoes: 'Presentes',
        balanco: 'Neutro',
        pa: '130/80 mmHg',
        fc: '82 bpm',
        fr: '16 irpm',
        tax: '36.6 °C',
        satO2: '98% em ar ambiente',
        glicemia: '102 mg/dL',
        dorEscala: '8/10',
      },
      exameFisico: {
        estadoGeral: 'Bom estado geral, lúcida e orientada no tempo e espaço (Mini-Mental 28/30), corada, hidratada, sem desconforto respiratório.',
        ectoscopia: 'Pele delgada, equimose discreta em região trocantérica direita, sem escoriações ou lesões abertas.',
        cabecaPescoco: 'Pupilas isocóricas e fotorreagentes, sem lesões traumáticas cranianas.',
        acv: 'Ritmo cardíaco regular em 2 tempos, sem sopros.',
        aResp: 'Murmúrio vesicular fisiológico, sem ruídos adventícios.',
        abdome: 'Flácido, indolor, ruídos hidroaéreos normoativos.',
        extremidades: 'Membro inferior direito com atitude típica: encurtamento de aproximadamente 2 cm em relação ao contralateral e rotação externa evidente; dor intensa à palpação de grande trocânter direito e à mobilização passiva suave do quadril. Pulsos pedioso e tibial posterior direitos amplos e simétricos aos esquerdos; perfusão capilar periférica < 2s; sensibilidade tátil e dolorosa preservada em todo o pé direito sem déficits de nervo fibular ou tibial.',
        neurologicoPele: 'Sem déficits focais, escala de coma de Glasgow 15.',
      },
      hipotesePrincipal: {
        codigoCid: 'S72.1',
        nomeCid: 'Fratura pertrocantérica',
        justificativa: 'Idosa com osteoporose e queda de baixa energia apresentando atitude clássica de fratura proximal de fêmur (encurtamento, rotação externa e impotência funcional) com confirmação radiológica.'
      },
      diferenciais: [
        { codigoCid: 'S72.0', nomeCid: 'Fratura do colo do fêmur', justificativa: 'RX confirma traço extracapsular transtrocantérico e não intracapsular do colo.' },
        { codigoCid: 'S73.0', nomeCid: 'Luxação da articulação do quadril', justificativa: 'Luxação posterior cursa com rotação interna e adução do membro, diferente da atitude observada.' },
      ],
      sinteseClinica: 'Idosa de 81 anos com fratura transtrocantérica de fêmur direito pós-queda da própria altura, estável hemodinamicamente, em preparo para osteossíntese com haste intramedular cefalomedular.',
      condutaDiagnostica: 'Avaliação cardiológica de risco cirúrgico pré-operatório; ECG; radiografia de tórax; ecocardiograma transtorácico.',
      condutaTerapeutica: 'Jejum pré-operatório programado; Dipirona 1g EV 6/6h + Tramadol 50mg EV 8/8h se dor intensa; Enoxaparina 40mg SC 1x/dia para profilaxia de TEV (suspender 12h antes do ato cirúrgico); manutenção da Levotiroxina e Losartana; programação de Osteossíntese com Haste Cefalomedular em até 48h.',
      planoNaoFarmacologico: 'Alinhamento e apoio do membro com travesseiros e coxim; prevenção de lesão por pressão com mudança de decúbito assistida e colchão pneumático; prevenção de delirium em idoso.',
      sinaisAlarme: 'Queda súbita de hemoglobina, dispneia súbita com dessaturação (suspeita de embolia gordurosa ou TEP), confusão mental aguda (delirium) ou alteração de perfusão distal.',
      cuidadosGerais: 'Vigilância neurológica contínua, analgesia otimizada e fisioterapia motora respiratória no pré-op.',
      planoAltaSeguimento: 'Estímulo ao ortostatismo e marcha precoce com andador no 1º pós-operatório; encaminhamento para tratamento farmacológico da osteoporose (bisfosfonatos/teriparatida) na alta.',
      examesComplementares: [
        { id: '1', exame: 'Eletrocardiograma (ECG)', finalidade: 'Avaliação de ritmo e isquemia pré-operatória' },
        { id: '2', exame: 'Radiografia de Tórax em PA', finalidade: 'Avaliação pulmonar e silhueta cardíaca pré-anestésica' }
      ]
    }
  },

  // 4. Acidente Vascular Cerebral Isquêmico (AVCi) Agudo (Internação Clínica)
  {
    id: 'inpatient-avci-neurologia',
    categoria: 'Masculina',
    especialidade: 'Clínica Médica / Neurologia',
    titulo: 'Acidente Vascular Cerebral Isquêmico (AVCi) Subagudo',
    subtitulo: 'Homem 67 anos com hemiparesia braquio-crural direita, disartria e paresia facial central há 16h, fora da janela de trombólise.',
    data: {
      tipo: 'anamnese',
      perfil: 'clinica-geral',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'A.P.L.',
        idade: '67',
        idadeUnidade: 'anos',
        sexo: 'M',
        leito: 'Leito 04 - Unidade de AVC / Clínica Médica',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '08:45',
        responsavel: '',
        naturalidade: 'Santos - SP',
        ocupacao: 'Marceneiro aposentado',
        acompanhante: 'Esposa',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Acidente Vascular Cerebral Isquêmico Agudo em Território de ACM Esquerda (I63.9)',
        intercorrencias: 'Admitido fora da janela para trombólise endovenosa (início dos sintomas há 16h). Sem piora neurológica no leito.',
        comorbidadesAlergias: 'HAS de longa data com adesão irregular, Dislipidemia mista. Nega alergias.',
        tratamentosFimDefinido: 'Dupla antiagregação plaquetária (AAS 100mg + Clopidogrel 75mg), Atorvastatina 80mg, Enoxaparina 40mg SC profilática.',
        acessosDispositivos: 'AVP em MSD. Monitorização contínua de PA e oximetria. Dieta pastosa com espessante.',
        examesPorData: [
          { id: '1', data: new Date().toLocaleDateString('pt-BR'), resultado: 'TC de Crânio sem contraste: apagamento discreto de sulcos corticais e hipoatenuação sutil em território de artéria cerebral média esquerda, ASPECTS 8, ausência de hemorragia aguda ou desvio de linha média. Glicemia 124 mg/dL.' }
        ]
      },
      queixaPrincipal: 'Fraqueza no braço e perna direitos e fala enrolada desde ontem à noite',
      hda: 'Paciente relata que ontem por volta das 20h00, enquanto jantava, notou perda súbita de força no membro superior direito que evoluiu rapidamente para dificuldade de movimentar o membro inferior direito e fala enrolada (disartria). Não procurou atendimento imediato por acreditar que se tratava de mal-estar transitório. Hoje pela manhã, como o quadro persistia inalterado, a família acionou o resgate. Nega cefaleia intensa, vômitos, convulsões ou rebaixamento do nível de consciência.',
      pacienteRelata: 'Dificuldade para segurar objetos com a mão direita e sensação de perna direita arrastando ao tentar pisar.',
      negativasRelevantes: 'Nega cefaleia prévia, síncope, dor no peito, palpitações, febre ou diplopia.',
      hpp: 'HAS diagnosticada há 15 anos em uso irregular de Hidroclorotiazida 25mg. Nega história prévia de AIT ou IAM.',
      historiaFamiliar: 'Irmão mais velho teve AVC aos 70 anos.',
      historiaSocial: 'Tabagista ativo (30 maços-ano). Nega etilismo.',
      sintomasAtuais: 'Sintomas conforme descritos na história atual.',
      historiaFisiologica: 'Sem particularidades fisiológicas pregressas relevantes.',
      revisaoSistemas: {
        constitucional: 'Sem outras queixas constitucionais.',
        cardiovascular: 'Sem queixas cardiovasculares adicionais.',
        respiratorio: 'Sem queixas respiratórias adicionais.',
        gastrointestinal: 'Conforme descrito na HDA.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Vigil, orientado e comunicativo.'
      },
      sinaisVitais: {
        o2Suporte: 'AA',
        diurese: 'Preservada (> 0.5 mL/kg/h)',
        evacuacoes: 'Presentes',
        balanco: 'Neutro',
        pa: '165/95 mmHg',
        fc: '78 bpm',
        fr: '16 irpm',
        tax: '36.5 °C',
        satO2: '97% em ar ambiente',
        glicemia: '122 mg/dL',
        dorEscala: '0/10',
      },
      exameFisico: {
        estadoGeral: 'Bom estado geral, lúcido e orientado (Glasgow 15), acianótico, anictérico, eupneico em ar ambiente.',
        ectoscopia: 'Pele e mucosas coradas e hidratadas, sem estigmas periféricos de sangramento.',
        cabecaPescoco: 'Sem sopros carotídeos auscultáveis, sem rigidez de nuca.',
        acv: 'Ritmo cardíaco regular em 2 tempos, bulhas normofonéticas sem sopros.',
        aResp: 'Murmúrio vesicular simétrico, sem ruídos adventícios.',
        abdome: 'Plano, flácido, indolor, ruídos hidroaéreos presentes.',
        extremidades: 'Sem edema em MMII, pulsos simétricos, panturrilhas livres.',
        neurologicoPele: 'Linguagem: disartria moderada, compreensão e nomeação preservadas. Pares cranianos: paresia facial central à direita (apagamento do sulco nasogeniano com motricidade da fronte preservada); motilidade ocular extrínseca normal sem nistagmo. Força motora: grau 3 em MSD e grau 4- em MID; força grau 5 no hemicorpo esquerdo. Sensibilidade: discreta hipoestesia tátil em dimídio direito. Reflexos profundos: hiper-reflexia bicipital e patelar à direita (3+/4+). Sinal de Babinski presente à direita, em flexão à esquerda. NIHSS = 6.',
      },
      hipotesePrincipal: {
        codigoCid: 'I63.9',
        nomeCid: 'Infarto cerebral não especificado',
        justificativa: 'Déficit neurológico focal agudo motor e fonoarticulatório com distribuição compatível com território isquêmico da artéria cerebral média esquerda e TC de crânio confirmando hipoatenuação precoce sem hemorragia.'
      },
      diferenciais: [
        { codigoCid: 'I61.9', nomeCid: 'Hemorragia intracerebral', justificativa: 'TC de crânio descarta hiperdensidade aguda/sangramento intraparenquimatoso.' },
        { codigoCid: 'G45.9', nomeCid: 'Ataque isquêmico transitório (AIT)', justificativa: 'Sintomas persistem por mais de 16 horas com lesão isquêmica documentada na neuroimagem.' },
      ],
      sinteseClinica: 'Homem de 67 anos com AVC isquêmico subagudo em território de ACM esquerda, NIHSS 6, fora de janela trombolítica, em regime de profilaxia secundária precoce e reabilitação motora.',
      condutaDiagnostica: 'Doppler de carótidas e artérias vertebrais; Ecocardiograma transtorácico com Doppler; Holter de 24h para rastreio de fibrilação atrial paroxística; perfil lipídico e HbA1c.',
      condutaTerapeutica: 'AAS 100mg/dia + Clopidogrel 75mg/dia por 21 dias (DAPT no AVC menor/alto risco); Atorvastatina 80mg à noite; Enoxaparina 40mg SC/dia para profilaxia de TEV; manter PA permissive (só tratar se PAS > 220 ou PAD > 120 mmHg); cabeceira mantida a 30°; controle rigoroso de temperatura e glicemia capilar.',
      planoNaoFarmacologico: 'Teste de deglutição à beira do leito pela fonoaudiologia antes de liberar dieta oral livre; fisioterapia motora e respiratória 2x/dia; mobilização precoce no leito.',
      sinaisAlarme: 'Piora do déficit motor (queda de pontuação motora), rebaixamento de nível de consciência, crises convulsivas ou pico febril.',
      cuidadosGerais: 'Vigilância contínua da escala de NIHSS, balanço hídrico neutro e prevenção de quedas.',
      planoAltaSeguimento: 'Planejamento de reabilitação ambulatorial (fonoaudiologia e fisioterapia motora) e acompanhamento neurológico.',
      examesComplementares: [
        { id: '1', exame: 'Ultrassonografia com Doppler de Artérias Carótidas e Vertebrais', finalidade: 'Avaliar presença de placas estenosantes > 70% com indicação de endarterectomia' },
        { id: '2', exame: 'Ecocardiograma Transtorácico', finalidade: 'Rastreio de fonte cardioembólica (trombo intracavitário, acinesia apical)' }
      ]
    }
  },

  // 5. Insuficiência Cardíaca Congestiva (ICC) Descompensada - Perfil B (Internação Clínica)
  {
    id: 'inpatient-icc-descompensada',
    categoria: 'Mista',
    especialidade: 'Clínica Médica / Cardiologia',
    titulo: 'Insuficiência Cardíaca Descompensada (Perfil B - Quente e Úmido)',
    subtitulo: 'Paciente 72 anos com ortopneia, DPN, turgência jugular a 45°, estertores crepitantes bibasais e edema simétrico de MMII 3+/4+.',
    data: {
      tipo: 'anamnese',
      perfil: 'clinica-geral',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'O.M.T.',
        idade: '72',
        idadeUnidade: 'anos',
        sexo: 'M',
        leito: 'Leito 06 - Cardiologia / Clínica Médica',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '14:20',
        responsavel: '',
        naturalidade: 'Belo Horizonte - MG',
        ocupacao: 'Aposentado',
        acompanhante: 'Filho',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Insuficiência Cardíaca Descompensada Perfil B (I50.9)',
        intercorrencias: 'Iniciada diurese venosa com Furosemida 40mg EV em bólus com resposta de 700 mL nas primeiras 3 horas.',
        comorbidadesAlergias: 'ICfer (FE 32% prévia de etiologia isquêmica), IAM prévio com angioplastia e stent em DA há 4 anos, DM2, HAS. Nega alergias.',
        tratamentosFimDefinido: 'Furosemida 40mg EV 12/12h, manutenção de Enalapril 10mg 12/12h e Carvedilol 12,5mg 12/12h, Espironolactona 25mg/dia.',
        acessosDispositivos: 'AVP em MSE. Cateter nasal de O2 a 1 L/min.',
        examesPorData: [
          { id: '1', data: new Date().toLocaleDateString('pt-BR'), resultado: 'RX de Tórax: cardiomegalia com índice cardiotorácico > 0,55, congestão pulmonar peri-hilar bilateral e linhas B de Kerley. BNP 1.890 pg/mL, Troponina I ultrassensível negativa, Ureia 54 mg/dL, Creatinina 1,3 mg/dL, K+ 4,2 mEq/L.' }
        ]
      },
      queixaPrincipal: 'Falta de ar piorando há 5 dias, não consegue dormir deitado e pernas muito inchadas',
      hda: 'Paciente com diagnóstico prévio de insuficiência cardíaca de fração de ejeção reduzida, refere piora progressiva da dispneia aos esforços habituais há cerca de 5 dias, evoluindo nas últimas 48 horas para dispneia aos mínimos esforços e ortopneia severa (necessidade de dormir sentado com 3 travesseiros). Refere episódios frequentes de dispneia paroxística noturna, acordando sufocado no meio da noite. Notou aumento rápido do inchaço nas pernas com ganho de aproximadamente 4,5 kg na última semana. Nega febre, tosse produtiva com escarro amarelado ou dor no peito anginosa.',
      pacienteRelata: 'Sensação de cansaço extremo e aperto respiratório ao se abaixar ou caminhar até a cozinha.',
      negativasRelevantes: 'Nega dor precordial, dor torácica ventilatório-dependente, febre, palpitações rápidas sustentadas ou tosse purulenta.',
      hpp: 'IAM prévio há 4 anos com stent em DA. HAS há 20 anos. DM2 em uso de Metformina e Empagliflozina. Não realizou vacinação anti-influenza recente.',
      historiaFamiliar: 'Mãe com histórico de insuficiência cardíaca congestiva.',
      historiaSocial: 'Ex-tabagista (parou há 10 anos). Nega etilismo.',
      sintomasAtuais: 'Sintomas conforme descritos na história atual.',
      historiaFisiologica: 'Sem particularidades fisiológicas pregressas relevantes.',
      revisaoSistemas: {
        constitucional: 'Sem outras queixas constitucionais.',
        cardiovascular: 'Sem queixas cardiovasculares adicionais.',
        respiratorio: 'Sem queixas respiratórias adicionais.',
        gastrointestinal: 'Conforme descrito na HDA.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Vigil, orientado e comunicativo.'
      },
      sinaisVitais: {
        o2Suporte: 'AA',
        diurese: 'Preservada (> 0.5 mL/kg/h)',
        evacuacoes: 'Presentes',
        balanco: 'Neutro',
        pa: '140/85 mmHg',
        fc: '88 bpm',
        fr: '22 irpm',
        tax: '36.4 °C',
        satO2: '93% em ar ambiente (97% com O2 a 1 L/min)',
        glicemia: '138 mg/dL',
        dorEscala: '0/10',
      },
      exameFisico: {
        estadoGeral: 'Regular estado geral, lúcido e orientado, taquipneico leve, afebril, acianótico, anictérico, preferindo decúbito elevado a 45°.',
        ectoscopia: 'Mucosas coradas e hidratadas, perfusão periférica normal (< 2 segundos).',
        cabecaPescoco: 'Turgência jugular patológica evidente a 45° com refluxo hepatojugular francamente positivo. Ausência de sopros carotídeos.',
        acv: 'Ictus cordis desviado para o 6º EIC esquerdo na linha axilar anterior (desviado e difuso, 3 polpas digitais); ritmo cardíaco regular em 3 tempos por presença de terceira bulha (B3 audível em foco mitral); sopro holossistólico 2+/6+ em foco mitral com irradiação axilar (regurgitação funcional).',
        aResp: 'Murmúrio vesicular presente bilateralmente com estertores crepitantes finos tele-inspiratórios em terços inferiores de ambos os hemitórax até linha média das escápulas.',
        abdome: 'Globoso por panículo adiposo, ruídos presentes; fígado palpável a 3 cm do rebordo costal direito, liso e doloroso (hepatomegalia congestiva). Blumberg negativo.',
        extremidades: 'Edema bilateral de membros inferiores ascendente até terço superior das pernas, frio, mole, depressível (Godet 3+/4+), indolor à palpação, panturrilhas livres.',
        neurologicoPele: 'Sem déficits neurológicos focais.',
      },
      hipotesePrincipal: {
        codigoCid: 'I50.9',
        nomeCid: 'Insuficiência cardíaca não especificada',
        justificativa: 'Paciente com ICfer descompensada preenchendo múltiplos critérios maiores de Framingham (ortopneia, DPN, B3, turgência jugular, estertores crepitantes, cardiomegalia e refluxo hepatojugular) em perfil hemodinâmico B (congesto e bem perfundido).'
      },
      diferenciais: [
        { codigoCid: 'J44.1', nomeCid: 'Exacerbação de DPOC', justificativa: 'Ausência de sibilos expiratórios predominantes e presença marcante de estase jugular, B3 e BNP extremamente elevado (> 1000).' },
        { codigoCid: 'I26.9', nomeCid: 'Tromboembolismo pulmonar', justificativa: 'Quadro subagudo com congestão venosa bilateral simétrica e ausência de dor pleurítica ou assimetria de membros.' },
      ],
      sinteseClinica: 'Homem de 72 anos com insuficiência cardíaca congestiva descompensada perfil B (quente e úmido), secundária a transgressão alimentar/medicamentosa, sem sinais de baixo débito ou síndrome coronariana aguda associada.',
      condutaDiagnostica: 'Ecocardiograma transtorácico recente para avaliação de fração de ejeção atualizada e pressões de enchimento; monitorização diária de função renal (Ureia/Creatinina) e íons (Na+/K+); balanço hídrico diário com pesagem em jejum.',
      condutaTerapeutica: 'Furosemida 40mg EV 12/12h; manutenção de Enalapril 10mg VO 12/12h e Carvedilol 12,5mg VO 12/12h; Espironolactona 25mg VO 1x/dia; Empagliflozina 10mg/dia; restrição hidrossalina (máx 1.200 mL/dia de líquidos e 2g de Na+); oxigênio suplementar sob cateter nasal 1-2 L/min se SpO2 < 92%.',
      planoNaoFarmacologico: 'Pesagem diária matinal antes do café da manhã; restrição rígida de sal na dieta; decúbito elevado a 45°.',
      sinaisAlarme: 'Piora da dispneia em repouso com taquipneia > 28 irpm, sudorese fria, hipotensão arterial (PAS < 90 mmHg), oligúria (< 0,5 mL/kg/h) ou dor precordial.',
      cuidadosGerais: 'Manutenção rigorosa do balanço hídrico negativo, vigilância de hipocalemia pós-diurético.',
      planoAltaSeguimento: 'Transição para furosemida oral quando atingir peso seco (euvolemia sem estertores ou turgência); orientações de automonitoramento de peso e retorno ambulatorial precoce na cardiologia em 7 a 14 dias.',
      examesComplementares: [
        { id: '1', exame: 'Dosagem Diária de Eletrólitos (Sódio e Potássio)', finalidade: 'Monitorar e prevenir hipocalemia e hiponatremia induzidas pela furosemida EV' },
        { id: '2', exame: 'Ecocardiograma Transtorácico com Doppler', finalidade: 'Avaliar disfunção sistólica, diástole e fração de ejeção ventricular' }
      ]
    }
  },

  // 6. Doença Pulmonar Obstrutiva Crônica (DPOC) Exacerbada - Anthonisen I (Internação Clínica)
  {
    id: 'inpatient-dpoc-exacerbado',
    categoria: 'Masculina',
    especialidade: 'Clínica Médica / Pneumologia',
    titulo: 'Exacerbação Infecciosa de DPOC (Critérios de Anthonisen I)',
    subtitulo: 'Homem 65 anos com DPOC grave, piora progressiva da falta de ar, aumento e purulência do escarro, sibilância difusa e tempo expiratório prolongado.',
    data: {
      tipo: 'anamnese',
      perfil: 'clinica-geral',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'W.T.F.',
        idade: '65',
        idadeUnidade: 'anos',
        sexo: 'M',
        leito: 'Leito 09 - Pneumologia / Clínica Médica',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '15:10',
        responsavel: '',
        naturalidade: 'Sorocaba - SP',
        ocupacao: 'Pedreiro aposentado',
        acompanhante: 'Esposa',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Doença Pulmonar Obstrutiva Crônica com Exacerbação Aguda Infecciosa (J44.1)',
        intercorrencias: 'Realizada nebulização com broncodilatadores de resgate com alívio parcial do esforço respiratório.',
        comorbidadesAlergias: 'DPOC GOLD 3 (VEF1 42% do previsto), Tabagismo severo (50 maços-ano). Nega alergias.',
        tratamentosFimDefinido: 'Amoxicilina-Clavulanato 875/125mg VO 12/12h (D1 de 7), Prednisona 40mg VO 1x/dia (D1 de 5).',
        acessosDispositivos: 'AVP em MSE. Cateter nasal de oxigênio a 1 L/min com alvo de saturação estrito (88 a 92%).',
        examesPorData: [
          { id: '1', data: new Date().toLocaleDateString('pt-BR'), resultado: 'RX de Tórax: hiperinsuflação pulmonar difusa, retificação de cúpulas diafragmáticas, aumento do espaço aéreo retroesternal, sem consolidação focal evidente. Gasometria Arterial (em ar ambiente): pH 7.34, PaCO2 50 mmHg, PaO2 58 mmHg, HCO3 27 mEq/L, SpO2 89%.' }
        ]
      },
      queixaPrincipal: 'Cansaço no peito e chiado há 3 dias com catarro amarelo e grosso',
      hda: 'Paciente com diagnóstico prévio de DPOC tabágica há 8 anos, refere piora acentuada da falta de ar há 3 dias, associada a tosse com aumento substancial do volume da expectoração que se tornou espessa e francamente purulenta (esverdeada). Refere que seu cansaço habitual para caminhadas de 100 metros piorou a ponto de apresentar dispneia para trocar de roupa e pentear o cabelo (mMRC 4). Fez uso domiciliar de salbutamol spray com alívio mínimo. Refere sensação de febrícula não aferida. Nega dor torácica ventilatório-dependente em pontada ou hemoptise.',
      pacienteRelata: 'Peito trancado com muita chieira e dificuldade para puxar e soltar o ar.',
      negativasRelevantes: 'Nega hemoptise, dor pleurítica aguda, síncope ou edema em membros inferiores.',
      hpp: 'DPOC em uso irregular de Formoterol + Budesonida inalatório. Tabagista inveterado. Nega HAS ou cardiopatia prévia.',
      historiaFamiliar: 'Irmão faleceu de enfisema pulmonar.',
      historiaSocial: 'Tabagista ativo: 1 maço/dia há 50 anos (carga tabágica de 50 maços-ano). Etilismo social esporádico.',
      sintomasAtuais: 'Sintomas conforme descritos na história atual.',
      historiaFisiologica: 'Sem particularidades fisiológicas pregressas relevantes.',
      revisaoSistemas: {
        constitucional: 'Sem outras queixas constitucionais.',
        cardiovascular: 'Sem queixas cardiovasculares adicionais.',
        respiratorio: 'Sem queixas respiratórias adicionais.',
        gastrointestinal: 'Conforme descrito na HDA.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Vigil, orientado e comunicativo.'
      },
      sinaisVitais: {
        o2Suporte: 'AA',
        diurese: 'Preservada (> 0.5 mL/kg/h)',
        evacuacoes: 'Presentes',
        balanco: 'Neutro',
        pa: '135/85 mmHg',
        fc: '98 bpm',
        fr: '24 irpm',
        tax: '37.3 °C',
        satO2: '89% em ar ambiente (92% com O2 a 1 L/min)',
        glicemia: '110 mg/dL',
        dorEscala: '0/10',
      },
      exameFisico: {
        estadoGeral: 'Regular estado geral, lúcido e orientado no tempo e espaço, taquipneico leve, com respiração freno-labial, sem cianose central.',
        ectoscopia: 'Coloração cutânea normal, unhas sem baqueteamento digital evidente, perfusão capilar periférica < 2s.',
        cabecaPescoco: 'Uso discreto de musculatura acessória cervical (esternocleidomastoideo), sem turgência jugular a 45°.',
        acv: 'Bulhas cardíacas rítmicas e hipofonéticas pelo enfisema pulmonar, sem sopros audíveis.',
        aResp: 'Tórax com aumento do diâmetro anteroposterior (tórax em tonel); hipersonoridade à percussão de ambos os campos; murmúrio vesicular universalmente diminuído com tempo expiratório marcadamente prolongado; sibilos expiratórios difusos bilaterais e roncos esparsos; sem estertores crepitantes focais.',
        abdome: 'Plano, flácido, indolor, sem massas ou visceromegalias, RHA presentes.',
        extremidades: 'Extremidades aquecidas, sem edema maleolar ou tibial, sem empastamento de panturrilhas.',
        neurologicoPele: 'Sem sinais meníngeos ou déficits neurológicos focais.',
      },
      hipotesePrincipal: {
        codigoCid: 'J44.1',
        nomeCid: 'Doença pulmonar obstrutiva crônica com exacerbação aguda',
        justificativa: 'Paciente portador de DPOC grave com exacerbação infecciosa caracterizada pela presença dos três critérios de Anthonisen: aumento da dispneia, aumento do volume do escarro e aumento da purulência da secreção traqueobrônquica.'
      },
      diferenciais: [
        { codigoCid: 'J18.9', nomeCid: 'Pneumonia não especificada', justificativa: 'RX de tórax sem consolidação lobar evidente ou broncograma aéreo.' },
        { codigoCid: 'I50.9', nomeCid: 'Insuficiência cardíaca descompensada', justificativa: 'Ausência de estertores crepitantes bibasais, sem turgência jugular e sem cardiomegalia no RX.' },
      ],
      sinteseClinica: 'Homem de 65 anos tabagista com exacerbação infecciosa aguda de DPOC (Anthonisen Tipo I), com acidose respiratória compensada e hipoxemia moderada, necessitando de broncodilatadores, corticoterapia sistêmica e antibioticoterapia.',
      condutaDiagnostica: 'Hemograma completo, PCR quantitativa, nova gasometria arterial de controle se piora da taquipneia ou sonolência.',
      condutaTerapeutica: 'Oxigenoterapia controlada em baixo fluxo (alvo de SpO2 entre 88% e 92% para evitar retenção crônica de CO2); Fenoterol 10 gotas + Ipratrópio 20 gotas inalatório de 4 em 4 horas; Prednisona 40mg VO 1x/dia por 5 dias; Amoxicilina-Clavulanato 875/125mg VO de 12 em 12 horas por 7 dias; Enoxaparina 40mg SC 1x/dia profilática.',
      planoNaoFarmacologico: 'Fisioterapia respiratória para manobras de higiene brônquica e reexpansão pulmonar; estímulo à tosse eficaz e hidratação oral para fluidificação de secreções.',
      sinaisAlarme: 'Sonolência excessiva ou confusão mental (sinais de narcose por retenção de CO2), tiragem intercostal grave, queda da SpO2 abaixo de 85% ou febre alta persistente.',
      cuidadosGerais: 'Vigilância contínua do padrão respiratório e monitoramento de gasometria arterial.',
      planoAltaSeguimento: 'Reforço categórico para cessação total do tabagismo; checagem da técnica inalatória de dispositivos broncodilatadores; encaminhamento para vacinação anual contra influenza e pneumocócica conjugada.',
      examesComplementares: [
        { id: '1', exame: 'Gasometria Arterial Seriada', finalidade: 'Monitorar PaCO2 e afastar acidose hipercápnica com necessidade de VNI' },
        { id: '2', exame: 'Proteína C-Reativa (PCR) e Leucograma', finalidade: 'Acompanhar resolução do processo infeccioso bacteriano agudo' }
      ]
    }
  },

  // 7. Cetoacidose Diabética (CAD) Grave (Internação Clínica / Semi-Intensiva)
  {
    id: 'inpatient-cetoacidose-diabetica',
    categoria: 'Feminina',
    especialidade: 'Clínica Médica / Endocrinologia',
    titulo: 'Cetoacidose Diabética (CAD) Grave Descompensada',
    subtitulo: 'Mulher 21 anos com DM1, dor abdominal, vômitos, respiração de Kussmaul, hálito cetônico, glicemia 490 mg/dL e acidose com ânion gap elevado.',
    data: {
      tipo: 'anamnese',
      perfil: 'clinica-geral',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'L.F.G.',
        idade: '21',
        idadeUnidade: 'anos',
        sexo: 'F',
        leito: 'Leito 02 - Terapia Semi-Intensiva / Clínica Médica',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '16:00',
        responsavel: '',
        naturalidade: 'São Paulo - SP',
        ocupacao: 'Estudante Universitária',
        acompanhante: 'Mãe',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Cetoacidose Diabética Grave (E10.1)',
        intercorrencias: 'Iniciada hidratação venosa vigorosa com SF 0,9% 1.000 mL na 1ª hora e bomba de infusão de insulina regular.',
        comorbidadesAlergias: 'Diabetes Mellitus Tipo 1 diagnosticado aos 12 anos. Omissão de doses de insulina basal nos últimos 3 dias. Nega alergias.',
        tratamentosFimDefinido: 'Insulina regular em bomba de infusão contínua a 0,1 UI/kg/h, SF 0,9% EV contínuo com reposição de KCl 10%.',
        acessosDispositivos: 'Dois AVPs calibrosos em membros superiores. Sonda vesical de alívio inicial para amostra de urina.',
        examesPorData: [
          { id: '1', data: new Date().toLocaleDateString('pt-BR'), resultado: 'Glicemia capilar: 492 mg/dL. Gasometria Arterial: pH 7.14, HCO3 8 mEq/L, PaCO2 22 mmHg, BE -16. Eletrólitos: Na+ 132 mEq/L (Na corrigido 138), K+ 4,9 mEq/L, Cl- 98 mEq/L. Ânion Gap = 26. Urina 1: glicose > 1.000 mg/dL, corpos cetônicos 4+.' }
        ]
      },
      queixaPrincipal: 'Dor forte na barriga, vômitos que não param e respiração muito rápida e pesada há 1 dia',
      hda: 'Paciente portadora de DM1 em uso de esquema basal-bolus (insulina glargina e lispro), refere que há 3 dias viajou para casa de amigos e esqueceu o refil de insulina basal em casa, tendo suspendido o tratamento. Há cerca de 24 horas começou a apresentar poliúria intensa, sede insaciável (polidipsia), fadiga acentuada e náuseas. Evoluiu nas últimas 12 horas com múltiplos episódios de vômitos incoercíveis, dor abdominal difusa em cólica de forte intensidade (8/10), prostração e respiração funda e acelerada. Nega febre, tosse ou sintomas urinários irritativos como disúria.',
      pacienteRelata: 'Muita sede, boca extremamente seca e fraqueza tão intensa que não consegue ficar em pé.',
      negativasRelevantes: 'Nega febre, tosse, expectoração, disúria ou dor lombar.',
      hpp: 'DM1 desde os 12 anos com episódios prévios de cetoacidose na adolescência por má adesão terapêutica.',
      historiaFamiliar: 'Mãe com hipotireoidismo de Hashimoto.',
      historiaSocial: 'Estudante universitária, nega tabagismo ou uso de drogas ilícitas.',
      sintomasAtuais: 'Sintomas conforme descritos na história atual.',
      historiaFisiologica: 'Sem particularidades fisiológicas pregressas relevantes.',
      revisaoSistemas: {
        constitucional: 'Sem outras queixas constitucionais.',
        cardiovascular: 'Sem queixas cardiovasculares adicionais.',
        respiratorio: 'Sem queixas respiratórias adicionais.',
        gastrointestinal: 'Conforme descrito na HDA.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Vigil, orientado e comunicativo.'
      },
      sinaisVitais: {
        o2Suporte: 'AA',
        diurese: 'Preservada (> 0.5 mL/kg/h)',
        evacuacoes: 'Presentes',
        balanco: 'Neutro',
        pa: '95/60 mmHg',
        fc: '116 bpm',
        fr: '28 irpm',
        tax: '36.2 °C',
        satO2: '98% em ar ambiente',
        glicemia: '492 mg/dL',
        dorEscala: '7/10',
      },
      exameFisico: {
        estadoGeral: 'Regular para mau estado geral, sonolenta mas responsiva a comandos verbais simples, acentuadamente desidratada (3+/4+), taquipneica, afebril, hálito cetônico característico (odor de maçã ácida/fruta passada).',
        ectoscopia: 'Mucosas orais secas com saliva espessa, olhos encovados, turgor cutâneo muito diminuído, tempo de enchimento capilar de 3 segundos.',
        cabecaPescoco: 'Jugulares colabadas a 0° indicando depleção volumétrica grave.',
        acv: 'Ritmo cardíaco taquicárdico e regular em 2 tempos, bulhas normofonéticas sem sopros audíveis.',
        aResp: 'Padrão respiratório hiperventilatório com incursões inspiratórias e expiratórias profundas e rápidas (Respiração de Kussmaul); murmúrio vesicular universalmente audível sem ruídos adventícios.',
        abdome: 'Ligeiramente escavado, dor difusa à palpação de andar superior e mesogástrio sem sinais de irritação peritoneal (Sinal de Blumberg negativo, abdome flácido); ruídos hidroaéreos diminuídos.',
        extremidades: 'Extremidades frias e pálidas, pulsos radiais e pediosos rápidos e filiformes.',
        neurologicoPele: 'Sem sinais meníngeos ou déficits motores focais, pupilas isocóricas e fotorreagentes.',
      },
      hipotesePrincipal: {
        codigoCid: 'E10.1',
        nomeCid: 'Diabetes mellitus tipo 1 com cetoacidose',
        justificativa: 'Quadro clássico de cetoacidose diabética grave em jovem com DM1 deflagrada por omissão de insulina, preenchendo todos os critérios laboratoriais: glicemia > 250 mg/dL, acidose metabólica com pH < 7.20 e HCO3 < 10 mEq/L, ânion gap elevado (> 12) e cetonúria maciça.'
      },
      diferenciais: [
        { codigoCid: 'E11.0', nomeCid: 'Estado hiperglicêmico hiperosmolar', justificativa: 'Estado hiperosmolar é mais comum no DM2 idoso e não cursa tipicamente com acidose com ânion gap tão alargado nem cetonúria intensa.' },
        { codigoCid: 'K35.8', nomeCid: 'Apendicite aguda', justificativa: 'Dor abdominal é reflexo da acidose metabólica e desidratação (pseudoperitonite diabética) e melhora com a hidratação e correção da acidose.' },
      ],
      sinteseClinica: 'Mulher jovem de 21 anos com cetoacidose diabética grave descompensada por suspensão inadvertida da insulinoterapia basal, apresentando desidratação profunda, acidose metabólica com ânion gap elevado e hálito cetônico.',
      condutaDiagnostica: 'Controle horário de glicemia capilar; gasometria venosa e eletrólitos (Na+, K+, Cl-) a cada 2 a 4 horas; dosagem de fósforo e magnésio séricos; urina tipo 1.',
      condutaTerapeutica: '1) Hidratação venosa: SF 0,9% 1.000 mL/h na primeira hora, seguido de SF 0,9% 250-500 mL/h dependendo do sódio corrigido; 2) Insulina regular: infusão contínua em bomba a 0,1 UI/kg/h (após confirmar K+ > 3,3 mEq/L); 3) Reposição de Potássio: manter K+ entre 4 e 5 mEq/L adicionando 20 a 30 mEq de KCl a cada litro de soro; 4) Quando glicemia atingir 200-250 mg/dL, associar Soro Glicosado a 5% para prevenir hipoglicemia mantendo a bomba de insulina até resolução da acidose (HCO3 > 18 e ânion gap normalizado).',
      planoNaoFarmacologico: 'Monitorização multiparamétrica contínua na semi-intensiva, balanço hídrico rigoroso com registro horário de diurese.',
      sinaisAlarme: 'Queda brusca de potássio (< 3,3 mEq/L - risco de arritmias fatais), cefaleia intensa ou rebaixamento neurológico agudo (suspeita de edema cerebral por queda hiper-rápida da osmolaridade) ou arritmias cardíacas.',
      cuidadosGerais: 'Transição para insulina subcutânea basal-bolus somente quando critérios de resolução da CAD forem atingidos e paciente com boa tolerância oral.',
      planoAltaSeguimento: 'Educação intensiva em diabetes com equipe multidisciplinar; fornecimento de guia de conduta em dias de doença para prevenção de novos episódios.',
      examesComplementares: [
        { id: '1', exame: 'Gasometria e Eletrólitos de Controle a cada 2 horas', finalidade: 'Monitorar fechamento do ânion gap e correção do bicarbonato' },
        { id: '2', exame: 'Eletrocardiograma (ECG)', finalidade: 'Vigiar alterações de onda T relacionadas à cinética rápida do potássio' }
      ]
    }
  },

  // 8. Hemorragia Digestiva Alta (HDA) Não-Varicosa por Úlcera Péptica (Internação Clínica / Cirúrgica)
  {
    id: 'inpatient-hda-ulcera-peptica',
    categoria: 'Masculina',
    especialidade: 'Clínica Médica / Gastroenterologia',
    titulo: 'Hemorragia Digestiva Alta (HDA) por Úlcera Péptica Gastroduodenal',
    subtitulo: 'Homem 56 anos com uso crônico de anti-inflamatório, hematêmese volumosa com coágulos, melena fétida e hipotensão postural.',
    data: {
      tipo: 'anamnese',
      perfil: 'clinica-geral',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'R.M.N.',
        idade: '56',
        idadeUnidade: 'anos',
        sexo: 'M',
        leito: 'Leito 07 - Enfermaria Clínica / Gastro',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '17:30',
        responsavel: '',
        naturalidade: 'Guarulhos - SP',
        ocupacao: 'Eletricista',
        acompanhante: 'Esposa',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Hemorragia Digestiva Alta Não-Varicosa (K25.0)',
        intercorrencias: 'Apresentou episódio de vômito com sangue escuro (borra de café) na admissão; estabilizado com infusão rápida de 1.000 mL de Ringer Lactato.',
        comorbidadesAlergias: 'Lombociatalgia crônica em uso contínuo de Cetoprofeno e Diclofenaco há 3 meses. Dispepsia prévia. Nega alergias.',
        tratamentosFimDefinido: 'Omeprazol 80mg EV em bólus seguido de 8mg/h em bomba de infusão contínua; tipagem sanguínea reservada.',
        acessosDispositivos: 'Dois acessos venosos periféricos calibrosos (Jelco 16 e 18). Monitorização contínua de PA e FC.',
        examesPorData: [
          { id: '1', data: new Date().toLocaleDateString('pt-BR'), resultado: 'Hemograma imediato: Hemoglobina 8,4 g/dL (queda aguda de valor prévio de 14), Hematócrito 25%, Plaquetas 240.000/mm³, Ureia 74 mg/dL (elevação desproporcional à creatinina de 0,9 mg/dL por absorção intestinal de sangue). Coagulograma: INR 1,1.' }
        ]
      },
      queixaPrincipal: 'Vômito com grande quantidade de sangue escuro e fezes pretas e fedidas como piche há 12 horas',
      hda: 'Paciente com histórico de dor lombar crônica em uso diário de AINEs por conta própria, relata que há 2 semanas vinha sentindo queimação na boca do estômago (epigastralgia) em jejum. Há 12 horas apresentou episódio súbito de náusea seguido de vômito volumoso com sangue vivo e coágulos escuros (cerca de 400 mL). Posteriormente apresentou duas evacuações pastosas, escuras como piche e de odor fétido característico (melena). Ao tentar se levantar para ir ao banheiro, teve tontura importante com escurecimento visual e sensação de desmaio (lipotimia). Nega etilismo pesado crônico ou estigmas de cirrose hepática.',
      pacienteRelata: 'Fraqueza intensa, coração acelerado e sensação de desmaio ao ficar em pé.',
      negativasRelevantes: 'Nega icterícia, ascite, circulação colateral visível, febre ou hemoptise.',
      hpp: 'Hérnia discal lombar há 5 anos com uso crônico abusivo de anti-inflamatórios não-esteroidais (AINEs). Nega história prévia de hepatite B ou C.',
      historiaFamiliar: 'Pai falecido por complicações de infarto agudo do miocárdio.',
      historiaSocial: 'Tabagista (20 maços-ano). Etilismo leve social.',
      sintomasAtuais: 'Sintomas conforme descritos na história atual.',
      historiaFisiologica: 'Sem particularidades fisiológicas pregressas relevantes.',
      revisaoSistemas: {
        constitucional: 'Sem outras queixas constitucionais.',
        cardiovascular: 'Sem queixas cardiovasculares adicionais.',
        respiratorio: 'Sem queixas respiratórias adicionais.',
        gastrointestinal: 'Conforme descrito na HDA.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Vigil, orientado e comunicativo.'
      },
      sinaisVitais: {
        o2Suporte: 'AA',
        diurese: 'Preservada (> 0.5 mL/kg/h)',
        evacuacoes: 'Presentes',
        balanco: 'Neutro',
        pa: '100/65 mmHg deitado / 85/50 mmHg sentado (Hipotensão postural positiva)',
        fc: '110 bpm',
        fr: '18 irpm',
        tax: '36.5 °C',
        satO2: '96% em ar ambiente',
        glicemia: '106 mg/dL',
        dorEscala: '4/10 em epigástrio',
      },
      exameFisico: {
        estadoGeral: 'Regular estado geral, lúcido e orientado no tempo e espaço, pálido (descorado 2+/4+), sudorese fria discreta, taquicárdico, sem desconforto respiratório.',
        ectoscopia: 'Mucosas descoradas e úmidas, sem icterícia ou telangiectasias cutâneas; tempo de enchimento capilar de 2,5 segundos.',
        cabecaPescoco: 'Sem ingurgitamento jugular, carótidas sem sopros.',
        acv: 'Ritmo cardíaco taquicárdico e regular em 2 tempos, bulhas normofonéticas sem sopros patológicos.',
        aResp: 'Murmúrio vesicular presente bilateralmente, sem ruídos adventícios.',
        abdome: 'Plano, flácido, dor leve à palpação profunda de epigástrio, sem defesa voluntária ou involuntária; ruídos hidroaéreos aumentados e hiperativos; sem visceromegalias (fígado e baço não palpáveis). Toque retal: presença de fezes pastosas pretas e pegajosas (melena franca), sem massas palpáveis.',
        extremidades: 'Pulsos periféricos rápidos e cheios, sem edema em membros inferiores.',
        neurologicoPele: 'Sem asterixe (flapping negativo), sem sinais de encefalopatia.',
      },
      hipotesePrincipal: {
        codigoCid: 'K25.0',
        nomeCid: 'Úlcera gástrica aguda com hemorragia',
        justificativa: 'Quadro clássico de hemorragia digestiva alta não-varicosa com hematêmese e melena, repercussão hemodinâmica postural e elevação de ureia, em paciente com uso prolongado de AINEs, com alta probabilidade de úlcera péptica gastroduodenal.'
      },
      diferenciais: [
        { codigoCid: 'I85.0', nomeCid: 'Varizes de esôfago com hemorragia', justificativa: 'Ausência de estigmas clínicos, laboratoriais ou ultrassonográficos de hipertensão portal / cirrose.' },
        { codigoCid: 'K22.6', nomeCid: 'Síndrome de Mallory-Weiss', justificativa: 'Laceração esofágica geralmente é precedida por múltiplos episódios de vômitos vigorosos sem sangue antes de sangrar.' },
      ],
      sinteseClinica: 'Homem de 56 anos com hemorragia digestiva alta ativa não-varicosa induzida por AINEs, com repercussão hemodinâmica e queda de hematócrito, em preparo para endoscopia digestiva alta diagnóstica e terapêutica de urgência.',
      condutaDiagnostica: 'Endoscopia Digestiva Alta (EDA) de urgência dentro das primeiras 12 a 24 horas; tipagem sanguínea com teste de compatibilidade e reserva de 2 concentrados de hemácias.',
      condutaTerapeutica: 'Jejum absoluto; expansão volêmica imediata com cristaloides (Ringer Lactato); Omeprazol 80mg EV em bólus seguido de infusão de 8mg/h por 72h; suspensão definitiva de qualquer medicação anti-inflamatória; transfusão de concentrado de hemácias se hemoglobina cair abaixo de 7-8 g/dL ou persistência de instabilidade hemodinâmica.',
      planoNaoFarmacologico: 'Acesso venoso calibroso duplo mantido pérvio; vigilância constante do débito de sangramento e das eliminações fecais.',
      sinaisAlarme: 'Novos episódios de hematêmese volumosa com sangue vivo, taquicardia persistente > 120 bpm, queda pressórica acentuada (PAS < 90 mmHg) ou rebaixamento sensorial.',
      cuidadosGerais: 'Monitoramento rigoroso de sinais vitais de 2 em 2 horas nas primeiras 24 horas; balanço hídrico.',
      planoAltaSeguimento: 'Pesquisa e erradicação de Helicobacter pylori conforme biópsia na EDA; manutenção de IBP oral em dose plena por 8 semanas e contraindicação absoluta ao uso de AINEs.',
      examesComplementares: [
        { id: '1', exame: 'Endoscopia Digestiva Alta (EDA) de Urgência', finalidade: 'Localização do foco hemorrágico, classificação de Forrest e hemostasia endoscópica' },
        { id: '2', exame: 'Hemograma Seriado a cada 6 a 12 horas', finalidade: 'Monitorar estabilidade dos níveis de hemoglobina e hematócrito' }
      ]
    }
  },

  // 9. Erisipela / Celulite Grave de Membro Inferior com Febre (Internação Clínica)
  {
    id: 'inpatient-erisipela-grave',
    categoria: 'Feminina',
    especialidade: 'Clínica Médica / Infectologia',
    titulo: 'Erisipela Bolhosa / Celulite Grave de Membro Inferior',
    subtitulo: 'Mulher 61 anos diabética com placa eritematosa extensa, quente e dolorosa em perna esquerda, com febre alta e linfonodomegalia inguinal.',
    data: {
      tipo: 'anamnese',
      perfil: 'clinica-geral',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'M.L.C.',
        idade: '61',
        idadeUnidade: 'anos',
        sexo: 'F',
        leito: 'Leito 11 - Enfermaria de Clínica Médica',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '18:15',
        responsavel: '',
        naturalidade: 'Mauá - SP',
        ocupacao: 'Dona de casa',
        acompanhante: 'Filha',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Erisipela / Celulite Grave de Membro Inferior Esquerdo (A46)',
        intercorrencias: 'Demarcada a área de eritema com caneta cirúrgica para controle evolutivo de resposta antimicrobiana.',
        comorbidadesAlergias: 'Diabetes Mellitus Tipo 2, Insuficiência Venosa Crônica de MMII, Tinea pedis interdigital. Nega alergias.',
        tratamentosFimDefinido: 'Oxacilina 2g EV 4/4h (D1 de 10) associada a Cefazolina, controle glicêmico intensivo.',
        acessosDispositivos: 'AVP em MSE pérvio. Sem dispositivos invasivos adicionais.',
        examesPorData: [
          { id: '1', data: new Date().toLocaleDateString('pt-BR'), resultado: 'Hemograma: Leucócitos 16.200/mm³ com 8% de bastões, Plaquetas 280.000/mm³, PCR 84 mg/L (VR < 5). Glicemia 176 mg/dL, Creatinina 0,8 mg/dL. Doppler venoso de membro inferior esquerdo: ausência de trombose venosa profunda em eixos femoral e poplíteo.' }
        ]
      },
      queixaPrincipal: 'Perna esquerda vermelha, muito inchada, quente e com dor forte há 2 dias associada a calafrios e febre',
      hda: 'Paciente relata que há 2 dias começou a sentir calafrios intensos seguidos de febre aferida em 38,7°C e dor em peso na perna esquerda. Simultaneamente surgiu uma mancha vermelha na região anterior da perna que se expandiu rapidamente até o joelho, tornando-se muito brilhante, quente ao toque e dolorosa. Notou aparecimento de pequenas bolhas com líquido claro na região da canela. Refere histórico de coceira e descamação entre os dedos dos pés (frieira) de longa data. Nega traumatismos diretos, picadas de insetos recentes ou viagens.',
      pacienteRelata: 'Muita dor na canela esquerda, não consegue colocar o pé no chão para andar de tanta dor e queimação.',
      negativasRelevantes: 'Nega secreção purulenta drenando ativamente, nega anestesia cutânea ou crepitação à palpação.',
      hpp: 'DM2 há 8 anos em uso de Metformina e Gliclazida. Insuficiência venosa crônica com varizes de MMII há mais de 15 anos. Episódio semelhante de erisipela há 3 anos tratado com antibiótico.',
      historiaFamiliar: 'Mãe com varizes e insuficiência venosa.',
      historiaSocial: 'Nega tabagismo ou etilismo.',
      sintomasAtuais: 'Sintomas conforme descritos na história atual.',
      historiaFisiologica: 'Sem particularidades fisiológicas pregressas relevantes.',
      revisaoSistemas: {
        constitucional: 'Sem outras queixas constitucionais.',
        cardiovascular: 'Sem queixas cardiovasculares adicionais.',
        respiratorio: 'Sem queixas respiratórias adicionais.',
        gastrointestinal: 'Conforme descrito na HDA.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Vigil, orientado e comunicativo.'
      },
      sinaisVitais: {
        o2Suporte: 'AA',
        diurese: 'Preservada (> 0.5 mL/kg/h)',
        evacuacoes: 'Presentes',
        balanco: 'Neutro',
        pa: '130/80 mmHg',
        fc: '94 bpm',
        fr: '18 irpm',
        tax: '38.2 °C',
        satO2: '97% em ar ambiente',
        glicemia: '172 mg/dL',
        dorEscala: '7/10',
      },
      exameFisico: {
        estadoGeral: 'Bom estado geral, lúcida e orientada, febril no momento, corada, hidratada, sem desconforto respiratório.',
        ectoscopia: 'Pele com placa eritematosa extensa ocupando os dois terços distais da perna esquerda e dorso do pé esquerdo, com bordos nítidos e discretamente elevados; calor local marcante e dor intensa à palpação superficial; presença de 3 flictenas (bolhas) com conteúdo seroso claro íntegras na face antero-medial da tíbia; ausência de crepitação, necrose ou áreas de anestesia cutânea.',
        cabecaPescoco: 'Sem linfonodomegalias cervicais.',
        acv: 'Ritmo cardíaco regular em 2 tempos, sem sopros audíveis.',
        aResp: 'Murmúrio vesicular simétrico e universal sem ruídos adventícios.',
        abdome: 'Globoso, flácido, indolor, ruídos normoativos.',
        extremidades: 'Perna esquerda com edema 2+/4+ até joelho; linfonodomegalia dolorosa e móvel de 2,0 cm palpável em cadeia inguinal esquerda; descamação e maceração interdigital entre 4º e 5º pododáctilos (porta de entrada típica de tinea pedis); pulsos pediosos palpáveis e simétricos; empastamento de panturrilha negativo (Sinal de Homans negativo bilateralmente).',
        neurologicoPele: 'Sem déficits neurológicos.',
      },
      hipotesePrincipal: {
        codigoCid: 'A46',
        nomeCid: 'Erisipela',
        justificativa: 'Infecção aguda de derme e tecido subcutâneo com placa eritematosa bem delimitada, calor, dor, bolhas serosas, adenomegalia regional satélite e manifestações sistêmicas (febre alta e leucocitose com desvio), com porta de entrada identificada em pododáctilos.'
      },
      diferenciais: [
        { codigoCid: 'I80.2', nomeCid: 'Trombose venosa profunda de membros inferiores', justificativa: 'Doppler venoso color realizado na emergência descartou trombos em eixos femoropoplíteo e tibiais.' },
        { codigoCid: 'M72.6', nomeCid: 'Fasceíte necrotizante', justificativa: 'Ausência de dor desproporcional refratária, bolhas hemorrágicas, crepitação gasosa, anestesia local ou instabilidade séptica grave.' },
      ],
      sinteseClinica: 'Mulher de 61 anos com diabetes mellitus e erisipela bolhosa extensa de membro inferior esquerdo com linfadenite satélite e porta de entrada interdigital, necessitando de antibioticoterapia parenteral e cuidados tópicos.',
      condutaDiagnostica: 'Demarcação com caneta dermográfica da margem eritematosa para acompanhamento diário da resposta terapêutica; controle glicêmico com glicemia capilar pré-refeições.',
      condutaTerapeutica: 'Oxacilina 2g EV a cada 4 horas (ou Cefazolina 1g EV 8/8h); Dipirona 1g EV 6/6h se dor ou febre; Enoxaparina 40mg SC 1x/dia profilática; controle glicêmico com insulina regular conforme escala; cuidados locais com compressas de soro fisiológico estéril.',
      planoNaoFarmacologico: 'Repouso absoluto no leito com elevação do membro inferior esquerdo a 30-45° em relação ao nível do quadril para facilitação da drenagem linfática e redução do edema; tratamento antimicótico tópico interdigital (Miconazol creme 2% após higiene cuidadosa).',
      sinaisAlarme: 'Progressão rápida do eritema além das marcas demarcadas, aparecimento de bolhas violáceas/hemorrágicas, áreas de necrose cutânea escurecidas, perda de sensibilidade local ou hipotensão/taquicardia sugerindo choque séptico.',
      cuidadosGerais: 'Inspeção diária do membro e monitorização térmica.',
      planoAltaSeguimento: 'Transição para Cefalexina oral após 48-72h afebril e com regressão das margens inflamatórias; orientações rigorosas de higiene dos pés, secagem interdigital e uso de meia elástica de média compressão após resolução total da infecção.',
      examesComplementares: [
        { id: '1', exame: 'Proteína C-Reativa (PCR) e Leucograma de Controle em 72h', finalidade: 'Monitorar redução da resposta inflamatória sistêmica' },
        { id: '2', exame: 'Ureia e Creatinina', finalidade: 'Acompanhar função renal durante uso de antimicrobianos' }
      ]
    }
  },

  // 10. Pielonefrite Aguda Complicada (Internação Clínica)
  {
    id: 'inpatient-pielonefrite-aguda',
    categoria: 'Feminina',
    especialidade: 'Clínica Médica / Urologia',
    titulo: 'Pielonefrite Aguda Não-Obstrutiva / Febre e Giordano Positivo',
    subtitulo: 'Mulher 34 anos com febre de 39,2°C com calafrios, dor intensa em flanco direito, Sinal de Giordano francamente positivo e piúria maciça.',
    data: {
      tipo: 'anamnese',
      perfil: 'clinica-geral',
      formatoSaida: 'completo',
      identificacao: {
        nomeIniciais: 'C.T.R.',
        idade: '34',
        idadeUnidade: 'anos',
        sexo: 'F',
        leito: 'Leito 14 - Enfermaria de Clínica Médica',
        data: new Date().toLocaleDateString('pt-BR'),
        hora: '19:00',
        responsavel: '',
        naturalidade: 'Osasco - SP',
        ocupacao: 'Professora',
        acompanhante: 'Irmã',
        confiabilidade: 'boa',
      },
      resumoProblemas: {
        tempoInternacao: 'D1 IH',
        motivoInternacao: 'Pielonefrite Aguda (N10)',
        intercorrencias: 'Coletadas 2 amostras de hemoculturas e urocultura com antibiograma antes do início da antibioticoterapia venosa.',
        comorbidadesAlergias: 'Infecções do trato urinário baixo (cistites) de repetição nos últimos 2 anos. Nega alergias.',
        tratamentosFimDefinido: 'Ceftriaxona 1g EV 12/12h (D1 de 10-14 dias), hidratação venosa contínua com SF 0,9%.',
        acessosDispositivos: 'AVP em MSD. Sem cateter vesical.',
        examesPorData: [
          { id: '1', data: new Date().toLocaleDateString('pt-BR'), resultado: 'Urina Tipo 1 (EAS): turva, densidade 1.018, pH 6.0, leucócitos > 1.000.000/mL (incontáveis), hemácias 45.000/mL, nitrito positivo, esterase leucocitária 3+. Hemograma: Leucócitos 18.400/mm³ com 10% de bastões e granulações tóxicas. USG de Vias Urinárias: rim direito discretamente aumentado de volume (12,5 cm) com perda sutil da diferenciação cortico-medular; sem dilatação de cálices ou pelve (ausência de hidronefrose ou cálculo obstrutivo).' }
        ]
      },
      queixaPrincipal: 'Febre muito alta de 39 graus com tremedeira de frio e dor forte nas costas do lado direito há 2 dias',
      hda: 'Paciente relata que há 4 dias começou a sentir ardência para urinar (disúria) e aumento da frequência miccional com pouco volume (polaciúria). Não procurou atendimento médico de imediato. Há 48 horas evoluiu com piora clínica importante, caracterizada por febre alta aferida em 39,2°C acompanhada de calafrios intensos e sudorese profusa, associada a dor contínua de forte intensidade (8/10) em região lombar direita e flanco ipsilateral, com irradiação anterior. Apresentou também náuseas e três episódios de vômitos alimentares. Nega hematúria franca macroscópica.',
      pacienteRelata: 'Dor aguda muito forte nas costas que piora a qualquer toque e mal-estar geral com prostração.',
      negativasRelevantes: 'Nega hematúria macroscópica, nega diarreia, dor abdominal difusa em cólica ou corrimento vaginal.',
      hpp: 'Três episódios de cistite aguda no último ano tratados com fosfomicina e nitrofurantoína. Nega nefrolitíase conhecida.',
      historiaFamiliar: 'Mãe com histórico de litíase renal.',
      historiaSocial: 'Nega tabagismo ou etilismo.',
      sintomasAtuais: 'Sintomas conforme descritos na história atual.',
      historiaFisiologica: 'Sem particularidades fisiológicas pregressas relevantes.',
      revisaoSistemas: {
        constitucional: 'Sem outras queixas constitucionais.',
        cardiovascular: 'Sem queixas cardiovasculares adicionais.',
        respiratorio: 'Sem queixas respiratórias adicionais.',
        gastrointestinal: 'Conforme descrito na HDA.',
        geniturinario: 'Sem queixas urinárias.',
        neurologico: 'Vigil, orientado e comunicativo.'
      },
      sinaisVitais: {
        o2Suporte: 'AA',
        diurese: 'Preservada (> 0.5 mL/kg/h)',
        evacuacoes: 'Presentes',
        balanco: 'Neutro',
        pa: '115/75 mmHg',
        fc: '104 bpm',
        fr: '18 irpm',
        tax: '38.9 °C',
        satO2: '98% em ar ambiente',
        glicemia: '98 mg/dL',
        dorEscala: '8/10',
      },
      exameFisico: {
        estadoGeral: 'Regular estado geral, lúcida e orientada no tempo e espaço, prostrada pela febre, sudoreica, desidratada 1+/4+, anictérica, acianótica.',
        ectoscopia: 'Mucosas coradas e discretamente secas, perfusão periférica normal (< 2 segundos).',
        cabecaPescoco: 'Sem linfadenomegalias cervicais.',
        acv: 'Ritmo cardíaco taquicárdico e regular em 2 tempos, sem sopros.',
        aResp: 'Murmúrio vesicular preservado bilateralmente, sem ruídos adventícios.',
        abdome: 'Plano, flácido, doloroso à palpação profunda em flanco direito; ruídos hidroaéreos presentes; sem sinais de peritonite (Blumberg negativo nos 4 quadrantes); ausência de massas palpáveis.',
        extremidades: 'Extremidades aquecidas, sem edema, pulsos cheios.',
        neurologicoPele: 'Punho-percussão lombar direita francamente dolorosa provocando queixa álgica intensa (Sinal de Giordano positivo à direita); punho-percussão lombar esquerda indolor (Giordano negativo à esquerda). Sem déficits neurológicos.',
      },
      hipotesePrincipal: {
        codigoCid: 'N10',
        nomeCid: 'Nefrite túbulo-intersticial aguda (Pielonefrite aguda)',
        justificativa: 'Quadro infeccioso agudo do trato urinário superior com síndrome febril alta, calafrios, bacteremia clínica, dor em flanco com Sinal de Giordano francamente positivo e piúria maciça com leucocitose com desvio.'
      },
      diferenciais: [
        { codigoCid: 'N20.0', nomeCid: 'Calculose do rim / Cólica nefrética', justificativa: 'USG descartou cálculos obstrutivos e ectasia piélica; dor é contínua e associada a febre e leucocitose marcantes.' },
        { codigoCid: 'K35.8', nomeCid: 'Apendicite aguda', justificativa: 'Exame abdominal com fossa ilíaca direita livre, dor localizada em loja renal e EAS francamente patológico.' },
      ],
      sinteseClinica: 'Mulher jovem de 34 anos com pielonefrite aguda direita não-obstrutiva com repercussão sistêmica (febre alta, calafrios e leucocitose), com indicação de antibioticoterapia endovenosa inicial.',
      condutaDiagnostica: 'Acompanhar resultado de urocultura com antibiograma para desescalonamento ou ajuste guiado por sensibilidade bacteriana; dosagem seriada de ureia e creatinina.',
      condutaTerapeutica: 'Ceftriaxona 1g EV a cada 12 horas (ou 2g EV 1x/dia); hidratação vigorosa com Soro Fisiológico 0,9% 1.500 mL/dia para manter bom fluxo urinário; Dipirona 1g EV 6/6h se dor ou febre; Ondansetrona 8mg EV se náuseas.',
      planoNaoFarmacologico: 'Estímulo à ingesta hídrica oral assim que houver tolerância gástrica; repouso no leito.',
      sinaisAlarme: 'Persistência de febre alta após 48-72h de antibiótico adequado (suspeita de abscesso renal/perirrenal com indicação de TC de abdome), oligúria ou hipotensão arterial.',
      cuidadosGerais: 'Manutenção do balanço hídrico, vigilância da curva térmica de 4 em 4 horas.',
      planoAltaSeguimento: 'Transição para antibiótico oral (ex: ciprofloxacino ou conforme TSA) após 48h afebril e estável, completando tempo total de tratamento de 10 a 14 dias; consulta ambulatorial com urocultura de controle após término.',
      examesComplementares: [
        { id: '1', exame: 'Urocultura quantitativa com Antibiograma (TSA)', finalidade: 'Identificar o uropatógeno (ex: E. coli) e guiar terapia oral' },
        { id: '2', exame: 'Hemoculturas (2 pares)', finalidade: 'Avaliar bacteremia associada ao foco renal' }
      ]
    }
  },
];
