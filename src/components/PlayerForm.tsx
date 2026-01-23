import { Stack, Group, TextInput, Select } from '@mantine/core';
import { Insert } from '../types/Insert';

interface PlayerFormProps {
  insert: Insert;
  onUpdate: (field: keyof Insert, value: string) => void;
}

export default function PlayerForm({ insert, onUpdate }: PlayerFormProps) {
  return (
    <Stack gap="md">
      <Select 
        label="Race"
        value={insert.race} 
        onChange={(value) => onUpdate('race', value || '')}
        data={[
          { value: '', label: '-- Select --' },
          { value: 'Dragonborn', label: 'Dragonborn' },
          { value: 'Dwarf', label: 'Dwarf' },
          { value: 'Elf', label: 'Elf' },
          { value: 'Gnome', label: 'Gnome' },
          { value: 'Goliath', label: 'Goliath' },
          { value: 'Half-Elf', label: 'Half-Elf' },
          { value: 'Half-Orc', label: 'Half-Orc' },
          { value: 'Halfling', label: 'Halfling' },
          { value: 'Human', label: 'Human' },
          { value: 'Tabaxi', label: 'Tabaxi' },
          { value: 'Tiefling', label: 'Tiefling' }
        ]}
      />
      
      <Select 
        label="Class"
        value={insert.class} 
        onChange={(value) => onUpdate('class', value || '')}
        data={[
          { value: '', label: '-- Select --' },
          { value: 'Barbarian', label: 'Barbarian' },
          { value: 'Bard', label: 'Bard' },
          { value: 'Cleric', label: 'Cleric' },
          { value: 'Druid', label: 'Druid' },
          { value: 'Fighter', label: 'Fighter' },
          { value: 'Monk', label: 'Monk' },
          { value: 'Paladin', label: 'Paladin' },
          { value: 'Ranger', label: 'Ranger' },
          { value: 'Rogue', label: 'Rogue' },
          { value: 'Sorcerer', label: 'Sorcerer' },
          { value: 'Warlock', label: 'Warlock' },
          { value: 'Wizard', label: 'Wizard' }
        ]}
      />
      
      <Group grow>
        <TextInput 
          label="AC"
          value={insert.ac} 
          onChange={(e) => onUpdate('ac', e.target.value)}
        />
        <TextInput 
          label="Max HP"
          value={insert.hp} 
          onChange={(e) => onUpdate('hp', e.target.value)}
        />
      </Group>
      
      <Group grow>
        <TextInput 
          label="Passive Arcana"
          value={insert.arcana} 
          onChange={(e) => onUpdate('arcana', e.target.value)}
        />
        <TextInput 
          label="Passive Insight"
          value={insert.insight} 
          onChange={(e) => onUpdate('insight', e.target.value)}
        />
      </Group>
      
      <Group grow>
        <TextInput 
          label="Passive Investigation"
          value={insert.investigation} 
          onChange={(e) => onUpdate('investigation', e.target.value)}
        />
        <TextInput 
          label="Passive Nature"
          value={insert.nature} 
          onChange={(e) => onUpdate('nature', e.target.value)}
        />
      </Group>
      
      <Group grow>
        <TextInput 
          label="Passive Perception"
          value={insert.perception} 
          onChange={(e) => onUpdate('perception', e.target.value)}
        />
        <TextInput 
          label="Passive Stealth"
          value={insert.stealth} 
          onChange={(e) => onUpdate('stealth', e.target.value)}
        />
      </Group>
      
      <Group grow>
        <TextInput 
          label="Passive Survival"
          value={insert.survival} 
          onChange={(e) => onUpdate('survival', e.target.value)}
        />
        <TextInput 
          label="Darkvision (ft)"
          value={insert.darkvision} 
          onChange={(e) => onUpdate('darkvision', e.target.value)}
          type="number"
          min={0}
        />
      </Group>
    </Stack>
  );
}
