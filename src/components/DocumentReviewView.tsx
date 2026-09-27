/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClinicalData, OutputFormat } from '../types/clinical';
import { generateClinicalDocument } from '../services/clinicalRegexEngine';
import { generatePdfDocument, downloadClinicalDataAsJson } from '../services/exportService';
import {
  Copy,
  Printer,
  FileDown,
  Check,
  FileCheck,
  Database,
} from 'lucide-react';

interface DocumentReviewViewProps {
  data: ClinicalData;
  onEditStep?: (step: number) => void;
  onOpenPrintPreview?: () => void;
}

export const DocumentReviewView: React.FC<DocumentReviewViewProps> = ({
  data,
  onOpenPrintPreview,
}) => {
  const [format, setFormat] = useState<OutputFormat>(data.formatoSaida || 'completo');
  const [copied, setCopied] = useState(false);

  const documentText = generateClinicalDocument(data, format);

  const handleCopy = () => {
    navigator.clipboard.writeText(documentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    generatePdfDocument(data, format);
  };

  const handleExportJson = () => {
    downloadClinicalDataAsJson(data);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Top Toolbar - Clean 12px Radius Panel */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-neutral-900 border border-neutral-800 shadow-sm">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-md bg-neutral-800 text-neutral-200">
            <FileCheck className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[13.5px] font-medium text-white">
              Documento Clínico Estruturado
            </span>
            <span className="text-[11.5px] text-neutral-400 ml-2">
              ({data.tipo === 'evolucao' ? 'Evolução Diária' : 'Anamnese Completa'})
            </span>
          </div>
        </div>

        {/* Format Selector & Actions */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11.5px]">
          {(['completo', 'sintetico', 'soap-problemas', 'academico', 'pedagogico-mccp'] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setFormat(fmt)}
              className={`px-2.5 py-1 rounded-md border transition ${
                format === fmt
                  ? 'bg-neutral-100 text-neutral-950 border-neutral-100 font-medium shadow-sm'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {fmt === 'pedagogico-mccp'
                ? 'Pedagógico (MCCP)'
                : fmt === 'soap-problemas'
                ? 'SOAP'
                : fmt === 'sintetico'
                ? 'Resumido'
                : fmt === 'completo'
                ? 'Completo'
                : 'Acadêmico (PUCRS)'}
            </button>
          ))}

          <div className="h-4 w-px bg-neutral-800 mx-1 hidden sm:block" />

          {/* Quick Actions */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copiar texto do documento"
            className="inline-flex items-center space-x-1.5 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-neutral-200 hover:text-white transition"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          {onOpenPrintPreview && (
            <button
              type="button"
              onClick={onOpenPrintPreview}
              title="Pré-visualizar documento em folha de papel A4"
              className="inline-flex items-center space-x-1.5 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-white hover:bg-neutral-700 transition"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Ver Folha A4</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePrint}
            title="Imprimir documento"
            className="inline-flex items-center space-x-1.5 rounded-md border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-neutral-300 hover:text-white transition"
          >
            <Printer className="h-3 w-3" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            title="Baixar PDF formatado em preto e branco"
            className="inline-flex items-center space-x-1.5 rounded-md bg-white text-neutral-950 hover:bg-neutral-200 px-3 py-1 font-medium transition active:scale-95 shadow-sm"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>PDF</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            title="Exportar dados em JSON"
            className="inline-flex items-center space-x-1 rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-neutral-400 hover:text-white transition"
          >
            <Database className="h-3 w-3" />
            <span className="hidden md:inline">JSON</span>
          </button>
        </div>
      </div>

      {/* Main Document Sheet - Formal Clean 12px Radius Sheet View */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 sm:p-8 shadow-lg text-white">
        {/* Hospital Document Header */}
        <div className="border-b border-neutral-800 pb-4 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-neutral-500 mb-1 font-mono">
            <span>REGISTRO ELETRÔNICO ASSISTENCIAL HOSPITALAR</span>
            <span>
              DATA/HORA: {data.identificacao.data || new Date().toLocaleDateString('pt-BR')}{' '}
              {data.identificacao.hora || ''}
            </span>
          </div>

          <h2 className="text-[18px] sm:text-[20px] font-medium text-white tracking-tight">
            {data.tipo === 'evolucao'
              ? 'Evolução Médica Diária — Método SOAP & Problemas'
              : 'Anamnese Médica Completa & Protocolos Clínicos'}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-neutral-800 text-[11.5px]">
            <div>
              <span className="text-neutral-500 block text-[10.5px]">Paciente:</span>
              <strong className="text-white font-medium">{data.identificacao.nomeIniciais || 'Não identificado'}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10.5px]">Idade / Sexo:</span>
              <strong className="text-white font-medium">
                {data.identificacao.idade ? `${data.identificacao.idade} ${data.identificacao.idadeUnidade}` : 'N/I'} /{' '}
                {data.identificacao.sexo}
              </strong>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10.5px]">Leito:</span>
              <strong className="text-white font-medium">{data.identificacao.leito || 'N/I'}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10.5px]">Usuário:</span>
              <strong className="text-white font-medium">
                {data.identificacao.responsavel || 'Não informado'}
              </strong>
            </div>
          </div>
        </div>

        {/* Formatted Text Content */}
        <div className="text-[13px] leading-relaxed text-neutral-200 whitespace-pre-wrap font-mono selection:bg-neutral-800 selection:text-white">
          {documentText}
        </div>

        {/* Signature Block */}
        <div className="mt-10 pt-5 border-t border-neutral-800 flex justify-end">
          <div className="text-right border-t border-neutral-700 pt-2 min-w-[220px]">
            <div className="text-[13px] font-medium text-white">
              {data.identificacao.responsavel || 'Assinatura do Usuário'}
            </div>
            <div className="text-[11px] text-neutral-400">
              Assinatura do Usuário
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
