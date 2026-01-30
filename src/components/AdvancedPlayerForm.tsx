import { Badge, Checkbox, Group, SegmentedControl, Select, Stack, Text, TextInput } from '@mantine/core';
import type { Insert } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';
import { getClassOptions } from '../utils/classConfig';
import { getRaceOptions } from '../utils/raceConfig';
import { getVisibleSkills } from '../utils/skillConfig';

interface AdvancedPlayerFormProps {
  insert: Insert;
  onUpdate: (field: keyof Insert, value: string) => void;
  onUpdateBoolean: (field: keyof Insert, value: boolean) => void;
  preferences: UserPreferences;
}

export default function AdvancedPlayerForm({
  insert,
  onUpdate,
  onUpdateBoolean,
  preferences,
}: AdvancedPlayerFormProps) {
  const visibleSkills = getVisibleSkills(preferences);

  return (
    <Stack gap="md">
      <Select
        label="Race"
        value={insert.race}
        onChange={(value) => onUpdate('race', value || '')}
        data={getRaceOptions()}
      />

      <Group grow>
        <TextInput
          label="Level"
          value={insert.level}
          onChange={(e) => onUpdate('level', e.target.value)}
          type="number"
          min={1}
          max={20}
        />
        <TextInput label="AC" value={insert.ac} onChange={(e) => onUpdate('ac', e.target.value)} />
      </Group>

      <div>
        <Group align="flex-end" gap="xs">
          <TextInput
            label="Max HP"
            value={insert.hp}
            onChange={(e) => onUpdate('hp', e.target.value)}
            disabled={!insert.maxHPOverride}
            style={{ flex: 1 }}
          />
          <Checkbox
            label="Manual Override"
            checked={insert.maxHPOverride}
            onChange={(e) => onUpdateBoolean('maxHPOverride', e.currentTarget.checked)}
            mb={4}
          />
        </Group>
        {!insert.maxHPOverride && insert.level && insert.class && insert.con && (
          <Text size="xs" c="dimmed" mt={4}>
            Auto-calculated from level, class, and CON
          </Text>
        )}
      </div>

      <Select
        label="Class"
        value={insert.class}
        onChange={(value) => onUpdate('class', value || '')}
        data={getClassOptions()}
      />

      <div>
        <Group align="flex-end" gap="xs">
          <TextInput
            label="Proficiency Bonus"
            value={insert.playerProficiencyBonus}
            onChange={(e) => onUpdate('playerProficiencyBonus', e.target.value)}
            placeholder="+2"
            disabled={!insert.proficiencyBonusOverride}
            style={{ flex: 1 }}
          />
          <Checkbox
            label="Manual Override"
            checked={insert.proficiencyBonusOverride}
            onChange={(e) => onUpdateBoolean('proficiencyBonusOverride', e.currentTarget.checked)}
            mb={4}
          />
        </Group>
        {!insert.proficiencyBonusOverride && insert.level && (
          <Text size="xs" c="dimmed" mt={4}>
            Auto-calculated from level
          </Text>
        )}
      </div>

      <Group grow>
        <TextInput label="STR" value={insert.str} onChange={(e) => onUpdate('str', e.target.value)} type="number" />
        <TextInput label="DEX" value={insert.dex} onChange={(e) => onUpdate('dex', e.target.value)} type="number" />
        <TextInput label="CON" value={insert.con} onChange={(e) => onUpdate('con', e.target.value)} type="number" />
      </Group>

      <Group grow>
        <TextInput label="INT" value={insert.int} onChange={(e) => onUpdate('int', e.target.value)} type="number" />
        <TextInput label="WIS" value={insert.wis} onChange={(e) => onUpdate('wis', e.target.value)} type="number" />
        <TextInput label="CHA" value={insert.cha} onChange={(e) => onUpdate('cha', e.target.value)} type="number" />
      </Group>

      <Text size="sm" fw={600} mt="md">
        Skills (Passive Values)
      </Text>
      {visibleSkills.map(([skillKey, skillInfo]) => {
        const passiveValue = insert[skillInfo.passiveField] as string;
        return (
          <div key={skillKey}>
            <Group gap="xs" align="flex-end">
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {skillInfo.label}
                </Text>
                <SegmentedControl
                  value={insert[skillInfo.profField] as string}
                  onChange={(value) => onUpdate(skillInfo.profField, value)}
                  data={[
                    { label: 'None', value: 'none' },
                    { label: 'Prof', value: 'proficient' },
                    { label: 'Expert', value: 'expert' },
                  ]}
                  size="xs"
                  fullWidth
                />
              </div>
              <TextInput
                placeholder="+0"
                value={insert[skillInfo.modField] as string}
                onChange={(e) => onUpdate(skillInfo.modField, e.target.value)}
                style={{ width: 80 }}
                size="xs"
                label="Mod"
              />
              <Badge size="lg" color="blue" variant="filled" style={{ minWidth: 60, textAlign: 'center' }}>
                {passiveValue || '10'}
              </Badge>
            </Group>
          </div>
        );
      })}

      <div>
        <Group align="flex-end" gap="xs">
          <TextInput
            label="Darkvision (ft)"
            value={insert.darkvision}
            onChange={(e) => onUpdate('darkvision', e.target.value)}
            type="number"
            min={0}
            disabled={!insert.darkvisionOverride}
            style={{ flex: 1 }}
          />
          <Checkbox
            label="Manual Override"
            checked={insert.darkvisionOverride}
            onChange={(e) => onUpdateBoolean('darkvisionOverride', e.currentTarget.checked)}
            mb={4}
          />
        </Group>
        {!insert.darkvisionOverride && insert.race && (
          <Text size="xs" c="dimmed" mt={4}>
            Auto-calculated from race
          </Text>
        )}
      </div>
    </Stack>
  );
}
