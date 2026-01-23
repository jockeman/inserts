import { useState } from 'react';
import { Stack, Group, TextInput, Textarea, Button, Paper } from '@mantine/core';
import { Insert } from '../types/Insert';
import { parseMonsterStatBlock } from '../utils/monsterParser';

interface MonsterFormProps {
  insert: Insert;
  onUpdate: (field: keyof Insert, value: string) => void;
}

export default function MonsterForm({ insert, onUpdate }: MonsterFormProps) {
  const isLarge = insert.size === 'large';
  const [statBlockText, setStatBlockText] = useState('');
  const [showParser, setShowParser] = useState(false);
  
  const handleParse = () => {
    const parsed = parseMonsterStatBlock(statBlockText);
    Object.entries(parsed).forEach(([key, value]) => {
      if (value !== undefined) {
        onUpdate(key as keyof Insert, value as string);
      }
    });
    setStatBlockText('');
    setShowParser(false);
  };
  
  return (
    <Stack gap="md">
      <Paper p="md" withBorder>
        {!showParser ? (
          <Button 
            onClick={() => setShowParser(true)}
            fullWidth
          >
            📋 Parse Monster Stat Block
          </Button>
        ) : (
          <Stack gap="sm">
            <Textarea 
              label="Paste monster stat block text here:"
              value={statBlockText}
              onChange={(e) => setStatBlockText(e.target.value)}
              minRows={4}
              styles={{ input: { fontFamily: 'monospace', fontSize: '12px' } }}
              placeholder="Paste stat block text..."
            />
            <Group grow>
              <Button onClick={handleParse}>
                Parse & Fill Form
              </Button>
              <Button variant="default" onClick={() => { setShowParser(false); setStatBlockText(''); }}>
                Cancel
              </Button>
            </Group>
          </Stack>
        )}
      </Paper>
      
      <Group grow>
        <TextInput 
          label="Size"
          value={insert.monsterSize} 
          onChange={(e) => onUpdate('monsterSize', e.target.value)}
          placeholder="e.g., Small"
        />
        <TextInput 
          label="Type"
          value={insert.monsterType} 
          onChange={(e) => onUpdate('monsterType', e.target.value)}
          placeholder="e.g., Humanoid (Angulotl)"
          style={{ flex: 2 }}
        />
      </Group>
      
      <Group grow>
        <TextInput 
          label="CR"
          value={insert.cr} 
          onChange={(e) => onUpdate('cr', e.target.value)}
          placeholder="e.g., 1/4"
        />
        <TextInput 
          label="Speed"
          value={insert.speed} 
          onChange={(e) => onUpdate('speed', e.target.value)}
          placeholder="e.g., 20 ft., swim 30 ft."
        />
      </Group>
      
      <Group grow>
        <TextInput 
          label="AC"
          value={insert.ac} 
          onChange={(e) => onUpdate('ac', e.target.value)}
        />
        <TextInput 
          label="HP"
          value={insert.hp} 
          onChange={(e) => onUpdate('hp', e.target.value)}
          placeholder="e.g., 14 (4d6)"
        />
      </Group>
      
      <Group grow>
        <TextInput 
          label="STR"
          value={insert.str} 
          onChange={(e) => onUpdate('str', e.target.value)}
          type="number"
          placeholder="e.g., 7"
        />
        <TextInput 
          label="DEX"
          value={insert.dex} 
          onChange={(e) => onUpdate('dex', e.target.value)}
          type="number"
          placeholder="e.g., 15"
        />
        <TextInput 
          label="CON"
          value={insert.con} 
          onChange={(e) => onUpdate('con', e.target.value)}
          type="number"
          placeholder="e.g., 11"
        />
      </Group>
      
      <Group grow>
        <TextInput 
          label="INT"
          value={insert.int} 
          onChange={(e) => onUpdate('int', e.target.value)}
          type="number"
          placeholder="e.g., 10"
        />
        <TextInput 
          label="WIS"
          value={insert.wis} 
          onChange={(e) => onUpdate('wis', e.target.value)}
          type="number"
          placeholder="e.g., 14"
        />
        <TextInput 
          label="CHA"
          value={insert.cha} 
          onChange={(e) => onUpdate('cha', e.target.value)}
          type="number"
          placeholder="e.g., 8"
        />
      </Group>
      
      <TextInput 
        label="Saving Throws"
        value={insert.savingThrows} 
        onChange={(e) => onUpdate('savingThrows', e.target.value)}
        placeholder="e.g., Str +2, Dex +4"
      />
      
      <TextInput 
        label="Skills"
        value={insert.skills} 
        onChange={(e) => onUpdate('skills', e.target.value)}
        placeholder="e.g., Perception +4, Stealth +4"
      />
      
      <TextInput 
        label="Damage Immunities"
        value={insert.damageImmunities} 
        onChange={(e) => onUpdate('damageImmunities', e.target.value)}
      />
      
      <TextInput 
        label="Damage Resistances"
        value={insert.damageResistances} 
        onChange={(e) => onUpdate('damageResistances', e.target.value)}
      />
      
      <TextInput 
        label="Senses"
        value={insert.senses} 
        onChange={(e) => onUpdate('senses', e.target.value)}
        placeholder="e.g., darkvision 60 ft., passive Perception 14"
      />
      
      <Group grow>
        <TextInput 
          label="Languages"
          value={insert.languages} 
          onChange={(e) => onUpdate('languages', e.target.value)}
        />
        <TextInput 
          label="Proficiency Bonus"
          value={insert.proficiencyBonus} 
          onChange={(e) => onUpdate('proficiencyBonus', e.target.value)}
          placeholder="e.g., +2"
        />
      </Group>
      
      {isLarge && (
        <>
          <Textarea 
            label="Traits (one per line)"
            value={insert.traits} 
            onChange={(e) => onUpdate('traits', e.target.value)}
            minRows={3}
            placeholder="e.g., Amphibious. The blade can breathe air and water."
          />
          
          <Textarea 
            label="Actions (one per line)"
            value={insert.actions} 
            onChange={(e) => onUpdate('actions', e.target.value)}
            minRows={3}
            placeholder="e.g., Machete. Melee Weapon Attack: +4 to hit..."
          />
          
          <Textarea 
            label="Bonus Actions (one per line)"
            value={insert.bonusActions} 
            onChange={(e) => onUpdate('bonusActions', e.target.value)}
            minRows={3}
          />
        </>
      )}
    </Stack>
  );
}
