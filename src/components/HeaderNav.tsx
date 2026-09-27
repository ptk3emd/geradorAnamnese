/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { FileDown, RotateCcw, Upload, Printer } from 'lucide-react';

interface HeaderNavProps {
  onOpenChecklist?: () => void;
  onOpenReadyCases?: () => void;
  onCopyDocument?: () => void;
  onPrintDocument?: () => void;
  onDownloadPdf: () => void;
  onOpenPrintPreview?: () => void;
  onExportJson?: () => void;
  onImportJson?: (file: File) => void;
  onLoadExample?: () => void;
  onResetBlank: () => void;
  checklistCompletedCount?: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onDownloadPdf,
  onOpenPrintPreview,
  onResetBlank,
  onImportJson,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImportJson) {
      onImportJson(file);
      e.target.value = '';
    }
  };

  return (
    <header className="no-print sticky top-0 z-50 w-full bg-[#08090b]/80 backdrop-blur-2xl border-b border-white/[0.08]">
      {/* Hidden file input for importing JSON */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Minimal, Empty Topbar with only essentials */}
      <div className="mx-auto flex h-[52px] max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Name */}
        <div className="flex items-center space-x-2.5">
          <div className="h-2 w-2 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <span className="text-[15px] font-normal tracking-tight text-white/90 font-['Poppins'] lowercase">
            gerador de anamnese
          </span>
        </div>

        {/* Minimal Essential Actions */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onResetBlank}
            title="Limpar formulário e começar em branco"
            className="flex items-center space-x-1.5 rounded-full px-3.5 py-1.5 text-[12px] text-white/60 hover:text-white hover:bg-white/[0.06] transition"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Limpar</span>
          </button>

          {onImportJson && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Importar prontuário JSON"
              className="flex items-center space-x-1.5 rounded-full px-3.5 py-1.5 text-[12px] text-white/60 hover:text-white hover:bg-white/[0.06] transition hidden md:inline-flex"
            >
              <Upload className="h-3 w-3" />
              <span>Importar</span>
            </button>
          )}

          {onOpenPrintPreview && (
            <button
              type="button"
              onClick={onOpenPrintPreview}
              title="Pré-visualizar folha de impressão em tamanho A4"
              className="flex items-center space-x-1.5 rounded-full px-3.5 py-1.5 text-[12px] text-white/70 hover:text-white hover:bg-white/[0.08] transition border border-white/[0.12]"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Visualizar A4</span>
            </button>
          )}

          <button
            type="button"
            onClick={onDownloadPdf}
            title="Baixar PDF do Prontuário"
            className="flex items-center space-x-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-4 py-1.5 text-[12.5px] font-medium text-white transition active:scale-95 shadow-sm"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>Baixar PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
