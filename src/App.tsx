/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ClinicalData,
  DocumentType,
  SpecialtyProfile,
  ChecklistVerification,
} from './types/clinical';
import {
  BLANK_CLINICAL_DATA,
  PDF_SYNTHETIC_EXAMPLE,
} from './data/defaultPresets';
import { HeaderNav } from './components/HeaderNav';
import { SubNav } from './components/SubNav';
import { DiseasesToggleBar } from './components/DiseasesToggleBar';
import { StepWizardForm } from './components/StepWizardForm';
import { DocumentReviewView } from './components/DocumentReviewView';
import { ChecklistModal } from './components/ChecklistModal';
import { ReadyCasesModal } from './components/ReadyCasesModal';
import { RoteirosModal } from './components/RoteirosModal';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { AnamneseTemplateModel } from './data/anamneseRoteiros';
import { useClinicalDataAutosave } from './hooks/useClinicalDataAutosave';
import { generateClinicalDocument } from './services/clinicalRegexEngine';
import { downloadClinicalDataAsJson, generatePdfDocument } from './services/exportService';
import { Check, CheckCircle2 } from 'lucide-react';

const INITIAL_CHECKLIST: ChecklistVerification = {
  identificacaoConferida: false,
  diagnosticoClaro: false,
  intercorrenciasRegistradas: false,
  alergiasAntibioticosComDias: false,
  sinaisVitaisExameCoerentes: false,
  impressaoClinicaObjetiva: false,
  examesFinalidadeExplicita: false,
  condutasSeparadas: false,
  pendenciasPlanoRegistrados: false,
  linguagemProfissionalSemAmbiguidades: false,
};

