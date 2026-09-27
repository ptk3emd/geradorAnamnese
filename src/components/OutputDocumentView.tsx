/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClinicalData, OutputFormat } from '../types/clinical';
import { generateClinicalDocument } from '../services/clinicalRegexEngine';
import { downloadClinicalDataAsJson, generatePdfDocument } from '../services/exportService';
import { Copy, Printer, Download, Check, FileText, CheckCircle2, FileDown, Database } from 'lucide-react';

interface OutputDocumentViewProps {
  data: ClinicalData;
  onOpenChecklist: () => void;
  onImportJson?: (imported: ClinicalData) => void;
}

export const OutputDocumentView: React.FC<OutputDocumentViewProps> = ({
  data,
  onOpenChecklist,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<OutputFormat>(
    data.tipo === 'evolucao' ? 'soap-problemas' : 'completo',
  );
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const generatedText = isEditing && customText
    ? customText
    : generateClinicalDocument(data, selectedFormat);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const filename = `${data.identificacao.nomeIniciais || 'paciente'}_${data.tipo}_${new Date().toISOString().slice(0, 10)}.txt`;
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportJson = () => {
    downloadClinicalDataAsJson(data);
  };

  const handleDownloadPdf = () => {
    try {
      setIsGeneratingPdf(true);
      generatePdfDocument(data, selectedFormat);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-[18px] border border-[#e0e0e0] bg-white p-4">
        <div>
          <h2 className="text-[16px] font-semibold text-[#1d1d1f]">
            Documento Clínico Gerado por Extenso
          </h2>
          <p className="text-[12px] text-[#7a7a7a]">
            Redigido e adaptado por regras e regex clínica sem IA
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Export JSON Button */}
          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center space-x-1.5 rounded-full border border-[#52525b]/30 bg-[#52525b]/10 px-3.5 py-1.5 text-[12px] font-semibold text-[#52525b] transition hover:bg-[#52525b]/20 active:scale-95"
            title="Exportar estado completo do paciente para arquivo JSON local"
          >
            <Database className="h-3.5 w-3.5" />
            <span>Exportar JSON</span>
          </button>

          {/* Download PDF Direct Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex items-center space-x-1.5 rounded-full bg-[#52525b] px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#3f3f46] active:scale-95 disabled:opacity-50"
            title="Gerar e baixar PDF formatado via jsPDF"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>{isGeneratingPdf ? 'Gerando...' : 'Baixar PDF'}</span>
          </button>

          {/* Format Selector Pills */}
          <div className="flex items-center gap-1 border-l border-[#e0e0e0] pl-2">
            <button
              type="button"
              onClick={() => {
                setSelectedFormat('completo');
                setIsEditing(false);
              }}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition active:scale-95 ${
                selectedFormat === 'completo'
                  ? 'bg-[#1d1d1f] text-white shadow-sm'
                  : 'bg-[#fafafc] text-[#1d1d1f] border border-[#e0e0e0] hover:bg-[#f0f0f0]'
              }`}
            >
              Completo
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedFormat('soap-problemas');
                setIsEditing(false);
              }}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition active:scale-95 ${
                selectedFormat === 'soap-problemas'
                  ? 'bg-[#1d1d1f] text-white shadow-sm'
                  : 'bg-[#fafafc] text-[#1d1d1f] border border-[#e0e0e0] hover:bg-[#f0f0f0]'
              }`}
            >
              SOAP (#1 a #7)
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedFormat('sintetico');
                setIsEditing(false);
              }}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition active:scale-95 ${
                selectedFormat === 'sintetico'
                  ? 'bg-[#1d1d1f] text-white shadow-sm'
                  : 'bg-[#fafafc] text-[#1d1d1f] border border-[#e0e0e0] hover:bg-[#f0f0f0]'
              }`}
            >
              Sintético
            </button>
          </div>
        </div>
      </div>

      {/* Main Document Paper / Print Card */}
      <div className="print-card rounded-[18px] border border-[#e0e0e0] bg-white p-6 sm:p-8 shadow-sm">
        {/* Paper Header / Hospital Metadata */}
        <div className="border-b border-[#1d1d1f]/10 pb-4 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#52525b]">
                Uso Acadêmico & Assistencial Hospitalar
              </p>
              <h1 className="text-[20px] font-bold text-[#1d1d1f] tracking-tight">
                {data.tipo === 'evolucao'
                  ? 'EVOLUÇÃO MÉDICA DIÁRIA - MÉTODO SOAP & PROBLEMAS'
                  : 'ANAMNESE MÉDICA COMPLETA & CONDUTA CLÍNICA'}
              </h1>
            </div>
            <div className="text-right text-[12px] text-[#7a7a7a]">
              <p>Data: <strong className="text-[#1d1d1f]">{data.identificacao.data || 'Hoje'}</strong></p>
              <p>Leito: <strong className="text-[#1d1d1f]">{data.identificacao.leito || 'N/I'}</strong></p>
            </div>
          </div>
        </div>

        {/* Text View / Editor */}
        {isEditing ? (
          <div>
            <textarea
              rows={24}
              value={generatedText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full rounded-xl border border-[#52525b] p-4 font-mono text-[13px] leading-relaxed text-[#1d1d1f] outline-none"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-full bg-[#1d1d1f] px-4 py-1 text-[12px] font-medium text-white"
              >
                Concluir Edição
              </button>
            </div>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-sans text-[14px] leading-relaxed text-[#1d1d1f] tracking-tight selection:bg-[#52525b]/20">
            {generatedText}
          </pre>
        )}

        {/* Signature stamp section */}
        <div className="mt-12 pt-6 border-t border-[#e0e0e0] flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#7a7a7a]">
          <div>
            <p>Documento padronizado conforme diretrizes assistenciais de prontuário eletrônico.</p>
            <p className="text-[11px] text-[#a1a1a6]">Regras semiológicas e classificação internacional CID-10 aplicadas.</p>
          </div>
          <div className="mt-4 sm:mt-0 text-center sm:text-right">
            <div className="w-56 border-b border-[#1d1d1f] mx-auto sm:ml-auto mb-1"></div>
            <p className="font-semibold text-[#1d1d1f]">{data.identificacao.responsavel || 'Assinatura e Carimbo do Médico'}</p>
            <p className="text-[11px]">CRM: {data.identificacao.crm || '_________ / UF'}</p>
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Action Bar (Apple design floating sticky bar) */}
      <div className="no-print sticky bottom-4 z-40 mx-auto max-w-2xl rounded-full border border-[#e0e0e0] bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-md flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center space-x-1.5 rounded-full bg-[#52525b] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#3f3f46] active:scale-95"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copiar Texto Completo</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex items-center space-x-1 rounded-full border border-[#52525b] bg-[#52525b]/10 px-3 py-2 text-[12px] font-semibold text-[#52525b] transition hover:bg-[#52525b]/20 active:scale-95"
            title="Download direto em PDF"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Baixar PDF</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center space-x-1 rounded-full border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[12px] font-medium text-[#1d1d1f] transition hover:bg-[#f0f0f0] active:scale-95"
            title="Exportar dados do paciente em JSON"
          >
            <Database className="h-3.5 w-3.5 text-[#52525b]" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="flex items-center space-x-1 rounded-full border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[12px] font-medium text-[#1d1d1f] transition hover:bg-[#f0f0f0] active:scale-95"
            title="Baixar arquivo TXT"
          >
            <Download className="h-3.5 w-3.5 text-[#7a7a7a]" />
            <span className="hidden sm:inline">.TXT</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenChecklist}
          className="flex items-center space-x-1 rounded-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-[12px] font-medium text-neutral-800 transition hover:bg-neutral-100 active:scale-95"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-neutral-600" />
          <span className="hidden sm:inline">Checklist de Segurança</span>
        </button>
      </div>
    </div>
  );
};
