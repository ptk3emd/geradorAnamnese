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
    <div className="no-print w-full py-3 px-4 sm:px-6">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-3 max-w-6xl">
        {/* Document Model Switcher - Glass Capsule */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center p-1 rounded-full bg-white/[0.05] border border-white/[0.12] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => onSelectDocumentType('anamnese')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-[13px] font-normal transition active:scale-95 ${
                documentType === 'anamnese'
                  ? 'bg-white text-black font-medium shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <ClipboardList className="h-3.5 w-3.5" />
              <span>Anamnese Completa</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectDocumentType('evolucao')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-[13px] font-normal transition active:scale-95 ${
                documentType === 'evolucao'
                  ? 'bg-white text-black font-medium shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Evolução Diária (SOAP)</span>
            </button>
          </div>

          {onOpenRoteiros && (
            <button
              type="button"
              onClick={onOpenRoteiros}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[12.5px] border border-white/[0.14] bg-white/[0.05] text-white/80 hover:text-white hover:bg-white/[0.1] transition active:scale-95"
              title="Consultar Roteiro Adulto (PUCRS) e Roteiro Pedagógico (MCCP)"
            >
              <BookOpen className="h-3.5 w-3.5 text-white/90" />
              <span>Roteiros & Guias</span>
            </button>
          )}
        </div>

        {/* Right side: Specialty Select & View Toggle */}
        <div className="flex items-center space-x-2">
          {/* Specialty Dropdown */}
          <div className="flex items-center space-x-1.5 text-white/50 text-[12px]">
            <select
              value={specialty}
              onChange={(e) => onSelectSpecialty(e.target.value as SpecialtyProfile)}
              aria-label="Perfil da Especialidade"
              className="rounded-full border border-white/[0.14] bg-white/[0.05] px-3.5 py-1.5 text-[12.5px] text-white/90 backdrop-blur-xl focus:outline-none focus:border-white/40 cursor-pointer"
            >
              {SPECIALTY_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-[#121316] text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle Form / Preview mode */}
          <div className="flex items-center p-1 rounded-full bg-white/[0.05] border border-white/[0.12] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => onToggleView('form')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[12px] transition ${
                activeView === 'form'
                  ? 'bg-white text-black font-medium shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Edit3 className="h-3 w-3" />
              <span>Etapas</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleView('preview')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[12px] transition ${
                activeView === 'preview'
                  ? 'bg-white text-black font-medium shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>Leitura no App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
