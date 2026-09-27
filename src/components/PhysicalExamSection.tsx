/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PhysicalExam } from '../types/clinical';
import { UserCheck, Sparkles, RefreshCw } from 'lucide-react';

interface PhysicalExamSectionProps {
  exam: PhysicalExam;
  onChange: (updated: PhysicalExam) => void;
}

export const PhysicalExamSection: React.FC<PhysicalExamSectionProps> = ({
  exam,
  onChange,
}) => {
  const handleFieldChange = (field: keyof PhysicalExam, value: string) => {
    onChange({
      ...exam,
      [field]: value,
    });
  };

  const handleApplyNormalExam = () => {
    onChange({
      estadoGeral: 'Bom estado geral (BEG), lúcido e orientado no tempo e espaço (LOTE), corado, hidratado, anictérico, acianótico, afebril.',
      ectoscopia: 'Fácies atípica, mucosas úmidas e normocoradas, sem linfonodomegalias palpáveis, boa perfusão periférica (TEC < 2s).',
      cabecaPescoco: 'Pupilas isocóricas e fotorreagentes, sem turgência jugular patológica a 45°, tireoide impalpável.',
      acv: 'Ritmo cardíaco regular em 2 tempos (RCR, 2T), bulhas normofonéticas (BNF), sem sopros ou estalidos audíveis.',
      aResp: 'Murmúrio vesicular universalmente audível (MVUA), sem ruídos adventícios (sem RA), eupneico em ar ambiente.',
      abdome: 'Plano, flácido, ruídos hidroaéreos presentes e normoativos (RHA+), indolor à palpação superficial e profunda, sem visceromegalias, descompressão brusca indolor.',
      extremidades: 'Extremidades aquecidas, pulsos periféricos amplos e simétricos, sem empastamento de panturrilhas, sem edema de membros inferiores.',
      neurologicoPele: 'Glasgow 15, sem déficits motores ou sensitivos focais, pares cranianos preservados, sem sinais meníngeos. Pele sem lesões ativas.'
    });
  };

  const handleClearExam = () => {
    onChange({
      estadoGeral: '',
      ectoscopia: '',
      cabecaPescoco: '',
      acv: '',
      aResp: '',
      abdome: '',
      extremidades: '',
      neurologicoPele: '',
    });
  };

  return (
    <div className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0f0f0] pb-3">
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0066cc]/10 text-[#0066cc]">
            <UserCheck className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
              Exame Físico Sistematizado (Objetivo - O)
            </h3>
            <p className="text-[12px] text-[#7a7a7a]">
              Avaliação segmentar e semiologia médica padronizada
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleApplyNormalExam}
            className="flex items-center space-x-1.5 rounded-full bg-[#fafafc] border border-[#e0e0e0] px-3 py-1 text-[12px] font-medium text-[#0066cc] hover:bg-[#0066cc]/10 transition active:scale-95"
          >
            <Sparkles className="h-3 w-3" />
            <span>Padrão Normal</span>
          </button>

          <button
            type="button"
            onClick={handleClearExam}
            title="Limpar campos"
            className="p-1 rounded-full text-[#7a7a7a] hover:text-[#1d1d1f] hover:bg-[#f0f0f0] transition active:scale-95"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Estado Geral */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            Estado Geral & Ectoscopia
          </label>
          <input
            type="text"
            value={exam.estadoGeral}
            onChange={(e) => handleFieldChange('estadoGeral', e.target.value)}
            placeholder="BEG, LOTE, corado, hidratado, anictérico, acianótico, afebril"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>

        {/* Cabeça e Pescoço */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            Cabeça & Pescoço / Ectoscopia
          </label>
          <input
            type="text"
            value={exam.cabecaPescoco}
            onChange={(e) => handleFieldChange('cabecaPescoco', e.target.value)}
            placeholder="Pupilas isocóricas e fotorreagentes, sem turgência jugular a 45°"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>

        {/* ACV */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            ACV (Aparelho Cardiovascular)
          </label>
          <input
            type="text"
            value={exam.acv}
            onChange={(e) => handleFieldChange('acv', e.target.value)}
            placeholder="RCR, 2T, BNF, sem sopros audíveis"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>

        {/* AResp */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            AResp (Aparelho Respiratório)
          </label>
          <input
            type="text"
            value={exam.aResp}
            onChange={(e) => handleFieldChange('aResp', e.target.value)}
            placeholder="MVUA, sem RA (ou crepitações bibasais / sibilos)"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>

        {/* Abdome */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            Abdome
          </label>
          <input
            type="text"
            value={exam.abdome}
            onChange={(e) => handleFieldChange('abdome', e.target.value)}
            placeholder="Plano, flácido, RHA+, indolor à palpação, descompressão indolor"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>

        {/* Extremidades / MMII */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            Extremidades / MMII
          </label>
          <input
            type="text"
            value={exam.extremidades}
            onChange={(e) => handleFieldChange('extremidades', e.target.value)}
            placeholder="Sem edema, pulsos simétricos, panturrilhas livres (ou edema +/4+)"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>

        {/* Neurológico / Pele / Outros */}
        <div className="md:col-span-2">
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a] mb-1">
            Neurológico / Pele / Outros
          </label>
          <input
            type="text"
            value={exam.neurologicoPele}
            onChange={(e) => handleFieldChange('neurologicoPele', e.target.value)}
            placeholder="Vigil, orientado no tempo e espaço, sem déficits focais motores ou sensitivos"
            className="w-full rounded-xl border border-[#e0e0e0] bg-[#fafafc] px-3 py-2 text-[12px] text-[#1d1d1f] outline-none focus:border-[#0066cc] focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
};
