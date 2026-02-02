import type { ClassName } from '../types/Shared';
import { getHitDieForClass } from './classConfig';

export function calculateProficiencyBonus(level: number): number {
  if (Number.isNaN(level) || level < 1) return 2;
  if (level <= 4) return 2;
  if (level <= 8) return 3;
  if (level <= 12) return 4;
  if (level <= 16) return 5;
  return 6;
}

export function calculateMaxHP(level: number, className: ClassName, con: number): number {
  if (Number.isNaN(level) || level < 1) return 0;
  if (Number.isNaN(con)) return 0;

  const hitDie = getHitDieForClass(className);
  const conModifier = Math.floor((con - 10) / 2);

  // Fixed value = average die roll rounded up
  const fixedIncrease = Math.ceil((hitDie + 1) / 2);
  const level1HP = hitDie + conModifier;
  const additionalLevels = level - 1;
  const additionalHP = additionalLevels * (fixedIncrease + conModifier);

  return Math.max(1, level1HP + additionalHP);
}
