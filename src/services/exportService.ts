/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { ClinicalData, OutputFormat } from '../types/clinical';
import { generateClinicalDocument } from './clinicalRegexEngine';

export function downloadClinicalDataAsJson(data: ClinicalData): void {
  const patientName = (data.identificacao.nomeIniciais || 'paciente')
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `paciente_${patientName}_${data.tipo}_${new Date().toISOString().slice(0, 10)}.json`;

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generatePdfDocument(data: ClinicalData, format: OutputFormat): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 20;

  // Header Bar - Formal Black
  doc.setFillColor(0, 0, 0);
  doc.rect(margin, currentY, contentWidth, 1.2, 'F');
  currentY += 6;

  // Header titles
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  doc.text('DOCUMENTO CLÍNICO HOSPITALAR', margin, currentY);

  const dataHoraStr = `${data.identificacao.data || new Date().toLocaleDateString('pt-BR')} ${data.identificacao.hora || ''}`;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(`Data/Hora: ${dataHoraStr.trim()}`, pageWidth - margin, currentY, { align: 'right' });
  currentY += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(0, 0, 0);
  const docTitle = data.tipo === 'evolucao'
    ? 'EVOLUÇÃO MÉDICA DIÁRIA - MÉTODO SOAP & PROBLEMAS'
    : 'ANAMNESE MÉDICA COMPLETA & CONDUTA TERAPÊUTICA';
  doc.text(docTitle, margin, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  const subinfo = `Paciente: ${data.identificacao.nomeIniciais || 'Não identificado'} | Idade: ${data.identificacao.idade || 'N/I'} ${data.identificacao.idadeUnidade} | Sexo: ${data.identificacao.sexo} | Leito: ${data.identificacao.leito || 'N/I'} | Usuário: ${data.identificacao.responsavel || 'Não informado'}`;
  doc.text(subinfo, margin, currentY);
  currentY += 5;

  // Thin black divider line
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.4);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 6;

  // Document Text Body
  const documentFullText = generateClinicalDocument(data, format);
  const textLines = documentFullText.split('\n');

  doc.setTextColor(0, 0, 0);

  for (let i = 0; i < textLines.length; i++) {
    const rawLine = textLines[i];

    // Check if we need a new page
    if (currentY > pageHeight - 25) {
      doc.addPage();
      currentY = 20;

      // Repeat running mini header in black/gray
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 100, 100);
      doc.text(`gerador de anamnese | ${data.identificacao.nomeIniciais || 'Paciente'} | Prontuário Clínico (Continuação)`, margin, currentY - 5);
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.2);
      doc.line(margin, currentY - 3, pageWidth - margin, currentY - 3);
    }

    // Skip redundant separator lines from plaintext like "====="
    if (/^[=\-_]{4,}$/.test(rawLine.trim())) {
      continue;
    }

    // Formatting Section Headers (like "--- SUBJETIVO (S) ---" or "1. IDENTIFICAÇÃO")
    if (/^---.*---$/.test(rawLine.trim()) || /^\d+\.\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ\s/()]+$/.test(rawLine.trim())) {
      currentY += 3;
      if (currentY > pageHeight - 25) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0); // Strict black section header
      const cleanHeader = rawLine.replace(/^-+\s*|\s*-+$/g, '');
      doc.text(cleanHeader, margin, currentY);
      currentY += 4.8;
      continue;
    }

    // Key points (like "#1.", "•", "Hipótese Principal:")
    const isBulletOrTag = /^([#•]|\d+\.|\w+:)/.test(rawLine.trim());
    if (isBulletOrTag) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(0, 0, 0);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(40, 40, 40);
    }

    // Wrap long lines within contentWidth
    const splitWrapped = doc.splitTextToSize(rawLine, contentWidth);
    doc.text(splitWrapped, margin, currentY);
    currentY += splitWrapped.length * 4.2;

    if (rawLine.trim() === '') {
      currentY += 1.5;
    }
  }

  // Signature Block at the end
  if (currentY > pageHeight - 35) {
    doc.addPage();
    currentY = 25;
  } else {
    currentY += 8;
  }

  const signY = Math.min(currentY + 10, pageHeight - 20);
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.4);
  const signLineWidth = 65;
  const signX = pageWidth - margin - signLineWidth;
  doc.line(signX, signY, pageWidth - margin, signY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(29, 29, 31);
  doc.text(data.identificacao.responsavel || 'Assinatura do Usuário', signX + signLineWidth / 2, signY + 4, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 120);
  doc.text('Assinatura do Usuário', signX + signLineWidth / 2, signY + 7.5, { align: 'center' });

  // Add page numbers
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(160, 160, 160);
    doc.text(
      `Página ${p} de ${totalPages} - Gerador de Anamnese & Evolução`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  const patientSlug = (data.identificacao.nomeIniciais || 'paciente').replace(/[^a-zA-Z0-9_-]/g, '_');
  const pdfFileName = `${patientSlug}_${data.tipo}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(pdfFileName);
}
