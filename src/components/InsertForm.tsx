import { Stack, Group, TextInput, Select } from '@mantine/core';
import { Insert } from '../types/Insert';
import { UserPreferences } from '../types/UserPreferences';
import ImageInput from './ImageInput';
import MonsterForm from './MonsterForm';
import PlayerForm from './PlayerForm';
import AdvancedPlayerForm from './AdvancedPlayerForm';

interface InsertFormProps {
  insert: Insert;
  onUpdate: (field: keyof Insert, value: string) => void;
  onUpdateBoolean: (field: keyof Insert, value: boolean) => void;
  preferences: UserPreferences;
}

export default function InsertForm({ insert, onUpdate, onUpdateBoolean, preferences }: InsertFormProps) {
  const isMonster = insert.cardType === 'monster';
  const isAdvancedPlayer = insert.cardType === 'player-advanced';
  
  return (
    <Stack gap="md">
      <TextInput 
        label="Name"
        value={insert.name} 
        onChange={(e) => onUpdate('name', e.target.value)}
      />
      
      <Group grow>
        <Select 
          label="Card Type"
          value={insert.cardType} 
          onChange={(value) => onUpdate('cardType', value || 'player')}
          data={[
            { value: 'player', label: 'Player' },
            { value: 'player-advanced', label: 'Player (Advanced)' },
            { value: 'monster', label: 'Monster' }
          ]}
        />
        <Select 
          label="Size"
          value={insert.size} 
          onChange={(value) => onUpdate('size', value || 'small')}
          data={[
            { value: 'small', label: 'Small (37x77mm)' },
            { value: 'large', label: 'Large (64x89mm)' }
          ]}
        />
      </Group>
      
      {isMonster ? (
        <MonsterForm insert={insert} onUpdate={onUpdate} />
      ) : isAdvancedPlayer ? (
        <AdvancedPlayerForm insert={insert} onUpdate={onUpdate} onUpdateBoolean={onUpdateBoolean} preferences={preferences} />
      ) : (
        <PlayerForm insert={insert} onUpdate={onUpdate} />
      )}
      
      <ImageInput 
        value={insert.image} 
        onChange={(val) => onUpdate('image', val)} 
      />
    </Stack>
  );
}
