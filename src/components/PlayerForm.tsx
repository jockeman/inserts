import { Checkbox, Group, NumberInput, Select, Stack, Text } from '@mantine/core';
import { useCallback } from 'react';
import type { Insert, InsertInputs, SkillName } from '../types/Insert';
import type { ClassName, RaceName } from '../types/Shared';
import type { UserPreferences } from '../types/UserPreferences';
import { CLASS_OPTIONS } from '../utils/classConfig';
import { RACE_OPTIONS } from '../utils/raceConfig';
import { getVisibleSkills } from '../utils/skillConfig';
import { AbilityInput } from './AbilityInput';
import { SensesInput } from './SensesInput';
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
      <Group grow>
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
      </Group>

      <Group grow>
        <NumberInput
          label="Level"
          value={insert.level}
          onChange={(val) => onUpdate('level', Number(val) || 1)}
          min={1}
          max={20}
          allowDecimal={false}
          allowNegative={false}
          hideControls
        />
        <NumberInput
          label="AC"
          value={insert.ac}
          onChange={(val) => onUpdate('ac', Number(val) || 0)}
          allowDecimal={false}
          allowNegative={false}
          hideControls
        />
      </Group>

      <Group align="flex-end" gap="xs">
        <NumberInput
          label="Max HP"
          value={insert.hp}
          onChange={(val) => onUpdate('hp', Number(val) || 0)}
          disabled={!insert.maxHPOverride}
          style={{ flex: 1 }}
          allowDecimal={false}
          allowNegative={false}
          hideControls
        />
        <Checkbox
          label="Override"
          checked={insert.maxHPOverride}
          onChange={(e) => onUpdate('maxHPOverride', e.currentTarget.checked)}
          mb={4}
        />
      </Group>

      <Group align="flex-end" gap="xs">
        <NumberInput
          label="Proficiency Bonus"
          value={insert.proficiencyBonus}
          onChange={(val) => onUpdate('proficiencyBonus', Number(val) || 0)}
          placeholder="+2"
          disabled={!insert.proficiencyBonusOverride}
          style={{ flex: 1 }}
          allowDecimal={false}
          allowNegative={false}
          hideControls
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
      {visibleSkills.map((skillInfo) => {
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

      <SensesInput senses={insert.senses} onUpdate={(senses) => onUpdate('senses', senses)} />
    </Stack>
  );
}
