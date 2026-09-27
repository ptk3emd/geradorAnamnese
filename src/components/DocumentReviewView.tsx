/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClinicalData, OutputFormat } from '../types/clinical';
import { generateClinicalDocument } from '../services/clinicalRegexEngine';
import { downloadClinicalDataAsJson, generatePdfDocument } from '../services/exportService';
import { Copy, Printer, FileDown, Database, Check, ShieldCheck, FileCheck } from 'lucide-react';

interface DocumentReviewViewProps {
  data: ClinicalData;
  onEditStep?: (step: number) => void;
  onOpenPrintPreview?: () => void;
}

export const DocumentReviewView: React.FC<DocumentReviewViewProps> = ({
  data,
  onEditStep,
  onOpenPrintPreview,
}) => {
  const [format, setFormat] = useState<OutputFormat>(data.formatoSaida || 'completo');
  const [copied, setCopied] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [validationTimestamp, setValidationTimestamp] = useState<string | null>(null);

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

  const handleValidate = () => {
    if (!confirmCheck) return;
    setIsValidated(true);
    const now = new Date();
    setValidationTimestamp(
      `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
    );
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Top Toolbar - Rounded Glass Capsule */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-3xl bg-white/[0.04] border border-white/[0.12] backdrop-blur-2xl shadow-xl">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-full bg-white/10 text-white">
            <FileCheck className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[13.5px] font-medium text-white">
              Documento Clínico Estruturado
            </span>
            <span className="text-[12px] text-white/50 ml-2">
              ({data.tipo === 'evolucao' ? 'Evolução Diária' : 'Anamnese Completa'})
            </span>
          </div>
        </div>

        {/* Format Selector & Actions */}
        <div className="flex flex-wrap items-center gap-1.5 text-[12px]">
          {(['completo', 'sintetico', 'soap-problemas', 'academico', 'pedagogico-mccp'] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setFormat(fmt)}
              className={`px-3 py-1 rounded-full border transition-all ${
                format === fmt
                  ? 'bg-white text-black border-white font-medium shadow-sm'
                  : 'bg-white/[0.05] border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.08]'
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

          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          {/* Quick Actions */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copiar texto do documento"
            className="inline-flex items-center space-x-1.5 rounded-full border border-white/[0.14] bg-white/[0.05] px-3.5 py-1 text-white/80 hover:text-white hover:bg-white/[0.1] transition"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-300" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          {onOpenPrintPreview && (
            <button
              type="button"
              onClick={onOpenPrintPreview}
              title="Pré-visualizar documento em folha de papel A4"
              className="inline-flex items-center space-x-1.5 rounded-full border border-white/[0.18] bg-white/[0.08] px-3.5 py-1 text-white hover:bg-white/[0.15] transition"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Ver Folha A4</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePrint}
            title="Imprimir documento"
            className="inline-flex items-center space-x-1.5 rounded-full border border-white/[0.14] bg-white/[0.05] px-3 py-1 text-white/80 hover:text-white hover:bg-white/[0.1] transition"
          >
            <Printer className="h-3 w-3" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            title="Baixar PDF formatado em preto e branco"
            className="inline-flex items-center space-x-1.5 rounded-full bg-white text-black hover:bg-neutral-200 px-4 py-1 font-medium transition active:scale-95 shadow-md"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>Baixar PDF</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            title="Exportar dados em JSON"
            className="inline-flex items-center space-x-1 rounded-full border border-white/[0.14] bg-white/[0.05] px-2.5 py-1 text-white/60 hover:text-white transition"
          >
            <Database className="h-3 w-3" />
            <span className="hidden md:inline">JSON</span>
          </button>
        </div>
      </div>

      {/* Main Document Sheet - Rounded 3xl High-End Formal Sheet View */}
      <div className="rounded-3xl border border-white/[0.14] bg-[#0c0e12] p-7 sm:p-10 shadow-2xl text-white">
        {/* Hospital Document Header */}
        <div className="border-b border-white/[0.12] pb-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11.5px] text-white/50 mb-1.5 font-mono">
            <span>REGISTRO ELETRÔNICO ASSISTENCIAL HOSPITALAR</span>
            <span>
              DATA/HORA: {data.identificacao.data || new Date().toLocaleDateString('pt-BR')}{' '}
              {data.identificacao.hora || ''}
            </span>
          </div>

          <h2 className="text-[19px] sm:text-[22px] font-medium text-white tracking-tight">
            {data.tipo === 'evolucao'
              ? 'Evolução Médica Diária — Método SOAP & Problemas'
              : 'Anamnese Médica Completa & Protocolos Clínicos'}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3.5 border-t border-white/[0.08] text-[12px]">
            <div>
              <span className="text-white/40 block text-[11px]">Paciente:</span>
              <strong className="text-white font-medium">{data.identificacao.nomeIniciais || 'Não identificado'}</strong>
            </div>
            <div>
              <span className="text-white/40 block text-[11px]">Idade / Sexo:</span>
              <strong className="text-white font-medium">
                {data.identificacao.idade ? `${data.identificacao.idade} ${data.identificacao.idadeUnidade}` : 'N/I'} /{' '}
                {data.identificacao.sexo}
              </strong>
            </div>
            <div>
              <span className="text-white/40 block text-[11px]">Leito:</span>
              <strong className="text-white font-medium">{data.identificacao.leito || 'N/I'}</strong>
            </div>
            <div>
              <span className="text-white/40 block text-[11px]">Médico / CRM:</span>
              <strong className="text-white font-medium">
                {data.identificacao.responsavel || 'Plantonista'}{' '}
                {data.identificacao.crm ? `(${data.identificacao.crm})` : ''}
              </strong>
            </div>
          </div>
        </div>

        {/* Formatted Text Content */}
        <div className="text-[13.5px] leading-relaxed text-white/90 whitespace-pre-wrap font-mono selection:bg-white/20 selection:text-white">
          {documentText}
        </div>

        {/* Signature & Digital Stamp Block */}
        <div className="mt-12 pt-6 border-t border-white/[0.12]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            {/* Digital verification stamp */}
            <div>
              {isValidated ? (
                <div className="rounded-2xl border border-white/30 bg-white/[0.06] p-4 text-[12px] space-y-1 backdrop-blur-md">
                  <div className="flex items-center space-x-2 font-medium text-white">
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    <span>Prontuário Validado Digitalmente</span>
                  </div>
                  <div className="text-white/70">Autenticação: {validationTimestamp}</div>
                  <div className="text-white/60 text-[11.5px]">
                    Médico: {data.identificacao.responsavel || 'Médico Assistente'} | CRM: {data.identificacao.crm || 'N/I'}
                  </div>
                </div>
              ) : (
                <div className="text-[12px] text-white/40 italic">
                  * Documento em elaboração. Validação formal pelo médico assistente no quadro abaixo.
                </div>
              )}
            </div>

            {/* Signature Line */}
            <div className="text-center min-w-[240px]">
              <div className="w-full border-b border-white/40 mb-2" />
              <div className="text-[13px] font-medium text-white">
                {data.identificacao.responsavel || 'Médico Assistente'}
              </div>
              <div className="text-[11.5px] text-white/50">
                CRM: {data.identificacao.crm || '____________________'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Card - Rounded 3xl Glass Card */}
      <div className="no-print rounded-3xl border border-white/[0.14] bg-white/[0.04] backdrop-blur-2xl p-6 sm:p-7 shadow-2xl space-y-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2 rounded-2xl bg-white/10 text-white shrink-0 mt-0.5">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-[15px] font-medium text-white">
              Validação & Confirmação Formal do Registro Clínico
            </h3>
            <p className="text-[12.5px] text-white/60 mt-0.5">
              Certifique-se de que os dados semiológicos, exames e condutas descritos acima correspondem ao atendimento prestado.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-white/[0.08]">
          <label className="flex items-start space-x-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={confirmCheck}
              onChange={(e) => setConfirmCheck(e.target.checked)}
              className="mt-1 h-4 w-4 rounded-md border-white/30 bg-white/10 text-white focus:ring-0 cursor-pointer"
            />
            <span className="text-[13px] text-white/90 leading-snug">
              Declaro que revisei a anamnese/evolução completa acima, conferindo os dados de identificação, sinais
              vitais, exame físico, hipótese diagnóstica (CID-10) e plano terapêutico, confirmando a veracidade das
              informações para fins de prontuário médico.
            </span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {onEditStep && (
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-[12px] text-white/60 hover:text-white underline"
            >
              ← Voltar ao Questionário para Editar
            </button>
          )}

          <div className="flex items-center space-x-3">
            {isValidated ? (
              <div className="inline-flex items-center space-x-2 text-[12.5px] font-medium text-white rounded-full border border-white/30 px-5 py-2 bg-white/10 backdrop-blur-md">
                <Check className="h-4 w-4 text-emerald-300" />
                <span>Prontuário Validado com Sucesso</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleValidate}
                disabled={!confirmCheck}
                className={`rounded-full px-6 py-2.5 text-[13px] font-medium transition-all ${
                  confirmCheck
                    ? 'bg-white text-black hover:bg-neutral-200 active:scale-95 cursor-pointer shadow-lg'
                    : 'bg-white/10 text-white/40 border border-white/10 cursor-not-allowed'
                }`}
              >
                Validar e Confirmar Prontuário
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
