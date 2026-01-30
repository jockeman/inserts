import { Group, Select, Stack, TextInput } from '@mantine/core';
import type { Insert } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';
import AdvancedPlayerForm from './AdvancedPlayerForm';
import ImageInput from './ImageInput';
import MonsterForm from './MonsterForm';

interface InsertFormProps {
  insert: Insert;
  onUpdate: (field: keyof Insert, value: string) => void;
  onUpdateBoolean: (field: keyof Insert, value: boolean) => void;
  preferences: UserPreferences;
}

export default function InsertForm({ insert, onUpdate, onUpdateBoolean, preferences }: InsertFormProps) {
  const isMonster = insert.cardType === 'monster';

  return (
    <Stack gap="md">
      <TextInput label="Name" value={insert.name} onChange={(e) => onUpdate('name', e.target.value)} />

      <Group grow>
        <Select
          label="Card Type"
          value={insert.cardType}
          onChange={(value) => onUpdate('cardType', value || 'player')}
          data={[
            { value: 'player', label: 'Player' },
            { value: 'monster', label: 'Monster' },
          ]}
        />
        <Select
          label="Size"
          value={insert.size}
          onChange={(value) => onUpdate('size', value || 'small')}
          data={[
            { value: 'small', label: 'Small (37x77mm)' },
            { value: 'large', label: 'Large (64x89mm)' },
          ]}
        />
      </Group>

      {isMonster ? (
        <MonsterForm insert={insert} onUpdate={onUpdate} />
      ) : (
        <AdvancedPlayerForm
          insert={insert}
          onUpdate={onUpdate}
          onUpdateBoolean={onUpdateBoolean}
          preferences={preferences}
        />
      )}

      <ImageInput value={insert.image} onChange={(val) => onUpdate('image', val)} />
    </Stack>
  );
}
