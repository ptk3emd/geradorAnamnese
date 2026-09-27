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
  Info,
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
      <div className="rounded-3xl bg-white/[0.03] border border-white/[0.1] p-4 text-[12px] text-white/60 flex items-start space-x-3">
        <div className="p-2 rounded-2xl bg-white/10 text-white/70 shrink-0 mt-0.5">
          <Stethoscope className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-white/90">
              Assistente de Lógica Semiológica Diferencial
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
              Aguardando QP/HMA
            </span>
          </div>
          <p className="mt-1 text-white/50 text-[11.5px] leading-relaxed">
            Preencha a <strong>Queixa Principal (Etapa 2)</strong> e a <strong>HMA (Etapa 3)</strong> com
            os sintomas relatados (ex: dor torácica, dispneia, dor abdominal, cefaleia, febre, etc.)
            para que o motor sugira automaticamente manobras e achados físicos dirigidos que podem
            estar faltando na investigação diferencial.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white/[0.04] border border-white/[0.14] backdrop-blur-2xl p-5 shadow-2xl space-y-3.5 transition-all">
      {/* Header Capsule with syndromes and toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-xl bg-amber-400/20 text-amber-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <h4 className="text-[13.5px] font-medium text-white tracking-tight">
                Lógica Semiológica Diferencial Baseada na Queixa & HMA
              </h4>
            </div>

            {analysis.missingCount > 0 ? (
              <span className="flex items-center space-x-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 text-[10.5px] font-semibold">
                <AlertTriangle className="h-3 w-3" />
                <span>{analysis.missingCount} manobra(s) pendente(s) no exame</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-[10.5px] font-semibold">
                <CheckCircle2 className="h-3 w-3" />
                <span>Todos os itens dirigidos abordados</span>
              </span>
            )}
          </div>

          {/* Detected syndromes badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[11px] text-white/50">Síndromes detectadas:</span>
            {analysis.detectedSyndromes.map((syn) => (
              <span
                key={syn.name}
                className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-medium border ${syn.color}`}
              >
                {syn.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
          {analysis.missingCount > 0 && (
            <div className="flex items-center rounded-full bg-white/[0.06] p-0.5 border border-white/[0.1] text-[11px]">
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1 rounded-full transition ${
                  filterMode === 'all'
                    ? 'bg-white text-black font-medium shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Todos ({analysis.suggestions.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('missing')}
                className={`px-2.5 py-1 rounded-full transition ${
                  filterMode === 'missing'
                    ? 'bg-white text-black font-medium shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Faltando ({analysis.missingCount})
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white/70 hover:text-white transition"
            title={isExpanded ? 'Recolher sugestões' : 'Expandir sugestões'}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Suggestion Items List */}
      {isExpanded && (
        <div className="space-y-2.5 pt-1">
          {displayedSuggestions.length === 0 ? (
            <p className="text-[12px] text-white/50 py-3 text-center">
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
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isMissing
                      ? 'bg-amber-500/[0.04] border-amber-500/25 hover:border-amber-500/40'
                      : 'bg-white/[0.02] border-white/[0.08] opacity-85'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                    {/* Item Information */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                          {FIELD_LABELS[item.targetField]}
                        </span>

                        <h5 className="text-[12.5px] font-medium text-white tracking-tight">
                          {item.title}
                        </h5>

                        {isMissing ? (
                          <span className="text-[10px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full font-semibold">
                            Não abordado
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                            <Check className="h-2.5 w-2.5" />
                            Já abordado
                          </span>
                        )}
                      </div>

                      <p className="text-[11.5px] text-white/60 leading-relaxed">
                        {item.clinicalRationale}
                      </p>
                    </div>

                    {/* Quick Insert Actions */}
                    <div className="flex items-center space-x-1.5 shrink-0 self-start sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleInsert(item, item.suggestedNormal)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition active:scale-95 ${
                          justInsertedNormal
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
                        }`}
                        title={`Inserir achado normal no campo ${FIELD_LABELS[item.targetField]}`}
                      >
                        {justInsertedNormal ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Inserido!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3 w-3" />
                            <span>+ Normal</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInsert(item, item.suggestedAbnormal)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition active:scale-95 ${
                          justInsertedAbnormal
                            ? 'bg-amber-500 text-black shadow-md'
                            : 'bg-amber-500/15 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30'
                        }`}
                        title={`Inserir achado patológico no campo ${FIELD_LABELS[item.targetField]}`}
                      >
                        {justInsertedAbnormal ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Inserido!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3 w-3" />
                            <span>+ Patológico</span>
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
