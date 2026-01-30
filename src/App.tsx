
import { useState, useEffect } from 'react';
import { Title, Group, Button } from '@mantine/core';
import CardEditor from './components/CardEditor';
import PrintArea from './components/PrintArea';
import { Insert } from './types/Insert';
import { useUserPreferences } from './hooks/useUserPreferences';
import SkillVisibilitySettings from './components/SkillVisibilitySettings';
import { calculateAdvancedPlayerValues } from './utils/advancedPlayerCalculations';
import './App.css';

const emptyInsert: Insert = {
  name: '',
  image: '',
  cardType: 'player',
  size: 'small',
  race: '',
  class: '',
  ac: '',
  hp: '',
  perception: '',
  insight: '',
  investigation: '',
  arcana: '',
  nature: '',
  survival: '',
  stealth: '',
  darkvision: '',
  level: '',
  playerStr: '',
  playerDex: '',
  playerCon: '',
  playerInt: '',
  playerWis: '',
  playerCha: '',
  playerProficiencyBonus: '',
  proficiencyBonusOverride: false,
  maxHPOverride: false,
  darkvisionOverride: false,
  acrobatics: '',
  animalHandling: '',
  athletics: '',
  deception: '',
  history: '',
  intimidation: '',
  medicine: '',
  performance: '',
  persuasion: '',
  religion: '',
  sleightOfHand: '',
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
  modAcrobatics: '',
  modAnimalHandling: '',
  modArcana: '',
  modAthletics: '',
  modDeception: '',
  modHistory: '',
  modInsight: '',
  modIntimidation: '',
  modInvestigation: '',
  modMedicine: '',
  modNature: '',
  modPerception: '',
  modPerformance: '',
  modPersuasion: '',
  modReligion: '',
  modSleightOfHand: '',
  modStealth: '',
  modSurvival: '',
  monsterSize: '',
  monsterType: '',
  cr: '',
  speed: '',
  str: '',
  dex: '',
  con: '',
  int: '',
  wis: '',
  cha: '',
  savingThrows: '',
  skills: '',
  damageImmunities: '',
  damageResistances: '',
  damageVulnerabilities: '',
  conditionImmunities: '',
  senses: '',
  languages: '',
  proficiencyBonus: '',
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
            selected: insert.selected !== undefined ? insert.selected : true
          };
          // Apply calculations for advanced player cards
          if (withDefaults.cardType === 'player-advanced') {
            return calculateAdvancedPlayerValues(withDefaults);
          }
          return withDefaults;
        });
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inserts));
  }, [inserts]);

  function addEmptyCard() {
    setInserts(arr => [...arr, { ...emptyInsert }]);
  }

  function updateInsert(idx: number, field: keyof Insert, value: string) {
    setInserts(arr => arr.map((insert, i) => {
      if (i !== idx) return insert;
      const updated = { ...insert, [field]: value };
      // Apply calculations for advanced player cards
      if (updated.cardType === 'player-advanced') {
        return calculateAdvancedPlayerValues(updated);
      }
      return updated;
    }));
  }

  function updateInsertBoolean(idx: number, field: keyof Insert, value: boolean) {
    setInserts(arr => arr.map((insert, i) => {
      if (i !== idx) return insert;
      const updated = { ...insert, [field]: value };
      // Apply calculations for advanced player cards
      if (updated.cardType === 'player-advanced') {
        return calculateAdvancedPlayerValues(updated);
      }
      return updated;
    }));
  }

  function removeInsert(idx: number) {
    setInserts(arr => arr.filter((_, i) => i !== idx));
  }

  function clearAll() {
    if (confirm('Are you sure you want to clear all cards?')) {
      setInserts([]);
    }
  }

  function deselectAll() {
    setInserts(arr => arr.map(insert => ({ ...insert, selected: false })));
  }

  return (
    <div>
      <Title order={1} className="screen-only" mb="xl">RPG Initiative Tracker Inserts</Title>
      
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

      <div className="cards-editor screen-only" style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'flex-start', alignContent: 'flex-start' }}>
        {inserts.map((insert, i) => (
          <CardEditor
            key={i}
            insert={insert}
            index={i}
            onUpdate={(field, value) => updateInsert(i, field, value)}
            onUpdateBoolean={(field, value) => updateInsertBoolean(i, field, value)}
            onRemove={() => removeInsert(i)}
            preferences={preferences}
          />
        ))}
      </div>

      <PrintArea inserts={inserts} preferences={preferences} />
    </div>
  );
}

export default App;
