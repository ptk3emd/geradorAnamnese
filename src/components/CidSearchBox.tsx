/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { LocalCid10Item, searchLocalCid10, LOCAL_CID10_LIST } from '../data/cid10LocalList';
import { Search, Check, Plus, ArrowDownToLine, X, Sparkles, BookOpen } from 'lucide-react';

interface CidSearchBoxProps {
  currentCidCode: string;
  currentCidName: string;
  onSelectPrimaryCid: (item: LocalCid10Item) => void;
  onAddDifferentialCid?: (item: LocalCid10Item) => void;
}

const CATEGORIES = [
  'Todos',
  'Cardiologia',
  'Pneumologia',
  'Infectologia',
  'Gastroenterologia & Cirurgia',
  'Neurologia',
  'Endocrinologia',
  'Nefrologia & Urologia',
] as const;

export const CidSearchBox: React.FC<CidSearchBoxProps> = ({
  currentCidCode,
  currentCidName,
  onSelectPrimaryCid,
  onAddDifferentialCid,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [justInsertedCode, setJustInsertedCode] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return searchLocalCid10(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  const handleSelectPrimary = (item: LocalCid10Item) => {
    onSelectPrimaryCid(item);
    setJustInsertedCode(item.code);
    setTimeout(() => {
      setJustInsertedCode((prev) => (prev === item.code ? null : prev));
    }, 2500);
  };

  const handleAddDifferential = (item: LocalCid10Item) => {
    if (onAddDifferentialCid) {
      onAddDifferentialCid(item);
      setJustInsertedCode(item.code);
      setTimeout(() => {
        setJustInsertedCode((prev) => (prev === item.code ? null : prev));
      }, 2500);
    }
  };

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.12] p-4 sm:p-5 space-y-4 shadow-sm backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.08] border border-white/20 text-white">
            <BookOpen className="h-3.5 w-3.5" />
          </div>
          <div>
            <h4 className="text-[13.5px] font-medium text-white tracking-tight">
              Consulta Local de Códigos CID-10
            </h4>
            <p className="text-[11.5px] text-white/50">
              Pesquise pelo código ou nome da patologia para preenchimento direto no diagnóstico
            </p>
          </div>
        </div>

        <span className="text-[11px] text-white/40 self-start sm:self-auto font-mono">
          {LOCAL_CID10_LIST.length} códigos cadastrados
        </span>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-white/40" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o código (ex: I21, J18) ou doença (ex: infarto, pneumonia, sepse, avc)..."
          className="w-full rounded-xl bg-white/[0.06] border border-white/[0.16] focus:border-white/50 focus:bg-white/[0.09] text-white placeholder:text-white/30 pl-10 pr-9 py-2.5 text-[13px] outline-none transition"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 text-white/40 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-3 py-1 font-normal transition shrink-0 ${
              selectedCategory === cat
                ? 'bg-white text-black font-medium shadow-sm'
                : 'bg-white/[0.05] text-white/60 hover:text-white border border-white/[0.08]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {filteredItems.length === 0 ? (
          <div className="p-4 text-center rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <p className="text-[12.5px] text-white/50">
              Nenhum código CID-10 encontrado para &quot;{searchTerm}&quot;.
            </p>
            <p className="text-[11px] text-white/30 mt-1">
              Tente buscar por termos sinônimos ou selecione &quot;Todos&quot; nas categorias.
            </p>
          </div>
        ) : (
          filteredItems.slice(0, 8).map((item) => {
            const isCurrentlySelected =
              currentCidCode.trim().toUpperCase() === item.code.trim().toUpperCase();
            const wasJustInserted = justInsertedCode === item.code;

            return (
              <div
                key={item.code}
                className={`p-3 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrentlySelected
                    ? 'bg-white/[0.09] border-white/40'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.08]'
                }`}
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="font-mono text-[12px] font-semibold tracking-wide px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-white">
                      {item.code}
                    </span>
                    <span className="text-[13px] font-medium text-white tracking-tight truncate">
                      {item.description}
                    </span>
                    {isCurrentlySelected && (
                      <span className="inline-flex items-center space-x-1 text-[10.5px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <Check className="h-3 w-3" />
                        <span>Selecionado</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-white/40">
                    <span>{item.category}</span>
                    {item.suggestedDifferentials && (
                      <>
                        <span>•</span>
                        <span>{item.suggestedDifferentials.length} diferenciais sugeridos</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleSelectPrimary(item)}
                    title="Inserir como Hipótese Diagnóstica Principal"
                    className={`inline-flex items-center space-x-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-medium transition active:scale-95 shadow-sm ${
                      wasJustInserted
                        ? 'bg-emerald-500 text-black'
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    {wasJustInserted ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Inserido!</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownToLine className="h-3.5 w-3.5" />
                        <span>Inserir no Diagnóstico</span>
                      </>
                    )}
                  </button>

                  {onAddDifferentialCid && (
                    <button
                      type="button"
                      onClick={() => handleAddDifferential(item)}
                      title="Inserir na lista de diagnósticos diferenciais"
                      className="inline-flex items-center space-x-1 rounded-full px-2.5 py-1.5 text-[11px] text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition active:scale-95"
                    >
                      <Plus className="h-3 w-3" />
                      <span className="hidden sm:inline">Como Diferencial</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {filteredItems.length > 8 && (
        <p className="text-[11px] text-center text-white/40 pt-1">
          Exibindo 8 de {filteredItems.length} resultados correspondentes. Refine sua busca para visualizar mais códigos.
        </p>
      )}
    </div>
  );
};
