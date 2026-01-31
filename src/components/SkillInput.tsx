import { Badge, Group, SegmentedControl, Text, TextInput } from '@mantine/core';
import type { InsertInputs, Skill, SkillName } from '../types/Insert';
import type { SkillInfo } from '../utils/skillConfig';

interface SkillInputProps {
  skillName: SkillName;
  skillInfo: SkillInfo;
  skill: Skill;
  skills: Record<SkillName, Skill>;
  onUpdate: (field: keyof InsertInputs, value: any) => void;
}

export function SkillInput({ skillName, skillInfo, skill, skills, onUpdate }: SkillInputProps) {
  const Icon = skillInfo.icon;
  const skillValue = skill?.value;

  const handleProficiencyChange = (value: string) => {
    const updatedSkills = {
      ...skills,
      [skillName]: { ...skill, proficiency: value as any },
    };
    onUpdate('skills' as keyof InsertInputs, updatedSkills);
  };

  const handleModifierChange = (value: string) => {
    const updatedSkills = {
      ...skills,
      [skillName]: { ...skill, modifier: Number(value) || 0 },
    };
    onUpdate('skills' as keyof InsertInputs, updatedSkills);
  };

  return (
    <div>
      <Group gap="xs" align="flex-end">
        <div style={{ flex: 1 }}>
          <Group gap="xs">
            <Icon size={16} style={{ marginTop: 2 }} />
            <Text size="sm" fw={500}>
              {skillInfo.label}
            </Text>
          </Group>
          <SegmentedControl
            value={skill?.proficiency || 'none'}
            onChange={handleProficiencyChange}
            data={[
              { label: 'None', value: 'none' },
              { label: 'Half', value: 'half' },
              { label: 'Prof', value: 'proficient' },
              { label: 'Expert', value: 'expert' },
            ]}
            size="xs"
            fullWidth
          />
        </div>
        <TextInput
          placeholder="+0"
          value={skill?.modifier || 0}
          onChange={(e) => handleModifierChange(e.target.value)}
          style={{ width: 80 }}
          size="xs"
          label="Mod"
        />
        <Badge size="lg" color="blue" variant="filled" style={{ minWidth: 60, textAlign: 'center' }}>
          {skillValue !== undefined ? skillValue : '-'}
        </Badge>
      </Group>
    </div>
  );
}
