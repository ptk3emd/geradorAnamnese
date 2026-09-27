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

  const recentTemplates = recentTemplateIds
    .map((id) => ALL_READY_CASES.find((c) => c.id === id))
    .filter((c): c is ReadyCaseTemplate => Boolean(c));

  return (
    <div className="no-print w-full space-y-2">
      {/* Search & Toggle Bar - Modern Clean 10px Radius */}
      <div className="relative mx-auto max-w-4xl">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 shadow-sm cursor-pointer transition"
        >
          <div className="flex items-center space-x-2.5 flex-1 min-w-0">
            <Search className="h-4 w-4 text-neutral-400 group-hover:text-white transition shrink-0" />
            <span className="text-[13px] sm:text-[13.5px] text-neutral-300 font-normal truncate">
              {isOpen
                ? 'Recolher catálogo de casos clínicos'
                : 'Selecione um caso pré-definido ou modelo por doença...'}
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0 pl-2">
            <span className="rounded-md bg-neutral-800 border border-neutral-700 px-2 py-0.5 text-[11px] font-medium text-neutral-300">
              {ALL_READY_CASES.length} Casos
            </span>
            <div className="h-6 w-6 rounded-md flex items-center justify-center bg-neutral-800/80 text-neutral-300 group-hover:bg-neutral-700 transition">
              {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </div>
          </div>
        </div>

        {/* Collapsed Mode Quick Access Bar for Recent Templates */}
        {!isOpen && recentTemplates.length > 0 && (
          <div className="mt-2 flex items-center space-x-2 overflow-x-auto px-1 py-1 text-[11px] text-neutral-400">
            <div className="flex items-center space-x-1 shrink-0 text-neutral-500 font-medium">
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
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md border text-[11px] transition shrink-0 active:scale-95 ${
                    selectedCaseId === template.id
                      ? 'bg-white text-neutral-950 border-white font-medium shadow-sm'
                      : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px] text-neutral-500">
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
              className="text-neutral-500 hover:text-neutral-300 text-[10px] underline shrink-0 pl-1"
            >
              limpar
            </button>
          </div>
        )}
      </div>

      {/* Expanded Catalog Drawer */}
      {isOpen && (
        <div className="mt-2 mx-auto max-w-5xl rounded-xl bg-neutral-950 border border-neutral-800 p-4 sm:p-5 shadow-xl space-y-3.5 animate-in fade-in duration-150">
          {/* Top Controls: Search Input & Category Selectors */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pb-3 border-b border-neutral-800">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
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
                className="w-full rounded-lg bg-neutral-900 border border-neutral-800 pl-9 pr-8 py-2 text-[12.5px] text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2 text-neutral-500 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center space-x-1.5 overflow-x-auto">
              {(['Todos', 'Feminina', 'Masculina', 'Mista'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-md px-3 py-1.5 text-[11.5px] font-medium transition ${
                    categoryFilter === cat
                      ? 'bg-neutral-100 text-neutral-950 shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
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
                className="rounded-md px-3 py-1.5 text-[11.5px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 flex items-center space-x-1 ml-auto sm:ml-2 transition"
                title="Limpar formulário e começar vazio"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Em Branco</span>
              </button>
            </div>
          </div>

          {/* Recent Searches & Templates Bar inside the drawer */}
          {(recentTemplates.length > 0 || recentQueries.length > 0) && (
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex flex-wrap items-center gap-1.5">
                <div className="flex items-center space-x-1 text-neutral-400 shrink-0 font-medium">
                  <Clock className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Recentes:</span>
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
                    className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md border text-[11px] transition active:scale-95 ${
                      selectedCaseId === template.id
                        ? 'bg-white text-neutral-950 border-white font-medium shadow-sm'
                        : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-[9.5px] text-neutral-500">
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
                    className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-[10.5px] text-neutral-400 hover:text-white"
                  >
                    <Search className="h-2.5 w-2.5 opacity-60" />
                    <span>&ldquo;{query}&rdquo;</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={clearRecents}
                className="flex items-center space-x-1 text-[10.5px] text-neutral-500 hover:text-neutral-300 transition ml-auto"
                title="Limpar histórico recente"
              >
                <Trash2 className="h-3 w-3" />
                <span>Limpar</span>
              </button>
            </div>
          )}

          {/* Cards Grid with Clean Corners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredCases.length === 0 ? (
              <div className="col-span-full py-8 text-center text-neutral-500 text-[13px]">
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
                    className={`group text-left p-3.5 rounded-lg border transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-neutral-800/80 border-neutral-500 shadow-sm'
                        : 'bg-neutral-900/60 hover:bg-neutral-800/50 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="text-neutral-400">
                          {item.categoria}
                        </span>
                        <span className="rounded-md bg-neutral-800 border border-neutral-700 px-2 py-0.5 font-mono text-[10.5px] text-neutral-200">
                          {item.data.hipotesePrincipal.codigoCid}
                        </span>
                      </div>

                      <h4 className="text-[13px] font-medium text-white group-hover:text-white transition">
                        {item.titulo}
                      </h4>
                      <p className="text-[11.5px] text-neutral-400 line-clamp-2 mt-1 leading-snug">
                        {item.subtitulo}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                      <span>{item.especialidade}</span>
                      <span className="flex items-center space-x-1 text-neutral-300 group-hover:text-white font-medium">
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
