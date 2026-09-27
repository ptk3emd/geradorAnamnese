/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClinicalData, SpecialtyProfile } from '../types/clinical';
import { PDF_SYNTHETIC_EXAMPLE, ANAMNESE_CHEST_PAIN_EXAMPLE, BLANK_CLINICAL_DATA } from '../data/defaultPresets';
import { Sparkles, FilePlus2, BookOpen, Stethoscope, HeartPulse, Activity } from 'lucide-react';

interface PresetSelectorProps {
  currentData: ClinicalData;
  onSelectPreset: (preset: ClinicalData) => void;
  onOpenReadyCases: () => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  onSelectPreset,
  onOpenReadyCases,
}) => {
  return (
    <div className="no-print rounded-[18px] border border-[#e0e0e0] bg-white p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-[#0066cc]" />
          <h3 className="text-[14px] font-semibold text-[#1d1d1f]">
            Modelos Rápidos & Casos de Referência
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onOpenReadyCases}
            className="flex items-center space-x-1.5 rounded-full bg-[#0066cc] px-3.5 py-1 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#0071e3] active:scale-95"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Ver os 20 Casos Prontos</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Preset 1: Official PDF example */}
        <button
          type="button"
          onClick={() => onSelectPreset(PDF_SYNTHETIC_EXAMPLE)}
          className="flex flex-col text-left rounded-xl border border-[#0066cc]/30 bg-[#0066cc]/5 p-3 hover:bg-[#0066cc]/10 transition active:scale-95 group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="inline-block rounded-md bg-[#0066cc] px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              Oficial do PDF
            </span>
            <Activity className="h-3.5 w-3.5 text-[#0066cc]" />
          </div>
          <span className="text-[13px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc]">
            Evolução Hospitalar - ICC
          </span>
          <span className="text-[11px] text-[#7a7a7a] mt-0.5">
            P.M.S., 68 anos, Leito 12. D3 IH, SOAP e Resumo (#1 a #7).
          </span>
        </button>

        {/* Preset 2: Chest pain / SCA */}
        <button
          type="button"
          onClick={() => onSelectPreset(ANAMNESE_CHEST_PAIN_EXAMPLE)}
          className="flex flex-col text-left rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-3 hover:bg-[#f0f0f0] transition active:scale-95 group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="inline-block rounded-md bg-rose-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              Cardiologia
            </span>
            <HeartPulse className="h-3.5 w-3.5 text-rose-600" />
          </div>
          <span className="text-[13px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc]">
            Anamnese - Dor Torácica (SCA)
          </span>
          <span className="text-[11px] text-[#7a7a7a] mt-0.5">
            J.C.S., 58 anos. Angina em aperto, troponina, protocolo de IAM.
          </span>
        </button>

        {/* Preset 3: Respiratory / PAC */}
        <button
          type="button"
          onClick={() => {
            onSelectPreset({
              ...BLANK_CLINICAL_DATA,
              tipo: 'anamnese',
              perfil: 'pneumologia',
              identificacao: {
                ...BLANK_CLINICAL_DATA.identificacao,
                nomeIniciais: 'M.L.O.',
                idade: '64',
                sexo: 'F',
                ocupacao: 'Dona de casa',
                leito: 'Enfermaria 06'
              },
              queixaPrincipal: 'Tosse com expectoração esverdeada e febre há 4 dias',
              hda: 'Paciente relata quadro com início há 4 dias caracterizado por tosse produtiva com escarro purulento, febre de 38.8°C e dispneia progressiva aos médios esforços. Refere dor pleurítica em base direita.',
              sintomasAtuais: 'Tosse persistente e astenia.',
              negativasRelevantes: 'Nega hemoptise, nega viagens recentes.',
              sinaisVitais: {
                pa: '110x70',
                fc: '98',
                fr: '22',
                tax: '38.4',
                satO2: '93',
                o2Suporte: 'AA',
                diurese: 'clara',
                evacuacoes: 'presentes',
                balanco: 'neutro'
              },
              exameFisico: {
                ...BLANK_CLINICAL_DATA.exameFisico,
                aResp: 'MVUA com crepitações inspiratórias em terço inferior de hemitórax direito, sem sibilos.'
              },
              hipotesePrincipal: {
                codigoCid: 'J18.9',
                nomeCid: 'Pneumonia Adquirida na Comunidade (PAC)',
                justificativa: 'Febre, tosse produtiva, taquipneia e estertores crepitantes focais em base pulmonar direita.'
              },
              condutaDiagnostica: 'Radiografia de tórax PA e Perfil; Hemograma, PCR, Ureia (CURB-65); Gasometria arterial.',
              condutaTerapeutica: 'Ceftriaxona 1g EV 1x/dia + Claritromicina 500mg VO 12/12h; Hidratação com SF 0,9%; Dipirona 1g se febre.',
              cuidadosGerais: 'Fisioterapia respiratória, oxigenoterapia para manter SatO2 > 94%, estímulo deambulação.'
            });
          }}
          className="flex flex-col text-left rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-3 hover:bg-[#f0f0f0] transition active:scale-95 group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="inline-block rounded-md bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              Pneumologia
            </span>
            <Stethoscope className="h-3.5 w-3.5 text-blue-600" />
          </div>
          <span className="text-[13px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc]">
            Anamnese - Pneumonia (PAC)
          </span>
          <span className="text-[11px] text-[#7a7a7a] mt-0.5">
            M.L.O., 64 anos. Febre, escarro purulento, CURB-65 e antimicrobianos.
          </span>
        </button>

        {/* Preset 4: Blank */}
        <button
          type="button"
          onClick={() => onSelectPreset(BLANK_CLINICAL_DATA)}
          className="flex flex-col text-left rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-3 hover:bg-[#f0f0f0] transition active:scale-95 group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="inline-block rounded-md bg-slate-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              Em Branco
            </span>
            <FilePlus2 className="h-3.5 w-3.5 text-slate-600" />
          </div>
          <span className="text-[13px] font-semibold text-[#1d1d1f] group-hover:text-[#0066cc]">
            Novo Paciente
          </span>
          <span className="text-[11px] text-[#7a7a7a] mt-0.5">
            Limpar formulário e iniciar registro clínico do zero.
          </span>
        </button>
      </div>
    </div>
  );
};
