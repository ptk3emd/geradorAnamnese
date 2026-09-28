/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DocumentType, SpecialtyProfile } from '../types/clinical';
import { Activity, ClipboardList, Eye, Edit3, BookOpen } from 'lucide-react';

interface SubNavProps {
  documentType: DocumentType;
  onSelectDocumentType: (type: DocumentType) => void;
  specialty: SpecialtyProfile;
  onSelectSpecialty: (spec: SpecialtyProfile) => void;
  activeView: 'form' | 'preview';
  onToggleView: (view: 'form' | 'preview') => void;
  onOpenRoteiros?: () => void;
}

const SPECIALTY_OPTIONS: Array<{ id: SpecialtyProfile; label: string }> = [
  { id: 'clinica-geral', label: 'Clínica Geral' },
  { id: 'enfermaria-uti', label: 'Enfermaria / UTI' },
  { id: 'cardiologia', label: 'Cardiologia' },
  { id: 'pneumologia', label: 'Pneumologia' },
  { id: 'cirurgia', label: 'Cirurgia Geral' },
  { id: 'pediatria', label: 'Pediatria' },
];

export const SubNav: React.FC<SubNavProps> = ({
  documentType,
  onSelectDocumentType,
  specialty,
  onSelectSpecialty,
  activeView,
  onToggleView,
  onOpenRoteiros,
}) => {
  return (
    <div className="no-print w-full py-2.5 px-3 sm:px-6 bg-[#090909]/80 border-b border-neutral-800/80">
      <div className="mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 max-w-6xl">
        {/* Left Side: Document Model Switcher & Guides */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Segmented Control - Clean 8px Radius */}
          <div className="flex items-center p-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[12.5px] w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onSelectDocumentType('anamnese')}
              className={`min-h-10 flex flex-1 items-center justify-center space-x-1.5 rounded-md px-3.5 py-1.5 font-medium transition sm:flex-initial ${
                documentType === 'anamnese'
                  ? 'bg-neutral-100 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ClipboardList className="h-3.5 w-3.5" />
              <span>Anamnese</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectDocumentType('evolucao')}
              className={`min-h-10 flex flex-1 items-center justify-center space-x-1.5 rounded-md px-3.5 py-1.5 font-medium transition sm:flex-initial ${
                documentType === 'evolucao'
                  ? 'bg-neutral-100 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Evolução (SOAP)</span>
            </button>
          </div>

          {onOpenRoteiros && (
            <button
              type="button"
              onClick={onOpenRoteiros}
              className="flex min-h-10 items-center space-x-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-[12px] text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
              title="Consultar Roteiro Adulto (PUCRS) e Roteiro Pedagógico (MCCP)"
            >
              <BookOpen className="h-3.5 w-3.5 text-neutral-400" />
              <span className="hidden xs:inline">Roteiros Clínicos</span>
              <span className="xs:hidden">Roteiros</span>
            </button>
          )}
        </div>

        {/* Right side: Specialty Select & View Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          {/* Specialty Dropdown */}
          <div className="flex-1 sm:flex-initial">
            <select
              value={specialty}
              onChange={(e) => onSelectSpecialty(e.target.value as SpecialtyProfile)}
              aria-label="Perfil da Especialidade"
              className="min-h-10 w-full cursor-pointer rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-[12px] text-neutral-200 focus:border-neutral-400 focus:outline-none sm:w-auto"
            >
              {SPECIALTY_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-neutral-900 text-neutral-100">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle Form / Preview mode */}
          <div className="flex items-center p-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[12px] shrink-0">
            <button
              type="button"
              onClick={() => onToggleView('form')}
              className={`flex min-h-10 items-center space-x-1.5 rounded-md px-3 py-1.5 transition ${
                activeView === 'form'
                  ? 'bg-neutral-100 text-neutral-950 font-medium shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Edit3 className="h-3 w-3" />
              <span>Etapas</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleView('preview')}
              className={`flex min-h-10 items-center space-x-1.5 rounded-md px-3 py-1.5 transition ${
                activeView === 'preview'
                  ? 'bg-neutral-100 text-neutral-950 font-medium shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>Leitura</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
