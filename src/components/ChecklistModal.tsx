/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChecklistVerification } from '../types/clinical';
import { CheckCircle2, X, ShieldAlert, Award, CheckSquare, Square } from 'lucide-react';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  checklist: ChecklistVerification;
  onChange: (updated: ChecklistVerification) => void;
}

const CHECKLIST_ITEMS: Array<{
  key: keyof ChecklistVerification;
  title: string;
  desc: string;
}> = [
  {
    key: 'identificacaoConferida',
    title: 'Identificação, data e hora conferidas',
    desc: 'Nome/iniciais do paciente, idade, leito, data e hora da avaliação rigorosamente checados.',
  },
  {
    key: 'diagnosticoClaro',
    title: 'Diagnóstico / motivo da internação claro',
    desc: 'Hipótese ou queixa principal sem ambiguidade (se sem diagnóstico fechado: "a esclarecer").',
  },
  {
    key: 'intercorrenciasRegistradas',
    title: 'Intercorrências e comorbidades registradas',
    desc: 'Registro explícito de eventos das últimas 24h ou "sem intercorrências nas últimas 24h".',
  },
  {
    key: 'alergiasAntibioticosComDias',
    title: 'Alergias e antibióticos com D_/_ anotados',
    desc: 'Tempo de antimicrobiano e término previsto devidamente explicitados (Ex.: D3/7 ceftriaxona).',
  },
  {
    key: 'sinaisVitaisExameCoerentes',
    title: 'Sinais vitais e exame físico coerentes',
    desc: 'Parâmetros vitais (PA, FC, FR, Tax, SatO2) alinhados à ectoscopia e semiologia descrita.',
  },
  {
    key: 'impressaoClinicaObjetiva',
    title: 'Impressão clínica objetiva',
    desc: 'Síntese com evolução diária, resposta às condutas vigentes e gravidade atual.',
  },
  {
    key: 'examesFinalidadeExplicita',
    title: 'Exames com finalidade explícita',
    desc: 'Cada exame solicitado traz motivo claro (confirmar, estratificar, descartar complicação).',
  },
  {
    key: 'condutasSeparadas',
    title: 'Condutas diagnóstica e terapêutica separadas',
    desc: 'Prescrições farmacológicas e investigações propedêuticas em seções distintas.',
  },
  {
    key: 'pendenciasPlanoRegistrados',
    title: 'Pendências e plano de reavaliação registrados',
    desc: 'Metas para as próximas 24 horas, critérios de alta e retornos agendados.',
  },
  {
    key: 'linguagemProfissionalSemAmbiguidades',
    title: 'Linguagem profissional, sem abreviações ambíguas',
    desc: 'Terminologia médica ética, evitando siglas não padronizadas pelo serviço hospitalar.',
  },
];

export const ChecklistModal: React.FC<ChecklistModalProps> = ({
  isOpen,
  onClose,
  checklist,
  onChange,
}) => {
  if (!isOpen) return null;

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const isAllDone = completedCount === 10;

  const toggleItem = (key: keyof ChecklistVerification) => {
    onChange({
      ...checklist,
      [key]: !checklist[key],
    });
  };

  const handleSelectAll = () => {
    const allChecked = Object.keys(checklist).reduce((acc, curr) => {
      acc[curr as keyof ChecklistVerification] = true;
      return acc;
    }, {} as ChecklistVerification);
    onChange(allChecked);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-[22px] border border-[#e0e0e0] bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-black pb-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center border border-black bg-black text-white">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-black uppercase tracking-tight font-sans">
                Checklist de Segurança Assistencial (10 Itens)
              </h2>
              <p className="text-[12px] text-neutral-600 font-mono">
                Auditoria clínica de conformidade antes da assinatura médica
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-black hover:bg-neutral-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="my-4 font-mono text-[11px]">
          <div className="flex items-center justify-between text-black mb-1 font-bold uppercase">
            <span>Status da Verificação</span>
            <span>
              {completedCount} de 10 checados ({Math.round((completedCount / 10) * 100)}%)
            </span>
          </div>
          <div className="h-1.5 w-full bg-neutral-200">
            <div
              className="h-full bg-black transition-all duration-200"
              style={{ width: `${(completedCount / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-1 font-mono">
          {CHECKLIST_ITEMS.map((item) => {
            const checked = checklist[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleItem(item.key)}
                className={`flex cursor-pointer items-start space-x-3 border p-3 transition ${
                  checked
                    ? 'border-black bg-neutral-100'
                    : 'border-neutral-200 bg-white hover:border-black'
                }`}
              >
                <div className="mt-0.5 text-black">
                  {checked ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4 text-neutral-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`text-[12.5px] font-semibold ${checked ? 'text-black line-through' : 'text-black'}`}>
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-black pt-4 font-mono text-[11px]">
          <button
            type="button"
            onClick={handleSelectAll}
            className="uppercase text-black underline hover:text-neutral-600"
          >
            Marcar Todos como Verificados
          </button>

          <button
            type="button"
            onClick={onClose}
            className="border border-black bg-black px-5 py-2 uppercase font-semibold text-white transition hover:bg-neutral-800"
          >
            {isAllDone ? 'Concluído & Apto para Assinatura' : 'Salvar & Fechar'}
          </button>
        </div>
      </div>
    </div>
  );
};
