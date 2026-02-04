import { Badge, NumberInput } from '@mantine/core';
import type { InsertInputs } from '../types/Insert';
import type { AbilityType } from '../types/Shared';
import { ABILITY_LABELS, calculateAbilityModifier, formatModifier } from '../utils/abilityHelpers';

interface AbilityInputProps {
  ability: AbilityType;
  value: number;
  onUpdate: (field: keyof InsertInputs, value: number) => void;
  placeholder?: string;
}

export function AbilityInput({ ability, value, onUpdate, placeholder }: AbilityInputProps) {
  const score = value || 0;
  const modifier = calculateAbilityModifier(score);

  return (
    <div style={{ position: 'relative' }}>
      <NumberInput
        label={ABILITY_LABELS[ability]}
        value={value}
        onChange={(val) => onUpdate(ability, Number(val) || 0)}
        placeholder={placeholder}
        allowDecimal={false}
        allowNegative={false}
        hideControls
      />
      {score > 0 && (
        <Badge
          size="sm"
          variant="light"
          color={modifier >= 0 ? 'blue' : 'red'}
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
          }}
        >
          {formatModifier(modifier)}
        </Badge>
      )}
    </div>
  );
}
