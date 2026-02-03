import { Button, Group, Title } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { CardEditorWrapper } from './components/CardEditorWrapper';
import { PrintArea } from './components/PrintArea';
import { SkillVisibilitySettings } from './components/SkillVisibilitySettings';
import { useUserPreferences } from './hooks/useUserPreferences';
import type { InsertInputs } from './types/Insert';
import { exportCardsToJSON, triggerImportCards } from './utils/cardIO';
import { generateId } from './utils/idGenerator';
import { normalizeInsertInputs } from './utils/inputNormalizer';
import './App.css';

const STORAGE_KEY = 'rpg-inserts';

function App() {
  const [preferences, updatePreferences] = useUserPreferences();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [insertInputs, setInsertInputs] = useState<InsertInputs[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);
      return parsed.map((insert: any) => normalizeInsertInputs(insert));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(insertInputs));
  }, [insertInputs]);

  const addEmptyCard = useCallback(() => {
    setInsertInputs((arr) => [...arr, normalizeInsertInputs({})]);
  }, []);

  const updateInsert = useCallback(<K extends keyof InsertInputs>(id: string, field: K, value: InsertInputs[K]) => {
    setInsertInputs((arr) =>
      arr.map((input) => {
        if (input.id !== id) return input;

        let processedValue: InsertInputs[K] = value;
        // Handle array fields
        const arrayFields: Array<keyof InsertInputs> = [
          'damageImmunities',
          'damageResistances',
          'damageVulnerabilities',
          'conditionImmunities',
        ];
        if (arrayFields.includes(field)) {
          processedValue = (
            Array.isArray(value)
              ? value
              : (value as string)
                  .split(',')
                  .map((item) => item.trim())
                  .filter((item) => item.length > 0)
          ) as InsertInputs[K];
        }
        // Handle saving throw fields
        else if (field.startsWith('savingThrow')) {
          processedValue = (value === '' || value === null ? null : Number(value)) as InsertInputs[K];
        }

        return { ...input, [field]: processedValue };
      })
    );
  }, []);

  const removeInsert = useCallback((id: string) => {
    setInsertInputs((arr) => arr.filter((input) => input.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    if (confirm('Are you sure you want to clear all cards?')) {
      setInsertInputs([]);
    }
  }, []);

  const deselectAll = useCallback(() => {
    setInsertInputs((arr) => arr.map((input) => ({ ...input, selected: false })));
  }, []);

  const handleExport = useCallback(() => {
    const selectedCards = insertInputs.filter((input) => input.selected);
    const cardsToExport = selectedCards.length > 0 ? selectedCards : insertInputs;
    const filename = `inserts-${new Date().toISOString().split('T')[0]}.json`;
    exportCardsToJSON(cardsToExport, filename);
  }, [insertInputs]);

  const handleImport = useCallback(async () => {
    try {
      const importedCards = await triggerImportCards();
      // Generate new IDs to avoid conflicts
      const cardsWithNewIds = importedCards.map((card) => ({
        ...card,
        id: generateId(),
        skills: card.skills,
        selected: true,
      }));
      setInsertInputs((arr) => [...arr, ...cardsWithNewIds]);
    } catch (error) {
      if (error instanceof Error && error.message !== 'Import cancelled') {
        alert(`Failed to import cards: ${error.message}`);
      }
    }
  }, []);

  return (
    <div>
      <Title order={1} className="screen-only" mb="xl">
        RPG Initiative Tracker Inserts
      </Title>

      <Group className="screen-only" mb="xl" gap="md">
        <Button onClick={addEmptyCard} size="md">
          + Add New Card
        </Button>
        <Button onClick={handleImport} size="md" variant="default">
          Import Cards
        </Button>
        {insertInputs.length > 0 && (
          <>
            <Button onClick={handleExport} size="md" variant="default">
              Export Cards
            </Button>
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
          Skill Settings
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
        {insertInputs.map((input, i) => (
          <CardEditorWrapper
            key={input.id}
            insertInput={input}
            index={i}
            onUpdate={updateInsert}
            onRemove={removeInsert}
            preferences={preferences}
          />
        ))}
      </div>

      <PrintArea insertInputs={insertInputs} preferences={preferences} />
    </div>
  );
}

export default App;
