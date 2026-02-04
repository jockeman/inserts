import type { SpeedType } from '../types/Insert';
import { CollapsibleMetricInput } from './CollapsibleMetricInput';

interface SpeedInputProps {
  speed: Partial<Record<SpeedType, number>>;
  onUpdate: (speed: Partial<Record<SpeedType, number>>) => void;
}

const SPEED_TYPES: Array<{ value: SpeedType; label: string }> = [
  { value: 'walk', label: 'Walk' },
  { value: 'fly', label: 'Fly' },
  { value: 'swim', label: 'Swim' },
  { value: 'burrow', label: 'Burrow' },
  { value: 'climb', label: 'Climb' },
];

export function SpeedInput({ speed, onUpdate }: SpeedInputProps) {
  return (
    <CollapsibleMetricInput
      title="Speed"
      metrics={speed}
      metricTypes={SPEED_TYPES}
      defaultValue={30}
      step={5}
      onUpdate={onUpdate}
    />
  );
}
