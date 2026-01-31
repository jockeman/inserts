import { Button, Group, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CardEditor } from './components/CardEditor';
import { PrintArea } from './components/PrintArea';
import { SkillVisibilitySettings } from './components/SkillVisibilitySettings';
import { useUserPreferences } from './hooks/useUserPreferences';
import type { Insert } from './types/Insert';
import { generateId } from './utils/idGenerator';
import { calculateAdvancedPlayerValues } from './utils/playerCalculations';
import './App.css';

const emptyInsert: Insert = {
  id: '', // Will be generated when added
  name: '',
  image: '',
  cardType: 'player',
  size: 'small',
  race: 'Human',
  class: 'Fighter',
  ac: 0,
  hp: 0,
  perception: 0,
  insight: 0,
  investigation: 0,
  arcana: 0,
  nature: 0,
  survival: 0,
  stealth: 0,
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
  acrobatics: 0,
  animalHandling: 0,
  athletics: 0,
  deception: 0,
  history: 0,
  intimidation: 0,
  medicine: 0,
  performance: 0,
  persuasion: 0,
  religion: 0,
  sleightOfHand: 0,
  profAcrobatics: 'none',
  profAnimalHandling: 'none',
  profArcana: 'none',
  profAthletics: 'none',
  profDeception: 'none',
  profHistory: 'none',
  profInsight: 'none',
  profIntimidation: 'none',
  profInvestigation: 'none',
  profMedicine: 'none',
  profNature: 'none',
  profPerception: 'none',
  profPerformance: 'none',
  profPersuasion: 'none',
  profReligion: 'none',
  profSleightOfHand: 'none',
  profStealth: 'none',
  profSurvival: 'none',
  modAcrobatics: 0,
  modAnimalHandling: 0,
  modArcana: 0,
  modAthletics: 0,
  modDeception: 0,
  modHistory: 0,
  modInsight: 0,
  modIntimidation: 0,
  modInvestigation: 0,
  modMedicine: 0,
  modNature: 0,
  modPerception: 0,
  modPerformance: 0,
  modPersuasion: 0,
  modReligion: 0,
  modSleightOfHand: 0,
  modStealth: 0,
  modSurvival: 0,
  monsterSize: '',
  monsterType: '',
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
  const [inserts, setInserts] = useState<Insert[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((insert: Insert) => {
          const withDefaults = {
            ...insert,
            id: insert.id || generateId(), // Generate ID for old inserts without one
            selected: insert.selected !== undefined ? insert.selected : true,
            // Migrate old 'player-advanced' cards to 'player'
            cardType: (insert.cardType as string) === 'player-advanced' ? 'player' : insert.cardType,
          };
          // Apply calculations for player cards
          if (withDefaults.cardType === 'player') {
            return calculateAdvancedPlayerValues(withDefaults);
          }
          return withDefaults;
        });
      } catch (_e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inserts));
  }, [inserts]);

  function addEmptyCard() {
    setInserts((arr) => [...arr, { ...emptyInsert, id: generateId() }]);
  }

  function updateInsert(id: string, field: keyof Insert, value: string | string[] | number | null | any) {
    setInserts((arr) =>
      arr.map((insert) => {
        if (insert.id !== id) return insert;

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

        const updated = { ...insert, [field]: processedValue };
        // Apply calculations for player cards
        if (updated.cardType === 'player') {
          return calculateAdvancedPlayerValues(updated);
        }
        return updated;
      })
    );
  }

  function updateInsertBoolean(id: string, field: keyof Insert, value: boolean) {
    setInserts((arr) =>
      arr.map((insert) => {
        if (insert.id !== id) return insert;
        const updated = { ...insert, [field]: value };
        // Apply calculations for player cards
        if (updated.cardType === 'player') {
          return calculateAdvancedPlayerValues(updated);
        }
        return updated;
      })
    );
  }

  function removeInsert(id: string) {
    setInserts((arr) => arr.filter((insert) => insert.id !== id));
  }

  function clearAll() {
    if (confirm('Are you sure you want to clear all cards?')) {
      setInserts([]);
    }
  }

  function deselectAll() {
    setInserts((arr) => arr.map((insert) => ({ ...insert, selected: false })));
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
