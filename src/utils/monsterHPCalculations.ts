import type { MonsterSize } from '../types/Insert';

// Hit die sizes for each monster size (D&D 5e rules)
const HIT_DIE_BY_SIZE: Record<MonsterSize, number> = {
  Tiny: 4,
  Small: 6,
  Medium: 8,
  Large: 10,
  Huge: 12,
  Gargantuan: 20,
};

/**
 * Get the hit die size for a monster size
 */
export function getHitDieSize(size: MonsterSize): number {
  return HIT_DIE_BY_SIZE[size] || 8; // Default to d8 if not found
}

/**
 * Calculate average HP from hit dice and CON modifier
 * Formula: (number of dice × average die roll) + (number of dice × CON modifier)
 * Average die roll = (die size / 2) + 0.5
 */
export function calculateMonsterHP(numDice: number, dieSize: number, conModifier: number): number {
  if (!numDice || numDice <= 0) return 0;

  const avgDieRoll = dieSize / 2 + 0.5;
  const baseHP = Math.floor(numDice * avgDieRoll);
  const conBonus = numDice * conModifier;

  return baseHP + conBonus;
}

/**
 * Generate HP formula string (e.g., "33d20 + 330" or "33d20 - 33")
 */
export function generateHPFormula(numDice: number, dieSize: number, conModifier: number): string {
  if (!numDice || numDice <= 0) return '';

  const totalModifier = numDice * conModifier;

  if (totalModifier === 0) {
    return `${numDice}d${dieSize}`;
  } else if (totalModifier > 0) {
    return `${numDice}d${dieSize} + ${totalModifier}`;
  } else {
    return `${numDice}d${dieSize} - ${Math.abs(totalModifier)}`;
  }
}

/**
 * Parse hit dice count from formula string
 * Accepts formats like "33d20 + 330", "5d8", "10d10 - 10"
 * Returns 0 if cannot parse
 */
export function parseHitDiceFromFormula(formula: string): number {
  if (!formula) return 0;

  const trimmed = formula.trim();
  const match = trimmed.match(/^(\d+)d\d+/);
  return match ? Number.parseInt(match[1], 10) : 0;
}
