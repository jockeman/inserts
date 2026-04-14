import { ActionIcon, Collapse, Group, NumberInput, Paper, Stack, Text } from '@mantine/core';
import { memo, useCallback, useState } from 'react';
import { FaChevronDown, FaChevronRight, FaEye, FaEyeSlash } from 'react-icons/fa';

interface MetricType<T extends string> {
  value: T;
  label: string;
}

interface CollapsibleMetricInputProps<T extends string> {
  title: string;
  metrics: Partial<Record<T, number>>;
  metricTypes: Array<MetricType<T>>;
  defaultValue: number;
  step: number;
  onUpdate: (metrics: Partial<Record<T, number>>) => void;
}

function CollapsibleMetricInputComponent<T extends string>({
  title,
  metrics,
  metricTypes,
  defaultValue,
  step,
  onUpdate,
}: CollapsibleMetricInputProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMetricChange = useCallback(
    (metricType: T, metricValue: number | string | undefined) => {
      const newMetrics = { ...metrics };

      if (metricValue && Number(metricValue) > 0) {
        newMetrics[metricType] = Number(metricValue);
      } else {
        delete newMetrics[metricType];
      }

      onUpdate(newMetrics);
    },
    [metrics, onUpdate]
  );

  const handleToggleMetric = useCallback(
    (metricType: T) => {
      const newMetrics = { ...metrics };

      if (newMetrics[metricType]) {
        delete newMetrics[metricType];
      } else {
        newMetrics[metricType] = defaultValue;
      }

      onUpdate(newMetrics);
    },
    [metrics, defaultValue, onUpdate]
  );

  const getMetricValue = (metricType: T): number => {
    return metrics[metricType] || 0;
  };

  // Generate summary of enabled metrics
  const summary = metricTypes
    .filter(({ value }) => metrics[value])
    .map(({ label, value }) => `${label} ${metrics[value]} ft.`)
    .join(', ');

  return (
    <Paper p="md" withBorder>
      <Stack gap="xs">
        <Group gap="xs" style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => setIsOpen(!isOpen)}>
          <ActionIcon variant="subtle" color="gray" size="sm">
            {isOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </ActionIcon>
          <Text size="sm" fw={500}>
            {title}
          </Text>
          {!isOpen && summary && (
            <Text size="xs" c="dimmed" style={{ marginLeft: 'auto' }}>
              {summary}
            </Text>
          )}
        </Group>

        <Collapse expanded={isOpen}>
          <Stack gap="xs" mt="xs">
            {metricTypes.map(({ value, label }) => {
              const metricValue = getMetricValue(value);
              const isEnabled = metricValue > 0;

              return (
                <Group key={value} gap="xs" align="center" wrap="nowrap">
                  <ActionIcon
                    variant={isEnabled ? 'filled' : 'light'}
                    color={isEnabled ? 'blue' : 'gray'}
                    onClick={() => handleToggleMetric(value)}
                    title={isEnabled ? `Disable ${label}` : `Enable ${label}`}
                    style={{ flexShrink: 0 }}
                  >
                    {isEnabled ? <FaEye size={14} /> : <FaEyeSlash size={14} />}
                  </ActionIcon>

                  <Text size="sm" style={{ minWidth: 70, flexShrink: 0 }}>
                    {label}
                  </Text>

                  <Group gap="xs" wrap="nowrap" style={{ marginLeft: 'auto' }}>
                    <NumberInput
                      value={metricValue}
                      onChange={(val) => handleMetricChange(value, val)}
                      disabled={!isEnabled}
                      min={0}
                      max={999}
                      step={step}
                      style={{ width: 80, flexShrink: 0 }}
                      size="xs"
                      hideControls
                      suffix=" ft."
                    />
                  </Group>
                </Group>
              );
            })}
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
}

export const CollapsibleMetricInput = memo(CollapsibleMetricInputComponent) as typeof CollapsibleMetricInputComponent;
