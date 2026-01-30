import { Modal, Checkbox, Stack, Group, Button, Title, Text } from '@mantine/core';
import { UserPreferences, DEFAULT_SKILL_VISIBILITY } from '../types/UserPreferences';
import { ALL_SKILLS } from '../utils/skillConfig';

interface SkillVisibilitySettingsProps {
  opened: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdate: (partial: Partial<UserPreferences>) => void;
}

export default function SkillVisibilitySettings({ 
  opened, 
  onClose, 
  preferences, 
  onUpdate 
}: SkillVisibilitySettingsProps) {
  const handleToggle = (skillKey: string, checked: boolean) => {
    onUpdate({
      skillVisibility: {
        ...preferences.skillVisibility,
        [skillKey]: checked,
      },
    });
  };

  const selectAll = () => {
    const allTrue = Object.keys(ALL_SKILLS).reduce((acc, key) => ({
      ...acc,
      [key]: true,
    }), {} as typeof preferences.skillVisibility);
    onUpdate({ skillVisibility: allTrue });
  };

  const deselectAll = () => {
    const allFalse = Object.keys(ALL_SKILLS).reduce((acc, key) => ({
      ...acc,
      [key]: false,
    }), {} as typeof preferences.skillVisibility);
    onUpdate({ skillVisibility: allFalse });
  };

  const resetToDefaults = () => {
    onUpdate({ skillVisibility: DEFAULT_SKILL_VISIBILITY });
  };

  // Group skills by ability
  const skillsByAbility = {
    str: [] as string[],
    dex: [] as string[],
    con: [] as string[],
    int: [] as string[],
    wis: [] as string[],
    cha: [] as string[],
  };

  Object.entries(ALL_SKILLS).forEach(([key, info]) => {
    skillsByAbility[info.ability].push(key);
  });

  const abilityLabels = {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma',
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>Skill Visibility Settings</Title>}
      size="lg"
    >
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

        {Object.entries(abilityLabels).map(([ability, label]) => (
          <div key={ability}>
            <Title order={5} mb="xs">{label}</Title>
            <Stack gap="xs">
              {skillsByAbility[ability as keyof typeof skillsByAbility].map(skillKey => (
                <Checkbox
                  key={skillKey}
                  label={ALL_SKILLS[skillKey].label}
                  checked={preferences.skillVisibility[skillKey as keyof typeof preferences.skillVisibility]}
                  onChange={(e) => handleToggle(skillKey, e.currentTarget.checked)}
                />
              ))}
            </Stack>
          </div>
        ))}

        <Group justify="flex-end" mt="md">
          <Button onClick={onClose}>Done</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
