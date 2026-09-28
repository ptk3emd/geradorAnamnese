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
    <header className="no-print sticky top-0 z-50 w-full bg-[#090909]/95 backdrop-blur-md border-b border-neutral-800">
      {/* Hidden file input for importing JSON */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,application/json"
        className="hidden"
      />

      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:h-14 sm:px-6 sm:py-0">
        {/* Brand Name */}
        <div className="flex min-w-0 items-center space-x-2.5">
          <div className="h-2 w-2 shrink-0 rounded-sm bg-neutral-400" />
          <span className="truncate text-[13px] font-medium tracking-tight text-white sm:text-[15px]">
            Gerador de Anamnese & Evolução
          </span>
        </div>

        {/* Essential Actions - Responsive, Mobile First, Clean Radii */}
        <div className="flex shrink-0 items-center space-x-1 sm:space-x-2">
          <button
            type="button"
            onClick={onResetBlank}
            title="Limpar formulário e começar em branco"
            className="flex min-h-10 min-w-10 items-center justify-center space-x-1.5 rounded-lg px-2.5 py-1.5 text-[12px] text-neutral-300 hover:text-white hover:bg-neutral-800 transition sm:min-h-0 sm:min-w-0 sm:px-3"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Limpar</span>
          </button>

          {onImportJson && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Importar prontuário JSON"
              className="flex items-center space-x-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-[12px] text-neutral-300 hover:text-white hover:bg-neutral-800 transition hidden md:inline-flex"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Importar</span>
            </button>
          )}

          {onOpenPrintPreview && (
            <button
              type="button"
              onClick={onOpenPrintPreview}
              title="Pré-visualizar folha de impressão em tamanho A4"
              className="hidden min-h-10 items-center space-x-1.5 rounded-lg border border-neutral-700 bg-neutral-900/60 px-2.5 py-1.5 text-[12px] text-neutral-200 transition hover:bg-neutral-800 hover:text-white sm:flex sm:px-3"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden xs:inline sm:inline">Visualizar A4</span>
            </button>
          )}

          <button
            type="button"
            onClick={onDownloadPdf}
            title="Baixar PDF do Prontuário"
            className="flex min-h-10 items-center space-x-1.5 rounded-lg bg-neutral-400 px-3 py-1.5 text-[12px] font-semibold text-neutral-950 shadow-sm transition hover:bg-neutral-300 active:scale-95 sm:px-3.5"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
