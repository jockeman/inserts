
import { useState, useEffect } from 'react';
import { Title, Group, Button } from '@mantine/core';
import CardEditor from './components/CardEditor';
import PrintArea from './components/PrintArea';
import { Insert } from './types/Insert';
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
  const [inserts, setInserts] = useState<Insert[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((insert: Insert) => ({
          ...insert,
          selected: insert.selected !== undefined ? insert.selected : true
        }));
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
    setInserts(arr => arr.map((insert, i) => 
      i === idx ? { ...insert, [field]: value } : insert
    ));
  }

  function updateInsertBoolean(idx: number, field: keyof Insert, value: boolean) {
    setInserts(arr => arr.map((insert, i) => 
      i === idx ? { ...insert, [field]: value } : insert
    ));
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
      </Group>

      <div className="cards-editor screen-only" style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'flex-start', alignContent: 'flex-start' }}>
        {inserts.map((insert, i) => (
          <CardEditor
            key={i}
            insert={insert}
            index={i}
            onUpdate={(field, value) => updateInsert(i, field, value)}
            onUpdateBoolean={(field, value) => updateInsertBoolean(i, field, value)}
            onRemove={() => removeInsert(i)}
          />
        ))}
      </div>

      <PrintArea inserts={inserts} />
    </div>
  );
}

export default App;
