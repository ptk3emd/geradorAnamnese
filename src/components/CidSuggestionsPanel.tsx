/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Cid10ProtocolItem, ClinicalData } from '../types/clinical';
import { detectClinicalHypotheses } from '../services/clinicalRegexEngine';
import { CID10_PROTOCOLS } from '../data/cid10Protocols';
import { Stethoscope, Check, AlertTriangle, ShieldCheck, Search, ChevronRight, FileCheck } from 'lucide-react';

interface CidSuggestionsPanelProps {
  clinicalData: ClinicalData;
  onApplyProtocol: (protocol: Cid10ProtocolItem) => void;
}

export const CidSuggestionsPanel: React.FC<CidSuggestionsPanelProps> = ({
  clinicalData,
  onApplyProtocol,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const detectionResult = detectClinicalHypotheses(clinicalData);
  const primaryMatch = detectionResult.primary;
  const suggestions = detectionResult.suggestions;

  // Search filter
  const filteredAll = searchTerm.trim()
    ? CID10_PROTOCOLS.filter(
        (p) =>
          p.cid.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.sinonimos.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : [];

  return (
    <div className="rounded-[18px] border border-[#e0e0e0] bg-white p-5 shadow-none transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0f0f0] pb-3">
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0066cc]/10 text-[#0066cc]">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
              Sugestão de CID-10 & Protocolo Clínico
            </h3>
            <p className="text-[12px] text-[#7a7a7a]">
              Identificação automática por Regex e regras clínicas (sem IA)
            </p>
          </div>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#7a7a7a]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por CID ou termo..."
            className="w-full rounded-full border border-[#e0e0e0] bg-[#fafafc] pl-8 pr-3 py-1.5 text-[12px] text-[#1d1d1f] placeholder-[#a1a1a6] outline-none focus:border-[#0066cc]"
          />
        </div>
      </div>

      {/* Manual Search Results if searching */}
      {searchTerm.trim() ? (
        <div className="mt-3 space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#7a7a7a]">
            Resultados da busca ({filteredAll.length})
          </p>
          {filteredAll.length === 0 ? (
            <p className="text-[13px] text-[#7a7a7a] py-2">
              Nenhum protocolo correspondente encontrado para &quot;{searchTerm}&quot;.
            </p>
          ) : (
            filteredAll.slice(0, 4).map((item) => (
              <ProtocolCard
                key={item.id}
                item={item}
                isSelected={clinicalData.hipotesePrincipal.codigoCid === item.cid}
                onApply={() => {
                  onApplyProtocol(item);
                  setSearchTerm('');
                }}
              />
            ))
          )}
        </div>
      ) : (
        /* Real-time regex matched protocol */
        <div className="mt-3 space-y-3">
          {primaryMatch ? (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center space-x-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <Check className="h-3 w-3" />
                  <span>Correspondência Primária Detectada</span>
                </span>
                <span className="text-[11px] text-[#7a7a7a]">
                  Regra acionada com sucesso
                </span>
              </div>

              <ProtocolCard
                item={primaryMatch}
                isPrimary
                isSelected={clinicalData.hipotesePrincipal.codigoCid === primaryMatch.cid}
                onApply={() => onApplyProtocol(primaryMatch)}
              />

              {/* Suggestions / Differentials from Regex */}
              {suggestions.length > 0 && (
                <div className="mt-3">
                  <p className="text-[11px] font-medium text-[#7a7a7a] mb-1.5 uppercase tracking-wider">
                    Outras hipóteses sindrômicas detectadas:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {suggestions.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-[#e0e0e0] bg-[#fafafc] p-2.5 text-[12px] hover:border-[#0066cc]/40 transition"
                      >
                        <div className="truncate pr-2">
                          <span className="font-semibold text-[#0066cc] mr-1.5">
                            {item.cid}
                          </span>
                          <span className="text-[#1d1d1f]">{item.nome}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onApplyProtocol(item)}
                          className="shrink-0 rounded-full bg-white px-2 py-1 text-[11px] font-medium text-[#0066cc] border border-[#e0e0e0] hover:bg-[#0066cc] hover:text-white transition active:scale-95"
                        >
                          Usar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#e0e0e0] p-4 text-center">
              <Stethoscope className="mx-auto h-6 w-6 text-[#a1a1a6] mb-1" />
              <p className="text-[13px] font-medium text-[#1d1d1f]">
                Aguardando preenchimento dos sintomas ou hipótese
              </p>
              <p className="text-[12px] text-[#7a7a7a] mt-0.5">
                Digite termos como dor torácica, dispneia, tosse com febre, apendicite ou PA elevada para disparo automático do protocolo.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface ProtocolCardProps {
  item: Cid10ProtocolItem;
  isPrimary?: boolean;
  isSelected?: boolean;
  onApply: () => void;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({
  item,
  isPrimary,
  isSelected,
  onApply,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-all ${
        isSelected
          ? 'border-[#0066cc] bg-[#0066cc]/5 ring-1 ring-[#0066cc]'
          : isPrimary
          ? 'border-[#0066cc]/30 bg-[#fafafc]'
          : 'border-[#e0e0e0] bg-white'
      } p-3.5`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-start space-x-2.5">
          <span className="mt-0.5 inline-block rounded-md bg-[#0066cc] px-2 py-0.5 text-[11px] font-bold tracking-wide text-white">
            {item.cid}
          </span>
          <div>
            <h4 className="text-[14px] font-semibold text-[#1d1d1f]">{item.nome}</h4>
            <p className="text-[12px] text-[#7a7a7a]">{item.categoria}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-[12px] text-[#0066cc] hover:underline"
          >
            {expanded ? 'Ocultar detalhes' : 'Ver conduta'}
          </button>

          <button
            type="button"
            onClick={onApply}
            className={`flex items-center space-x-1 rounded-full px-3.5 py-1 text-[12px] font-medium transition active:scale-95 ${
              isSelected
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0066cc] text-white hover:bg-[#0071e3]'
            }`}
          >
            {isSelected ? (
              <>
                <FileCheck className="h-3 w-3" />
                <span>Aplicado</span>
              </>
            ) : (
              <>
                <span>Aplicar Protocolo</span>
                <ChevronRight className="h-3 w-3" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Clinical Protocol Details */}
      {expanded && (
        <div className="mt-3.5 pt-3 border-t border-[#e0e0e0] text-[12px] space-y-2 text-[#333333]">
          <div>
            <span className="font-semibold text-[#1d1d1f]">Conduta Terapêutica Sugerida:</span>{' '}
            <span className="text-[#333333]">{item.condutaTerapeuticaSugerida}</span>
          </div>

          <div>
            <span className="font-semibold text-[#1d1d1f]">Exames Complementares com Finalidade:</span>
            <ul className="mt-1 list-disc list-inside space-y-0.5 text-[#333333]">
              {item.examesSugeridos.map((e, idx) => (
                <li key={idx}>
                  <strong className="text-[#1d1d1f]">{e.exame}:</strong> {e.finalidade}
                </li>
              ))}
            </ul>
          </div>

          {item.alertasClinicos && item.alertasClinicos.length > 0 && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-2 text-amber-900 flex items-start space-x-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <span className="font-semibold">Sinais de Alerta:</span>{' '}
                {item.alertasClinicos.join(' | ')}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
