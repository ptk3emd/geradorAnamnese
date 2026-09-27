/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ClinicalData,
  Cid10ProtocolItem,
  VitalSigns,
  OutputFormat,
} from '../types/clinical';
import { CID10_PROTOCOLS, findMatchingProtocols } from '../data/cid10Protocols';

/**
 * Regex-based helper to extract duration phrases from clinical texts.
 * Matches patterns like "há 3 dias", "desde ontem", "2 semanas", "4 horas"
 */
export function extractDuration(text: string): string | null {
  if (!text) return null;
  const match = text.match(
    /(?:h[aá]|desde|com\s+dura[cç][aã]o\s+de|por|cerca\s+de)?\s*(\d+|um|dois|tr[eê]s|quatro|cinco)\s*(dias?|horas?|semanas?|meses?|anos?|minutos?)/i,
  );
  if (match) {
    return match[0].trim();
  }
  if (/ontem|hoje\s+de\s+manh[aã]|madrugada/i.test(text)) {
    const timeMatch = text.match(/(?:desde\s+)?(ontem|hoje\s+de\s+manh[aã]|esta\s+madrugada)/i);
    return timeMatch ? timeMatch[0].trim() : null;
  }
  return null;
}

/**
 * Regex-based helper to extract pain scale rating (0 to 10)
 */
export function extractPainScale(text: string): string | null {
  if (!text) return null;
  const match = text.match(/\b(?:dor|intensidade|escala|eva)\s*(?:de|:)?\s*(\d{1,2})\s*(?:\/|de)\s*10\b/i) ||
                text.match(/\bnota\s*(\d{1,2})\s*(?:\/|de)?\s*(?:10)?\b/i) ||
                text.match(/\b(\d{1,2})\/10\b/);
  if (match && match[1]) {
    const val = parseInt(match[1], 10);
    if (val >= 0 && val <= 10) return `${val}/10`;
  }
  return null;
}

/**
 * Regex & Rule-based vital signs interpreter
 */
export interface VitalSignsAssessment {
  paStatus: 'normal' | 'pre-hipertensao' | 'hipertensao-1' | 'hipertensao-2' | 'crise-hipertensiva' | 'hipotensao' | 'indeterminado';
  paDesc: string;
  fcStatus: 'normal' | 'taquicardia' | 'bradicardia' | 'indeterminado';
  fcDesc: string;
  frStatus: 'normal' | 'taquipneia' | 'bradpneia' | 'indeterminado';
  frDesc: string;
  taxStatus: 'afebril' | 'subfebril' | 'febre' | 'hipotermia' | 'indeterminado';
  taxDesc: string;
  satO2Status: 'normal' | 'hipoxemia-leve' | 'hipoxemia-grave' | 'indeterminado';
  satO2Desc: string;
  resumoClinico: string;
}

