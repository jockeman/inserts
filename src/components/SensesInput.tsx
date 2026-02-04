import type { SenseType } from '../types/Insert';
import { CollapsibleMetricInput } from './CollapsibleMetricInput';

interface SensesInputProps {
  senses: Partial<Record<SenseType, number>>;
  onUpdate: (senses: Partial<Record<SenseType, number>>) => void;
}

const SENSE_TYPES: Array<{ value: SenseType; label: string }> = [
  { value: 'blindsight', label: 'Blindsight' },
  { value: 'darkvision', label: 'Darkvision' },
  { value: 'tremorsense', label: 'Tremorsense' },
  { value: 'truesight', label: 'Truesight' },
];

export function SensesInput({ senses, onUpdate }: SensesInputProps) {
  return (
    <CollapsibleMetricInput
      title="Senses"
      metrics={senses}
      metricTypes={SENSE_TYPES}
      defaultValue={60}
      step={10}
      onUpdate={onUpdate}
    />
  );
}
