import { ActionIcon, Group, NumberInput, Paper, Stack, Text } from '@mantine/core';
import { memo, useCallback } from 'react';
import { FaEye, FaEyeSlash, FaMinus, FaPlus } from 'react-icons/fa';

interface SensesInputProps {
  senses: Record<string, string>;
  onUpdate: (senses: Record<string, string>) => void;
}

const SENSE_TYPES = [
  { value: 'blindsight', label: 'Blindsight' },
  { value: 'darkvision', label: 'Darkvision' },
  { value: 'tremorsense', label: 'Tremorsense' },
  { value: 'truesight', label: 'Truesight' },
] as const;

export const SensesInput = memo(function SensesInput({ senses, onUpdate }: SensesInputProps) {
  const handleSenseChange = useCallback(
    (senseType: string, rangeValue: number | string | undefined) => {
      const newSenses = { ...senses };

      if (rangeValue && Number(rangeValue) > 0) {
        newSenses[senseType] = `${rangeValue} ft.`;
      } else {
        delete newSenses[senseType];
      }

      onUpdate(newSenses);
    },
    [senses, onUpdate]
  );

  const handleToggleSense = useCallback(
    (senseType: string) => {
      const newSenses = { ...senses };

      if (newSenses[senseType]) {
        delete newSenses[senseType];
      } else {
        newSenses[senseType] = '60 ft.';
      }

      onUpdate(newSenses);
    },
    [senses, onUpdate]
  );

  const getRangeValue = (senseType: string): number => {
    const range = senses[senseType];
    if (!range) return 0;
    const match = range.match(/(\d+)/);
    return match ? Number.parseInt(match[1], 10) : 0;
  };

  return (
    <Paper p="md" withBorder>
      <Stack gap="sm">
        <Text size="sm" fw={500}>
          Senses
        </Text>

        {SENSE_TYPES.map(({ value, label }) => {
          const rangeValue = getRangeValue(value);
          const isEnabled = rangeValue > 0;

          return (
            <Group key={value} gap="xs" align="center">
              <ActionIcon
                variant={isEnabled ? 'filled' : 'light'}
                color={isEnabled ? 'blue' : 'gray'}
                onClick={() => handleToggleSense(value)}
                title={isEnabled ? `Disable ${label}` : `Enable ${label}`}
              >
                {isEnabled ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
              </ActionIcon>

              <Text size="sm" style={{ minWidth: '100px' }}>
                {label}
              </Text>

              {isEnabled ? (
                <Group gap="xs">
                  <ActionIcon
                    variant="light"
                    size="sm"
                    onClick={() => handleSenseChange(value, Math.max(0, rangeValue - 10))}
                  >
                    <FaMinus size={14} />
                  </ActionIcon>

                  <NumberInput
                    value={rangeValue}
                    onChange={(val) => handleSenseChange(value, val)}
                    min={0}
                    max={999}
                    step={10}
                    style={{ width: '80px' }}
                    size="xs"
                    hideControls
                    suffix=" ft."
                  />

                  <ActionIcon variant="light" size="sm" onClick={() => handleSenseChange(value, rangeValue + 10)}>
                    <FaPlus size={14} />
                  </ActionIcon>
                </Group>
              ) : (
                <Text size="xs" c="dimmed">
                  Not enabled
                </Text>
              )}
            </Group>
          );
        })}
      </Stack>
    </Paper>
  );
});
