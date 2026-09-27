/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClinicalData, FifeDimensions, RaciocinioClinico } from '../types/clinical';
import { DocumentReviewView } from './DocumentReviewView';
import { CidSearchBox } from './CidSearchBox';
import { LocalCid10Item } from '../data/cid10LocalList';
import { RoteirosModal } from './RoteirosModal';
import { DifferentialExamHelper } from './DifferentialExamHelper';
import { ExamTargetField } from '../services/differentialLogicEngine';
import {
  AnamneseTemplateModel,
  generate8AttributesHdaTemplate,
  generateFifeHdaTemplate,
  calculatePackYears,
} from '../data/anamneseRoteiros';
import {
  ChevronLeft,
  ChevronRight,
  User,
  AlertCircle,
  FileText,
  History,
  Activity,
  Stethoscope,
  Target,
  FileCheck2,
  Pill,
  ShieldCheck,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
  Heart,
  HelpCircle,
  Calculator,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';

interface StepWizardFormProps {
  data: ClinicalData;
  onChange: React.Dispatch<React.SetStateAction<ClinicalData>>;
  autosaveStatus?: {
    lastSaved: Date | null;
    isSaving: boolean;
  };
  onOpenPrintPreview?: () => void;
}

const STEP_DEFINITIONS = [
  { id: 1, title: 'Identificação', desc: 'Dados do paciente e do atendimento' },
  { id: 2, title: 'Queixa & Motivo', desc: 'Queixa principal e tempo de evolução' },
  { id: 3, title: 'HDA / Subjetivo', desc: 'História da doença atual ou relato do dia' },
  { id: 4, title: 'Antecedentes', desc: 'Comorbidades, medicamentos, alergias e hábitos' },
  { id: 5, title: 'Sinais Vitais', desc: 'Parâmetros vitais e dados fisiológicos' },
  { id: 6, title: 'Exame Físico', desc: 'Avaliação física dirigida por aparelhos' },
  { id: 7, title: 'Diagnóstico', desc: 'Hipótese principal (CID-10) e diferenciais' },
  { id: 8, title: 'Exames', desc: 'Exames complementares e justificativas' },
  { id: 9, title: 'Conduta', desc: 'Prescrição terapêutica e plano inicial' },
  { id: 10, title: 'Validação & Leitura', desc: 'Leitura completa no app e confirmação formal' },
];

export const StepWizardForm: React.FC<StepWizardFormProps> = ({
  data,
  onChange,
  autosaveStatus,
  onOpenPrintPreview,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [roteirosModalOpen, setRoteirosModalOpen] = useState(false);
  const [showDetailedId, setShowDetailedId] = useState(false);
  const [showFifeSection, setShowFifeSection] = useState(true);
  const [showDiagnosticLevels, setShowDiagnosticLevels] = useState(true);

  const totalSteps = STEP_DEFINITIONS.length;
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  const updateField = <K extends keyof ClinicalData>(key: K, value: ClinicalData[K]) => {
    onChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateNested = <K extends keyof ClinicalData, SubKey extends keyof ClinicalData[K]>(
    key: K,
    subKey: SubKey,
    value: ClinicalData[K][SubKey]
  ) => {
    onChange((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] as any),
        [subKey]: value,
      },
    }));
  };

  const updateFife = (subKey: keyof FifeDimensions, value: string) => {
    onChange((prev) => ({
      ...prev,
      experienciaDoencaFife: {
        sentimentos: prev.experienciaDoencaFife?.sentimentos || '',
        ideias: prev.experienciaDoencaFife?.ideias || '',
        funcao: prev.experienciaDoencaFife?.funcao || '',
        expectativas: prev.experienciaDoencaFife?.expectativas || '',
        [subKey]: value,
      },
    }));
  };

  const updateRaciocinio = (subKey: keyof RaciocinioClinico, value: string) => {
    onChange((prev) => ({
      ...prev,
      raciocinioClinico: {
        sindromico: prev.raciocinioClinico?.sindromico || '',
        topografico: prev.raciocinioClinico?.topografico || '',
        etiologico: prev.raciocinioClinico?.etiologico || '',
        [subKey]: value,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddExam = () => {
    const newExams = [
      ...data.examesComplementares,
      { id: Date.now().toString(), exame: '', finalidade: '' },
    ];
    updateField('examesComplementares', newExams);
  };

  const handleRemoveExam = (index: number) => {
    const newExams = data.examesComplementares.filter((_, i) => i !== index);
    updateField('examesComplementares', newExams);
  };

  const handleAddDifferential = () => {
    const newDiffs = [
      ...data.diferenciais,
      { codigoCid: '', nomeCid: '', justificativa: '' },
    ];
    updateField('diferenciais', newDiffs);
  };

  const handleRemoveDifferential = (index: number) => {
    const newDiffs = data.diferenciais.filter((_, i) => i !== index);
    updateField('diferenciais', newDiffs);
  };

  const handleSelectPrimaryCid = (item: LocalCid10Item) => {
    onChange((prev) => ({
      ...prev,
      hipotesePrincipal: {
        ...prev.hipotesePrincipal,
        codigoCid: item.code,
        nomeCid: item.description,
        justificativa:
          prev.hipotesePrincipal.justificativa.trim() || !item.suggestedJustification
            ? prev.hipotesePrincipal.justificativa
            : item.suggestedJustification,
      },
    }));
  };

  const handleAddDifferentialItem = (item: LocalCid10Item) => {
    const alreadyExists = data.diferenciais.some(
      (d) => d.codigoCid.trim().toUpperCase() === item.code.trim().toUpperCase()
    );
    if (!alreadyExists) {
      const newDiffs = [
        ...data.diferenciais,
        {
          codigoCid: item.code,
          nomeCid: item.description,
          justificativa: item.suggestedJustification || '',
        },
      ];
      updateField('diferenciais', newDiffs);
    }
  };

  const handleApplyDifferentialFinding = (field: ExamTargetField, findingText: string) => {
    const current = data.exameFisico[field] || '';
    let updated = '';
    if (!current.trim()) {
      updated = findingText;
    } else {
      const trimmed = current.trim();
      const punctuation = trimmed.endsWith('.') || trimmed.endsWith(';') ? ' ' : ', ';
      updated = `${trimmed}${punctuation}${findingText}`;
    }
    updateNested('exameFisico', field, updated);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* 0. Roteiros de Anamnese Quick Access Banner */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-neutral-900/60 border border-neutral-800 p-3.5 sm:px-5">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-neutral-800 text-neutral-200 shrink-0">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[13px] font-medium text-white block">
              Roteiros & Modelos de Anamnese Integrados
            </span>
            <span className="text-[11.5px] text-neutral-400 block">
              Roteiro do Adulto (PUCRS) e Roteiro Pedagógico (MCCP / Modelo FIFE)
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setRoteirosModalOpen(true)}
          className="inline-flex items-center space-x-1.5 rounded-lg bg-neutral-100 text-neutral-950 hover:bg-neutral-200 px-3.5 py-1.5 text-[12px] font-medium transition active:scale-95 shadow-sm self-start sm:self-auto"
        >
          <Sparkles className="h-3.5 w-3.5 text-neutral-800" />
          <span>Explorar Roteiros</span>
        </button>
      </div>

      {/* 1. Progress Bar & Responsive Step Navigation */}
      <div className="no-print rounded-xl bg-neutral-900/90 border border-neutral-800 p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-neutral-800 border border-neutral-700 px-2 py-0.5 text-[11px] font-medium text-neutral-300">
              Etapa {currentStep} de {totalSteps}
            </span>
            <span className="text-[14px] sm:text-[15px] font-medium text-white tracking-tight">
              {STEP_DEFINITIONS[currentStep - 1].title}
            </span>
            <span className="text-[12px] text-neutral-400 hidden lg:inline">
              — {STEP_DEFINITIONS[currentStep - 1].desc}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[12px] text-neutral-400">
            {autosaveStatus && (
              <div className="flex items-center space-x-1.5 text-[11px] text-neutral-400 bg-neutral-800/80 px-2.5 py-0.5 rounded-md border border-neutral-700">
                {autosaveStatus.isSaving ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-pulse" />
                    <span>Salvando...</span>
                  </>
                ) : autosaveStatus.lastSaved ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 text-neutral-400" />
                    <span>Salvo</span>
                  </>
                ) : (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                    <span>Autosave</span>
                  </>
                )}
              </div>
            )}
            <div>
              <span>Progresso: </span>
              <span className="font-semibold text-white">{progressPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Linear Processing Bar */}
        <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Mobile Step Navigation (< md): Dropdown Selector + Next/Prev Arrow buttons */}
        <div className="md:hidden flex items-center justify-between gap-2 pt-2.5">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => {
              setCurrentStep((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white disabled:opacity-30 disabled:pointer-events-none transition"
            title="Etapa anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <select
            value={currentStep}
            onChange={(e) => {
              setCurrentStep(Number(e.target.value));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Selecionar etapa do formulário"
            className="flex-1 py-1.5 px-3 rounded-lg bg-neutral-950 border border-neutral-700 text-[12px] font-medium text-white focus:outline-none focus:border-neutral-500"
          >
            {STEP_DEFINITIONS.map((s) => (
              <option key={s.id} value={s.id} className="bg-neutral-900 text-white">
                {s.id}. {s.title}
              </option>
            ))}
          </select>

          <button
            type="button"
            disabled={currentStep === totalSteps}
            onClick={() => {
              setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white disabled:opacity-30 disabled:pointer-events-none transition"
            title="Próxima etapa"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Desktop Step Quick Navigation (md:) */}
        <div className="hidden md:flex items-center justify-between overflow-x-auto pt-3 gap-1 text-[11px]">
          {STEP_DEFINITIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setCurrentStep(s.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title={`${s.id}. ${s.title}`}
              className={`flex-1 py-1 px-1.5 rounded-md text-center transition ${
                currentStep === s.id
                  ? 'bg-neutral-100 text-neutral-950 font-semibold shadow-sm'
                  : currentStep > s.id
                  ? 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  : 'bg-transparent text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/40'
              }`}
            >
              <span className="block truncate">{s.id}. {s.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Step Questionnaire Body - Crisp 12px Radius Panel */}
      <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-4 sm:p-7 shadow-lg">
        {/* ================= STEP 1: IDENTIFICAÇÃO ================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-[16px] font-medium text-white flex items-center space-x-2">
                <User className="h-4 w-4 text-white/80" />
                <span>Etapa 1: Identificação do Paciente & Perfil Assistencial</span>
              </h3>
              <p className="text-[12.5px] text-white/60 mt-0.5">
                Defina o formato assistencial e preencha os dados de identificação essenciais e complementares do Roteiro Adulto.
              </p>
            </div>

            {/* Document Type Switch - Rounded Capsules */}
            <div>
              <label className="block text-[12px] text-white/70 mb-2">
                Tipo de Documento
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                <button
                  type="button"
                  onClick={() => updateField('tipo', 'anamnese')}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    data.tipo === 'anamnese'
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-white/[0.04] border-white/[0.12] text-white/80 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="text-[13.5px] font-medium">Anamnese Completa</div>
                  <div className={`text-[11.5px] mt-0.5 ${data.tipo === 'anamnese' ? 'text-black/70' : 'text-white/50'}`}>
                    Admissão e histórico clínico integral (Roteiro Adulto & Pedagógico)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('tipo', 'evolucao')}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    data.tipo === 'evolucao'
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-white/[0.04] border-white/[0.12] text-white/80 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="text-[13.5px] font-medium">Evolução Diária (SOAP)</div>
                  <div className={`text-[11.5px] mt-0.5 ${data.tipo === 'evolucao' ? 'text-black/70' : 'text-white/50'}`}>
                    Visita diária e resumo de problemas #1 a #7
                  </div>
                </button>
              </div>
            </div>

            {/* Patient Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">
                  Nome / Iniciais do Paciente
                </label>
                <input
                  type="text"
                  value={data.identificacao.nomeIniciais}
                  onChange={(e) => updateNested('identificacao', 'nomeIniciais', e.target.value)}
                  placeholder="Ex: M.A.S. ou Nome do Paciente"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">Idade</label>
                  <input
                    type="text"
                    value={data.identificacao.idade}
                    onChange={(e) => updateNested('identificacao', 'idade', e.target.value)}
                    placeholder="Ex: 58"
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">Unidade</label>
                  <select
                    value={data.identificacao.idadeUnidade}
                    onChange={(e) => updateNested('identificacao', 'idadeUnidade', e.target.value as any)}
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white p-3 text-[13px] outline-none transition cursor-pointer"
                  >
                    <option value="anos" className="bg-[#121316] text-white">Anos</option>
                    <option value="meses" className="bg-[#121316] text-white">Meses</option>
                    <option value="dias" className="bg-[#121316] text-white">Dias</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Sexo Biológico</label>
                <select
                  value={data.identificacao.sexo}
                  onChange={(e) => updateNested('identificacao', 'sexo', e.target.value as any)}
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white p-3 text-[13px] outline-none transition cursor-pointer"
                >
                  <option value="M" className="bg-[#121316] text-white">Masculino (M)</option>
                  <option value="F" className="bg-[#121316] text-white">Feminino (F)</option>
                  <option value="outro" className="bg-[#121316] text-white">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Leito / Enfermaria</label>
                <input
                  type="text"
                  value={data.identificacao.leito}
                  onChange={(e) => updateNested('identificacao', 'leito', e.target.value)}
                  placeholder="Ex: Leito 12 / Enfermaria Cirúrgica"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Data do Atendimento</label>
                <input
                  type="text"
                  value={data.identificacao.data}
                  onChange={(e) => updateNested('identificacao', 'data', e.target.value)}
                  placeholder="Ex: 27/09/2026"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Hora do Atendimento</label>
                <input
                  type="text"
                  value={data.identificacao.hora}
                  onChange={(e) => updateNested('identificacao', 'hora', e.target.value)}
                  placeholder="Ex: 08:30"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[12px] text-white/70 mb-1.5">Nome do Usuário / Responsável</label>
                <input
                  type="text"
                  value={data.identificacao.responsavel}
                  onChange={(e) => updateNested('identificacao', 'responsavel', e.target.value)}
                  placeholder="Seu nome completo para assinatura"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Informante / Acompanhante</label>
                <input
                  type="text"
                  value={data.identificacao.acompanhante}
                  onChange={(e) => updateNested('identificacao', 'acompanhante', e.target.value)}
                  placeholder="Ex: Próprio paciente (confiabilidade boa)"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Profissão / Ocupação</label>
                <input
                  type="text"
                  value={data.identificacao.ocupacao}
                  onChange={(e) => updateNested('identificacao', 'ocupacao', e.target.value)}
                  placeholder="Ex: Eletricista / Aposentado"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Naturalidade & Procedência</label>
                <input
                  type="text"
                  value={data.identificacao.naturalidade}
                  onChange={(e) => updateNested('identificacao', 'naturalidade', e.target.value)}
                  placeholder="Ex: Natural de Porto Alegre, reside em Canoas há 10 anos"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Grau de Confiabilidade</label>
                <select
                  value={data.identificacao.confiabilidade}
                  onChange={(e) => updateNested('identificacao', 'confiabilidade', e.target.value as any)}
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white p-3 text-[13px] outline-none transition cursor-pointer"
                >
                  <option value="boa" className="bg-[#121316] text-white">Boa (Lúcido, coerente e colaborativo)</option>
                  <option value="moderada" className="bg-[#121316] text-white">Moderada (Algumas dúvidas ou contradições)</option>
                  <option value="duvidosa" className="bg-[#121316] text-white">Duvidosa (Histórico vago / desorientado)</option>
                  <option value="prejudicada" className="bg-[#121316] text-white">Prejudicada (Rebaixamento de consciência / informante indireto)</option>
                </select>
              </div>
            </div>

            {/* Toggle: Campos Detalhados do Roteiro Adulto (PUCRS) */}
            <div className="pt-2 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setShowDetailedId(!showDetailedId)}
                className="inline-flex items-center space-x-2 text-[12px] text-white/70 hover:text-white py-1 px-3 rounded-lg bg-neutral-900 border border-neutral-800 border border-white/[0.1] transition"
              >
                {showDetailedId ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                <span>
                  {showDetailedId
                    ? 'Ocultar campos secundários de identificação'
                    : '+ Expandir campos detalhados do Roteiro Adulto (PUCRS: Cor/Etnia, Estado Civil, Religião, Escolaridade, Mãe, SUS)'}
                </span>
              </button>

              {showDetailedId && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/[0.06] animate-in fade-in duration-150">
                  <div>
                    <label className="block text-[12px] text-white/70 mb-1.5">Cor / Raça / Etnia</label>
                    <input
                      type="text"
                      value={data.identificacao.corEtnia || ''}
                      onChange={(e) => updateNested('identificacao', 'corEtnia', e.target.value)}
                      placeholder="Ex: Branca, Parda, Preta, Amarela, Indígena"
                      className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 text-white placeholder:text-white/30 p-3 text-[13px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-white/70 mb-1.5">Estado Civil</label>
                    <input
                      type="text"
                      value={data.identificacao.estadoCivil || ''}
                      onChange={(e) => updateNested('identificacao', 'estadoCivil', e.target.value)}
                      placeholder="Ex: Solteiro, Casado, União Estável, Viúvo"
                      className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 text-white placeholder:text-white/30 p-3 text-[13px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-white/70 mb-1.5">Religião / Espiritualidade</label>
                    <input
                      type="text"
                      value={data.identificacao.religiao || ''}
                      onChange={(e) => updateNested('identificacao', 'religiao', e.target.value)}
                      placeholder="Ex: Católica, Evangélica, Espírita (relevante para transfusões)"
                      className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 text-white placeholder:text-white/30 p-3 text-[13px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-white/70 mb-1.5">Escolaridade</label>
                    <input
                      type="text"
                      value={data.identificacao.escolaridade || ''}
                      onChange={(e) => updateNested('identificacao', 'escolaridade', e.target.value)}
                      placeholder="Ex: Ensino Médio Completo / Superior"
                      className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 text-white placeholder:text-white/30 p-3 text-[13px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-white/70 mb-1.5">Filiação / Nome da Mãe</label>
                    <input
                      type="text"
                      value={data.identificacao.filiacao || ''}
                      onChange={(e) => updateNested('identificacao', 'filiacao', e.target.value)}
                      placeholder="Ex: Nome completo da mãe ou responsável"
                      className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 text-white placeholder:text-white/30 p-3 text-[13px] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-white/70 mb-1.5">Convênio / SUS & Clínica</label>
                    <input
                      type="text"
                      value={data.identificacao.convenioSus || ''}
                      onChange={(e) => updateNested('identificacao', 'convenioSus', e.target.value)}
                      placeholder="Ex: SUS / Clínica Médica Adulto"
                      className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 text-white placeholder:text-white/30 p-3 text-[13px] outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= STEP 2: QUEIXA & MOTIVO ================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-[16px] font-medium text-white flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-white/80" />
                <span>Etapa 2: Queixa Principal & Motivo da Internação</span>
              </h3>
              <p className="text-[12.5px] text-white/60 mt-0.5">
                Descreva sucintamente a razão da admissão e o tempo cronológico de evolução.
              </p>
            </div>

            {data.tipo === 'anamnese' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Queixa Principal (QP) com Tempo de Duração
                  </label>
                  <input
                    type="text"
                    value={data.queixaPrincipal}
                    onChange={(e) => updateField('queixaPrincipal', e.target.value)}
                    placeholder="Ex: Dor precordial em aperto e falta de ar há 3 horas"
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3.5 text-[13.5px] outline-none transition"
                  />
                  <span className="text-[11.5px] text-white/40 mt-1.5 block">
                    * Sintoma guia acompanhado do tempo exato de evolução clínica.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-white/70 mb-1.5">
                      Tempo de Internação Hospitalar (#1 D_ IH)
                    </label>
                    <input
                      type="text"
                      value={data.resumoProblemas.tempoInternacao}
                      onChange={(e) => updateNested('resumoProblemas', 'tempoInternacao', e.target.value)}
                      placeholder="Ex: D3 IH"
                      className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-white/70 mb-1.5">
                      Motivo / Diagnóstico da Internação (#2)
                    </label>
                    <input
                      type="text"
                      value={data.resumoProblemas.motivoInternacao}
                      onChange={(e) => updateNested('resumoProblemas', 'motivoInternacao', e.target.value)}
                      placeholder="Ex: ICC descompensada perfil B"
                      className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Intercorrências nas Últimas 24 Horas (#3)
                  </label>
                  <input
                    type="text"
                    value={data.resumoProblemas.intercorrencias}
                    onChange={(e) => updateNested('resumoProblemas', 'intercorrencias', e.target.value)}
                    placeholder="Ex: Sem intercorrências agudas nas últimas 24 horas."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Acessos e Dispositivos Invasivos (#6)
                  </label>
                  <input
                    type="text"
                    value={data.resumoProblemas.acessosDispositivos}
                    onChange={(e) => updateNested('resumoProblemas', 'acessosDispositivos', e.target.value)}
                    placeholder="Ex: AVP em MSE, em ar ambiente, sem SVD."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 3: HDA / SUBJETIVO ================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-[16px] font-medium text-white flex items-center space-x-2">
                <FileText className="h-4 w-4 text-white/80" />
                <span>
                  {data.tipo === 'anamnese'
                    ? 'Etapa 3: História da Doença Atual (HDA)'
                    : 'Etapa 3: Subjetivo (S) — Relato do Paciente'}
                </span>
              </h3>
              <p className="text-[12.5px] text-white/60 mt-0.5">
                {data.tipo === 'anamnese'
                  ? 'Narrativa cronológica e semiológica completa desde o início dos sintomas até o atendimento.'
                  : 'Sintomas subjetivos relatados pelo paciente na visita do dia e negativas relevantes.'}
              </p>
            </div>

            {data.tipo === 'anamnese' ? (
              <div className="space-y-4">
                {/* Assistente Semiológico dos Roteiros */}
                <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[12px]">
                  <div className="flex items-center space-x-2 text-white/70">
                    <Sparkles className="h-3.5 w-3.5 text-white/90" />
                    <span>Assistente Semiológico:</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const template = generate8AttributesHdaTemplate(
                          data.queixaPrincipal,
                          '',
                          data.sinaisVitais.dorEscala || '',
                          ''
                        );
                        updateField('hda', data.hda.trim() ? `${data.hda}\n\n${template}` : template);
                      }}
                      className="inline-flex items-center space-x-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-white/20 border border-white/15 px-3 py-1 text-white/90 transition text-[11.5px]"
                      title="Inserir estrutura semiológica dos 8 atributos do sintoma-guia"
                    >
                      <span>⚡ Roteiro 8 Atributos (PUCRS)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const template = generateFifeHdaTemplate();
                        updateField('hda', data.hda.trim() ? `${data.hda}\n\n${template}` : template);
                      }}
                      className="inline-flex items-center space-x-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-white/20 border border-white/15 px-3 py-1 text-white/90 transition text-[11.5px]"
                      title="Inserir estrutura das 4 dimensões do Modelo FIFE na HDA"
                    >
                      <span>⚡ Modelo FIFE (MCCP)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[12px] text-white/70">
                      História da Doença Atual (HDA)
                    </label>
                    <span className="text-[11px] text-white/40">
                      8 atributos: Início, Localização, Caráter, Intensidade, Duração, Fatores Melhora/Piora, Associados, Evolução
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={data.hda}
                    onChange={(e) => updateField('hda', e.target.value)}
                    placeholder="Descreva o início dos sintomas (súbito ou insidioso), evolução temporal, características semiológicas completas (localização, irradiação, intensidade, qualidade da dor), fatores de melhora e piora, sintomas associados e impacto funcional..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-4 text-[13.5px] outline-none transition leading-relaxed"
                  />
                </div>

                {/* Seção Pedagógica: Modelo FIFE (Experiência da Doença pelo Paciente) */}
                <div className="pt-3 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-white/80" />
                      <h4 className="text-[13px] font-medium text-white">
                        Experiência da Doença pelo Paciente (Modelo FIFE — Roteiro Pedagógico)
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowFifeSection(!showFifeSection)}
                      className="text-[11.5px] text-white/60 hover:text-white transition"
                    >
                      {showFifeSection ? 'Recolher FIFE' : 'Expandir FIFE'}
                    </button>
                  </div>

                  {showFifeSection && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                      <div>
                        <label className="block text-[11.5px] text-white/80 mb-1">
                          <strong>F - Sentimentos (Feelings)</strong>: Temores e medos do paciente
                        </label>
                        <input
                          type="text"
                          value={data.experienciaDoencaFife?.sentimentos || ''}
                          onChange={(e) => updateFife('sentimentos', e.target.value)}
                          placeholder="Ex: Medo de infarto, angústia com a persistência da dor..."
                          className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white placeholder:text-white/30 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11.5px] text-white/80 mb-1">
                          <strong>I - Ideias (Ideas)</strong>: O que o paciente pensa sobre a causa
                        </label>
                        <input
                          type="text"
                          value={data.experienciaDoencaFife?.ideias || ''}
                          onChange={(e) => updateFife('ideias', e.target.value)}
                          placeholder="Ex: Acha que é estresse ou problema na circulação..."
                          className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white placeholder:text-white/30 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11.5px] text-white/80 mb-1">
                          <strong>F - Função (Function)</strong>: Impacto no trabalho, rotina e sono
                        </label>
                        <input
                          type="text"
                          value={data.experienciaDoencaFife?.funcao || ''}
                          onChange={(e) => updateFife('funcao', e.target.value)}
                          placeholder="Ex: Não consegue trabalhar, faltou ao serviço, sono interrompido..."
                          className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white placeholder:text-white/30 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11.5px] text-white/80 mb-1">
                          <strong>E - Expectativas (Expectations)</strong>: O que espera da consulta
                        </label>
                        <input
                          type="text"
                          value={data.experienciaDoencaFife?.expectativas || ''}
                          onChange={(e) => updateFife('expectativas', e.target.value)}
                          placeholder="Ex: Espera alívio da dor, saber o diagnóstico e evitar cirurgia..."
                          className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white placeholder:text-white/30 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Paciente Relata (Como passou as últimas 24h)
                  </label>
                  <textarea
                    rows={3}
                    value={data.pacienteRelata}
                    onChange={(e) => updateField('pacienteRelata', e.target.value)}
                    placeholder="Ex: Refere melhora progressiva da falta de ar, dormiu bem à noite com 1 travesseiro, boa aceitação da dieta..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Sintomas Atuais no Momento da Avaliação
                  </label>
                  <input
                    type="text"
                    value={data.sintomasAtuais}
                    onChange={(e) => updateField('sintomasAtuais', e.target.value)}
                    placeholder="Ex: Discreta tosse seca eventual; diurese abundante e satisfatória."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Negativas Relevantes
                  </label>
                  <input
                    type="text"
                    value={data.negativasRelevantes}
                    onChange={(e) => updateField('negativasRelevantes', e.target.value)}
                    placeholder="Ex: Nega dor torácica, febre, palpitações ou ortopneia nas últimas 24h."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>
              </div>
            )}

            {/* Differential Logic bridge banner */}
            {(data.queixaPrincipal?.trim() || data.hda?.trim()) && (
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[12px] text-white/70">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="h-4 w-4 text-white/70 shrink-0" />
                  <span>
                    O assistente diferencial correlacionará estes sintomas com as manobras e achados físicos dirigidos.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(6);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-white/20 text-white font-medium text-[11px] transition active:scale-95 shrink-0 self-start sm:self-auto"
                >
                  <span>Ver Manobras no Exame Físico (Etapa 6)</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 4: ANTECEDENTES & HÁBITOS ================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-[16px] font-medium text-white flex items-center space-x-2">
                <History className="h-4 w-4 text-white/80" />
                <span>Etapa 4: Antecedentes Pessoais, Medicamentos, Alergias & Hábitos</span>
              </h3>
              <p className="text-[12.5px] text-white/60 mt-0.5">
                Histórico patológico prévio, cirurgias, medicamentos contínuos e alergias.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">
                  Antecedentes Pessoais Patológicos (HPP / Comorbidades & Cirurgias)
                </label>
                <textarea
                  rows={3}
                  value={data.hpp}
                  onChange={(e) => updateField('hpp', e.target.value)}
                  placeholder="Ex: Hipertensão Arterial Sistêmica há 15 anos, Diabetes Mellitus Tipo 2, dislipidemia. Cirurgias prévias: apendicectomia há 20 anos. Nega transfusões de sangue..."
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Medicamentos em Uso Contínuo (Nome, Dose e Posologia)
                  </label>
                  <textarea
                    rows={2}
                    value={data.resumoProblemas.tratamentosFimDefinido}
                    onChange={(e) => updateNested('resumoProblemas', 'tratamentosFimDefinido', e.target.value)}
                    placeholder="Ex: Losartana 50mg 1x/dia, Metformina 850mg 2x/dia, AAS 100mg após almoço..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-white font-medium mb-1.5">
                    Alergias Medicamentosas & Tipo de Reação
                  </label>
                  <textarea
                    rows={2}
                    value={data.resumoProblemas.comorbidadesAlergias}
                    onChange={(e) => updateNested('resumoProblemas', 'comorbidadesAlergias', e.target.value)}
                    placeholder="Ex: Nega alergias conhecidas ou Alergia a Penicilina (urticária e angioedema)"
                    className="w-full rounded-lg bg-white/[0.08] border border-white/30 focus:border-white/60 text-white placeholder:text-white/40 p-3 text-[13px] outline-none transition"
                  />
                </div>
              </div>

              {/* Antecedentes Fisiológicos & Familiares */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Antecedentes Fisiológicos (APF: Parto, DNPM, Vacinação)
                  </label>
                  <input
                    type="text"
                    value={data.antecedentesFisiologicos || data.historiaFisiologica}
                    onChange={(e) => {
                      updateField('antecedentesFisiologicos', e.target.value);
                      updateField('historiaFisiologica', e.target.value);
                    }}
                    placeholder="Ex: Parto a termo, vacinação do adulto em dia (COVID/Tétano/Gripe)..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    História Familiar (AF: DAC Precoce, HAS, DM, Neoplasias)
                  </label>
                  <input
                    type="text"
                    value={data.historiaFamiliar}
                    onChange={(e) => updateField('historiaFamiliar', e.target.value)}
                    placeholder="Ex: Pai infartado aos 52 anos (DAC precoce), mãe hipertensa..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>
              </div>

              {/* Seção Estruturada de Hábitos de Vida & Calculadora de Anos-Maço */}
              <div className="pt-3 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-4 w-4 text-white/80" />
                    <h4 className="text-[13px] font-medium text-white">
                      Hábitos de Vida & Carga Tabágica (Roteiro Adulto PUCRS)
                    </h4>
                  </div>
                  {data.habitosVidaDetalhado?.cargaTabagicaAnosMaco && (
                    <span className="rounded-full bg-white/20 border border-white/25 px-3 py-0.5 text-[11px] font-medium text-white">
                      Carga: {data.habitosVidaDetalhado.cargaTabagicaAnosMaco} anos-maço
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11.5px] text-white/70 mb-1">Status Tabágico</label>
                      <select
                        value={data.habitosVidaDetalhado?.tabagismoStatus || ''}
                        onChange={(e) => {
                          const status = e.target.value as any;
                          const currentHab = data.habitosVidaDetalhado || {
                            tabagismoStatus: '',
                            cigarrosDia: '',
                            anosFumo: '',
                            cargaTabagicaAnosMaco: '',
                            etilismo: '',
                            drogasIlicitas: '',
                            alimentacao: '',
                            atividadeFisica: '',
                            padraoSono: '',
                            condicoesMoradia: '',
                            riscosOcupacionais: '',
                          };
                          updateField('habitosVidaDetalhado', {
                            ...currentHab,
                            tabagismoStatus: status,
                          });
                        }}
                        className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white outline-none cursor-pointer"
                      >
                        <option value="" className="bg-[#121316] text-white">Selecione...</option>
                        <option value="nunca-fumou" className="bg-[#121316] text-white">Nunca fumou</option>
                        <option value="fumante-ativo" className="bg-[#121316] text-white">Fumante ativo</option>
                        <option value="ex-fumante" className="bg-[#121316] text-white">Ex-fumante</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11.5px] text-white/70 mb-1">Cigarros / Dia</label>
                      <input
                        type="number"
                        min="0"
                        value={data.habitosVidaDetalhado?.cigarrosDia || ''}
                        onChange={(e) => {
                          const cigs = e.target.value;
                          const anos = data.habitosVidaDetalhado?.anosFumo || '';
                          const packYears = calculatePackYears(cigs, anos);
                          const currentHab = data.habitosVidaDetalhado || {
                            tabagismoStatus: 'fumante-ativo',
                            cigarrosDia: '',
                            anosFumo: '',
                            cargaTabagicaAnosMaco: '',
                            etilismo: '',
                            drogasIlicitas: '',
                            alimentacao: '',
                            atividadeFisica: '',
                            padraoSono: '',
                            condicoesMoradia: '',
                            riscosOcupacionais: '',
                          };
                          updateField('habitosVidaDetalhado', {
                            ...currentHab,
                            cigarrosDia: cigs,
                            cargaTabagicaAnosMaco: packYears.toString(),
                          });
                        }}
                        placeholder="Ex: 20 (1 maço)"
                        className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white placeholder:text-white/30 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11.5px] text-white/70 mb-1">Anos de Tabagismo</label>
                      <input
                        type="number"
                        min="0"
                        value={data.habitosVidaDetalhado?.anosFumo || ''}
                        onChange={(e) => {
                          const anos = e.target.value;
                          const cigs = data.habitosVidaDetalhado?.cigarrosDia || '';
                          const packYears = calculatePackYears(cigs, anos);
                          const currentHab = data.habitosVidaDetalhado || {
                            tabagismoStatus: 'fumante-ativo',
                            cigarrosDia: '',
                            anosFumo: '',
                            cargaTabagicaAnosMaco: '',
                            etilismo: '',
                            drogasIlicitas: '',
                            alimentacao: '',
                            atividadeFisica: '',
                            padraoSono: '',
                            condicoesMoradia: '',
                            riscosOcupacionais: '',
                          };
                          updateField('habitosVidaDetalhado', {
                            ...currentHab,
                            anosFumo: anos,
                            cargaTabagicaAnosMaco: packYears.toString(),
                          });
                        }}
                        placeholder="Ex: 30 anos"
                        className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white placeholder:text-white/30 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11.5px] text-white/70 mb-1">Etilismo</label>
                      <input
                        type="text"
                        value={data.habitosVidaDetalhado?.etilismo || ''}
                        onChange={(e) => {
                          const currentHab = data.habitosVidaDetalhado || {
                            tabagismoStatus: '',
                            cigarrosDia: '',
                            anosFumo: '',
                            cargaTabagicaAnosMaco: '',
                            etilismo: '',
                            drogasIlicitas: '',
                            alimentacao: '',
                            atividadeFisica: '',
                            padraoSono: '',
                            condicoesMoradia: '',
                            riscosOcupacionais: '',
                          };
                          updateField('habitosVidaDetalhado', {
                            ...currentHab,
                            etilismo: e.target.value,
                          });
                        }}
                        placeholder="Ex: Social nos finais de semana ou abstêmio"
                        className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white placeholder:text-white/30 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11.5px] text-white/70 mb-1">
                      Condições de Moradia, Saneamento, Sono & Riscos Ocupacionais
                    </label>
                    <input
                      type="text"
                      value={data.historiaSocial}
                      onChange={(e) => updateField('historiaSocial', e.target.value)}
                      placeholder="Ex: Casa de alvenaria com saneamento básico; sono de 7h/noite; nega exposição a poeiras minerais ou agrotóxicos"
                      className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white placeholder:text-white/30 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 5: SINAIS VITAIS ================= */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-[16px] font-medium text-white flex items-center space-x-2">
                <Activity className="h-4 w-4 text-white/80" />
                <span>Etapa 5: Sinais Vitais & Dados Fisiológicos</span>
              </h3>
              <p className="text-[12.5px] text-white/60 mt-0.5">
                Parâmetros hemodinâmicos e metabólicos aferidos no exame do paciente.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">PA (mmHg)</label>
                <input
                  type="text"
                  value={data.sinaisVitais.pa}
                  onChange={(e) => updateNested('sinaisVitais', 'pa', e.target.value)}
                  placeholder="Ex: 120x80"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">FC (bpm)</label>
                <input
                  type="text"
                  value={data.sinaisVitais.fc}
                  onChange={(e) => updateNested('sinaisVitais', 'fc', e.target.value)}
                  placeholder="Ex: 75"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">FR (irpm)</label>
                <input
                  type="text"
                  value={data.sinaisVitais.fr}
                  onChange={(e) => updateNested('sinaisVitais', 'fr', e.target.value)}
                  placeholder="Ex: 16"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Tax (°C)</label>
                <input
                  type="text"
                  value={data.sinaisVitais.tax}
                  onChange={(e) => updateNested('sinaisVitais', 'tax', e.target.value)}
                  placeholder="Ex: 36.5"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">SatO2 (%)</label>
                <input
                  type="text"
                  value={data.sinaisVitais.satO2}
                  onChange={(e) => updateNested('sinaisVitais', 'satO2', e.target.value)}
                  placeholder="Ex: 98"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Suporte O2</label>
                <input
                  type="text"
                  value={data.sinaisVitais.o2Suporte}
                  onChange={(e) => updateNested('sinaisVitais', 'o2Suporte', e.target.value)}
                  placeholder="Ex: AA ou Cateter 2 L/min"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Glicemia</label>
                <input
                  type="text"
                  value={data.sinaisVitais.glicemia}
                  onChange={(e) => updateNested('sinaisVitais', 'glicemia', e.target.value)}
                  placeholder="Ex: 110 mg/dL"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Escala de Dor</label>
                <input
                  type="text"
                  value={data.sinaisVitais.dorEscala}
                  onChange={(e) => updateNested('sinaisVitais', 'dorEscala', e.target.value)}
                  placeholder="Ex: 0/10 ou 7/10"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/[0.08]">
              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Diurese</label>
                <input
                  type="text"
                  value={data.sinaisVitais.diurese}
                  onChange={(e) => updateNested('sinaisVitais', 'diurese', e.target.value)}
                  placeholder="Ex: clara, espontânea, 1500 ml/24h"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Evacuações</label>
                <input
                  type="text"
                  value={data.sinaisVitais.evacuacoes}
                  onChange={(e) => updateNested('sinaisVitais', 'evacuacoes', e.target.value)}
                  placeholder="Ex: presentes, normais"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">Balanço Hídrico</label>
                <input
                  type="text"
                  value={data.sinaisVitais.balanco}
                  onChange={(e) => updateNested('sinaisVitais', 'balanco', e.target.value)}
                  placeholder="Ex: zerado ou -500 ml/24h"
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 6: EXAME FÍSICO ================= */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-[16px] font-medium text-white flex items-center space-x-2">
                <Stethoscope className="h-4 w-4 text-white/80" />
                <span>Etapa 6: Exame Físico Dirigido por Aparelhos</span>
              </h3>
              <p className="text-[12.5px] text-white/60 mt-0.5">
                Descreva os achados objetivos observados no exame dos aparelhos e sistemas.
              </p>
            </div>

            {/* Diagnostic Differential Semiotic Logic Helper based on QP & HDA */}
            <DifferentialExamHelper
              queixaPrincipal={data.queixaPrincipal}
              hda={data.hda}
              exameFisico={data.exameFisico}
              sinaisVitais={data.sinaisVitais}
              onApplyFinding={handleApplyDifferentialFinding}
            />

            <div className="space-y-4">
              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">
                  Estado Geral & Ectoscopia
                </label>
                <input
                  type="text"
                  value={data.exameFisico.estadoGeral}
                  onChange={(e) => updateNested('exameFisico', 'estadoGeral', e.target.value)}
                  placeholder="Ex: Bom estado geral, lúcido e orientado, corado, hidratado, anictérico, acianótico, afebril..."
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">
                  Cabeça & Pescoço (Pupilas, Mucosas, Turgência Jugular, Linfonodos, Tireoide)
                </label>
                <input
                  type="text"
                  value={data.exameFisico.cabecaPescoco || ''}
                  onChange={(e) => updateNested('exameFisico', 'cabecaPescoco', e.target.value)}
                  placeholder="Ex: Pupilas isocóricas e fotorreagentes, mucosas úmidas e coradas, sem turgência jugular patológica a 45°, tireoide impalpável..."
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Aparelho Respiratório (AR)
                  </label>
                  <textarea
                    rows={2}
                    value={data.exameFisico.aResp}
                    onChange={(e) => updateNested('exameFisico', 'aResp', e.target.value)}
                    placeholder="Ex: Murmúrio vesicular universalmente audível sem ruídos adventícios, eupneico em ar ambiente..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Aparelho Cardiovascular (ACV)
                  </label>
                  <textarea
                    rows={2}
                    value={data.exameFisico.acv}
                    onChange={(e) => updateNested('exameFisico', 'acv', e.target.value)}
                    placeholder="Ex: Ritmo cardíaco regular em 2 tempos, bulhas normofonéticas, sem sopros audíveis..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Abdome
                  </label>
                  <textarea
                    rows={2}
                    value={data.exameFisico.abdome}
                    onChange={(e) => updateNested('exameFisico', 'abdome', e.target.value)}
                    placeholder="Ex: Plano, flácido, ruídos presentes, indolor à palpação superficial e profunda, descompressão brusca negativa..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Extremidades
                  </label>
                  <textarea
                    rows={2}
                    value={data.exameFisico.extremidades}
                    onChange={(e) => updateNested('exameFisico', 'extremidades', e.target.value)}
                    placeholder="Ex: Pulsos periféricos palpáveis e simétricos, boa perfusão periférica (TEC < 2s), sem edemas em MMII..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">
                  Neurológico & Pele
                </label>
                <input
                  type="text"
                  value={data.exameFisico.neurologicoPele}
                  onChange={(e) => updateNested('exameFisico', 'neurologicoPele', e.target.value)}
                  placeholder="Ex: Glasgow 15, orientado temporo-espacialmente, sem déficits motores ou sensitivos focais..."
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 7: DIAGNÓSTICO (CID-10) ================= */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-[16px] font-medium text-white flex items-center space-x-2">
                <Target className="h-4 w-4 text-white/80" />
                <span>Etapa 7: Raciocínio Clínico Semiológico & Hipótese Diagnóstica (CID-10)</span>
              </h3>
              <p className="text-[12.5px] text-white/60 mt-0.5">
                Definição do raciocínio diagnóstico em 3 níveis (Sindrômico, Topográfico, Etiológico) e busca local de código CID-10.
              </p>
            </div>

            {/* Raciocínio Clínico em Três Níveis (Roteiro Pedagógico) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.1] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-white/80" />
                  <h4 className="text-[13px] font-medium text-white">
                    Raciocínio Clínico em Três Níveis (Roteiro Pedagógico)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDiagnosticLevels(!showDiagnosticLevels)}
                  className="text-[11.5px] text-white/60 hover:text-white transition"
                >
                  {showDiagnosticLevels ? 'Recolher Níveis' : 'Expandir Níveis'}
                </button>
              </div>

              {showDiagnosticLevels && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div>
                    <label className="block text-[11.5px] text-white/70 mb-1">
                      1. Diagnóstico Sindrômico
                    </label>
                    <input
                      type="text"
                      value={data.raciocinioClinico?.sindromico || ''}
                      onChange={(e) => updateRaciocinio('sindromico', e.target.value)}
                      placeholder="Ex: Síndrome Coronariana Aguda / Síndrome Dispneica"
                      className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white placeholder:text-white/30 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11.5px] text-white/70 mb-1">
                      2. Diagnóstico Topográfico / Anatômico
                    </label>
                    <input
                      type="text"
                      value={data.raciocinioClinico?.topografico || ''}
                      onChange={(e) => updateRaciocinio('topografico', e.target.value)}
                      placeholder="Ex: Parede anterior do miocárdio ventricular esquerdo"
                      className="w-full rounded-xl bg-white/[0.04] border border-white/[0.12] p-2.5 text-[12.5px] text-white placeholder:text-white/30 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Embedded CID-10 Local Search Box */}
            <CidSearchBox
              currentCidCode={data.hipotesePrincipal.codigoCid}
              currentCidName={data.hipotesePrincipal.nomeCid}
              onSelectPrimaryCid={handleSelectPrimaryCid}
              onAddDifferentialCid={handleAddDifferentialItem}
            />

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Código CID-10
                  </label>
                  <input
                    type="text"
                    value={data.hipotesePrincipal.codigoCid}
                    onChange={(e) => updateNested('hipotesePrincipal', 'codigoCid', e.target.value)}
                    placeholder="Ex: I21.0 ou I50.9"
                    className="w-full rounded-lg bg-white/[0.08] border border-white/30 focus:border-white/60 text-white font-medium placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Nome da Hipótese Diagnóstica Principal
                  </label>
                  <input
                    type="text"
                    value={data.hipotesePrincipal.nomeCid}
                    onChange={(e) => updateNested('hipotesePrincipal', 'nomeCid', e.target.value)}
                    placeholder="Ex: Infarto Agudo do Miocárdio com Supradesnivelamento de ST"
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">
                  Justificativa Clínica / Semiológica da Hipótese
                </label>
                <textarea
                  rows={3}
                  value={data.hipotesePrincipal.justificativa}
                  onChange={(e) => updateNested('hipotesePrincipal', 'justificativa', e.target.value)}
                  placeholder="Ex: Quadro clínico compatível baseado na dor torácica opressiva típica há 3 horas, irradiação para MSE, diaforese fria e fatores de risco..."
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>

              {/* Differentials */}
              <div className="pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[12.5px] font-medium text-white">
                    Diagnósticos Diferenciais Considerados
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddDifferential}
                    className="inline-flex items-center space-x-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-white/20 border border-white/15 px-3 py-1 text-[11.5px] text-white transition"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Adicionar Diferencial</span>
                  </button>
                </div>

                {data.diferenciais.length === 0 ? (
                  <p className="text-[12px] text-white/40 italic">
                    Nenhum diagnóstico diferencial cadastrado. Clique no botão acima para adicionar se houver.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.diferenciais.map((diff, index) => (
                      <div key={index} className="p-3.5 rounded-lg border border-white/[0.1] bg-white/[0.02] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-white/60 font-medium">
                            Diferencial #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveDifferential(index)}
                            className="text-white/40 hover:text-white"
                            title="Remover"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={diff.codigoCid}
                            onChange={(e) => {
                              const newDiffs = [...data.diferenciais];
                              newDiffs[index].codigoCid = e.target.value;
                              updateField('diferenciais', newDiffs);
                            }}
                            placeholder="CID-10 (Ex: I26.9)"
                            className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-2 text-[12px] text-white"
                          />
                          <input
                            type="text"
                            value={diff.nomeCid}
                            onChange={(e) => {
                              const newDiffs = [...data.diferenciais];
                              newDiffs[index].nomeCid = e.target.value;
                              updateField('diferenciais', newDiffs);
                            }}
                            placeholder="Nome (Ex: Tromboembolismo Pulmonar)"
                            className="sm:col-span-2 rounded-xl border border-white/[0.12] bg-white/[0.04] p-2 text-[12px] text-white"
                          />
                        </div>
                        <input
                          type="text"
                          value={diff.justificativa}
                          onChange={(e) => {
                            const newDiffs = [...data.diferenciais];
                            newDiffs[index].justificativa = e.target.value;
                            updateField('diferenciais', newDiffs);
                          }}
                          placeholder="Justificativa para afastar ou investigar..."
                          className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] p-2 text-[12px] text-white"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 8: EXAMES COMPLEMENTARES ================= */}
        {currentStep === 8 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-[16px] font-medium text-white flex items-center space-x-2">
                <FileCheck2 className="h-4 w-4 text-white/80" />
                <span>Etapa 8: Exames Complementares Solicitados & Justificativas</span>
              </h3>
              <p className="text-[12.5px] text-white/60 mt-0.5">
                Conforme as diretrizes assistenciais, cada exame solicitado deve possuir finalidade diagnóstica explícita.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] text-white/70">
                  Lista de Exames ({data.examesComplementares.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddExam}
                  className="inline-flex items-center space-x-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-white/20 border border-white/15 px-3 py-1 text-[11.5px] text-white transition"
                >
                  <Plus className="h-3 w-3" />
                  <span>Adicionar Exame</span>
                </button>
              </div>

              {data.examesComplementares.length === 0 ? (
                <div className="p-8 rounded-lg border border-white/[0.08] text-center text-[12.5px] text-white/40">
                  Nenhum exame cadastrado. Clique no botão acima para adicionar exames laboratoriais ou de imagem.
                </div>
              ) : (
                <div className="space-y-3">
                  {data.examesComplementares.map((item, index) => (
                    <div key={item.id || index} className="p-4 rounded-lg border border-white/[0.1] bg-white/[0.02] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-white/60">
                          Exame #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExam(index)}
                          className="text-white/40 hover:text-white"
                          title="Remover exame"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-white/50 mb-1">
                            Nome do Exame
                          </label>
                          <input
                            type="text"
                            value={item.exame}
                            onChange={(e) => {
                              const updated = [...data.examesComplementares];
                              updated[index].exame = e.target.value;
                              updateField('examesComplementares', updated);
                            }}
                            placeholder="Ex: Troponina I ultrassensível seriada"
                            className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] p-2 text-[12px] text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-white/50 mb-1">
                            Finalidade Clínica Explícita
                          </label>
                          <input
                            type="text"
                            value={item.finalidade}
                            onChange={(e) => {
                              const updated = [...data.examesComplementares];
                              updated[index].finalidade = e.target.value;
                              updateField('examesComplementares', updated);
                            }}
                            placeholder="Ex: Confirmação de necrose miocárdica aguda"
                            className="w-full rounded-xl border border-white/[0.12] bg-white/[0.04] p-2 text-[12px] text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">
                  Conduta Diagnóstica Adicional / Exames Já Realizados
                </label>
                <textarea
                  rows={2}
                  value={data.condutaDiagnostica}
                  onChange={(e) => updateField('condutaDiagnostica', e.target.value)}
                  placeholder="Ex: ECG de admissão evidenciando supradesnivelamento de ST em parede anterior (V1-V4); RX de tórax no leito..."
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 9: CONDUTA & PRESCRIÇÃO ================= */}
        {currentStep === 9 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-[16px] font-medium text-white flex items-center space-x-2">
                <Pill className="h-4 w-4 text-white/80" />
                <span>Etapa 9: Conduta e Prescrição Terapêutica Inicial</span>
              </h3>
              <p className="text-[12.5px] text-white/60 mt-0.5">
                Plano terapêutico detalhado, itens da prescrição médica, cuidados gerais e planejamento de seguimento.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[12px] text-white/70 mb-1.5">
                  Conduta Terapêutica / Prescrição Inicial (Numere os Itens)
                </label>
                <textarea
                  rows={8}
                  value={data.condutaTerapeutica}
                  onChange={(e) => updateField('condutaTerapeutica', e.target.value)}
                  placeholder="1. Dieta zero para cineangiocoronariografia urgente&#10;2. Acesso venoso periférico calibroso&#10;3. AAS 300mg VO mastigado&#10;4. Ticagrelor 180mg VO em dose de ataque&#10;5. Enoxaparina 1 mg/kg SC 12/12h&#10;6. Monitorização contínua..."
                  className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-4 text-[13.5px] outline-none transition leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Cuidados Gerais / Metas de Internação
                  </label>
                  <textarea
                    rows={2}
                    value={data.cuidadosGerais}
                    onChange={(e) => updateField('cuidadosGerais', e.target.value)}
                    placeholder="Ex: Repouso no leito com cabeceira elevada a 30°; controle rigoroso de PA e balanço hídrico..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Plano de Alta / Seguimento
                  </label>
                  <textarea
                    rows={2}
                    value={data.planoAltaSeguimento}
                    onChange={(e) => updateField('planoAltaSeguimento', e.target.value)}
                    placeholder="Ex: Previsão de transferência para UTI cardiológica após angioplastia; seguimento ambulatorial..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>
              </div>

              {/* Medidas Não-Farmacológicas & Sinais de Alarme (Roteiro Pedagógico) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/[0.08]">
                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Plano Não-Farmacológico & Mudanças no Estilo de Vida
                  </label>
                  <textarea
                    rows={2}
                    value={data.planoNaoFarmacologico || ''}
                    onChange={(e) => updateField('planoNaoFarmacologico', e.target.value)}
                    placeholder="Ex: Cessação do tabagismo, dieta hipossódica com menos de 2g de sal/dia, higiene do sono..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-white/70 mb-1.5">
                    Sinais de Alarme (Red Flags) para o Paciente Retornar Imediatamente
                  </label>
                  <textarea
                    rows={2}
                    value={data.sinaisAlarme || ''}
                    onChange={(e) => updateField('sinaisAlarme', e.target.value)}
                    placeholder="Ex: Retornar imediatamente se dor torácica recorrente, falta de ar intensa em repouso, síncope ou febre alta..."
                    className="w-full rounded-lg bg-white/[0.05] border border-white/[0.14] focus:border-white/40 focus:bg-white/[0.08] text-white placeholder:text-white/30 p-3 text-[13px] outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 10: VALIDAÇÃO & LEITURA ================= */}
        {currentStep === 10 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-[16px] font-medium text-white flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-white/80" />
                <span>Etapa 10: Leitura Completa no App & Validação Formal</span>
              </h3>
              <p className="text-[12.5px] text-white/60 mt-0.5">
                Leia a anamnese/evolução completa abaixo. Você pode copiar o texto, exportar em JSON ou baixar o PDF oficial.
              </p>
            </div>

            {/* Embedded Document Review View */}
            <DocumentReviewView
              data={data}
              onEditStep={(step) => {
                setCurrentStep(step);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenPrintPreview={onOpenPrintPreview}
            />
          </div>
        )}
      </div>

      {/* 3. Navigation Controls Bar - Clean 12px Radius & Mobile-First */}
      <div className="no-print flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between rounded-xl bg-neutral-900 border border-neutral-800 p-3 sm:px-5 gap-2.5 shadow-sm">
        <div>
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-lg px-4 py-2.5 text-[12.5px] font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition active:scale-95 border border-neutral-800 sm:border-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Etapa Anterior</span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {currentStep < totalSteps ? (
            <>
              <button
                type="button"
                onClick={() => setCurrentStep(10)}
                className="hidden md:inline-flex items-center space-x-1 rounded-lg px-3 py-2 text-[12px] text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              >
                <span>Pular para Leitura (Etapa 10)</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-lg bg-neutral-100 text-neutral-950 hover:bg-white px-5 py-2.5 text-[13px] font-medium transition active:scale-95 shadow-sm"
              >
                <span>Próxima Etapa</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setCurrentStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-lg bg-neutral-100 text-neutral-950 hover:bg-white px-5 py-2.5 text-[13px] font-medium transition active:scale-95 shadow-sm"
            >
              <span>Voltar ao Início (Etapa 1)</span>
            </button>
          )}
        </div>
      </div>

      {/* Roteiros & Modelos Semiológicos Modal */}
      <RoteirosModal
        isOpen={roteirosModalOpen}
        onClose={() => setRoteirosModalOpen(false)}
        onApplyModel={(model) => {
          onChange(model.data);
          setCurrentStep(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};
