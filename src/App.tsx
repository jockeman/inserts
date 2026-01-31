import { Button, Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CardEditor } from './components/CardEditor';
import { PrintArea } from './components/PrintArea';
import { SkillVisibilitySettings } from './components/SkillVisibilitySettings';
import { useUserPreferences } from './hooks/useUserPreferences';
import type { InsertInputs } from './types/Insert';
import { generateId } from './utils/idGenerator';
import { calculateMonsterValues } from './utils/monsterCalculations';
import { calculateAdvancedPlayerValues } from './utils/playerCalculations';
import { createEmptySkills } from './utils/skillHelpers';
import './App.css';

const emptyInsert: InsertInputs = {
  id: '', // Will be generated when added
  name: '',
  image: '',
  cardType: 'player',
  size: 'small',
  race: 'Human',
  class: 'Fighter',
  ac: 0,
  hp: 0,
  darkvision: 0,
  level: 1,
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
  proficiencyBonus: 2,
  proficiencyBonusOverride: true,
  maxHPOverride: true,
  darkvisionOverride: true,
  skills: createEmptySkills(),
  monsterSize: 'Medium',
  monsterType: 'Humanoid',
  monsterTypeTag: '',
  cr: '',
  speed: '',
  acType: '',
  hpFormula: '',
  savingThrowStr: null,
  savingThrowDex: null,
  savingThrowCon: null,
  savingThrowInt: null,
  savingThrowWis: null,
  savingThrowCha: null,
  damageImmunities: [],
  damageResistances: [],
  damageVulnerabilities: [],
  conditionImmunities: [],
  senses: '',
  languages: '',
  traits: '',
  actions: '',
  bonusActions: '',
  selected: true,
};

const STORAGE_KEY = 'rpg-inserts';

function App() {
  const [preferences, updatePreferences] = useUserPreferences();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [insertInputs, setInsertInputs] = useState<InsertInputs[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((insert: any) => {
          // Migrate skills if needed
          let skills = insert.skills;
          if (!skills || typeof skills !== 'object') {
            // Old format - convert flat fields to skills object
            skills = {};
            const skillNames = [
              'acrobatics',
              'animalHandling',
              'arcana',
              'athletics',
              'deception',
              'history',
              'insight',
              'intimidation',
              'investigation',
              'medicine',
              'nature',
              'perception',
              'performance',
              'persuasion',
              'religion',
              'sleightOfHand',
              'stealth',
              'survival',
            ];

            for (const skillName of skillNames) {
              const profField = `prof${skillName.charAt(0).toUpperCase() + skillName.slice(1)}`;
              const modField = `mod${skillName.charAt(0).toUpperCase() + skillName.slice(1)}`;
              skills[skillName] = {
                proficiency: insert[profField] || 'none',
                modifier: insert[modField] || 0,
              };
            }
          }

          return {
            ...insert,
            skills,
            id: insert.id || generateId(),
            selected: insert.selected !== undefined ? insert.selected : true,
            cardType: (insert.cardType as string) === 'player-advanced' ? 'player' : insert.cardType,
          };
        });
      } catch (_e) {
        return [];
      }
    }
    return [];
  });

  // Calculate complete Insert values on-demand (not stored)
  const inserts = insertInputs.map((input) => {
    if (input.cardType === 'player') {
      return calculateAdvancedPlayerValues(input);
    }
    // For monsters, use calculator to handle both pre-calculated and auto-calc modes
    return calculateMonsterValues(input);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(insertInputs));
  }, [insertInputs]);

  function addEmptyCard() {
    setInsertInputs((arr) => [...arr, { ...emptyInsert, id: generateId() }]);
  }

  function updateInsert(id: string, field: keyof InsertInputs, value: string | string[] | number | null | any) {
    setInsertInputs((arr) =>
      arr.map((input) => {
        if (input.id !== id) return input;

        // Handle array fields - convert comma-separated strings to arrays, or keep as-is if already array
        let processedValue: string | string[] | number | null = value;
        if (
          field === 'damageImmunities' ||
          field === 'damageResistances' ||
          field === 'damageVulnerabilities' ||
          field === 'conditionImmunities'
        ) {
          // If already an array (from parser), keep it
          if (Array.isArray(value)) {
            processedValue = value;
          } else if (typeof value === 'string') {
            // If string (from form), split it
            processedValue = value
              .split(',')
              .map((item) => item.trim())
              .filter((item) => item.length > 0);
          }
        }
        // Handle saving throw fields - convert to number or null
        else if (field.startsWith('savingThrow')) {
          if (typeof value === 'number' || value === null) {
            processedValue = value;
          } else {
            processedValue = value === '' ? null : Number.parseInt(value, 10);
          }
        }

        return { ...input, [field]: processedValue };
      })
    );
  }

  function updateInsertBoolean(id: string, field: keyof InsertInputs, value: boolean) {
    setInsertInputs((arr) =>
      arr.map((input) => {
        if (input.id !== id) return input;
        return { ...input, [field]: value };
      })
    );
  }

  function removeInsert(id: string) {
    setInsertInputs((arr) => arr.filter((input) => input.id !== id));
  }

  function clearAll() {
    if (confirm('Are you sure you want to clear all cards?')) {
      setInsertInputs([]);
    }
  }

  function deselectAll() {
    setInsertInputs((arr) => arr.map((input) => ({ ...input, selected: false })));
  }

  return (
    <div>
      <Title order={1} className="screen-only" mb="xl">
        RPG Initiative Tracker Inserts
      </Title>

      <Group className="screen-only" mb="xl" gap="md">
        <Button onClick={addEmptyCard} size="md">
          + Add New Card
        </Button>
        {inserts.length > 0 && (
          <>
            <Button onClick={() => window.print()} size="md" variant="default">
              Print All Inserts
            </Button>
            <Button onClick={deselectAll} size="md" variant="default">
              Deselect All
            </Button>
            <Button onClick={clearAll} size="md" color="red" variant="light">
              Clear All
            </Button>
          </>
        )}
        <Button onClick={() => setSettingsOpen(true)} size="md" variant="light">
          ⚙️ Skill Settings
        </Button>
      </Group>

      <SkillVisibilitySettings
        opened={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        preferences={preferences}
        onUpdate={updatePreferences}
      />

      <div
        className="cards-editor screen-only"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'flex-start', alignContent: 'flex-start' }}
      >
        {inserts.map((insert, i) => (
          <CardEditor
            key={insert.id}
            insert={insert}
            index={i}
            onUpdate={(field, value) => updateInsert(insert.id, field, value)}
            onUpdateBoolean={(field, value) => updateInsertBoolean(insert.id, field, value)}
            onRemove={() => removeInsert(insert.id)}
            preferences={preferences}
          />
        ))}
      </div>

      <PrintArea inserts={inserts} preferences={preferences} />
    </div>
  );
}

export default App;
