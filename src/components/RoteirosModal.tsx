/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ROTEIROS_OFICIAIS,
  MODELOS_DE_ANAMNESE,
  AnamneseTemplateModel,
  RoteiroDocDefinition,
} from '../data/anamneseRoteiros';
import {
  X,
  BookOpen,
  GraduationCap,
  Sparkles,
  FileCheck,
  Check,
  ChevronRight,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface RoteirosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyModel: (model: AnamneseTemplateModel) => void;
}

export const RoteirosModal: React.FC<RoteirosModalProps> = ({
  isOpen,
  onClose,
  onApplyModel,
}) => {
  const [activeTab, setActiveTab] = useState<'modelos' | 'adulto-pucrs' | 'pedagogico-mccp'>('modelos');
  const [selectedRoteiroIndex, setSelectedRoteiroIndex] = useState<number>(0);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentRoteiro: RoteiroDocDefinition =
    activeTab === 'adulto-pucrs'
      ? ROTEIROS_OFICIAIS[0]
      : ROTEIROS_OFICIAIS[1];

  const handleCopyGuide = (title: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedNotification(`Tópicos de "${title}" copiados!`);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0c0e13] border border-white/[0.14] text-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-2xl bg-white/10 text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-[16px] sm:text-[17px] font-medium text-white tracking-tight">
                  Roteiros & Modelos de Anamnese Médica
                </h2>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] text-white/90">
                  Semiologia Adulto & MCCP
                </span>
              </div>
              <p className="text-[12px] sm:text-[12.5px] text-white/50 mt-0.5">
                Diretrizes do <strong>Roteiro do Paciente Adulto (PUCRS)</strong> e do <strong>Roteiro Pedagógico Centrado na Pessoa (MCCP / FIFE)</strong>.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
            title="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Selector Capsule */}
        <div className="p-4 sm:px-6 border-b border-white/[0.08] bg-white/[0.01] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-1 p-1 rounded-full bg-white/[0.06] border border-white/[0.1]">
            <button
              type="button"
              onClick={() => setActiveTab('modelos')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-[12.5px] transition ${
                activeTab === 'modelos'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Modelos Prontos ({MODELOS_DE_ANAMNESE.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('adulto-pucrs')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-[12.5px] transition ${
                activeTab === 'adulto-pucrs'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <FileCheck className="h-3.5 w-3.5" />
              <span>Roteiro Adulto (PUCRS)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pedagogico-mccp')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-[12.5px] transition ${
                activeTab === 'pedagogico-mccp'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Roteiro Pedagógico (MCCP / FIFE)</span>
            </button>
          </div>

          {copiedNotification && (
            <div className="flex items-center space-x-1.5 text-[11.5px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full animate-in fade-in">
              <Check className="h-3.5 w-3.5" />
              <span>{copiedNotification}</span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* TAB 1: MODELOS PRONTOS PARA CARREGAMENTO */}
          {activeTab === 'modelos' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 text-[12.5px] text-white/70 flex items-start space-x-3">
                <Info className="h-4 w-4 text-white/80 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">Modelos clínicos parametrizados conforme os roteiros:</span>
                  <p className="mt-1 text-white/60">
                    Clique em qualquer modelo abaixo para carregar instantaneamente sua estrutura semiológica completa no formulário (anamnese, dados de identificação, HDA pelos 8 atributos, modelo FIFE, exame físico sistematizado e prescrição).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MODELOS_DE_ANAMNESE.map((mod) => (
                  <div
                    key={mod.id}
                    className="p-5 rounded-3xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 transition flex flex-col justify-between space-y-4 group shadow-lg"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="rounded-full bg-white/[0.1] border border-white/[0.15] px-2.5 py-0.5 text-white/80">
                          {mod.origemRoteiro === 'adulto-pucrs'
                            ? 'Roteiro Adulto PUCRS'
                            : mod.origemRoteiro === 'pedagogico-mccp'
                            ? 'Roteiro Pedagógico MCCP'
                            : 'SAMPLE / Emergência'}
                        </span>
                        <span className="font-mono text-white/50 text-[10.5px]">
                          {mod.data.hipotesePrincipal.codigoCid}
                        </span>
                      </div>

                      <h3 className="text-[14.5px] font-medium text-white group-hover:text-white transition">
                        {mod.titulo}
                      </h3>
                      <p className="text-[12px] text-white/60 leading-relaxed">
                        {mod.descricao}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {mod.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/70"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onApplyModel(mod);
                        onClose();
                      }}
                      className="w-full flex items-center justify-center space-x-2 rounded-full bg-white text-black hover:bg-neutral-200 py-2.5 text-[12.5px] font-medium transition active:scale-95 shadow-md"
                    >
                      <span>Carregar este Modelo no Formulário</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2 & 3: ROTEIROS OFICIAIS (PUCRS / PEDAGÓGICO) */}
          {(activeTab === 'adulto-pucrs' || activeTab === 'pedagogico-mccp') && (
            <div className="space-y-6">
              {/* Roteiro Header Info */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.04] border border-white/[0.12] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/50 font-mono">
                      {currentRoteiro.origem}
                    </span>
                    <h3 className="text-[17px] font-medium text-white">
                      {currentRoteiro.nome}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const modelToApply =
                        activeTab === 'adulto-pucrs'
                          ? MODELOS_DE_ANAMNESE[0]
                          : MODELOS_DE_ANAMNESE[1];
                      onApplyModel(modelToApply);
                      onClose();
                    }}
                    className="inline-flex items-center space-x-2 rounded-full bg-white text-black hover:bg-neutral-200 px-4 py-2 text-[12.5px] font-medium transition active:scale-95 shadow-md self-start sm:self-auto"
                  >
                    <span>Carregar Modelo {activeTab === 'adulto-pucrs' ? 'PUCRS' : 'MCCP'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="text-[13px] text-white/70 leading-relaxed">
                  {currentRoteiro.descricao}
                </p>

                <div className="pt-2 border-t border-white/[0.08]">
                  <h4 className="text-[12px] font-medium text-white mb-1.5 flex items-center space-x-1.5">
                    <Check className="h-3.5 w-3.5 text-white/80" />
                    <span>Princípios Semiológicos Fundamentais:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[12px] text-white/60">
                    {currentRoteiro.principios.map((p, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-white/40">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Accordion / Sections of the Roteiro */}
              <div className="space-y-3">
                <h4 className="text-[13.5px] font-medium text-white">
                  Seções Estruturadas do Roteiro ({currentRoteiro.secoes.length} Etapas)
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {currentRoteiro.secoes.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-3xl border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.04] transition space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/[0.06]">
                        <div>
                          <h5 className="text-[14px] font-medium text-white">
                            {sec.titulo}
                          </h5>
                          <p className="text-[11.5px] text-white/50">
                            {sec.subtitulo}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const fullText = `${sec.titulo}\n${sec.subtitulo}\n\nITENS:\n${sec.itens.map(it => `• ${it}`).join('\n')}\n\nDICAS SEMIOLÓGICAS:\n${sec.dicasPraticas.join('\n')}`;
                            handleCopyGuide(sec.titulo, fullText);
                          }}
                          className="self-start sm:self-auto text-[11.5px] rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 px-3 py-1 text-white/80 transition"
                        >
                          Copiar Tópicos
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[11px] font-medium text-white/70 block">
                          Tópicos e Perguntas Recomendadas:
                        </span>
                        <ul className="space-y-1 text-[12px] text-white/60">
                          {sec.itens.map((it, itIdx) => (
                            <li key={itIdx} className="flex items-start space-x-2">
                              <span className="text-white/40 shrink-0">→</span>
                              <span className="leading-snug">{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {sec.dicasPraticas.length > 0 && (
                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-[11.5px] text-white/50 space-y-1">
                          <span className="font-medium text-white/70 block">
                            💡 Observação Semiológica Prática:
                          </span>
                          {sec.dicasPraticas.map((d, dIdx) => (
                            <p key={dIdx} className="italic">
                              "{d}"
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-[12px] text-white/60">
          <span>
            Utilize os roteiros para guiar a entrevista clínica e complementar o formulário.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 hover:bg-white/20 px-5 py-1.5 text-white font-medium transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
