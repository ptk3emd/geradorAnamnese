/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ClinicalData, OutputFormat } from '../types/clinical';
import { generateClinicalDocument } from '../services/clinicalRegexEngine';
import { generatePdfDocument } from '../services/exportService';
import {
  Printer,
  FileDown,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  ShieldCheck,
  Calendar,
  Clock,
  User,
  HeartPulse,
} from 'lucide-react';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ClinicalData;
  onDownloadPdf?: () => void;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  data,
  onDownloadPdf,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [format, setFormat] = useState<OutputFormat>(data.formatoSaida || 'completo');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (onDownloadPdf) {
      onDownloadPdf();
    } else {
      generatePdfDocument(data, format);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 60));
  const handleResetZoom = () => setZoomLevel(100);

  const documentPlainText = generateClinicalDocument(data, format);

  const currentDate = data.identificacao.data || new Date().toLocaleDateString('pt-BR');
  const currentTime = data.identificacao.hora || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200 print:static print:bg-white print:p-0">
      {/* Top Floating Control Bar - Glass Capsule */}
      <div className="no-print shrink-0 border-b border-white/[0.12] bg-[#0c0e12]/90 backdrop-blur-xl px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          {/* Document Info */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-2xl bg-white/10 text-white shrink-0">
              <Printer className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-[14.5px] font-medium text-white tracking-tight">
                  Visualização de Impressão (Papel A4)
                </h3>
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] uppercase font-semibold">
                  Padrão Hospitalar CFM
                </span>
              </div>
              <p className="text-[11.5px] text-white/50">
                Dimensões A4 (210mm × 297mm) com margens regulamentadas e carimbo médico.
              </p>
            </div>
          </div>

          {/* Format Selectors */}
          <div className="flex items-center space-x-1 rounded-full bg-white/[0.06] p-1 border border-white/[0.1] text-[11.5px]">
            {(['completo', 'sintetico', 'soap-problemas', 'academico', 'pedagogico-mccp'] as const).map(
              (fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`px-3 py-1 rounded-full transition ${
                    format === fmt
                      ? 'bg-white text-black font-medium shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {fmt === 'pedagogico-mccp'
                    ? 'MCCP'
                    : fmt === 'soap-problemas'
                    ? 'SOAP'
                    : fmt === 'sintetico'
                    ? 'Resumido'
                    : fmt === 'completo'
                    ? 'Completo'
                    : 'Acadêmico'}
                </button>
              )
            )}
          </div>

          {/* Zoom and Actions */}
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center space-x-1 rounded-full bg-white/[0.06] p-1 border border-white/[0.1] text-white/70">
              <button
                type="button"
                onClick={handleZoomOut}
                title="Reduzir zoom"
                className="p-1 rounded-full hover:bg-white/10 hover:text-white transition"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2 text-[11px] font-mono hover:text-white"
                title="Redefinir 100%"
              >
                {zoomLevel}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                title="Aumentar zoom"
                className="p-1 rounded-full hover:bg-white/10 hover:text-white transition"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center space-x-1.5 rounded-full bg-white text-black hover:bg-neutral-200 px-4 py-1.5 text-[12.5px] font-medium transition active:scale-95 shadow-md"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Imprimir</span>
            </button>

            {/* Download PDF Button */}
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center space-x-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 text-[12.5px] font-medium text-white transition active:scale-95 shadow-sm"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">PDF</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
              title="Fechar (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sheet Preview Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start bg-neutral-950/80 print:p-0 print:bg-white print:overflow-visible">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150 ease-out print:transform-none print:w-full"
        >
          {/* ========================================================================= */}
          {/* THE AUTHENTIC A4 MEDICAL SHEET (210mm x 297mm Aspect Ratio & Margins)      */}
          {/* ========================================================================= */}
          <div
            id="print-preview-a4-sheet"
            className="w-[210mm] min-h-[297mm] bg-white text-neutral-900 shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-[18mm] font-sans text-[11px] leading-relaxed relative flex flex-col justify-between selection:bg-neutral-200 selection:text-black border border-neutral-300 print:shadow-none print:border-none print:m-0 print:p-[15mm] print:w-full print:min-h-0"
          >
            {/* Upper Content */}
            <div className="space-y-4">
              {/* 1. Hospital / Clinical Header */}
              <div className="border-b-2 border-neutral-900 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-[14px] tracking-tight">
                      +
                    </div>
                    <div>
                      <h1 className="text-[13px] font-bold tracking-tight uppercase text-neutral-900">
                        Hospital de Clínicas & Assistência Médica Especializada
                      </h1>
                      <p className="text-[10px] text-neutral-600 tracking-wide uppercase">
                        Sistema Integrado de Prontuário Médico & Registro Clínico
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-[9.5px] text-neutral-500 font-mono">
                    <p>FOLHA Nº: 01 / 01</p>
                    <p>DATA: {currentDate} às {currentTime}</p>
                    <p className="text-neutral-700 font-medium">VIA DO PRONTUÁRIO</p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-neutral-200 flex items-center justify-between">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-neutral-900">
                    {data.tipo === 'evolucao'
                      ? 'Evolução Clínica Diária (Método SOAP & Problemas)'
                      : 'Anamnese Médica e Exame Semiológico Completo'}
                  </span>
                  <span className="text-[9.5px] px-2 py-0.5 bg-neutral-100 rounded text-neutral-700 font-semibold border border-neutral-300">
                    FORMATO: {format.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* 2. Patient Identification Box (Table style standard in hospital charts) */}
              <div className="border border-neutral-300 rounded bg-neutral-50/60 p-2.5 text-[10px]">
                <div className="grid grid-cols-6 gap-2">
                  <div className="col-span-3">
                    <span className="text-neutral-500 font-semibold block text-[9px] uppercase">
                      Nome do Paciente / Iniciais:
                    </span>
                    <strong className="text-[11px] text-neutral-900 font-bold">
                      {data.identificacao.nomeIniciais || 'PACIENTE NÃO IDENTIFICADO'}
                    </strong>
                  </div>

                  <div>
                    <span className="text-neutral-500 font-semibold block text-[9px] uppercase">
                      Idade / Sexo:
                    </span>
                    <span className="font-semibold text-neutral-800">
                      {data.identificacao.idade
                        ? `${data.identificacao.idade} ${data.identificacao.idadeUnidade}`
                        : 'N/I'}{' '}
                      / {data.identificacao.sexo}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 font-semibold block text-[9px] uppercase">
                      Leito / Quarto:
                    </span>
                    <span className="font-semibold text-neutral-800">
                      {data.identificacao.leito || 'Ambulatório / N/I'}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 font-semibold block text-[9px] uppercase">
                      Registro / Prontuário:
                    </span>
                    <span className="font-mono text-neutral-800">
                      {data.identificacao.convenioSus || 'SUS / Convênio'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mt-2 pt-1.5 border-t border-neutral-200 text-[9.5px]">
                  <div>
                    <span className="text-neutral-500">Naturalidade:</span>{' '}
                    <span className="text-neutral-800 font-medium">
                      {data.identificacao.naturalidade || 'Não informada'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Profissão:</span>{' '}
                    <span className="text-neutral-800 font-medium">
                      {data.identificacao.ocupacao || 'Não informada'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Médico Assistente:</span>{' '}
                    <span className="text-neutral-800 font-medium">
                      {data.identificacao.responsavel || 'Plantonista'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500">CRM:</span>{' '}
                    <span className="text-neutral-800 font-mono font-semibold">
                      {data.identificacao.crm || 'N/I'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Render Formatted Clinical Document Body */}
              <div className="space-y-3 text-[10.5px] leading-relaxed text-neutral-900">
                {/* Queixa & HDA */}
                {data.tipo === 'anamnese' ? (
                  <>
                    <div className="border-b border-neutral-200 pb-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-0.5">
                        1. Queixa Principal (QP)
                      </h4>
                      <p className="font-medium text-neutral-900">
                        {data.queixaPrincipal || 'Não referida no momento.'}
                      </p>
                    </div>

                    <div className="border-b border-neutral-200 pb-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-0.5">
                        2. História da Doença Atual (HDA)
                      </h4>
                      <p className="text-justify whitespace-pre-wrap">
                        {data.hda || 'Histórico clínico da doença atual sem alterações registradas.'}
                      </p>

                      {/* FIFE Experience Dimensions if populated */}
                      {data.experienciaDoencaFife &&
                        (data.experienciaDoencaFife.sentimentos ||
                          data.experienciaDoencaFife.ideias ||
                          data.experienciaDoencaFife.funcao ||
                          data.experienciaDoencaFife.expectativas) && (
                          <div className="mt-2 p-2 rounded bg-neutral-50 border border-neutral-200 text-[9.5px] space-y-1">
                            <span className="font-bold text-neutral-700 block">
                              MÉTODO CLÍNICO CENTRADO NA PESSOA (FIFE):
                            </span>
                            {data.experienciaDoencaFife.sentimentos && (
                              <p>
                                <strong>Sentimentos (F):</strong> {data.experienciaDoencaFife.sentimentos}
                              </p>
                            )}
                            {data.experienciaDoencaFife.ideias && (
                              <p>
                                <strong>Ideias (I):</strong> {data.experienciaDoencaFife.ideias}
                              </p>
                            )}
                            {data.experienciaDoencaFife.funcao && (
                              <p>
                                <strong>Função (F):</strong> {data.experienciaDoencaFife.funcao}
                              </p>
                            )}
                            {data.experienciaDoencaFife.expectativas && (
                              <p>
                                <strong>Expectativas (E):</strong> {data.experienciaDoencaFife.expectativas}
                              </p>
                            )}
                          </div>
                        )}
                    </div>

                    {/* Antecedentes */}
                    <div className="border-b border-neutral-200 pb-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                        3. Antecedentes Pessoais, Familiares e Hábitos
                      </h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9.5px]">
                        <div>
                          <strong>Patológicos (HPP):</strong> {data.hpp || 'Sem comorbidades relatadas.'}
                        </div>
                        <div>
                          <strong>Medicamentos:</strong>{' '}
                          {data.resumoProblemas.tratamentosFimDefinido || 'Nega uso contínuo.'}
                        </div>
                        <div>
                          <strong>Alergias:</strong>{' '}
                          <span className="text-red-700 font-semibold">
                            {data.resumoProblemas.comorbidadesAlergias?.includes('Alergia')
                              ? data.resumoProblemas.comorbidadesAlergias
                              : 'Nega alergias medicamentosas conhecidas.'}
                          </span>
                        </div>
                        <div>
                          <strong>Hábitos & Histórico Social:</strong>{' '}
                          {data.historiaSocial || 'Nega tabagismo ou etilismo.'}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Evolução SOAP Subjetivo & Problemas */
                  <div className="border-b border-neutral-200 pb-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-0.5">
                      Subjetivo (S) & Relato do Dia
                    </h4>
                    <p className="text-justify whitespace-pre-wrap">
                      {data.pacienteRelata || 'Paciente estável no leito, sem queixas ativas.'}
                    </p>
                    {data.resumoProblemas.intercorrencias && (
                      <p className="mt-1 text-[9.5px] text-neutral-700">
                        <strong>Intercorrências das últimas 24h:</strong>{' '}
                        {data.resumoProblemas.intercorrencias}
                      </p>
                    )}
                  </div>
                )}

                {/* Sinais Vitais em Tabela Técnica Hospitalar */}
                <div className="border-b border-neutral-200 pb-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    {data.tipo === 'anamnese' ? '4. Sinais Vitais' : 'Objetivo (O) — Sinais Vitais'}
                  </h4>
                  <table className="w-full border-collapse border border-neutral-300 text-[9.5px] text-center">
                    <thead className="bg-neutral-100 font-bold text-neutral-800">
                      <tr>
                        <th className="border border-neutral-300 py-1">PA (mmHg)</th>
                        <th className="border border-neutral-300 py-1">FC (bpm)</th>
                        <th className="border border-neutral-300 py-1">FR (ipm)</th>
                        <th className="border border-neutral-300 py-1">Tax (°C)</th>
                        <th className="border border-neutral-300 py-1">SatO2 (%)</th>
                        <th className="border border-neutral-300 py-1">Suporte O2</th>
                        <th className="border border-neutral-300 py-1">Glicemia</th>
                        <th className="border border-neutral-300 py-1">Escala de Dor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="font-semibold text-neutral-900">
                        <td className="border border-neutral-300 py-1">
                          {data.sinaisVitais.pa || '120x80'}
                        </td>
                        <td className="border border-neutral-300 py-1">
                          {data.sinaisVitais.fc || '75'}
                        </td>
                        <td className="border border-neutral-300 py-1">
                          {data.sinaisVitais.fr || '16'}
                        </td>
                        <td className="border border-neutral-300 py-1">
                          {data.sinaisVitais.tax || '36.5'}
                        </td>
                        <td className="border border-neutral-300 py-1">
                          {data.sinaisVitais.satO2 || '98'}
                        </td>
                        <td className="border border-neutral-300 py-1">
                          {data.sinaisVitais.o2Suporte || 'AA'}
                        </td>
                        <td className="border border-neutral-300 py-1">
                          {data.sinaisVitais.glicemia || 'N/A'}
                        </td>
                        <td className="border border-neutral-300 py-1">
                          {data.sinaisVitais.dorEscala || '0/10'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Exame Físico Dirigido */}
                <div className="border-b border-neutral-200 pb-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    {data.tipo === 'anamnese'
                      ? '5. Exame Físico Geral e Especializado'
                      : 'Objetivo (O) — Exame Físico Dirigido'}
                  </h4>
                  <div className="space-y-1 text-[9.5px]">
                    <p>
                      <strong>Ectoscopia:</strong>{' '}
                      {data.exameFisico.estadoGeral ||
                        'Bom estado geral, lúcido e orientado, corado, hidratado, acianótico, anictérico.'}
                    </p>
                    {data.exameFisico.cabecaPescoco && (
                      <p>
                        <strong>Cabeça e Pescoço:</strong> {data.exameFisico.cabecaPescoco}
                      </p>
                    )}
                    <p>
                      <strong>Aparelho Cardiovascular (ACV):</strong>{' '}
                      {data.exameFisico.acv ||
                        'Ritmo cardíaco regular em 2 tempos, bulhas normofonéticas sem sopros.'}
                    </p>
                    <p>
                      <strong>Aparelho Respiratório (AR):</strong>{' '}
                      {data.exameFisico.aResp ||
                        'Murmúrio vesicular universalmente audível, sem ruídos adventícios.'}
                    </p>
                    <p>
                      <strong>Abdome:</strong>{' '}
                      {data.exameFisico.abdome ||
                        'Plano, flácido, indolor à palpação superficial e profunda, ruídos hidroaéreos presentes.'}
                    </p>
                    <p>
                      <strong>Extremidades & Pulsos:</strong>{' '}
                      {data.exameFisico.extremidades ||
                        'Aquecidas e bem perfundidas, pulsos periféricos simétricos e palpáveis, sem edemas.'}
                    </p>
                  </div>
                </div>

                {/* Hipótese Diagnóstica & CID-10 */}
                <div className="border-b border-neutral-200 pb-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    {data.tipo === 'anamnese'
                      ? '6. Diagnósticos & Raciocínio Clínico'
                      : 'Avaliação (A) — Diagnósticos'}
                  </h4>
                  <div className="p-2 rounded bg-neutral-50 border border-neutral-300 flex items-start justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-neutral-600 block">
                        Diagnóstico Principal:
                      </span>
                      <strong className="text-[11px] text-neutral-900">
                        {data.hipotesePrincipal.nomeCid || 'Avaliação clínica sem definição sindrômica.'}
                      </strong>
                      {data.hipotesePrincipal.justificativa && (
                        <p className="text-[9.5px] text-neutral-600 mt-0.5">
                          <em>Critérios:</em> {data.hipotesePrincipal.justificativa}
                        </p>
                      )}
                    </div>
                    {data.hipotesePrincipal.codigoCid && (
                      <span className="font-mono text-[11px] font-bold bg-neutral-200 px-2 py-0.5 rounded border border-neutral-400">
                        CID-10: {data.hipotesePrincipal.codigoCid}
                      </span>
                    )}
                  </div>

                  {/* Diagnóstico Sindrômico e Topográfico se existirem */}
                  {data.raciocinioClinico &&
                    (data.raciocinioClinico.sindromico || data.raciocinioClinico.topografico) && (
                      <div className="grid grid-cols-2 gap-2 mt-1.5 text-[9.5px]">
                        {data.raciocinioClinico.sindromico && (
                          <div>
                            <strong>Diag. Sindrômico:</strong> {data.raciocinioClinico.sindromico}
                          </div>
                        )}
                        {data.raciocinioClinico.topografico && (
                          <div>
                            <strong>Diag. Topográfico:</strong> {data.raciocinioClinico.topografico}
                          </div>
                        )}
                      </div>
                    )}
                </div>

                {/* Conduta Terapêutica / Prescrição & Plano */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    {data.tipo === 'anamnese'
                      ? '7. Plano Terapêutico & Condutas'
                      : 'Plano (P) — Conduta e Prescrição'}
                  </h4>
                  <div className="space-y-1 text-[9.5px]">
                    {data.condutaTerapeutica && (
                      <p>
                        <strong>Prescrição / Farmacoterapia:</strong> {data.condutaTerapeutica}
                      </p>
                    )}
                    {data.condutaDiagnostica && (
                      <p>
                        <strong>Propedêutica Complementar:</strong> {data.condutaDiagnostica}
                      </p>
                    )}
                    {data.cuidadosGerais && (
                      <p>
                        <strong>Cuidados Gerais & Enfermagem:</strong> {data.cuidadosGerais}
                      </p>
                    )}
                    {data.planoAltaSeguimento && (
                      <p>
                        <strong>Metas de Alta / Sinais de Alerta:</strong>{' '}
                        {data.planoAltaSeguimento}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer & Official Physician Stamp */}
            <div className="pt-6 mt-6 border-t-2 border-neutral-900">
              <div className="flex items-end justify-between">
                <div className="space-y-1 text-[8.5px] text-neutral-500 max-w-xs font-mono">
                  <p>
                    Documento gerado eletronicamente em conformidade com as diretrizes do Conselho
                    Federal de Medicina (Resolução CFM nº 1.821/2007).
                  </p>
                  <p className="text-neutral-700 font-semibold">
                    gerador de anamnese — Registro Clínico Estruturado
                  </p>
                </div>

                {/* Professional Stamp and Signature Box */}
                <div className="text-center min-w-[200px] border-t border-neutral-800 pt-1.5">
                  <div className="text-[10.5px] font-bold text-neutral-900">
                    Dr(a). {data.identificacao.responsavel || 'Médico(a) Assistente'}
                  </div>
                  <div className="text-[9.5px] font-mono text-neutral-700">
                    CRM: {data.identificacao.crm || '_____________________'}
                  </div>
                  <div className="text-[8.5px] text-neutral-500">
                    Assinatura / Carimbo Profissional
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
