import { ColorInput, Group, Select, Stack, TextInput } from '@mantine/core';
import { useCallback } from 'react';
import type { Insert, InsertInputs } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';
import { ImageInput } from './ImageInput';
import { MonsterForm } from './MonsterForm';
import { PlayerForm } from './PlayerForm';

interface InsertFormProps {
  insert: Insert;
  onUpdate: <K extends keyof InsertInputs>(field: K, value: InsertInputs[K]) => void;
  preferences: UserPreferences;
}

const CARD_TYPE_OPTIONS = [
  { value: 'player', label: 'Player' },
  { value: 'monster', label: 'Monster' },
];

const SIZE_OPTIONS = [
  { value: 'small', label: 'Small (37x77mm)' },
  { value: 'large', label: 'Large (64x89mm)' },
];

export function InsertForm({ insert, onUpdate, preferences }: InsertFormProps) {
  const isMonster = insert.cardType === 'monster';

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onUpdate('name', e.target.value),
    [onUpdate]
  );

  const handleCardTypeChange = useCallback(
    (value: string | null) => onUpdate('cardType', (value || 'player') as 'player' | 'monster'),
    [onUpdate]
  );

  const handleSizeChange = useCallback(
    (value: string | null) => onUpdate('size', (value || 'small') as 'small' | 'large'),
    [onUpdate]
  );

  const handleImageChange = useCallback((val: string) => onUpdate('image', val), [onUpdate]);

  const handleBackgroundColorChange = useCallback((value: string) => onUpdate('backgroundColor', value), [onUpdate]);

  return (
    <Stack gap="md">
      <TextInput label="Name" value={insert.name} onChange={handleNameChange} />

      <Group grow>
        <Select label="Card Type" value={insert.cardType} onChange={handleCardTypeChange} data={CARD_TYPE_OPTIONS} />
        <Select label="Size" value={insert.size} onChange={handleSizeChange} data={SIZE_OPTIONS} />
      </Group>

      <ColorInput
        label="Background Color"
        value={insert.backgroundColor}
        onChange={handleBackgroundColorChange}
        format="hex"
        swatches={['#f8f8f8', '#ffffff', '#e8f4f8', '#f0e8f8', '#f8f0e8', '#e8f8f0', '#f8e8e8']}
      />

      {isMonster ? (
        <MonsterForm insert={insert} onUpdate={onUpdate} />
      ) : (
        <PlayerForm insert={insert} onUpdate={onUpdate} preferences={preferences} />
      )}

      <ImageInput value={insert.image} onChange={handleImageChange} />
    </Stack>
  );
}
