import { describe, expect, it } from 'vitest';
import { calculateMaxHP, calculateProficiencyBonus } from '../utils/levelCalculations';

describe('levelCalculations', () => {
  describe('calculateProficiencyBonus', () => {
    it('should return correct proficiency bonus for different levels', () => {
      // Levels 1-4: +2
      expect(calculateProficiencyBonus(1)).toBe(2);
      expect(calculateProficiencyBonus(4)).toBe(2);

      // Levels 5-8: +3
      expect(calculateProficiencyBonus(5)).toBe(3);
      expect(calculateProficiencyBonus(8)).toBe(3);

      // Levels 9-12: +4
      expect(calculateProficiencyBonus(9)).toBe(4);
      expect(calculateProficiencyBonus(12)).toBe(4);

      // Levels 13-16: +5
      expect(calculateProficiencyBonus(13)).toBe(5);
      expect(calculateProficiencyBonus(16)).toBe(5);

      // Levels 17+: +6
      expect(calculateProficiencyBonus(17)).toBe(6);
      expect(calculateProficiencyBonus(20)).toBe(6);
      expect(calculateProficiencyBonus(25)).toBe(6);
    });

    it('should handle edge cases', () => {
      expect(calculateProficiencyBonus(0)).toBe(2);
      expect(calculateProficiencyBonus(-1)).toBe(2);
      expect(calculateProficiencyBonus(Number.NaN)).toBe(2);
    });
  });

  describe('calculateMaxHP', () => {
    it('should calculate HP correctly for different classes', () => {
      // Fighter (d10 hit die): level 1 = 10 + con mod, level 2+ = +6 + con mod per level
      expect(calculateMaxHP(1, 'Fighter', 14)).toBe(12); // 10 + 2
      expect(calculateMaxHP(2, 'Fighter', 14)).toBe(20); // 12 + 6 + 2
      expect(calculateMaxHP(3, 'Fighter', 14)).toBe(28); // 18 + 6 + 2

      // Wizard (d6 hit die): level 1 = 6 + con mod, level 2+ = +4 + con mod per level
      expect(calculateMaxHP(1, 'Wizard', 14)).toBe(8); // 6 + 2
      expect(calculateMaxHP(2, 'Wizard', 14)).toBe(14); // 8 + 4 + 2
      expect(calculateMaxHP(3, 'Wizard', 14)).toBe(20); // 14 + 4 + 2

      // Barbarian (d12 hit die): level 1 = 12 + con mod, level 2+ = +7 + con mod per level
      expect(calculateMaxHP(1, 'Barbarian', 16)).toBe(15); // 12 + 3
      expect(calculateMaxHP(2, 'Barbarian', 16)).toBe(25); // 15 + 7 + 3
    });

    it('should handle different constitution scores', () => {
      // Test with various CON scores
      expect(calculateMaxHP(1, 'Fighter', 8)).toBe(9); // 10 + (-1)
      expect(calculateMaxHP(1, 'Fighter', 10)).toBe(10); // 10 + 0
      expect(calculateMaxHP(1, 'Fighter', 12)).toBe(11); // 10 + 1
      expect(calculateMaxHP(1, 'Fighter', 16)).toBe(13); // 10 + 3
      expect(calculateMaxHP(1, 'Fighter', 20)).toBe(15); // 10 + 5
    });

    it('should handle very low constitution (minimum 1 HP)', () => {
      // Even with CON 1 (-5 modifier), should have at least 1 HP
      expect(calculateMaxHP(1, 'Wizard', 1)).toBe(1);
      expect(calculateMaxHP(2, 'Wizard', 1)).toBe(1);
    });

    it('should handle edge cases', () => {
      expect(calculateMaxHP(0, 'Fighter', 14)).toBe(0);
      expect(calculateMaxHP(-1, 'Fighter', 14)).toBe(0);
      expect(calculateMaxHP(Number.NaN, 'Fighter', 14)).toBe(0);
      expect(calculateMaxHP(1, 'Fighter', Number.NaN)).toBe(0);
    });
  });
});
