import { Stack, Group, TextInput, Select } from '@mantine/core';
import { Insert } from '../types/Insert';
import ImageInput from './ImageInput';
import MonsterForm from './MonsterForm';
import PlayerForm from './PlayerForm';

interface InsertFormProps {
  insert: Insert;
  onUpdate: (field: keyof Insert, value: string) => void;
}

export default function InsertForm({ insert, onUpdate }: InsertFormProps) {
  const isMonster = insert.cardType === 'monster';
  
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
