import { Badge, Group, NumberInput, SegmentedControl, Text } from '@mantine/core';
import { memo, useCallback } from 'react';
import type { Skill, SkillName } from '../types/Insert';
import type { SkillInfo } from '../utils/skillConfig';

interface SkillInputProps {
  skillName: SkillName;
  skillInfo: SkillInfo;
  skill: Skill;
  onUpdate: (skillName: SkillName, proficiency: string, modifier: number) => void;
}

const proficiencyOptions = [
  { label: 'None', value: 'none' },
  { label: 'Half', value: 'half' },
  { label: 'Prof', value: 'proficient' },
  { label: 'Expert', value: 'expert' },
];

export const SkillInput = memo(function SkillInput({ skillName, skillInfo, skill, onUpdate }: SkillInputProps) {
  const Icon = skillInfo.icon;
  const skillValue = skill?.value;

  const handleProficiencyChange = useCallback(
    (value: string) => {
      onUpdate(skillName, value, skill.modifier);
    },
    [onUpdate, skillName, skill.modifier]
  );

  const handleModifierChange = useCallback(
    (value: string | number) => {
      onUpdate(skillName, skill.proficiency, Number(value));
    },
    [onUpdate, skillName, skill.proficiency]
  );

  return (
    <div>
      <Group gap="xs" align="flex-end">
        <div style={flexContainerStyle}>
          <Group gap="xs">
            <Icon size={16} style={iconStyle} />
            <Text size="sm" fw={500}>
              {skillInfo.label}
            </Text>
          </Group>
          <SegmentedControl
            value={skill?.proficiency || 'none'}
            onChange={handleProficiencyChange}
            data={proficiencyOptions}
            size="xs"
            fullWidth
          />
        </div>
        <NumberInput
          placeholder="+0"
          value={skill?.modifier || 0}
          onChange={handleModifierChange}
          style={modInputStyle}
          size="xs"
          label="Mod"
          hideControls
          allowDecimal={false}
        />
        <Badge
          size="lg"
          color={skillValue !== undefined && skillValue >= 0 ? 'blue' : 'red'}
          variant="light"
          style={badgeStyle}
        >
          {skillValue !== undefined ? skillValue : '-'}
        </Badge>
      </Group>
    </div>
  );
});

// Stable style objects to prevent re-renders
const flexContainerStyle = { flex: 1 };
const iconStyle = { marginTop: 2 };
const modInputStyle = { width: 80 };
const badgeStyle = { minWidth: 60, textAlign: 'center' as const };