export function evaluateVitalSigns(vs: VitalSigns): VitalSignsAssessment {
  const result: VitalSignsAssessment = {
    paStatus: 'indeterminado',
    paDesc: 'PA não especificada',
    fcStatus: 'indeterminado',
    fcDesc: 'FC não especificada',
    frStatus: 'indeterminado',
    frDesc: 'FR não especificada',
    taxStatus: 'indeterminado',
    taxDesc: 'Tax não especificada',
    satO2Status: 'indeterminado',
    satO2Desc: 'SatO2 não especificada',
    resumoClinico: ''
  };

  // Evaluate PA: pattern like "120x80" or "140/90"
  if (vs.pa) {
    const paMatch = vs.pa.match(/(\d{2,3})\s*(?:x|\/|\s)\s*(\d{2,3})/);
    if (paMatch) {
      const pas = parseInt(paMatch[1], 10);
      const pad = parseInt(paMatch[2], 10);
      if (pas >= 180 || pad >= 120) {
        result.paStatus = 'crise-hipertensiva';
        result.paDesc = `Níveis tensionais marcadamente elevados (${vs.pa} mmHg - alerta para crise hipertensiva)`;
      } else if (pas >= 160 || pad >= 100) {
        result.paStatus = 'hipertensao-2';
        result.paDesc = `Hipertensão arterial estágio 2 (${vs.pa} mmHg)`;
      } else if (pas >= 140 || pad >= 90) {
        result.paStatus = 'hipertensao-1';
        result.paDesc = `Hipertensão arterial estágio 1 (${vs.pa} mmHg)`;
      } else if (pas < 90 || pad < 60) {
        result.paStatus = 'hipotensao';
        result.paDesc = `Hipotensão arterial sistêmica (${vs.pa} mmHg)`;
      } else if (pas >= 120 || pad >= 80) {
        result.paStatus = 'pre-hipertensao';
        result.paDesc = `Pressão arterial limítrofe/pré-hipertensa (${vs.pa} mmHg)`;
      } else {
        result.paStatus = 'normal';
        result.paDesc = `Normotenso (${vs.pa} mmHg)`;
      }
    }
  }

  // Evaluate FC
  if (vs.fc) {
    const fcVal = parseInt(vs.fc.replace(/\D/g, ''), 10);
    if (!isNaN(fcVal)) {
      if (fcVal > 100) {
        result.fcStatus = 'taquicardia';
        result.fcDesc = `Taquicárdico (${fcVal} bpm)`;
      } else if (fcVal < 55) {
        result.fcStatus = 'bradicardia';
        result.fcDesc = `Bradicárdico (${fcVal} bpm)`;
      } else {
        result.fcStatus = 'normal';
        result.fcDesc = `Normocárdico (${fcVal} bpm)`;
      }
    }
  }

  // Evaluate FR
  if (vs.fr) {
    const frVal = parseInt(vs.fr.replace(/\D/g, ''), 10);
    if (!isNaN(frVal)) {
      if (frVal > 20) {
        result.frStatus = 'taquipneia';
        result.frDesc = `Taquipneico (${frVal} irpm)`;
      } else if (frVal < 12) {
        result.frStatus = 'bradpneia';
        result.frDesc = `Bradipneico (${frVal} irpm)`;
      } else {
        result.frStatus = 'normal';
        result.frDesc = `Eupneico (${frVal} irpm)`;
      }
    }
  }

  // Evaluate Tax
  if (vs.tax) {
    const cleanTax = vs.tax.replace(',', '.').match(/(\d+\.?\d*)/);
    if (cleanTax) {
      const taxVal = parseFloat(cleanTax[1]);
      if (taxVal >= 37.8) {
        result.taxStatus = 'febre';
        result.taxDesc = `Febril (${taxVal}°C)`;
      } else if (taxVal >= 37.3) {
        result.taxStatus = 'subfebril';
        result.taxDesc = `Estado subfebril (${taxVal}°C)`;
      } else if (taxVal < 35.5) {
        result.taxStatus = 'hipotermia';
        result.taxDesc = `Hipotérmico (${taxVal}°C)`;
      } else {
        result.taxStatus = 'afebril';
        result.taxDesc = `Afebril (${taxVal}°C)`;
      }
    }
  }

  // Evaluate SatO2
  if (vs.satO2) {
    const satVal = parseInt(vs.satO2.replace(/\D/g, ''), 10);
    if (!isNaN(satVal)) {
      if (satVal < 90) {
        result.satO2Status = 'hipoxemia-grave';
        result.satO2Desc = `Dessaturação / Hipoxemia grave (${satVal}% em ${vs.o2Suporte || 'AA'})`;
      } else if (satVal < 94) {
        result.satO2Status = 'hipoxemia-leve';
        result.satO2Desc = `Saturação limítrofe/baixa (${satVal}% em ${vs.o2Suporte || 'AA'})`;
      } else {
        result.satO2Status = 'normal';
        result.satO2Desc = `Oximetria adequada (${satVal}% em ${vs.o2Suporte || 'AA'})`;
      }
    }
  }

  // Build summary sentence
  const components: string[] = [];
  if (result.taxStatus === 'afebril') components.push('afebril');
  else if (result.taxStatus === 'febre') components.push('febril');

  if (result.paStatus === 'normal' && result.fcStatus === 'normal') {
    components.push('hemodinamicamente estável');
  } else if (result.paStatus === 'hipotensao' || result.fcStatus === 'taquicardia') {
    components.push('com instabilidade pressórica/frequência');
  }

  if (result.frStatus === 'normal' && result.satO2Status === 'normal') {
    components.push('eupneico em ar ambiente');
  } else if (result.frStatus === 'taquipneia' || result.satO2Status !== 'normal') {
    components.push('com esforço/taquipneia ventilatória');
  }

  result.resumoClinico = components.length > 0 ? components.join(', ') : 'Parâmetros vitais aferidos.';
  return result;
}

/**
 * Pure Regex and rule-based diagnostic hypothesis detector.
 * Identifies matches without external AI, guaranteeing clinical determinism.
 */
export function detectClinicalHypotheses(data: ClinicalData): {
  primary: Cid10ProtocolItem | null;
  suggestions: Cid10ProtocolItem[];
  reason: string;
} {
  const combinedCorpus = [
    data.queixaPrincipal,
    data.hda,
    data.pacienteRelata,
    data.sintomasAtuais,
    data.resumoProblemas.motivoInternacao,
    data.resumoProblemas.intercorrencias,
    data.resumoProblemas.comorbidadesAlergias,
    data.exameFisico.acv,
    data.exameFisico.aResp,
    data.exameFisico.abdome,
    data.exameFisico.extremidades,
    data.exameFisico.neurologicoPele,
    data.sinteseClinica
  ].filter(Boolean).join(' ');

  const matches = findMatchingProtocols(combinedCorpus);

  if (matches.length === 0) {
    return {
      primary: null,
      suggestions: CID10_PROTOCOLS.slice(0, 4), // default fallbacks
      reason: 'Nenhum padrão sindrômico específico detectado por regex nas queixas registradas.'
    };
  }

  // If user already specified an explicit diagnosis or CID in data.hipotesePrincipal
  if (data.hipotesePrincipal?.codigoCid) {
    const existing = CID10_PROTOCOLS.find(p => p.cid === data.hipotesePrincipal.codigoCid);
    if (existing) {
      return {
        primary: existing,
        suggestions: matches.filter(m => m.id !== existing.id),
        reason: `Mapeado conforme código CID-10 selecionado (${existing.cid}).`
      };
    }
  }

  const primary = matches[0];
  const suggestions = matches.slice(1);
  return {
    primary,
    suggestions,
    reason: `Identificado pelo motor de regras clínicas a partir dos termos: "${primary.sinonimos.slice(0, 3).join(', ')}"`
  };
}

/**
 * Text synthesis engine adapting grammar, structure and protocol compliance.
 */
