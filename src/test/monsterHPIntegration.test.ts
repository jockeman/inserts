import { describe, expect, it } from 'vitest';
import type { InsertInputs } from '../types/Insert';
import { normalizeInsertInputs } from '../utils/inputNormalizer';
import { calculateInsertValues } from '../utils/insertCalculations';

describe('Monster HP Calculation Integration', () => {
  it('calculates HP and formula from hitDice for Gargantuan monster', () => {
    const input: Partial<InsertInputs> = {
      cardType: 'monster',
      name: 'Ancient Red Dragon',
      monsterSize: 'Gargantuan',
      con: 30, // +10 modifier
      hitDice: 33,
    };

    const normalized = normalizeInsertInputs(input);
    const calculated = calculateInsertValues(normalized);

    // Expected: (33 × 10.5) + (33 × 10) = 346.5 + 330 = 676.5 → 676
    expect(calculated.hp).toBe(676);
    expect(calculated.hpFormula).toBe('33d20 + 330');
  });

  it('calculates HP and formula from hitDice for Medium monster', () => {
    const input: Partial<InsertInputs> = {
      cardType: 'monster',
      name: 'Orc',
      monsterSize: 'Medium',
      con: 16, // +3 modifier
      hitDice: 2,
    };

    const normalized = normalizeInsertInputs(input);
    const calculated = calculateInsertValues(normalized);

    // Expected: (2 × 4.5) + (2 × 3) = 9 + 6 = 15
    expect(calculated.hp).toBe(15);
    expect(calculated.hpFormula).toBe('2d8 + 6');
  });

  it('handles negative CON modifier correctly', () => {
    const input: Partial<InsertInputs> = {
      cardType: 'monster',
      name: 'Weak Zombie',
      monsterSize: 'Medium',
      con: 8, // -1 modifier
      hitDice: 3,
    };

    const normalized = normalizeInsertInputs(input);
    const calculated = calculateInsertValues(normalized);

    // Expected: (3 × 4.5) + (3 × -1) = 13.5 - 3 = 10.5 → 10
    expect(calculated.hp).toBe(10);
    expect(calculated.hpFormula).toBe('3d8 - 3');
  });

  it('does not calculate HP if hitDice is 0 or undefined', () => {
    const input: Partial<InsertInputs> = {
      cardType: 'monster',
      name: 'Test Monster',
      monsterSize: 'Large',
      con: 14,
      hitDice: 0,
      hp: 100,
      hpFormula: '10d10 + 20',
    };

    const normalized = normalizeInsertInputs(input);
    const calculated = calculateInsertValues(normalized);

    // Should keep original values since hitDice is 0
    expect(calculated.hp).toBe(100);
    expect(calculated.hpFormula).toBe('10d10 + 20');
  });

  it('does not calculate HP for players', () => {
    const input: Partial<InsertInputs> = {
      cardType: 'player',
      name: 'Test Player',
      hitDice: 5, // This should be ignored for players
      characterClass: 'Fighter',
      level: 5,
      con: 16,
    };

    const normalized = normalizeInsertInputs(input);
    const calculated = calculateInsertValues(normalized);

    // Player HP should be calculated from level and class, not hitDice
    expect(calculated.hp).toBeGreaterThan(0);
    // Should not have hpFormula for players
    expect(calculated.hpFormula).toBe('');
  });

  it('calculates HP for all monster sizes correctly', () => {
    const sizes = [
      { size: 'Tiny', dieSize: 4 },
      { size: 'Small', dieSize: 6 },
      { size: 'Medium', dieSize: 8 },
      { size: 'Large', dieSize: 10 },
      { size: 'Huge', dieSize: 12 },
      { size: 'Gargantuan', dieSize: 20 },
    ] as const;

    for (const { size, dieSize } of sizes) {
      const input: Partial<InsertInputs> = {
        cardType: 'monster',
        name: `${size} Test`,
        monsterSize: size,
        con: 10, // 0 modifier
        hitDice: 5,
      };

      const normalized = normalizeInsertInputs(input);
      const calculated = calculateInsertValues(normalized);

      // Expected: 5 × (avgDieRoll)
      const avgRoll = (dieSize + 1) / 2;
      const expectedHP = Math.floor(5 * avgRoll);

      expect(calculated.hp).toBe(expectedHP);
      expect(calculated.hpFormula).toBe(`5d${dieSize}`);
    }
  });
});
