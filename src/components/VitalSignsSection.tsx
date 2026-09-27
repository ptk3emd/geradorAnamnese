/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VitalSigns } from '../types/clinical';
import { evaluateVitalSigns } from '../services/clinicalRegexEngine';
import { HeartPulse, CheckCircle2, AlertTriangle } from 'lucide-react';

interface VitalSignsSectionProps {
  vitalSigns: VitalSigns;
  onChange: (updated: VitalSigns) => void;
}

export const VitalSignsSection: React.FC<VitalSignsSectionProps> = ({
  vitalSigns,
  onChange,
}) => {
  const assessment = evaluateVitalSigns(vitalSigns);

  const handleFieldChange = (field: keyof VitalSigns, value: string) => {
    onChange({
      ...vitalSigns,
      [field]: value,
    });
  };

  return (
    <div className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0f0f0] pb-3">
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0066cc]/10 text-[#0066cc]">
            <HeartPulse className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
              Sinais Vitais e Balanço das Últimas 24 Horas
            </h3>
            <p className="text-[12px] text-[#7a7a7a]">
              Parâmetros hemodinâmicos e equilíbrio hidroeletrolítico
            </p>
          </div>
        </div>

        {/* Real-time Status Badge */}
        <div className="flex items-center space-x-1.5 rounded-full bg-[#f5f5f7] px-3 py-1 text-[11px] font-medium text-[#1d1d1f]">
          {assessment.paStatus.includes('crise') || assessment.satO2Status === 'hipoxemia-grave' ? (
            <>
              <AlertTriangle className="h-3 w-3 text-red-600" />
              <span className="text-red-700 font-semibold">Alerta Hemodinâmico</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              <span>{assessment.resumoClinico}</span>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* PA */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            PA (mmHg)
          </label>
          <input
            type="text"
            value={vitalSigns.pa}
            onChange={(e) => handleFieldChange('pa', e.target.value)}
            placeholder="120x80"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] font-medium text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
          <span className="block mt-0.5 text-[10px] text-[#7a7a7a] truncate">
            {assessment.paDesc}
          </span>
        </div>

        {/* FC */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            FC (bpm)
          </label>
          <input
            type="text"
            value={vitalSigns.fc}
            onChange={(e) => handleFieldChange('fc', e.target.value)}
            placeholder="75"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] font-medium text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
          <span className="block mt-0.5 text-[10px] text-[#7a7a7a] truncate">
            {assessment.fcDesc}
          </span>
        </div>

        {/* FR */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            FR (irpm)
          </label>
          <input
            type="text"
            value={vitalSigns.fr}
            onChange={(e) => handleFieldChange('fr', e.target.value)}
            placeholder="16"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] font-medium text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
          <span className="block mt-0.5 text-[10px] text-[#7a7a7a] truncate">
            {assessment.frDesc}
          </span>
        </div>

        {/* Temperatura */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            Tax (°C)
          </label>
          <input
            type="text"
            value={vitalSigns.tax}
            onChange={(e) => handleFieldChange('tax', e.target.value)}
            placeholder="36.5"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[13px] font-medium text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
          <span className="block mt-0.5 text-[10px] text-[#7a7a7a] truncate">
            {assessment.taxDesc}
          </span>
        </div>

        {/* SatO2 e Suporte O2 */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            SatO₂ / Suporte
          </label>
          <div className="flex space-x-1">
            <input
              type="text"
              value={vitalSigns.satO2}
              onChange={(e) => handleFieldChange('satO2', e.target.value)}
              placeholder="98%"
              className="w-1/2 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-2.5 py-2 text-[13px] font-medium text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
            <input
              type="text"
              value={vitalSigns.o2Suporte}
              onChange={(e) => handleFieldChange('o2Suporte', e.target.value)}
              placeholder="AA"
              className="w-1/2 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-2 py-2 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>
          <span className="block mt-0.5 text-[10px] text-[#7a7a7a] truncate">
            {assessment.satO2Desc}
          </span>
        </div>
      </div>

      {/* Row 2: Balanço, Diurese, Glicemia, Dor */}
      <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#f0f0f0]">
        <div>
          <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
            Diurese (24h)
          </label>
          <input
            type="text"
            value={vitalSigns.diurese}
            onChange={(e) => handleFieldChange('diurese', e.target.value)}
            placeholder="Ex: 1400 ml, clara / espontânea"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
            Evacuações & Balanço Hídrico
          </label>
          <div className="flex space-x-1.5">
            <input
              type="text"
              value={vitalSigns.evacuacoes}
              onChange={(e) => handleFieldChange('evacuacoes', e.target.value)}
              placeholder="Ex: presentes"
              className="w-1/2 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-2.5 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
            <input
              type="text"
              value={vitalSigns.balanco}
              onChange={(e) => handleFieldChange('balanco', e.target.value)}
              placeholder="Ex: -350 ml"
              className="w-1/2 rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-2.5 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
            Glicemia Capilar (opcional)
          </label>
          <input
            type="text"
            value={vitalSigns.glicemia || ''}
            onChange={(e) => handleFieldChange('glicemia', e.target.value)}
            placeholder="Ex: 110 mg/dL"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-[#7a7a7a] mb-1">
            Escala de Dor (EVA 0 a 10)
          </label>
          <input
            type="text"
            value={vitalSigns.dorEscala || ''}
            onChange={(e) => handleFieldChange('dorEscala', e.target.value)}
            placeholder="Ex: 0/10 (ou 4/10)"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
};
