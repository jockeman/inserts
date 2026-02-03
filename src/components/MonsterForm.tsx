import { Button, Collapse, Group, Paper, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useCallback, useState } from 'react';
import type { Insert, InsertInputs, MonsterSize, MonsterType, SkillName } from '../types/Insert';
import { parseMonsterStatBlock } from '../utils/monsterParser';
import { ALL_SKILLS } from '../utils/skillConfig';
import { AbilityInput } from './AbilityInput';
import { SensesInput } from './SensesInput';
import { SkillInput } from './SkillInput';

interface MonsterFormProps {
  insert: Insert;
  onUpdate: <K extends keyof InsertInputs>(field: K, value: InsertInputs[K]) => void;
}

export function MonsterForm({ insert, onUpdate }: MonsterFormProps) {
  const [statBlockText, setStatBlockText] = useState('');
  const [showParser, setShowParser] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showSaves, setShowSaves] = useState(false);

  const handleSkillUpdate = useCallback(
    (skillName: SkillName, proficiency: string, modifier: number) => {
      const updatedSkills = {
        ...insert.skills,
        [skillName]: { ...insert.skills[skillName], proficiency, modifier },
      };
      onUpdate('skills', updatedSkills as any);
    },
    [insert.skills, onUpdate]
  );

  const handleParse = () => {
    const parsed = parseMonsterStatBlock(statBlockText);
    for (const [key, value] of Object.entries(parsed)) {
      if (value !== undefined) {
        onUpdate(key as keyof InsertInputs, value as string);
      }
    }
    setStatBlockText('');
    setShowParser(false);
  };

  return (
    <Stack gap="md">
      <Paper p="md" withBorder>
        {!showParser ? (
          <Button onClick={() => setShowParser(true)} fullWidth>
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
              <Button onClick={handleParse}>Parse & Fill Form</Button>
              <Button
                variant="default"
                onClick={() => {
                  setShowParser(false);
                  setStatBlockText('');
                }}
              >
                Cancel
              </Button>
            </Group>
          </Stack>
        )}
      </Paper>

      <Group grow>
        <Select
          label="Size"
          value={insert.monsterSize}
          onChange={(value) => onUpdate('monsterSize', (value || 'Medium') as MonsterSize)}
          data={[
            { value: 'Tiny', label: 'Tiny' },
            { value: 'Small', label: 'Small' },
            { value: 'Medium', label: 'Medium' },
            { value: 'Large', label: 'Large' },
            { value: 'Huge', label: 'Huge' },
            { value: 'Gargantuan', label: 'Gargantuan' },
          ]}
        />
        <Select
          label="Type"
          value={insert.monsterType}
          onChange={(value) => onUpdate('monsterType', (value || 'Humanoid') as MonsterType)}
          data={[
            { value: 'Aberration', label: 'Aberration' },
            { value: 'Beast', label: 'Beast' },
            { value: 'Celestial', label: 'Celestial' },
            { value: 'Construct', label: 'Construct' },
            { value: 'Dragon', label: 'Dragon' },
            { value: 'Elemental', label: 'Elemental' },
            { value: 'Fey', label: 'Fey' },
            { value: 'Fiend', label: 'Fiend' },
            { value: 'Giant', label: 'Giant' },
            { value: 'Humanoid', label: 'Humanoid' },
            { value: 'Monstrosity', label: 'Monstrosity' },
            { value: 'Ooze', label: 'Ooze' },
            { value: 'Plant', label: 'Plant' },
            { value: 'Undead', label: 'Undead' },
          ]}
          style={{ flex: 2 }}
        />
      </Group>

      <TextInput
        label="Type Tag (optional)"
        value={insert.monsterTypeTag}
        onChange={(e) => onUpdate('monsterTypeTag', e.target.value)}
        placeholder="e.g., goblinoid, shapechanger"
      />

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
        <TextInput label="AC" value={insert.ac} onChange={(e) => onUpdate('ac', Number(e.target.value))} />
        <TextInput
          label="AC Type"
          value={insert.acType}
          onChange={(e) => onUpdate('acType', e.target.value)}
          placeholder="e.g., natural armor"
        />
      </Group>

      <Group grow>
        <TextInput
          label="HP"
          value={insert.hp}
          onChange={(e) => onUpdate('hp', Number(e.target.value))}
          placeholder="e.g., 365"
        />
        <TextInput
          label="HP Formula"
          value={insert.hpFormula}
          onChange={(e) => onUpdate('hpFormula', e.target.value)}
          placeholder="e.g., 33d20 + 330"
        />
      </Group>

      <Group grow>
        <AbilityInput ability="str" value={insert.str} onUpdate={onUpdate} placeholder="e.g., 7" />
        <AbilityInput ability="dex" value={insert.dex} onUpdate={onUpdate} placeholder="e.g., 15" />
        <AbilityInput ability="con" value={insert.con} onUpdate={onUpdate} placeholder="e.g., 11" />
      </Group>

      <Group grow>
        <AbilityInput ability="int" value={insert.int} onUpdate={onUpdate} placeholder="e.g., 10" />
        <AbilityInput ability="wis" value={insert.wis} onUpdate={onUpdate} placeholder="e.g., 14" />
        <AbilityInput ability="cha" value={insert.cha} onUpdate={onUpdate} placeholder="e.g., 8" />
      </Group>

      <Paper p="md" withBorder>
        <Button onClick={() => setShowSaves(!showSaves)} fullWidth variant="light" mb={showSaves ? 'md' : 0}>
          {showSaves ? '▼' : '▶'} Saving Throws
        </Button>
        <Collapse in={showSaves}>
          <Stack gap="sm">
            <Group grow>
              <TextInput
                label="STR Save"
                value={insert.savingThrowStr ?? ''}
                onChange={(e) => onUpdate('savingThrowStr', e.target.value ? Number(e.target.value) : null)}
                placeholder="+0"
                type="number"
              />
              <TextInput
                label="DEX Save"
                value={insert.savingThrowDex ?? ''}
                onChange={(e) => onUpdate('savingThrowDex', e.target.value ? Number(e.target.value) : null)}
                placeholder="+0"
                type="number"
              />
              <TextInput
                label="CON Save"
                value={insert.savingThrowCon ?? ''}
                onChange={(e) => onUpdate('savingThrowCon', e.target.value ? Number(e.target.value) : null)}
                placeholder="+0"
                type="number"
              />
            </Group>
            <Group grow>
              <TextInput
                label="INT Save"
                value={insert.savingThrowInt ?? ''}
                onChange={(e) => onUpdate('savingThrowInt', e.target.value ? Number(e.target.value) : null)}
                placeholder="+0"
                type="number"
              />
              <TextInput
                label="WIS Save"
                value={insert.savingThrowWis ?? ''}
                onChange={(e) => onUpdate('savingThrowWis', e.target.value ? Number(e.target.value) : null)}
                placeholder="+0"
                type="number"
              />
              <TextInput
                label="CHA Save"
                value={insert.savingThrowCha ?? ''}
                onChange={(e) => onUpdate('savingThrowCha', e.target.value ? Number(e.target.value) : null)}
                placeholder="+0"
                type="number"
              />
            </Group>
          </Stack>
        </Collapse>
      </Paper>

      <Paper p="md" withBorder>
        <Button onClick={() => setShowSkills(!showSkills)} fullWidth variant="light" mb={showSkills ? 'md' : 0}>
          {showSkills ? '▼' : '▶'} Skills
        </Button>
        <Collapse in={showSkills}>
          <Stack gap="md">
            {ALL_SKILLS.map((skillInfo) => {
              const skill = insert.skills[skillInfo.key];
              return (
                <SkillInput
                  key={skillInfo.key}
                  skillName={skillInfo.key}
                  skillInfo={skillInfo}
                  skill={skill}
                  onUpdate={handleSkillUpdate}
                />
              );
            })}
          </Stack>
        </Collapse>
      </Paper>

      <TextInput
        label="Damage Immunities (comma-separated)"
        value={
          Array.isArray(insert.damageImmunities) ? insert.damageImmunities.join(', ') : insert.damageImmunities || ''
        }
        onChange={(e) => {
          const value = e.target.value;
          const array = value
            .split(/[,;]/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          onUpdate('damageImmunities', array);
        }}
        placeholder="e.g., poison, psychic"
      />

      <TextInput
        label="Damage Resistances (comma-separated)"
        value={
          Array.isArray(insert.damageResistances) ? insert.damageResistances.join(', ') : insert.damageResistances || ''
        }
        onChange={(e) => {
          const value = e.target.value;
          const array = value
            .split(/[,;]/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          onUpdate('damageResistances', array);
        }}
        placeholder="e.g., cold, slashing"
      />

      <TextInput
        label="Damage Vulnerabilities (comma-separated)"
        value={
          Array.isArray(insert.damageVulnerabilities)
            ? insert.damageVulnerabilities.join(', ')
            : insert.damageVulnerabilities || ''
        }
        onChange={(e) => {
          const value = e.target.value;
          const array = value
            .split(/[,;]/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          onUpdate('damageVulnerabilities', array);
        }}
        placeholder="e.g., fire, radiant"
      />

      <TextInput
        label="Condition Immunities (comma-separated)"
        value={
          Array.isArray(insert.conditionImmunities)
            ? insert.conditionImmunities.join(', ')
            : insert.conditionImmunities || ''
        }
        onChange={(e) => {
          const value = e.target.value;
          const array = value
            .split(/[,;]/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          onUpdate('conditionImmunities', array);
        }}
        placeholder="e.g., charmed, frightened"
      />

      <SensesInput senses={insert.senses} onUpdate={(senses) => onUpdate('senses', senses)} />

      <Group grow>
        <TextInput
          label="Languages"
          value={insert.languages.join(', ')}
          onChange={(e) => {
            const languagesText = e.target.value;
            const languages = languagesText
              .split(/[,;]/)
              .map((lang) => lang.trim())
              .filter((lang) => lang.length > 0);
            onUpdate('languages', languages);
          }}
          placeholder="e.g., Common, Draconic"
        />
        <TextInput
          label="Proficiency Bonus"
          value={insert.proficiencyBonus}
          onChange={(e) => onUpdate('proficiencyBonus', Number(e.target.value))}
          placeholder="e.g., +2"
        />
      </Group>

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
    </Stack>
  );
}
