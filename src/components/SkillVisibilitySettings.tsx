import { Button, Checkbox, Group, Modal, Stack, Text } from '@mantine/core';
import type { SkillName } from '../types/Insert';
import type { AbilityType } from '../types/Shared';
import { DEFAULT_SKILL_VISIBILITY, type UserPreferences } from '../types/UserPreferences';
import { ALL_SKILLS } from '../utils/skillConfig';

interface SkillVisibilitySettingsProps {
  opened: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdate: (partial: Partial<UserPreferences>) => void;
}

export function SkillVisibilitySettings({ opened, onClose, preferences, onUpdate }: SkillVisibilitySettingsProps) {
  const handleToggle = (skillKey: string, checked: boolean) => {
    onUpdate({
      skillVisibility: {
        ...preferences.skillVisibility,
        [skillKey]: checked,
      },
    });
  };

  const selectAll = () => {
    const allTrue = Object.fromEntries((Object.keys(ALL_SKILLS) as SkillName[]).map((key) => [key, true])) as Record<
      SkillName,
      boolean
    >;
    onUpdate({ skillVisibility: allTrue });
  };

  const deselectAll = () => {
    const allFalse = Object.fromEntries((Object.keys(ALL_SKILLS) as SkillName[]).map((key) => [key, false])) as Record<
      SkillName,
      boolean
    >;
    onUpdate({ skillVisibility: allFalse });
  };

  const resetToDefaults = () => {
    onUpdate({ skillVisibility: DEFAULT_SKILL_VISIBILITY });
  };

  // Group skills by ability
  const skillsByAbility: Record<AbilityType, string[]> = {
    str: [],
    dex: [],
    con: [],
    int: [],
    wis: [],
    cha: [],
  };

  for (const [key, info] of Object.entries(ALL_SKILLS)) {
    skillsByAbility[info.ability].push(key);
  }

  const abilityLabels: Record<AbilityType, string> = {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma',
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Skill Visibility Settings" size="lg">
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Select which skills to display on Advanced Player cards. These settings apply to all cards.
        </Text>

        <Group>
          <Button onClick={selectAll} variant="light" size="sm">
            Select All
          </Button>
          <Button onClick={deselectAll} variant="light" size="sm">
            Deselect All
          </Button>
          <Button onClick={resetToDefaults} variant="light" size="sm">
            Reset to Defaults
          </Button>
        </Group>

        {(Object.entries(abilityLabels) as [AbilityType, string][]).map(([ability, label]) => {
          const abilitySkills = skillsByAbility[ability];
          // Hide abilities without skills
          if (abilitySkills.length === 0) {
            return null;
          }
          return (
            <div key={ability}>
              <Text size="sm" fw={600} mb="xs">
                {label}
              </Text>
              <Stack gap="xs">
                {abilitySkills.map((skillKey) => (
                  <Checkbox
                    key={skillKey}
                    label={ALL_SKILLS[skillKey as SkillName].label}
                    checked={preferences.skillVisibility[skillKey as SkillName]}
                    onChange={(e) => handleToggle(skillKey, e.currentTarget.checked)}
                  />
                ))}
              </Stack>
            </div>
          );
        })}

        <Group justify="flex-end" mt="md">
          <Button onClick={onClose}>Done</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
