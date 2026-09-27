/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClinicalData, ExamRecord } from '../types/clinical';
import { VitalSignsSection } from './VitalSignsSection';
import { PhysicalExamSection } from './PhysicalExamSection';
import { Plus, Trash2, HelpCircle, MessageSquarePlus, Clock, Bed, User, ShieldAlert } from 'lucide-react';

interface EvolucaoFormProps {
  data: ClinicalData;
  onChange: (updated: ClinicalData) => void;
}

export const EvolucaoForm: React.FC<EvolucaoFormProps> = ({ data, onChange }) => {
  const updateIdentificacao = (field: string, val: string) => {
    onChange({
      ...data,
      identificacao: {
        ...data.identificacao,
        [field]: val,
      },
    });
  };

  const updateResumo = (field: string, val: any) => {
    onChange({
      ...data,
      resumoProblemas: {
        ...data.resumoProblemas,
        [field]: val,
      },
    });
  };

  const handleAddExamRow = () => {
    const newExam: ExamRecord = {
      id: Date.now().toString(),
      data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      resultado: '',
    };
    updateResumo('examesPorData', [...(data.resumoProblemas.examesPorData || []), newExam]);
  };

  const handleRemoveExamRow = (id: string) => {
    updateResumo(
      'examesPorData',
      data.resumoProblemas.examesPorData.filter((e) => e.id !== id),
    );
  };

  const handleUpdateExamRow = (id: string, field: 'data' | 'resultado', val: string) => {
    updateResumo(
      'examesPorData',
      data.resumoProblemas.examesPorData.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    );
  };

  const appendFraseUtil = (frase: string) => {
    const current = data.negativasRelevantes || '';
    const updated = current ? `${current}. ${frase}` : frase;
    onChange({
      ...data,
      negativasRelevantes: updated,
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Identificação e Cabeçalho */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <h2 className="text-[16px] font-semibold text-[#1d1d1f] flex items-center space-x-2 border-b border-[#f0f0f0] pb-3">
          <User className="h-4 w-4 text-[#0066cc]" />
          <span>Identificação e Cabeçalho da Evolução</span>
        </h2>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
              Paciente / Iniciais
            </label>
            <input
              type="text"
              value={data.identificacao.nomeIniciais}
              onChange={(e) => updateIdentificacao('nomeIniciais', e.target.value)}
              placeholder="Ex: P.M.S."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
              Idade & Sexo
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={data.identificacao.idade}
                onChange={(e) => updateIdentificacao('idade', e.target.value)}
                placeholder="Ex: 68"
                className="w-1/2 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
              />
              <select
                value={data.identificacao.sexo}
                onChange={(e) => updateIdentificacao('sexo', e.target.value)}
                aria-label="Sexo biológico"
                className="w-1/2 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-2 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
              >
                <option value="M">Masc (M)</option>
                <option value="F">Fem (F)</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1 flex items-center space-x-1">
              <Bed className="h-3 w-3 text-[#7a7a7a]" />
              <span>Leito / Enfermaria</span>
            </label>
            <input
              type="text"
              value={data.identificacao.leito}
              onChange={(e) => updateIdentificacao('leito', e.target.value)}
              placeholder="Ex: Leito 12 / Enf. 04"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1 flex items-center space-x-1">
              <Clock className="h-3 w-3 text-[#7a7a7a]" />
              <span>Data e Hora</span>
            </label>
            <div className="flex space-x-1.5">
              <input
                type="text"
                value={data.identificacao.data}
                onChange={(e) => updateIdentificacao('data', e.target.value)}
                placeholder="DD/MM/AAAA"
                className="w-3/5 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-2.5 py-2 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
              />
              <input
                type="text"
                value={data.identificacao.hora}
                onChange={(e) => updateIdentificacao('hora', e.target.value)}
                placeholder="HH:MM"
                className="w-2/5 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-2 py-2 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
              />
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
              Médico Responsável / CRM
            </label>
            <input
              type="text"
              value={data.identificacao.responsavel}
              onChange={(e) => updateIdentificacao('responsavel', e.target.value)}
              placeholder="Ex: Dr. Fulano de Tal - CRM 123456/SP"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>
        </div>
      </section>

      {/* 2. Resumo Inicial por Problemas (#1 a #7) */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="border-b border-[#f0f0f0] pb-3">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f] flex items-center space-x-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0066cc] text-[11px] font-bold text-white">
              #
            </span>
            <span>Resumo Inicial por Problemas</span>
          </h2>
          <p className="text-[12px] text-[#7a7a7a] mt-0.5">
            Preencher de forma objetiva para permitir entendimento imediato do contexto clínico e pontos ativos.
          </p>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* #1 Tempo de Internação */}
            <div>
              <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
                #1. Tempo de internação hospitalar
              </label>
              <input
                type="text"
                value={data.resumoProblemas.tempoInternacao}
                onChange={(e) => updateResumo('tempoInternacao', e.target.value)}
                placeholder="Ex: D3 IH (3º dia de internação hospitalar)"
                className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
              />
            </div>

            {/* #2 Motivo/Diagnóstico da internação */}
            <div>
              <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
                #2. Motivo / diagnóstico da internação
              </label>
              <input
                type="text"
                value={data.resumoProblemas.motivoInternacao}
                onChange={(e) => updateResumo('motivoInternacao', e.target.value)}
                placeholder="Ex: ICC descompensada / Caso sem dx fechado: &quot;a esclarecer&quot;"
                className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
              />
            </div>
          </div>

          {/* #3 Intercorrências */}
          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              #3. Intercorrências durante a internação
            </label>
            <input
              type="text"
              value={data.resumoProblemas.intercorrencias}
              onChange={(e) => updateResumo('intercorrencias', e.target.value)}
              placeholder="Ex: Sem intercorrências nas últimas 24 h (ou: pico febril de 38.2°C às 03h)"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          {/* #4 Comorbidades e alergias */}
          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              #4. Comorbidades e alergias relevantes
            </label>
            <input
              type="text"
              value={data.resumoProblemas.comorbidadesAlergias}
              onChange={(e) => updateResumo('comorbidadesAlergias', e.target.value)}
              placeholder="Ex: HAS + DM2. Alergia a Penicilina."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          {/* #5 Tratamentos com início/fim definidos */}
          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              #5. Tratamentos com início/fim definidos
            </label>
            <input
              type="text"
              value={data.resumoProblemas.tratamentosFimDefinido}
              onChange={(e) => updateResumo('tratamentosFimDefinido', e.target.value)}
              placeholder="Ex: D3/7 ceftriaxona; D2/5 prednisona; Furosemida EV D3; sem ATB."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          {/* #6 Acessos, dispositivos e suporte */}
          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              #6. Acessos, dispositivos e suporte
            </label>
            <input
              type="text"
              value={data.resumoProblemas.acessosDispositivos}
              onChange={(e) => updateResumo('acessosDispositivos', e.target.value)}
              placeholder="Ex: AVP MSE; CVC jugular D; SVD; SNE; O2 cateter 2 L/min (ou: ar ambiente, sem dispositivos)"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          {/* #7 Exames relevantes por data */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[12px] font-semibold text-[#1d1d1f]">
                #7. Exames relevantes por data
              </label>
              <button
                type="button"
                onClick={handleAddExamRow}
                className="flex items-center space-x-1 text-[12px] text-[#0066cc] hover:underline"
              >
                <Plus className="h-3 w-3" />
                <span>Adicionar Exame</span>
              </button>
            </div>

            {(!data.resumoProblemas.examesPorData || data.resumoProblemas.examesPorData.length === 0) ? (
              <div className="rounded-xl border border-dashed border-[#e0e0e0] p-3 text-center text-[12px] text-[#7a7a7a]">
                Nenhum exame inserido ainda.{' '}
                <button
                  type="button"
                  onClick={handleAddExamRow}
                  className="text-[#0066cc] underline ml-1"
                >
                  Adicionar resultado
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {data.resumoProblemas.examesPorData.map((ex) => (
                  <div key={ex.id} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={ex.data}
                      onChange={(e) => handleUpdateExamRow(ex.id, 'data', e.target.value)}
                      placeholder="DD/MM"
                      className="w-24 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-2.5 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
                    />
                    <input
                      type="text"
                      value={ex.resultado}
                      onChange={(e) => handleUpdateExamRow(ex.id, 'resultado', e.target.value)}
                      placeholder="Ex: RX tórax 04/05: congestão pulmonar; creatinina 06/05: 1,1"
                      className="flex-1 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExamRow(ex.id)}
                      className="p-1.5 text-[#7a7a7a] hover:text-red-600 transition"
                      title="Excluir exame"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Sinais Vitais e Balanço 24h */}
      <VitalSignsSection
        vitalSigns={data.sinaisVitais}
        onChange={(vs) => onChange({ ...data, sinaisVitais: vs })}
      />

      {/* 4. Subjetivo (S) */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="border-b border-[#f0f0f0] pb-3">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f] flex items-center space-x-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0066cc] text-[11px] font-bold text-white">
              S
            </span>
            <span>Subjetivo - O que o paciente relata nas últimas 24 horas</span>
          </h2>
          <p className="text-[12px] text-[#7a7a7a] mt-0.5">
            Registrar de forma clara e objetiva a evolução sintomática do paciente.
          </p>
        </div>

        <div className="mt-4 space-y-3.5">
          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              • Paciente relata:
            </label>
            <textarea
              rows={2}
              value={data.pacienteRelata}
              onChange={(e) => onChange({ ...data, pacienteRelata: e.target.value })}
              placeholder="Ex: Paciente relata melhora da dispneia, boa aceitação da dieta, repousou bem."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              • Sintomas atuais (dor, dispneia, febre, náuseas, tosse, diurese, evacuação, sono):
            </label>
            <input
              type="text"
              value={data.sintomasAtuais}
              onChange={(e) => onChange({ ...data, sintomasAtuais: e.target.value })}
              placeholder="Ex: Refere apenas desconforto leve em MSE; diurese preservada e evacuação presente."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[12px] font-semibold text-[#1d1d1f]">
                • Negativas relevantes:
              </label>
              <span className="text-[11px] text-[#7a7a7a]">Frases rápidas sugeridas pelo modelo:</span>
            </div>

            {/* Quick snippet buttons from page 2 of PDF */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {[
                'paciente assintomático',
                'nega dor torácica e febre nas últimas 24 h',
                'mantém dispneia com as mesmas características',
                'refere melhora parcial dos sintomas',
                'nega náuseas, vômitos ou diarreia'
              ].map((frase, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => appendFraseUtil(frase)}
                  className="rounded-full bg-[#f5f5f7] border border-[#e0e0e0] px-2.5 py-0.5 text-[11px] text-[#1d1d1f] hover:bg-[#0066cc]/10 hover:border-[#0066cc]/40 transition active:scale-95"
                >
                  + {frase}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={data.negativasRelevantes}
              onChange={(e) => onChange({ ...data, negativasRelevantes: e.target.value })}
              placeholder="Ex: nega dor torácica e febre nas últimas 24 h."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>
        </div>
      </section>

      {/* 5. Objetivo (O) - Exame Físico */}
      <PhysicalExamSection
        exam={data.exameFisico}
        onChange={(ef) => onChange({ ...data, exameFisico: ef })}
      />

      {/* 6. Impressão (A) */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="border-b border-[#f0f0f0] pb-3">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f] flex items-center space-x-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0066cc] text-[11px] font-bold text-white">
              A
            </span>
            <span>Impressão - Avaliação Clínica do Dia</span>
          </h2>
          <p className="text-[12px] text-[#7a7a7a] mt-0.5">
            Síntese clínica: evolução, resposta terapêutica, gravidade, pendências e hipóteses.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              Síntese clínica do dia
            </label>
            <textarea
              rows={3}
              value={data.sinteseClinica}
              onChange={(e) => onChange({ ...data, sinteseClinica: e.target.value })}
              placeholder="Exemplo do modelo: Paciente confortável, afebril, hemodinamicamente estável, com melhora da dispneia e boa resposta à diureticoterapia. Mantém necessidade de seguimento laboratorial e ajuste conforme função renal."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white resize-none"
            />
          </div>
        </div>
      </section>

      {/* 7. Conduta (P) */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="border-b border-[#f0f0f0] pb-3">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f] flex items-center space-x-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0066cc] text-[11px] font-bold text-white">
              P
            </span>
            <span>Conduta - Plano Diagnóstico & Terapêutico</span>
          </h2>
          <p className="text-[12px] text-[#7a7a7a] mt-0.5">
            Condutas separadas por categorias estritas conforme preconizado no documento.
          </p>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              1. Conduta diagnóstica (Solicitar/rever exames, justificar cada pedido e definir pendências)
            </label>
            <textarea
              rows={2}
              value={data.condutaDiagnostica}
              onChange={(e) => onChange({ ...data, condutaDiagnostica: e.target.value })}
              placeholder="Ex: Solicitar eletrólitos e função renal para monitorar segurança da diurese; RX de tórax de controle."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              2. Conduta terapêutica (Prescrever, suspender, ajustar dose, manter ou escalonar tratamento)
            </label>
            <textarea
              rows={2}
              value={data.condutaTerapeutica}
              onChange={(e) => onChange({ ...data, condutaTerapeutica: e.target.value })}
              placeholder="Ex: Manter diureticoterapia, ajuste de dose de furosemida; transição para VO conforme resposta."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              3. Cuidados gerais (Dieta, hidratação, profilaxias TEV, mobilização, dispositivos, fisioterapia)
            </label>
            <input
              type="text"
              value={data.cuidadosGerais}
              onChange={(e) => onChange({ ...data, cuidadosGerais: e.target.value })}
              placeholder="Ex: Dieta hipossódica, cabeceira 30°, profilaxia de TEV com heparina profilática, fisioterapia motora."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[12px] font-semibold text-[#1d1d1f]">
                4. Plano de alta / seguimento
              </label>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...data,
                    planoAltaSeguimento: 'Conduta mantida, reavaliar em 24 h ou antes se intercorrências.',
                  })
                }
                className="text-[11px] text-[#0066cc] hover:underline"
              >
                Inserir padrão estável
              </button>
            </div>
            <input
              type="text"
              value={data.planoAltaSeguimento}
              onChange={(e) => onChange({ ...data, planoAltaSeguimento: e.target.value })}
              placeholder="Ex: Conduta mantida, reavaliar em 24 h ou antes se intercorrências / Critérios de alta: euvolemia."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
