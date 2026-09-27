/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ReadyCaseTemplate, ALL_READY_CASES } from '../data/readyCaseTemplatesAll';
import {
  ChevronDown,
  ChevronUp,
  Search,
  RotateCcw,
  ArrowRight,
  Clock,
  History,
  X,
  Trash2,
} from 'lucide-react';

const RECENT_TEMPLATES_STORAGE_KEY = 'gerador_anamnese_recent_templates_v1';
const RECENT_QUERIES_STORAGE_KEY = 'gerador_anamnese_recent_queries_v1';

interface DiseasesToggleBarProps {
  onSelectCase: (template: ReadyCaseTemplate) => void;
  onResetBlank: () => void;
  selectedCaseId?: string | null;
}

export const DiseasesToggleBar: React.FC<DiseasesToggleBarProps> = ({
  onSelectCase,
  onResetBlank,
  selectedCaseId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'Todos' | 'Feminina' | 'Masculina' | 'Mista'>('Todos');
  const [recentTemplateIds, setRecentTemplateIds] = useState<string[]>([]);
  const [recentQueries, setRecentQueries] = useState<string[]>([]);

  // Load recent templates and searches on mount
  useEffect(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;

      const rawTemplates = window.localStorage.getItem(RECENT_TEMPLATES_STORAGE_KEY);
      if (rawTemplates) {
        const parsed = JSON.parse(rawTemplates);
        if (Array.isArray(parsed)) {
          setRecentTemplateIds(parsed);
        }
      }

      const rawQueries = window.localStorage.getItem(RECENT_QUERIES_STORAGE_KEY);
      if (rawQueries) {
        const parsed = JSON.parse(rawQueries);
        if (Array.isArray(parsed)) {
          setRecentQueries(parsed);
        }
      }
    } catch {
      // Ignore reading error
    }
  }, []);

  const addRecentTemplate = useCallback((templateId: string) => {
    setRecentTemplateIds((prev) => {
      const updated = [templateId, ...prev.filter((id) => id !== templateId)].slice(0, 6);
      try {
        window.localStorage.setItem(RECENT_TEMPLATES_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  }, []);

  const addRecentQuery = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) return;
    setRecentQueries((prev) => {
      const updated = [trimmed, ...prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
      try {
        window.localStorage.setItem(RECENT_QUERIES_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  }, []);

  const clearRecents = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRecentTemplateIds([]);
    setRecentQueries([]);
    try {
      window.localStorage.removeItem(RECENT_TEMPLATES_STORAGE_KEY);
      window.localStorage.removeItem(RECENT_QUERIES_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const handleSelectCaseInternal = (template: ReadyCaseTemplate) => {
    addRecentTemplate(template.id);
    if (searchTerm.trim()) {
      addRecentQuery(searchTerm.trim());
    }
    onSelectCase(template);
  };

  const handleRecentTemplateClick = (template: ReadyCaseTemplate, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleSelectCaseInternal(template);
    setIsOpen(false);
  };

  const handleRecentQueryClick = (q: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchTerm(q);
    if (!isOpen) setIsOpen(true);
  };

  const filteredCases = ALL_READY_CASES.filter((c) => {
    const matchesCat = categoryFilter === 'Todos' || c.categoria === categoryFilter;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      c.titulo.toLowerCase().includes(q) ||
      c.subtitulo.toLowerCase().includes(q) ||
      c.especialidade.toLowerCase().includes(q) ||
      c.data.hipotesePrincipal.codigoCid.toLowerCase().includes(q) ||
      c.data.hipotesePrincipal.nomeCid.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  // Map IDs to actual templates
  const recentTemplates = recentTemplateIds
    .map((id) => ALL_READY_CASES.find((c) => c.id === id))
    .filter((c): c is ReadyCaseTemplate => Boolean(c));

  return (
    <div className="no-print w-full space-y-2.5">
      {/* Search & Toggle Capsule - Exact visual identity of the reference photo */}
      <div className="relative mx-auto max-w-3xl">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-between px-5 py-3.5 rounded-full bg-white/[0.07] hover:bg-white/[0.1] border border-white/[0.18] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-200"
        >
          <div className="flex items-center space-x-3.5 flex-1 min-w-0">
            <Search className="h-4 w-4 text-white/70 group-hover:text-white transition shrink-0" />
            <span className="text-[14px] text-white/90 font-normal truncate">
              {isOpen
                ? 'Clique para recolher a lista de doenças'
                : 'Selecione uma doença pré-definida para preencher o formulário...'}
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0 pl-3">
            <span className="rounded-full bg-white/[0.12] border border-white/20 px-3 py-0.5 text-[11px] font-medium text-white/90">
              {ALL_READY_CASES.length} Doenças
            </span>
            <div className="h-7 w-7 rounded-full flex items-center justify-center bg-white/[0.08] text-white/80 group-hover:bg-white/20 transition">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </div>
        </div>

        {/* Collapsed Mode Quick Access Bar for Recent Templates */}
        {!isOpen && recentTemplates.length > 0 && (
          <div className="mt-2.5 flex items-center space-x-2 overflow-x-auto px-2 py-1 text-[11.5px] text-white/60">
            <div className="flex items-center space-x-1 shrink-0 text-white/50">
              <History className="h-3 w-3" />
              <span>Recentes:</span>
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5">
              {recentTemplates.slice(0, 4).map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={(e) => handleRecentTemplateClick(template, e)}
                  title={`Carregar ${template.titulo} (${template.data.hipotesePrincipal.codigoCid})`}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-[11px] font-normal transition shrink-0 active:scale-95 ${
                    selectedCaseId === template.id
                      ? 'bg-white text-black border-white font-medium shadow-sm'
                      : 'bg-white/[0.05] hover:bg-white/[0.12] border-white/[0.12] text-white/80 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px] text-white/50">
                    {template.data.hipotesePrincipal.codigoCid}
                  </span>
                  <span className="truncate max-w-[130px]">{template.titulo}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={clearRecents}
              title="Limpar histórico recente"
              className="text-white/40 hover:text-white/80 text-[10.5px] underline shrink-0 pl-1"
            >
              limpar
            </button>
          </div>
        )}
      </div>

      {/* Expanded Rounded Drawer */}
      {isOpen && (
        <div className="mt-4 mx-auto max-w-5xl rounded-3xl bg-neutral-900/60 border border-white/[0.14] backdrop-blur-2xl p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
          {/* Top Controls: Search Input & Category Pills */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            {/* Search Input in rounded capsule */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-3 h-4 w-4 text-white/50" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchTerm.trim()) {
                    addRecentQuery(searchTerm.trim());
                  }
                }}
                placeholder="Buscar por sintoma, doença ou CID-10..."
                className="w-full rounded-full bg-white/[0.06] border border-white/[0.15] pl-10 pr-4 py-2 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-2.5 text-white/40 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
              {(['Todos', 'Feminina', 'Masculina', 'Mista'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-full px-3.5 py-1 text-[12px] font-normal transition ${
                    categoryFilter === cat
                      ? 'bg-white text-black font-medium shadow-sm'
                      : 'bg-white/[0.06] text-white/70 hover:text-white border border-white/[0.08]'
                  }`}
                >
                  {cat === 'Todos' ? `Todos (${ALL_READY_CASES.length})` : cat}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  onResetBlank();
                  setIsOpen(false);
                }}
                className="rounded-full px-3.5 py-1 text-[12px] bg-white/[0.06] hover:bg-white/20 text-white/80 border border-white/[0.15] flex items-center space-x-1 ml-2 transition"
                title="Limpar formulário e começar vazio"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Em Branco</span>
              </button>
            </div>
          </div>

          {/* Recent Searches & Templates Bar inside the drawer */}
          {(recentTemplates.length > 0 || recentQueries.length > 0) && (
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-wrap items-center justify-between gap-2.5 text-[11.5px]">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1 text-white/50 shrink-0">
                  <Clock className="h-3.5 w-3.5 text-white/70" />
                  <span className="font-medium text-white/80">Recentes:</span>
                </div>

                {/* Recent Templates Badges */}
                {recentTemplates.map((template) => (
                  <button
                    key={`drawer-rec-${template.id}`}
                    type="button"
                    onClick={() => {
                      handleSelectCaseInternal(template);
                      setIsOpen(false);
                    }}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-[11px] transition active:scale-95 ${
                      selectedCaseId === template.id
                        ? 'bg-white text-black border-white font-medium shadow-sm'
                        : 'bg-white/[0.06] hover:bg-white/[0.12] border-white/[0.12] text-white/90 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-[9.5px] text-white/60">
                      {template.data.hipotesePrincipal.codigoCid}
                    </span>
                    <span>{template.titulo}</span>
                  </button>
                ))}

                {/* Recent Search Queries */}
                {recentQueries.map((query) => (
                  <button
                    key={`query-${query}`}
                    type="button"
                    onClick={(e) => handleRecentQueryClick(query, e)}
                    className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-[10.5px] text-white/60 hover:text-white"
                  >
                    <Search className="h-2.5 w-2.5 opacity-60" />
                    <span>&ldquo;{query}&rdquo;</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={clearRecents}
                className="flex items-center space-x-1 text-[11px] text-white/40 hover:text-white/80 transition ml-auto"
                title="Limpar histórico recente"
              >
                <Trash2 className="h-3 w-3" />
                <span>Limpar Recentes</span>
              </button>
            </div>
          )}

          {/* Cards Grid with Rounded Corners */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
            {filteredCases.length === 0 ? (
              <div className="col-span-full py-10 text-center text-white/50 text-[13px]">
                Nenhum caso clínico encontrado para a busca informada.
              </div>
            ) : (
              filteredCases.map((item) => {
                const isSelected = selectedCaseId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      handleSelectCaseInternal(item);
                      setIsOpen(false);
                    }}
                    className={`group text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white/[0.14] border-white/40 shadow-lg'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.1] hover:border-white/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white/70">
                          {item.categoria}
                        </span>
                        <span className="rounded-full bg-white/20 border border-white/20 px-2 py-0.5 font-medium text-white">
                          {item.data.hipotesePrincipal.codigoCid}
                        </span>
                      </div>

                      <h4 className="text-[13.5px] font-medium text-white group-hover:text-white transition">
                        {item.titulo}
                      </h4>
                      <p className="text-[12px] text-white/60 line-clamp-2 mt-1 leading-snug">
                        {item.subtitulo}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-white/50">
                      <span>{item.especialidade}</span>
                      <span className="flex items-center space-x-1 text-white/80 group-hover:text-white font-medium">
                        <span>Preencher</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition" />
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
