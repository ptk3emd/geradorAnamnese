/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, X, Check } from 'lucide-react';

interface UserNameModalProps {
  isOpen: boolean;
  currentName: string;
  onSave: (name: string) => void;
  onClose?: () => void;
  isRequired?: boolean;
}

export const UserNameModal: React.FC<UserNameModalProps> = ({
  isOpen,
  currentName,
  onSave,
  onClose,
  isRequired = false,
}) => {
  const [name, setName] = useState(currentName || '');

  useEffect(() => {
    setName(currentName || '');
  }, [currentName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onSave(trimmed);
      if (onClose) onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-xl bg-neutral-950 border border-neutral-800 p-5 sm:p-6 shadow-2xl text-white space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-neutral-800 text-white">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-medium text-white tracking-tight">
                Identificação do Usuário
              </h3>
              <p className="text-[12px] text-neutral-400">
                Seu nome será utilizado nas assinaturas e documentos.
              </p>
            </div>
          </div>

          {!isRequired && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              title="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div>
            <label className="block text-[12px] text-neutral-300 mb-1.5 font-medium">
              Qual é o seu nome?
            </label>
            <input
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome completo..."
              className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3.5 py-2.5 text-[13px] text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            {!isRequired && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg text-[12px] text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              >
                Cancelar
              </button>
            )}

            <button
              type="submit"
              disabled={!name.trim()}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 text-[12.5px] font-medium transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-sm"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Salvar Nome</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
