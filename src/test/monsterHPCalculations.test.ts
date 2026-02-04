import { describe, expect, it } from 'vitest';
import type { MonsterSize } from '../types/Insert';
import {
  calculateMonsterHP,
  generateHPFormula,
  getHitDieSize,
  parseHitDiceFromFormula,
} from '../utils/monsterHPCalculations';

describe('monsterHPCalculations', () => {
  describe('getHitDieSize', () => {
    it('returns correct die size for each monster size', () => {
      expect(getHitDieSize('Tiny')).toBe(4);
      expect(getHitDieSize('Small')).toBe(6);
      expect(getHitDieSize('Medium')).toBe(8);
      expect(getHitDieSize('Large')).toBe(10);
      expect(getHitDieSize('Huge')).toBe(12);
      expect(getHitDieSize('Gargantuan')).toBe(20);
    });
  });

  describe('calculateMonsterHP', () => {
    it('calculates HP correctly for positive CON modifier', () => {
      // 33d20: (33 × 10.5) + (33 × 10) = 346.5 + 330 = 676.5 → 676
      expect(calculateMonsterHP(33, 20, 10)).toBe(676);
    });

    it('calculates HP correctly for negative CON modifier', () => {
      // 10d8: (10 × 4.5) + (10 × -2) = 45 - 20 = 25
      expect(calculateMonsterHP(10, 8, -2)).toBe(25);
    });

    it('calculates HP correctly for zero CON modifier', () => {
      // 5d6: (5 × 3.5) + (5 × 0) = 17.5
      expect(calculateMonsterHP(5, 6, 0)).toBe(17);
    });

    it('handles small die sizes', () => {
      // 3d4: (3 × 2.5) + (3 × 1) = 7.5 + 3 = 10.5 → 10
      expect(calculateMonsterHP(3, 4, 1)).toBe(10);
    });
  });

  describe('generateHPFormula', () => {
    it('generates correct formula with positive modifier', () => {
      expect(generateHPFormula(33, 20, 10)).toBe('33d20 + 330');
    });

    it('generates correct formula with negative modifier', () => {
      expect(generateHPFormula(10, 8, -2)).toBe('10d8 - 20');
    });

    it('generates correct formula with zero modifier', () => {
      expect(generateHPFormula(5, 6, 0)).toBe('5d6');
    });

    it('generates correct formula with small values', () => {
      expect(generateHPFormula(1, 4, 1)).toBe('1d4 + 1');
    });
  });

  describe('parseHitDiceFromFormula', () => {
    it('parses standard formula with addition', () => {
      expect(parseHitDiceFromFormula('33d20 + 330')).toBe(33);
    });

    it('parses standard formula with subtraction', () => {
      expect(parseHitDiceFromFormula('10d8 - 20')).toBe(10);
    });

    it('parses formula without modifier', () => {
      expect(parseHitDiceFromFormula('5d6')).toBe(5);
    });

    it('parses single hit die', () => {
      expect(parseHitDiceFromFormula('1d4 + 1')).toBe(1);
    });

    it('handles formula with spaces', () => {
      expect(parseHitDiceFromFormula('  12d10  +  60  ')).toBe(12);
    });

    it('returns 0 for invalid formula', () => {
      expect(parseHitDiceFromFormula('invalid')).toBe(0);
      expect(parseHitDiceFromFormula('')).toBe(0);
      expect(parseHitDiceFromFormula('100')).toBe(0);
    });
  });

  describe('integration: full HP calculation workflow', () => {
    it('calculates HP for Gargantuan monster with high CON', () => {
      const monsterSize: MonsterSize = 'Gargantuan';
      const hitDice = 33;
      const conModifier = 10;

      const dieSize = getHitDieSize(monsterSize);
      const hp = calculateMonsterHP(hitDice, dieSize, conModifier);
      const formula = generateHPFormula(hitDice, dieSize, conModifier);

      expect(dieSize).toBe(20);
      expect(hp).toBe(676);
      expect(formula).toBe('33d20 + 330');
    });

    it('calculates HP for Medium monster with average CON', () => {
      const monsterSize: MonsterSize = 'Medium';
      const hitDice = 5;
      const conModifier = 1;

      const dieSize = getHitDieSize(monsterSize);
      const hp = calculateMonsterHP(hitDice, dieSize, conModifier);
      const formula = generateHPFormula(hitDice, dieSize, conModifier);

      expect(dieSize).toBe(8);
      expect(hp).toBe(27);
      expect(formula).toBe('5d8 + 5');
    });

    it('round-trips formula parsing', () => {
      const originalFormula = '15d12 + 90';
      const parsedDice = parseHitDiceFromFormula(originalFormula);
      const regeneratedFormula = generateHPFormula(parsedDice, 12, 6);

      expect(parsedDice).toBe(15);
      expect(regeneratedFormula).toBe(originalFormula);
    });
  });
});
