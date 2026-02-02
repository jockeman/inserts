import { Checkbox, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { useCallback } from 'react';
import type { Insert, InsertInputs, SkillName } from '../types/Insert';
import type { ClassName, RaceName } from '../types/Shared';
import type { UserPreferences } from '../types/UserPreferences';
import { CLASS_OPTIONS } from '../utils/classConfig';
import { RACE_OPTIONS } from '../utils/raceConfig';
import { getVisibleSkills } from '../utils/skillConfig';
import { AbilityInput } from './AbilityInput';
import { SkillInput } from './SkillInput';

interface PlayerFormProps {
  insert: Insert;
  onUpdate: <K extends keyof InsertInputs>(field: K, value: InsertInputs[K]) => void;
  preferences: UserPreferences;
}

export function PlayerForm({ insert, onUpdate, preferences }: PlayerFormProps) {
  const visibleSkills = getVisibleSkills(preferences);

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

  return (
    <Stack gap="md">
      <Select
        label="Race"
        value={insert.race}
        onChange={(value) => onUpdate('race', (value || '') as RaceName)}
        data={RACE_OPTIONS}
      />

      <Select
        label="Class"
        value={insert.class}
        onChange={(value) => onUpdate('class', (value || '') as ClassName)}
        data={CLASS_OPTIONS}
      />

      <Group grow>
        <TextInput
          label="Level"
          value={insert.level}
          onChange={(e) => onUpdate('level', Number(e.target.value))}
          type="number"
          min={1}
          max={20}
        />
        <TextInput
          label="AC"
          value={insert.ac}
          onChange={(e) => onUpdate('ac', Number(e.target.value))}
          type="number"
        />
      </Group>

      <Group align="flex-end" gap="xs">
        <TextInput
          label="Max HP"
          value={insert.hp}
          onChange={(e) => onUpdate('hp', Number(e.target.value))}
          type="number"
          disabled={!insert.maxHPOverride}
          style={{ flex: 1 }}
        />
        <Checkbox
          label="Override"
          checked={insert.maxHPOverride}
          onChange={(e) => onUpdate('maxHPOverride', e.currentTarget.checked)}
          mb={4}
        />
      </Group>

      <Group align="flex-end" gap="xs">
        <TextInput
          label="Proficiency Bonus"
          value={insert.proficiencyBonus}
          onChange={(e) => onUpdate('proficiencyBonus', Number(e.target.value))}
          placeholder="+2"
          disabled={!insert.proficiencyBonusOverride}
          style={{ flex: 1 }}
        />
        <Checkbox
          label="Override"
          checked={insert.proficiencyBonusOverride}
          onChange={(e) => onUpdate('proficiencyBonusOverride', e.currentTarget.checked)}
          mb={4}
        />
      </Group>

      <Group grow>
        <AbilityInput ability="str" value={insert.str} onUpdate={onUpdate} />
        <AbilityInput ability="dex" value={insert.dex} onUpdate={onUpdate} />
        <AbilityInput ability="con" value={insert.con} onUpdate={onUpdate} />
      </Group>

      <Group grow>
        <AbilityInput ability="int" value={insert.int} onUpdate={onUpdate} />
        <AbilityInput ability="wis" value={insert.wis} onUpdate={onUpdate} />
        <AbilityInput ability="cha" value={insert.cha} onUpdate={onUpdate} />
      </Group>

      <Text size="sm" fw={600} mt="md">
        Skills
      </Text>
      {visibleSkills.map(([skillKey, skillInfo]) => {
        const skill = insert.skills[skillInfo.key];
        return (
          <SkillInput
            key={skillKey}
            skillName={skillInfo.key}
            skillInfo={skillInfo}
            skill={skill}
            onUpdate={handleSkillUpdate}
          />
        );
      })}

      <Group align="flex-end" gap="xs">
        <TextInput
          label="Darkvision (ft)"
          value={insert.darkvision}
          onChange={(e) => onUpdate('darkvision', Number(e.target.value))}
          type="number"
          min={0}
          disabled={!insert.darkvisionOverride}
          style={{ flex: 1 }}
        />
        <Checkbox
          label="Override"
          checked={insert.darkvisionOverride}
          onChange={(e) => onUpdate('darkvisionOverride', e.currentTarget.checked)}
          mb={4}
        />
      </Group>
    </Stack>
  );
}
