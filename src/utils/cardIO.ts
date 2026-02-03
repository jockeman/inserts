import type { InsertInputs, Skill } from '../types/Insert';
import { normalizeInsertInputs } from './inputNormalizer';

// Type declarations for File System Access API
interface FilePickerAcceptType {
  description?: string;
  accept: Record<string, string[]>;
}

interface SaveFilePickerOptions {
  suggestedName?: string;
  types?: FilePickerAcceptType[];
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: BufferSource | Blob | string): Promise<void>;
  close(): Promise<void>;
}

interface FileSystemFileHandle {
  createWritable(): Promise<FileSystemWritableFileStream>;
}

declare global {
  interface Window {
    showSaveFilePicker(options?: SaveFilePickerOptions): Promise<FileSystemFileHandle>;
  }
}

/**
 * Filter out empty/default values from a card to create a cleaner export
 */
function filterEmptyFields(card: InsertInputs): Partial<InsertInputs> {
  const filtered: any = { ...card };

  // Always keep these essential fields
  const essentialFields = ['id', 'name', 'cardType'];

  // Remove empty strings
  for (const key in filtered) {
    if (!essentialFields.includes(key) && filtered[key] === '') {
      delete filtered[key];
    }
  }

  // Remove empty arrays
  if (Array.isArray(filtered.damageImmunities) && filtered.damageImmunities.length === 0) {
    delete filtered.damageImmunities;
  }
  if (Array.isArray(filtered.damageResistances) && filtered.damageResistances.length === 0) {
    delete filtered.damageResistances;
  }
  if (Array.isArray(filtered.damageVulnerabilities) && filtered.damageVulnerabilities.length === 0) {
    delete filtered.damageVulnerabilities;
  }
  if (Array.isArray(filtered.conditionImmunities) && filtered.conditionImmunities.length === 0) {
    delete filtered.conditionImmunities;
  }

  // Remove null saving throws
  const savingThrows = [
    'savingThrowStr',
    'savingThrowDex',
    'savingThrowCon',
    'savingThrowInt',
    'savingThrowWis',
    'savingThrowCha',
  ];
  for (const st of savingThrows) {
    if (filtered[st] === null) {
      delete filtered[st];
    }
  }

  // Remove default ability scores (10)
  const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  let allDefaultAbilities = true;
  for (const ability of abilities) {
    if (filtered[ability] !== 10) {
      allDefaultAbilities = false;
      break;
    }
  }
  if (allDefaultAbilities) {
    for (const ability of abilities) {
      delete filtered[ability];
    }
  }

  // Filter skills to only include non-default skills
  if (filtered.skills) {
    const nonDefaultSkills: any = {};
    let hasNonDefaultSkills = false;

    for (const [skillName, skill] of Object.entries(filtered.skills as Record<string, Skill>)) {
      if (skill.proficiency !== 'none' || skill.modifier !== 0) {
        nonDefaultSkills[skillName] = skill;
        hasNonDefaultSkills = true;
      }
    }

    if (hasNonDefaultSkills) {
      filtered.skills = nonDefaultSkills;
    } else {
      delete filtered.skills;
    }
  }

  // Remove default values based on card type
  if (filtered.cardType === 'player') {
    // Remove monster-specific fields
    delete filtered.monsterSize;
    delete filtered.monsterType;
    delete filtered.monsterTypeTag;
    delete filtered.cr;
    delete filtered.hpFormula;

    // Remove default player values
    if (filtered.level === 1) delete filtered.level;
    if (filtered.proficiencyBonus === 2) delete filtered.proficiencyBonus;
    if (filtered.ac === 0) delete filtered.ac;
    if (filtered.hp === 0) delete filtered.hp;
  } else {
    // Remove player-specific fields for monsters
    delete filtered.level;
    delete filtered.race;
    delete filtered.class;
    delete filtered.proficiencyBonusOverride;
    delete filtered.maxHPOverride;
  }

  // Remove selected flag if true (default for most uses)
  if (filtered.selected === true) {
    delete filtered.selected;
  }

  // Remove size if it's the default 'small'
  if (filtered.size === 'small') {
    delete filtered.size;
  }

  return filtered;
}

/**
 * Export cards to JSON and trigger download
 * Uses modern File System Access API with fallback to anchor download
 */
export async function exportCardsToJSON(cards: InsertInputs[], filename = 'inserts.json'): Promise<void> {
  const filteredCards = cards.map(filterEmptyFields);
  const json = JSON.stringify(filteredCards, null, 2);
  const blob = new Blob([json], { type: 'application/json' });

  // Try modern File System Access API first (Chromium browsers)
  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (err) {
      // User cancelled or error occurred, fall through to legacy method
      if (err instanceof Error && err.name === 'AbortError') {
        return; // User cancelled, don't fallback
      }
    }
  }

  // Fallback to legacy anchor download method
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export a single card to JSON and trigger download
 */
export async function exportCardToJSON(card: InsertInputs, filename?: string): Promise<void> {
  const defaultFilename = `${card.name.toLowerCase().replace(/\s+/g, '-') || 'card'}.json`;
  await exportCardsToJSON([card], filename || defaultFilename);
}

/**
 * Import cards from JSON file
 */
function importCardsFromJSON(file: File): Promise<InsertInputs[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        // Validate that it's an array
        if (!Array.isArray(parsed)) {
          // If it's a single card object, wrap it in an array and normalize
          if (typeof parsed === 'object' && parsed !== null && 'cardType' in parsed) {
            const normalized = normalizeInsertInputs(parsed);
            resolve([normalized]);
            return;
          }
          reject(new Error('Invalid JSON format: Expected an array or single card object'));
          return;
        }

        // Validate each card has required fields and normalize
        const validCards = parsed
          .filter((card: any) => {
            return typeof card === 'object' && card !== null && 'cardType' in card;
          })
          .map((card: any) => normalizeInsertInputs(card));

        if (validCards.length === 0) {
          reject(new Error('No valid cards found in JSON file'));
          return;
        }

        resolve(validCards as InsertInputs[]);
      } catch (error) {
        reject(new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}

/**
 * Trigger file picker and import cards
 */
export function triggerImportCards(): Promise<InsertInputs[]> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      try {
        const cards = await importCardsFromJSON(file);
        resolve(cards);
      } catch (error) {
        reject(error);
      }
    };

    input.oncancel = () => {
      reject(new Error('Import cancelled'));
    };

    input.click();
  });
}
