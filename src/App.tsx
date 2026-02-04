import { AppShell, Burger, Button, Group, NavLink, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import { FaFileExport, FaFileImport, FaTrash } from 'react-icons/fa';
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
  const [navbarOpened, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure();
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
    <>
      <AppShell
        header={{ height: 70 }}
        navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !navbarOpened, desktop: !navbarOpened } }}
        padding="md"
        className="screen-only"
      >
        <AppShell.Header p="md">
          <Group justify="space-between">
            <Group>
              <Burger opened={navbarOpened} onClick={toggleNavbar} size="sm" />
              <Title order={1}>RPG Initiative Tracker Inserts</Title>
            </Group>

            <Group gap="md">
              <Button onClick={addEmptyCard} size="md">
                + Add New Card
              </Button>
              <Button onClick={deselectAll} size="md" variant="default" disabled={insertInputs.length === 0}>
                Deselect All
              </Button>
              <Button onClick={() => window.print()} size="md" variant="default">
                Print Inserts
              </Button>
              <Button onClick={() => setSettingsOpen(true)} size="md" variant="light">
                Skill Settings
              </Button>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Stack gap="xs">
            <NavLink
              label="Import Cards"
              leftSection={<FaFileImport size="1rem" />}
              onClick={() => {
                handleImport();
              }}
            />
            <NavLink
              label="Export Cards"
              leftSection={<FaFileExport size="1rem" />}
              onClick={() => {
                handleExport();
              }}
              disabled={insertInputs.length === 0}
            />
            <NavLink
              label="Clear All"
              leftSection={<FaTrash size="1rem" color="red" />}
              onClick={() => {
                clearAll();
              }}
              disabled={insertInputs.length === 0}
            />
          </Stack>
        </AppShell.Navbar>

        <AppShell.Main>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 32,
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
            }}
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
        </AppShell.Main>
      </AppShell>

      <SkillVisibilitySettings
        opened={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        preferences={preferences}
        onUpdate={updatePreferences}
      />

      <PrintArea insertInputs={insertInputs} preferences={preferences} />
    </>
  );
}

export default App;
