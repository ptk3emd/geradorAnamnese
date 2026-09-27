/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { ClinicalData } from '../types/clinical';
import { BLANK_CLINICAL_DATA } from '../data/defaultPresets';

export const AUTOSAVE_STORAGE_KEY = 'gerador_anamnese_autosave_v1';

export interface AutosavePayload {
  timestamp: number;
  data: ClinicalData;
}

export interface UseClinicalDataAutosaveReturn {
  clinicalData: ClinicalData;
  setClinicalData: React.Dispatch<React.SetStateAction<ClinicalData>>;
  lastSaved: Date | null;
  isSaving: boolean;
  restoredFromAutosave: boolean;
  clearAutosave: () => void;
  dismissRestoredBanner: () => void;
}

/**
 * Checks if a clinical data object has any real user-entered content
 * beyond the default empty structure.
 */
export function hasMeaningfulContent(data: ClinicalData | null | undefined): boolean {
  if (!data) return false;

  const id = data.identificacao;
  if (
    id &&
    (Boolean(id.nomeIniciais?.trim()) ||
      Boolean(id.idade?.trim()) ||
      Boolean(id.leito?.trim()) ||
      Boolean(id.ocupacao?.trim()) ||
      Boolean(id.responsavel?.trim()))
  ) {
    return true;
  }

  if (data.queixaPrincipal?.trim()) return true;
  if (data.hda?.trim()) return true;
  if (data.pacienteRelata?.trim()) return true;
  if (data.hpp?.trim()) return true;
  if (data.historiaFamiliar?.trim()) return true;
  if (data.historiaSocial?.trim()) return true;
  if (data.sinteseClinica?.trim()) return true;
  if (data.hipotesePrincipal?.codigoCid?.trim() || data.hipotesePrincipal?.nomeCid?.trim()) return true;
  if (data.condutaTerapeutica?.trim()) return true;
  if (data.condutaDiagnostica?.trim()) return true;

  // Check vitals if any value entered
  const vitals = data.sinaisVitais;
  if (
    vitals &&
    (Boolean(vitals.pa?.trim()) ||
      Boolean(vitals.fc?.trim()) ||
      Boolean(vitals.fr?.trim()) ||
      Boolean(vitals.tax?.trim()) ||
      Boolean(vitals.satO2?.trim()) ||
      Boolean(vitals.glicemia?.trim()))
  ) {
    return true;
  }

  // Check problems summary
  const problems = data.resumoProblemas;
  if (
    problems &&
    (Boolean(problems.motivoInternacao?.trim()) ||
      Boolean(problems.intercorrencias?.trim()) ||
      Boolean(problems.comorbidadesAlergias?.trim()))
  ) {
    return true;
  }

  return false;
}

/**
 * Custom React hook that automatically persists `clinicalData` state to browser
 * localStorage with debouncing, recovers progress on accidental page refresh,
 * flushes state on `beforeunload`, and provides restore and reset utilities.
 */
export function useClinicalDataAutosave(
  initialFallback: ClinicalData = BLANK_CLINICAL_DATA,
  storageKey: string = AUTOSAVE_STORAGE_KEY
): UseClinicalDataAutosaveReturn {
  // Track if we restored from a previous session on initial load
  const [restoredFromAutosave, setRestoredFromAutosave] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Initialize state from localStorage if valid data exists, else fallback
  const [clinicalData, setClinicalData] = useState<ClinicalData>(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return initialFallback;
      }
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed: AutosavePayload = JSON.parse(raw);
        if (parsed && parsed.data && hasMeaningfulContent(parsed.data)) {
          return parsed.data;
        }
      }
    } catch (err) {
      console.warn('Erro ao ler rascunho de autosave do localStorage:', err);
    }
    return initialFallback;
  });

  // Check on mount if we restored a saved session and set metadata
  useEffect(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed: AutosavePayload = JSON.parse(raw);
        if (parsed && parsed.data && hasMeaningfulContent(parsed.data)) {
          setRestoredFromAutosave(true);
          if (parsed.timestamp) {
            setLastSaved(new Date(parsed.timestamp));
          }
        }
      }
    } catch (err) {
      // Ignore reading error
    }
  }, [storageKey]);

  // Keep ref to current data for beforeunload flushing
  const dataRef = useRef<ClinicalData>(clinicalData);
  dataRef.current = clinicalData;

  const saveTimeoutRef = useRef<number | null>(null);

  const saveToStorage = useCallback(
    (dataToSave: ClinicalData) => {
      try {
        if (typeof window === 'undefined' || !window.localStorage) return;

        // If the data is empty and has no meaningful content, don't keep an empty draft
        if (!hasMeaningfulContent(dataToSave)) {
          window.localStorage.removeItem(storageKey);
          setIsSaving(false);
          return;
        }

        const payload: AutosavePayload = {
          timestamp: Date.now(),
          data: dataToSave,
        };

        window.localStorage.setItem(storageKey, JSON.stringify(payload));
        setLastSaved(new Date(payload.timestamp));
        setIsSaving(false);
      } catch (err) {
        console.warn('Falha ao persistir rascunho no localStorage:', err);
        setIsSaving(false);
      }
    },
    [storageKey]
  );

  // Debounced autosave whenever clinicalData changes
  useEffect(() => {
    setIsSaving(true);

    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = window.setTimeout(() => {
      saveToStorage(clinicalData);
    }, 400);

    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [clinicalData, saveToStorage]);

  // Immediate save on beforeunload so no keystroke is lost on refresh or tab close
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasMeaningfulContent(dataRef.current)) {
        try {
          const payload: AutosavePayload = {
            timestamp: Date.now(),
            data: dataRef.current,
          };
          window.localStorage.setItem(storageKey, JSON.stringify(payload));
        } catch {
          // Ignore beforeunload error
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [storageKey]);

  // Utility to clear saved draft completely (e.g., when user clicks "Limpar" / reset)
  const clearAutosave = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(storageKey);
      }
      setLastSaved(null);
      setRestoredFromAutosave(false);
    } catch {
      // Ignore
    }
  }, [storageKey]);

  const dismissRestoredBanner = useCallback(() => {
    setRestoredFromAutosave(false);
  }, []);

  return {
    clinicalData,
    setClinicalData,
    lastSaved,
    isSaving,
    restoredFromAutosave,
    clearAutosave,
    dismissRestoredBanner,
  };
}
