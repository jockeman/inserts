import { Stack, Group, TextInput, Select, Text } from '@mantine/core';
import { Insert } from '../types/Insert';
import { UserPreferences } from '../types/UserPreferences';
import { getVisibleSkills } from '../utils/skillConfig';

interface PlayerFormProps {
  insert: Insert;
  onUpdate: (field: keyof Insert, value: string) => void;
  preferences: UserPreferences;
}

export default function PlayerForm({ insert, onUpdate, preferences }: PlayerFormProps) {
  const visibleSkills = getVisibleSkills(preferences);
  
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

      {visibleSkills.length > 0 && (
        <Text size="sm" fw={600} mt="md">Skills (Passive Values)</Text>
      )}
      
      {visibleSkills.map(([skillKey, skillInfo], index) => {
        if (index % 2 === 0) {
          const nextSkill = visibleSkills[index + 1];
          return (
            <Group grow key={skillKey}>
              <TextInput 
                label={`Passive ${skillInfo.label}`}
                value={insert[skillInfo.passiveField] as string} 
                onChange={(e) => onUpdate(skillInfo.passiveField, e.target.value)}
              />
              {nextSkill && (
                <TextInput 
                  label={`Passive ${nextSkill[1].label}`}
                  value={insert[nextSkill[1].passiveField] as string} 
                  onChange={(e) => onUpdate(nextSkill[1].passiveField, e.target.value)}
                />
              )}
            </Group>
          );
        }
        return null;
      }).filter(Boolean)}
      
      <Group grow>
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
