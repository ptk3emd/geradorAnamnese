/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ReadyCaseTemplate, ALL_READY_CASES } from '../data/readyCaseTemplatesAll';
import { X, Search, ChevronRight, Stethoscope } from 'lucide-react';

interface ReadyCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCase: (template: ReadyCaseTemplate) => void;
}

export const ReadyCasesModal: React.FC<ReadyCasesModalProps> = ({
  isOpen,
  onClose,
  onSelectCase,
}) => {
  const [filterCategory, setFilterCategory] = useState<'Todos' | 'Feminina' | 'Masculina' | 'Mista'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredCases = ALL_READY_CASES.filter((c) => {
    const matchesCategory = filterCategory === 'Todos' || c.categoria === filterCategory;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      c.titulo.toLowerCase().includes(query) ||
      c.subtitulo.toLowerCase().includes(query) ||
      c.especialidade.toLowerCase().includes(query) ||
      c.data.hipotesePrincipal.nomeCid.toLowerCase().includes(query) ||
      c.data.hipotesePrincipal.codigoCid.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col border border-black bg-white shadow-2xl overflow-hidden font-mono">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black px-6 py-4 bg-black text-white">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center border border-white bg-white text-black">
              <Stethoscope className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-white uppercase tracking-tight font-sans">
                Acervo de {ALL_READY_CASES.length} Casos Clínicos Estruturados
              </h2>
              <p className="text-[11px] text-neutral-400">
                Internação Feminina, Masculina e Condições de Emergência com CID-10 e Conduta
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-300 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3 bg-neutral-100 border-b border-neutral-300">
          {/* Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto text-[11px]">
            {(['Todos', 'Feminina', 'Masculina', 'Mista'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 uppercase tracking-wider border transition ${
                  filterCategory === cat
                    ? 'border-black bg-black text-white font-bold'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:border-black'
                }`}
              >
                {cat === 'Todos' ? `Todos (${ALL_READY_CASES.length})` : cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por doença ou CID..."
              className="w-full border border-black bg-white pl-8 pr-3 py-1.5 text-[11px] text-black outline-none focus:ring-1 focus:ring-black placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* List of cases */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2.5 bg-neutral-50">
          {filteredCases.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-[12px]">
              Nenhum caso clínico encontrado para os filtros selecionados.
            </div>
          ) : (
            filteredCases.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectCase(item);
                  onClose();
                }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-neutral-300 bg-white p-4 hover:border-black transition cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-neutral-400 text-[11px] font-bold text-black group-hover:bg-black group-hover:text-white transition">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2 text-[10px]">
                      <span className="border border-neutral-300 px-1.5 py-0.5 uppercase text-neutral-600">
                        {item.categoria}
                      </span>
                      <span className="text-neutral-500">
                        {item.especialidade}
                      </span>
                      <span className="border border-black px-1.5 py-0.5 font-bold text-black">
                        {item.data.hipotesePrincipal.codigoCid}
                      </span>
                    </div>

                    <h3 className="text-[13px] font-bold text-black group-hover:underline transition mt-1 font-sans">
                      {item.titulo}
                    </h3>
                    <p className="text-[11px] text-neutral-600 mt-0.5 line-clamp-1 leading-snug">
                      {item.subtitulo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <span className="flex items-center space-x-1 border border-neutral-300 group-hover:border-black group-hover:bg-black group-hover:text-white px-3 py-1 text-[11px] font-semibold text-black transition uppercase">
                    <span>Carregar</span>
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
