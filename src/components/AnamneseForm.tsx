/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClinicalData, ComplementaryExam } from '../types/clinical';
import { VitalSignsSection } from './VitalSignsSection';
import { PhysicalExamSection } from './PhysicalExamSection';
import { extractDuration, extractPainScale } from '../services/clinicalRegexEngine';
import { User, FileText, Plus, Trash2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface AnamneseFormProps {
  data: ClinicalData;
  onChange: (updated: ClinicalData) => void;
}

export const AnamneseForm: React.FC<AnamneseFormProps> = ({ data, onChange }) => {
  const updateIdentificacao = (field: string, val: string) => {
    onChange({
      ...data,
      identificacao: {
        ...data.identificacao,
        [field]: val,
      },
    });
  };

  const updateRevisao = (field: string, val: string) => {
    onChange({
      ...data,
      revisaoSistemas: {
        ...data.revisaoSistemas,
        [field]: val,
      },
    });
  };

  const handleAddComplementaryExam = () => {
    const newExam: ComplementaryExam = {
      id: Date.now().toString(),
      exame: '',
      finalidade: 'Confirmar diagnóstico e estratificar risco clínico',
    };
    onChange({
      ...data,
      examesComplementares: [...(data.examesComplementares || []), newExam],
    });
  };

  const handleRemoveComplementaryExam = (id: string) => {
    onChange({
      ...data,
      examesComplementares: (data.examesComplementares || []).filter((e) => e.id !== id),
    });
  };

  const handleUpdateExam = (id: string, field: 'exame' | 'finalidade', val: string) => {
    onChange({
      ...data,
      examesComplementares: (data.examesComplementares || []).map((e) =>
        e.id === id ? { ...e, [field]: val } : e,
      ),
    });
  };

  // Helper: auto-generate HDA narrative from QP with regex
  const handleGenerateHdaFromQp = () => {
    const qp = data.queixaPrincipal;
    if (!qp) return;

    const duration = extractDuration(qp);
    const pain = extractPainScale(qp);
    const pronome = data.identificacao.sexo === 'F' ? 'Paciente feminina' : data.identificacao.sexo === 'M' ? 'Paciente masculino' : 'Paciente';
    const idade = data.identificacao.idade ? `${data.identificacao.idade} ${data.identificacao.idadeUnidade}` : '';

    let text = `${pronome}${idade ? `, ${idade}` : ''}, procura atendimento com queixa de ${qp.toLowerCase()}. `;
    if (duration) text += `Quadro com início relatado há ${duration}, com evolução progressiva. `;
    if (pain) text += `Intensidade da dor referida em escala visual analógica de ${pain}. `;
    text += 'Nega episódios semelhantes prévios no mesmo padrão. Nega uso de medicações por conta própria antes da admissão.';

    onChange({
      ...data,
      hda: text,
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Identificação (ID) */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <h2 className="text-[16px] font-semibold text-[#1d1d1f] flex items-center space-x-2 border-b border-[#f0f0f0] pb-3">
          <User className="h-4 w-4 text-[#0066cc]" />
          <span>1. Identificação do Paciente (ID)</span>
        </h2>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
              Nome Completo ou Iniciais
            </label>
            <input
              type="text"
              value={data.identificacao.nomeIniciais}
              onChange={(e) => updateIdentificacao('nomeIniciais', e.target.value)}
              placeholder="Ex: Maria de Oliveira Santos (ou M.O.S.)"
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
                placeholder="Ex: 54"
                className="w-1/2 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
              />
              <select
                value={data.identificacao.sexo}
                onChange={(e) => updateIdentificacao('sexo', e.target.value)}
                aria-label="Sexo biológico do paciente"
                className="w-1/2 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-2 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
              >
                <option value="F">Fem (F)</option>
                <option value="M">Masc (M)</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
              Naturalidade / Procedência
            </label>
            <input
              type="text"
              value={data.identificacao.naturalidade}
              onChange={(e) => updateIdentificacao('naturalidade', e.target.value)}
              placeholder="Ex: São Paulo - SP"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
              Ocupação Profissional
            </label>
            <input
              type="text"
              value={data.identificacao.ocupacao}
              onChange={(e) => updateIdentificacao('ocupacao', e.target.value)}
              placeholder="Ex: Comerciante / Aposentado"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
              Acompanhante / Fonte
            </label>
            <input
              type="text"
              value={data.identificacao.acompanhante}
              onChange={(e) => updateIdentificacao('acompanhante', e.target.value)}
              placeholder="Ex: O próprio paciente / Cônjuge"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
              Grau de Confiabilidade
            </label>
            <select
              value={data.identificacao.confiabilidade}
              onChange={(e) => updateIdentificacao('confiabilidade', e.target.value)}
              aria-label="Grau de confiabilidade da informação"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            >
              <option value="boa">Boa confiabilidade</option>
              <option value="moderada">Moderada</option>
              <option value="duvidosa">Duvidosa</option>
              <option value="prejudicada">Prejudicada</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
              Médico / CRM
            </label>
            <input
              type="text"
              value={data.identificacao.responsavel}
              onChange={(e) => updateIdentificacao('responsavel', e.target.value)}
              placeholder="Ex: Dr. Nome Sobrenome"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>
        </div>
      </section>

      {/* 2. Queixa Principal (QP) */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
          <div>
            <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
              2. Queixa Principal (QP)
            </h2>
            <p className="text-[12px] text-[#7a7a7a] mt-0.5">
              Registrar em poucas palavras, com as palavras do paciente e duração. Ex.: &quot;falta de ar há 3 dias&quot;; &quot;dor abdominal desde ontem&quot;.
            </p>
          </div>
          {data.queixaPrincipal && (
            <button
              type="button"
              onClick={handleGenerateHdaFromQp}
              className="flex items-center space-x-1 text-[12px] text-[#0066cc] hover:underline"
              title="Estruturar narrativa de HDA a partir da queixa principal usando regex"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Gerar HDA inicial</span>
            </button>
          )}
        </div>

        <div className="mt-3">
          <input
            type="text"
            value={data.queixaPrincipal}
            onChange={(e) => onChange({ ...data, queixaPrincipal: e.target.value })}
            placeholder="Ex: Dor no peito em aperto e falta de ar há 2 horas"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3.5 py-2.5 text-[14px] font-medium text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>
      </section>

      {/* 3. História da Doença Atual (HDA) */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="border-b border-[#f0f0f0] pb-3">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
            3. História da Doença Atual (HDA)
          </h2>
          <p className="text-[12px] text-[#7a7a7a] mt-0.5">
            Descrever início, evolução temporal, caracterização do sintoma, fatores de melhora/piora, sintomas associados, tratamentos realizados e impacto funcional.
          </p>
        </div>

        <div className="mt-3">
          <textarea
            rows={4}
            value={data.hda}
            onChange={(e) => onChange({ ...data, hda: e.target.value })}
            placeholder="Ex: Paciente relata que há 2 dias iniciou quadro de tosse produtiva com expectoração amarelada e febre aferida em 38.5°C, acompanhada de dor torácica ventilatório-dependente em hemitórax direito. Nega hemoptise. Refere piora progressiva da dispneia aos esforços moderados."
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-3.5 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>
      </section>

      {/* 4. Antecedentes Pessoais Patológicos (HPP) */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="border-b border-[#f0f0f0] pb-3">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
            4. Antecedentes Pessoais Patológicos (HPP)
          </h2>
          <p className="text-[12px] text-[#7a7a7a] mt-0.5">
            Comorbidades crônicas, cirurgias, internações prévias, transfusões, alergias, medicações de uso contínuo, vacinas, gestações/partos.
          </p>
        </div>

        <div className="mt-3">
          <textarea
            rows={2}
            value={data.hpp}
            onChange={(e) => onChange({ ...data, hpp: e.target.value })}
            placeholder="Ex: Hipertensão Arterial há 8 anos em uso de Enalapril 10mg 12/12h; DM2 há 5 anos em uso de Metformina 850mg 2x/dia. Colecistectomia videolaparoscópica em 2019. Nega alergias medicamentosas conhecidas. Vacinação antitetânica e influenza atualizadas."
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>
      </section>

      {/* 5. Histórias Familiar, Fisiológica e Social */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Familiar */}
        <div className="rounded-[18px] border border-[#e0e0e0] bg-white p-4">
          <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-1">
            5. História Familiar
          </h3>
          <p className="text-[11px] text-[#7a7a7a] mb-2">
            DCV, DM, neoplasias, trombose, doenças genéticas ou psiquiátricas.
          </p>
          <textarea
            rows={3}
            value={data.historiaFamiliar}
            onChange={(e) => onChange({ ...data, historiaFamiliar: e.target.value })}
            placeholder="Ex: Mãe hipertensa e diabética. Pai falecido por IAM aos 62 anos."
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-2.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>

        {/* Fisiológica */}
        <div className="rounded-[18px] border border-[#e0e0e0] bg-white p-4">
          <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-1">
            6. História Fisiológica
          </h3>
          <p className="text-[11px] text-[#7a7a7a] mb-2">
            Sono, alimentação, eliminações, puericultura, ciclo menstrual/G-P.
          </p>
          <textarea
            rows={3}
            value={data.historiaFisiologica}
            onChange={(e) => onChange({ ...data, historiaFisiologica: e.target.value })}
            placeholder="Ex: Sono preservado, alimentação habitual, diurese e ritmo intestinal regulares."
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-2.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>

        {/* Social */}
        <div className="rounded-[18px] border border-[#e0e0e0] bg-white p-4">
          <h3 className="text-[13px] font-semibold text-[#1d1d1f] mb-1">
            7. História Social
          </h3>
          <p className="text-[11px] text-[#7a7a7a] mb-2">
            Moradia, trabalho, álcool, tabaco, substâncias, atividade física.
          </p>
          <textarea
            rows={3}
            value={data.historiaSocial}
            onChange={(e) => onChange({ ...data, historiaSocial: e.target.value })}
            placeholder="Ex: Casa própria com saneamento básico. Ex-tabagista cessado há 5 anos. Nega etilismo."
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-2.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>
      </div>

      {/* 8. Revisão de Sistemas Direcionada */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="border-b border-[#f0f0f0] pb-3">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
            8. Revisão de Sistemas Direcionada
          </h2>
          <p className="text-[12px] text-[#7a7a7a] mt-0.5">
            Interrogatório sobre os diversos aparelhos para busca ativa de sintomas associados.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
              Constitucional (febre, peso, astenia)
            </label>
            <input
              type="text"
              value={data.revisaoSistemas.constitucional}
              onChange={(e) => updateRevisao('constitucional', e.target.value)}
              placeholder="Ex: Nega perda ponderal ou febre"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
              Cardiovascular (dor, palpitações, síncope, edema)
            </label>
            <input
              type="text"
              value={data.revisaoSistemas.cardiovascular}
              onChange={(e) => updateRevisao('cardiovascular', e.target.value)}
              placeholder="Ex: Refere dor precordial aos esforços"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
              Respiratório (dispneia, tosse, escarro, sibilos)
            </label>
            <input
              type="text"
              value={data.revisaoSistemas.respiratorio}
              onChange={(e) => updateRevisao('respiratorio', e.target.value)}
              placeholder="Ex: Nega tosse ou sibilância"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
              Gastrointestinal (dor, vômitos, diarreia, evacuação)
            </label>
            <input
              type="text"
              value={data.revisaoSistemas.gastrointestinal}
              onChange={(e) => updateRevisao('gastrointestinal', e.target.value)}
              placeholder="Ex: Nega vômitos ou alteração intestinal"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
              Geniturinário (disúria, hematúria, diurese)
            </label>
            <input
              type="text"
              value={data.revisaoSistemas.geniturinario}
              onChange={(e) => updateRevisao('geniturinario', e.target.value)}
              placeholder="Ex: Diurese clara sem disúria"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
              Neurológico (cefaleia, déficit focal, convulsão)
            </label>
            <input
              type="text"
              value={data.revisaoSistemas.neurologico}
              onChange={(e) => updateRevisao('neurologico', e.target.value)}
              placeholder="Ex: Sem queixas neurológicas"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
            />
          </div>
        </div>
      </section>

      {/* Sinais Vitais */}
      <VitalSignsSection
        vitalSigns={data.sinaisVitais}
        onChange={(vs) => onChange({ ...data, sinaisVitais: vs })}
      />

      {/* Exame Físico */}
      <PhysicalExamSection
        exam={data.exameFisico}
        onChange={(ef) => onChange({ ...data, exameFisico: ef })}
      />

      {/* 9. Hipótese Principal e Diagnósticos Diferenciais */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="border-b border-[#f0f0f0] pb-3">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
            9. Hipótese Principal e Diagnósticos Diferenciais
          </h2>
          <p className="text-[12px] text-[#7a7a7a] mt-0.5">
            Justificar brevemente por que cada hipótese entra ou sai do raciocínio clínico.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
                Código CID-10
              </label>
              <input
                type="text"
                value={data.hipotesePrincipal.codigoCid}
                onChange={(e) =>
                  onChange({
                    ...data,
                    hipotesePrincipal: {
                      ...data.hipotesePrincipal,
                      codigoCid: e.target.value,
                    },
                  })
                }
                placeholder="Ex: I21.9 ou I50.9"
                className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] font-semibold text-[#0066cc] outline-none focus:border-[#0066cc]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
                Hipótese Principal
              </label>
              <input
                type="text"
                value={data.hipotesePrincipal.nomeCid}
                onChange={(e) =>
                  onChange({
                    ...data,
                    hipotesePrincipal: {
                      ...data.hipotesePrincipal,
                      nomeCid: e.target.value,
                    },
                  })
                }
                placeholder="Ex: Síndrome Coronariana Aguda sem supra de ST"
                className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] font-medium text-[#1d1d1f] outline-none focus:border-[#0066cc]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
              Justificativa clínica da hipótese principal
            </label>
            <textarea
              rows={2}
              value={data.hipotesePrincipal.justificativa}
              onChange={(e) =>
                onChange({
                  ...data,
                  hipotesePrincipal: {
                    ...data.hipotesePrincipal,
                    justificativa: e.target.value,
                  },
                })
              }
              placeholder="Ex: Raciocínio fundado em dor torácica anginosa típica com alteração de segmento ST em derivações precordiais."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-2.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
            />
          </div>
        </div>
      </section>

      {/* 10. Exames Complementares com Finalidade Clínica */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
          <div>
            <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
              10. Exames Complementares Solicitados
            </h2>
            <p className="text-[12px] text-[#7a7a7a] mt-0.5">
              Registrar o motivo do exame: confirmar, estratificar gravidade, pesquisar complicação ou descartar diagnóstico.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddComplementaryExam}
            className="flex items-center space-x-1 text-[12px] text-[#0066cc] hover:underline"
          >
            <Plus className="h-3 w-3" />
            <span>Adicionar Exame</span>
          </button>
        </div>

        <div className="mt-4 space-y-2.5">
          {(!data.examesComplementares || data.examesComplementares.length === 0) ? (
            <div className="rounded-xl border border-dashed border-[#e0e0e0] p-4 text-center text-[12px] text-[#7a7a7a]">
              Nenhum exame solicitado.{' '}
              <button
                type="button"
                onClick={handleAddComplementaryExam}
                className="text-[#0066cc] underline ml-1"
              >
                Clique para adicionar um exame e sua finalidade
              </button>
            </div>
          ) : (
            data.examesComplementares.map((ex) => (
              <div
                key={ex.id}
                className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-2"
              >
                <input
                  type="text"
                  value={ex.exame}
                  onChange={(e) => handleUpdateExam(ex.id, 'exame', e.target.value)}
                  placeholder="Ex: Radiografia de tórax PA e Perfil"
                  className="w-full sm:w-1/2 rounded-lg bg-white border border-[#e0e0e0] px-2.5 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
                />
                <input
                  type="text"
                  value={ex.finalidade}
                  onChange={(e) => handleUpdateExam(ex.id, 'finalidade', e.target.value)}
                  placeholder="Finalidade: Confirmar consolidação e afastar pneumotórax"
                  className="w-full sm:w-1/2 rounded-lg bg-white border border-[#e0e0e0] px-2.5 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveComplementaryExam(ex.id)}
                  className="p-1 text-[#7a7a7a] hover:text-red-600 transition"
                  title="Excluir exame"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 11. Conduta Inicial & Plano Terapêutico */}
      <section className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none">
        <div className="border-b border-[#f0f0f0] pb-3">
          <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
            11. Conduta Inicial e Orientações
          </h2>
          <p className="text-[12px] text-[#7a7a7a] mt-0.5">
            Plano terapêutico farmacológico, cuidados gerais e orientações de seguimento/alta.
          </p>
        </div>

        <div className="mt-4 space-y-3.5">
          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              Conduta diagnóstica imediata
            </label>
            <input
              type="text"
              value={data.condutaDiagnostica}
              onChange={(e) => onChange({ ...data, condutaDiagnostica: e.target.value })}
              placeholder="Ex: Coleta de troponina 0h e 2h; ECG seriado a cada 6h"
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
              Conduta terapêutica inicial
            </label>
            <textarea
              rows={2}
              value={data.condutaTerapeutica}
              onChange={(e) => onChange({ ...data, condutaTerapeutica: e.target.value })}
              placeholder="Ex: AAS 200mg mastigável + Ticagrelor 180mg VO + Enoxaparina 1mg/kg SC; Sintomáticos conforme necessidade."
              className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-3 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
                Cuidados gerais e monitorização
              </label>
              <input
                type="text"
                value={data.cuidadosGerais}
                onChange={(e) => onChange({ ...data, cuidadosGerais: e.target.value })}
                placeholder="Ex: Repouso no leito, dieta zero inicial, O2 se SatO2 < 90%"
                className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#1d1d1f] mb-1">
                Orientações / Plano de seguimento
              </label>
              <input
                type="text"
                value={data.planoAltaSeguimento}
                onChange={(e) => onChange({ ...data, planoAltaSeguimento: e.target.value })}
                placeholder="Ex: Encaminhamento à UCO; Reavaliação após resultado da troponina."
                className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] text-[#1d1d1f] outline-none focus:border-[#0066cc]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