export function generateClinicalDocument(data: ClinicalData, format: OutputFormat = data.formatoSaida): string {
  const isEvolucao = data.tipo === 'evolucao';
  const vsAss = evaluateVitalSigns(data.sinaisVitais);
  const detected = detectClinicalHypotheses(data);
  const activeProtocol = detected.primary;

  // Gender agreement
  const pronome = data.identificacao.sexo === 'F' ? 'Paciente feminina' : data.identificacao.sexo === 'M' ? 'Paciente masculino' : 'Paciente';
  const corado = data.identificacao.sexo === 'F' ? 'corada' : 'corado';
  const hidratado = data.identificacao.sexo === 'F' ? 'hidratada' : 'hidratado';
  const eupneico = data.identificacao.sexo === 'F' ? 'eupneica' : 'eupneico';
  const afebril = 'afebril';
  const lucido = data.identificacao.sexo === 'F' ? 'lúcida e orientada' : 'lúcido e orientado';

  const idadeStr = data.identificacao.idade ? `${data.identificacao.idade} ${data.identificacao.idadeUnidade}` : 'idade não informada';
  const leitoStr = data.identificacao.leito ? `leito ${data.identificacao.leito}` : '';
  const dataHoraStr = `${data.identificacao.data || new Date().toLocaleDateString('pt-BR')} - ${data.identificacao.hora || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  const respStr = data.identificacao.responsavel || 'Assinatura do Usuário';

  // Format 1: SOAP com Problemas numerados (Strict match to Page 1, 2, 5 of PDF)
  if (format === 'soap-problemas' || (isEvolucao && format === 'completo')) {
    const lines: string[] = [];

    // Cabeçalho
    lines.push('================================================================================');
    lines.push('                       EVOLUÇÃO MÉDICA DIÁRIA - MODELO COMPLETO                 ');
    lines.push('================================================================================');
    lines.push(`Paciente/iniciais: ${data.identificacao.nomeIniciais || 'Não informado'}   |   Idade: ${idadeStr}   |   Leito: ${data.identificacao.leito || 'N/I'}`);
    lines.push(`Data/Hora: ${dataHoraStr}   |   Usuário: ${respStr}`);
    lines.push('');

    // Resumo Inicial por problemas (#1 a #7)
    lines.push('--- RESUMO INICIAL POR PROBLEMAS ---');
    lines.push(`#1. Tempo de internação: ${data.resumoProblemas.tempoInternacao || 'D1 IH'}`);
    lines.push(`#2. Motivo/diagnóstico da internação: ${data.resumoProblemas.motivoInternacao || (activeProtocol ? activeProtocol.nome : 'A esclarecer')}`);
    lines.push(`#3. Intercorrências durante a internação: ${data.resumoProblemas.intercorrencias || 'Sem intercorrências nas últimas 24 horas.'}`);
    lines.push(`#4. Comorbidades e alergias relevantes: ${data.resumoProblemas.comorbidadesAlergias || 'Sem comorbidades ou alergias conhecidas relatadas.'}`);
    lines.push(`#5. Tratamentos com início/fim definidos: ${data.resumoProblemas.tratamentosFimDefinido || 'Sem antibioticoterapia ou tratamentos de tempo determinado vigentes.'}`);
    lines.push(`#6. Acessos, dispositivos e suporte: ${data.resumoProblemas.acessosDispositivos || 'Em ar ambiente, sem dispositivos invasivos.'}`);
    
    // #7 Exames
    lines.push('#7. Exames relevantes por data:');
    if (data.resumoProblemas.examesPorData && data.resumoProblemas.examesPorData.length > 0) {
      data.resumoProblemas.examesPorData.forEach((ex) => {
        lines.push(`    • [${ex.data || 'Recente'}]: ${ex.resultado}`);
      });
    } else {
      lines.push('    • Sem exames laboratoriais/gráficos pendentes no momento.');
    }
    lines.push('');

    // Sinais Vitais e Balanço
    lines.push('--- SINAIS VITAIS E BALANÇO DAS ÚLTIMAS 24 HORAS ---');
    const satStr = data.sinaisVitais.satO2 ? `${data.sinaisVitais.satO2}% (${data.sinaisVitais.o2Suporte || 'AA'})` : 'N/I';
    lines.push(`PA: ${data.sinaisVitais.pa || 'N/I'} mmHg  |  FC: ${data.sinaisVitais.fc || 'N/I'} bpm  |  FR: ${data.sinaisVitais.fr || 'N/I'} irpm  |  Tax: ${data.sinaisVitais.tax || 'N/I'}°C  |  SatO2: ${satStr}`);
    lines.push(`Diurese / Evacuações / Balanço: ${data.sinaisVitais.diurese || 'Diurese espontânea'} / ${data.sinaisVitais.evacuacoes || 'presentes'} / Balanço: ${data.sinaisVitais.balanco || 'zerado'}`);
    if (data.sinaisVitais.glicemia) lines.push(`Glicemia capilar: ${data.sinaisVitais.glicemia}`);
    if (data.sinaisVitais.dorEscala) lines.push(`Escala de dor: ${data.sinaisVitais.dorEscala}`);
    lines.push('');

    // Subjetivo - S
    lines.push('--- SUBJETIVO (S) ---');
    const relatos = data.pacienteRelata || (data.queixaPrincipal ? `Refere ${data.queixaPrincipal}.` : 'Paciente sem queixas ativas no momento.');
    lines.push(`• Relato do paciente: ${relatos}`);
    if (data.sintomasAtuais) lines.push(`• Sintomas atuais: ${data.sintomasAtuais}`);
    if (data.negativasRelevantes) lines.push(`• Negativas relevantes: ${data.negativasRelevantes}`);
    lines.push('');

    // Objetivo - O
    lines.push('--- OBJETIVO (O) ---');
    lines.push(`• Estado Geral: ${data.exameFisico.estadoGeral || `Bom estado geral, ${lucido}, ${corado}, ${hidratado}, ${afebril}.`}`);
    if (data.exameFisico.ectoscopia) lines.push(`• Ectoscopia: ${data.exameFisico.ectoscopia}`);
    lines.push(`• ACV: ${data.exameFisico.acv || 'RCR, 2T, BNF, sem sopros auscultáveis.'}`);
    lines.push(`• AResp: ${data.exameFisico.aResp || `MVUA, sem ruídos adventícios, ${eupneico}.`}`);
    lines.push(`• Abdome: ${data.exameFisico.abdome || 'Plano, flácido, RHA presentes, indolor à palpação, sem massas ou visceromegalias.'}`);
    lines.push(`• MMII / Extremidades: ${data.exameFisico.extremidades || 'Sem edema, panturrilhas livres, pulsos periféricos palpáveis e simétricos.'}`);
    if (data.exameFisico.neurologicoPele) lines.push(`• Neurológico / Pele / Outros: ${data.exameFisico.neurologicoPele}`);
    lines.push('');

    // Impressão - A
    lines.push('--- IMPRESSÃO / AVALIAÇÃO (A) ---');
    const sinteseDefault = `Paciente ${data.sinaisVitais.tax ? (parseFloat(data.sinaisVitais.tax.replace(',', '.')) >= 37.8 ? 'febril' : 'afebril') : 'afebril'}, clinicamente estável, mantendo parâmetros vitais controlados e boa tolerância às condutas instituídas.`;
    lines.push(data.sinteseClinica || sinteseDefault);
    if (data.hipotesePrincipal?.nomeCid) {
      lines.push(`Hipótese Principal: ${data.hipotesePrincipal.nomeCid} (CID-10: ${data.hipotesePrincipal.codigoCid || 'N/I'})`);
    } else if (activeProtocol) {
      lines.push(`Hipótese Principal: ${activeProtocol.nome} (CID-10: ${activeProtocol.cid})`);
    }
    if (data.diferenciais && data.diferenciais.length > 0) {
      lines.push('Diagnósticos diferenciais / em investigação:');
      data.diferenciais.forEach(d => lines.push(`  - ${d.nomeCid} ${d.codigoCid ? `(CID-10: ${d.codigoCid})` : ''}`));
    } else if (activeProtocol?.diferenciaisComuns) {
      lines.push('Diagnósticos diferenciais sugeridos pelo protocolo:');
      activeProtocol.diferenciaisComuns.forEach(d => lines.push(`  - ${d}`));
    }
    lines.push('');

    // Conduta - P
    lines.push('--- CONDUTA (P) ---');
    lines.push(`1. Conduta diagnóstica: ${data.condutaDiagnostica || (activeProtocol?.examesSugeridos ? activeProtocol.examesSugeridos.map(e => `${e.exame} (${e.finalidade})`).join('; ') : 'Manter monitorização e reavaliar necessidade de novos exames conforme evolução clínica.')}`);
    lines.push(`2. Conduta terapêutica: ${data.condutaTerapeutica || activeProtocol?.condutaTerapeuticaSugerida || 'Prescrição hospitalar mantida com ajustes pontuais.'}`);
    lines.push(`3. Cuidados gerais: ${data.cuidadosGerais || activeProtocol?.cuidadosGeraisSugeridos || 'Dieta habitual branda, estímulo à mobilização precoce, profilaxia de TEV conforme escore.'}`);
    lines.push(`4. Plano de alta / seguimento: ${data.planoAltaSeguimento || activeProtocol?.orientacoesAlta || 'Conduta mantida, reavaliar em 24h ou antes se intercorrências.'}`);
    lines.push('');
    lines.push('________________________________________________________________');
    lines.push(`${respStr}`);

    return lines.join('\n');
  }

  // Format 2: Sintético (passagem de plantão / resumo rápido - matching Page 5 of PDF)
  if (format === 'sintetico') {
    const lines: string[] = [];
    lines.push(`ID: ${data.identificacao.nomeIniciais || 'Paciente'}, ${idadeStr}${leitoStr ? `, ${leitoStr}` : ''}. Data/hora: ${dataHoraStr}.`);
    lines.push(`#1 ${data.resumoProblemas.tempoInternacao || 'D1 IH'}. #2 ${data.resumoProblemas.motivoInternacao || (activeProtocol ? activeProtocol.nome : 'A esclarecer')}. #3 ${data.resumoProblemas.intercorrencias || 'Sem intercorrências nas últimas 24 h'}. #4 ${data.resumoProblemas.comorbidadesAlergias || 'Sem comorbidades registradas'}. #5 ${data.resumoProblemas.tratamentosFimDefinido || 'Sem ATB ativo'}. #6 ${data.resumoProblemas.acessosDispositivos || 'Em AA, sem dispositivos'}. #7 ${data.resumoProblemas.examesPorData?.[0]?.resultado || 'Exames de rotina estáveis'}.`);
    lines.push(`S: ${data.pacienteRelata || data.queixaPrincipal || 'Refere melhora dos sintomas, nega queixas agudas.'}${data.negativasRelevantes ? ` ${data.negativasRelevantes}.` : ''}`);
    lines.push(`O: PA ${data.sinaisVitais.pa || '120x80'}, FC ${data.sinaisVitais.fc || '80'}, FR ${data.sinaisVitais.fr || '16'}, SatO2 ${data.sinaisVitais.satO2 || '98'}% ${data.sinaisVitais.o2Suporte || 'AA'}. ${data.exameFisico.estadoGeral || 'Bom estado geral'}. ACV: ${data.exameFisico.acv || 'RCR, 2T, BNF, sem sopros'}. AResp: ${data.exameFisico.aResp || 'MVUA, sem RA'}. Abdome: ${data.exameFisico.abdome || 'sem alterações'}. MMII: ${data.exameFisico.extremidades || 'sem edema'}.`);
    lines.push(`A: ${data.sinteseClinica || (activeProtocol ? `${activeProtocol.nome} com estabilidade clínica e boa evolução.` : 'Evolui estável, mantendo controle hemodinâmico e clínico.')}`);
    lines.push(`P: ${data.condutaTerapeutica || activeProtocol?.condutaTerapeuticaSugerida || 'Conduta mantida, reavaliar em 24h ou antes se intercorrências.'} ${data.condutaDiagnostica ? `Solicitado: ${data.condutaDiagnostica}.` : ''}`);
    return lines.join('\n');
  }

  // Format: Roteiro Pedagógico para Anamnese (MCCP - Método Clínico Centrado na Pessoa)
  if (format === 'pedagogico-mccp') {
    const lines: string[] = [];
    lines.push('================================================================================');
    lines.push('          ANAMNESE PEDAGÓGICA CENTRADA NA PESSOA (MCCP & SEMIOLOGIA)           ');
    lines.push('================================================================================');
    lines.push('');
    lines.push('1. IDENTIFICAÇÃO DO PACIENTE');
    lines.push(`• Nome/Iniciais: ${data.identificacao.nomeIniciais || 'Não identificado'}`);
    lines.push(`• Idade: ${idadeStr}   |   Gênero/Sexo: ${data.identificacao.sexo === 'F' ? 'Feminino' : data.identificacao.sexo === 'M' ? 'Masculino' : 'Outro'}`);
    if (data.identificacao.corEtnia) lines.push(`• Cor/Etnia: ${data.identificacao.corEtnia}   |   Estado Civil: ${data.identificacao.estadoCivil || 'Não informado'}`);
    lines.push(`• Ocupação: ${data.identificacao.ocupacao || 'Não informada'}   |   Procedência: ${data.identificacao.procedencia || data.identificacao.naturalidade || 'Não informada'}`);
    if (data.identificacao.escolaridade) lines.push(`• Escolaridade: ${data.identificacao.escolaridade}   |   Religião: ${data.identificacao.religiao || 'Não informada'}`);
    lines.push(`• Informante: ${data.identificacao.acompanhante || 'O próprio paciente'} (Confiabilidade: ${data.identificacao.confiabilidade || 'boa'})`);
    lines.push(`• Data/Hora da Consulta: ${dataHoraStr}   |   Médico / Examinador: ${respStr}`);
    lines.push('');

    lines.push('2. QUEIXA PRINCIPAL (QP)');
    lines.push(`"${data.queixaPrincipal || data.pacienteRelata || 'Avaliação clínica geral'}"`);
    lines.push('');

    lines.push('3. HISTÓRIA DA DOENÇA ATUAL (HDA)');
    lines.push(data.hda || 'Histórico clínico da afecção atual em narrativa cronológica.');
    lines.push('');

    lines.push('4. EXPERIÊNCIA DA DOENÇA PELO PACIENTE (MODELO FIFE)');
    const fife = data.experienciaDoencaFife;
    lines.push(`• F - Sentimentos (Feelings): ${fife?.sentimentos || 'O paciente não expressou temores ou medos desproporcionais de forma espontânea.'}`);
    lines.push(`• I - Ideias (Ideas): ${fife?.ideias || 'O paciente não tem hipótese prévia definida sobre a causa de seus sintomas.'}`);
    lines.push(`• F - Função (Function): ${fife?.funcao || 'Sem prejuízo significativo documentado nas atividades laborais e de vida diária.'}`);
    lines.push(`• E - Expectativas (Expectations): ${fife?.expectativas || 'Espera alívio dos sintomas e esclarecimento quanto ao diagnóstico.'}`);
    lines.push('');

    lines.push('5. ANTECEDENTES PESSOAIS E HÁBITOS DE VIDA');
    lines.push(`• Comorbidades / Patológicos (HPP): ${data.hpp || 'Sem comorbidades prévias conhecidas. Nega alergias ou cirurgias.'}`);
    if (data.antecedentesFisiologicos) lines.push(`• Fisiológicos (APF): ${data.antecedentesFisiologicos}`);
    lines.push(`• Histórico Familiar (AF): ${data.historiaFamiliar || 'Nega antecedentes familiares precoces relevantes.'}`);
    const hab = data.habitosVidaDetalhado;
    if (hab && hab.tabagismoStatus) {
      lines.push(`• Tabagismo: ${hab.tabagismoStatus === 'fumante-ativo' ? `Fumante ativo (${hab.cigarrosDia} cig/dia por ${hab.anosFumo} anos = ${hab.cargaTabagicaAnosMaco} anos-maço)` : hab.tabagismoStatus === 'ex-fumante' ? `Ex-fumante (${hab.cargaTabagicaAnosMaco} anos-maço)` : 'Não fumante'}`);
    }
    lines.push(`• Hábitos e Vida Social: ${data.historiaSocial || 'Residência com saneamento adequado; nega etilismo abusivo ou uso de drogas ilícitas.'}`);
    lines.push('');

    lines.push('6. EXAME FÍSICO DIRECIONADO');
    lines.push(`• Sinais Vitais: PA: ${data.sinaisVitais.pa || '120x80'} mmHg | FC: ${data.sinaisVitais.fc || '75'} bpm | FR: ${data.sinaisVitais.fr || '16'} irpm | SatO2: ${data.sinaisVitais.satO2 || '98'}% | Tax: ${data.sinaisVitais.tax || '36.5'}°C`);
    lines.push(`• Ectoscopia / Geral: ${data.exameFisico.estadoGeral || 'Bom estado geral, lúcido e orientado.'}`);
    if (data.exameFisico.cabecaPescoco) lines.push(`• Cabeça e Pescoço: ${data.exameFisico.cabecaPescoco}`);
    lines.push(`• Aparelho Respiratório: ${data.exameFisico.aResp || 'Murmúrio vesicular presente bilateralmente, sem ruídos adventícios.'}`);
    lines.push(`• Aparelho Cardiovascular: ${data.exameFisico.acv || 'Ritmo cardíaco regular em 2 tempos, bulhas normofonéticas.'}`);
    lines.push(`• Abdome: ${data.exameFisico.abdome || 'Plano, flácido, indolor à palpação, sem visceromegalias.'}`);
    lines.push(`• Extremidades: ${data.exameFisico.extremidades || 'Aquecidas, bem perfundidas, sem edemas.'}`);
    if (data.exameFisico.neurologicoPele) lines.push(`• Neurológico e Pele: ${data.exameFisico.neurologicoPele}`);
    lines.push('');

    lines.push('7. RACIOCÍNIO CLÍNICO SEMIOLÓGICO EM TRÊS NÍVEIS');
    const rac = data.raciocinioClinico;
    lines.push(`• 1. Diagnóstico Sindrômico: ${rac?.sindromico || 'Definição sindrômica baseada no conjunto de sinais e sintomas.'}`);
    lines.push(`• 2. Diagnóstico Topográfico: ${rac?.topografico || 'Topografia ou órgão acometido pelo processo patológico.'}`);
    lines.push(`• 3. Diagnóstico Etiológico (CID-10): ${data.hipotesePrincipal.nomeCid ? `${data.hipotesePrincipal.nomeCid} (CID-10: ${data.hipotesePrincipal.codigoCid || 'N/I'})` : (rac?.etiologico || 'A esclarecer')}`);
    if (data.hipotesePrincipal.justificativa) lines.push(`  Justificativa Semiológica: ${data.hipotesePrincipal.justificativa}`);
    if (data.diferenciais && data.diferenciais.length > 0) {
      lines.push('• Diagnósticos Diferenciais:');
      data.diferenciais.forEach(d => lines.push(`  - ${d.nomeCid} ${d.codigoCid ? `(CID-10: ${d.codigoCid})` : ''}: ${d.justificativa || 'Considerado no diagnóstico diferencial.'}`));
    }
    lines.push('');

    lines.push('8. PLANO TERAPÊUTICO COMPARTILHADO & ORIENTAÇÕES');
    lines.push(`• Conduta Farmacológica: ${data.condutaTerapeutica || 'Prescrição terapêutica inicial pactuada.'}`);
    if (data.planoNaoFarmacologico) lines.push(`• Plano Não-Farmacológico: ${data.planoNaoFarmacologico}`);
    if (data.sinaisAlarme) lines.push(`• Sinais de Alarme (Red Flags) para Retorno Imediato: ${data.sinaisAlarme}`);
    lines.push(`• Exames Propedêuticos: ${data.examesComplementares && data.examesComplementares.length > 0 ? data.examesComplementares.map((e, idx) => `${idx + 1}. ${e.exame} (${e.finalidade})`).join('; ') : 'Sem exames adicionais nesta consulta.'}`);
    lines.push(`• Seguimento e Critérios de Retorno: ${data.planoAltaSeguimento || 'Retorno programado para acompanhamento ambulatorial.'}`);
    lines.push('');
    lines.push('________________________________________________________________');
    lines.push(`${respStr}`);

    return lines.join('\n');
  }

  // Format 3 & 4: Anamnese Médica Completa (Matching PUCRS & Roteiro Adulto)
  const lines: string[] = [];
  lines.push('================================================================================');
  lines.push('               ANAMNESE MÉDICA COMPLETA DO PACIENTE ADULTO                      ');
  lines.push('================================================================================');
  lines.push('');
  lines.push('1. IDENTIFICAÇÃO (ID)');
  lines.push(`• Nome/Iniciais: ${data.identificacao.nomeIniciais || 'Não identificado'}`);
  lines.push(`• Idade: ${idadeStr}   |   Sexo: ${data.identificacao.sexo === 'F' ? 'Feminino' : data.identificacao.sexo === 'M' ? 'Masculino' : 'Outro'}`);
  if (data.identificacao.corEtnia) lines.push(`• Cor/Etnia: ${data.identificacao.corEtnia}   |   Estado Civil: ${data.identificacao.estadoCivil || 'Não informado'}`);
  lines.push(`• Naturalidade: ${data.identificacao.naturalidade || 'Não informada'}   |   Procedência: ${data.identificacao.procedencia || data.identificacao.naturalidade || 'Não informada'}`);
  lines.push(`• Ocupação: ${data.identificacao.ocupacao || 'Não informada'}`);
  if (data.identificacao.religiao) lines.push(`• Religião/Espiritualidade: ${data.identificacao.religiao}   |   Escolaridade: ${data.identificacao.escolaridade || 'Não informada'}`);
  if (data.identificacao.filiacao) lines.push(`• Nome da Mãe / Filiação: ${data.identificacao.filiacao}`);
  if (data.identificacao.convenioSus) lines.push(`• Convênio / SUS: ${data.identificacao.convenioSus}   |   Leito/Enfermaria: ${data.identificacao.leito || data.identificacao.clinicaEnfermaria || 'N/I'}`);
  lines.push(`• Acompanhante / Informante: ${data.identificacao.acompanhante || 'O próprio paciente'} (Confiabilidade: ${data.identificacao.confiabilidade || 'boa'})`);
  lines.push(`• Data/Hora do Atendimento: ${dataHoraStr}   |   Responsável: ${respStr}`);
  lines.push('');

  lines.push('2. QUEIXA PRINCIPAL (QP)');
  lines.push(`"${data.queixaPrincipal || data.pacienteRelata || 'Avaliação clínica geral'}"`);
  lines.push('');

  lines.push('3. HISTÓRIA DA DOENÇA ATUAL (HDA)');
  if (data.hda) {
    lines.push(data.hda);
  } else {
    // Generate adaptive narrative via regex
    const duration = extractDuration(data.queixaPrincipal);
    const pain = extractPainScale(data.queixaPrincipal);
    let narrative = `${pronome}, ${idadeStr}, procurou assistência médica referindo quadro de ${data.queixaPrincipal || 'mal-estar geral'}`;
    if (duration) narrative += `, iniciado há aproximadamente ${duration}`;
    if (pain) narrative += `, com dor avaliada em ${pain}`;
    narrative += '. ';
    if (data.sintomasAtuais) narrative += `Refere como sintomas associados: ${data.sintomasAtuais}. `;
    if (data.negativasRelevantes) narrative += `Ao interrogatório direcionado, ${data.negativasRelevantes}. `;
    lines.push(narrative);
  }
  lines.push('');

  if (data.experienciaDoencaFife?.sentimentos || data.experienciaDoencaFife?.ideias) {
    lines.push('4. REPERCUSSÃO PSICOSSOCIAL & PERSPECTIVA DO PACIENTE (FIFE)');
    lines.push(`• Sentimentos/Medos: ${data.experienciaDoencaFife.sentimentos || 'Não expressados'}`);
    lines.push(`• Ideias do Paciente: ${data.experienciaDoencaFife.ideias || 'Não expressadas'}`);
    lines.push(`• Impacto Funcional: ${data.experienciaDoencaFife.funcao || 'Sem impacto restritivo documentado'}`);
    lines.push(`• Expectativas: ${data.experienciaDoencaFife.expectativas || 'Alívio sintomático'}`);
    lines.push('');
  }

  lines.push('5. ANTECEDENTES PESSOAIS PATOLÓGICOS (HPP)');
  lines.push(data.hpp || 'Nega comorbidades crônicas (HAS, DM, nefropatia), internações ou cirurgias prévias. Nega alergias medicamentosas ou alimentares. Sem medicações de uso contínuo.');
  lines.push('');

  lines.push('6. HISTÓRIA FAMILIAR');
  lines.push(data.historiaFamiliar || 'Nega histórico familiar precoce de doença cardiovascular, neoplasias ou condições genéticas de relevância.');
  lines.push('');

  lines.push('7. HISTÓRIA FISIOLÓGICA');
  lines.push(data.historiaFisiologica || data.antecedentesFisiologicos || 'Padrão de sono preservado. Alimentação habitual equilibrada. Eliminações fisiológicas (diurese e hábito intestinal) sem alterações relatadas.');
  lines.push('');

  lines.push('8. HÁBITOS DE VIDA & HISTÓRIA SOCIAL');
  const hab = data.habitosVidaDetalhado;
  if (hab?.tabagismoStatus) {
    lines.push(`• Tabagismo: ${hab.tabagismoStatus === 'fumante-ativo' ? `Fumante ativo (${hab.cigarrosDia} cigarros/dia por ${hab.anosFumo} anos | Carga Tabágica: ${hab.cargaTabagicaAnosMaco} anos-maço)` : hab.tabagismoStatus === 'ex-fumante' ? `Ex-fumante (${hab.cargaTabagicaAnosMaco} anos-maço)` : 'Não fumante'}`);
  }
  if (hab?.etilismo) lines.push(`• Etilismo: ${hab.etilismo}`);
  lines.push(data.historiaSocial || 'Reside em domicílio de alvenaria com saneamento básico completo. Nega uso de substâncias ilícitas. Refere suporte familiar adequado.');
  lines.push('');

  lines.push('9. INTERROGATÓRIO SINTOMATOLÓGICO / REVISÃO DE SISTEMAS (ISDA)');
  const rs = data.revisaoSistemas;
  lines.push(`• Constitucional / Geral: ${rs.constitucional || 'Nega febre, perda ponderal inexplicada ou astenia.'}`);
  if (rs.cabecaPescoco) lines.push(`• Cabeça e Pescoço: ${rs.cabecaPescoco}`);
  lines.push(`• Aparelho Respiratório: ${rs.respiratorio || 'Nega dispneia, tosse produtiva, expectoração purulenta ou sibilância.'}`);
  lines.push(`• Aparelho Cardiovascular: ${rs.cardiovascular || 'Nega dor torácica típica, palpitações, síncope ou edema de membros inferiores.'}`);
  lines.push(`• Aparelho Digestório: ${rs.gastrointestinal || 'Nega dor abdominal aguda, náuseas, vômitos, diarreia ou enterorragia.'}`);
  lines.push(`• Aparelho Geniturinário: ${rs.geniturinario || 'Nega disúria, polaciúria, hematúria ou retenção urinária.'}`);
  if (rs.osteoarticular) lines.push(`• Aparelho Osteoarticular: ${rs.osteoarticular}`);
  lines.push(`• Sistema Nervoso: ${rs.neurologico || 'Nega cefaleia holocraniana, déficits focais motores/sensitivos ou episódios convulsivos.'}`);
  if (rs.peleAnexos) lines.push(`• Pele e Fâneros: ${rs.peleAnexos}`);
  lines.push('');

  lines.push('10. EXAME FÍSICO SISTEMATIZADO');
  lines.push(`• Sinais Vitais: PA: ${data.sinaisVitais.pa || '120x80'} mmHg | FC: ${data.sinaisVitais.fc || '75'} bpm | FR: ${data.sinaisVitais.fr || '16'} irpm | Tax: ${data.sinaisVitais.tax || '36.5'}°C | SatO2: ${data.sinaisVitais.satO2 || '98'}% (${data.sinaisVitais.o2Suporte || 'AA'})`);
  lines.push(`• Ectoscopia / Geral: ${data.exameFisico.estadoGeral || `Bom estado geral, ${lucido}, ${corado}, ${hidratado}, anictérico, acianótico, ${afebril}.`}`);
  if (data.exameFisico.cabecaPescoco) lines.push(`• Cabeça e Pescoço: ${data.exameFisico.cabecaPescoco}`);
  lines.push(`• Aparelho Cardiovascular (ACV): ${data.exameFisico.acv || 'Ritmo cardíaco regular em dois tempos, bulhas normofonéticas, sem sopros auscultáveis.'}`);
  lines.push(`• Aparelho Respiratório (AResp): ${data.exameFisico.aResp || `Murmúrio vesicular universalmente audível, sem ruídos adventícios, ${eupneico}.`}`);
  lines.push(`• Abdome: ${data.exameFisico.abdome || 'Plano, flácido, ruídos hidroaéreos presentes e normoativos, indolor à palpação superficial e profunda, sem visceromegalias, descompressão brusca negativa.'}`);
  lines.push(`• Extremidades: ${data.exameFisico.extremidades || 'Aquecidas e bem perfundidas (TEC < 2s), sem edemas, pulsos periféricos amplos e simétricos.'}`);
  if (data.exameFisico.neurologicoPele) lines.push(`• Neurológico: ${data.exameFisico.neurologicoPele}`);
  lines.push('');

  lines.push('11. HIPÓTESES DIAGNÓSTICAS & RACIOCÍNIO CLÍNICO');
  if (data.raciocinioClinico?.sindromico || data.raciocinioClinico?.topografico) {
    if (data.raciocinioClinico.sindromico) lines.push(`• Diagnóstico Sindrômico: ${data.raciocinioClinico.sindromico}`);
    if (data.raciocinioClinico.topografico) lines.push(`• Diagnóstico Topográfico: ${data.raciocinioClinico.topografico}`);
  }
  const mainHypo = data.hipotesePrincipal?.nomeCid
    ? `${data.hipotesePrincipal.nomeCid} (CID-10: ${data.hipotesePrincipal.codigoCid || 'N/I'})`
    : activeProtocol
    ? `${activeProtocol.nome} (CID-10: ${activeProtocol.cid})`
    : 'A esclarecer';
  lines.push(`• Hipótese Diagnóstica Principal: ${mainHypo}`);
  if (data.hipotesePrincipal?.justificativa) {
    lines.push(`  Justificativa Semiológica: ${data.hipotesePrincipal.justificativa}`);
  }

  lines.push('• Diferenciais Relevantes:');
  if (data.diferenciais && data.diferenciais.length > 0) {
    data.diferenciais.forEach(d => lines.push(`  - ${d.nomeCid} ${d.codigoCid ? `(CID-10: ${d.codigoCid})` : ''}: ${d.justificativa || 'Considerado no raciocínio sindrômico diferencial.'}`));
  } else if (activeProtocol?.diferenciaisComuns) {
    activeProtocol.diferenciaisComuns.forEach(d => lines.push(`  - ${d}: avaliar conforme exames complementares solicitados.`));
  } else {
    lines.push('  - Não há diferenciais conflitantes no momento.');
  }
  lines.push('');

  lines.push('12. EXAMES COMPLEMENTARES COM FINALIDADE CLÍNICA');
  if (data.examesComplementares && data.examesComplementares.length > 0) {
    data.examesComplementares.forEach((ec, idx) => {
      lines.push(`  ${idx + 1}. ${ec.exame}: ${ec.finalidade}`);
    });
  } else if (activeProtocol?.examesSugeridos) {
    activeProtocol.examesSugeridos.forEach((ec, idx) => {
      lines.push(`  ${idx + 1}. ${ec.exame}: ${ec.finalidade}`);
    });
  } else {
    lines.push('  Sem indicação de exames complementares imediatos nesta etapa.');
  }
  lines.push('');

  lines.push('13. CONDUTA INICIAL E PLANO TERAPÊUTICO');
  lines.push(`• Conduta Diagnóstica: ${data.condutaDiagnostica || 'Aguardar resultados dos exames solicitados para confirmação e estratificação.'}`);
  lines.push(`• Conduta Terapêutica: ${data.condutaTerapeutica || activeProtocol?.condutaTerapeuticaSugerida || 'Sintomáticos prescritos conforme necessidade e observação clínica.'}`);
  if (data.planoNaoFarmacologico) lines.push(`• Medidas Não-Farmacológicas: ${data.planoNaoFarmacologico}`);
  if (data.sinaisAlarme) lines.push(`• Sinais de Alarme (Red Flags) para o Paciente: ${data.sinaisAlarme}`);
  lines.push(`• Orientações e Cuidados Gerais: ${data.cuidadosGerais || activeProtocol?.cuidadosGeraisSugeridos || 'Hidratação adequada, repouso e vigilância de sinais de alarme.'}`);
  lines.push(`• Plano de Seguimento / Critérios de Reavaliação: ${data.planoAltaSeguimento || activeProtocol?.orientacoesAlta || 'Reavaliação após resultado de exames e estabilização dos sintomas.'}`);
  lines.push('');
  lines.push('________________________________________________________________');
  lines.push(`${respStr}`);

  return lines.join('\n');
}
