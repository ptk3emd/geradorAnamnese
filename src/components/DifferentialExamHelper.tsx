/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PhysicalExam, VitalSigns } from '../types/clinical';
import {
  analyzeDifferentialExamLogic,
  ExamSuggestionItem,
  ExamTargetField,
} from '../services/differentialLogicEngine';
import {
  Stethoscope,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Plus,
  ChevronDown,
  ChevronUp,
  Check,
} from 'lucide-react';

interface DifferentialExamHelperProps {
  queixaPrincipal: string;
  hda: string;
  exameFisico: PhysicalExam;
  sinaisVitais?: VitalSigns;
  onApplyFinding: (field: ExamTargetField, findingText: string) => void;
}

const FIELD_LABELS: Record<ExamTargetField, string> = {
  estadoGeral: 'Estado Geral',
  ectoscopia: 'Ectoscopia',
  cabecaPescoco: 'Cabeça & Pescoço',
  acv: 'Aparelho Cardiovascular (ACV)',
  aResp: 'Aparelho Respiratório (AR)',
  abdome: 'Abdome',
  extremidades: 'Extremidades',
  neurologicoPele: 'Neurológico & Pele',
};

export const DifferentialExamHelper: React.FC<DifferentialExamHelperProps> = ({
  queixaPrincipal,
  hda,
  exameFisico,
  sinaisVitais,
  onApplyFinding,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filterMode, setFilterMode] = useState<'all' | 'missing'>('all');
  const [recentlyInsertedId, setRecentlyInsertedId] = useState<string | null>(null);

  const analysis = analyzeDifferentialExamLogic(queixaPrincipal, hda, exameFisico, sinaisVitais);

  const handleInsert = (item: ExamSuggestionItem, findingText: string) => {
    onApplyFinding(item.targetField, findingText);
    setRecentlyInsertedId(`${item.id}-${findingText.slice(0, 10)}`);
    setTimeout(() => {
      setRecentlyInsertedId(null);
    }, 2200);
  };

  const displayedSuggestions =
    filterMode === 'missing'
      ? analysis.suggestions.filter((s) => s.status === 'missing')
      : analysis.suggestions;

  if (analysis.detectedSyndromes.length === 0) {
    return (
      <div className="rounded-xl bg-neutral-900/60 border border-neutral-800 p-3.5 sm:p-4 text-[12px] text-neutral-400 flex items-start space-x-3">
        <div className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 shrink-0 mt-0.5">
          <Stethoscope className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-neutral-200">
              Lógica Semiológica Diferencial
            </span>
            <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
              Aguardando QP/HMA
            </span>
          </div>
          <p className="mt-1 text-neutral-400 text-[11.5px] leading-relaxed">
            Preencha a <strong>Queixa Principal (Etapa 2)</strong> e a <strong>HMA (Etapa 3)</strong> com
            os sintomas relatados (dor torácica, dispneia, dor abdominal, cefaleia, febre, etc.)
            para sugestão automática de manobras semiológicas dirigidas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-neutral-900/70 border border-neutral-800 p-4 sm:p-5 space-y-3 transition-all">
      {/* Header with syndromes and toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-neutral-800">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-md bg-neutral-800 text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <h4 className="text-[13px] sm:text-[13.5px] font-medium text-white tracking-tight">
                Lógica Semiológica Diferencial
              </h4>
            </div>

            {analysis.missingCount > 0 ? (
              <span className="flex items-center space-x-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700 px-2 py-0.5 text-[10.5px] font-medium">
                <AlertTriangle className="h-3 w-3" />
                <span>{analysis.missingCount} manobra(s) pendente(s)</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700 px-2 py-0.5 text-[10.5px] font-medium">
                <CheckCircle2 className="h-3 w-3" />
                <span>Itens essenciais abordados</span>
              </span>
            )}
          </div>

          {/* Detected syndromes badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[11px] text-neutral-400">Síndromes detectadas:</span>
            {analysis.detectedSyndromes.map((syn) => (
              <span
                key={syn.name}
                className="rounded-md px-2 py-0.5 text-[10.5px] font-medium border border-neutral-700 bg-neutral-800 text-neutral-200"
              >
                {syn.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
          {analysis.missingCount > 0 && (
            <div className="flex items-center rounded-md bg-neutral-950 p-0.5 border border-neutral-800 text-[11px]">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-2 py-0.5 rounded transition ${
                  filterMode === 'all'
                    ? 'bg-neutral-200 text-neutral-950 font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Todos ({analysis.suggestions.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('missing')}
                className={`px-2 py-0.5 rounded transition ${
                  filterMode === 'missing'
                    ? 'bg-neutral-200 text-neutral-950 font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Faltando ({analysis.missingCount})
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
            title={isExpanded ? 'Recolher sugestões' : 'Expandir sugestões'}
          >
            {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Suggestion Items List */}
      {isExpanded && (
        <div className="space-y-2 pt-1">
          {displayedSuggestions.length === 0 ? (
            <p className="text-[12px] text-neutral-400 py-3 text-center">
              Nenhuma manobra pendente encontrada com o filtro atual.
            </p>
          ) : (
            displayedSuggestions.map((item) => {
              const isMissing = item.status === 'missing';
              const justInsertedNormal = recentlyInsertedId === `${item.id}-${item.suggestedNormal.slice(0, 10)}`;
              const justInsertedAbnormal = recentlyInsertedId === `${item.id}-${item.suggestedAbnormal.slice(0, 10)}`;

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border transition ${
                    isMissing
                      ? 'bg-neutral-900 border-neutral-700'
                      : 'bg-neutral-950 border-neutral-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                    {/* Item Information */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                          {FIELD_LABELS[item.targetField]}
                        </span>

                        <h5 className="text-[12.5px] font-medium text-white tracking-tight">
                          {item.title}
                        </h5>

                        {isMissing ? (
                          <span className="text-[10px] text-neutral-300 bg-neutral-800 border border-neutral-700 px-1.5 py-0.5 rounded font-medium">
                            Pendente
                          </span>
                        ) : (
                          <span className="text-[10px] text-neutral-300 bg-neutral-800 border border-neutral-700 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                            <Check className="h-2.5 w-2.5" />
                            Abordado
                          </span>
                        )}
                      </div>

                      <p className="text-[11.5px] text-neutral-400 leading-relaxed">
                        {item.clinicalRationale}
                      </p>
                    </div>

                    {/* Quick Insert Actions */}
                    <div className="flex items-center space-x-1.5 shrink-0 self-start sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleInsert(item, item.suggestedNormal)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition active:scale-95 ${
                          justInsertedNormal
                            ? 'bg-white text-black'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                        }`}
                        title={`Inserir achado normal no campo ${FIELD_LABELS[item.targetField]}`}
                      >
                        {justInsertedNormal ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Inserido</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3 w-3" />
                            <span>Normal</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInsert(item, item.suggestedAbnormal)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition active:scale-95 ${
                          justInsertedAbnormal
                            ? 'bg-neutral-200 text-black'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                        }`}
                        title={`Inserir achado patológico no campo ${FIELD_LABELS[item.targetField]}`}
                      >
                        {justInsertedAbnormal ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Inserido</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3 w-3" />
                            <span>Alterado</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