export default function App() {
  const {
    clinicalData,
    setClinicalData,
    lastSaved,
    isSaving,
    restoredFromAutosave,
    clearAutosave,
    dismissRestoredBanner,
  } = useClinicalDataAutosave(BLANK_CLINICAL_DATA);

  const [activeView, setActiveView] = useState<'form' | 'preview'>('form');
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [readyCasesOpen, setReadyCasesOpen] = useState(false);
  const [roteirosModalOpen, setRoteirosModalOpen] = useState(false);
  const [printPreviewOpen, setPrintPreviewOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<ChecklistVerification>(INITIAL_CHECKLIST);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleSelectDocumentType = (type: DocumentType) => {
    setClinicalData((prev) => ({
      ...prev,
      tipo: type,
    }));
    showToast(`Formato: ${type === 'evolucao' ? 'Evolução Diária (SOAP)' : 'Anamnese Completa'}`);
  };

  const handleSelectSpecialty = (spec: SpecialtyProfile) => {
    setClinicalData((prev) => ({
      ...prev,
      perfil: spec,
    }));
    showToast(`Perfil: ${spec}`);
  };

  const handleCopyDocument = () => {
    const text = generateClinicalDocument(clinicalData, clinicalData.formatoSaida || 'completo');
    navigator.clipboard.writeText(text);
    showToast('Texto copiado para a área de transferência!');
  };

  const handlePrintDocument = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    generatePdfDocument(clinicalData, clinicalData.formatoSaida || 'completo');
    showToast('Download do PDF formatado iniciado!');
  };

  const handleExportJson = () => {
    downloadClinicalDataAsJson(clinicalData);
    showToast('Arquivo JSON do prontuário exportado!');
  };

  const handleImportJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed && parsed.identificacao && parsed.resumoProblemas) {
          setClinicalData(parsed);
          setSelectedCaseId(null);
          showToast(`Prontuário de ${parsed.identificacao.nomeIniciais || 'paciente'} importado!`);
        } else {
          showToast('Arquivo JSON incompatível.');
        }
      } catch (err) {
        showToast('Erro ao importar JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleLoadExample = () => {
    setClinicalData(PDF_SYNTHETIC_EXAMPLE);
    setSelectedCaseId('exemplo-pdf');
    showToast('Exemplo oficial (P.M.S., 68 anos - ICC) carregado.');
  };

  const handleResetBlank = () => {
    setClinicalData(BLANK_CLINICAL_DATA);
    clearAutosave();
    setSelectedCaseId(null);
    setChecklist({
      identificacaoConferida: false,
      diagnosticoClaro: false,
      intercorrenciasRegistradas: false,
      alergiasAntibioticosComDias: false,
      sinaisVitaisExameCoerentes: false,
      impressaoClinicaObjetiva: false,
      examesFinalidadeExplicita: false,
      condutasSeparadas: false,
      pendenciasPlanoRegistrados: false,
      linguagemProfissionalSemAmbiguidades: false,
    });
    showToast('Questionário redefinido para estado em branco.');
  };

  const checklistCompletedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#08090b] text-white flex flex-col font-['Poppins','Inter',sans-serif] selection:bg-neutral-800 selection:text-white relative">
      {/* 1. Minimal Topbar with essentials */}
      <HeaderNav
        onDownloadPdf={handleDownloadPdf}
        onOpenPrintPreview={() => setPrintPreviewOpen(true)}
        onResetBlank={handleResetBlank}
        onImportJson={handleImportJson}
      />

      {/* 2. Control Sub Navigation Bar */}
      <SubNav
        documentType={clinicalData.tipo}
        onSelectDocumentType={handleSelectDocumentType}
        specialty={clinicalData.perfil}
        onSelectSpecialty={handleSelectSpecialty}
        activeView={activeView}
        onToggleView={setActiveView}
        onOpenRoteiros={() => setRoteirosModalOpen(true)}
      />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 sm:px-6 py-3 sm:py-5 space-y-4">
        {/* Autosave Recovery Banner when session restored */}
        {restoredFromAutosave && (
          <div className="no-print p-3.5 sm:px-5 rounded-xl bg-neutral-900 border border-neutral-500/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-neutral-500/15 text-neutral-400 shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-[13px] font-medium text-white flex items-center gap-2">
                  <span>Progresso restaurado da última sessão</span>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-500/20 text-neutral-300 font-semibold">
                    Autosave
                  </span>
                </h4>
                <p className="text-[11.5px] text-neutral-400 mt-0.5">
                  Dados recuperados do navegador
                  {lastSaved
                    ? ` (salvo às ${lastSaved.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })})`
                    : ''}
                  .
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={dismissRestoredBanner}
                className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-[12px] font-medium transition active:scale-95"
              >
                Continuar
              </button>
              <button
                type="button"
                onClick={handleResetBlank}
                className="px-3.5 py-1.5 rounded-lg bg-neutral-500/15 hover:bg-neutral-500/25 text-neutral-300 border border-neutral-500/20 text-[12px] font-medium transition active:scale-95"
              >
                Descartar rascunho
              </button>
            </div>
          </div>
        )}

        {/* Diseases Search & Toggle Bar */}
        <DiseasesToggleBar
          selectedCaseId={selectedCaseId}
          onSelectCase={(template) => {
            setClinicalData(template.data);
            setSelectedCaseId(template.id);
            showToast(`Caso "${template.titulo}" carregado no formulário!`);
          }}
          onResetBlank={handleResetBlank}
        />

        {/* View Switch: Step Wizard Questionnaire vs Direct In-App Reading View */}
        {activeView === 'form' ? (
          <StepWizardForm
            data={clinicalData}
            onChange={setClinicalData}
            autosaveStatus={{ lastSaved, isSaving }}
            onOpenPrintPreview={() => setPrintPreviewOpen(true)}
          />
        ) : (
          <div className="space-y-4">
            <div className="no-print p-4 sm:p-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div>
                <h2 className="text-[14px] sm:text-[15px] font-medium tracking-tight text-white">
                  Leitura Direta da Anamnese / Evolução no App
                </h2>
                <p className="text-[12px] text-neutral-400 mt-0.5">
                  Visualização contínua e diagramada, sem necessidade de exportar PDF.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveView('form')}
                className="rounded-lg bg-neutral-100 text-neutral-950 hover:bg-white px-4 py-2 text-[12px] font-medium transition active:scale-95 shadow-sm self-start sm:self-auto"
              >
                ← Voltar ao Questionário
              </button>
            </div>
            <DocumentReviewView
              data={clinicalData}
              onEditStep={() => setActiveView('form')}
              onOpenPrintPreview={() => setPrintPreviewOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Security Audit Checklist Modal */}
      <ChecklistModal
        isOpen={checklistOpen}
        onClose={() => setChecklistOpen(false)}
        checklist={checklist}
        onChange={setChecklist}
      />

      {/* Ready Cases Modal */}
      <ReadyCasesModal
        isOpen={readyCasesOpen}
        onClose={() => setReadyCasesOpen(false)}
        onSelectCase={(template) => {
          setClinicalData(template.data);
          setSelectedCaseId(template.id);
          showToast(`Caso clínico "${template.titulo}" carregado com sucesso!`);
        }}
      />

      {/* Roteiros & Modelos de Anamnese Modal (PUCRS & Pedagógico) */}
      <RoteirosModal
        isOpen={roteirosModalOpen}
        onClose={() => setRoteirosModalOpen(false)}
        onApplyModel={(model: AnamneseTemplateModel) => {
          setClinicalData(model.data);
          setSelectedCaseId(model.id);
          showToast(`Modelo "${model.titulo}" carregado com sucesso!`);
        }}
      />

      {/* A4 Print Preview Overlay Modal */}
      <PrintPreviewModal
        isOpen={printPreviewOpen}
        onClose={() => setPrintPreviewOpen(false)}
        data={clinicalData}
        onDownloadPdf={handleDownloadPdf}
      />

      {/* Toast Notification - Clean 8px Radius */}
      {toastMessage && (
        <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-[12px] font-normal text-white shadow-xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="h-4 w-4 text-neutral-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="no-print mt-10 border-t border-neutral-800 py-6 text-center text-[12px] text-neutral-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-0.5">
          <p className="font-normal text-neutral-300">
            Gerador de Anamnese & Evolução Médica
          </p>
          <p className="text-[11px] text-neutral-500">
            Registro Clínico Estruturado · SOAP & Roteiro do Adulto
          </p>
        </div>
      </footer>
    </div>
  );
}
